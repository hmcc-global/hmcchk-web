import React, { useState, useEffect } from "react";
import { customAxios as axios } from "../helpers/customAxios";
import Form from "./Form";
import { Container, Center, VStack, Text } from "@chakra-ui/react";

const UserFormContainer = (props) => {
  const [formData, setFormData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user, history } = props;

  useEffect(() => {
    const populateData = async () => {
      const { id } = props.match.params;

      // Get form, also check whether user is logged in or not
      // to see if user can access this form.
      const { data } = await axios.get("/api/forms/get-form", {
        params: { id: id, isLoggedIn: user.id ? true : false },
      });

      try {
        setFormData(data[0]);
      } catch (err) {
        console.log("Error retrieving form data");
      }

      setIsLoading(false);
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
          history={history}
        />
      )}

      {!isLoading && !formData && (
        <Center>
          <VStack>
            <Text fontSize={["xl", "3xl"]} spacing="5">
              Uh-oh!
            </Text>
            <Text fontSize={["lg", "2xl"]} spacing="5">
              Looks like you can't access this form right now, try logging in!
            </Text>
          </VStack>
        </Center>
      )}
    </Container>
  );
};

export default UserFormContainer;
