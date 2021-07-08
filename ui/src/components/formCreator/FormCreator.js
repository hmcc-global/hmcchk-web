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
  const { register, watch, handleSubmit } = useForm();

  // Handler for when the form is submitted
  const onSubmit = data => {
    // Format the data
    data.options = data.options.split(";")
    let temp = formData
    temp.push(data)
    setFormData([...temp])
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
      }) 
      
      inputField = <select {...register(fieldName)}> {items} </select>
    }
    else if (fieldType === "radio") {
      inputField = []
      
      opts.map(option => {
        let o = <input {...register} type="radio" value={option} />
        inputField.push(o)
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
        <input type="submit" value="Add New Field" />
      </form>

      <form>
        {
          formData.map( (fieldData, i) => (
            <div> 
              <label>{ fieldData.fieldName }</label>
              {createFormField(fieldData.fieldName, fieldData.fieldType, fieldData.options)} 
            </div>
          ))
        }
      </form>
      
    </div>
  );
}

export default withStyles(styles)(FormCreator);