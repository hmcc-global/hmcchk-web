module.exports = {
  attributes: {
    userId: {
      model: "User",
      unique: true,
    },
    officialName: {
      type: "String",
    },
    classAttendance: {
      type: "json",
      defaultsTo: [],
    },
    baptismDate: {
      type: "ref",
      columnType: "datetime",
      defaultsTo: null,
    },
    baptismPlace: {
      type: "string",
      defaultsTo: "",
    },
  },
};
