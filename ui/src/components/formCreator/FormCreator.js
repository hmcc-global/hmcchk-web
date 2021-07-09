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
  const { register, reset, watch, setValue, handleSubmit, formState } = useForm();
  const { errors } = formState;

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

  const validateDemoForm = (data, e) => {
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(data, null, 4));

    return false
  }

  // Watch this to conditionally render custom things
  const ft = watch("fieldType")

  // Helper function to create the input fields
  const createFormField = (fieldData) => {
    let fieldName = fieldData.fieldName
    let fieldType = fieldData.fieldType
    let opts = fieldData.options
    let required = fieldData.required

    let inputField = []

    if (fieldType === "select") {
      let items = []

      opts.map(option => {
        let o = <option value={option}> {option} </option>
        items.push(o)
        return o
      }) 
      
      inputField.push(<select {...register(fieldName, {required:required})}> {items} </select>)
    }
    else if (fieldType === "radio") {
      opts.map(option => {
        let o = <input {...register(fieldName, {required:required})} type="radio" id={fieldName+option} value={option} />
        let l = <label for={fieldName+option}>{option}</label>
        inputField.push(o)
        inputField.push(l)
      }) 
    }
    else if (fieldType === "textarea") {
      inputField.push(<textarea {...register(fieldName , {required:required})}/>)
    }
    else {
      inputField.push(<input 
        type= {fieldType}
        {...register(fieldName, {required:required})} />)
    }

    if (required === true) {
      let errorElement = fieldName + " is required"
      inputField.push(<span>{errors[fieldName] && errorElement}</span>)
    }

    return inputField
  }
   
  return (
    <div>
      <h1>Form Editor</h1>
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
      
      <h1>Form Preview</h1>
      <form onSubmit={handleSubmit(validateDemoForm)}>
        {
          formData.map( (fieldData, i) => (
            <div> 
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
              <label>{ fieldData.fieldName }</label>
              {createFormField(fieldData)} 
            </div>
          ))
        }
        <input type="submit" />
      </form>
      
    </div>
  );
}

export default withStyles(styles)(FormCreator);