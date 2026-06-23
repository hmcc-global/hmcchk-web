// Shared design tokens and links for the 10-Year Commitment page.
// Keeps the brand colours and external destinations in one place so the
// section, cards, and buttons stay consistent.
export const COLORS = {
  brandBlue: '#0025a3',
  accentBlue: '#9CB5FF',
  lightBlue: '#ABD8FF',
  sectionBg: '#F6FAFF',
  bodyText: '#333',
  dotInactive: '#5B6177',
  cardGradient: 'linear-gradient(180deg, #506AC4, #010B2D)',
  buttonGradient: 'linear-gradient(90deg, #F3F6FF, #9CB5FF)',
  tabUnderline: '#7094ff',
  regionLabel: '#4169eb',
};

export const GO_LINKS = {
  austin: 'https://atx.hmccglobal.org/',
  hongKong: 'https://hk.hmccglobal.org/',
};

// Base paths for the 10-Year Commitment section images.
export const TYC_IMG = `${process.env.PUBLIC_URL}/images/10y-commitment`;
export const RELEASE_IMG = `${TYC_IMG}/release`;

// Convert a Figma px coordinate into a percentage of its view box, so absolute
// layers scale with the panel instead of using hardcoded pixels.
export const px = (value, total) => `${(value / total) * 100}%`;

// Release "map" is a fixed-position design from Figma. All coordinates below are
// in the original Figma pixel space; the panel scales them to its rendered size.
// RELEASE_VIEW is the bounding box of the map plus all the city circles.
export const RELEASE_VIEW = { w: 796.6, h: 493.6 };

// The world map image sits at the top-left of the view.
export const RELEASE_MAP = { x: 0, y: 0, w: 725.4, h: 478.208 };

// Each city photo circle, positioned (top-left x/y) at its geographic location.
export const RELEASE_CITIES = [
  { name: 'Houston', img: 'houston.jpg', x: 21.6, y: 294.3, w: 89.841, h: 85.028 },
  { name: 'London', img: 'london.jpg', x: 229.5, y: 180, w: 90.643, h: 85.028 },
  { name: 'Shanghai', img: 'shanghai.jpg', x: 455.91, y: 56.01, w: 83.7, h: 83.7 },
  { name: 'Shenzhen', img: 'shenzhen.jpg', x: 554.91, y: 3.6, w: 89.039, h: 85.028 },
  { name: 'Seoul', img: 'seoul.jpg', x: 661.02, y: 24.3, w: 88.237, h: 85.028 },
  { name: 'Tokyo', img: 'tokyo.jpg', x: 707.58, y: 112.5, w: 89.039, h: 85.028 },
  { name: 'Taipei', img: 'taipei.jpg', x: 685.41, y: 198, w: 89.039, h: 85.028 },
  { name: 'Kuala Lumpur', img: 'kualalumpur.jpg', x: 674.61, y: 306.9, w: 89.841, h: 85.028 },
  { name: 'Jakarta', img: 'jakarta.jpg', x: 493.2, y: 408.6, w: 89.841, h: 85.028 },
  { name: 'Singapore', img: 'singapore.jpg', x: 395.1, y: 377.1, w: 89.841, h: 85.028 },
];

// Floating region labels near each city cluster.
export const RELEASE_REGION_LABELS = [
  { name: 'Americas', x: 38.55, y: 228.27 },
  { name: 'Europe', x: 289.8, y: 125.1 },
  { name: 'East Asia', x: 547.2, y: 141.3 },
  { name: 'Southeast Asia', x: 491.01, y: 375.3 },
];

// Fundraising progress for the Raise commitment (animation TODO).
export const RAISE_RAISED_USD = 0;
export const RAISE_GOAL_USD = 500000;

// Fundraising goal for the Raise commitment.
export const RAISE_GOAL = '$500,000 USD';

// Raise panel layers, positioned as percentages of the original 796 x 433
// Figma artboard so the blue fill and goal label line up with the church
// silhouette at any size. (left/top/w/h passed straight to Chakra style props.)
export const RAISE_LAYOUT = {
  vessel: { left: '8%', top: '6.6%', w: '84%', h: '88.3%' },
  fill: { left: '7.9%', top: '68.4%', w: '84.2%', h: '26.5%' },
  goalTop: '62%',
};
