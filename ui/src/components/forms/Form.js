import React, {useState} from "react";
import { useForm } from "react-hook-form";
import { withStyles } from '@material-ui/core/styles';

const styles = {
};

const Form = props => {
  const { formData } = props;
  const { register, reset, watch, setValue, handleSubmit, formState } = useForm();
  const { errors } = formState;

  const validateDemoForm = (data, e) => {
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(data, null, 4));
    reset();

    return false;
  };

  // Helper function to create the input fields
  const createFormField = (fieldData) => {
    let fieldName = fieldData.fieldName;
    let fieldType = fieldData.fieldType;
    let opts = fieldData.options;
    let required = fieldData.required;

    let inputField = [];

    if (fieldType === "select") {
      let items = [];

      opts.map(option => {
        let o = <option value={option}> {option} </option>
        items.push(o);
        return o;
      });
      
      inputField.push(<select {...register(fieldName, {required:required})}> {items} </select>);
    }
    else if (fieldType === "radio") {
      opts.map(option => {
        let o = <input {...register(fieldName, {required:required})} type="radio" id={fieldName+option} value={option} />
        let l = <label for={fieldName+option}>{option}</label>
        inputField.push(o)
        inputField.push(l)
        return true
      });
    }
    else if (fieldType === "textarea") {
      inputField.push(<textarea {...register(fieldName , {required:required})}/>);
    }
    else {
      inputField.push(<input 
        type= {fieldType}
        {...register(fieldName, {required:required})} />);
    }

    if (required === true) {
      let errorElement = fieldName + " is required";
      inputField.push(<span>{errors[fieldName] && errorElement}</span>);
    }

    return inputField;
  };

  return (
      <form onSubmit={handleSubmit(validateDemoForm)}>
      {
        formData.map( (fieldData, i) => (
          <div> 
            <label>{ fieldData.fieldName }</label>
            {createFormField(fieldData)} 
          </div>
        ))
      }
      <input type="submit" />
    </form>
  );
};

export default withStyles(styles)(Form);