const getFieldNameFromAlertType = (alertType) => {
  if (alertType === 'LIFE Group') return 'lifeGroup';
  if (alertType === 'Lifestage') return 'lifestage';
  if (alertType === 'Campus') return 'campus';
};

module.exports = {
  friendlyName: 'Get Form Alert Email Recipients',

  description:
    'Get Form Alert Email Recipients',

  inputs: {
    formId: {
      required: true,
      type: 'string',
    }
  },

  exits: {},

  fn: async function ({ formId }, exits) {
    // eslint-disable-next-line eqeqeq
    if (formId == null || formId === '') return exits.success([]);

    try {
      const formData = await Form.findOne({
        _id: formId
      });
      // eslint-disable-next-line eqeqeq
      console.log(formData);
      if (formData == null || formData.alertType === 'Custom' || formData.alertType === 'None') return exits.success([]);
      console.log('loop');

      const latestLeadershipData = await sails.helpers.leadershipteam.getLatestLeadershipTeams();
      // eslint-disable-next-line eqeqeq
      if (latestLeadershipData == null) return exits.success([]);

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
