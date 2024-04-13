const getFieldById = (id, formFields) => {
  return formFields.find((el) => el.id === id);
};

const getFieldIndexById = (id, formFields) => {
  return formFields.findIndex((el) => el.id === id);
};

export { getFieldById, getFieldIndexById };
