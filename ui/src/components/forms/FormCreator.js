import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Form from "./Form";

const FormCreator = (props) => {
  const { formName, formDescription, existingFormData, resetFormEditorCallback } = props;
  const [formData, setFormData] = useState([]);
  const [editData, setEditData] = useState(null);
  const [saveStatus, setSaveStatus] = useState(false);
  const { register, reset, watch, setValue, handleSubmit, formState } =
    useForm();
  const { errors } = formState;

  useEffect(() => {
    if (existingFormData) {
      setFormData(existingFormData.formFields);
    }
  }, existingFormData);

  // Handler for when the form is submitted
  const onSubmit = (data, e) => {
    // Format the data
    if (data.options) {
      data.options = data.options.split(";");
    }
    let temp = [...formData];

    if (editData) {
      temp.splice(editData, 1, data);
      setEditData(null);
    } else {
      temp.push(data);
    }
    setFormData(temp);

    reset();
  };

  // Handler for field data edits
  const onEdit = (e) => {
    const temp = formData[e.target.value];
    setEditData(e.target.value);
    setValue("fieldName", temp.fieldName);
    setValue("fieldType", temp.fieldType);
    setValue("fieldDescription", temp.fieldDescription);
    if (temp.options) {
      setValue("options", temp.options.join(";"));
    }
    setValue("required", temp.required);
  };

  // Handler for deletion of field data
  const onDelete = (e) => {
    if (editData) {
      alert("Cannot delete while editing");
    } else {
      if (window.confirm("Are you sure you want to delete this?")) {
        let temp = [...formData];
        temp.splice(e.target.value, 1);
        setFormData(temp);
      }
    }
  };

  const saveFormToDB = async (formToSave) => {
    if (existingFormData) {
      const { status } = await axios.post("/api/forms/post-update-form", {
        id: existingFormData.id,
        formToSave: formToSave,
      });

      return status;
    } else {
      const { status } = await axios.post("/api/forms/post-create-form", {
        formToSave: formToSave,
      });

      return status;
    }
  };

  const onSaveToDB = async (e) => {
    setSaveStatus(true);
    try {
      let formToSave = { formName: formName, formDescription: formDescription, formFields: formData };
      const statusCode = await saveFormToDB(formToSave);
      if (statusCode === 200) {
        setSaveStatus(false);
        resetFormEditorCallback(formName);
      }
    } catch (err) {
      setSaveStatus(false);
      console.log(err);
    }
  };

  // Watch this to conditionally render custom things
  const ft = watch("fieldType");

  return (
    <div>
      <h1>Creating/Editing form {formName}</h1>
      <h2>Form Editor</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {editData && (
          <div>
            <label>
              Currently editing field: {formData[editData].fieldName}{" "}
            </label>
          </div>
        )}
        <div>
          <label>{ft === "header" ? "Header Text" : "Field Name"}</label>
          <input {...register("fieldName")} />
        </div>
        <div>
          <label>Field Type</label>
          <select {...register("fieldType")}>
            <option value="text">Text</option>
            <option value="select">Select</option>
            <option value="checkbox">Checkbox</option>
            <option value="radio">Radio</option>
            <option value="textarea">Text Area</option>
            <option value="date">Datepicker</option>
            <option value="header">Header</option>
          </select>
        </div>
        <div>
          <label>Field Description (describe what this field is for)</label>
          <input {...register("fieldDescription")} />
          <label>Leave blank if not needed</label>
        </div>
        {(ft === "select" || ft === "radio") && (
          <div>
            <label>Options</label>
            <input id="options" {...register("options")} />
            <label htmlFor="options">Enter options separated by ;</label>
          </div>
        )}
        {(ft !== "header") && (
          <div>
            <label htmlFor="required">Required</label>
            <input id="required" type="checkbox" {...register("required")} />
            <br />
          </div>
        )}
        <input type="submit" value="Save Field Data" />
      </form>

      <h2>Created Form Fields</h2>
      {formData.map((fieldData, i) => (
        <div>
          {fieldData.fieldName}
          <button href="" value={i} onClick={onEdit}>
            Edit
          </button>
          <button href="" value={i} onClick={onDelete}>
            Delete
          </button>
        </div>
      ))}
      <button onClick={onSaveToDB}>Save to DB</button>
      {saveStatus && <div>Saving</div>}

      <h2>Form Preview</h2>
      <Form formName={formName} formDescription={formDescription} formData={formData} />
    </div>
  );
};

export default FormCreator;
