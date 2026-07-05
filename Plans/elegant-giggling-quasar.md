# Components Library Consolidation — hmcchk-web

## Context

The old `ui/src/components/` files were actually pages, so they were `git mv`'d into `ui/src/pages/` (currently uncommitted). That leaves no components library: 162 files import `@chakra-ui/react` directly (the repo uses **Chakra UI v1, not MUI** — same idea applies), and genuinely reusable UI lives scattered inside `pages/` (`footer/`, `NavigationBar/`, `helpers/components/*`, TipTap, Pagination…). Past Chakra v2/v3 upgrade attempts (branches `1277-*`, `1356-migrate-chakra-v3`) stalled largely because of this scatter. Goal: one `ui/src/components/` library that (a) is the single import source for UI primitives via a Chakra boundary, so a future Chakra upgrade touches one folder, and (b) houses all cross-page reusable components. Zero visual/behavior change; app must build, test, and render identically.

Decisions confirmed with Richie: jsconfig `baseUrl: "src"` alias (`import { Box } from 'components'`), full split of `pages/helpers/` (UI → `components/`, non-UI → `src/utils/`), and dead-code cleanup.

## Target Structure

```
ui/src/
  components/
    index.js          # top barrel — EXPLICIT named re-exports only (no export * of two sources:
                      #   colliding names are silently dropped, e.g. when Chakra v2+ adds Card)
    chakra/index.js   # export * from '@chakra-ui/react'  ← the upgrade-shim boundary;
                      #   future named overrides go here (explicit export beats star export)
    icons.js          # re-export * from '@chakra-ui/icons' (separate entry avoids name clashes)
    README.md         # the rule: never import @chakra-ui/* outside this folder;
                      #   library components import 'components/chakra' directly, never the top barrel (init-cycle risk)
    Footer/           # from pages/footer/
    NavigationBar/    # from pages/NavigationBar/ (NavBar, MobileNavBar, MainMenu, removeScrollbar.css)
    Card.js, FileUpload.js, BibleVerseAccordion.js, LiveButton.js, SermonSeries.js   # from pages/helpers/components/
    Pagination.js, AudioEmbed.js, VideoEmbed.js       # UI helpers from pages/helpers/
    TipTap/           # rich-text editor suite from pages/helpers/TipTap/
  utils/              # non-UI logic from pages/helpers/: customAxios, eventsHelpers, formsHelpers,
                      #   userInformationHelpers, lists, PrivateRoute, ScrollTo, ScrollToTop,
                      #   ClearCache, SermonNotes, parseDescription, arrayToExcel, DailyBrp…
                      #   + TrackingUtil.js consolidated from src/util/
  pages/              # routed pages only; MainContainer.js STAYS here (it imports every page —
                      #   putting it in the library would create a library→pages dependency)
ui/jsconfig.json      # { "compilerOptions": { "baseUrl": "src" } }
```

Feature-local components (SermonCard, EventCard, etc. inside their page dirs) stay with their pages — only cross-page reuse earns a library spot.

## Steps (ordering is load-bearing)

1. **Checkpoint**: new branch `refactor/components-library` from `1378-grid-animation`; commit the pending components→pages `git mv` as-is (commit 1).
2. **Fix baseline**: repair the 3 genuinely broken imports in `ui/src/App.js` (`./components/MainContainer|NavigationBar/*` → `./pages/...`); prove `npm run build` passes (baseline). Commit 2.
3. **Library skeleton**: add `jsconfig.json`, `components/chakra/index.js`, `components/icons.js`, top barrel `components/index.js`, `README.md`. Pilot-migrate ONE file, restart dev server/build to prove resolution. Commit 3.
4. **Mechanical sweep**: rewrite module specifiers only (`'@chakra-ui/react'` → `'components'`, `'@chakra-ui/icons'` → `'components/icons'`) across all ~162 files, including `theme.js` (`extendTheme`) and `index.js` (`ChakraProvider`). Named imports untouched; multi-line imports handled per-file, no blind sed. Files inside `components/` itself import `'components/chakra'` directly. Build gate. Commit 4.
5. **Relocations**: `git mv` moves (commit 5a) then import-path rewrites of their consumers (commit 5b) — separate commits so git rename detection survives. Covers Footer, NavigationBar, helpers/components/*, Pagination/AudioEmbed/VideoEmbed, TipTap → `components/`; non-UI helpers + `util/TrackingUtil.js` → `utils/`. Top barrel gains explicit exports for the moved components. Build gate after each wave.
6. **Dead-code cleanup**: delete `pages/Card/` (empty), `pages/visit-us/` (orphaned — route uses `discover/PlanAVisit.js`), `pages/connect-prayer/` (unreferenced CSS), `src/Plans/` (empty), remove now-empty `src/util/` and `pages/helpers/`. Each verified unused via import grep immediately before deletion. Commit 6.
7. **Guard last**: ESLint `no-restricted-imports` in ui `package.json` eslintConfig blocking `@chakra-ui/*` outside `src/components/`; update `AGENTS.md` File Organization section to the new rule. Commit 7.

## Verification

- `rg "@chakra-ui" ui/src --glob '!**/components/**'` → 0 matches.
- Barrel import-smoke: a small node/jest check importing every name exported by `components/index.js` and asserting none is `undefined` (build & screenshots are blind to silent star-collision failures — this is the real gate for the barrel).
- `npm run build` exit 0, no new warnings vs baseline; `npm test -- --watchAll=false` passes.
- Live render via Interceptor: `/`, `/sermons`, and one admin route — zero console errors.
- `git diff` audit on moved files: import lines only, no JSX/logic changes; no dependency/package.json changes (beyond eslintConfig).
- Cross-vendor audit (Cato) before declaring done.

## Out of Scope

Chakra stays v1 (no upgrade now); no restyling/behavior change; no TS/Storybook/npm-package extraction; no route or Redux changes; the pages move is not reverted.
