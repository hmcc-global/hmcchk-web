// Helper functions for generating sermon-specific SEO data

/**
 * Generates a clean description from sermon content or creates a fallback
 * @param {Object} sermon - The sermon object
 * @returns {string} - Clean description for SEO
 */
export const generateSermonDescription = (sermon) => {
  const seriesName =
    sermon.sermonSeries && sermon.sermonSeries[0]
      ? sermon.sermonSeries[0].name
      : '';
  const passage = sermon.passage || '';
  const sermonDesc = sermon.sermonDesc || '';

  // Create a clean description from sermon description (remove HTML/markdown and clean up)
  let cleanDesc = '';
  if (sermonDesc) {
    cleanDesc = sermonDesc
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/[#*_`\[\]]/g, '') // Remove markdown formatting
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .trim()
      .substring(0, 150);

    if (cleanDesc.length === 150) {
      cleanDesc += '...';
    }
  } else {
    // Create a descriptive fallback
    let descParts = ['Listen to this sermon'];
    if (seriesName) descParts.push(`from the ${seriesName} series`);
    if (passage) descParts.push(`on ${passage}`);
    descParts.push('from HMCC Hong Kong.');
    cleanDesc = descParts.join(' ');
  }

  return cleanDesc;
};

/**
 * Generates SEO keywords from sermon data
 * @param {Object} sermon - The sermon object
 * @returns {string} - Comma-separated keywords for SEO
 */
export const generateSermonKeywords = (sermon) => {
  const seriesName =
    sermon.sermonSeries && sermon.sermonSeries[0]
      ? sermon.sermonSeries[0].name
      : '';
  const passage = sermon.passage || '';

  // Build keywords array and clean up
  const keywordParts = [
    sermon.title,
    seriesName,
    passage,
    'sermon',
    'preaching',
    'bible teaching',
    'HMCC Hong Kong',
  ].filter((part) => part && part.trim() !== ''); // Remove empty parts

  return keywordParts.join(', ');
};

/**
 * Generates SEO title from sermon data
 * @param {Object} sermon - The sermon object
 * @returns {string} - SEO title
 */
export const generateSermonTitle = (sermon) => {
  let title = sermon.title;
  title += ' | HMCC Hong Kong';
  return title;
};

/**
 * Default SEO data for sermon pages when no sermon data is available
 * @returns {Object} - Default SEO object
 */
export const getDefaultSermonSEO = () => {
  return {
    title: 'Sermon | HMCC Hong Kong',
    description:
      'Listen to this sermon from Harvest Mission Community Church Hong Kong. Biblical teaching and spiritual encouragement for your faith journey.',
    keywords: 'sermon, preaching, bible teaching, HMCC Hong Kong',
  };
};

/**
 * Main function to generate complete SEO data for a sermon
 * @param {Object|null} sermon - The sermon object or null
 * @returns {Object} - Complete SEO data object
 */
export const generateSermonSEO = (sermon) => {
  if (!sermon) {
    return getDefaultSermonSEO();
  }

  return {
    title: generateSermonTitle(sermon),
    description: generateSermonDescription(sermon),
    keywords: generateSermonKeywords(sermon),
  };
};
