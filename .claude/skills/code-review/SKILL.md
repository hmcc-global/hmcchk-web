---
name: code-review
description: When asked for "code review" of the current branch or a PR in hmcchk-web.
---

- Treat the branch as a feature branch with an open PR. Compare it against its **PR base**: the `release-<topic>` branch when one exists for this work, otherwise `main`. Find the base with `gh pr view --json baseRefName` if a PR is open, else ask.
- Review the branch's own changes only and decide whether it is ready to merge into that base.
- Review as if you are the engineering lead who has to maintain this after the volunteers move on.
- Use `git diff origin/<base>...HEAD` for the complete set of changes; never rely on individual commit diffs.
- Always review against the final state of the files, and read the actual current file contents rather than trusting the diff hunk.
- Do not point out issues already resolved in the final state of the branch.
- Do not make code changes.

## What to look for here specifically

This codebase is uneven, so calibrate: the bar is "does this PR make its corner better or at least not worse", not "does this file now meet the style guide".

- Flag new code that copies a bad neighbouring pattern (inline hex, magic pixel widths, a new `*Mobile.js` twin, direct `@chakra-ui` import, `helpers/customAxios` path). Do not flag pre-existing mess the PR did not touch.
- No TypeScript, so check unguarded access on fetched data (`data.map`, `item.field.sub`), missing `Array.isArray` on things the backend sometimes returns as `null` or a string, and luxon statics called with `new`.
- react-router v5 only: any `useNavigate`, `Routes`, `element=` is a bug.
- New routes: every one must be a `<PrivateRoute permissions=[...]>` in `MainContainer.js`; a sub-route under a gated path must widen PrivateRoute's exact-pathname check.
- Backend changes in the same PR: new endpoint needs both a `routes.js` line and a `policies.js` entry (default policy is `isLoggedIn`); queries respect `isDeleted`; header is `Authorisation`.
- Mobile and desktop both covered when layout changed.
- No member data in the diff, fixtures, or screenshots.

## Output

- List issues with code examples to fix them; show the existing code alongside the suggested fix.
- Summarise with a score out of 10 and whether it should merge.
- Draft a copyable PR title and description:
  - Title per `.claude/docs/commit-convention.md`: `GH-<issue#>: <what the branch does>`. Take the issue number from the branch name prefix (`1442-events-filter-bar-fix` → `GH-1442`), falling back to the commit prefixes.
  - Description per `.claude/docs/pr-description.md`, opening with `Closes #<issue#>`.
  - Fill the Changes table and Verification list from what you actually reviewed; leave the Screenshots table in place for the author to fill.
