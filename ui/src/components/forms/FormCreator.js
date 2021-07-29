import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Form from "./Form";

const FormCreator = (props) => {
  const {
    formName,
    formDescription,
    formImage,
    existingFormData,
    resetFormEditorCallback,
  } = props;
  const [formData, setFormData] = useState([]);
  const [editData, setEditData] = useState(null);
  const [saveStatus, setSaveStatus] = useState(false);
  const {
    register,
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    register: registerPrefill,
    reset: resetPrefill,
    setValue: setValuePrefill,
    handleSubmit: handleSubmitPrefill,
  } = useForm();

  useEffect(() => {
    if (existingFormData) {
      console.log(existingFormData.formFields[0]);
      if (existingFormData.formFields[0].fieldType === "prefill") {
        console.log("prefill detected");
        let fields = existingFormData.formFields[0].options;
        fields.forEach((field) => {
          console.log(field + "Checkbox");
          setValuePrefill(field + "Checkbox", true);
        });
      }
      setFormData(existingFormData.formFields);
    }
  }, existingFormData);

  // Handler for prefillable form arguments
  const onPrefillableSubmit = (data, e) => {
    let chosenFields = [];
    for (let [_, value] of Object.entries(data)) {
      if (value) chosenFields.push(value);
    }

    const dataObject = {
      fieldName: "prefill",
      fieldType: "prefill",
      options: chosenFields,
      fieldDescription: "",
      required: true,
    };

    let temp = [...formData];
    let spliceAmount = temp[0].fieldType === "prefill" ? 1 : 0;
    temp.splice(0, spliceAmount, dataObject);
    setFormData(temp);
  };

  // Handler for new custom field submissions
  const onCustomSubmit = (data, e) => {
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

  // Write form data to DB
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
      let formToSave = {
        formName: formName,
        formDescription: formDescription,
        formImage: formImage,
        formFields: formData,
      };
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

  const validateDemoForm = (data, e) => {
    alert("SUCCESS!! :-)\n\n" + JSON.stringify(data, null, 4));
    reset();

    return false;
  };

  // Watch this to conditionally render custom things
  const ft = watch("fieldType");

  return (
    <div>
      <h1>Creating/Editing form {formName}</h1>
      <h2>Form Editor</h2>
      <form onSubmit={handleSubmitPrefill(onPrefillableSubmit)}>
        <h3>Prefillable Fields</h3>
        <div>
          <label htmlFor="fullNameCheckbox">Name</label>
          <input
            id="fullNameCheckbox"
            type="checkbox"
            value="fullName"
            {...registerPrefill("fullNameCheckbox")}
          />
        </div>
        <div>
          <label htmlFor="phoneNumberCheckbox">Phone Number</label>
          <input
            id="phoneNumberCheckbox"
            type="checkbox"
            value="phoneNumber"
            {...registerPrefill("phoneNumberCheckbox")}
          />
        </div>
        <div>
          <label htmlFor="emailCheckbox">Email</label>
          <input
            id="emailCheckbox"
            type="checkbox"
            value="email"
            {...registerPrefill("emailCheckbox")}
          />
        </div>
        <div>
          <label htmlFor="lifeGroupCheckbox">LIFE Group</label>
          <input
            id="lifeGroupCheckbox"
            type="checkbox"
            value="lifeGroup"
            {...registerPrefill("lifeGroupCheckbox")}
          />
        </div>
        <div>
          <label htmlFor="addressCheckbox">Address</label>
          <input
            id="addressCheckbox"
            type="checkbox"
            value="address"
            {...registerPrefill("addressCheckbox")}
          />
        </div>
        <input type="submit" value="Save Prefilled Fields" />
      </form>

      <form onSubmit={handleSubmit(onCustomSubmit)}>
        <h3>Custom Fields</h3>
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
        {ft !== "header" && (
          <div>
            <label htmlFor="required">Required</label>
            <input id="required" type="checkbox" {...register("required")} />
            <br />
          </div>
        )}
        <input type="submit" value="Save Field Data" />
      </form>

      <h2>Created Form Fields</h2>
      {formData
        .filter((obj) => {
          if (obj.fieldType === "prefill") {
            return;
          } else {
            return obj;
          }
        })
        .map((fieldData, i) => (
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
      <Form
        formName={formName}
        formDescription={formDescription}
        formImage={formImage}
        formData={formData}
        submitHandler={validateDemoForm}
      />
    </div>
  );
};

export default FormCreator;
