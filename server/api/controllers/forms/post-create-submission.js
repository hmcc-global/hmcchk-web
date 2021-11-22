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
      // Check if form actually exists
      const formRecord = await Form.find().where({
        id: formId,
        isDeleted: false,
        isPublished: true,
      });

      if (formRecord === null) return exits.invalid();

      // Create the submission in DB
      let res = await Submission.create({
        formId: formId,
        userId: userId,
        submissionData: submissionData,
      }).fetch();

      // Store the user object if any
      let user = {};

      // Only do if there is userID
      if (userId) {
        user = (await sails.helpers.users.getUser(userId))[0];
        if (user === null) return exits.invalid();

        // Create submission dict for binding to user
        const submissionObject = {
          formId: formId,
          submissionId: res.id,
          isAttended: false,
          isCompleted: false,
        };

        let temp = user.formSubmitted;

        // Append to existing submissions of the user
        if (temp) {
          temp.push(submissionObject);
        } else {
          temp = [submissionObject];
        }

        let updateUserSubmissions = await User.updateOne({
          _id: userId,
          isDeleted: false,
        }).set({ formSubmitted: temp });

        if (updateUserSubmissions === null) return exits.invalid();
      }

      // Send confirmation email if there is email

      if (user.email || submissionData["email"]) {
        await sails.helpers.sendTemplateEmail.with({
          to: user.email ? user.email : submissionData["email"],
          subject: "Successful Submission for " + formRecord[0].formName,
          template: formRecord[0].successEmailTemplate,
          templateData: {
            fullName: user.fullName
              ? user.fullName
              : submissionData["fullName"],
            formName: formRecord[0].formName,
          },
        });
      }

      // Successfully completed flow
      return exits.success();
    } catch (err) {
      sails.log(err);
      return exits.error(err);
    }
  },
};
