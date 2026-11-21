# Architecture and Stack

## Technology Stack

- **UI**: React 18, plain JavaScript (`.js` files containing JSX; Vite's esbuild loader is configured for it, so no `.jsx` and no TypeScript), Vite 7 (pinned; Vite 8 has no equivalent JSX-in-.js recipe), Chakra UI **1** + Emotion, framer-motion 4, Redux Toolkit + redux-persist, react-router-dom **5**, axios, react-hook-form, TipTap 2, AG Grid 27 (community + enterprise), luxon 1, react-datepicker, html-react-parser, react-markdown, ExcelJS
- **Server**: Sails 1, `sails-mongo`, `node-schedule`, `node-cache`, `jsonwebtoken`, `google-auth-library`, `imapflow` + `mailparser`, Nodemailer over Gmail OAuth2
- **Content source**: WordPress REST API at `hongkong.sub.hmccglobal.org` for sermons, speakers, series, posts, media, pages

Majors only. `ui/package.json` and `server/package.json` are the source of truth for exact versions; check them before relying on an API.

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
