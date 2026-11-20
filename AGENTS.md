# Instructions for the HMCC HK Web agentic coding assistant

## Do this BEFORE you plan, propose, or act

### Mandatory Procedure
1. Match all tasks you're about to do against the *trigger table*. There can be multiple rules/files matched.
2. List ALL rule files you match, in bullet points.
3. Always open/read ALL matching docs.
4. Output a **Compliance** line quoting the exact rule, verbatim, from each doc.
5. Only then continue with your task.

### Trigger Table
If your work involves the task below, read the corresponding document/section first. Paths are files; `#name` is a section of this file.
- plan a change, or change any existing code → `#using-gitnexus` and `#smallest-complete-change`
- write a commit message, branch name, or PR title/description → `.claude/docs/commit-convention.md` and `.claude/docs/pr-description.md`
- write or change any frontend code, styling, or layout → the `react-frontend` skill (or subagent), `.claude/docs/frontend.md`, `#working-in-a-messy-codebase`, and `#common-gotchas`
- fetch data or call the API from the UI → `.claude/docs/data-and-api.md`
- add or change a route, or gate a page on access type → `.claude/docs/routing-and-access.md`
- write or change any backend code, or add or change an API endpoint → `.claude/docs/backend.md`
- touch auth, JWT, or the bearer header → `.claude/docs/auth-flow.md`
- send or template an email → `.claude/docs/email.md`
- handle member, form-submission, or profile data → `#data-handling`
- find where something lives, or add a new file → `.claude/docs/architecture.md`
- touch CI workflows, deploys, or env vars → `.claude/docs/ci-and-env.md`
- review a branch or PR → the `/code-review` or `/deep-review` skill
- execute a plan or issue checklist → the `/gh-execute` skill

### Required Compliance-line format (the rule text comes from the doc, not from here)
> **Compliance (<doc-path-or-section>):** "<verbatim sentence copied from that doc>" → <what you will do>

---

> This file is the single source of instructions for **all** agentic coding assistants (Claude Code, Codex, OpenCode, Cursor, Kimi, and others). `CLAUDE.md` is a symlink to `AGENTS.md`; edit `AGENTS.md` only. Skills, docs, and the agent persona live under `.claude/` and are exposed to every tool: `.agents/skills` is a symlink to `.claude/skills` (Codex, Cursor, Kimi, OpenCode read it), and `.opencode/agent/` and `.cursor/agents/` hold OpenCode's and Cursor's copies of the subagent. Keep `.claude/settings.local.json` out of git.

# hmcchk-web

## Project Overview

The HMCC Hong Kong church website. Two independent packages in one repo, no workspaces wiring:

- `ui/` — React 18 **JavaScript** SPA on Vite 7, Chakra UI v1, Redux Toolkit, react-router-dom v5
- `server/` — Sails.js v1 backend, MongoDB via `sails-mongo`
- Root `package.json` holds Prettier and a few shared deps only

Sermons, speakers, and series come from WordPress, not Mongo. The full stack and folder map are in `.claude/docs/architecture.md`.

Tracking is GitHub Issues. Commits are `GH-<issue#>: …`, branches `<issue#>-<description>`, PRs merge `feature` → `release-<topic>` → `main`. See `.claude/docs/commit-convention.md`.

## Smallest Complete Change

Solve the whole request with the least new code. Take the first option that fully works:

1. **Does it need to exist?** Skip features, options, and flexibility nobody asked for, and name what you skipped in one line.
2. **Is it already in this repo?** A component, helper, page, or email template that does the job: reuse it the way the surrounding code does.
3. **Is it a platform feature or an installed dependency?** Use it. Never add a dependency for a few lines.
4. **Otherwise**, write the minimum code that works.

