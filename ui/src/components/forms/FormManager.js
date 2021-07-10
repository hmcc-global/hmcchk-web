import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { withStyles } from '@material-ui/core/styles';
import FormCreator from './FormCreator';

const styles = {
  container: {
    flex: 1 
  },
  button: {
    backgroundColor: "#282c34",
    color: "white",
  }
};

const FormManager = props => {
  const { register, reset, watch, setValue, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const [ formName, setFormName ] = useState(null)
  const [ formList, setFormList ] = useState([])

  useEffect(() => {
    setFormList(["Form A", "Form B", "Form C"])
  }, []);

  const onSubmit = (data, e) => {
    setFormName(data.formName)
  }

  const resetFormEditorCallback = (newFormData) => {
    setFormName(null)
    let temp = [...formList]
    temp.push(newFormData)
    setFormList(temp)
  }

  const componentDidMount = () => {
    console.log("form manager mounting")
  }

  return (
    <div>  
      <h1>Form Management System</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Form Name</label>
          <input {...register("formName")} />
        </div>
        <input type="submit" value="Create Form" />
      </form>

      { formName && <FormCreator formName={formName} resetFormEditorCallback={resetFormEditorCallback} /> }

      <h1>Existing Forms</h1>
      <ul>
        {
          formList.map( (formItem, i) => (
            <li>{formItem}</li>
          ))
        }
      </ul>
    </div>
  );
}

export default withStyles(styles)(FormManager);
