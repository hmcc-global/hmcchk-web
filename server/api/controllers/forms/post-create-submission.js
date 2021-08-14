module.exports = {
  friendlyName: "Create Submission",

  description: "Create a new submission entry from form data",

  inputs: {
    formId: {
      type: "string",
      required: true,
    },
    userId: {
      type: "string",
    },
    submissionData: {
      type: "json",
      required: true,
      description: "key value pair of saved form data",
    },
  },

  exits: {
    success: {
      description: "Submission is saved successfuly.",
    },
    error: {
      description: "There was an issue with creating the submission",
    },
    invalid: {
      description: "There is an issue with your request",
    },
  },

  fn: async function ({ formId, userId, submissionData }, exits) {
    try {
      // Only do if there is userID
      if (userId) {
        // Update existing submission if it's there
        let res = await Submission.updateOne({
          formId: formId,
          userId: userId,
        }).set({ submissionData: submissionData });

        // If not, create new submission
        if (!res) {
          res = await Submission.create({
            formId: formId,
            userId: userId,
            submissionData: submissionData,
          }).fetch();
        }

        // Create object and bind it to user
        const submissionObject = {
          formId: formId,
          submissionId: res.id,
          isAttended: false,
          isCompleted: false,
        };

        const user = (await sails.helpers.users.getUser(userId))[0];
        let temp = user.formSubmitted;

        // Check if this is an update operation
        if (temp) {
          for (let i in temp) {
            let item = temp[i];
            if (
              item.formId === submissionObject.formId &&
              item.submissionId === submissionObject.submissionId
            ) {
              return exits.success();
            }
          }
        }

        // Create the submission instead
        if (temp) {
          temp.push(submissionObject);
        } else {
          temp = [submissionObject];
        }

        let updateUserSubmissions = await User.updateOne({
          _id: userId,
          isDeleted: false,
        }).set({ formSubmitted: temp });

        if (updateUserSubmissions != null) {
          return exits.success();
        }

        return exits.invalid();
      } else {
        return exits.error("missing user id");
      }
    } catch (err) {
      sails.log(err);
      return exits.error(err);
    }
  },
};
