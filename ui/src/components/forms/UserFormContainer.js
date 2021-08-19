import React, { useState, useEffect } from "react";
import { customAxios as axios } from "../helpers/customAxios";
import Form from "./Form";
import { Container } from "@chakra-ui/react";

const styles = {};

const UserFormContainer = (props) => {
  const [formData, setFormData] = useState(null);
  const { user } = props;

  useEffect(() => {
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

    populateData();
  }, [props]);

  return (
    <Container maxW="container.md">
      {formData && (
        <Form
          formId={formData.id}
          formName={formData.formName}
          formDescription={formData.formDescription}
          formImage={formData.formImage}
          formData={formData.formFields}
          user={user}
        />
      )}
    </Container>
  );
};

export default UserFormContainer;
