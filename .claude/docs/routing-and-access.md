# Routing and Access

- react-router-dom **v5**: `<Switch>`, render-prop `<Route render={…}>`, `props.history.push`. Never `useNavigate`, `Routes`, `element=`, or `Navigate`.
- Every route lives in `pages/MainContainer.js` as `<PrivateRoute permissions={[...]}>`, public ones included. Never a bare `<Route>`.
- `permissions` values: `'public'` (anyone), `'noUser'` (only when logged out), or an access type: `stewardship`, `admin`, `alumni`, `t3ch`, `signed`, `unsigned`, `ministry`, `tc`. `t3ch` is spelled with a 3; it is the stored value.
- `PrivateRoute` on mount and on `user` change: calls `/api/auth/verify-token`, clears localStorage and reloads on `token-expired`, rebuilds `customAxios`, loads static lists (lifegroup, campus, lifestage, formAlertType) into `props.staticData`, wraps paths containing `admin` in `SidebarWithHeader`, and redirects `/profile` ↔ `/complete-profile` on `hasFilledProfileForm`.
- Those redirects match `pathname` by exact string. Adding a sub-route under a gated path (e.g. `/profile/<tab>`) silently bypasses the gate; widen the check to `pathname === '/x' || pathname.startsWith('/x/')` in the same change.
- Frontend gating is UX only. `server/config/policies.js` is the real check.
