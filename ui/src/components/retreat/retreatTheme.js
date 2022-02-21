import { extendTheme } from '@chakra-ui/react';

const retreatTheme = extendTheme({
  textStyles: {
    sora: {
      fontFamily: 'Sora',
      fontWeight: 'bold',
    },
    inter: {
      fontFamily: 'Inter',
      fontWeight: 'normal',
    },
    inter_bold: {
      fontFamily: 'Inter',
      fontWeight: 'bold',
    },
  },
});

export default retreatTheme;
