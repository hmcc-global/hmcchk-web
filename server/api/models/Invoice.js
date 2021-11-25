module.exports = {
  attributes: {
    userId: {
      model: "User",
      unique: true,
    },
    dueDate: {
      type: "ref",
      columnType: "datetime",
    },
    items: {
      type: "json",
      columnType: "array",
    },
    subTotal: {
      type: "number",
    },
    total: {
      type: "number",
    },
    notes: {
      type: "string",
    },
    type: {
      type: "string",
    },
    status: {
      type: "string",
    },
    totalAmountReceived: {
      type: "number",
    },
    paymentRecords: {
      type: "json",
      columnType: "array",
    },
  },
};
