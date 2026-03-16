// Consolidated SEO configuration for meta tags
export const seoData = {
  '/': {
    title: 'Home | Harvest Mission Community Church Hong Kong',
    description: 'Welcome to Harvest Mission Community Church Hong Kong',
    keywords:
      'HMCC Hong Kong, church, worship, community, home, christian church hong kong, Kwun Tong church',
  },
  '/sermons': {
    title: 'Sermons | HMCC Hong Kong',
    description:
      'Weekly sermons and biblical teachings from Harvest Mission Community Church Hong Kong pastors and guest speakers. Grow in faith through expository preaching.',
    keywords:
      'sermons, preaching, bible, teachings, HMCC Hong Kong, christian sermons',
  },
  '/events': {
    title: 'Events | HMCC Hong Kong',
    description:
      'Discover upcoming events, worship services, and community activities at Harvest Mission Community Church Hong Kong. Join us for fellowship and spiritual growth.',
    keywords:
      'church events, gatherings, activities, HMCC Hong Kong, christian events',
  },
  '/about-us': {
    title: 'About Us | HMCC Hong Kong',
    description:
      "Learn about HMCC Hong Kong's history, mission, vision, and leadership team. Discover what makes our church community unique and how we're growing disciples.",
    keywords:
      'about HMCC, church history, mission, vision, leadership, Hong Kong church',
  },
  '/discover': {
    title: 'Discover HMCC | Hong Kong Church',
    description:
      'New to HMCC? Discover our church community, values, and how you can get involved. Learn about our ministries, life groups, and worship services in Hong Kong.',
    keywords:
      'new to church, discover, about HMCC, Hong Kong church, new visitors',
  },
  '/discover/visit-us-page': {
    title: 'Visit Us | Plan Your First Visit | HMCC Hong Kong',
    description:
      'Plan your visit to Harvest Mission Community Church Hong Kong. Find service times, location details, and what to expect during your first visit.',
    keywords:
      'visit church, first time, service times, location, HMCC Hong Kong',
  },
  '/discover/life-group': {
    title: 'Life Groups | Small Group Community | HMCC Hong Kong',
    description:
      'Join a Life Group at HMCC Hong Kong for deeper fellowship, Bible study, and community. Discover how small groups help us grow together in faith.',
    keywords:
      'life groups, small groups, bible study, fellowship, community, HMCC Hong Kong',
  },
  '/discover/connect-ministries': {
    title: 'Connect with Ministries | Serve at HMCC Hong Kong',
    description:
      "Discover ministry opportunities at HMCC Hong Kong. Find ways to serve, connect, and use your gifts to build God's kingdom in our community.",
    keywords:
      'ministries, serve, volunteer, connect, church ministry, HMCC Hong Kong',
  },
  '/building-blocks': {
    title: 'Building Blocks | Discipleship Program | HMCC Hong Kong',
    description:
      'Building Blocks discipleship program at HMCC Hong Kong. Learn the fundamentals of Christian faith and grow as a disciple of Jesus Christ.',
    keywords:
      'building blocks, discipleship, christian education, faith formation, HMCC Hong Kong',
  },
  '/give': {
    title: 'Give | Support HMCC Hong Kong Ministry',
    description:
      'Support the mission and ministry of Harvest Mission Community Church Hong Kong through tithes, offerings, and donations. Join us in growing disciples who plant churches.',
    keywords: 'giving, donation, support, tithe, HMCC Hong Kong, church giving',
  },
  '/online': {
    title: 'Online Service | Watch Live | HMCC Hong Kong',
    description:
      'Join our live online worship service from Harvest Mission Community Church Hong Kong. Watch live sermons and participate in online community.',
    keywords:
      'online service, live stream, watch online, HMCC Hong Kong, online church',
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

  if (pathname.startsWith('/witness')) {
    return {
      title: 'Testimonies | Witness Stories | HMCC Hong Kong',
      description:
        'Personal testimonies and faith stories from Harvest Mission Community Church Hong Kong community members. Be encouraged by how God is working.',
      keywords: 'testimonies, witness stories, faith stories, HMCC Hong Kong',
    };
  }

  if (pathname.startsWith('/admin')) {
    return {
      title: 'Admin | HMCC Hong Kong',
      description:
        'Church administration portal for Harvest Mission Community Church Hong Kong staff and leadership.',
      keywords: 'admin, church administration, HMCC Hong Kong',
    };
  }

  if (pathname.startsWith('/forms/')) {
    return {
      title: 'Church Form | HMCC Hong Kong',
      description:
        'Church registration and information form for HMCC Hong Kong community members and visitors.',
      keywords: 'church form, registration, HMCC Hong Kong',
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
