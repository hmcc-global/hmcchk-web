import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";
import FormCreator from "./FormCreator";

const styles = {
  root: {
    color: "white",
  },
  container: {
    flex: 1,
  },
  button: {
    backgroundColor: "#282c34",
    color: "white",
  },
};

const FormManager = (props) => {
  const { classes } = props;
  const { register, reset, handleSubmit, formState } = useForm();
  const [formName, setFormName] = useState(null);
  const [editFormData, setEditFormData] = useState(null);
  const [formList, setFormList] = useState([]);

  useEffect(() => {
    getFormListFromDatabase();
  }, []);

  const onSubmit = (data, e) => {
    setFormName(data.formName);
    setEditFormData(null);
  };

  const onEdit = async (e) => {
    try {
      const formId = String(e.target.value);
      const { data, status } = await axios.get("/api/forms/get-form-by-id", {
        params: { id: formId },
      });
      setFormName(data[0].formName);
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
      const { data, status } = await axios.get("/api/forms/get-all-forms");
      setFormList(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={classes.root}>
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
          <input {...register("formName")} />
        </div>
        <input type="submit" value="Create Form" />
      </form>

      {formName && (
        <FormCreator
          formName={formName}
          existingFormData={editFormData}
          resetFormEditorCallback={resetFormEditorCallback}
        />
      )}
    </div>
  );
};

export default withStyles(styles)(FormManager);
