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
      defaultsTo: [],
    },
    classAttendance: {
      type: "boolean",
      defaultsTo: false,
    },
    recognitionDate: {
      type: "ref",
      columnType: "datetime",
      defaultsTo: null,
    },
    recommitmentDate: {
      type: "ref",
      columnType: "datetime",
      defaultsTo: null,
    },
  },
};
