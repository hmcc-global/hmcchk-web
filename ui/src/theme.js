import { extendTheme } from '@chakra-ui/react';
import '@fontsource/dm-sans';
import '@fontsource/dm-serif-display';

const customTheme = extendTheme({
  fonts: {
    heading: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`,
    body: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`,
  },
  textStyles: {
    dm_sans: {
      fontFamily: 'DM Sans',
      fontWeight: '500',
    },
    dm_sans_bold: {
      fontFamily: 'DM Sans',
      fontWeight: '700',
    },
    dm_serif_display: {
      fontFamily: 'DM Serif Display',
    },
  },
});

// Export custom fonts
export default customTheme;
