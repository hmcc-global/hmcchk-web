module.exports = {
  attributes: {
    sermonId: {
      type: 'string',
      unique: true,
      required: true,
    },
    userId: {
      model: 'User',
      required: true,
    },
    editedContent: {
      type: 'string',
      allowNull: true,
    },
    themes: {
      type: 'string',
      isIn: [],
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
