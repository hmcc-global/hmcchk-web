import { extendTheme } from '@chakra-ui/react';
import "@fontsource/quicksand";

const easterTheme = extendTheme({
  textStyles: {
    NextSoutherlandSerif: {
      fontFamily: 'NextSoutherlandSerif',
      fontWeight: 400,
    },
    Quicksand: {
      fontFamily: 'Quicksand',
      fontWeight: 400,
    },
    Quicksand_bold: {
      fontFamily: 'Quicksand',
      fontWeight: 600,
    },
    Quicksand_bolder: {
      fontFamily: 'Quicksand',
      fontWeight: 700,
    },
    Didot: {
      fontFamily: 'GFS Didot',
      fontWeight: 400,
    },
  },
});

export default easterTheme;