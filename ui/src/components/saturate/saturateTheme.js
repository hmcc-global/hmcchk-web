import { extendTheme } from '@chakra-ui/react';
import '@fontsource/dm-sans';
import '@fontsource/darker-grotesque';

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
    darker_grotesque: {
      fontFamily: 'Darker Grotesque',
      fontWeight: '900',
    },
  },
});

export default witnessTheme;
