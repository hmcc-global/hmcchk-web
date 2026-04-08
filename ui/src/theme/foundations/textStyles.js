const textStyles = {
  // Display styles (for large hero text)
  "display.1": {
    value: {
      fontFamily:'DMSerifDisplay_Italic',
      fontSize:{ base: '2.25rem', md: '3.4rem', lg: '5.625rem' },
      fontWeight:'400',
      letterSpacing:{ base: '-0.0625rem', lg: '-0.125rem' },
    },
  },

  // Heading styles
  "heading.1": {
    value: {
      fontFamily:'DMSerifDisplay_Italic',
      fontSize:{ base: '2.25rem', md: '3.75rem' },
      fontWeight:'400',
    },
  },
  "heading.2": {
    value: {
      fontFamily: 'DMSerifDisplay_Italic',
      fontSize: { base: '1.5rem', md: '2.625rem' },
      fontWeight: "400",
    },
  },
  "heading.3": {
    value: {
      fontFamily: 'DMSerifDisplay_Italic',
      fontSize:{ base: '1.375rem', lg: '2rem' },
      fontWeight: '400',
    },
  },
  "heading.4.italic": {
    value: {
      fontFamily: 'DMSerifDisplay_Italic',
      fontSize: { base: '1.25rem', md: '1.75rem' },
      fontWeight: '400',
    },
  },
  "heading.4.bold": {
    value: {
      fontFamily: 'Manrope',
      fontSize: { base: '0.875rem', lg: '1.125rem' },
      fontWeight: '700',
    },
  },

  // Paragraph styles
  "paragraph.1": {
    value: {
      fontFamily:'Manrope',
      fontSize:{ base: '0.875rem', lg: '1.25rem' },
      fontWeight:'400',
    },
  },
  "paragraph.2": {
    value: {
      fontFamily:'Manrope',
      fontSize: { base: '0.825rem', md: '1rem' },
      fontWeight: '400',
    },
  },
  "paragraph.3": {
    value: {
      fontFamily:'Manrope',
      fontSize:{ base: '0.875rem', md: '1rem' },
      fontWeight:'400',
    },
  },

  // Specialized text styles
  "dm_sans.regular": {
    value: {
      fontFamily: 'DM Sans',
      fontWeight: '400',
    },
  },
  "dm_sans.medium": {
    value: {
      fontFamily: 'DM Sans',
      fontWeight: '500',
      fontSize: '1.125rem',
      lineHeight: '1.75',
    },
  },
  "dm_sans.bold": {
    value: {
      fontFamily: 'DM Sans',
      fontWeight: '700',
    },
  },

  "dm_serif.regular": {
    value: {
      fontFamily: 'DM Serif Display',
      fontWeight: '400',
    },
  },
  "dm_serif.italic": {
    value: {
      fontFamily: 'DM Serif Display',
      fontWeight: '400',
      fontStyle: 'italic',
    },
  },
};

export default textStyles;