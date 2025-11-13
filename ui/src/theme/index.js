import { createSystem, defineConfig, defaultConfig } from '@chakra-ui/react';
import styles from './styles.js';
import colors from './foundations/colors';
import textStyles from './foundations/textStyles';
import fonts from './foundations/fonts';
// import Button from "./components/button";
// import Input from "./components/input";

// Create a Chakra UI system based on the default config and our theme pieces.
// Note: v3 uses a system-based theming API instead of `extendTheme`.
const config = defineConfig({
  theme: {
    // tokens accepts a plain object for categories (colors, fonts, etc.)
    tokens: {
      colors,
      fonts,
    },
    textStyles,
    // layerStyles, animationStyles, recipes, etc. can be added here as needed.
  },
  // Global CSS (preflight / global styles) can be provided via `globalCss` if required.
});

export const customSystem = createSystem(defaultConfig, config);
