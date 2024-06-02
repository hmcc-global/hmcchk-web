/* eslint-disable linebreak-style */
module.exports = {
  friendlyName: 'Create Submission',

  description: 'Create a new submission entry from form data',

  inputs: {
    formId: {
      type: 'string',
      required: true,
    },
    userId: {
      type: 'string',
    },
    submissionData: {
      type: 'json',
      required: true,
      description: 'key value pair of saved form data',
    },
  },

  exits: {
    success: {
      description: 'Submission is saved successfuly.',
    },
    error: {
      description: 'There was an issue with creating the submission',
    },
    invalid: {
      description: 'There is an issue with your request',
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

      if (formRecord === null) {
        return exits.invalid();
      }

      // Create the submission in DB
      let res = await Submission.create({
        formId: formId,
        userId: userId,
        submissionData: submissionData,
      }).fetch();

      if (formRecord[0].isPaymentRequired) {
        let existing = await PaymentData.create({
          formId: formId,
          userId: userId,
          submissionId: res.id,
        }).fetch();

        if (existing) {
          const modelName = `paymentData-${formId}`;
          existing = await LastUpdated.updateOne({ modelName })
            .set({
              lastUpdatedBy: 't3chTeam',
            })
            .fetch();

          if (!existing) {
            existing = await LastUpdated.create({
              modelName,
              lastUpdatedBy: 't3chTeam',
            }).fetch();
          }

          if (!existing) {
            console.log('here');
            return exits.invalid('LastUpdated failed to update');
          }
        }
      }

      // Store the user object if any
      let user = {};

      // Only do if there is userID
      if (userId) {
        user = (await sails.helpers.users.getUser(userId))[0];
        if (user === null) {
          return exits.invalid();
        }

        // Check for any blank user fields
        const resettablePrefillFields = [
          'fullName',
          'phoneNumber',
          'email',
          'address',
          'countryOfOrigin',
          'birthday',
          'campus',
          'lifestage',
          'lifeGroup',
          'ministryTeam',
        ];

        let userInfoToUpdate = {};
        for (let i in resettablePrefillFields) {
          const field = resettablePrefillFields[i];
          if (user[field] === null || user[field] === '') {
            userInfoToUpdate[field] = submissionData[field];
          }
        }

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
        }).set({ formSubmitted: temp, ...userInfoToUpdate });

        if (updateUserSubmissions === null) return exits.invalid();
      }

      // Send confirmation email to user if there is email
      if (user.email || submissionData['email']) {
        await sails.helpers.sendTemplateEmail.with({
          to: user.email ? user.email : submissionData['email'],
          subject: formRecord[0].customEmailSubject
            ? formRecord[0].customEmailSubject
            : 'Successful Submission for ' + formRecord[0].formName,
          template: formRecord[0].successEmailTemplate,
          templateData: {
            fullName: user.fullName
              ? user.fullName
              : submissionData['fullName'],
            formName: formRecord[0].formName,
          },
        });
      }

      // Send alert email to leaders if setting is turned on
      if (formRecord[0].alertType !== 'None') {
        const emailRecipients =
          formRecord[0].alertType === 'Custom'
            ? formRecord[0].customAlertRecipients.split(';')
            : await sails.helpers.forms.getFormAlertRecipients(
                formId,
                submissionData
            );

        await sails.helpers.sendTemplateEmail.with({
          to: 'no-reply@hongkong.hmcc.net',
          cc: emailRecipients,
          subject: 'New Sign-up for ' + formRecord[0].formName,
          template: 'form-notify-leader-success',
          templateData: {
            submissionTime: res.createdAt,
            fullName:
              user.fullName || submissionData['fullName'] || 'Not Applicable',
            email: user.email || submissionData['email'] || 'Not Applicable',
            phoneNumber:
              user.phoneNumber ||
              submissionData['phoneNumber'] ||
              'Not Applicable',
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
