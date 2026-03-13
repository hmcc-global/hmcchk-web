export const IconStyles = {
  w: ['59px', '95px'],
  h: ['38px', '60px'],
  mt: ['-19px', '-30px'],
  mb: ['1em', '1.5em'],
};

export const TitleText = {
  fontFamily: "'Instrument Serif', serif",
  fontStyle: 'italic',
  fontSize: ['26px', '40px'],
  color: '#512f00',
  fontWeight: '600',
  lineHeight: '0.97',
  textTransform: 'uppercase',
  textAlign: 'center',
  WebkitTextStrokeWidth: '1px',
};

export const DateText = {
  fontFamily: "'Manrope', sans-serif",
  fontWeight: '700',
  fontSize: '18px',
  color: 'rgba(0,0,0,0.68)',
  letterSpacing: '0.9px',
  textTransform: 'uppercase',
};

const blueColor = '#2F1C69';
const pinkColor = '#842a48';

export const MobileDateText = {
  fontFamily: "'Manrope', sans-serif",
  fontWeight: '800',
  fontSize: '14px',
  letterSpacing: '0.72px',
  textTransform: 'uppercase',
  padding: '2px 10px',
  borderRadius: '12px',
  border: '1px solid',
};

export const MobileDateTextGoodFriday = {
  ...MobileDateText,
  color: blueColor,
  borderColor: blueColor,
};

export const MobileDateTextEaster = {
  ...MobileDateText,
  color: pinkColor,
  borderColor: pinkColor,
};

export const SubtitleText = {
  fontFamily: "'Instrument Serif', serif",
  fontStyle: 'italic',
  fontSize: ['24px', '32px'],
  fontWeight: '600',
  lineHeight: 'normal',
  mb: [1, 3],
};

// Subtitle with Good Friday color
export const SubtitleTextGoodFriday = {
  ...SubtitleText,
  color: blueColor,
};

// Subtitle with Easter color
export const SubtitleTextEaster = {
  ...SubtitleText,
  color: pinkColor,
};

export const LocationText = {
  fontFamily: "'Manrope', sans-serif",
  fontWeight: '800',
  fontSize: ['12px', '14px'],
  color: '#161616',
  letterSpacing: '0.84px',
  textTransform: 'uppercase',
  mb: [1, 2],
};

export const AddressText = {
  fontFamily: "'Manrope', sans-serif",
  fontWeight: '400',
  fontSize: ['12px', '14px'],
  color: '#090500',
  textTransform: 'uppercase',
  lineHeight: 'normal',
};

export const ActionButton = {
  fontFamily: "'Manrope', sans-serif",
  fontWeight: '700',
  fontSize: ['14px', '18px'],
  px: [8, 10],
  py: [3, 4],
  borderRadius: '80px',
  height: 'auto',
};
