export const generateChurchSchema = (pathname = '/') => {
  // Base church organization schema
  const baseChurch = {
    '@context': 'https://schema.org',
    '@type': 'Church',
    name: 'Harvest Mission Community Church Hong Kong',
    url: 'https://hk.hmccglobal.org',
    description:
      'A welcoming Christian church community serving Hong Kong with worship, fellowship, and spiritual growth.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Hong Kong',
      addressCountry: 'HK',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      telephone: '+852-XXXX-XXXX',
    },
    sameAs: [
      'https://www.facebook.com/hmccofhk/',
      'https://www.instagram.com/hmcc_hk/?hl=en',
    ],
  };

  // Route-specific schemas for church pages
  switch (true) {
    case pathname === '/':
      return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Harvest Mission Community Church Hong Kong',
        alternateName: 'HMCCHK',
        url: 'https://hmcchk.org',
        description:
          'Welcome to Harvest Mission Community Church - Join us for worship, community, and spiritual growth in Hong Kong.',
        publisher: baseChurch,
      };

    case pathname === '/sermons':
      return {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Church Sermons',
        description:
          'Weekly sermons and messages from Harvest Mission Community Church Hong Kong pastors and guest speakers.',
        publisher: baseChurch,
      };

    case pathname.startsWith('/sermons/'):
      return {
        '@context': 'https://schema.org',
        '@type': 'VideoObject',
        name: 'Sunday Service Sermon',
        description:
          'Weekly sermon from Harvest Mission Community Church Hong Kong',
        publisher: baseChurch,
        contentLocation: {
          '@type': 'Place',
          name: 'Harvest Mission Community Church Hong Kong',
          address: baseChurch.address,
        },
      };

    case pathname === '/online':
      return {
        '@context': 'https://schema.org',
        '@type': 'BroadcastService',
        name: 'Online Church Service',
        description:
          'Join our live online worship service from Harvest Mission Community Church Hong Kong',
        publisher: baseChurch,
        broadcastOfEvent: {
          '@type': 'Event',
          name: 'Sunday Worship Service',
          organizer: baseChurch,
        },
      };

    case pathname === '/events':
      return {
        '@context': 'https://schema.org',
        '@type': 'EventSeries',
        name: 'Church Events',
        description:
          'Upcoming events, services, and activities at Harvest Mission Community Church Hong Kong',
        organizer: baseChurch,
      };

    case pathname === '/about-us':
      return {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: 'About Harvest Mission Community Church Hong Kong',
        description:
          'Learn about our church history, mission, values, and pastoral team at Harvest Mission Community Church Hong Kong',
        publisher: baseChurch,
        mainEntity: baseChurch,
      };

    case pathname === '/visit-us':
      return {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Visit Harvest Mission Community Church Hong Kong',
        description:
          'Plan your visit to Harvest Mission Community Church Hong Kong - service times, location, and what to expect',
        publisher: baseChurch,
        mainEntity: {
          '@type': 'Place',
          name: 'Harvest Mission Community Church Hong Kong',
          address: baseChurch.address,
        },
      };

    case pathname === '/give':
      return {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Give to Harvest Mission Community Church Hong Kong',
        description:
          'Support our church mission through tithes, offerings, and donations',
        publisher: baseChurch,
        potentialAction: {
          '@type': 'DonateAction',
          recipient: baseChurch,
        },
      };

    case pathname === '/connect':
      return {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Connect with Harvest Mission Community Church Hong Kong',
        description:
          'Join our church community - small groups, ministries, and fellowship opportunities',
        publisher: baseChurch,
      };

    case pathname.startsWith('/witness'):
      return {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Testimonies and Witness Stories',
        description:
          'Personal testimonies and faith stories from Harvest Mission Community Church Hong Kong community members',
        publisher: baseChurch,
      };

    // Admin pages - basic WebPage schema
    case pathname.startsWith('/admin'):
      return {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Church Administration',
        publisher: baseChurch,
        isAccessibleForFree: false,
      };

    // Default church page schema
    default:
      return {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        publisher: baseChurch,
        isPartOf: {
          '@type': 'WebSite',
          name: 'Harvest Mission Community Church Hong Kong',
          url: 'https://hmcchk.org',
        },
      };
  }
};
