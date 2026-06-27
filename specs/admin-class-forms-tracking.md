# Class Tracking for Admin Forms

| | |
|---|---|
| **Status** | Implemented — pending live QA |
| **Issue** | #1386 |
| **Author** | Yoo Yuen Yau |
| **Last updated** | 2026-06-27 |
| **Area** | Admin · Forms · Submissions |

---

## 1. Summary

Admins can designate a sign-up form as a **class** composed of one or more **courses**.
Each registrant's progress through every course — status, start/completion dates, and
remarks — is tracked and editable inline from the existing admin "View Data" submission
grid, alongside the form's other submission data.

Course configuration evolves between seasons. The defining constraint of this feature is
that **historical records are immutable**: changing a class's course setup later must never
rewrite the data of registrants who signed up earlier.

## 2. Background & motivation

Ministries run multi-course classes (e.g. Transformation Center) and currently track each
registrant's progress in external spreadsheets. Admins already manage per-submission state
(payment status) inside the form data viewer for "paid" forms; class tracking extends that
same surface so progress is managed where the registrant data already lives.

Course lineups are not static. Across seasons a course may be dropped, added, or moved to a
different hosting platform. A naive design that edits a single shared course definition would
silently corrupt the records of past registrants. Preserving that history is the core problem
this spec solves.

## 3. Goals & non-goals

### Goals
- Let an admin mark a form as a class and define its courses.
- Auto-create a per-registrant progress record on each submission.
- Let admins view and edit progress inline in the existing submission grid.
- Preserve each registrant's historical course record across later config changes.

### Non-goals
- Registrant-facing progress views (admin-only for now).
- Bulk progress editing or import.
- Reordering or renaming courses retroactively across existing records.
- A dedicated permission tier for class data (reuses existing form-data access).

## 4. Requirements

Keywords **MUST** / **SHOULD** per RFC 2119.

### Functional

| ID | Requirement |
|----|-------------|
| FR-1 | A form **MUST** be markable as a class (`isClass`) at create or edit time. |
| FR-2 | A class **MUST** define an ordered list of courses; each course has a name, platform, type (Online/Offline), and active state. |
| FR-3 | Course count **MUST** be allowed to grow. A course that already has registrant tracking data **MUST NOT** be hard-deleted — it can only be deactivated (archived). |
| FR-4 | On every submission to a class form, the system **MUST** auto-create one progress record for that registrant, seeded with one entry per **active** course. |
| FR-5 | Seeding **MUST** snapshot each course's name, platform, and type at submission time; status defaults to "Not Started", dates and remarks empty. |
| FR-6 | The admin data viewer **MUST** render one column group per course showing Status, Platform, Type, Started At, Completed At, and Remarks. |
| FR-7 | Admins **MUST** be able to edit progress fields (Status, Started At, Completed At, Remarks) inline, with changes persisted immediately. |
| FR-8 | Platform and Type **MUST** be read-only in the grid (display of the snapshot only), enforced both client- and server-side. |
| FR-9 | Archived courses **MUST** still render (read-only) for registrants that have data for them. |

### History preservation (critical)

| ID | Requirement |
|----|-------------|
| FR-10 | **Course removed** — archiving a course **MUST NOT** alter the tracking data of any registrant who already has data for it. |
| FR-11 | **Platform/type changed** — editing a course's platform or type on the form **MUST** affect future submissions only; existing registrants retain the values captured at their submission time. |

### Non-functional

| ID | Requirement |
|----|-------------|
| NFR-1 | Implementation **SHOULD** mirror the existing paid-form pattern (`isPaymentRequired` → `PaymentData`) for consistency and maintainability. |
| NFR-2 | Access control **MUST** match existing general (non-paid) form-data access; no new permission tier. |
| NFR-3 | No destructive operations on historical data — follow the repo's soft-delete convention. |
| NFR-4 | Server lint **MUST** pass at the zero-warning gate. |

## 5. User workflows

### Workflow 1 — Set up a class
1. Admin creates or edits a form and toggles **Is this a class?** on.
2. Admin adds courses, setting name, platform, and type per course.
3. Over time the admin may add courses or deactivate (archive) existing ones. Removing a
   course that already has registrant data is rejected; it must be archived instead.

### Workflow 2 — Track registrant progress
1. Admin opens the **View Data** grid for a class form.
2. Each course appears as its own group of columns, one row per registrant.
3. Admin edits Status, Started At, Completed At, and Remarks inline. Edits save immediately
   and are picked up by other viewers via change polling.
4. Platform and Type are shown for reference but cannot be edited here.

## 6. Design

### 6.1 Data model

Two layers: a mutable **template** on the form, and an immutable per-registrant **snapshot**.

**Form template** — two new attributes on `Form`:
- `isClass: boolean` (default `false`)
- `courses: json` (default `[]`), each entry:
  `{ courseId: <uuid>, name, platform, type: 'Online' | 'Offline', isActive }`
  (ordering is implicit in array position).

`courseId` is a UUID generated when the admin adds a course; it is the stable key linking a
template course to every registrant snapshot. Archiving sets `isActive: false` — never a hard
delete.

**Per-registrant snapshot** — new model `ClassTrackingData`, 1:1 with a submission (mirrors
`PaymentData`):
```
{ formId, userId, submissionId (unique),
  courses: [ { courseId, name, platform, type, status, startedAt, completedAt, remarks } ],
  lastUpdatedBy }
```
`status ∈ { Not Started, In Progress, Completed }`.

### 6.2 How history is preserved

The snapshot is the mechanism behind FR-10 and FR-11. Each registrant's `courses[]` is copied
from the template at submission time and is thereafter only mutated by that registrant's own
progress edits. Template changes are never propagated backward.

