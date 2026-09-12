---
name: gh-execute
description: Execute the work described in a plan (a local markdown plan file or a GitHub issue with a task checklist), working through its tasks one by one and checking them off. Use when asked to execute or carry out a plan or issue, or invoked as /gh-execute with a path or issue number.
---

# gh-execute

Execute according to the plan, working through its tasks one by one.

## Inputs

Take the plan from the user's request. As a slash command the form is `/gh-execute <path-or-issue>`; otherwise read it from the message. The **plan is required**; if it is missing, ask for it. It can be:

- A path to a markdown plan file (`Plans/*.md` at the repo root or `ui/Plans/`), or
- A GitHub issue: a number (`1451`), `#1451`, or an issue URL. Read it with `gh issue view <n> --comments`.

If the request is a bare issue with no task checklist and no plan, stop and write the plan first (or ask the user to). This skill works through an existing checklist; it does not invent one.

## Before the first task

1. Read `AGENTS.md` and follow its Mandatory Procedure for the kind of change ahead.
2. Confirm the branch. It must be `<issue#>-<description>` off the right base (`release-<topic>` if one exists for this work, otherwise `main`). Create it if you are on the base branch; ask if you are on an unrelated branch.
3. Commits are `GH-<issue#>: <what>` per `.claude/docs/commit-convention.md`. One commit per task or per coherent group of tasks.

## Working the tasks

Work as a senior React frontend engineer on this project (dispatch the `react-frontend` subagent for the implementation when the task is frontend-only). For backend tasks follow the Sails conventions in `AGENTS.md`.

For each task in order:

1. Do the work.
2. Verify it: `yarn lint` (0 errors) and `yarn build` in `ui/`, `yarn lint` in `server/`, and a browser check for anything visible. No test files; verification is lint, build, and eyes.
3. Mark it done and add a one-line summary under it:
   - Local plan file: tick the checkbox in the file.
   - GitHub issue: tick the checkbox in the issue body with `gh issue edit <n> --body-file`, changing nothing else in the body. Post progress notes as an issue comment rather than editing prose in the body.
4. Commit.

Stop and report if a task turns out to need a decision the plan did not make (a new route's permission, a data shape the backend does not return, a design gap). Do not guess on those.

## After the last task

Leave committing and PR creation to the user unless asked. When asked, open the PR with `gh pr create` against the correct base, with the title and body per `.claude/docs/pr-description.md`, opening with `Closes #<issue#>`.
