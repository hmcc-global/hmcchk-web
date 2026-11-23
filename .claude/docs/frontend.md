# Frontend Code Standards

## File organisation

- Pages and page-only components in `pages/<feature>/`. Reusable (2+ pages) components in `components/`.
- Never import `@chakra-ui/react` or `@chakra-ui/icons` outside the two boundary files. ESLint `no-restricted-imports` fails the build on it. Need a Chakra export the barrel lacks? Add one explicit line to `components/index.js`. Never `export *` there: colliding names are silently dropped.
- Files inside `components/` import from `./chakra` (relative), never from the `components` barrel (module-init cycle).
- Changing the UI library (Chakra bump, Tailwind) happens inside `components/` one export at a time; consumers never change. See `ui/src/components/README.md`.

## Imports

```javascript
// 1. External packages and the components library
import { Box, Flex, useToast } from 'components';
import { ChevronLeftIcon } from 'components/icons';
import { useEffect, useState } from 'react';

// 2. Shared utils (absolute from src) and local relative imports
import { customAxios as axios } from 'utils/customAxios';
import HeroSection from './HeroSection';

// 3. Assets
import logo from './assets/logo.png';
```

## Component shape

```javascript
const ComponentName = (props) => {
  const { title, onSubmit } = props;
  const [data, setData] = useState(null);

  useEffect(() => {
    // effect
  }, []);

  const handleClick = () => {};

  return <Box>{title}</Box>;
};

export default ComponentName;
```

## Naming

- Components `PascalCase`; functions, props, and callbacks `camelCase`; true constants `UPPER_SNAKE_CASE`.
- Booleans `is/has/should`; event props `on*`; handlers `handle*`.
- `.js` for everything.

## Preferences

- Functional components with hooks; arrow functions; `const`/`let`.
- Ternary for either/or rendering, `&&` only for render-if-true, complex conditions extracted to a named `const`.
- Single quotes (older files use double; leave them unless you are already editing that line).
- **No type checker exists.** Guard every `.map`, `.length`, and nested property on fetched data. Backend records are inconsistent (old announcements lack `eventType`, speakers may be null, arrays sometimes arrive as strings). One unguarded access white-screens the page silently because of the catch-and-log convention. `Array.isArray` and `?.` are cheap.
- luxon under Vite is ESM: `DateTime.fromISO(...)`, never `new DateTime.fromISO(...)`.
- Env vars: `import.meta.env.REACT_APP_*` (Vite with the CRA prefix kept). `process.env.PUBLIC_URL` is defined to `''` and still prefixes public asset paths.
- Default to no comments. If a line needs explaining, rename the symbol. A comment is for a *why* the code cannot say.

## Chakra and Styling

- Chakra **v1** API only. No v2/v3 names (`colorPalette`, `asChild`, Chakra's `Card`; the repo has its own `components/Card.js`).
- Responsive props over media queries: `w={{ base: '100%', md: '50%' }}`; `useBreakpointValue({ base: true, md: false })` for logic.
- Semantic layout: `Flex`, `Box`, `VStack`, `HStack`, `Container`, `SimpleGrid`. `bgColor` not `background`. `_hover` / `_active` for pseudo-states.
- Prefer theme scale values (`teal.500`, spacing `4`, `textStyle="dm_sans"`) over raw hex and pixels. When matching a Figma token with no theme equivalent, hoist the raw value into one `const` at the top of the file rather than repeating it inline.
- Every page renders on desktop and mobile. Check both before calling a layout done. Prefer one responsive component over a new `*Mobile.js` twin; when you must edit an existing twin, edit both.
- `sass` is installed for a few legacy `.scss` files; do not add new ones.
