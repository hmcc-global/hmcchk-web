module.exports = {
  attributes: {
    localChurch: {
      type: "json",
      required: true,
    },
    globalChurch: {
      type: "json",
      required: true,
    },
    year: {
      type: "string",
      required: true,
    }
  },
};
