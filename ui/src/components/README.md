# Components Library

The single import source for UI in this app. App code never imports
`@chakra-ui/react` or `@chakra-ui/icons` directly.

```js
import { Box, Button, useToast, Footer } from 'components';
import { ChevronLeftIcon } from 'components/icons';
```

(`components` resolves from anywhere thanks to `ui/jsconfig.json` `baseUrl: "src"`.)

## Structure

| Path | Role |
|------|------|
| `chakra/index.js` | **The Chakra boundary** — the only file allowed to import `@chakra-ui/react`. Upgrade shims/overrides live here. |
| `icons.js` | The `@chakra-ui/icons` boundary (separate entry: both packages export `Icon`). |
| `index.js` | The barrel — explicit named re-exports of the Chakra surface + app components. |
| everything else | App-owned reusable components (used by 2+ pages). |

## Rules

1. **Never import `@chakra-ui/*` outside this folder.** Enforced by ESLint
   `no-restricted-imports`. Need a Chakra export that isn't in the barrel yet?
   Add one line to `index.js`.
2. **The barrel uses explicit named exports only.** Two `export *` sources that
   share a name silently drop it (undefined at runtime, no build error) —
   Chakra v2+ adds names like `Card` that would collide with ours.
3. **Files inside this folder import from `./chakra` (relative), never from the
   `components` barrel** — importing the barrel from inside creates a
   module-initialization cycle.
4. **Only cross-page components live here.** A component used by a single page
   stays in that page's folder.
5. **Changing the UI library?** (e.g. the planned Tailwind migration, or a
   Chakra version bump) Do it here, one export at a time: replace a re-export
   in `chakra/index.js` / `index.js` with an app-owned implementation of the
   same name and props. Consumers never change — that is the whole point of
   this folder. A Tailwind migration becomes: reimplement `Box`, `Flex`,
   `Text`, … inside this library, delete the `@chakra-ui` packages when the
   list runs dry.
