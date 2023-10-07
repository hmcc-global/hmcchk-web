import { extendTheme } from '@chakra-ui/react';
import '@fontsource/dm-sans';
import '@fontsource/cousine';
import '@fontsource/darker-grotesque';
import '@fontsource/darker-grotesque/500.css';
import '@fontsource/darker-grotesque/600.css';
import '@fontsource/darker-grotesque/700.css';
import '@fontsource/darker-grotesque/900.css';

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
    cousine: {
      fontFamily: 'Cousine',
      fontWeight: ['400', '700'],
    },
    
    darker_grotesque: {
      fontFamily: 'Darker Grotesque',
      fontWeight: '400',
    },
    darker_grotesque_medium: {
      fontFamily: 'Darker Grotesque',
      fontWeight: '500',
    },
    darker_grotesque_semibold: {
      fontFamily: 'Darker Grotesque',
      fontWeight: '600',
    },
    darker_grotesque_bold: {
      fontFamily: 'Darker Grotesque',
      fontWeight: '700',
    },
    darker_grotesque_black: {
      fontFamily: 'Darker Grotesque',
      fontWeight: '900',
    },
  },
});

// Export custom fonts
export default customTheme;
