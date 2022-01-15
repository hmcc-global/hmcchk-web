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

  // If there is a logged in user, check whether they filled or not
  // Else default to true to allow public to access
  const filledInProfileCheck = user.id ? user.hasFilledProfileForm : true;
  let allowFormAccess = formData && filledInProfileCheck;

  return (
    <Container maxW="container.md">
      {allowFormAccess && (
        <Form
          formId={formData.id}
          formName={formData.formName}
          formDescription={formData.formDescription}
          formImage={formData.formImage}
          formFields={formData.formFields}
          user={user}
          history={history}
        />
      )}

      {!isLoading && !allowFormAccess && (
        <Center h="100vh">
          <VStack>
            <Text fontSize={["xl", "3xl"]} spacing="5">
              Uh-oh!
            </Text>
            <Text fontSize={["lg", "2xl"]} spacing="5">
              {user.id && !user.hasFilledProfileForm
                ? "Please complete your user profile first before signing up"
                : "You need to be logged in to access this form or this form is currently unavailable!"}
            </Text>
          </VStack>
        </Center>
      )}
    </Container>
  );
};

export default UserFormContainer;