- Be lazy about the solution, never about the change: finish every caller, export, dropdown entry, and config line your change needs.
- No wrapper, abstraction, option, or "for later" code nobody asked for. Deleting beats adding.
- Bug fix: find every caller first (`#using-gitnexus`), then fix the root cause once in the shared code.
- Between options of equal size, take the one that is correct on edge cases.
- Never cut: validation of user input, error handling that prevents data loss, security, accessibility, or anything the user asked for.
- Do what has been asked; nothing more, nothing less. Prefer editing an existing file over creating one, and never create documentation files or READMEs unless asked.
- Do not add test files unless the issue asks for them. There is no test suite yet (`server/yarn test` runs lint; the UI has one skipped placeholder). Verify with lint, build, and the browser.
- Use **yarn**, never npm or npx: `yarn` to install, `yarn <script>` to run, `yarn prettier` for binaries. The only `npx` in these docs is `npx gitnexus` (`#gitnexus-setup`), a per-machine tool that is not a project dependency and never touches `package.json` or `yarn.lock`. Node 20+ for the UI (Vite 7's floor; CI pins 20.19.0).

## Reading Code Efficiently

Everything you read stays in your context for the rest of the session and pushes these instructions further away. Read the least that answers the question.

- **Find, then read.** Locate code with GitNexus (`#using-gitnexus`) or `rg -n "<exact text>" ui/src server`, then read only the lines around the match (offset and limit), not the whole file.
- **Check the size first.** Run `wc -l <file>`; over 300 lines, read only the part you need. Many page files here run past 400 lines.
- **Never open** `node_modules/`, `yarn.lock`, `ui/build/`, `server/client/`, `.gitnexus/`, images, or minified files.
- **Filter command output.** `yarn lint --quiet` in `ui/` prints errors only; pipe other long output through `| tail -40`. Use `git diff --stat` before `git diff`, `gh pr diff <n> --name-only` before the full diff, and `gh … --json <fields> --jq '<filter>'` instead of full JSON.
- **Read once.** Do not re-read a file you already read this session unless it changed.

## Using GitNexus

GitNexus is this repo's code map: it answers "where is this", "what calls this", and "what breaks if I change this" without reading whole files. Use it before grep and before opening files.

1. **Check it at the start of the session.** Call the MCP tool `list_repos`, or run `node .gitnexus/run.cjs status` (no `run.cjs`? use `npx gitnexus status`). If it is not `up-to-date`, re-index with `node .gitnexus/run.cjs analyze --skip-agents-md` (about 15 seconds). A stale index answers "not found" or "0 impacted" for code that exists.
2. **Find code** with `query({search_query: "retreat signup form"})` and `context({name: "PrivateRoute"})`. Use `rg` only for exact text such as copy, CSS values, or template names.
3. **Before editing any existing function or component**, run `impact({target: "<name>", direction: "upstream"})` and put the risk level and the number of affected callers in your reply. HIGH or CRITICAL: stop and tell the user before editing.
4. **Before committing**, run `detect_changes({scope: "compare", base_ref: "<base branch>"})` and confirm only the symbols you meant to change appear.
5. **No GitNexus MCP tools in this session?** The CLI does the same: `node .gitnexus/run.cjs query "<concept>"`, `… context <name>`, `… impact <name> -f <file>`, `… detect-changes -s compare -b <base branch>`. Pipe through `| head -80`.

New files, EJS templates, and copy-only edits have no callers: say "new file, nothing existing affected" instead of running `impact`. If GitNexus is not installed at all, say so at the start and fall back to `rg`; never claim an impact result you did not run.

## Working in a Messy Codebase

Much of `ui/src/pages/` was written by junior volunteers over several years and it shows: 400-line page files, inline hex colours and pixel widths, separate `*Mobile.js` twins of desktop components, mixed quote styles, and three ways of doing the same thing. That is the starting point, not the standard.

- **Small edits match the file they are in.** Do not reformat, rename, or restructure code you were not asked to touch. A diff that mixes a fix with a cleanup is harder to review and to revert.
- **New code follows the standards in this file and `.claude/docs/`.** New files and components are where the bar is raised. Never copy a bad pattern into a new file because a neighbour has it.
- **Search before you build.** `ui/src/components/` is small; read its barrel and folder, then the sibling page folder. A component may exist under a different name.
- **Extract only on the second use.** A component moves to `ui/src/components/` when a second page needs it, not to tidy one page.
- **Name your precedent.** When two existing implementations conflict, say which file you followed and why. If neither is fit, say so and propose the smaller change.
- **Cleanups are their own issue and PR.** If something is bad enough to fix, open an issue and do it separately.

## Development Commands

```bash
# Install (three separate installs, no workspaces)
yarn && (cd server && yarn) && (cd ui && yarn)

# Run locally (two terminals)
cd server && nodemon ./app.js   # Sails on :1337 (production uses `yarn start`)
cd ui && yarn start             # Vite on :3000, proxies /api → :1337

# UI (in ui/)
yarn build                      # production build → ui/build (CI moves it to server/client)
yarn preview                    # serve the production build
yarn lint                       # eslint src — 0 errors required; 78 pre-existing warnings, don't add to them
yarn test --run                 # Vitest; only a skipped placeholder exists — do not add tests unless the issue asks

# Server (in server/)
yarn lint                       # eslint . --max-warnings=0 on errors; 0 errors required
yarn start                      # NODE_ENV=production node app.js

# Format (from repo root, touched files only)
yarn prettier --write "ui/src/<path>"
```

Prettier config: `.prettierrc.json` — 2-space, single quotes, semicolons, `trailingComma: 'es5'`.

## Data Handling

Member profiles, life group and campus assignments, form submissions, giving records, and sermon notes are personal data about real congregation members.

- Never paste them into commits, PR bodies, issue comments, screenshots, fixtures, or logs. Use dummy accounts for screenshots and blur anything real.
- Server log lines carry IDs, not names or emails.
- `REACT_APP_*` values are inlined into the public bundle; never put a secret there.
- No credentials in code. Both `.env` files come from GitHub secrets in CI.

## PR and Commit References

Read `.claude/docs/commit-convention.md` and `.claude/docs/pr-description.md` before writing any of these. Short version: `GH-<issue#>:` on every commit and PR title, `Closes #<issue#>` as the first PR line, base on the release branch when one exists, stack dependent PRs.

## Common Gotchas

1. `Authorisation`, not `Authorization`. Both sides.
2. `t3ch` is an access type, not a typo.
3. Default policy is `isLoggedIn`; new endpoints are private until opened in `policies.js`.
4. No autoroutes; every endpoint needs a `routes.js` line.
5. Sermons come from WordPress, not Mongo.
6. The SPA is served from `server/client/` only after a build.
7. `disableSendEmails: true` by default; emails are logged, not sent.
8. All routes use `<PrivateRoute>`, even public ones, and sub-routes can bypass its exact-pathname gates.
9. Two announcement APIs; pick deliberately.
10. Models have `isDeleted`; filter it.
11. Never import `@chakra-ui/*` outside `components/chakra/` and `components/icons.js`.
12. JSX lives in `.js`; Vite 7 is pinned for that. Do not rename to `.jsx` piecemeal and do not bump to Vite 8.
13. `new DateTime.…` throws under Vite; luxon statics are plain calls.
14. `customAxios` lives in `utils/`, not `helpers/`. Old snippets and docs point at `../helpers/customAxios`; that path is gone.
15. `node_modules` is checked in at the repo root and `CODEOWNERS` guards it. Do not commit changes there.

## Tooling

- `gh` CLI for issues and PRs: `gh issue view <n> --comments`, `gh pr view --json baseRefName`, `gh pr create --base <branch>`.
- Skills in `.claude/skills/` (also reachable as `.agents/skills/`): `react-frontend`, `code-review`, `deep-review`, `gh-execute`, plus the `gitnexus/*` set. Every tool that supports `SKILL.md` finds them there.
- GitNexus is expected in this repo (see `#using-gitnexus`, `#gitnexus-setup`, and the block below). The committed parts are the skills and these sections; the index itself is per-machine.
- Agent persona in `.claude/agents/react-frontend.md`. Claude Code dispatches it as a subagent, OpenCode via `.opencode/agent/react-frontend.md`, Cursor via `.cursor/agents/react-frontend.md`, and every other tool through the `react-frontend` skill, which points at the same file. Edit the `.claude/agents/` file only; the other three are pointers.
- Docs in `.claude/docs/`, read on demand through the trigger table: `commit-convention.md`, `pr-description.md`, `architecture.md`, `frontend.md`, `data-and-api.md`, `routing-and-access.md`, `backend.md`, `auth-flow.md`, `email.md`, `ci-and-env.md`.

## GitNexus Setup

GitNexus gives the agent a call graph of this repo (impact analysis, execution flows, safe renames). Two one-time steps per clone:

```bash
npx gitnexus analyze        # builds the local index into .gitnexus/ (gitignored, ~60 MB) and writes .gitnexus/run.cjs
npx gitnexus setup          # registers the MCP server in your coding tool (Claude Code, Cursor, Codex, …); add -c <tool> to pick one
```

OpenCode and OpenChamber skip `setup`: the repo's `opencode.json` registers the GitNexus MCP server, and CI builds a fresh index before the opencode review.

Re-run `analyze` after pulling large changes or when `status` reports the index is stale. On npm 11 an `npx` install crash (`node.target is null`) is a known issue; `npm i -g gitnexus` then `gitnexus analyze` works around it. Never commit `.gitnexus/`; it contains absolute paths and a machine-local database.

<!-- gitnexus:start -->
# GitNexus — Code Intelligence

This project is indexed by GitNexus as **hmcchk-web** (2232 symbols, 3907 relationships, 107 execution flows). Use the GitNexus MCP tools to understand code, assess impact, and navigate safely.

> Index stale? Run `node .gitnexus/run.cjs analyze` from the project root — it auto-selects an available runner. No `.gitnexus/run.cjs` yet? `npx gitnexus analyze` (npm 11 crash → `npm i -g gitnexus`; #1939).

## Always Do

- **MUST run impact analysis before editing any symbol.** Before modifying a function, class, or method, run `impact({target: "symbolName", direction: "upstream"})` and report the blast radius (direct callers, affected processes, risk level) to the user.
- **MUST run `detect_changes()` before committing** to verify your changes only affect expected symbols and execution flows. For regression review, compare against the default branch: `detect_changes({scope: "compare", base_ref: "main"})`.
- **MUST warn the user** if impact analysis returns HIGH or CRITICAL risk before proceeding with edits.
- When exploring unfamiliar code, use `query({search_query: "concept"})` to find execution flows instead of grepping. It returns process-grouped results ranked by relevance.
- When you need full context on a specific symbol — callers, callees, which execution flows it participates in — use `context({name: "symbolName"})`.
- For security review, `explain({target: "fileOrSymbol"})` lists taint findings (source→sink flows; needs `analyze --pdg`).

## Never Do

- NEVER edit a function, class, or method without first running `impact` on it.
- NEVER ignore HIGH or CRITICAL risk warnings from impact analysis.
- NEVER rename symbols with find-and-replace — use `rename` which understands the call graph.
- NEVER commit changes without running `detect_changes()` to check affected scope.

## Resources

| Resource | Use for |
|----------|---------|
| `gitnexus://repo/hmcchk-web/context` | Codebase overview, check index freshness |
| `gitnexus://repo/hmcchk-web/clusters` | All functional areas |
| `gitnexus://repo/hmcchk-web/processes` | All execution flows |
| `gitnexus://repo/hmcchk-web/process/{name}` | Step-by-step execution trace |

## CLI

| Task | Read this skill file |
|------|---------------------|
| Understand architecture / "How does X work?" | `.claude/skills/gitnexus/gitnexus-exploring/SKILL.md` |
| Blast radius / "What breaks if I change X?" | `.claude/skills/gitnexus/gitnexus-impact-analysis/SKILL.md` |
| Trace bugs / "Why is X failing?" | `.claude/skills/gitnexus/gitnexus-debugging/SKILL.md` |
| Rename / extract / split / refactor | `.claude/skills/gitnexus/gitnexus-refactoring/SKILL.md` |
| Tools, resources, schema reference | `.claude/skills/gitnexus/gitnexus-guide/SKILL.md` |
| Index, status, clean, wiki CLI commands | `.claude/skills/gitnexus/gitnexus-cli/SKILL.md` |

<!-- gitnexus:end -->

## Reply Format

End **every** reply with this block. Write it in plain English for someone who does not code: no code, file paths, or jargon unless they ask. When you are planning rather than building, "What I did" becomes "What I plan to do".

**What I did** — 1 to 3 bullets, described as what a visitor or admin will see.
**How I checked** — what you ran or opened and the result, the risk to existing pages (from GitNexus `impact`), and what you did not check. Say plainly if something failed or was skipped.
**What you need to do** — numbered steps for them, including any unticked manual check in the PR, or "Nothing — ready for review."
**Questions** — only when you need a decision from them; otherwise leave this line out.

Example:

> **What I did**
> - Added the 2027 retreat sign-up confirmation email and made it selectable in the form editor.
>
> **How I checked**
> - Previewed the email in the browser at desktop and phone width; lint and build pass.
> - Risk to existing pages: none, these are new files.
> - Not checked: a real send, because sending is switched off locally.
>
> **What you need to do**
> 1. In the admin form editor, pick the new template for the retreat form.
> 2. Submit one test entry with a dummy name and check the email that comes back.
