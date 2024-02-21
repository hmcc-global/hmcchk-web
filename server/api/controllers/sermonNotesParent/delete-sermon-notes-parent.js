// const SermonNotesParent = require("../../models/SermonNotesParent");

// module.exports = {
//     friendlyName: "Delete Sermon Notes Parent",

//     description: "Delete Sermon Notes Parent",

//     inputs: {
//         sermonId: {
//             required: true,
//             type: "string",
//         },
//     },

//     exits: {
//         success: {
//             description: "Sermon Notes Parent record deleted successfully",
//         },
//         invalid: {
//             description: "Failed to delete Sermon Notes Parents record",
//         },

//         missingRequiredFields: {
//             statusCode: 409,
//             description: "Please fill in the required fields.",
//         },
//     },

//     fn: async function ({ sermonId }, exits) {
//         if (sermonId) {
//             try {
//                 let data = await SermonNotesParent.updateOne({
//                     _id: sermon_id,
//                     isDeleted: false,
//                 }).set({
//                     isDeleted: true,
//                 });
//                 if (data != null) {
//                     return exits.success(data);
//                 }
//                 return exits.invalid();
//             } catch (err) {
//                 sails.log.error(err);
//                 return exits.error(err);
//             }
//         }
//         sails.log.error("missingRequiredFields");
//         return exits.invalid();
//     },
// };
