import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { customAxios as axios } from "../helpers/customAxios";
import FormCreator from "./FormCreator";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  Input,
  Heading,
  Container,
  List,
  ListItem,
  Box,
  Text,
} from "@chakra-ui/react";

const FormManager = (props) => {
  const { register, reset, handleSubmit, setValue, formState } = useForm();
  const [formName, setFormName] = useState(null);
  const [formDescription, setFormDescription] = useState(null);
  const [formImage, setFormImage] = useState(null);
  const [editFormData, setEditFormData] = useState(null);
  const [formList, setFormList] = useState([]);
  const history = useHistory();
  const { user } = props;

  const { errors } = formState;

  useEffect(() => {
    getFormListFromDatabase();
  }, []);

  const onSubmit = (data, e) => {
    setValue("formName", data.formName);
    setValue("formDescription", data.formDescription);
    setValue("formImage", data.formImage);

    // Update React State for child props
    setFormName(data.formName);
    setFormDescription(data.formDescription);
    setFormImage(data.formImage);
  };

  const onEdit = async (e) => {
    try {
      const formId = String(e.target.value);
      const { data, status } = await axios.get("/api/forms/get-form", {
        params: { id: formId },
      });

      if (status !== 200) {
        alert(
          "There was an issue with the request, please talk to a DB manager"
        );
      }

      setValue("formName", data[0].formName);
      setValue("formDescription", data[0].formDescription);
      setValue("formImage", data[0].formImage);
      setFormName(data[0].formName);
      setFormDescription(data[0].formDescription);
      setFormImage(data[0].formImage);
      setEditFormData(data[0]);
    } catch (err) {
      console.log(err);
    }
  };

  const onClickRedirect = async (e) => {
    history.push("/forms/" + e.target.value);
  };

  const onDelete = async (e) => {
    try {
      const formId = String(e.target.value);
      await axios.post("/api/forms/post-delete-form", {
        id: formId,
      });
      getFormListFromDatabase();
    } catch (err) {
      console.log(err);
    }
  };

  const resetFormEditorCallback = async () => {
    setValue("formName", null);
    setValue("formDescription", null);
    setValue("formImage", null);
    setFormName(null);
    setFormDescription(null);
    setFormImage(null);
    setEditFormData(null);
    await getFormListFromDatabase();
    reset();
  };

  const getFormListFromDatabase = async () => {
    try {
      const { data, status } = await axios.get("/api/forms/get-form");
      if (status !== 200) {
        throw Error("Something went wrong with the request");
      }
      setFormList(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <Heading as="h1" size="xl">
        Form Management System
      </Heading>
      <Box borderRadius="lg" p="5" mt="5" borderWidth="1px">
        <Heading mb="2" as="h2" size="lg">
          Existing Forms
        </Heading>
        <List>
          {formList.map((formItem) => (
            <ListItem key={formItem.id}>
              <Box p="2" mb="2" borderRadius="lg" borderWidth="1px">
                <Text>{formItem.formName}</Text>
                <Button
                  ml="1"
                  colorScheme="teal"
                  onClick={onEdit}
                  value={formItem.id}
                >
                  Edit
                </Button>
                <Button
                  ml="1"
                  colorScheme="teal"
                  onClick={onDelete}
                  value={formItem.id}
                >
                  Delete
                </Button>
                <Button
                  ml="1"
                  colorScheme="teal"
                  onClick={onClickRedirect}
                  value={formItem.id}
                >
                  Public Link
                </Button>
              </Box>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box borderRadius="lg" p="5" mt="3" borderWidth="1px">
        <Heading as="h2" size="lg">
          Create A New Form
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={errors["formName"]}>
            <FormLabel>Form Name</FormLabel>
            <Input
              id="formName"
              {...register("formName", { required: "Form name is required" })}
            />
            <FormErrorMessage>
              {errors["formName"] && "Form name is required"}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors["formDescription"]}>
            <FormLabel>Form Description</FormLabel>
            <Input id="formDescription" {...register("formDescription")} />
          </FormControl>
          <FormControl isInvalid={errors["formImage"]}>
            <FormLabel>Form Image</FormLabel>
            <Input id="formImage" {...register("formImage")} />
          </FormControl>
          <Button mt={4} colorScheme="teal" type="submit">
            Create/Update Form
          </Button>
        </form>
      </Box>

      {formName && (
        <FormCreator
          formName={formName}
          formDescription={formDescription}
          formImage={formImage}
          existingFormData={editFormData}
          resetFormEditorCallback={resetFormEditorCallback}
          user={user}
        />
      )}
    </Container>
  );
};

export default FormManager;
