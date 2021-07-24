module.exports = {
  attributes: {
    userId: {
      model: "User",
      unique: true,
    },
    tithely: {
      type: "json",
      columnType: "array",
      defaultsTo: [],
    },
  },
};
