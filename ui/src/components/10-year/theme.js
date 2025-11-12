// 10-Year Anniversary Theme Configuration
// Follows Chakra UI theming principles for consistent styling

export const tenYearTheme = {
  // Color palette
  colors: {
    primary: '#0628A3', // Main blue color
    secondary: '#63B3ED', // Light blue accent
    background: '#F6FAFF', // Light background
    text: {
      primary: '#000000', // Black text
      secondary: '#4A5568', // Gray text
    },
  },

  // Typography
  fonts: {
    heading: 'DMSerifDisplay_Italic', // Main heading font
    body: 'DMSerifDisplay_Regular', // Body text font
  },

  // Font sizes (responsive)
  fontSizes: {
    hero: ['4xl', '6xl'], // Large hero titles
    section: ['3xl', '5xl'], // Section titles
    subsection: ['2xl', '3xl'], // Subsection titles
    body: ['md', 'lg'], // Body text
    small: ['sm', 'md'], // Small text
  },

  // Spacing
  spacing: {
    section: 6, // Section padding
    content: 4, // Content padding
    gap: 4, // Gap between elements
  },

  // Border radius
  borderRadius: {
    image: '12px', // Image corners
    card: '8px', // Card corners
    button: '6px', // Button corners
  },

  // Component-specific styles
  components: {
    // Full page section styling
    fullPageSection: {
      minH: '100vh',
      w: '100%',
      bg: 'transparent', // Changed to transparent to show gradient
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      px: 6,
      textAlign: 'center',
      gap: 4,
    },

    // Heading styling
    heading: {
      fontFamily: 'DMSerifDisplay_Italic',
      color: '#FFFFFF', // White text for dark gradient
      lineHeight: 1,
    },

    // Text styling
    text: {
      color: '#E2E8F0', // Light gray text for dark gradient
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
