import { extendTheme } from 'components';
import '@fontsource/dm-sans';

const saturateTheme = extendTheme({
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

export default saturateTheme;
