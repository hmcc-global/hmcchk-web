import { extendTheme } from '@chakra-ui/react';
import '@fontsource/dm-sans';

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
