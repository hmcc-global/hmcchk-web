# Instructions for the HMCC HK Web agentic coding assistant

## Do this BEFORE you plan, propose, or act

### Mandatory Procedure
1. Match all tasks you're about to do against the *trigger table*. There can be multiple rules/files matched.
2. List ALL rule files you match, in bullet points.
3. Always open/read ALL matching docs.
4. Output a **Compliance** line quoting the exact rule, verbatim, from each doc.
5. Only then continue with your task.

### Trigger Table
If your work involves the task below, read the corresponding document/section first:
- write a commit message, branch name, or PR title/description → `.claude/docs/commit-convention.md` and `.claude/docs/pr-description.md`
- write or change any frontend code → the `react-frontend` skill (or subagent), `#frontend-code-standards`, `#working-in-a-messy-codebase`, and `#common-gotchas`
- add or change component styling or layout → `#chakra-and-styling`
- fetch data or call the API from the UI → `#data-and-api`
- add or change a route, or gate a page on access type → `#routing-and-access`
- write or change any backend code → `#backend-sails`
- add or change an API endpoint → `#backend-sails` (routes, policies, and the action shape)
- touch auth, JWT, or the bearer header → `#auth-flow`
- send or template an email → `#email`
- handle member, form-submission, or profile data → `#data-handling`
- review a branch or PR → the `/code-review` or `/deep-review` skill
- execute a plan or issue checklist → the `/gh-execute` skill

### Required Compliance-line format (the rule text comes from the doc, not from here)
> **Compliance (<doc-path-or-section>):** "<verbatim sentence copied from that doc>" → <what you will do>

---

> This file is the single source of instructions for **all** agentic coding assistants (Claude Code, Codex, OpenCode, Cursor, Kimi, and others). `CLAUDE.md` is a symlink to `AGENTS.md`; edit `AGENTS.md` only. Skills, docs, and the agent persona live under `.claude/` and are exposed to every tool: `.agents/skills` is a symlink to `.claude/skills` (Codex, Cursor, Kimi, OpenCode read it), and `.opencode/agent/` and `.cursor/agents/` hold OpenCode's and Cursor's copies of the subagent. Keep `.claude/settings.local.json` out of git.

# hmcchk-web

## Project Overview

The HMCC Hong Kong church website. Two independent packages in one repo, no workspaces wiring:

- `ui/` — React 18 **JavaScript** SPA on Vite 7, Chakra UI v1, Redux Toolkit, react-router-dom v5
- `server/` — Sails.js v1 backend, MongoDB via `sails-mongo`
- Root `package.json` holds Prettier and a few shared deps only

Tracking is GitHub Issues. Commits are `GH-<issue#>: …`, branches `<issue#>-<description>`, PRs merge `feature` → `release-<topic>` → `main`. See `.claude/docs/commit-convention.md`.

## Important Instruction Reminder

