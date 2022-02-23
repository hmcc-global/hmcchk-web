import { extendTheme } from '@chakra-ui/react';

const retreatTheme = extendTheme({
  textStyles: {
    sora: {
      fontFamily: 'Sora',
      fontWeight: 'bold',
    },
    sora_bolder: {
      fontFamily: 'Sora',
      fontWeight: '900',
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
