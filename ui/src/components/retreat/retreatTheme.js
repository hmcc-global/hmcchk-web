import { extendTheme } from '@chakra-ui/react';

const retreatTheme = extendTheme({
  textStyles: {
    sora: {
      fontFamily: 'Sora',
      fontSize: '50px',
      fontWeight: 'bold',
      lineHeight: '95.5%',
    },
    inter: {
      fontFamily: 'Inter',
      fontSize: '25px',
      fontWeight: 'normal',
    },
  },
});

export default retreatTheme;
