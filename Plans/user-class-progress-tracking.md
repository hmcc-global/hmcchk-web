# User-Facing Class Progress Tracking

**Issue:** #1425 · **Status:** Planned (not implemented) · **Updated:** 2026-08-09

## Summary

Registrants can track their own progress through a class they've signed up for, without
having to ask an admin. The "Signup Links" tab on the Profile Page is the entrypoint:
each signed-up class form gains an expandable inline progress card showing an overall
progress bar and a per-course status checklist.

For **Online** courses, admins can attach a link that navigates to the course platform
page. Not every online course has one, but when a link exists the user can open it
directly from the expanded card.

This is the user-facing companion to GH-1386 (`Plans/admin-class-forms-tracking.md`),
which added the admin-side class tracking. The admin surface is unchanged.

## Workflows

**User: tracking your progress** — In the Profile Page → Signup Links tab, "Your
Signups:" lists every form the user has submitted. Class forms show a "View Progress"
toggle instead of the disabled "Signed Up" button. Expanding it reveals:

- An overall progress bar (`Completed courses / total courses`).
- One row per course: a status badge (Not Started / In Progress / Completed) and the
  course name. If the course has a `courseLink`, the name links out (new tab) to the
  course platform.

Non-class signups keep the existing disabled "Signed Up" button. Progress is read-only
for the user; admins continue to update status/dates/remarks in the submission grid.

**Admin: setting up course links** — In the form editor's "Is this a class?" → Courses
section, each course gains an optional `courseLink` field (intended for Online courses).
Saving it updates `Form.classTrackingTemplate.courses[].courseLink`.

## Data model

No new model and no migration.

- `Form.classTrackingTemplate.courses[]` gains an optional `courseLink` string on each
  course (`{ courseId, name, platform, type, courseLink, order, isActive }`). This is the
  **single source of truth for the URL**.
- `ClassTrackingData` (the per-registrant snapshot) is **unchanged**. Its `courses[]`
  snapshot is keyed by `courseId` and is still the source of truth for `status`,
  `startedAt`, `completedAt`, `remarks`.

**Why the link is not snapshotted** — a course URL is a live pointer (Zoom/Coassemble
meeting), not a historical record. Reading it from the template means an admin's later
edit reaches every current registrant, and existing registrations (created before a link
was added) pick it up automatically. This also avoids a backfill script. Progress fields
(and their status/dates/remarks) remain snapshot-first, exactly like GH-1386, so history is never
rewritten.

## API

- `GET /api/forms/get-signedup-form` (enriched) — now additionally:
  - `.populate('classTrackingData')` on the `Submission` query.
  - Each returned form carries `submissionId` and `classTrackingData`, where
    `classTrackingData` is the snapshot's `courses[]`, each course merged with the live
    template's `courseLink` by matching `courseId`, or `null`.
- `POST /api/forms/post-update-form` — unchanged; the course-removal guard is keyed on
  `courseId` only, so the new field flows through `classTrackingTemplate.courses` as-is.
- No new endpoints, no new policies (`get-signedup-form` is already `isLoggedIn`).

## Permissions

- User read: any logged-in user (existing `isLoggedIn` policy on `get-signedup-form`).
- Admin write (template `courseLink`): existing form-editor permissions — no change.
- The user-facing view is read-only; there is no user-facing write path.

## Decisions

- **Inline expand, not a new page** — keeps the entrypoint inside the existing Signup
  Links tab, minimal routing surface, and works for mobile and desktop.
- **Link lives on the template, merged at read time** — see Data model above. Template
  `courseLink` is merged into the snapshot by `courseId` on the way to the client.
- **Card content is minimal** — overall progress bar + per-course name/status; link only
  when present. No platform/type, dates, or remarks in the user view (admin grid remains
  the place for that detail).
- **Link shown whenever `courseLink` is present** — admins will typically set it on
  Online courses, but the render condition is simply "a link exists", and it is only
  rendered when it starts with `http` (safety guard), opening in a new tab with
  `rel="noopener noreferrer"`.
- New component lives in `ui/src/pages/userProfile/` (used by one page), importing only
  from the `components` barrel / `components/icons`, matching the Chakra boundary.
- No tests written in this change (the only test file, `App.test.js`, has a single skipped
  case). QA is a manual checklist.

## Test checklist

- [ ] `cd server && yarn lint` passes (zero warnings).
- [ ] `cd ui && yarn lint` passes; `cd ui && yarn test --run` passes.
- [ ] Create a class form with two courses — one Online with a `courseLink`, one
  In-Person. Sign up as a test user.
- [ ] Profile → Signup Links → "Your Signups" → expand the class: progress bar is 0%,
  both badges "Not Started", the Online course's name is a working `http` link (new tab),
  the In-Person course renders no link.
- [ ] Admin sets course #1 to In Progress and course #2 to Completed in the grid; the
  user's expanded card now shows the matching badges and 100% bar.
- [ ] Add/change a `courseLink` after a user already signed up — the user sees the new
  link (live merge, no backfill).
- [ ] A class signed up before any link existed shows the link once the admin adds one.
- [ ] Non-class signed-up forms still render the disabled "Signed Up" button.
- [ ] A class with no `classTrackingData` record still renders the row (no crash).

## Affected files

**Backend:** `server/api/controllers/forms/get-signedup-form.js`

**Frontend:** `ui/src/pages/userProfile/SignedUpFormsList.js` (new),
`ui/src/pages/userProfile/UserProfileDesktop.js`, `ui/src/pages/userProfile/UserProfileMobile.js`,
`ui/src/pages/forms/FormEditorContainer.js` (add `courseLink` to course config)

**Docs:** `Plans/user-class-progress-tracking.md` (this file)