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
  Badge,
  Stack,
} from "@chakra-ui/react";
import FormDataDownloader from "./FormDataDownloader";

const FormManager = (props) => {
  const { register, reset, handleSubmit, setValue, formState } = useForm();

  const [formName, setFormName] = useState(null);
  const [formDescription, setFormDescription] = useState(null);
  const [formImage, setFormImage] = useState(null);
  const [editFormData, setEditFormData] = useState(null);
  const [formId, setFormId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
      setIsLoading(true);
      const { data, status } = await axios.get("/api/forms/admin-get-form", {
        params: { id: e.target.value },
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
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const onClickRedirect = async (e) => {
    history.push("/forms/" + e.target.value);
  };

  const onDelete = async (e) => {
    try {
      setIsLoading(true);
      if (window.confirm("Are you sure you want to delete this?")) {
        await axios.post("/api/forms/post-delete-form", {
          id: e.target.value,
        });
        getFormListFromDatabase();
      }
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const onPublish = async (e) => {
    try {
      setIsLoading(true);
      const id = e.target.value;
      const formData = formList.find((form) => form.id === id);
      await axios.post("/api/forms/post-update-form", {
        id: id,
        formToSave: { isPublished: !formData.isPublished },
      });
      getFormListFromDatabase();
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const onDownload = async (e) => {
    setIsOpen(true);
    setFormId(e.target.value);
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
      const { data, status } = await axios.get("/api/forms/admin-get-form");
      if (status !== 200) {
        throw Error("Something went wrong with the request");
      }
      setFormList(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container maxW="container.lg" pt={10}>
      <FormDataDownloader
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        formId={formId}
      />
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
              <Box p="5" mb="2" borderRadius="lg" borderWidth="1px">
                <Text mb="3">
                  {" "}
                  <Badge colorScheme={formItem.isPublished ? "green" : "red"}>
                    {formItem.isPublished ? "LIVE" : "PRIVATE"}
                  </Badge>{" "}
                  {formItem.formName}
                </Text>
                <Stack direction={["column", "row"]} spacing={1}>
                  <Button
                    colorScheme="teal"
                    onClick={onEdit}
                    value={formItem.id}
                    isLoading={isLoading}
                  >
                    Edit
                  </Button>
                  <Button
                    colorScheme="teal"
                    onClick={onPublish}
                    value={formItem.id}
                    isLoading={isLoading}
                  >
                    {formItem.isPublished ? "Unpublish" : "Publish"}
                  </Button>
                  <Button
                    colorScheme="teal"
                    onClick={onClickRedirect}
                    value={formItem.id}
                  >
                    Public Link
                  </Button>
                  <Button
                    colorScheme="teal"
                    onClick={onDownload}
                    value={formItem.id}
                  >
                    Download Data
                  </Button>
                  <Button
                    colorScheme="red"
                    onClick={onDelete}
                    value={formItem.id}
                    isLoading={isLoading}
                  >
                    Delete
                  </Button>
                </Stack>
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
