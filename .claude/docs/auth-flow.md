# Auth Flow

- JWT signed with `process.env.JWT_KEY`. `custom.js` says `tokenExpiryHours: 1`, but `helpers/auth/generate-jwt.js` issues `expiresIn: 24*60*60*7*8` (about 2 months). The helper wins.
- **The bearer header is spelled `Authorisation`.** `isLoggedIn.js` reads `req.headers.authorisation`; `customAxios.js` sends `Authorisation: 'Bearer ' + token`. The conventional spelling silently 401s. Never correct it on one side only.
- `verifyJwt` returns the full User minus password and `emailProofToken`; on expiry it exits `'token-expired'`, which `PrivateRoute` watches for.
- Google OAuth (`auth/post-login-google`) is a separate sign-in path that ends in the same JWT.
