// Shared design tokens and links for the 10-Year Commitment page.
// Keeps the brand colours and external destinations in one place so the
// section, cards, and buttons stay consistent.
export const COLORS = {
  brandBlue: '#0025a3',
  accentBlue: '#9CB5FF',
  activeBlue: '#003CFF',
  lightBlue: '#ABD8FF',
  sectionBg: '#F6FAFF',
  bodyText: '#333',
  dotInactive: '#5B6177',
  cardGradient: 'linear-gradient(180deg, #506AC4, #010B2D)',
  buttonGradient: 'linear-gradient(90deg, #F3F6FF, #9CB5FF)',
  tabUnderline: '#7094ff',
  regionLabel: '#4169eb',
};

// --- Typography (Figma TYC) ---

const serifItalic = {
  fontFamily: 'DMSerifDisplay_Italic',
  fontWeight: 400,
};

// Manrope medium body — 14px mobile, 20px desktop.
export const TYC_BODY_TEXT = {
  fontFamily: 'Manrope',
  fontWeight: 500,
  letterSpacing: '0.0125rem',
  fontSize: { base: '0.85rem', md: '1.25rem' },
};

// Manrope bold CTA — Figma: 14px mobile, 18px desktop.
export const TYC_CTA_TEXT = {
  fontFamily: 'Manrope',
  fontWeight: 700,
  fontSize: { base: '0.875rem', md: '1.125rem' },
  lineHeight: '1',
};

export const TYC_CTA_ICON_SIZE = { base: '1.125rem', md: '1.5rem' };

export const TYC_SECTION_HEADING = {
  ...serifItalic,
};

export const TYC_PANEL_HEADING = {
  ...serifItalic,
  fontSize: { base: '1.5rem', md: '1.875rem' },
  textTransform: 'capitalize',
};

export const TYC_CARD_TITLE = {
  ...serifItalic,
  fontSize: { base: '1.56rem', md: '1.75rem' },
};

export const TYC_CARD_SUBTITLE = {
  fontFamily: 'Manrope',
  fontWeight: 800,
  fontSize: { base: '0.875rem', md: '1.25rem' },
  textTransform: 'uppercase',
  letterSpacing: '0.125rem',
};

export const TYC_TAB_LABEL = {
  fontFamily: 'DMSans_Regular',
  fontWeight: 700,
  fontSize: { base: '0.875rem', md: '1.5rem' },
  textTransform: 'uppercase',
};

export const TYC_HERO_EYEBROW = {
  fontFamily: 'DMSans_Regular',
  fontWeight: 700,
  fontSize: { base: '1.0625rem', md: '2.5rem' },
  textTransform: 'uppercase',
  letterSpacing: { base: '0.03em', md: '0.08em' },
};

export const TYC_HERO_TITLE = {
  ...serifItalic,
  fontSize: { base: '2.375rem', md: '5.625rem' },
};

