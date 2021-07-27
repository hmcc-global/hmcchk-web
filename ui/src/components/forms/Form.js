import React, { useState } from "react";
import { useForm } from "react-hook-form";

const Form = (props) => {
  const { formName, formDescription, formImage, formData, submitHandler } =
    props;
  const { register, reset, handleSubmit, formState } = useForm();
  const { errors } = formState;

  const camelize = (str) => {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
      })
      .replace(/\s+/g, "");
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
          <option key={camelize(fieldName + option)} value={option}>
            {" "}
            {option}{" "}
          </option>
        );
        items.push(o);
        return o;
      });

      inputField.push(
        <select
          key={camelize(fieldName)}
          {...register(fieldName, { required: required })}
        >
          {" "}
          {items}{" "}
        </select>
      );
    } else if (fieldType === "radio") {
      opts.map((option) => {
        let o = (
          <input
            key={camelize(fieldName + option)}
            {...register(fieldName, { required: required })}
            type="radio"
            id={fieldName + option}
            value={option}
          />
        );
        let l = (
          <label
            key={camelize(fieldName + option + "label")}
            htmlFor={camelize(fieldName + option)}
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
          key={camelize(fieldName)}
          {...register(fieldName, { required: required })}
        />
      );
    } else if (fieldType === "header") {
      inputField.push(<h3>{fieldName}</h3>);
    } else {
      inputField.push(
        <input
          key={camelize(fieldName)}
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
    <form onSubmit={handleSubmit(submitHandler)}>
      {formImage !== "" && <img src={formImage} />}
      <h1>{formName}</h1>
      <p>{formDescription}</p>
      {formData.map((fieldData, i) => (
        <div key={fieldData.fieldName + i}>
          {fieldData.fieldType !== "header" && (
            <label key={camelize(fieldData.fieldName + "label")}>
              {fieldData.fieldName}
            </label>
          )}
          {createFormField(fieldData)}
          {fieldData.fieldDescription !== "" && (
            <label key={camelize(fieldData.fieldName + "description")}>
              {fieldData.fieldDescription}
            </label>
          )}
        </div>
      ))}
      <input type="submit" />
    </form>
  );
};

export default Form;
