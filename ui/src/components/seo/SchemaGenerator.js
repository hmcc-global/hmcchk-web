import { seoData } from './seoData';

export const generateChurchSchema = (pathname = '/') => {
  // Base church organization schema
  const baseChurch = {
    '@context': 'https://schema.org',
    '@type': 'Church',
    name: 'Harvest Mission Community Church Hong Kong',
    alternateName: 'HMCC Hong Kong',
    url: 'https://hk.hmccglobal.org',
    description: seoData['/']?.description,
    foundingDate: '2015',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Hong Kong',
      streetAddress: '79 Hoi Yuen Rd',
      addressRegion: 'Hong Kong',
      addressCountry: 'HK',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'information',
      email: 'hk@hmccglobal.org',
    },
    sameAs: [
      'https://www.facebook.com/hmccofhk/',
      'https://www.instagram.com/hmcc_hk/',
      'https://www.youtube.com/@HMCCHK',
    ],
  };

  // Route-specific schemas for church pages
  switch (true) {
    case pathname === '/':
      return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Harvest Mission Community Church Hong Kong',
        alternateName: 'HMCC Hong Kong',
        url: 'https://hk.hmccglobal.org',
        description: seoData['/']?.description,
        keywords: seoData['/']?.keywords,
        publisher: baseChurch,
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://hk.hmccglobal.org/search?q={search_term_string}',
          'query-input': 'required name=search_term_string',
        },
        mainEntity: baseChurch,
      };

    case pathname === '/sermons':
      return {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Church Sermons - HMCC Hong Kong',
        description: seoData['/sermons']?.description,
        keywords: seoData['/sermons']?.keywords,
        url: 'https://hk.hmccglobal.org/sermons',
        publisher: baseChurch,
        mainEntity: {
          '@type': 'ItemList',
          name: 'Sermon Collection',
          description: 'Collection of weekly sermons and biblical teachings',
        },
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: 'https://hk.hmccglobal.org',
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Sermons',
              item: 'https://hk.hmccglobal.org/sermons',
            },
          ],
        },
      };

    case pathname.startsWith('/sermons/'):
      return {
        '@context': 'https://schema.org',
        '@type': 'VideoObject',
        name: 'Sunday Service Sermon',
        description: seoData['/sermons']?.description,
        keywords: seoData['/sermons']?.keywords,
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
        description: seoData['/online']?.description,
        keywords: seoData['/online']?.keywords,
        publisher: baseChurch,
        broadcastOfEvent: {
          '@type': 'Event',
          name: 'Sunday Worship Service',
          organizer: baseChurch,
        },
      };

    case pathname === '/online/no-stream':
      return {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'No Live Stream Available - HMCC Hong Kong',
        description: seoData['/online']?.description,
        keywords: seoData['/online']?.keywords,
        url: 'https://hk.hmccglobal.org/online/no-stream',
        publisher: baseChurch,
        mainEntity: {
          '@type': 'FAQPage',
          name: 'Live Stream Information',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'When are live streams available?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Live streams are typically available during Sunday Service at 10:00 AM HKT. Head to our events page for upcoming sermons and gatherings.',
              },
            },
          ],
        },
      };

    case pathname === '/events':
      return {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Church Events - HMCC Hong Kong',
        description: seoData['/events']?.description,
        keywords: seoData['/events']?.keywords,
        url: 'https://hk.hmccglobal.org/events',
        publisher: baseChurch,
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: 'https://hk.hmccglobal.org',
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Events',
              item: 'https://hk.hmccglobal.org/events',
            },
          ],
        },
      };

    case pathname === '/about-us':
      return {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: 'About Harvest Mission Community Church Hong Kong',
        description: seoData['/about-us']?.description,
        keywords: seoData['/about-us']?.keywords,
        url: 'https://hk.hmccglobal.org/about-us',
        publisher: baseChurch,
        mainEntity: {
          ...baseChurch,
          mission:
            "To transform lost people into Christ's disciples who will then transform the world.",
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Church Services',
            itemListElement: [
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Sunday Worship Service',
                  description: 'Weekly worship and biblical teaching',
                },
              },
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Life Groups',
                  description: 'Small group fellowship and Bible study',
                },
              },
            ],
          },
        },
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: 'https://hk.hmccglobal.org',
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'About Us',
              item: 'https://hk.hmccglobal.org/about-us',
            },
          ],
        },
      };

    case pathname === '/visit-us':
      return {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Visit Harvest Mission Community Church Hong Kong',
        description: seoData['/discover/visit-us-page']?.description,
        keywords: seoData['/discover/visit-us-page']?.keywords,
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
        name: 'Give - Support HMCC Hong Kong Ministry',
        description: seoData['/give']?.description,
        keywords: seoData['/give']?.keywords,
        url: 'https://hk.hmccglobal.org/give',
        publisher: baseChurch,
        potentialAction: {
          '@type': 'DonateAction',
          recipient: baseChurch,
          name: 'Make a Donation',
          description: 'Support church ministry and missions',
        },
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: 'https://hk.hmccglobal.org',
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Give',
              item: 'https://hk.hmccglobal.org/give',
            },
          ],
        },
      };

    case pathname === '/discover':
      return {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Discover HMCC Hong Kong - New Visitors Welcome',
        description: seoData['/discover']?.description,
        keywords: seoData['/discover']?.keywords,
        url: 'https://hk.hmccglobal.org/discover',
        publisher: baseChurch,
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: 'https://hk.hmccglobal.org',
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Discover',
              item: 'https://hk.hmccglobal.org/discover',
            },
          ],
        },
      };

    case pathname === '/discover/visit-us-page':
      return {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Visit Us - Plan Your First Visit to HMCC Hong Kong',
        description: seoData['/discover/visit-us-page']?.description,
        keywords: seoData['/discover/visit-us-page']?.keywords,
        url: 'https://hk.hmccglobal.org/discover/visit-us-page',
        publisher: baseChurch,
        mainEntity: {
          '@type': 'Place',
          name: 'Harvest Mission Community Church Hong Kong',
          address: baseChurch.address,
        },
      };

    case pathname === '/discover/life-group':
      return {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Life Groups - Small Group Community at HMCC Hong Kong',
        description: seoData['/discover/life-group']?.description,
        keywords: seoData['/discover/life-group']?.keywords,
        url: 'https://hk.hmccglobal.org/discover/life-group',
        publisher: baseChurch,
      };

    case pathname === '/discover/connect-ministries':
      return {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Connect with Ministries - Serve at HMCC Hong Kong',
        description: seoData['/discover/connect-ministries']?.description,
        keywords: seoData['/discover/connect-ministries']?.keywords,
        url: 'https://hk.hmccglobal.org/discover/connect-ministries',
        publisher: baseChurch,
      };

    case pathname === '/building-blocks':
      return {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: "Building Blocks - children's ministry at HMCC Hong Kong",
        description: seoData['/building-blocks']?.description,
        keywords: seoData['/building-blocks']?.keywords,
        url: 'https://hk.hmccglobal.org/building-blocks',
        provider: baseChurch,
      };

    case pathname === '/saturate':
      return {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Saturate - Mission and Evangelism at HMCC Hong Kong',
        description: seoData['/saturate']?.description,
        keywords: seoData['/saturate']?.keywords,
        url: 'https://hk.hmccglobal.org/saturate',
        publisher: baseChurch,
      };

    case pathname === '/privacy-policy':
      return {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Privacy Policy - HMCC Hong Kong',
        description: seoData['/privacy-policy']?.description,
        keywords: seoData['/privacy-policy']?.keywords,
        url: 'https://hk.hmccglobal.org/privacy-policy',
        publisher: baseChurch,
      };

    // Default church page schema
    default:
      return {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'HMCC Hong Kong',
        description: 'Harvest Mission Community Church Hong Kong',
        url: `https://hk.hmccglobal.org${pathname}`,
        publisher: baseChurch,
        isPartOf: {
          '@type': 'WebSite',
          name: 'Harvest Mission Community Church Hong Kong',
          url: 'https://hk.hmccglobal.org',
        },
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: 'https://hk.hmccglobal.org',
            },
          ],
        },
      };
  }
};