export const TYC_RAISE_AMOUNT = {
  fontFamily: 'Manrope',
  fontWeight: 800,
  fontSize: { base: '1.25rem', md: '2.2rem' },
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
// The PNGs are exported from the Figma circle frames with the drop shadow
// cropped off (the old JPG exports baked the shadow into the image, which
// showed as a brown/gray crescent inside the circle).
export const RELEASE_CITIES = [
  {
    name: 'Houston',
    img: 'houston.png',
    x: 21.6,
    y: 294.3,
    w: 89.841,
    h: 85.028,
  },
  { name: 'London', img: 'london.png', x: 229.5, y: 180, w: 90.643, h: 85.028 },
  {
    name: 'Shanghai',
    img: 'shanghai.png',
    x: 455.91,
    y: 56.01,
    w: 83.7,
    h: 83.7,
  },
  {
    name: 'Shenzhen',
    img: 'shenzhen.png',
    x: 554.91,
    y: 3.6,
    w: 89.039,
    h: 85.028,
  },
  { name: 'Seoul', img: 'seoul.png', x: 661.02, y: 24.3, w: 88.237, h: 85.028 },
  {
    name: 'Tokyo',
    img: 'tokyo.png',
    x: 707.58,
    y: 112.5,
    w: 89.039,
    h: 85.028,
  },
  {
    name: 'Taipei',
    img: 'taipei.png',
    x: 685.41,
    y: 198,
    w: 89.039,
    h: 85.028,
  },
  {
    name: 'Kuala Lumpur',
    img: 'kualalumpur.png',
    x: 674.61,
    y: 306.9,
    w: 89.841,
    h: 85.028,
  },
  {
    name: 'Jakarta',
    img: 'jakarta.png',
    x: 493.2,
    y: 408.6,
    w: 89.841,
    h: 85.028,
  },
  {
    name: 'Singapore',
    img: 'singapore.png',
    x: 395.1,
    y: 377.1,
    w: 89.841,
    h: 85.028,
  },
];

// Floating region labels near each city cluster.
export const RELEASE_REGION_LABELS = [
  { name: 'Americas', x: 38.55, y: 228.27 },
  { name: 'Europe', x: 289.8, y: 125.1 },
  { name: 'East Asia', x: 547.2, y: 141.3 },
  { name: 'Southeast Asia', x: 491.01, y: 375.3 },
];

// Pill-shaped city tags floating near their region. Hovering a tag highlights
// the matching photo circle (see ReleasePanel). Same Figma pixel space.
export const RELEASE_TAGS = [
  { name: 'Houston', x: 56.43, y: 259.97 },
  { name: 'London', x: 298.74, y: 155.99 },
  { name: 'Shanghai', x: 504.9, y: 181.8 },
  { name: 'Shenzhen', x: 586.71, y: 181.8 },
  { name: 'Seoul', x: 498.6, y: 207 },
  { name: 'Tokyo', x: 558.46, y: 207 },
  { name: 'Taipei', x: 618.67, y: 207 },
  { name: 'Kuala Lumpur', x: 563.91, y: 320.4 },
  { name: 'Singapore', x: 457.98, y: 311.18 },
  { name: 'Jakarta', x: 484.8, y: 338.01 },
];

// Small scatter dots between the tags/circles (decorative, from Figma).
export const RELEASE_DOT_SIZE = 4.585;
export const RELEASE_DOTS = [
  { x: 136.47, y: 265.55 },
  { x: 142.11, y: 268.73 },
  { x: 335.72, y: 205.25 },
  { x: 569.54, y: 281.42 },
  { x: 617.14, y: 254.27 },
  { x: 596.69, y: 251.8 },
  { x: 583.29, y: 282.83 },
  { x: 563.89, y: 281.07 },
  { x: 553.67, y: 343.49 },
  { x: 548.38, y: 326.56 },
  { x: 543.79, y: 321.27 },
  { x: 582.94, y: 264.14 },
];

// Blues used on the release map pills/dots (Figma Tag_city component).
export const RELEASE_TAG_BLUE = '#244DD2';
export const RELEASE_TAG_BG = '#E8EEFF';

// --- Mobile release layout (Figma section-release_v2, node 378:1653) ---
// On mobile the map shows only location dots and region labels; the city
// photos move into a 5-column grid below the map. Coordinates are percentages
// of the mobile map box, converted from the Figma frame (map 244 x 161).
export const RELEASE_MOBILE_LABELS = [
  { name: 'Americas', x: -11.1, y: 62.7 },
  { name: 'Europe', x: 21.3, y: 26.1 },
  { name: 'East Asia', x: 70.1, y: 35.4 },
  { name: 'Southeast Asia', x: 58.6, y: 77 },
];
export const RELEASE_MOBILE_DOTS = [
  { x: 19.26, y: 54.66 },
  { x: 20.08, y: 55.28 },
  { x: 46.72, y: 42.24 },
  { x: 75.82, y: 67.7 },
  { x: 76.64, y: 64.6 },
  { x: 77.05, y: 70.81 },
  { x: 77.46, y: 56.52 },
  { x: 78.69, y: 58.39 },
  { x: 80.33, y: 57.76 },
  { x: 80.74, y: 54.66 },
  { x: 82.79, y: 52.17 },
  { x: 85.25, y: 52.17 },
];
// Grid order matches the Figma mobile design, row by row.
export const RELEASE_MOBILE_ORDER = [
  'London',
  'Shanghai',
  'Shenzhen',
  'Seoul',
  'Taipei',
  'Houston',
  'Singapore',
  'Jakarta',
  'Kuala Lumpur',
  'Tokyo',
];

// The Raise commitment is a live fundraising campaign stored in the Fundraise
// table (server/api/models/Fundraise.js). RaisePanel reads the raised amount
// and goal at runtime via useRaiseProgress, which queries
// GET /api/fundraise/get?campaignName=<RAISE_CAMPAIGN_NAME> and picks the row
// whose categoryKey is RAISE_CATEGORY_KEY. In that row: `amount` is the live
// raised total and milestones[0].milestoneAmount is the goal.
export const RAISE_CAMPAIGN_NAME = '10Y Commitment';
export const RAISE_CATEGORY_KEY = 'raise';

// Used until the live goal loads (or if the Fundraise row has no milestone),
// so the heading never flashes "Raise $0 USD" and the fill math never
// divides by zero.
export const RAISE_FALLBACK_GOAL = 500000;

// When nothing has been raised yet, fill the vessel to this fraction so it
// doesn't render empty (and the panel shows the goal amount instead of $0).
export const RAISE_EMPTY_FILL_RATIO = 1 / 4;

// Raise panel: the vessel silhouette's box as percentages of the original
// 796 x 433 Figma artboard. The water-fill layer shares this exact box (and
// masks itself to the same SVG) so the water sits inside the silhouette at any
// size. (left/top/w/h passed straight to Chakra style props.)
// The amount label's vertical center, as a percentage of the full
// AspectRatio box (not the vessel sub-box), per Figma node 55:1976 - a fixed
// point in the artwork that does not move with the raised/goal ratio.
export const RAISE_LAYOUT = {
  vessel: { left: '8%', top: '6.6%', w: '84%', h: '88.3%' },
  amountAnchorTop: '82%',
};
