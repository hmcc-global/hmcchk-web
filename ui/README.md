# HMCC HK — UI

React SPA built with [Vite](https://vite.dev) (migrated from Create React App in GH-1404).

**Requires Node 20+** (CI builds on Node 20). If you were on Node 16 for the old CRA setup, upgrade before running the commands below.

## Available Scripts

Run these from `ui/` (install deps first with `yarn`):

### `yarn start`

Starts the Vite dev server at [http://localhost:3000](http://localhost:3000) with hot module replacement / Fast Refresh. `/api/*` requests are proxied to the Sails backend on `:1337` (see `server.proxy` in `vite.config.js` — this replaced CRA's `src/setupProxy.js`).

To point the proxy at a different backend (e.g. production — **don't do this unless you know what you're doing**), temporarily change the `server.proxy` entry to `{ target: 'https://<backend-host>', changeOrigin: true }`. Don't commit that change.

### `yarn build`

Production build into `ui/build/` (kept as `build/` rather than Vite's default `dist/` so CI's `mv ui/build/* server/client` step is unchanged).

### `yarn preview`

Serves the production build locally for a quick smoke test.

### `yarn test`

Runs [Vitest](https://vitest.dev) (jsdom + Testing Library, setup in `src/setupTests.js`). Use `yarn test --run` for a single non-watch pass.

### `yarn lint`

Runs ESLint over `src/` with the same `react-app` config CRA used (now installed explicitly since `react-scripts` no longer provides it).

## Vite migration notes (GH-1404)

- **JSX lives in `.js` files.** Vite only parses JSX in `.jsx` by default, so `vite.config.js` configures the esbuild `loader: 'jsx'` for `src/**/*.js` (no mass rename). This recipe is esbuild-specific — it is why we pin **Vite 7**; Vite 8 (Rolldown/Oxc) has no documented equivalent yet. Renaming `.js` → `.jsx` is the real long-term fix before a Vite 8 upgrade.
- **Fast Refresh on `.js` files** is enabled by the small `js-fast-refresh-hint` plugin in `vite.config.js` — `@vitejs/plugin-react` only instruments files it can tell contain JSX.
- **Env vars keep the `REACT_APP_` prefix** (`envPrefix` in `vite.config.js`), so `ui/.env` and the CI `UI_ENV` secret are unchanged. In code they are read via `import.meta.env.REACT_APP_*` instead of `process.env.REACT_APP_*`.
- **`process.env.PUBLIC_URL`** (used in ~150 places for public asset paths) is defined to `""` — assets are served from the site root. In dev, Vite injects it as a runtime global; in builds it is inlined.
- **`index.html` lives at `ui/index.html`** (Vite convention), not `ui/public/index.html`. Everything else in `public/` is still copied to the build root as before.
