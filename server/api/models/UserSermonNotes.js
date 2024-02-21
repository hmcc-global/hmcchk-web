module.exports = {
  attributes: {
    sermonNoteId: {
      type: 'String',
      unique: true,
      required: true,
    },
    userId: {
      model: 'User',
      required: true,
    },
    editContended: {
      type: 'String',
      allowNull: true,
    },
    themes: {
      type: 'json',
      columnType: 'array',
      defaultsTo: [],
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
