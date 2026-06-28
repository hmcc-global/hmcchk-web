# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Layout

Two independent packages — no workspaces wiring. Each side has its own `package.json` and `yarn.lock`:

- `server/` — Sails.js v1 backend (Node 16 per CI), MongoDB via `sails-mongo`
- `ui/` — React 18 frontend created with Create React App (`react-scripts` 5)
- Root `package.json` only holds Prettier dev dependency + a few shared deps used by UI build

Install dependencies in each folder separately: `yarn` at root, `cd server && yarn`, `cd ui && yarn`.

`AGENTS.md` covers UI code-style conventions and is accurate on the stack. Note its command examples use `npm`, but this project uses **yarn** (see [Common Commands](#common-commands)).

## Common Commands

### Run locally (two terminals)
```bash
cd server && nodemon ./app.js   # backend on :1337 (dev mode — production uses `yarn start`)
cd ui && yarn start             # frontend on :3000, proxies /api → :1337
```

### UI (`ui/`)
```bash
yarn start                                          # CRA dev server
yarn build                                          # production build → ui/build
yarn test                                           # Jest + React Testing Library (watch mode)
yarn test -- --testPathPattern="App.test.js"        # single test file
yarn test -- --coverage                             # with coverage
```
The UI has **no lint script** and no commit-time checks — code style is enforced only by Prettier (run manually from root).

> ⚠️ **Node version:** this project targets **Node 16** (per CI). On newer Node (18/20/23) the CRA build and Jest tests may behave differently or fail outright. If your environment isn't on Node 16, **don't trust a local `yarn build`/`yarn test` here — hand it to the user to run and report results.**
>
> **`yarn build` & warnings:** a plain local `yarn build` keeps lint warnings as warnings. Under a CI-like env (where `CI=true` is auto-set), CRA promotes warnings to errors and the build fails — run `CI=false yarn build` to match how CI builds it (see [CI / Deploy](#ci--deploy-githubworkflows)). Requires `ui/.env` to exist.

### Server (`server/`)
```bash
yarn lint           # eslint . --max-warnings=0 (strict — zero-warnings)
yarn test           # runs lint, then a no-op `custom-tests` echo (no real test suite exists)
yarn start          # NODE_ENV=production node app.js (sails lift)
nodemon ./app.js    # dev (auto-restart) — not a yarn script
```
There is no `server/test/` directory. "Tests" on the server side currently equal "lint passes."

### Formatting (root)
```bash
npx prettier --write "ui/src/**/*.{js,jsx}"
```
Config: `.prettierrc.json` — 2-space, single quotes, semi, `trailingComma: 'es5'`, no tabs.

## Backend Architecture (Sails.js)

### Layout under `server/api/`
- `controllers/` — request handlers, grouped by feature folder (e.g. `auth/`, `forms/`, `userSermonNotes/`). One file per action.
- `models/` — Waterline models on MongoDB. Each file exports `{ attributes: { … } }`.
- `helpers/` — reusable business logic. Invoked as `sails.helpers.<folder>.<camelCaseName>()` (e.g. `sails.helpers.auth.generateJwt(…)`, `sails.helpers.cache.cacheLatest()`).
- `policies/` — auth/authorization middleware. Wired in `server/config/policies.js`.
- `responses/` — custom response handlers (e.g. `unauthorized.js`).

### Sails action declaration pattern
Both controllers and helpers follow the same shape — don't drift from it:
```javascript
module.exports = {
  friendlyName: 'Create form',
  description: 'Create a new form',
  inputs: { formToSave: { type: 'json', required: true } },
  exits: {
    success: { description: '…' },
    error:   { description: '…' },
  },
  fn: async function ({ formToSave }, exits) {
    try {
      await Form.create(formToSave);
      return exits.success();
    } catch (err) {
      sails.log(err);
      return exits.error(err);
    }
  },
};
```
Models are globally available — write `User.findOne(…)`, not an import.

### Routing — explicit, no blueprints
All routes are declared in `server/config/routes.js`. There is **no auto-routing**; adding an endpoint means adding a line there *and* an entry in `server/config/policies.js` (otherwise the default `'*': 'isLoggedIn'` policy will apply).

The catch-all `get /*` serves `server/client/index.html` (the built CRA SPA). That folder only exists after CI builds the UI and moves `ui/build/*` into `server/client/`, so in dev the SPA is served separately from CRA on :3000 and proxied to :1337 for `/api/*`.

Note: the routes file has **two parallel announcement endpoints** (`/api/announcements/*` and `/api/announcement/*`) — an in-progress migration from plural-old to singular-new. Be mindful when touching announcements.

### Authorization model
Default policy is `'*': 'isLoggedIn'` — every endpoint requires a valid JWT unless explicitly opened with `true` or replaced with a stricter policy in `policies.js`.

**User access-type hierarchy** (User.accessType is one of these strings):
```
stewardship, admin, alumni, t3ch, signed, unsigned, ministry, tc
```
Policies map to access-type sets:
| Policy            | Allowed access types                              |
|-------------------|---------------------------------------------------|
| `isLoggedIn`      | any logged-in user                                |
| `aboveMinistry`   | `ministry, tc, t3ch, admin, stewardship`          |
| `aboveTc`         | `tc, t3ch, admin, stewardship`                    |
| `aboveTcNotTech`  | `tc, admin, stewardship` (excludes t3ch)          |
| `aboveTech`       | `t3ch, admin, stewardship`                        |
| `aboveAdmin`      | `admin, stewardship`                              |
| `isStewardship`   | `stewardship`                                     |

Note the unusual `t3ch` spelling (with a 3, not "tech") — this is the canonical value stored in `User.accessType`. The policy file is named `aboveTech.js` but the string it compares to is `'t3ch'`.

### Auth flow — JWT, with a header-spelling quirk
**Critical:** the bearer header is misspelled `Authorisation` (British spelling), and this spelling is load-bearing across both client and server:
- `isLoggedIn.js` reads `req.headers.authorisation`
- `customAxios.js` sets `headers: { Authorisation: 'Bearer ' + token }`

Using the conventional `Authorization` spelling will silently fail with 401. If you ever copy code from elsewhere, double-check this.

JWT details:
- Signed with `process.env.JWT_KEY`
- `tokenExpiryHours: 1` in `custom.js`, but `helpers/auth/generate-jwt.js` actually issues `expiresIn: 24*60*60*7*8` (≈ 2 months). The latter wins.
- `verifyJwt` returns the full User record (minus password, emailProofToken). On expiry it exits with `'token-expired'`, which `PrivateRoute` watches for to clear localStorage and reload.
- Google OAuth is a separate sign-in path (`auth/post-login-google`) that still ends up issuing the same JWT.

### Email
- Templates live in `server/views/emails/`, EJS, file naming convention `email-*.ejs` (also `form-*.ejs` for form-success bodies). Layout is `views/layouts/layout-email.ejs`.
- Sent via `sails.helpers.sendTemplateEmail({ template, templateData, to, subject, ... })`.
- Gated by `disableSendEmails: true` in `custom.js` — when true, the rendered HTML is logged to console and **not sent**. Production environments flip this off.
- SMTP is Gmail with OAuth2: env vars `EMAIL_FROM`, `GOOGLE_CLIENT_ID`, `EMAIL_CLIENT_SECRET`, `EMAIL_REFRESH_TOKEN`.
- Non-production mail subjects are auto-prefixed with `[UAT]`.

### Datastore & models
- `sails-mongo` adapter; connection via `server/config/datastores.js` + `MONGODB_*` env vars.
- `migrate: 'safe'` (always — Sails forces this in prod anyway).
- All models get implicit attributes: `id` (string, `columnName: '_id'`), `createdAt`, `updatedAt`, **`isDeleted` (boolean, default false)** — soft-delete pattern is the convention; respect `isDeleted` in queries.
- A hard-coded `dataEncryptionKeys.default` exists in `config/models.js` — don't touch it unless rotating keys.
- Models include: `User`, `Form`, `Submission`, `Baptism`, `Membership`, `LeadershipTeam`, `Giving`, `PaymentData`, `Announcement`, `PopUp`, `Testimonies`, `Fundraise`, `LiveSermon`, `SermonNotesParent`, `UserSermonNotes`, `LastUpdated`, `ResetPwdToken`.

### Bootstrap & scheduled jobs (`server/config/bootstrap.js`)
- Initializes `sails.cache` (a `node-cache` instance, 24h TTL) — used by helpers like `sails.helpers.cache.cacheLatest()`.
- Schedules three cron jobs via `node-schedule`:
  - `0 0 9 * * *` — `cacheLatest()` daily 9am (also runs once 1s after lift)
  - `0 0 7 * * 6` — `sendBatchUsersQuery()` every Saturday 7am
  - `0 0 21 * * *` — `parseUserQuery()` daily 9pm

### External integrations
- **WordPress REST API** at `hongkong.sub.hmccglobal.org` is the source of truth for sermons, speakers, sermon series, service types, posts, tags, media, and pages. Endpoints are configured in `custom.js`. The `/api/sermons/*` routes proxy/transform WordPress data; sermons are not stored in Mongo (only `UserSermonNotes` and `SermonNotesParent` are local).
- **IMAP mail parsing** (`imapflow` + `mailparser`) for inbound mail handling.
- **Google Auth Library** for verifying Google OAuth tokens.

## Frontend Architecture (React + Chakra + Redux)

### Entry & providers
`ui/src/index.js` wraps `<App />` in `GoogleOAuthProvider` → `React.StrictMode` → `ChakraProvider`. `App.js` adds `Provider (Redux)` → `PersistGate` → `BrowserRouter`, then renders `<NavBar /> <MainContainer /> <MobileNavBar />`.

`MainContainer.js` holds the entire `<Switch>` — every route is a `<PrivateRoute>` (even public ones). When adding a new page, add a route there.

### Routing
- `react-router-dom` **v5** (not v6) — uses `<Switch>`, `props.history.push`, render-prop `<Route render={…} />`.
- **Every route uses `<PrivateRoute>`** with a `permissions` array. Magic values:
  - `'public'` — anyone (logged in or not)
  - `'noUser'` — only when no token in store (redirects elsewhere if logged in)
  - any access-type string from the User model (e.g. `'admin'`, `'t3ch'`, `'ministry'`, `'tc'`, `'signed'`, `'unsigned'`, `'alumni'`, `'stewardship'`)
- `PrivateRoute` (`ui/src/components/helpers/PrivateRoute.js`):
  1. Calls `/api/auth/verify-token` on mount and whenever `user` slice changes — confirms the token is valid and gets the full user object.
  2. If the server responds with `raw === 'token-expired'`, clears localStorage and reloads.
  3. Calls `updateAxiosClient(token)` to (re)build the global `customAxios` instance with the bearer token.
  4. Loads "static data" (lifegroup/campus/lifestage/formAlertType lists) and attaches it to `props.staticData`.
  5. If the route path includes `'admin'`, wraps the component in `<SidebarWithHeader>` (the admin shell).
  6. Special redirects: `/complete-profile` → `/profile` when `hasFilledProfileForm`; `/profile` → `/complete-profile` when not.

### State
- Redux Toolkit + `redux-persist` to localStorage (key: `root`).
- **Only one slice exists**: `userSlice` (`{ user: {} }`) with `signin` / `signout` actions. The "user" stored is the JWT token string itself, not a profile — the profile is re-fetched by `PrivateRoute` via `verify-token`.
- All other feature state is local component state. Don't reach for a new slice unless there's a genuine cross-cutting need.

### HTTP — `customAxios` and the header quirk
```javascript
import { customAxios as axios } from '../helpers/customAxios';

try {
  const { data } = await axios.get('/api/endpoint');
  setData(data);
} catch (err) {
  console.log(err);
}
```
- `customAxios.js` is a singleton (`export let customAxios`) that gets **rebuilt** by `updateAxiosClient(token)` whenever the token changes (called from `PrivateRoute`).
- It sets the `Authorisation` (British spelling) header — see backend section. Do not switch this.
- For unauthenticated calls (e.g. `verify-token`, `forgot-password`), `PrivateRoute` uses bare `axios` directly. Follow that pattern.
- `console.log(err)` in catch is the established convention — don't replace with throw/toast unless you're deliberately adding user feedback.

### UI library — Chakra v1
- Custom theme at `ui/src/theme.js` — Inter for headings/body, plus `dm_sans` / `dm_sans_bold` text styles. Font loaded via `@fontsource/dm-sans`.
- Use responsive props (`{ base, md, lg }`) rather than CSS media queries.
- Use `bgColor` (not `background`), semantic layout (`Flex`, `Box`, `VStack`, `HStack`, `Container`), pseudo-state props (`_hover`, `_active`).
- Hooks like `useBreakpointValue({ base: true, md: false })` for conditional logic.

### Feature folders (under `ui/src/components/`)
Top-level groupings: `home/`, `about/`, `auth/`, `events/`, `discover/`, `giving/`, `sermons/`, `sermon-notes/`, `forms/`, `connect-prayer/`, `building-block/`, `shine/`, `saturate/`, `advent-2025/`, `visit-us/`, `userProfile/`, `email/`, `screens/`, `seo/`, `NavigationBar/`, `footer/`, `admin/`. Shared utilities live in `helpers/`.

The `admin/` folder is the management UI (sub-folders: `users/`, `forms/`, `announcements/`, `popup/`, `liveSermon/`, `testimony/`, `leadershipTeam/`, `sermonNotes/`, `fundraise/`, `follow-up/`, `navigation/`, `ag-grid-editors/`). Admin routes are recognized by URL containing `admin` and get wrapped in the sidebar shell.

### Heavyweight UI deps to know about
- **TipTap** — rich text editor used in forms and sermon notes. Extensions: starter-kit, link, highlight, task-list, task-item, text-style. Wrapper components live in `ui/src/components/helpers/TipTap/`.
- **AG Grid** — both `ag-grid-community` and `ag-grid-enterprise` (admin tables, large data views). Custom editors in `ui/src/components/admin/ag-grid-editors/`.
- **react-hook-form** — form state for non-dynamic forms.
- **`@react-oauth/google`** — Google sign-in.
- **react-datepicker** + `@date-io/luxon` + `luxon` — date handling.
- **`html-react-parser`** + **`react-markdown`** + `chakra-ui-markdown-renderer` — rendering rich content (especially WordPress sermon HTML).
- **ExcelJS / `arrayToExcel.js`** — admin spreadsheet exports.

## Code Style Conventions

From `AGENTS.md` plus what's actually in the tree:
- **Files**: `.js` for everything. No TypeScript. No `.jsx` extension in use.
- **Components**: PascalCase filenames, functional components with hooks. Helpers/utilities: camelCase.
- **Import order**: external packages → relative imports → assets.
- **Event handlers**: `handle*` prefix.
- **Async**: always `try { … } catch (err) { console.log(err); }`.
- **Server lint policy**: zero warnings. Lint must pass before commits to keep CI green.
- **Old code uses double quotes**, newer code uses single quotes — Prettier is configured for single quotes, so prefer those.

## Environment Variables

### Server (`server/.env` — loaded via `dotenv` in `config/bootstrap.js`)
Required: `JWT_KEY`, `EMAIL_FROM`, `GOOGLE_CLIENT_ID`, `EMAIL_CLIENT_SECRET`, `EMAIL_REFRESH_TOKEN`, MongoDB connection vars (in `config/datastores.js`).

### UI (`ui/.env`)
Standard CRA convention — only vars prefixed `REACT_APP_*` are exposed. Known: `REACT_APP_GOOGLE_CLIENT_ID`.

In CI, both `.env` files are written from GitHub secrets (`UI_ENV`, `SERVER_ENV`) before build.

## CI / Deploy (`.github/workflows/`)
- `build-and-upload-workflow.yml` — manual (`workflow_dispatch`), pick `uat` or `prod`. Installs deps in `/`, `server/`, `ui/`; writes env files from secrets; builds the UI; moves `ui/build/*` → `server/client/`; deletes `ui/`; zips everything; uploads as artifact. Node 16, `CI: false` during build (so warnings don't fail it).
- `deploy-and-delete-workflow.yml` — picks up the artifact and deploys.
- `opencode-review.yml` — automated code-review workflow.

Because the production layout is "Sails serves the SPA from `server/client/`", any change that affects how routes resolve (especially the catch-all in `routes.js`) needs to be tested with a real build, not just `yarn start`.

## Git / Contribution Workflow (from README.md)

- **Branch naming**: `(issueNumber)-(type)-(description)` e.g. `4-feature-anncmt-rest-api`. Types: `feature`, `release`, `hotfix`.
- **Flow**: `feature` → `release` → `main`. Only `hotfix` branches merge directly to `main`.
- **Commits**: prefix with `GH-<issue#>:` so commits link to GitHub issues (e.g. `GH-8: add announcement endpoint`). This is enforced by convention and used for issue tracking.
- Use `git pull --rebase` to keep history linear.
- All PRs require review.
- `CODEOWNERS` requires `@hmcc-global/code-owners` for `node_modules/*` changes (node_modules is unusually checked in at root — don't accidentally commit changes to it).

## Common Gotchas Summary

1. **`Authorisation` (not `Authorization`)** — bearer header spelling is non-standard everywhere.
2. **`t3ch` is an accessType string**, not a typo. Compared via the `aboveTech` policy.
3. **Default policy is `isLoggedIn`** — new endpoints are private unless you open them in `policies.js`.
4. **No autoroutes** — every endpoint needs a manual `routes.js` entry.
5. **Sermons are WordPress-fetched, not stored** — only user-generated sermon-notes data lives in Mongo.
6. **SPA is served from `server/client/`** in production — only exists post-build.
7. **`disableSendEmails: true`** by default — emails are logged, not sent. Flipping this affects real users.
8. **All routes use `<PrivateRoute>`** — even `'public'` ones. Don't reach for a bare `<Route>`.
9. **Two announcement APIs exist** (`/api/announcements/*` legacy and `/api/announcement/*` new) — pick deliberately.
10. **Models implicitly have `isDeleted`** — soft-delete by convention; queries should usually filter `isDeleted: false`.
