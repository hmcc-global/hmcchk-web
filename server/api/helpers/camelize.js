module.exports = {
  friendlyName: 'Camelize',

  description: 'Convert string to camelCase format',

  inputs: {
    str: {
      type: 'string',
      required: true,
    },
  },

  exits: {
    success: {
      description: 'Camelized words',
    },
  },

  fn: async function ({ str }) {
    if (!str) {
      return;
    }

    const words = str.split(' ');

    const camelizedWords = words.map((word, index) => {
      if (index === 0) {
        return word.toLowerCase();
      } else {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      }
    });

    return camelizedWords.join('');
  },
};
