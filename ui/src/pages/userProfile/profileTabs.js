// Single source of truth for the profile tabs. Desktop renders them as <Tab>
// children and mobile as <option> values, so both orderings come from this array.
export const PROFILE_TABS = [
  { slug: 'signup-links', label: 'Signup Links' },
  { slug: 'sermon-notes', label: 'Sermon Notes' },
  { slug: 'personal-profile', label: 'Personal Profile' },
  { slug: 'church-profile', label: 'Church Profile' },
];

export const DEFAULT_PROFILE_TAB = PROFILE_TABS[0].slug;

export const getProfileTabIndex = (slug) =>
  PROFILE_TABS.findIndex((tab) => tab.slug === slug);

export const getProfileTabSlug = (index) =>
  PROFILE_TABS[index]?.slug ?? DEFAULT_PROFILE_TAB;
