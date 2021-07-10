import React, {useState} from "react";
import { useForm } from "react-hook-form";
import { withStyles } from '@material-ui/core/styles';
import Form from "./Form";

const styles = {
    container: {
        flex: 1 
    },
    button: {
        backgroundColor: "#282c34",
        color: "white",
    }
};

const FormCreator = props => {
  const { formName, resetFormEditorCallback } = props;
  const [formData, setFormData] = useState([])
  const [editData, setEditData] = useState(null)
  const { register, reset, watch, setValue, handleSubmit, formState } = useForm()
  const { errors } = formState

  // Handler for when the form is submitted
  const onSubmit = (data, e) => {
    console.log(data)
    // Format the data
    if (data.options) {
      data.options = data.options.split(";")
    }
    let temp = [...formData]

    if(editData) {
      temp.splice(editData, 1, data)
      setEditData(null)
    }
    else {
      temp.push(data)
    }
    setFormData(temp)

    reset()
  }

  // Handler for field data edits
  const onEdit = e => {
    const temp = formData[e.target.value]
    setEditData(e.target.value)
    setValue("fieldName", temp.fieldName)
    setValue("fieldType", temp.fieldType)
    if (temp.options) {
      setValue("options", temp.options.join(';'))
    }
    setValue("required", temp.required)
  }

  // Handler for deletion of field data
  const onDelete = e => {
    if (editData) {
      alert("Cannot delete while editing")
    }
    else {
      if (window.confirm("Are you sure you want to delete this?")) {
        let temp = [...formData]
        temp.splice(e.target.value, 1)
        setFormData(temp)
      }
    }
  }

  const onSaveToDB = e => {
    resetFormEditorCallback(formName)
  }

  // Watch this to conditionally render custom things
  const ft = watch("fieldType")
   
  return (
    <div>
      <h1>Creating/Editing form { formName }</h1>
      <h2>Form Editor</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {editData && (
          <div>
            <label>Currently editing field: {formData[editData].fieldName} </label>
          </div>
        )}
        <div>
          <label>Field Name</label>
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
          </select>
        </div>
        {(ft === "select" || ft === "radio") && (
          <div>
            <label>Options</label>
            <input id="options" {...register("options")}/>
            <label for="options">Enter options separated by ;</label>
          </div>
        )}
        <label for="required">Required</label>
        <input id="required" type="checkbox" {...register("required")}/>      
        <br/>
        <input type="submit" value="Save Field Data" />
      </form>
      
      <h2>Created Form Fields</h2>
      {
        formData.map( (fieldData, i) => (
          <div>
            {fieldData.fieldName}
            <button href="" 
              value={i}
              onClick={onEdit}>
                Edit
            </button>
            <button href="" 
              value={i} 
              onClick={onDelete}>
                Delete
            </button>
          </div>
        ))
      }
      <button onClick={onSaveToDB}>Save to DB</button>

      <h2>Form Preview</h2>
      <Form formData={formData}/>
    </div>
  );
}

export default withStyles(styles)(FormCreator);