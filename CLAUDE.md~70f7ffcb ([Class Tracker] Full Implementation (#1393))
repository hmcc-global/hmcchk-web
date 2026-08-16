# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Layout

Two independent packages — no workspaces wiring. Each side has its own `package.json` and `yarn.lock`:

- `server/` — Sails.js v1 backend, MongoDB via `sails-mongo`
- `ui/` — React 18 SPA built with **Vite 7** (migrated from Create React App in GH-1404)
- Root `package.json` only holds Prettier + a few deps hoisted for the UI build

**Node 20.19.0** (`.nvmrc`, and what CI pins — Vite 7's engine floor is `^20.19.0`, so a bare `20` from the toolcache can resolve too old). The Node 16 era ended with the Vite migration.

Install dependencies in each folder separately: `yarn` at root, `cd server && yarn`, `cd ui && yarn`.

Tracked design docs live in `Plans/` — worth reading before touching the area they describe.

`AGENTS.md` is accurate on UI file organization, import order, and code style. **Its "Commands", "Project Overview", and "API Patterns" sections are stale** — they still describe CRA, `npm`, and `../helpers/customAxios`. Trust this file over those.

## Common Commands

### Run locally (two terminals)
```bash
cd server && nodemon ./app.js   # backend on :1337 (dev mode — production uses `yarn start`)
cd ui && yarn start             # Vite dev server on :3000, proxies /api → :1337
```

### UI (`ui/`)
```bash
yarn start                        # Vite dev server (:3000, HMR)
yarn build                        # production build → ui/build/
yarn preview                      # serve the production build for a smoke test
yarn lint                         # eslint src — CI runs this; `vite build` does NOT lint
yarn test                         # vitest (watch)
yarn test --run                   # single non-watch pass
yarn test --run src/App.test.js   # a single test file
```

Testing is **Vitest + jsdom + Testing Library** (config in `vite.config.js` under `test:`, setup in `src/setupTests.js`) — not Jest, so CRA-era flags like `--testPathPattern` don't apply. There is currently exactly one test file (`ui/src/App.test.js`) and its only case is `test.skip`ped pending API mocks.

> **Build hand-off:** after UI changes, do lightweight verification (prettier, `yarn lint`, a parse check) and let the user confirm the app actually works rather than running the full build to prove it.

### Server (`server/`)
```bash
yarn lint           # eslint . --max-warnings=0 (strict — zero warnings)
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

## Frontend Architecture (React + Vite + Chakra + Redux)

### Vite specifics that will bite you
`ui/README.md` has the full migration notes. The load-bearing pieces of `ui/vite.config.js`:

- **JSX lives in `.js` files.** `esbuild: { loader: 'jsx', include: /src\/.*\.js$/, exclude: [] }` makes that work without a mass rename. This recipe is esbuild-specific and is **why Vite is pinned to 7** — Vite 8 (Rolldown/Oxc) has no documented equivalent. Renaming `.js` → `.jsx` is the real fix before any Vite 8 upgrade.
- **Fast Refresh on `.js`** comes from the small local `js-fast-refresh-hint` plugin (appends a `// react/jsx-runtime` comment in dev so `@vitejs/plugin-react` instruments the file).
- **Env vars keep the `REACT_APP_` prefix** (`envPrefix`), but are read as `import.meta.env.REACT_APP_*` — `process.env.REACT_APP_*` is gone.
- **`process.env.PUBLIC_URL`** is `define`d to `""` (used in ~150 asset paths). Keep using it; don't "modernize" those call sites piecemeal.
- **`build.outDir` is `build`**, not Vite's `dist`, so CI's `mv ui/build/* server/client` step is unchanged.
- **Dev proxy** `/api → http://localhost:1337` lives in `server.proxy` here. `src/setupProxy.js` and the CRA `proxy` field are gone.
- **`ui/index.html` is at the package root** (Vite convention), not `ui/public/`. It carries the GTM snippet and Google site verification — don't relocate it.
- **Absolute imports** resolve from `ui/src` via `ui/jsconfig.json` (`baseUrl: "src"`), wired into Vite by `vite-tsconfig-paths`. So `from 'components'`, `from 'utils/customAxios'`, `from 'pages/screens/ClearCache'` all work.

### Source layout (`ui/src/`)
| Path | Role |
|------|------|
| `pages/` | Every routed page, grouped by feature (`home/`, `sermons/`, `forms/`, `admin/`, …). Also holds `MainContainer.js` and `PrivateRoute.js`. A component used by exactly one page stays in that page's folder. |
| `components/` | The shared UI library — see below. Only cross-page (2+ pages) components. |
| `utils/` | Non-UI shared logic: `customAxios.js`, `lists.js`, `constants.js`, `arrayToExcel.js`, domain helpers. camelCase filenames. |
| `reducers/` | `userSlice.js` — the only slice. |
| `store.js`, `theme.js`, `styles/` | Redux store + persist, Chakra theme, global SCSS. |

There is no `src/components/helpers/` any more (GH-1401 split it: UI → `components/`, non-UI → `utils/`).

### The Chakra boundary — an enforced import rule
`ui/src/components/README.md` is the authority. The short version:

```js
import { Box, Button, useToast, Footer } from 'components';
import { ChevronLeftIcon } from 'components/icons';
```

- `components/chakra/index.js` is the **only** file allowed to import `@chakra-ui/react`; `components/icons.js` is the only one for `@chakra-ui/icons` (separate entry because both packages export `Icon`).
- Enforced by ESLint `no-restricted-imports` in `ui/package.json` — importing `@chakra-ui/*` anywhere else **fails `yarn lint`, which fails CI**.
- The barrel `components/index.js` uses **explicit named re-exports only**. Never `export *` from two sources there: colliding names are silently dropped (undefined at runtime, no build error). Need a Chakra export that isn't listed? Add one line to the barrel.
- Files *inside* `components/` import from `./chakra` relatively, never from the `components` barrel — that creates a module-initialization cycle.
- The point of the boundary: a Chakra version bump or the planned Tailwind migration is absorbed in that one folder by replacing re-exports with app-owned implementations of the same name and props.

### Entry & providers
`ui/src/index.js` wraps `<App />` in `GoogleOAuthProvider` → `React.StrictMode` → `ChakraProvider` (imported from `components`, not Chakra). `App.js` adds `Provider (Redux)` → `PersistGate` → `BrowserRouter`, then renders `<NavBar /> <MainContainer /> <MobileNavBar />`.

`pages/MainContainer.js` holds the entire `<Switch>` — every route is a `<PrivateRoute>`. When adding a page, add the route there.

### Routing
- `react-router-dom` **v5** (not v6) — `<Switch>`, `props.history.push`, render-prop `<Route render={…} />`.
- **Every route uses `<PrivateRoute>`** with a `permissions` array. Magic values:
  - `'public'` — anyone (logged in or not)
  - `'noUser'` — only when no token in store (redirects elsewhere if logged in)
  - any access-type string from the User model (`'admin'`, `'t3ch'`, `'ministry'`, `'tc'`, `'signed'`, `'unsigned'`, `'alumni'`, `'stewardship'`)
- `PrivateRoute` (`ui/src/pages/PrivateRoute.js`):
  1. Calls `/api/auth/verify-token` on mount and whenever the `user` slice changes.
  2. If the server responds `raw === 'token-expired'`, clears localStorage and reloads.
  3. Calls `updateAxiosClient(token)` to (re)build the global `customAxios` instance.
  4. Loads "static data" (lifegroup/campus/lifestage/formAlertType lists) onto `props.staticData`.
  5. If `location.pathname` includes `'admin'`, wraps the component in `<SidebarWithHeader>` (the admin shell).
  6. Special redirects: `/complete-profile` → `/profile` when `hasFilledProfileForm`; `/profile` → `/complete-profile` when not.

### State
- Redux Toolkit + `redux-persist` to localStorage (key: `root`).
- **Only one slice exists**: `userSlice` (`{ user: {} }`) with `signin` / `signout`. The stored "user" is the JWT token string, not a profile — the profile is re-fetched by `PrivateRoute` via `verify-token`.
- All other feature state is local component state. Don't add a slice without a genuine cross-cutting need.

### HTTP — `customAxios` and the header quirk
```javascript
import { customAxios as axios } from 'utils/customAxios';

try {
  const { data } = await axios.get('/api/endpoint');
  setData(data);
} catch (err) {
  console.log(err);
}
```
- `customAxios.js` is a singleton (`export let customAxios`) **rebuilt** by `updateAxiosClient(token)` whenever the token changes (called from `PrivateRoute`).
- It sets the `Authorisation` (British spelling) header — see backend section. Do not switch this.
- For unauthenticated calls (`verify-token`, `forgot-password`), `PrivateRoute` uses bare `axios`. Follow that pattern.
- `console.log(err)` in catch is the established convention — don't replace with throw/toast unless deliberately adding user feedback.

### UI conventions
- Chakra **v1** (a v2/v3 upgrade is the motivation behind the boundary above). Custom theme at `ui/src/theme.js` — Inter for headings/body, plus `dm_sans` / `dm_sans_bold` text styles.
- Responsive props (`{ base, md, lg }`) over CSS media queries; `useBreakpointValue` for conditional logic.
- `bgColor` (not `background`), semantic layout (`Flex`, `Box`, `VStack`, `HStack`, `Container`), pseudo-state props (`_hover`, `_active`).

### Heavyweight UI deps to know about
- **TipTap** — rich text in forms and sermon notes; wrappers in `ui/src/components/TipTap/`.
- **AG Grid** (community + enterprise, v27) — admin tables. Custom cell editors in `ui/src/pages/admin/ag-grid-editors/`.
- **react-hook-form**, **`@react-oauth/google`**, **react-datepicker** + `@date-io/luxon` + `luxon`.
- **`html-react-parser`** / **`react-markdown`** / `chakra-ui-markdown-renderer` — rendering WordPress sermon HTML and rich content.
- **ExcelJS** via `utils/arrayToExcel.js` — admin spreadsheet exports.

## Backend Architecture (Sails.js)

### Layout under `server/api/`
- `controllers/` — request handlers, grouped by feature folder (`auth/`, `forms/`, `classTrackingData/`, …). One file per action.
- `models/` — Waterline models on MongoDB. Each file exports `{ attributes: { … } }`.
- `helpers/` — reusable logic, invoked as `sails.helpers.<folder>.<camelCaseName>()` (e.g. `sails.helpers.auth.generateJwt(…)`, `sails.helpers.cache.cacheLatest()`).
- `policies/` — auth middleware, wired in `server/config/policies.js`.
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
All routes are declared in `server/config/routes.js`. There is **no auto-routing**; adding an endpoint means adding a line there *and* an entry in `server/config/policies.js` (otherwise the default `'*': 'isLoggedIn'` applies).

The catch-all `get /*` serves `server/client/index.html` (the built SPA). That folder only exists after CI builds the UI and moves `ui/build/*` into `server/client/`, so in dev the SPA is served by Vite on :3000 and proxied to :1337 for `/api/*`.

Note: the routes file has **two parallel announcement endpoints** (`/api/announcements/*` legacy and `/api/announcement/*` new) — an in-progress migration. Be deliberate when touching announcements.

### Authorization model
Default policy is `'*': 'isLoggedIn'` — every endpoint requires a valid JWT unless explicitly opened with `true` or given a stricter policy.

**User access-type hierarchy** (`User.accessType` is one of these strings):
```
stewardship, admin, alumni, t3ch, signed, unsigned, ministry, tc
```
| Policy            | Allowed access types                              |
|-------------------|---------------------------------------------------|
| `isLoggedIn`      | any logged-in user                                |
| `aboveMinistry`   | `ministry, tc, t3ch, admin, stewardship`          |
| `aboveTc`         | `tc, t3ch, admin, stewardship`                    |
| `aboveTcNotTech`  | `tc, admin, stewardship` (excludes t3ch)          |
| `aboveTech`       | `t3ch, admin, stewardship`                        |
| `aboveAdmin`      | `admin, stewardship`                              |
| `isStewardship`   | `stewardship`                                     |

Note the unusual `t3ch` spelling (with a 3) — that is the canonical stored value. The policy file is `aboveTech.js` but compares against `'t3ch'`.

### Auth flow — JWT, with a header-spelling quirk
**Critical:** the bearer header is misspelled `Authorisation` (British spelling), and this spelling is load-bearing on both sides:
- `isLoggedIn.js` reads `req.headers.authorisation`
- `utils/customAxios.js` sets `headers: { Authorisation: 'Bearer ' + token }`

Using the conventional `Authorization` spelling silently 401s. Double-check any code copied from elsewhere.

JWT details:
- Signed with `process.env.JWT_KEY`
- `tokenExpiryHours: 1` in `custom.js`, but `helpers/auth/generate-jwt.js` issues `expiresIn: 24*60*60*7*8` (≈ 2 months). The latter wins.
- `verifyJwt` returns the full User record (minus password, emailProofToken). On expiry it exits `'token-expired'`, which `PrivateRoute` watches for.
- Google OAuth (`auth/post-login-google`) is a separate sign-in path that issues the same JWT.

### Email
- Templates in `server/views/emails/`, EJS, named `email-*.ejs` (also `form-*.ejs` for form-success bodies). Layout: `views/layouts/layout-email.ejs`.
- Sent via `sails.helpers.sendTemplateEmail({ template, templateData, to, subject, … })`.
- Gated by `disableSendEmails: true` in `custom.js` — when true the rendered HTML is logged and **not sent**. Production flips this off.
- SMTP is Gmail with OAuth2: `EMAIL_FROM`, `GOOGLE_CLIENT_ID`, `EMAIL_CLIENT_SECRET`, `EMAIL_REFRESH_TOKEN`.
- Non-production mail subjects are auto-prefixed with `[UAT]`.

### Datastore & models
- `sails-mongo`; connection via `server/config/datastores.js` + `MONGODB_*` env vars.
- `migrate: 'safe'` always.
- All models get implicit `id` (string, `columnName: '_id'`), `createdAt`, `updatedAt`, and **`isDeleted` (default false)** — soft delete is the convention; queries should usually filter `isDeleted: false`.
- A hard-coded `dataEncryptionKeys.default` lives in `config/models.js` — don't touch unless rotating keys.
- Models: `User`, `Form`, `Submission`, `ClassTrackingData`, `Baptism`, `Membership`, `LeadershipTeam`, `Giving`, `PaymentData`, `Announcement`, `PopUp`, `Testimonies`, `Fundraise`, `LiveSermon`, `SermonNotesParent`, `UserSermonNotes`, `LastUpdated`, `ResetPwdToken`.
- **Class tracking** (GH-1386, spec in `specs/admin-class-forms-tracking.md`): `Form.isClass` + `Form.classTrackingTemplate.courses[]` is the mutable template; `ClassTrackingData` snapshots each registrant's courses at submission time so historical records are never rewritten by later config changes. Courses are archived (`isActive: false`), never hard-deleted.

### Bootstrap & scheduled jobs (`server/config/bootstrap.js`)
- Initializes `sails.cache` (`node-cache`, 24h TTL) — used by `sails.helpers.cache.cacheLatest()`.
- Three `node-schedule` crons:
  - `0 0 9 * * *` — `cacheLatest()` daily 9am (also runs once 1s after lift)
  - `0 0 7 * * 6` — `sendBatchUsersQuery()` Saturdays 7am
  - `0 0 21 * * *` — `parseUserQuery()` daily 9pm

### External integrations
- **WordPress REST API** at `hongkong.sub.hmccglobal.org` is the source of truth for sermons, speakers, series, service types, posts, tags, media, and pages (hosts configured in `custom.js`). `/api/sermons/*` proxies and transforms it — sermons are **not** stored in Mongo (only `UserSermonNotes` / `SermonNotesParent` are local).
- **IMAP mail parsing** (`imapflow` + `mailparser`) for inbound mail.
- **Google Auth Library** for verifying Google OAuth tokens.

## Code Style Conventions

From `AGENTS.md` plus what's in the tree:
- **Files**: `.js` everywhere, JSX included. No TypeScript, no `.jsx` extension in use.
- **Components**: PascalCase filenames, functional components with hooks. Utilities: camelCase.
- **Import order**: `components` / external packages → absolute `utils/…`, `pages/…` → relative → assets.
- **Event handlers**: `handle*` prefix.
- **Async**: always `try { … } catch (err) { console.log(err); }`.
- **Server lint policy**: zero warnings. UI lint must also pass (CI runs `yarn lint` before the build).
- **Old code uses double quotes**, newer code single — Prettier is configured for single, so prefer those.

## Environment Variables

### Server (`server/.env` — loaded via `dotenv` in `config/bootstrap.js`)
Required: `JWT_KEY`, `EMAIL_FROM`, `GOOGLE_CLIENT_ID`, `EMAIL_CLIENT_SECRET`, `EMAIL_REFRESH_TOKEN`, MongoDB vars (see `config/datastores.js`).

### UI (`ui/.env`)
Only `REACT_APP_*` vars are exposed (`envPrefix` in `vite.config.js` preserves the CRA prefix). Read them as `import.meta.env.REACT_APP_*`. Known: `REACT_APP_GOOGLE_CLIENT_ID`.

In CI both `.env` files are written from GitHub secrets (`UI_ENV`, `SERVER_ENV`) before build.

## CI / Deploy (`.github/workflows/`)
- `build-and-upload-workflow.yml` — manual (`workflow_dispatch`), pick `uat` or `prod`. Node **20.19.0**; installs deps in `/`, `server/`, `ui/`; writes env files from secrets; **runs `cd ui && yarn lint`** (because `vite build` doesn't lint); builds the UI; moves `ui/build/*` → `server/client/`; deletes `ui/`; zips and uploads the artifact; then dispatches the deploy workflow.
- `deploy-and-delete-workflow.yml` — picks up the artifact and deploys.
- `opencode-review.yml` — automated code review on PRs.

Because production serves the SPA from `server/client/`, any change affecting route resolution (especially the catch-all in `routes.js`) needs a real build to verify, not just `yarn start`.

## Git / Contribution Workflow (from README.md)

- **Branch naming**: `(issueNumber)-(type)-(description)`, e.g. `4-feature-anncmt-rest-api`. Types: `feature`, `release`, `hotfix`.
- **Flow**: `feature` → `release` → `main`. Only `hotfix` merges directly to `main`.
- **Commits**: prefix with `GH-<issue#>:` (e.g. `GH-8: add announcement endpoint`) — this is what links commits to issues.
- Use `git pull --rebase` to keep history linear.
- `CODEOWNERS` is `* @hmcc-global/code-owners` — **every** PR needs a code-owner review.

## Common Gotchas Summary

1. **`Authorisation` (not `Authorization`)** — bearer header spelling is non-standard on both sides.
2. **Never import `@chakra-ui/*` outside `ui/src/components/chakra` or `components/icons.js`** — ESLint blocks it and CI lints before building.
3. **`t3ch` is a real accessType string**, not a typo.
4. **Default policy is `isLoggedIn`** — new endpoints are private unless opened in `policies.js`.
5. **No autoroutes** — every endpoint needs a manual `routes.js` entry.
6. **Vite 7 is pinned** — the JSX-in-`.js` esbuild loader has no Vite 8 equivalent yet.
7. **`import.meta.env`, not `process.env`**, for `REACT_APP_*` (except `PUBLIC_URL`, which is `define`d).
8. **Vitest, not Jest** — CRA/Jest CLI flags don't work.
9. **Sermons are WordPress-fetched, not stored**; only user-generated sermon-notes data lives in Mongo.
10. **`disableSendEmails: true`** by default — flipping it affects real users.
11. **All routes use `<PrivateRoute>`** — even `'public'` ones. Don't reach for a bare `<Route>`.
12. **Two announcement APIs exist** (`/api/announcements/*` legacy, `/api/announcement/*` new) — pick deliberately.
13. **Models implicitly have `isDeleted`** — soft-delete by convention.
14. **`.gitignore` lists `.github`** even though the workflow files are tracked — new workflow files need `git add -f`.
