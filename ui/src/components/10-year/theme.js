// 10-Year Anniversary Theme Configuration
// Follows Chakra UI theming principles for consistent styling

export const tenYearTheme = {
  // Color palette from Figma Design Guide
  colors: {
    primary: '#0029BD', // Deep blue
    secondary: '#95CFFF', // Light blue accent
    background: '#1B1B1B', // Dark background from design canvas
    text: {
      primary: '#FFFFFF',
      secondary: '#E2E8F0',
    },
  },

  // Gradients
  gradients: {
    primaryStroke: 'linear-gradient(270deg, #0029BD 0%, #95CFFF 100%)',
  },

  // Typography families (as named in the Design Guide)
  fonts: {
    heading: "'Abhaya Libre', serif",
    headingMedium: "'Abhaya Libre', serif",
    body: "'Abhaya Libre', serif",
    emphasis: "'Abhaya Libre', serif",
    subheading: "'Abhaya Libre', serif",
    giving: "'Manrope', sans-serif",
  },

  // Letter spacings (Design Guide uses -3% and 0%)
  letterSpacings: {
    tight: '-0.03em',
    normal: '0',
  },

  // Font sizes (responsive: [mobile, web]) based on Design Guide
  fontSizes: {
    // From previous theme (kept for compatibility with existing usage)
    hero: ['4xl', '6xl'],
    section: ['3xl', '5xl'],
    subsection: ['2xl', '3xl'],
    body: ['md', 'lg'],
    small: ['sm', 'md'],

    // New 10-Year tokens
    title: ['40px', '64px'],
    h1: ['30px', '42px'],
    h2: ['30px', '34px'],
    subheading: ['14px', '18px'],
    bodyText: ['16px', '16px'],
    bodyEmphasis: ['16px', '20px'],
    givingInfo: ['8px', '12px'],
  },

  // Spacing
  spacing: {
    section: 6,
    content: 4,
    gap: 4,
  },

  // Border radius
  borderRadius: {
    image: '12px',
    card: '8px',
    button: '6px',
  },

  // Semantic typography styles that map Figma text styles
  typography: {
    title: {
      fontFamily: "'Abhaya Libre', serif",
      fontWeight: 500,
      fontSize: ['40px', '64px'],
      letterSpacing: '-0.03em',
      lineHeight: 1.1,
      color: '#FFFFFF',
    },
    h1: {
      fontFamily: "'Abhaya Libre', serif",
      fontWeight: 500,
      fontSize: ['30px', '42px'],
      letterSpacing: '-0.03em',
      lineHeight: 1.1,
      color: '#FFFFFF',
    },
    h2: {
      fontFamily: "'Abhaya Libre', serif",
      fontWeight: 500,
      fontSize: ['30px', '34px'],
      letterSpacing: '-0.03em',
      lineHeight: 1.15,
      color: '#FFFFFF',
    },
    subheading: {
      fontFamily: "'Abhaya Libre', serif",
      fontWeight: 800,
      fontSize: ['14px', '18px'],
      letterSpacing: '-0.03em',
      lineHeight: 1.2,
      color: '#95CFFF',
    },
    body: {
      fontFamily: "'Abhaya Libre', serif",
      fontWeight: 400,
      fontSize: ['16px', '16px'],
      letterSpacing: '0',
      lineHeight: 1.5,
      color: '#FFFFFF',
    },
    bodyEmphasis: {
      fontFamily: "'Abhaya Libre', serif",
      fontWeight: 500,
      fontSize: ['16px', '20px'],
      letterSpacing: '-0.03em',
      lineHeight: 1.45,
      color: '#FFFFFF',
    },
    givingInfo: {
      fontFamily: "'Manrope', sans-serif",
      fontWeight: 700, // Bold by default; use 400 where Regular is needed
      fontSize: ['8px', '12px'],
      letterSpacing: '0',
      lineHeight: 1.5,
      color: '#FFFFFF',
    },
  },

  // Component-specific styles
  components: {
    // Full page section styling
    fullPageSection: {
      minH: '100vh',
      w: '100%',
      bg: 'transparent',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      px: 6,
      textAlign: 'center',
      gap: 4,
    },

    // Heading styling (default)
    heading: {
      fontFamily: "'Abhaya Libre', serif",
      color: '#FFFFFF',
      lineHeight: 1,
      letterSpacing: '-0.03em',
    },

    // Text styling
    text: {
      color: '#E2E8F0',
      maxW: '720px',
    },

    // Image styling
    image: {
      borderRadius: '12px',
      objectFit: 'cover',
      w: '100%',
      h: '100%',
    },

    // Button styling
    button: {
      colorScheme: 'teal',
      borderRadius: '6px',
    },
  },
};

// Helper functions for easy theme access
export const getThemeColor = (colorPath) => {
  const keys = colorPath.split('.');
  let value = tenYearTheme.colors;
  for (const key of keys) {
    value = value?.[key];
  }
  return value;
};

export const getThemeFontSize = (size) => {
  return tenYearTheme.fontSizes[size] || size;
};

export const getThemeFont = (type) => {
  return tenYearTheme.fonts[type] || type;
};

export const getThemeSpacing = (space) => {
  return tenYearTheme.spacing[space] || space;
};

export const getThemeBorderRadius = (radius) => {
  return tenYearTheme.borderRadius[radius] || radius;
};

export const getThemeLetterSpacing = (space) => {
  return tenYearTheme.letterSpacings?.[space] || space;
};

export const getThemeGradient = (name) => {
  return tenYearTheme.gradients?.[name] || name;
};

export const getTypography = (role) => {
  return tenYearTheme.typography?.[role] || {};
};
