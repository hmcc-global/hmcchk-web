import { extendTheme } from '@chakra-ui/react';

const witnessTheme = extendTheme({
  textStyles: {
    dm_sans: {
      fontFamily: 'DM Sans',
      fontWeight: '500',
    },
    dm_sans_bold: {
      fontFamily: 'DM Sans',
      fontWeight: '700',
    },
  },
});

export default witnessTheme;
