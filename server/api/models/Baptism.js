module.exports = {
  attributes: {
    userId: {
      model: "User",
      unique: true,
    },
    officialName: {
      type: "String",
    },
    classDate: {
      type: "json",
      columnType: "array",
    },
    classAttendance: {
      type: "json",
    },
    baptismDate: {
      type: "ref",
      columnType: "datetime",
    },
    baptismPlace: {
      type: "string",
    },
  },
};
