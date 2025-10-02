export const generateChurchSchema = (pathname = '/') => {
  // Base church organization schema
  const baseChurch = {
    '@context': 'https://schema.org',
    '@type': 'Church',
    name: 'Harvest Mission Community Church Hong Kong',
    alternateName: 'HMCC Hong Kong',
    url: 'https://hk.hmccglobal.org',
    description:
      'Growing disciples who plant churches that multiply movements. A welcoming Christian church community serving Hong Kong.',
    foundingDate: '2002',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Hong Kong',
      addressRegion: 'Hong Kong',
      addressCountry: 'HK',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'info@hk.hmccglobal.org',
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
        description:
          'Welcome to Harvest Mission Community Church - Join us for worship, community, and spiritual growth in Hong Kong. Growing disciples who plant churches that multiply movements.',
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
        description:
          'Weekly sermons and biblical teachings from Harvest Mission Community Church Hong Kong pastors and guest speakers. Grow in faith through expository preaching.',
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
        '@type': 'CollectionPage',
        name: 'Church Events - HMCC Hong Kong',
        description:
          'Discover upcoming events, worship services, and community activities at Harvest Mission Community Church Hong Kong. Join us for fellowship and spiritual growth.',
        url: 'https://hk.hmccglobal.org/events',
        publisher: baseChurch,
        mainEntity: {
          '@type': 'EventSeries',
          name: 'HMCC Hong Kong Events',
          description: 'Regular church events and special activities',
          organizer: baseChurch,
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
        description:
          'Learn about our church history, mission, values, and pastoral team at Harvest Mission Community Church Hong Kong. Discover what makes our church community unique.',
        url: 'https://hk.hmccglobal.org/about-us',
        publisher: baseChurch,
        mainEntity: {
          ...baseChurch,
          mission:
            'Growing disciples who plant churches that multiply movements',
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
        name: 'Give - Support HMCC Hong Kong Ministry',
        description:
          'Support the mission and ministry of Harvest Mission Community Church Hong Kong through tithes, offerings, and donations. Join us in growing disciples who plant churches.',
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
        description:
          'New to HMCC? Discover our church community, values, and how you can get involved. Learn about our ministries, life groups, and worship services in Hong Kong.',
        url: 'https://hk.hmccglobal.org/discover',
        publisher: baseChurch,
        mainEntity: {
          '@type': 'FAQPage',
          name: 'New Visitor Information',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'What can I expect at HMCC Hong Kong?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Welcoming community focused on growing disciples who plant churches that multiply movements.',
              },
            },
          ],
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
        description:
          'Plan your visit to Harvest Mission Community Church Hong Kong. Find service times, location details, and what to expect during your first visit.',
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
        description:
          'Join a Life Group at HMCC Hong Kong for deeper fellowship, Bible study, and community. Discover how small groups help us grow together in faith.',
        url: 'https://hk.hmccglobal.org/discover/life-group',
        publisher: baseChurch,
      };

    case pathname === '/discover/connect-ministries':
      return {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Connect with Ministries - Serve at HMCC Hong Kong',
        description:
          "Discover ministry opportunities at HMCC Hong Kong. Find ways to serve, connect, and use your gifts to build God's kingdom in our community.",
        url: 'https://hk.hmccglobal.org/discover/connect-ministries',
        publisher: baseChurch,
      };

    case pathname === '/building-blocks':
      return {
        '@context': 'https://schema.org',
        '@type': 'Course',
        name: 'Building Blocks - Youth Program at HMCC Hong Kong',
        description: 'Building Blocks youth program at HMCC Hong Kong.',
        url: 'https://hk.hmccglobal.org/building-blocks',
        provider: baseChurch,
        educationalLevel: 'Beginner to Advanced',
        teaches: 'Christian discipleship and spiritual growth',
      };

    case pathname === '/saturate':
      return {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Saturate - Mission and Evangelism at HMCC Hong Kong',
        description:
          'Saturate mission and evangelism initiatives at HMCC Hong Kong. Join us in sharing the gospel and making disciples in Hong Kong and beyond.',
        url: 'https://hk.hmccglobal.org/saturate',
        publisher: baseChurch,
      };

    case pathname.startsWith('/witness'):
      return {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Testimonies and Witness Stories - HMCC Hong Kong',
        description:
          'Personal testimonies and faith stories from Harvest Mission Community Church Hong Kong community members. Be encouraged by how God is working in our midst.',
        url: 'https://hk.hmccglobal.org/witness',
        publisher: baseChurch,
        mainEntity: {
          '@type': 'ItemList',
          name: 'Community Testimonies',
          description: 'Real stories of faith and transformation',
        },
      };

    case pathname.startsWith('/forms/'):
      return {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Church Forms - HMCC Hong Kong',
        description:
          'Church registration and information forms for HMCC Hong Kong community members and visitors.',
        publisher: baseChurch,
      };

    case pathname === '/privacy-policy':
      return {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Privacy Policy - HMCC Hong Kong',
        description:
          'Privacy policy for Harvest Mission Community Church Hong Kong website and services.',
        url: 'https://hk.hmccglobal.org/privacy-policy',
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
