import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";
import Form from "./Form";

const styles = {};

const UserFormContainer = (props) => {
  const [formData, setFormData] = useState(null);

  const populateData = async () => {
    const { id } = props.match.params;
    const { data } = await axios.get("/api/forms/get-form", {
      params: { id: id },
    });
    try {
      setFormData(data[0]);
    } catch (err) {
      console.log("Error retrieving form data");
    }
  };

  useEffect(() => {
    populateData();
  }, []);

  return (
    <div>
      {formData && (
        <Form
          formId={formData.id}
          formName={formData.formName}
          formDescription={formData.formDescription}
          formImage={formData.formImage}
          formData={formData.formFields}
        />
      )}
    </div>
  );
};

export default withStyles(styles)(UserFormContainer);
