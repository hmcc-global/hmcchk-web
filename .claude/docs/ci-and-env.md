# CI, Deploy, and Environment Variables

## Environment Variables

- `server/.env` (loaded by `dotenv` in `bootstrap.js`): `JWT_KEY`, `EMAIL_FROM`, `GOOGLE_CLIENT_ID`, `EMAIL_CLIENT_SECRET`, `EMAIL_REFRESH_TOKEN`, `MONGODB_*`.
- `ui/.env`: `REACT_APP_*` only (Vite `envPrefix`). Known: `REACT_APP_GOOGLE_CLIENT_ID`. Required for `yarn build`.

## CI / Deploy (`.github/workflows/`)

- `build-and-upload-workflow.yml` (manual, `uat` or `prod`): installs all three packages, writes env files from `UI_ENV` / `SERVER_ENV` secrets, runs `yarn lint` then `yarn build` in `ui/`, moves `ui/build/*` → `server/client/`, deletes `ui/`, zips, uploads. Node 20.19.0.
- `deploy-and-delete-workflow.yml` deploys that artifact. `docker-build-deploy.yml`, `pr-preview.yml`, `pr-cleanup.yml` handle container and preview flows.
- `opencode-review.yml` runs an automated review on every PR open/push and on `/oc` comments. Its findings are addressed as `GH-<issue#>: address opencode comments`.
