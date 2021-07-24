import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import FormCreator from "./FormCreator";
import { Box } from "@chakra-ui/react";

const FormManager = (props) => {
  const { register, reset, handleSubmit, formState } = useForm();
  const [formName, setFormName] = useState(null);
  const [formDescription, setFormDescription] = useState(null);
  const [editFormData, setEditFormData] = useState(null);
  const [formList, setFormList] = useState([]);

  const { errors } = formState;

  useEffect(() => {
    getFormListFromDatabase();
  }, []);

  const onSubmit = (data, e) => {
    setFormName(data.formName);
    setFormDescription(data.formDescription);
    setEditFormData(null);
  };

  const onEdit = async (e) => {
    try {
      const formId = String(e.target.value);
      const { data, status } = await axios.get("/api/forms/get-form", {
        params: { id: formId },
      });
      setFormName(data[0].formName);
      setFormDescription(data[0].formDescription);
      setEditFormData(data[0]);
    } catch (err) {
      console.log(err);
    }
  };

  const onDelete = async (e) => {
    try {
      const formId = String(e.target.value);
      const { data, status } = await axios.post("/api/forms/post-delete-form", {
        id: formId,
      });
      getFormListFromDatabase();
    } catch (err) {
      console.log(err);
    }
  };

  const resetFormEditorCallback = (newFormData) => {
    setFormName(null);
    setEditFormData(null);
    getFormListFromDatabase();
    reset();
  };

  const getFormListFromDatabase = async () => {
    try {
      const { data, status } = await axios.get("/api/forms/get-form");
      setFormList(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box color="white">
      <h1>Form Management System</h1>
      <h2>Existing Forms</h2>
      <ul>
        {formList.map((formItem, i) => (
          <li key={formItem.id}>
            {formItem.formName}
            <button onClick={onEdit} value={formItem.id}>
              Edit
            </button>
            <button onClick={onDelete} value={formItem.id}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <h2>Create A New Form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Form Name</label>
          <input {...register("formName", { required: true })} />
          <span>{errors["formName"] && "Form name is required"}</span>
        </div>
        <div>
          <label>Form Description</label>
          <input {...register("formDescription", { required: true })} />
          <span>
            {errors["formDescription"] && "Form description is required"}
          </span>
        </div>
        <input type="submit" value="Create Form" />
      </form>

      {formName && (
        <FormCreator
          formName={formName}
          formDescription={formDescription}
          existingFormData={editFormData}
          resetFormEditorCallback={resetFormEditorCallback}
        />
      )}
    </Box>
  );
};

export default FormManager;
