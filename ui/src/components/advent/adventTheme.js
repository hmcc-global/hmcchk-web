import { extendTheme } from '@chakra-ui/react';
import '@fontsource/elsie-swash-caps';

const adventTheme = extendTheme({
  textStyles: {
    LettersForLearners: {
      fontFamily: 'LettersforLearners',
      fontWeight: '400',
    },
    ElsieSwashCaps: {
      fontFamily: 'Elsie Swash Caps',
      fontWeight: '400',
    },
  },
});

export default adventTheme;
