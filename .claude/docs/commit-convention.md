# Commit, Branch, and PR Title Convention

This repo does **not** use Conventional Commits. Tracking is GitHub Issues, and every commit, branch, and PR is linked to an issue number.

## Commit subject

```
GH-<issue#>: <what the commit does>
```

- `GH-` prefix, the issue number, a colon, a space, then the description. The prefix is what links the commit to the issue in GitHub, so it is mandatory on every commit.
- Description in imperative or plain past tense, either is in use. Match the surrounding commits on the branch.
- No type/scope prefixes (`feat:`, `fix(ui):`) and no trailing period.
- One subject line is the default. Add a body only when the *why* is not obvious from the diff (a workaround, a data-shape quirk, a reverted decision). Keep it to a short paragraph.
- Review follow-ups keep the same issue number: `GH-1431: address PR comments`.

Real examples from `git log`:

```
GH-1442: Replace More Filters select with inline ministry dropdown
GH-1431: route profile tabs to /profile/<slug>
GH-1443: remove hardcoded Pastor prefix on profile sermon notes
GH-1404: fix pages broken by luxon ESM static-method misuse
GH-1367: address review findings
GH-1445: revert useDebounce change despite comments since it makes saving delay for too long
```

No issue yet? Open one first with `gh issue create` and use its number. `GH-1` shows up in history as a fallback for one-off fixes, but prefer a real issue.

## Branch name

```
<issue#>-<type>-<short-description>
```

- `type` is `feature`, `hotfix`, or `release` per the README. In practice most branches drop the type (`1442-events-filter-bar-fix`, `1416-sitelink-backend`); both forms are accepted, but keep the issue number first.
- Release branches are `release-<topic>` (`release-10y-global`, `release-easter-2026`) and carry no issue number.
- Lowercase, hyphen-separated.

## Base branch and flow

- Flow is `feature` → `release-<topic>` → `main`. When a release branch exists for the work, base the feature branch **and the PR** on it, not on `main`.
- Only `hotfix` branches merge straight into `main`. Small standalone fixes in history do go to `main` directly; ask which base to use if no release branch is named.
- Dependent PRs are **stacked**: PR2 branches off PR1's branch and sets PR1 as its base, so each diff shows only its own changes. Merge in order.
- `git pull --rebase` to stay linear. Never merge `main` into a feature branch.

## PR title

Same shape as the commit subject, describing the whole branch:

```
GH-1442: Replace More Filters select with inline ministry dropdown
GH-1404: Migrate UI from CRA to Vite 7
```

Squash-merges reuse the PR title as the commit subject, so it must carry the `GH-` prefix too.

## PR body

Start with `Closes #<issue#>` (or `Fixes #` / `Implements #`) so the issue auto-closes on merge. Then follow `.claude/docs/pr-description.md`.
