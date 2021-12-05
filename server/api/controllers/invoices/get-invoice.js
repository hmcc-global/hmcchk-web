const Invoice = require("../../models/Invoice");
const User = require("../../models/User");

module.exports = {
  friendlyName: "Get invoices",

  description: "Get invoices",

  inputs: {
    invoiceId: {
      type: "string",
      required: false,
    },
  },

  exits: {
    success: {
      description: "Invoices returned successfully",
    },
    invalid: {
      description: "Failed to retrieve invoices",
    },
  },

  fn: async function ({ invoiceId }, exits) {
    try {
      if (invoiceId) {
        let data = await Invoice.find({
          _id: invoiceId,
          isDeleted: false,
        }).populateAll();

        if (data.length === 0) throw "user not found";
        return exits.success(data);
      }

      let data = await Invoice.find({ isDeleted: false }).populateAll();
      sails.log.info("Retrieving invoices");

      return exits.success(data);
    } catch (err) {
      sails.log(err);
      return exits.invalid(err);
    }
  },
};
