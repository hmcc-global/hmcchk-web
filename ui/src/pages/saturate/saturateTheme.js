import { createSystem, defaultConfig } from '@chakra-ui/react';
import '@fontsource/dm-sans';

const saturateTheme = createSystem(defaultConfig, {
  theme: {
    textStyles: {
      dm_sans: {
        value: {
          fontFamily: 'DM Sans',
          fontWeight: '500',
        },
      },
      dm_sans_bold: {
        value: {
          fontFamily: 'DM Sans',
          fontWeight: '700',
        },
      },
    },
  },
});

export default saturateTheme;
