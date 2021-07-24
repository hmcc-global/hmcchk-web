import React, { useState } from "react";
import { useForm } from "react-hook-form";

const Form = (props) => {
  const { formName, formDescription, formImage, formData } = props;
  const { register, reset, watch, setValue, handleSubmit, formState } =
    useForm();
  const { errors } = formState;

  const validateDemoForm = (data, e) => {
    alert("SUCCESS!! :-)\n\n" + JSON.stringify(data, null, 4));
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

      opts.map((option) => {
        let o = (
          <option key={fieldName + option} value={option}>
            {" "}
            {option}{" "}
          </option>
        );
        items.push(o);
        return o;
      });

      inputField.push(
        <select {...register(fieldName, { required: required })}>
          {" "}
          {items}{" "}
        </select>
      );
    } else if (fieldType === "radio") {
      opts.map((option) => {
        let o = (
          <input
            key={fieldName + option}
            {...register(fieldName, { required: required })}
            type="radio"
            id={fieldName + option}
            value={option}
          />
        );
        let l = (
          <label
            key={fieldName + option + "label"}
            htmlFor={fieldName + option}
          >
            {option}
          </label>
        );
        inputField.push(o);
        inputField.push(l);
        return true;
      });
    } else if (fieldType === "textarea") {
      inputField.push(
        <textarea
          key={fieldName}
          {...register(fieldName, { required: required })}
        />
      );
    } else if (fieldType === "header") {
      inputField.push(<h3>{fieldName}</h3>);
    } else {
      inputField.push(
        <input
          key={fieldName}
          type={fieldType}
          {...register(fieldName, { required: required })}
        />
      );
    }

    if (required === true) {
      let errorElement = fieldName + " is required";
      inputField.push(<span>{errors[fieldName] && errorElement}</span>);
    }

    return inputField;
  };

  return (
    <form onSubmit={handleSubmit(validateDemoForm)}>
      {formImage !== "" && (
        <img src={formImage}/>
      )}
      <h1>{formName}</h1>
      <p>{formDescription}</p>
      {formData.map((fieldData, i) => (
        <div>
          {fieldData.fieldType !== "header" && (
            <label>{fieldData.fieldName}</label>
          )}
          {createFormField(fieldData)}
          {fieldData.fieldDescription !== "" && (
            <label>{fieldData.fieldDescription}</label>
          )}
        </div>
      ))}
      <input type="submit" />
    </form>
  );
};

export default Form;
