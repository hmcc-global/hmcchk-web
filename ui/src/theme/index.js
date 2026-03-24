import { createSystem, defaultConfig } from '@chakra-ui/react';
import colors from './foundations/colors';
import textStyles from './foundations/textStyles';
import fonts from './foundations/fonts';

const customTheme = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors,
      fonts,
    },

    textStyles: textStyles,
  },
});

export default customTheme;
