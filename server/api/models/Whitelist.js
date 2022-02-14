module.exports = {
  attributes: {
    eventName: {
      type: 'string',
      required: true,
      description:
        'The name of the event for which this whitelist is for, \
         use snake case, for example retreat-2022',
    },
    data: {
      type: 'json',
      required: true,
    },
  },
};
