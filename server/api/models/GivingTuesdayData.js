module.exports = {
  attributes: {
    categories: {
      type: "json",
      columnType: "array",
      required: true,
    },
    year: {
      type: "string",
      required: true,
    }
  },
};
