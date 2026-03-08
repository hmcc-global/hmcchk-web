import { extendTheme } from '@chakra-ui/react';
import '@fontsource/dm-sans';
import '@fontsource/dm-serif-display';
import '@fontsource/dm-serif-display/400-italic';
import '@fontsource/instrument-serif';
import '@fontsource/manrope';

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
    dm_serif_display_italic: {
      fontFamily: "'DM Serif Display', Georgia, serif",
      fontStyle: 'italic',
      fontWeight: '400',
    },
    instrument_serif: {
      fontFamily: "'Instrument Serif', Georgia, serif",
      fontStyle: 'normal',
      fontWeight: '400',
    },
    instrument_serif_bold: {
      fontFamily: "'Instrument Serif', Georgia, serif",
      fontStyle: 'normal',
      fontWeight: '600',
    },
    manrope: {
      fontFamily: "'Manrope', sans-serif",
      fontWeight: '400',
    },
  },
});

// Export custom fonts
export default customTheme;
