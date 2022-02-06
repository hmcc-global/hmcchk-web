import { extendTheme } from '@chakra-ui/react';
import '@fontsource/sora';
import '@fontsource/inter';

const retreatTheme = extendTheme({
  textStyles: {
    title: {
      font: 'Sora',
      fontSize: '50px',
      fontWeight: 'normal',
      lineHeight: '95.5%',
    },
    subtitle: {
      font: 'Sora',
      fontSize: '25px',
      fontWeight: 'bold',
      lineHeight: '35px',
      letterSpacing: '-0.02em',
    },
    normal: {
      font: 'Inter',
      fontSize: '25px',
      fontWeight: 'normal',
    },
  },
});

export default retreatTheme;
