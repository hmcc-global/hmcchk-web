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
      type: "json",
      defaultsTo: { part1: false, part2: false },
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
