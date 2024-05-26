const groupLeadershipTeamsByKey = (leadershipTeams, key) => {
  const res = _.chain(leadershipTeams)
    // eslint-disable-next-line eqeqeq
    .filter((x) => x[key] != null && x[key] !== '' && x[key] !== 'Not Applicable')
    .groupBy((x) => x[key])
    .value();
  return res;
};

module.exports = {
  friendlyName: 'Get Form Alert Email Recipients',

  description: 'Get Form Alert Email Recipients',

  inputs: {
    formId: {
      required: true,
      type: 'string',
    },
    submissionData: {
      required: true,
      type: 'json',
    }
  },

  exits: {},

  fn: async function ({ formId, submissionData }, exits) {
    // eslint-disable-next-line eqeqeq
    if (formId == null || formId === '' || submissionData == null) return exits.success({});

    try {
      const formData = await Form.findOne({
        _id: formId,
      });

      if (
        // eslint-disable-next-line eqeqeq
        formData == null ||
        formData.alertType === 'Custom' ||
        formData.alertType === 'None'
      )
        return exits.success([]);

      const latestLeadershipData =
        await sails.helpers.leadershipteam.getLatestLeadershipTeams();
      // eslint-disable-next-line eqeqeq
      if (latestLeadershipData == null) return exits.success([]);

      const allFormAlertyTypes = await sails.helpers.forms.getAllFormAlertTypes();
      const groupByKeys = allFormAlertyTypes[formData.alertType];
      // eslint-disable-next-line eqeqeq
      if (groupByKeys == null) throw new Error(`Invalid alert type: ${formData.alertType}`);
      if (groupByKeys.length === 0) return exits.success([]);

      for (const key of groupByKeys) {
        const userData = submissionData[key];
        const groupedLeadershipTeam = groupLeadershipTeamsByKey(latestLeadershipData, key);
        // eslint-disable-next-line eqeqeq
        if (groupedLeadershipTeam[userData] != null) {
          const emails = groupedLeadershipTeam[userData].flatMap(x => x.leaderEmails);
          return exits.success([...new Set(emails)]);
        }
      }

      return exits.success([]);
    } catch (err) {
      sails.log(err);
      return exits.error(err);
    }
  },
};
