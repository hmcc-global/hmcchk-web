---
name: deep-review
description: When asked for "deep review" or "deep code review" of a branch or PR in hmcchk-web.
---

This is a thorough code review that goes beyond surface-level changes to ensure the PR will not introduce bugs or break existing functionality.

## Step 1: Identify PR-specific changes

- Determine the PR base: `gh pr view --json baseRefName` if a PR is open, else the `release-<topic>` branch for this work, else `main`.
- Isolate the branch's own commits: `git log --oneline origin/<base>..HEAD --grep="GH-<issue#>"`, or walk first-parent commits. Exclude merges from the base.
- List files changed by those commits only; ignore changes that arrived by merging the base.

## Step 2: Standard Review (same as /code-review)

- Run everything in `.claude/skills/code-review/SKILL.md`, including its "what to look for here" list.
- `git diff origin/<base>...HEAD` for the complete change set; review the final state of files, not individual commits.

## Step 3: Deep Analysis - Potential Bugs

For each changed file, check for:

### Import Consistency

- Imports come from `components` / `components/icons`, never `@chakra-ui/*` directly (except inside `components/chakra/` and `components/icons.js`).
- `customAxios` from `utils/customAxios`; a `helpers/customAxios` path is a stale copy-paste and will not resolve.
- No react-router v6 APIs (`useNavigate`, `Routes`, `element=`, `Navigate`). This repo is on v5.
- Everything used is imported; no new module-init cycle through the `components` barrel.

### Runtime Safety (there is no type checker here)

- Every `.map`, `.filter`, `.length`, and nested property on fetched data is guarded. Backend records are inconsistent (missing `eventType`, null speakers, string-vs-array fields) and one unguarded access white-screens the page silently via the catch-and-log convention.
- luxon statics called without `new` (`DateTime.fromISO(...)`), since Vite serves luxon's native-class ESM build.
- `useParams` / `location.state` values checked before use.
- Loading, empty, and error states rendered; async work in `try/catch`.
- Effects have correct dependency arrays and clean up subscriptions, timers, and event listeners.

### Pattern Consistency

- Read the sibling page folder and `ui/src/components/` to confirm the change follows the closest existing pattern; name the precedent file.
- If a change is applied to some call sites but not others (e.g. one of two `*Mobile.js` twins), grep for the rest and flag the gap.
- Do not flag pre-existing mess in untouched code; do flag new code that copies it.

### Routing and Access

- New routes are `<PrivateRoute permissions=[...]>` entries in `MainContainer.js`; permission values are valid access types (`t3ch` with a 3).
- A sub-route under a path that `PrivateRoute` gates by exact `pathname` must widen that check, or the redirect is silently bypassed.
- Path changes do not break existing links, `history.push` calls, or the admin sidebar's `includes('admin')` detection.

### Backend changes (when the PR touches `server/`)

- New endpoint has both a `routes.js` line and a `policies.js` entry with the right policy (default is `isLoggedIn`).
- Queries filter `isDeleted: false` where the model is soft-deleted.
- Auth reads `req.headers.authorisation` (British spelling); helpers follow the `friendlyName / inputs / exits / fn` shape.
- Email sending respects `disableSendEmails`; no member data in log lines.

### Breaking Changes

- Removed or renamed exports are not used elsewhere (grep the barrel and pages).
- Changes to `components/index.js` add explicit names only; no `export *`.
- Shared `utils/` changes are checked against every caller.

## Step 4: Cross-Reference Analysis

- For each changed file, identify the files that consume or are consumed by it (GitNexus `impact` / `context` when the index is fresh; grep otherwise).
- Read the actual content of related files, not just diffs, to ensure compatibility.
- Check the change against both desktop and mobile render paths when a page has a `*Mobile.js` twin.

## Step 5: Output Format

### Issues Table

| Severity | File | Line | Issue | Suggested Fix |
| -------- | ---- | ---- | ----- | ------------- |

Severity levels:

- **Critical**: Must fix before merge - will cause runtime errors or crashes
- **High**: Should fix - potential bugs or breaking changes
- **Medium**: Recommended - inconsistencies or non-standard patterns
- **Low**: Nice to have - style or minor improvements

### Existing Code vs Suggested Fix

For each issue, show:

```jsx
// Existing code:
<actual code from file>

// Suggested fix:
<corrected code>
```

### Risk Assessment

Rate each area of change:

- Route matching and access gating
- State management
- Data fetching and data-shape guards
- Mobile / desktop parity
- Error handling
- Backend route/policy wiring (if touched)

### Final Score and Recommendation

- Score out of 10
- Clear recommendation: Approve / Request Changes / Block
- Summary of must-fix items

## Step 6: PR Title and Description

Same as /code-review:

- Title per `.claude/docs/commit-convention.md`: `GH-<issue#>: <what the branch does>`, issue number from the branch prefix.
- Description per `.claude/docs/pr-description.md`, opening with `Closes #<issue#>`; fill Changes and Verification from what was reviewed, leave Screenshots for the author.

## Important Notes

- Do not make code changes
- Read actual file contents, not just diffs
- Use grep/glob to find similar patterns across codebase
- Flag any inconsistencies between files changed in this PR
- Consider how changes interact with code NOT in this PR
