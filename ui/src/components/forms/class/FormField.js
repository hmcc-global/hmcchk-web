import { v4 as uuidv4 } from 'uuid';

class FormField {
  constructor(fieldName, fieldType, fieldDescription, required, options) {
    this.id = uuidv4();
    this.fieldName = fieldName;
    this.fieldType = fieldType;
    this.fieldDescription = fieldDescription;
    this.required = required;
    this.options = options;
  }
}

export default FormField;