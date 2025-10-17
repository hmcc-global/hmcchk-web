// Consolidated SEO configuration for meta tags
export const seoData = {
  '/': {
    title: 'HMCC HK | English-speaking International Church',
    description:
      'We are an international church in Hong Kong that values transculturalism. We actively reach out to students, working adults, and families.',
    keywords:
      'Hong Kong church, English church in hk, English speaking church hong kong, international church',
  },
  '/sermons': {
    title: 'HMCC HK | Sermons',
    description:
      'Explore the latest & past sermons at HMCC HK, featuring sermons enriched with Biblical illustrations delivered by our Pastor to deepen your faith.',
    keywords: 'sermons, pastor, Biblical illustrations',
  },
  '/events': {
    title: 'HMCC HK | Upcoming Church & Community Events',
    description:
      'Discover upcoming community events at HMCC HK, such as prayer sessions, classes, and other church activities that strengthen faith and fellowship.',
    keywords: 'community events',
  },
  '/about-us': {
    title: 'HMCC HK | About Us | Vision & Mission',
    description:
      "HMCC HK aims to multiply churches to transform the next generation and lost people into Christ's disciples who will transform the world.",
    keywords: 'Missions hong kong',
  },
  '/discover': {
    title: 'HMCC HK | International Christian Fellowship',
    description:
      'New here or just wanting to discover more about our church, find out how you can experience our church community here.',
    keywords: 'international Christian fellowship',
  },
  '/discover/visit-us-page': {
    title: 'HMCC HK | Church in Kwun Tong',
    description:
      'We are an English-speaking church located in Kwun Tong, Hong Kong.',
    keywords: 'church in hk, kwun tong church',
  },
  '/discover/life-group': {
    title: 'HMCC HK | Church Fellowship',
    description:
      'LIFE Groups are our main avenue for church fellowship. Come join us to experience Christian community together!',
    keywords: 'cell groups, church fellowship, Christian community',
  },
  '/discover/connect-ministries': {
    title: 'HMCC HK | Church Ministry',
    description:
      'We reach out to people from all walks of life, specifically youths, college students, working adults, and families.',
    keywords: 'Church ministry',
  },
  '/building-blocks': {
    title: 'HMCC HK | Children Ministry',
    description:
      "Building Blocks is part of HMCC HK’s Children's ministry, where we hold Sunday school lessons for kids.",
    keywords: 'childrens ministry, sunday school lessons for kids',
  },
  '/give': {
    title: 'HMCC HK | Tithes and Offerings',
    description:
      'Support HMCC HK’s mission to saturate the earth by giving through FPS, bank transfer, cheque, and credit card. Tax deductions are available.',
    keywords: 'tithe, tithes and offering, church giving',
  },
  '/online': {
    title: 'HMCC HK | Online Sunday Church Service & Worship',
    description:
      'Watch live and join us for Sunday celebration online, where you can worship and listen to God’s word. Our services are available both in person and online.',
    keywords: 'Sunday service, church services, online church, worship online',
  },
  '/saturate': {
    title: 'Saturate | Mission & Evangelism | HMCC Hong Kong',
    description:
      'Saturate mission and evangelism initiatives at HMCC Hong Kong. Join us in sharing the gospel and making disciples in Hong Kong and beyond.',
    keywords: 'saturate, mission, evangelism, gospel, outreach, HMCC Hong Kong',
  },
  '/login': {
    title: 'Login | HMCC Hong Kong',
    description:
      'Sign in to your HMCC Hong Kong account to access member resources and stay connected with our church community.',
    keywords: 'login, sign in, member access, HMCC Hong Kong',
  },
  '/signup': {
    title: 'Join HMCC | Sign Up | Hong Kong Church',
    description:
      'Create an account and become part of the HMCC Hong Kong community. Sign up today to get started and connect with our church family.',
    keywords: 'sign up, join church, register, HMCC Hong Kong, become member',
  },
  '/privacy-policy': {
    title: 'Privacy Policy | HMCC Hong Kong',
    description:
      'Privacy policy for Harvest Mission Community Church Hong Kong website and services. Learn how we protect and handle your personal information.',
    keywords: 'privacy policy, data protection, HMCC Hong Kong',
  },
};

// Get SEO data for a given pathname
export const getSEOData = (pathname) => {
  // Check for exact matches first
  if (seoData[pathname]) {
    return seoData[pathname];
  }

  // Handle dynamic routes
  if (pathname.startsWith('/sermons/')) {
    return {
      title: 'Sermon | HMCC Hong Kong',
      description:
        'Listen to this sermon from Harvest Mission Community Church Hong Kong. Biblical teaching and spiritual encouragement for your faith journey.',
      keywords: 'sermon, preaching, bible teaching, HMCC Hong Kong',
    };
  }

  // Default fallback
  return {
    title: 'HMCC Hong Kong | Harvest Mission Community Church',
    description:
      'Harvest Mission Community Church Hong Kong - Growing disciples who plant churches that multiply movements. Join our vibrant Christian community.',
    keywords: 'HMCC, Hong Kong, church, community, faith, christian',
  };
};
