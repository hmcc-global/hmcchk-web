import React, { useState } from "react";
import { useForm } from "react-hook-form";

const Form = (props) => {
  const { formName, formDescription, formImage, formData, submitHandler } =
    props;
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  // String conversion tools
  const camelize = (str) => {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
      })
      .replace(/\s+/g, "");
  };

  function sentencize(str) {
    return str
      .split(/([A-Z]|\d)/)
      .map((v, i, arr) => {
        // If first block then capitalise 1st letter regardless
        if (!i) return v.charAt(0).toUpperCase() + v.slice(1);
        // Skip empty blocks
        if (!v) return v;
        // Underscore substitution
        if (v === "_") return " ";
        // We have a capital or number
        if (v.length === 1 && v === v.toUpperCase()) {
          const previousCapital = !arr[i - 1] || arr[i - 1] === "_";
          const nextWord =
            i + 1 < arr.length && arr[i + 1] && arr[i + 1] !== "_";
          const nextTwoCapitalsOrEndOfString =
            i + 3 > arr.length || (!arr[i + 1] && !arr[i + 3]);
          // Insert space
          if (!previousCapital || nextWord) v = " " + v;
          // Start of word or single letter word
          if (nextWord || (!previousCapital && !nextTwoCapitalsOrEndOfString))
            v = v.toLowerCase();
        }
        return v;
      })
      .join("");
  }

  // Helper function to create the input fields
  const createFormField = (fieldData) => {
    let fieldName = fieldData.fieldName;
    let fieldType = fieldData.fieldType;
    let opts = fieldData.options;
    let required = fieldData.required;

    let inputField = [];

    if (fieldType === "prefill") {
      return;
    } else if (fieldType === "select") {
      let items = [];

      opts.map((option) => {
        let o = (
          <option id={camelize(fieldName + option)} value={option}>
            {" "}
            {option}{" "}
          </option>
        );
        items.push(o);
        return o;
      });

      inputField.push(
        <select
          id={camelize(fieldName)}
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
            id={camelize(fieldName + option)}
            {...register(fieldName, { required: required })}
            type="radio"
            id={fieldName + option}
            value={option}
          />
        );
        let l = (
          <label
            id={camelize(fieldName + option + "label")}
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
          id={camelize(fieldName)}
          {...register(fieldName, { required: required })}
        />
      );
    } else if (fieldType === "header") {
      inputField.push(<h3>{fieldName}</h3>);
    } else {
      inputField.push(
        createGeneralInputField(fieldName, fieldType, { required: required })
      );
    }

    if (required === true) {
      inputField.push(createErrorNotifier(fieldName));
    }

    return inputField;
  };

  // Custom changes for prefill form fields
  const createPrefillFormFields = (fieldData) => {
    if (!fieldData) return;
    let fieldType = fieldData.fieldType;

    if (fieldType !== "prefill") return;

    let opts = fieldData.options;
    let result = [];
    result.push(<h3>Personal Information</h3>);

    opts.forEach((fieldName) => {
      // Generate a label
      let label = (
        <label id={fieldName + "label"}>{sentencize(fieldName)}</label>
      );

      // Generate the field itself
      let field = null;
      if (fieldName === "address") {
        field = (
          <textarea
            key={camelize(fieldName)}
            {...register(fieldName, { required: true })}
          />
        );
      } else {
        field = createGeneralInputField(fieldName, "text", { required: true });
      }

      // Generate validation errors
      let error = createErrorNotifier(fieldName);

      result.push(
        <div>
          {label}
          {field}
          {error}
        </div>
      );
    });

    return result;
  };

  const createErrorNotifier = (fieldName) => {
    let errorElement = sentencize(fieldName) + " is required";
    return <span>{errors[fieldName] && errorElement}</span>;
  };

  const createGeneralInputField = (fieldName, fieldType, validation) => {
    return (
      <input
        key={camelize(fieldName)}
        type={fieldType}
        {...register(fieldName, validation)}
      />
    );
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      {formImage !== "" && <img src={formImage} />}
      <h1>{formName}</h1>
      <p>{formDescription}</p>
      {formData && createPrefillFormFields(formData[0])}
      {formData.map((fieldData, i) => (
        <div key={fieldData.fieldName + i}>
          {!["header", "prefill"].includes(fieldData.fieldType) && (
            <label id={camelize(fieldData.fieldName + "label")}>
              {fieldData.fieldName}
            </label>
          )}
          {createFormField(fieldData)}
          {fieldData.fieldDescription !== "" && (
            <label id={camelize(fieldData.fieldName + "description")}>
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
