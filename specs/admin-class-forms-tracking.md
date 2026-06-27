# Class Tracking for Admin Forms

**Issue:** #1386 · **Status:** Implemented, pending live QA · **Updated:** 2026-06-27

## Summary

Admins can mark a sign-up form as a **class** made up of one or more **courses**. Each
registrant's progress through every course (status, start/completion dates, remarks) is
tracked and edited inline from the existing admin "View Data" submission grid.

The one tricky constraint: course lineups change between seasons, and **a registrant's
historical record must never be rewritten by a later config change**. We handle this by
snapshotting each registrant's courses at submission time (see Data model below).

## Workflows

**Setting up a class** — In the form editor, toggle "Is this a class?" and add courses
(name, platform, type). Courses can be added anytime. A course that already has registrant
data can't be deleted, only archived.

**Tracking progress** — Open the submission grid for a class form. Each course is a group of
columns, one row per registrant. Admins edit Status, Started At, Completed At, and Remarks
inline; edits save immediately. Platform and Type are shown but read-only (they're a snapshot,
not something to hand-edit per row).

## Data model

Two layers — a mutable template on the form, an immutable snapshot per registrant.

**Form template** (`Form.isClass`, `Form.courses[]`): each course is
`{ courseId, name, platform, type, isActive }`. `courseId` (a UUID) is the stable link to
registrant records. Archiving a course sets `isActive: false` — never a hard delete.

**Per-registrant snapshot** (`ClassTrackingData`, 1:1 with a submission, mirrors `PaymentData`):
```
{ formId, userId, submissionId, lastUpdatedBy,
  courses: [ { courseId, name, platform, type, status, startedAt, completedAt, remarks } ] }
```
Created automatically on submission, seeded from the form's active courses. `status` is one of
Not Started / In Progress / Completed.

**Why two layers** — the snapshot is copied from the template at submission time and only ever
changed by that registrant's own progress edits. Template changes never propagate backward, so:
- Archiving a course leaves existing registrants' data for it untouched (still shown, read-only).
- Changing a course's platform/type only affects future submissions; prior registrants keep
  what they actually used.

## API

- `POST /api/forms/post-create-submission` — when the form is a class, also seeds a
  `ClassTrackingData` record from active courses.
- `GET /api/forms/get-submission` — also returns `classTrackingData`.
- `PUT /api/classTrackingData/update` — `{ id, courseId, field, value }`; `field` limited to
  `status`/`startedAt`/`completedAt`/`remarks` (platform/type rejected server-side too).
- `POST /api/forms/post-update-form` — rejects removing a course that has registrant data.

## Permissions

Same access as ordinary form data — `tc`, `admin`, `stewardship`. No new permission tier; class
data is no more sensitive than other submission data.

## Decisions

- Removing a course archives it instead of deleting, to preserve history.
- Platform/type are locked in at signup and read-only in the grid; only progress fields are
  editable. Tradeoff: a mis-seeded snapshot can't currently be corrected from the UI (rare).
- Class data follows existing form-data access rather than getting a dedicated tier.

## Test checklist

- [ ] `cd server && yarn lint` passes; `cd ui && yarn build` succeeds.
- [ ] Create a class form with 2 courses, submit as a user, confirm a tracking row appears.
- [ ] Edit status/dates/remarks inline and confirm they persist; confirm platform/type aren't
      editable.
- [ ] Archive a course + add a new one — prior submission keeps the archived course (read-only),
      new submissions get the new course.
- [ ] Change a course's platform — prior submissions keep the old value, new ones get the new.
- [ ] Try to remove (not archive) a course with data — update is rejected.

## Affected files

**Backend:** `Form.js`, `ClassTrackingData.js` (new), `Submission.js`,
`forms/post-create-submission.js`, `forms/get-submission.js`, `forms/post-update-form.js`,
`classTrackingData/update-class-tracking-data.js` (new), `config/routes.js`, `config/policies.js`

**Frontend:** `forms/FormEditorContainer.js`, `forms/FormEditor.js`, `forms/FormManager.js`,
`admin/forms/AdminFormDataViewer.js`
