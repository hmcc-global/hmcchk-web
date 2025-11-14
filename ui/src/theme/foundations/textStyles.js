const textStyles = {
  // Display styles (for large hero text)
  display: {
    xl: {
      fontFamily: 'DMSerifDisplay_Italic',
      fontSize: { base: '2.25rem', md: '3.4rem', lg: '5.625rem' },
      fontWeight: '400',
      letterSpacing: { base: '-0.0625rem', lg: '-0.125rem' },
      // textColor="#272727" referenced from building block hero section
    },
  },

  // Heading styles
  heading: {
    h1: {
      fontFamily: 'DMSerifDisplay_Italic',
      fontSize: { base: '2.25rem', md: '3.75rem' },
      fontWeight: '400',
      // color:"#272727" referenced from Discover Page
    },
    h2: {
      fontFamily: 'DMSerifDisplay_Italic',
      fontSize: { base: '1.5rem', md: '2.625rem' },
      fontWeight: '400',
    },
    h3: {
      fontFamily: 'DMSerifDisplay_Italic',
      fontSize: { base: '1.375rem', lg: '2rem' },
      fontWeight: '400',
    },
    h4: {
      italic: {
        fontFamily: 'DMSerifDisplay_Italic',
        fontSize: { base: '1.25rem', md: '1.75rem' },
        fontWeight: '400',
      },
      bold: {
        fontFamily: 'Manrope',
        fontSize: { base: '0.875rem', lg: '1.125rem' },
        fontWeight: '700',
      },
    },
  },

  // Paragraph styles
  paragraph: {
    p1: {
      fontFamily: 'Manrope',
      fontSize: { base: '0.875rem', lg: '1.25rem' },
      fontWeight: '400',
    },
    p2: {
      fontFamily: 'Manrope',
      fontSize: { base: '0.825rem', md: '1rem' },
      fontWeight: '400',
    },
    p3: {
      fontFamily: 'Manrope',
      fontSize: { base: '0.875rem', md: '1rem' },
      fontWeight: '400',
    },
  },

  // Specialized text styles
  dm_sans: {
    regular: {
      fontFamily: 'DM Sans',
      fontWeight: '400',
    },
    medium: {
      fontFamily: 'DM Sans',
      fontWeight: '500',
      fontSize: '1.125rem',
      lineHeight: '1.75',
    },
    bold: {
      fontFamily: 'DM Sans',
      fontWeight: '700',
    },
  },

  dm_serif: {
    regular: {
      fontFamily: 'DM Serif Display',
      fontWeight: '400',
    },
    italic: {
      fontFamily: 'DM Serif Display',
      fontWeight: '400',
      fontStyle: 'italic',
    },
  },
};

export default textStyles;
