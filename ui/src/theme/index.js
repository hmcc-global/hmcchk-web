import { createSystem, defaultConfig } from '@chakra-ui/react';
import colors from './foundations/colors';
import textStyles from './foundations/textStyles';
import fonts from './foundations/fonts';

const customTheme = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors,
      fonts,
      sizes: {
        "container.sm": { value: "640px" },
        "container.md": { value: "768px" },
        "container.lg": { value: "1024px" },
        "container.xl": { value: "1280px" },
      },
    },

    textStyles: textStyles,
  },
});

export default customTheme;
