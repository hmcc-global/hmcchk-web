import React, {useState} from "react";
import { useForm } from "react-hook-form";
import { withStyles } from '@material-ui/core/styles';

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
  const [formData, setFormData] = useState([])
  const [editData, setEditData] = useState(null)
  const { register, watch, setValue, handleSubmit } = useForm();

  // Handler for when the form is submitted
  const onSubmit = data => {
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
  }

  const onEdit = e => {
    const temp = formData[e.target.value]
    setEditData(e.target.value)
    setValue("fieldName", temp.fieldName)
    setValue("fieldType", temp.fieldType)
    if (temp.options) {
      setValue("options", temp.options.join(';'))
    }
  }

  const onDelete = e => {
    if (window.confirm("Are you sure you want to delete this?")) {
      let temp = [...formData]
      temp.splice(e.target.value, 1)
      setFormData(temp)
    }
  }

  // Watch this to conditionally render custom things
  const ft = watch("fieldType")

  // Helper function to create the input fields
  const createFormField = (fieldName, fieldType, opts) => {
    let inputField = null
    if (fieldType === "select") {
      let items = []

      opts.map(option => {
        let o = <option value={option}> {option} </option>
        items.push(o)
        return o
      }) 
      
      inputField = <select {...register(fieldName)}> {items} </select>
    }
    else if (fieldType === "radio") {
      inputField = []
      
      opts.map(option => {
        let o = <input {...register} type="radio" id={fieldName+option} value={option} />
        let l = <label for={fieldName+option}>{option}</label>
        inputField.push(o)
        inputField.push(l)
        return o
      }) 
    }
    else if (fieldType === "textarea") {
      inputField = <textarea {...register(fieldName)}/>
    }
    else {
      inputField = <input placeholder={fieldName} 
        type= {fieldType}
        {...register(fieldName)} />
    }
    return inputField
  }
   
  return (
    <div>
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
        <input type="submit" value="Save Field Data" />
      </form>
      
      <div>
        {
          formData.map( (fieldData, i) => (
            <div> 
              <label>{ fieldData.fieldName }</label>
              {createFormField(fieldData.fieldName, fieldData.fieldType, fieldData.options)} 
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
      </div>
      
    </div>
  );
}

export default withStyles(styles)(FormCreator);