- Do what has been asked; nothing more, nothing less.
- NEVER create files unless they're absolutely necessary for achieving your goal. Prefer editing an existing file.
- NEVER proactively create documentation files or READMEs unless asked.
- NEVER add test files. This repo has no test suite by practice (`server/yarn test` runs lint; the UI has one skipped placeholder). Verify with lint, build, and the browser.
- Reuse existing pages and components before inventing new ones (see `#working-in-a-messy-codebase`).
- Use **yarn**, never npm. Node 20+ for the UI (Vite 7's floor; CI pins 20.19.0).

## Working in a Messy Codebase

Much of `ui/src/pages/` was written by junior volunteers over several years and it shows: 400-line page files, inline hex colours and pixel widths, separate `*Mobile.js` twins of desktop components, mixed quote styles, and three ways of doing the same thing. That is the starting point, not the standard.

- **Small edits match the file they are in.** Do not reformat, rename, or restructure code you were not asked to touch. A diff that mixes a fix with a cleanup is harder to review and to revert.
- **New code follows the standards in this file.** New files and components are where the bar is raised. Never copy a bad pattern into a new file because a neighbour has it.
- **Search before you build.** `ui/src/components/` is small; read its barrel and folder, then the sibling page folder. A component may exist under a different name.
- **Extract only on the second use.** A component moves to `ui/src/components/` when a second page needs it, not to tidy one page.
- **Name your precedent.** When two existing implementations conflict, say which file you followed and why. If neither is fit, say so and propose the smaller change.
- **Cleanups are their own issue and PR.** If something is bad enough to fix, open an issue and do it separately.

## Development Commands

```bash
# Install (three separate installs, no workspaces)
yarn && (cd server && yarn) && (cd ui && yarn)

# Run locally (two terminals)
cd server && nodemon ./app.js   # Sails on :1337 (production uses `yarn start`)
cd ui && yarn start             # Vite on :3000, proxies /api → :1337

# UI (in ui/)
yarn build                      # production build → ui/build (CI moves it to server/client)
yarn preview                    # serve the production build
yarn lint                       # eslint src — 0 errors required; 78 pre-existing warnings, don't add to them
yarn test --run                 # Vitest; only a skipped placeholder exists — do not add tests

# Server (in server/)
yarn lint                       # eslint . --max-warnings=0 on errors; 0 errors required
yarn start                      # NODE_ENV=production node app.js

# Format (from repo root, touched files only)
npx prettier --write "ui/src/<path>"
```

Prettier config: `.prettierrc.json` — 2-space, single quotes, semicolons, `trailingComma: 'es5'`.

## Technology Stack

- **UI**: React 18, plain JavaScript (`.js` files containing JSX; Vite's esbuild loader is configured for it, so no `.jsx` and no TypeScript), Vite 7 (pinned; Vite 8 has no equivalent JSX-in-.js recipe), Chakra UI **1.6** + Emotion, framer-motion 4, Redux Toolkit + redux-persist, react-router-dom **5**, axios, react-hook-form, TipTap 2, AG Grid 27 (community + enterprise), luxon 1, react-datepicker, html-react-parser, react-markdown, ExcelJS
- **Server**: Sails 1, `sails-mongo`, `node-schedule`, `node-cache`, `jsonwebtoken`, `google-auth-library`, `imapflow` + `mailparser`, Nodemailer over Gmail OAuth2
- **Content source**: WordPress REST API at `hongkong.sub.hmccglobal.org` for sermons, speakers, series, posts, media, pages

## Architecture

### Frontend (`ui/src/`)

| Path | Role |
| --- | --- |
| `index.js` | Entry: `GoogleOAuthProvider` → `StrictMode` → `ChakraProvider`; React 18 `createRoot` |
| `App.js` | Redux `Provider` → `PersistGate` → `BrowserRouter`; renders `NavBar`, `MainContainer`, `MobileNavBar` |
| `pages/MainContainer.js` | The entire `<Switch>`. Every route is a `<PrivateRoute>` |
| `pages/PrivateRoute.js` | Token verification, axios rebuild, static data, admin shell, profile redirects |
| `pages/<feature>/` | Routed pages plus components used only by that page. PascalCase files |
| `pages/admin/` | Management UI (`users/`, `forms/`, `announcements/`, `popup/`, `liveSermon/`, `testimony/`, `leadershipTeam/`, `sermonNotes/`, `fundraise/`, `follow-up/`, `navigation/`, `site-links/`, `ag-grid-editors/`) |
| `components/` | The components library and the **only** import source for UI |
| `components/chakra/index.js` | The single file allowed to import `@chakra-ui/react` |
| `components/icons.js` | The single file allowed to import `@chakra-ui/icons` |
| `components/index.js` | Barrel: explicit named re-exports of the Chakra surface plus app components |
| `components/TipTap/` | Rich-text editor wrappers |
| `utils/` | Non-UI shared logic, camelCase files: `customAxios.js`, `constants.js`, `lists.js`, `eventsHelpers.js`, `formsHelpers.js`, `arrayToExcel.js`, `TrackingUtil.js` |
| `reducers/userSlice.js` | The only Redux slice: `{ user: <jwt string> }` with `signin` / `signout` |
| `theme.js` | Chakra theme: Inter for heading/body, `dm_sans` / `dm_sans_bold` text styles |

Absolute imports resolve from `ui/src` via `jsconfig.json` (`baseUrl: "src"`) and `vite-tsconfig-paths`: `from 'components'`, `from 'utils/customAxios'`, `from 'pages/...'`.

### Backend (`server/api/`)

| Path | Role |
| --- | --- |
| `controllers/<feature>/<action>.js` | One file per action, grouped by feature folder |
| `models/` | Waterline models on MongoDB, each exporting `{ attributes }` |
| `helpers/<folder>/<name>.js` | Business logic, called as `sails.helpers.<folder>.<camelCaseName>()` |
| `policies/` | Auth middleware wired in `config/policies.js` |
| `responses/` | Custom responses (`unauthorized.js`) |
| `views/emails/` | EJS email templates |

`config/routes.js` declares every route explicitly. `config/policies.js` maps actions to policies. `config/bootstrap.js` loads `.env`, creates `sails.cache`, and schedules cron jobs.

## Frontend Code Standards

### File organisation

- Pages and page-only components in `pages/<feature>/`. Reusable (2+ pages) components in `components/`.
- Never import `@chakra-ui/react` or `@chakra-ui/icons` outside the two boundary files. ESLint `no-restricted-imports` fails the build on it. Need a Chakra export the barrel lacks? Add one explicit line to `components/index.js`. Never `export *` there: colliding names are silently dropped.
- Files inside `components/` import from `./chakra` (relative), never from the `components` barrel (module-init cycle).
- Changing the UI library (Chakra bump, Tailwind) happens inside `components/` one export at a time; consumers never change. See `ui/src/components/README.md`.

### Imports

```javascript
// 1. External packages and the components library
import { Box, Flex, useToast } from 'components';
import { ChevronLeftIcon } from 'components/icons';
import { useEffect, useState } from 'react';

// 2. Shared utils (absolute from src) and local relative imports
import { customAxios as axios } from 'utils/customAxios';
import HeroSection from './HeroSection';

// 3. Assets
import logo from './assets/logo.png';
```

### Component shape

```javascript
const ComponentName = (props) => {
  const { title, onSubmit } = props;
  const [data, setData] = useState(null);

  useEffect(() => {
    // effect
  }, []);

  const handleClick = () => {};

  return <Box>{title}</Box>;
};

export default ComponentName;
```

### Naming

- Components `PascalCase`; functions, props, and callbacks `camelCase`; true constants `UPPER_SNAKE_CASE`.
- Booleans `is/has/should`; event props `on*`; handlers `handle*`.
- `.js` for everything.

### Preferences

- Functional components with hooks; arrow functions; `const`/`let`.
- Ternary for either/or rendering, `&&` only for render-if-true, complex conditions extracted to a named `const`.
- Single quotes (older files use double; leave them unless you are already editing that line).
- **No type checker exists.** Guard every `.map`, `.length`, and nested property on fetched data. Backend records are inconsistent (old announcements lack `eventType`, speakers may be null, arrays sometimes arrive as strings). One unguarded access white-screens the page silently because of the catch-and-log convention. `Array.isArray` and `?.` are cheap.
- luxon under Vite is ESM: `DateTime.fromISO(...)`, never `new DateTime.fromISO(...)`.
- Env vars: `import.meta.env.REACT_APP_*` (Vite with the CRA prefix kept). `process.env.PUBLIC_URL` is defined to `''` and still prefixes public asset paths.
- Default to no comments. If a line needs explaining, rename the symbol. A comment is for a *why* the code cannot say.

## Chakra and Styling

- Chakra **v1** API only. No v2/v3 names (`colorPalette`, `asChild`, Chakra's `Card`; the repo has its own `components/Card.js`).
- Responsive props over media queries: `w={{ base: '100%', md: '50%' }}`; `useBreakpointValue({ base: true, md: false })` for logic.
- Semantic layout: `Flex`, `Box`, `VStack`, `HStack`, `Container`, `SimpleGrid`. `bgColor` not `background`. `_hover` / `_active` for pseudo-states.
- Prefer theme scale values (`teal.500`, spacing `4`, `textStyle="dm_sans"`) over raw hex and pixels. When matching a Figma token with no theme equivalent, hoist the raw value into one `const` at the top of the file rather than repeating it inline.
- Every page renders on desktop and mobile. Check both before calling a layout done. Prefer one responsive component over a new `*Mobile.js` twin; when you must edit an existing twin, edit both.
- `sass` is installed for a few legacy `.scss` files; do not add new ones.

## Data and API

```javascript
import { customAxios as axios } from 'utils/customAxios';

const fetchData = async () => {
  try {
    const { data } = await axios.get('/api/endpoint');
    setData(data);
  } catch (err) {
    console.log(err);
  }
};
```

- `customAxios` is a singleton (`export let customAxios`) rebuilt by `updateAxiosClient(token)` from `PrivateRoute` whenever the token changes. It sets the **`Authorisation`** header (British spelling, see `#auth-flow`). Never rename or "fix" it.
- Unauthenticated calls (`verify-token`, `forgot-password`) use bare `axios`, as `PrivateRoute` does.
- `console.log(err)` in catch is the convention. When the user needs feedback (submit, save, email), add a `useToast` with generic text; never render the raw server error.
- Sermons, series, speakers, posts, and pages come from WordPress through `/api/sermons/*` and arrive as WordPress-shaped HTML; render with `html-react-parser`. Only `UserSermonNotes` and `SermonNotesParent` are in Mongo.
- Two announcement APIs exist: `/api/announcements/*` (legacy plural) and `/api/announcement/*` (new singular), a migration in progress. Pick deliberately and say which.

## Routing and Access

- react-router-dom **v5**: `<Switch>`, render-prop `<Route render={…}>`, `props.history.push`. Never `useNavigate`, `Routes`, `element=`, or `Navigate`.
- Every route lives in `pages/MainContainer.js` as `<PrivateRoute permissions={[...]}>`, public ones included. Never a bare `<Route>`.
- `permissions` values: `'public'` (anyone), `'noUser'` (only when logged out), or an access type: `stewardship`, `admin`, `alumni`, `t3ch`, `signed`, `unsigned`, `ministry`, `tc`. `t3ch` is spelled with a 3; it is the stored value.
- `PrivateRoute` on mount and on `user` change: calls `/api/auth/verify-token`, clears localStorage and reloads on `token-expired`, rebuilds `customAxios`, loads static lists (lifegroup, campus, lifestage, formAlertType) into `props.staticData`, wraps paths containing `admin` in `SidebarWithHeader`, and redirects `/profile` ↔ `/complete-profile` on `hasFilledProfileForm`.
- Those redirects match `pathname` by exact string. Adding a sub-route under a gated path (e.g. `/profile/<tab>`) silently bypasses the gate; widen the check to `pathname === '/x' || pathname.startsWith('/x/')` in the same change.
- Frontend gating is UX only. `server/config/policies.js` is the real check.

## Backend (Sails)

### Action shape

Controllers and helpers share one shape. Do not drift from it.

```javascript
module.exports = {
  friendlyName: 'Create form',
  description: 'Create a new form',
  inputs: { formToSave: { type: 'json', required: true } },
  exits: {
    success: { description: 'Created' },
    error: { description: 'Failed' },
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

Models are globals: `User.findOne(…)`, no import.

### Routes and policies

- No blueprints, no auto-routing. A new endpoint needs a line in `config/routes.js` **and** an entry in `config/policies.js`, or the default `'*': 'isLoggedIn'` applies.
- Policies map to access-type sets:

| Policy | Allowed access types |
| --- | --- |
| `isLoggedIn` | any logged-in user |
| `aboveMinistry` | `ministry, tc, t3ch, admin, stewardship` |
| `aboveTc` | `tc, t3ch, admin, stewardship` |
| `aboveTcNotTech` | `tc, admin, stewardship` |
| `aboveTech` | `t3ch, admin, stewardship` |
| `aboveAdmin` | `admin, stewardship` |
| `isStewardship` | `stewardship` |

- The catch-all `get /*` serves `server/client/index.html`, the built SPA. That folder exists only after CI builds `ui/` and moves `ui/build/*` there. Route-resolution changes need a real build to test, not `yarn start`.

### Models

- `sails-mongo`; connection in `config/datastores.js` from `MONGODB_*` env vars. `migrate: 'safe'` always.
- Implicit attributes on every model: `id` (`columnName: '_id'`), `createdAt`, `updatedAt`, **`isDeleted`** (default false). Soft-delete is the convention: filter `isDeleted: false` in queries.
- `dataEncryptionKeys.default` in `config/models.js` is hard-coded. Leave it unless rotating keys.
- Models: `User`, `Form`, `Submission`, `Baptism`, `Membership`, `LeadershipTeam`, `Giving`, `PaymentData`, `Announcement`, `PopUp`, `Testimonies`, `Fundraise`, `LiveSermon`, `SermonNotesParent`, `UserSermonNotes`, `LastUpdated`, `ResetPwdToken`.

### Bootstrap and cron (`config/bootstrap.js`)

- `sails.cache` is a `node-cache` with 24h TTL, used via `sails.helpers.cache.cacheLatest()`.
- Cron via `node-schedule`: `0 0 9 * * *` `cacheLatest()` (also once 1s after lift); `0 0 7 * * 6` `sendBatchUsersQuery()`; `0 0 21 * * *` `parseUserQuery()`.

### Server lint

`yarn lint` in `server/` must show 0 errors before a commit. There are hundreds of pre-existing warnings; do not add to them and do not run `--fix` across files you did not touch.

## Auth Flow

- JWT signed with `process.env.JWT_KEY`. `custom.js` says `tokenExpiryHours: 1`, but `helpers/auth/generate-jwt.js` issues `expiresIn: 24*60*60*7*8` (about 2 months). The helper wins.
- **The bearer header is spelled `Authorisation`.** `isLoggedIn.js` reads `req.headers.authorisation`; `customAxios.js` sends `Authorisation: 'Bearer ' + token`. The conventional spelling silently 401s. Never correct it on one side only.
- `verifyJwt` returns the full User minus password and `emailProofToken`; on expiry it exits `'token-expired'`, which `PrivateRoute` watches for.
- Google OAuth (`auth/post-login-google`) is a separate sign-in path that ends in the same JWT.

## Email

- Templates in `server/views/emails/` as `email-*.ejs` (and `form-*.ejs` for form-success bodies); layout `views/layouts/layout-email.ejs`.
- Send with `sails.helpers.sendTemplateEmail.with({ template, templateData, to, subject })`.
- `disableSendEmails: true` in `custom.js` logs the rendered HTML instead of sending. Production flips it. Changing it affects real members.
- SMTP is Gmail OAuth2: `EMAIL_FROM`, `GOOGLE_CLIENT_ID`, `EMAIL_CLIENT_SECRET`, `EMAIL_REFRESH_TOKEN`. Non-production subjects get a `[UAT]` prefix.

## Data Handling

Member profiles, life group and campus assignments, form submissions, giving records, and sermon notes are personal data about real congregation members.

- Never paste them into commits, PR bodies, issue comments, screenshots, fixtures, or logs. Use dummy accounts for screenshots and blur anything real.
- Server log lines carry IDs, not names or emails.
- `REACT_APP_*` values are inlined into the public bundle; never put a secret there.
- No credentials in code. Both `.env` files come from GitHub secrets in CI.

## Environment Variables

- `server/.env` (loaded by `dotenv` in `bootstrap.js`): `JWT_KEY`, `EMAIL_FROM`, `GOOGLE_CLIENT_ID`, `EMAIL_CLIENT_SECRET`, `EMAIL_REFRESH_TOKEN`, `MONGODB_*`.
- `ui/.env`: `REACT_APP_*` only (Vite `envPrefix`). Known: `REACT_APP_GOOGLE_CLIENT_ID`. Required for `yarn build`.

## CI / Deploy (`.github/workflows/`)

- `build-and-upload-workflow.yml` (manual, `uat` or `prod`): installs all three packages, writes env files from `UI_ENV` / `SERVER_ENV` secrets, runs `yarn lint` then `yarn build` in `ui/`, moves `ui/build/*` → `server/client/`, deletes `ui/`, zips, uploads. Node 20.19.0.
- `deploy-and-delete-workflow.yml` deploys that artifact. `docker-build-deploy.yml`, `pr-preview.yml`, `pr-cleanup.yml` handle container and preview flows.
- `opencode-review.yml` runs an automated review on every PR open/push and on `/oc` comments. Its findings are addressed as `GH-<issue#>: address opencode comments`.

## PR and Commit References

Read `.claude/docs/commit-convention.md` and `.claude/docs/pr-description.md` before writing any of these. Short version: `GH-<issue#>:` on every commit and PR title, `Closes #<issue#>` as the first PR line, base on the release branch when one exists, stack dependent PRs.

## Common Gotchas

1. `Authorisation`, not `Authorization`. Both sides.
2. `t3ch` is an access type, not a typo.
3. Default policy is `isLoggedIn`; new endpoints are private until opened in `policies.js`.
4. No autoroutes; every endpoint needs a `routes.js` line.
5. Sermons come from WordPress, not Mongo.
6. The SPA is served from `server/client/` only after a build.
7. `disableSendEmails: true` by default; emails are logged, not sent.
8. All routes use `<PrivateRoute>`, even public ones, and sub-routes can bypass its exact-pathname gates.
9. Two announcement APIs; pick deliberately.
10. Models have `isDeleted`; filter it.
11. Never import `@chakra-ui/*` outside `components/chakra/` and `components/icons.js`.
12. JSX lives in `.js`; Vite 7 is pinned for that. Do not rename to `.jsx` piecemeal and do not bump to Vite 8.
13. `new DateTime.…` throws under Vite; luxon statics are plain calls.
14. `customAxios` lives in `utils/`, not `helpers/`. Old snippets and docs point at `../helpers/customAxios`; that path is gone.
15. `node_modules` is checked in at the repo root and `CODEOWNERS` guards it. Do not commit changes there.

## Tooling

- `gh` CLI for issues and PRs: `gh issue view <n> --comments`, `gh pr view --json baseRefName`, `gh pr create --base <branch>`.
- Skills in `.claude/skills/` (also reachable as `.agents/skills/`): `react-frontend`, `code-review`, `deep-review`, `gh-execute`, plus the `gitnexus/*` set. Every tool that supports `SKILL.md` finds them there.
- GitNexus is expected in this repo (see `#gitnexus-setup` and the block at the end of this file). The committed parts are the skills and that block; the index itself is per-machine.
- Agent persona in `.claude/agents/react-frontend.md`. Claude Code dispatches it as a subagent, OpenCode via `.opencode/agent/react-frontend.md`, Cursor via `.cursor/agents/react-frontend.md`, and every other tool through the `react-frontend` skill, which points at the same file. Edit the `.claude/agents/` file only; the other three are pointers.
- Docs in `.claude/docs/`: `commit-convention.md`, `pr-description.md`.

## GitNexus Setup

GitNexus gives the agent a call graph of this repo (impact analysis, execution flows, safe renames). The rules in the block below assume it is running. Two one-time steps per clone:

```bash
npx gitnexus analyze        # builds the local index into .gitnexus/ (gitignored, ~60 MB) and writes .gitnexus/run.cjs
npx gitnexus setup          # registers the MCP server in your coding tool (Claude Code, Cursor, OpenCode, Codex, …); add -c <tool> to pick one
```

Re-run `analyze` after pulling large changes or when a tool reports the index is stale. On npm 11 an `npx` install crash (`node.target is null`) is a known issue; `npm i -g gitnexus` then `gitnexus analyze` works around it. Never commit `.gitnexus/`; it contains absolute paths and a machine-local database.

If GitNexus is not installed yet, say so at the start of the task and fall back to grep and file reads; do not pretend to have run `impact`.

<!-- gitnexus:start -->
# GitNexus — Code Intelligence

This project is indexed by GitNexus as **hmcchk-web** (2232 symbols, 3907 relationships, 107 execution flows). Use the GitNexus MCP tools to understand code, assess impact, and navigate safely.

> Index stale? Run `node .gitnexus/run.cjs analyze` from the project root — it auto-selects an available runner. No `.gitnexus/run.cjs` yet? `npx gitnexus analyze` (npm 11 crash → `npm i -g gitnexus`; #1939).

## Always Do

- **MUST run impact analysis before editing any symbol.** Before modifying a function, class, or method, run `impact({target: "symbolName", direction: "upstream"})` and report the blast radius (direct callers, affected processes, risk level) to the user.
- **MUST run `detect_changes()` before committing** to verify your changes only affect expected symbols and execution flows. For regression review, compare against the default branch: `detect_changes({scope: "compare", base_ref: "main"})`.
- **MUST warn the user** if impact analysis returns HIGH or CRITICAL risk before proceeding with edits.
- When exploring unfamiliar code, use `query({search_query: "concept"})` to find execution flows instead of grepping. It returns process-grouped results ranked by relevance.
- When you need full context on a specific symbol — callers, callees, which execution flows it participates in — use `context({name: "symbolName"})`.
- For security review, `explain({target: "fileOrSymbol"})` lists taint findings (source→sink flows; needs `analyze --pdg`).

## Never Do

- NEVER edit a function, class, or method without first running `impact` on it.
- NEVER ignore HIGH or CRITICAL risk warnings from impact analysis.
- NEVER rename symbols with find-and-replace — use `rename` which understands the call graph.
- NEVER commit changes without running `detect_changes()` to check affected scope.

## Resources

| Resource | Use for |
|----------|---------|
| `gitnexus://repo/hmcchk-web/context` | Codebase overview, check index freshness |
| `gitnexus://repo/hmcchk-web/clusters` | All functional areas |
| `gitnexus://repo/hmcchk-web/processes` | All execution flows |
| `gitnexus://repo/hmcchk-web/process/{name}` | Step-by-step execution trace |

## CLI

| Task | Read this skill file |
|------|---------------------|
| Understand architecture / "How does X work?" | `.claude/skills/gitnexus/gitnexus-exploring/SKILL.md` |
| Blast radius / "What breaks if I change X?" | `.claude/skills/gitnexus/gitnexus-impact-analysis/SKILL.md` |
| Trace bugs / "Why is X failing?" | `.claude/skills/gitnexus/gitnexus-debugging/SKILL.md` |
| Rename / extract / split / refactor | `.claude/skills/gitnexus/gitnexus-refactoring/SKILL.md` |
| Tools, resources, schema reference | `.claude/skills/gitnexus/gitnexus-guide/SKILL.md` |
| Index, status, clean, wiki CLI commands | `.claude/skills/gitnexus/gitnexus-cli/SKILL.md` |

<!-- gitnexus:end -->
