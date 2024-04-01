class FormField {
  constructor(id, fieldName, fieldType, fieldDescription, required, options) {
    this.id = id;
    this.fieldName = fieldName;
    this.fieldType = fieldType;
    this.fieldDescription = fieldDescription;
    this.required = required;
    this.options = options;
  }
}

export default FormField;