- **FR-10 (course removed):** archiving leaves every existing snapshot's entry for that
  `courseId` untouched. The grid renders active courses as editable groups and any inactive
  course that still has data as a read-only "Archived" group.
- **FR-11 (platform/type changed):** platform and type live in the snapshot. Editing the
  template only changes the seed for *future* submissions; prior registrants keep what they
  actually used.

### 6.3 API

| Method · Route | Purpose |
|---|---|
| `POST /api/forms/post-create-submission` | Extended: when `isClass`, also creates a `ClassTrackingData` seeded from the form's active courses, and bumps the `classTracking-${formId}` change key. |
| `GET /api/forms/get-submission` | Extended: populates `classTrackingData` for any caller that can reach the endpoint. |
| `PUT /api/classTrackingData/update` | New. Payload `{ id, courseId, field, value }` where `field ∈ { status, startedAt, completedAt, remarks }`. Updates the matching course in the snapshot, sets `lastUpdatedBy`, and bumps `classTracking-${formId}`. Dates validated `yyyy-MM-dd` → ISO. |
| `POST /api/forms/post-update-form` | Extended: rejects an update that drops a `courseId` which has existing `ClassTrackingData` (enforces FR-3). |

Note: the update endpoint accepts only progress fields — `platform`/`type` are rejected
server-side, enforcing FR-8 even if the client is bypassed.

### 6.4 Frontend

- **Form editor** (`FormEditorContainer.js`, `FormEditor.js`): an "Is this a class?" toggle
  and, when on, a course editor (add course, edit name/platform/type, deactivate). `isClass`
  and `courses` are included in the saved form payload.
- **Submission grid** (`AdminFormDataViewer.js`): `createClassTrackerColumns()` renders one
  column group per course. Cells read/write the snapshot by `courseId`. Status/Started
  At/Completed At/Remarks are editable for active courses; Platform/Type are always read-only;
  archived courses are fully read-only. Edits route to `PUT /api/classTrackingData/update`.
  Change polling watches the `classTracking-${formId}` key (alongside the paid-form key).

### 6.5 Permissions & access control

Class data is treated as ordinary form data — no broader access than any other non-paid form.

- `forms/get-submission` policy: `aboveTcNotTech` (`tc, admin, stewardship`) — unchanged.
- `classTrackingData/*` write policy: `aboveTcNotTech` — matches the read side.
- `/admin/formViewer` route guard: `['tc', 'admin', 'stewardship']` — unchanged.
- `get-submission` populates `classTrackingData` unconditionally for anyone reaching the
  endpoint (unlike `paymentData`, which stays gated by `viewPaymentData`). No
  `viewClassTrackingData` permission is introduced.
- `FormManager.noViewPermission` has no special `isClass` branch — class forms fall through to
  the existing general form-data check.

## 7. Decision log

| Decision | Choice | Rationale |
|---|---|---|
| Form lifecycle | Support both evolving across seasons and recreating per season | Snapshot design is a superset that handles both. |
| Removing a course | Soft-archive (`isActive: false`), never hard-delete with data | Preserves history (FR-10); matches repo soft-delete convention. |
| Platform/type editability in grid | Read-only | They are config facts snapshotted at submission, not per-registrant progress; editing per row invites inconsistent data with no benefit. |
| Editable progress fields | Status, Started At, Completed At, Remarks | The actual tracking data the panel exists for. |
| Access level | Same as general form data | Class data is no more sensitive than other submission data; avoids a bespoke permission tier. |

## 8. Risks & open questions

- **Snapshot correction:** if a registrant's snapshot platform/type is seeded wrong (rare
  data-entry mistake), there is currently no admin UI to correct it. Would require a separate
  admin action if it arises.
- **No registrant-facing view:** progress is admin-only; surfacing it to registrants is future
  work.

## 9. Test plan & acceptance criteria

- [ ] Server lint passes at the zero-warning gate (`cd server && yarn lint`).
- [ ] UI build succeeds (`cd ui && yarn build`).
- [ ] Create a class form with 2 courses; submit as a user; confirm a seeded
      `ClassTrackingData` row appears in View Data with status "Not Started".
- [ ] Edit Status, Started At, Completed At, and Remarks inline; confirm persistence,
      `Updated By`, and polling refresh.
- [ ] Confirm Platform and Type cannot be edited from the grid.
- [ ] **FR-10:** archive a course and add a new one; confirm a prior submission still shows
      the archived course's data (read-only) and new submissions get the new course.
- [ ] **FR-11:** change a course's platform on the form; confirm prior submissions keep the
      original platform and only new submissions get the new one.
- [ ] Attempt to remove (not archive) a course that has data; confirm the update is rejected.

## 10. Out of scope / future work

- Registrant-facing progress view.
- Admin UI to correct a mis-seeded snapshot.
- Bulk progress editing / CSV import.
- Course reordering reflected across existing records.

## Appendix — affected files

**Backend**
- `server/api/models/Form.js` — `isClass`, `courses`
- `server/api/models/ClassTrackingData.js` — new model
- `server/api/models/Submission.js` — `classTrackingData` association
- `server/api/controllers/forms/post-create-submission.js` — seed on submit
- `server/api/controllers/forms/get-submission.js` — populate snapshot
- `server/api/controllers/forms/post-update-form.js` — course-removal guard
- `server/api/controllers/classTrackingData/update-class-tracking-data.js` — new endpoint
- `server/config/routes.js`, `server/config/policies.js`

**Frontend**
- `ui/src/components/forms/FormEditorContainer.js` — class toggle + course editor
- `ui/src/components/forms/FormEditor.js` — include `isClass`/`courses` in payload
- `ui/src/components/forms/FormManager.js` — pass `isClass`/`courses` to viewer
- `ui/src/components/admin/forms/AdminFormDataViewer.js` — class tracking columns + persistence
