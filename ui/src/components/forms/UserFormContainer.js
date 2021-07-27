import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";
import { Link } from "react-router-dom";
import Form from "./Form";

const styles = {};

const UserFormContainer = (props) => {
  const [formData, setFormData] = useState(null);

  const populateData = async () => {
    const { id } = props.match.params;
    console.log(id);
    const { data } = await axios.get("/api/forms/get-form", {
      params: { id: id },
    });
    try {
      setFormData(data[0]);
    } catch (err) {
      console.log("Error retrieving form data");
    }
  };

  const handleSubmitForm = (data, e) => {
    alert(JSON.stringify(data, null, 4));
  };

  useEffect(() => {
    populateData();
  }, []);

  return (
    <div>
      {formData && (
        <Form
          formName={formData.formName}
          formDescription={formData.formDescription}
          formImage={formData.formImage}
          formData={formData.formFields}
          submitHandler={handleSubmitForm}
        />
      )}
    </div>
  );
};

export default withStyles(styles)(UserFormContainer);
