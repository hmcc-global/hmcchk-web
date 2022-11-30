import { extendTheme } from '@chakra-ui/react';
import '@fontsource/elsie-swash-caps';
import '@fontsource/nosifer';

const adventTheme = extendTheme({
  fonts: {
    LettersForLearners: {
      fontFamily: 'LettersforLearners',
      fontWeight: '400',
    },
    ElsieSwashCaps: {
      fontFamily: 'Elsie Swash Caps',
      fontWeight: '400',
    },
    Nosifer: {
      fontFamily: 'Nosifer',
      fontWeight: '400',
    },
  },
});

export default adventTheme;
