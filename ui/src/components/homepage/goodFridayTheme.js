import { extendTheme } from '@chakra-ui/react';
import "@fontsource/quicksand";

const goodFridayTheme = extendTheme({
  textStyles: {
    NextSoutherlandSerif: {
        fontFamily: 'NextSoutherlandSerif',
    },
    Quicksand: {
      fontFamily: 'Quicksand',
      fontWeight: 400,
    }
  },
});

export default goodFridayTheme;