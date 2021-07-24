import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import FormCreator from "./FormCreator";
import { Box } from "@chakra-ui/react";

const FormManager = (props) => {
  const { register, reset, handleSubmit, formState } = useForm();
  const [formName, setFormName] = useState(null);
  const [formDescription, setFormDescription] = useState(null);
  const [formImage, setFormImage] = useState(null);
  const [editFormData, setEditFormData] = useState(null);
  const [formList, setFormList] = useState([]);

  const { errors } = formState;

  useEffect(() => {
    getFormListFromDatabase();
  }, []);

  const onSubmit = (data, e) => {
    setValue("formName", data.formName);
    setValue("formDescription", data.formDescription);
    setValue("formImage", data.formImage);

    // Update React State for child props
    setFormName(data.formName);
    setFormDescription(data.formDescription);
    setFormImage(data.formImage);
  };

  const onEdit = async (e) => {
    try {
      const formId = String(e.target.value);
      const { data, status } = await axios.get("/api/forms/get-form", {
        params: { id: formId },
      });
      setValue("formName", data[0].formName);
      setValue("formDescription", data[0].formDescription);
      setValue("formImage", data[0].formImage);
      setFormName(data[0].formName);
      setFormDescription(data[0].formDescription);
      setFormImage(data[0].formImage);
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

  const resetFormEditorCallback = () => {
    setValue("formName", null);
    setValue("formDescription", null);
    setValue("formImage", null);
    setFormName(null);
    setFormDescription(null);
    setFormImage(null);
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
          <input id="formName" {...register("formName", { required: true })} />
          <span>{errors["formName"] && "Form name is required"}</span>
        </div>
        <div>
          <label>Form Description</label>
          <input
            id="formDescription"
            {...register("formDescription", { required: true })}
          />
          <span>
            {errors["formDescription"] && "Form description is required"}
          </span>
        </div>
        <div>
          <label>Form Image</label>
          <input id="formImage" {...register("formImage")} />
        </div>
        <input type="submit" value="Create/Update Form" />
      </form>

      {formName && (
        <FormCreator
          formName={formName}
          formDescription={formDescription}
          formImage={formImage}
          existingFormData={editFormData}
          resetFormEditorCallback={resetFormEditorCallback}
        />
      )}
    </Box>
  );
};

export default FormManager;
