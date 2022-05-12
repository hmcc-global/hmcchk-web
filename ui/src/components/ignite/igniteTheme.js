import { extendTheme } from '@chakra-ui/react';
import '@fontsource/rubik';

const igniteTheme = extendTheme({
  textStyles: {
    Rubik: {
      fontFamily: 'Rubik',
      fontWeight: 400,
    },
    Rubik_medium: {
      fontFamily: 'Rubik',
      fontWeight: 500,
    },
    Rubik_bold: {
      fontFamily: 'Rubik',
      fontWeight: 700,
    },
  },
});

export default igniteTheme;
