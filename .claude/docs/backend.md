# Backend (Sails)

## Action shape

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

## Routes and policies

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

## Models

- `sails-mongo`; connection in `config/datastores.js` from `MONGODB_*` env vars. `migrate: 'safe'` always.
- Implicit attributes on every model: `id` (`columnName: '_id'`), `createdAt`, `updatedAt`, **`isDeleted`** (default false). Soft-delete is the convention: filter `isDeleted: false` in queries.
- `dataEncryptionKeys.default` in `config/models.js` is hard-coded. Leave it unless rotating keys.
- Models: `User`, `Form`, `Submission`, `Baptism`, `Membership`, `LeadershipTeam`, `Giving`, `PaymentData`, `Announcement`, `PopUp`, `Testimonies`, `Fundraise`, `LiveSermon`, `SermonNotesParent`, `UserSermonNotes`, `LastUpdated`, `ResetPwdToken`.

## Bootstrap and cron (`config/bootstrap.js`)

- `sails.cache` is a `node-cache` with 24h TTL, used via `sails.helpers.cache.cacheLatest()`.
- Cron via `node-schedule`: `0 0 9 * * *` `cacheLatest()` (also once 1s after lift); `0 0 7 * * 6` `sendBatchUsersQuery()`; `0 0 21 * * *` `parseUserQuery()`.

## Server lint

`yarn lint` in `server/` must show 0 errors before a commit. There are hundreds of pre-existing warnings; do not add to them and do not run `--fix` across files you did not touch.
