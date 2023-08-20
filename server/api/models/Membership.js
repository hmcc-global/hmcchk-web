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
    recognitionDate: {
      type: "ref",
      columnType: "datetime",
      defaultsTo: null,
    },
    recommitmentDate: {
      type: "json",
      columnType: "array",
      defaultsTo: [],
    },
  },
};
