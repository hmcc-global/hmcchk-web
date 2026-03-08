// Easter Invitation Section Styles

export const TitleText = {
  fontFamily: "'DM Serif Display', serif",
  fontStyle: "italic",
  fontSize: ["32px", "36px", "40px"],
  color: "#512f00",
  fontWeight: "400",
  lineHeight: "0.97",
  textTransform: "uppercase"
};

export const DateText = {
  fontFamily: "'Manrope', sans-serif",
  fontWeight: "700",
  fontSize: "18px",
  color: "rgba(0,0,0,0.68)",
  letterSpacing: "0.9px",
  textTransform: "uppercase"
};

export const SubtitleText = {
  fontFamily: "'Instrument Serif', serif",
  fontStyle: "italic",
  fontSize: "32px",
  fontWeight: "400",
  lineHeight: "normal",
  mb: 3
};

// Subtitle with Good Friday color
export const SubtitleTextGoodFriday = {
  ...SubtitleText,
  color: "#2f1c69"
};

// Subtitle with Easter color
export const SubtitleTextEaster = {
  ...SubtitleText,
  color: "#842a48"
};

export const LocationText = {
  fontFamily: "'Manrope', sans-serif",
  fontWeight: "800",
  fontSize: "14px",
  color: "#161616",
  letterSpacing: "0.84px",
  textTransform: "uppercase",
  mb: 2
};

export const AddressText = {
  fontFamily: "'Manrope', sans-serif",
  fontWeight: "400",
  fontSize: "14px",
  color: "#090500",
  textTransform: "uppercase",
  lineHeight: "normal"
};