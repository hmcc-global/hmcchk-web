# Writing PR Descriptions

A reviewer should understand _what changed and why_ in under a minute. The diff is the source of truth; the description is the map.

There is no PR template in `.github/` for this repo, so the shape below is the convention. Recent merged PRs (#1442, #1431, #1440) are the reference examples.

## Rules

- **First line links the issue:** `Closes #<issue#>` (or `Fixes #` / `Implements #`). This is what auto-closes the issue on merge; the `GH-` prefix in the title does not.
- **Then 1–3 sentences:** problem, change, effect. Don't narrate the diff file by file. Don't restate the title.
- **Tabulate anything you'd otherwise list:** changed behaviours, before/after states, affected pages, new props, access types that gate a route.
- **Diagram flows and state transitions** when there are more than three steps. Keep them under ~10 nodes, left-to-right (`flowchart LR`, or `direction LR` on state diagrams).
- **Screenshots for any UI change**, desktop and mobile, in a before/after table. Every routed page here has both layouts and many components have a separate `*Mobile.js` variant, so both need checking.
- **Say how it was verified.** Concrete steps or a checklist a reviewer can replay. This repo has no test suite, so the verification section carries the weight: which pages were opened, at which widths, what was clicked. `yarn lint` (0 errors) and `yarn build` passing are worth one line.
- **No file paths or line numbers** in prose. GitHub shows them and line numbers rot on the next push. Exception: a deliberate callout, marked as such:
  > ⚠️ **Reviewer note:** `ui/src/components/index.js` grew by one re-export; the rest of the diff is consumers.
- **Flag what was left out on purpose** in one line, so the automated opencode review and human reviewers don't ask (`Not addressed: axios major bump, tracked in #1450`).
- **No personal data.** No member names, emails, phone numbers, or form submissions in the body, screenshots, or test steps. Blur or use seeded dummy accounts.

## Template

Delete sections that don't apply instead of writing "N/A".

````markdown
Closes #<issue#>

<1–3 sentences: problem, change, effect.>

## Changes

| Area | Before | After |
| --- | --- | --- |
| Events page filter | Native `<Select>` | Inline single-select dropdown |

## Screenshots

|          | Desktop (Before) | Desktop (After) |
| -------- | ---------------- | --------------- |
| Change 1 |                  |                 |

|          | Mobile (Before) | Mobile (After) |
| -------- | --------------- | -------------- |
| Change 1 |                 |                |

## Verification

- [ ] Open `/events` → filter by ministry → deselect via each path
- [ ] Desktop 1440 and mobile 390
- [ ] `yarn lint` 0 errors, `yarn build` passes

## Not in this PR

- <deliberate omission, with the follow-up issue number if one exists>
````

## Diagram example

````markdown
```mermaid
stateDiagram-v2
    direction LR
    unsigned --> signed: sign membership form
    signed --> ministry: TC assigns
```
````

## Automated review

Opening or pushing to a PR triggers the `opencode-review` workflow. It reviews the commits, so squash noisy WIP commits before opening if the branch history is messy. Reply `/oc` on a PR comment to re-run it.
