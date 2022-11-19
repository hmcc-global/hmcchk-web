module.exports = {
  friendlyName: 'Send payment confirmation email',

  description: 'Send payment confirmation email',

  inputs: {
    // receive a list of paymentIds
    // find the paymentData objects using the paymentIds
    // for each one of them, check if they have paid
    // if they have paid, get their emailAddress from their submissions
    // we can always assume there is an email address since it's a paid event
    // maybe in the future, we can have a fallback, if any of them don't have an email in the submissionData, we can query our User db and get their emails
    // send the email and BCC the list of email addresses
    // if email sent successfully, return the array of successful emails sent to
    // also update the emailSent in the paymentData
    // if fail, return empty array
    submissionIds: {
      type: 'json',
      required: true,
    },
  },

  exits: {
    success: {
      description: 'Email is sent successfully.',
    },
    error: {
      description: 'There was an issue with sending the email',
    },
    invalid: {
      description: 'There is an issue with your request',
    },
  },

  fn: async function ({ submissionIds }, exits) {
    try {
      console.log(submissionIds);
      if (submissionIds.length === 0) return exits.error('No payment Ids');
      let submissions = await Submission.find({
        _id: [...submissionIds]
      }).populate('paymentData', {
        where: {
          isPaid: true,
          paymentData: { '!=': '' }
        }
      });

      // sanity check
      if (!submissions) return exits.error('No paymentData found for the given submissionIds');
      if (submissions.some(s => s.formId !== submissions[0].formId)) return exits.error('Some submissions are not pointing to the same form');

      submissions = submissions.filter(i => i.paymentData && i.paymentData.length > 0);
      const formObj = await Form.findOne({ _id: submissions[0].formId });
      if (!formObj) return exits.error('Form doesn not exist');

      const filteredSubmissions = submissions.reduce((filtered, curr) => {
        if (curr.submissionData && curr.submissionData['email'] && curr.submissionData['email'] !== '') {
          filtered.push(curr);
        }
        return filtered;
      }, []);

      const emails = filteredSubmissions.map(i => i.submissionData['email']);
      if (!emails || emails.length === 0) return exits.error('No emails found in the submissions');

      await sails.helpers.sendTemplateEmail.with({
        to: process.env.EMAIL_FROM,
        subject: formObj.paymentEmailSubject,
        template: formObj.paymentConfirmationEmailTemplate,
        cc: formObj.paymentCcEmail,
        bcc: emails
      });

      const filterSubmissionIds = filteredSubmissions.map(i => i.id);
      const res = await PaymentData.update({
        submissionId: [...filterSubmissionIds]
      }).set({
        isConfirmationEmailSent: true,
      }).fetch();

      if (res) {
        const modelName = `paymentData-${res[0].formId}`;
        existing = await LastUpdated.updateOne({ modelName }).set({
          lastUpdatedBy: this.req.user.fullName
        }).fetch();

        if (!existing) {
          existing = await LastUpdated.create({
            modelName,
            lastUpdatedBy: this.req.user.fullName
          }).fetch();
        }

        if (!existing)
          return exits.invalid();
      } else {
        return exits.invalid('Something went wrong when updating PaymentData email sent');
      }

      // Successfully completed flow
      return exits.success(emails);
    } catch (err) {
      sails.log(err);
      return exits.error(err);
    }
  },
};
