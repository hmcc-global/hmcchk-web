const getFieldNameFromAlertType = (alertType) => {
  if (alertType === 'LIFE Group') return 'lifeGroup';
  if (alertType === 'Lifestage') return 'lifestage';
  if (alertType === 'Campus') return 'campus';
  throw new Error(`${alertType} unrecognised`);
};

module.exports = {
  friendlyName: 'Get Form Alert Email Recipients',

  description: 'Get Form Alert Email Recipients',

  inputs: {
    formId: {
      required: true,
      type: 'string',
    },
  },

  exits: {},

  fn: async function ({ formId }, exits) {
    // eslint-disable-next-line eqeqeq
    if (formId == null || formId === '') return exits.success({});

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
        return exits.success({});

      const latestLeadershipData =
        await sails.helpers.leadershipteam.getLatestLeadershipTeams();
      // eslint-disable-next-line eqeqeq
      if (latestLeadershipData == null) return exits.success({});

      const propertyName = getFieldNameFromAlertType(formData.alertType);
      const res = _.chain(latestLeadershipData)
        // eslint-disable-next-line eqeqeq
        .filter((x) => x[propertyName] != null && x[propertyName] !== '')
        .groupBy((x) => x[propertyName])
        .value();
      return exits.success(res);
    } catch (err) {
      sails.log(err);
      return exits.error(err);
    }
  },
};