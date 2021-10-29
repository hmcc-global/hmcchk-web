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
      const formRecord = await Form.find().where({
        id: formId,
        isDeleted: false,
        isPublished: true,
      });

      if (formRecord === null) return exits.invalid();

      // Only do if there is userID
      if (userId) {
        const user = (await sails.helpers.users.getUser(userId))[0];
        if (user === null) return exits.invalid();

        let res = await Submission.create({
          formId: formId,
          userId: userId,
          submissionData: submissionData,
        }).fetch();

        // Create object and bind it to user
        const submissionObject = {
          formId: formId,
          submissionId: res.id,
          isAttended: false,
          isCompleted: false,
        };

        let temp = user.formSubmitted;

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

        if (updateUserSubmissions === null) return exits.invalid();

        // Send confirmation email
        await sails.helpers.sendTemplateEmail.with({
          to: user.email,
          subject: "Successful Submission for " + formRecord[0].formName,
          template: "email-successful-form-submission",
          templateData: {
            fullName: user.fullName,
            formName: formRecord[0].formName,
          },
        });

        return exits.success();
      } else {
        return exits.error("missing user id");
      }
    } catch (err) {
      sails.log(err);
      return exits.error(err);
    }
  },
};
