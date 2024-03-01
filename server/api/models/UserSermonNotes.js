module.exports = {
  attributes: {
    sermonId: {
      type: 'String',
      unique: true,
      required: true,
    },
    userId: {
      model: 'User',
      required: true,
    },
    editedContent: {
      type: 'String',
      allowNull: true,
    },
    themes: {
      type: 'String',
      isIn: ['Forgiven', 'Redemption'],
      defaultsTo: 'None',
    },
    stickyNote: {
      type: 'json',
      columnType: 'array',
      defaultsTo: [],
    },
    isDeleted: {
      type: 'boolean',
      defaultsTo: false,
    },
  },
};
