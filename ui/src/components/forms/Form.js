import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { camelize, sentencize } from "../helpers/formsHelpers";
import { useSelector, useDispatch } from "react-redux";
import { signin } from "../../reducers/userSlice";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Button,
  Input,
  Heading,
  Box,
  Text,
  Image,
  Textarea,
  Checkbox,
  Select,
  RadioGroup,
  Radio,
  Stack,
  Center,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  VStack,
} from "@chakra-ui/react";

const Form = (props) => {
  const { formId, formName, formDescription, formImage, formData } = props;
  const { register, handleSubmit, control, formState, setValue } = useForm();
  const { errors } = formState;
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [submissionData, setSubmissionData] = useState(null);
  const [submitStatus, setSubmitStatus] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const temporaryLogin = async () => {
    try {
      // const { data } = await axios.post("/api/auth/signup", {
      //   emailAddress: "ghost@test.com",
      //   password: "testing",
      //   fullName: "Simon Riley",
      //   nationality: "British",
      //   lifestage: "Focus",
      //   phoneNumber: "123124124",
      // });
      // console.log(data);

      const { data } = await axios.post("/api/auth/login", {
        emailAddress: "ghost@test.com",
        password: "testing",
      });
      dispatch(signin(data));
      console.log(user);
    } catch (err) {
      console.log(err);
    }
  };

  const onModalClose = (e) => {
    setModalOpen(false);
  };

  // Handle a form submission event
  const handleSubmitForm = (data, e) => {
    console.log(user.id);
    if (formId) setSubmissionData(data);
    else console.log("this form doesn't support submission");
  };

  const postSubmission = async (formId, data, userId) => {
    if (!userId) return;
    setSubmitStatus(true);
    try {
      const { status } = await axios.post("/api/forms/post-create-submission", {
        formId: formId,
        submissionData: data,
        userId: userId,
      });
      if (status === 200) setModalOpen(true);
    } catch (err) {
      console.log(err);
    }
    setSubmitStatus(false);
  };

  useEffect(() => {
    if (submissionData) {
      postSubmission(formId, submissionData, user.id);
    } else if (!submissionData && user.id && formData.length > 0) {
      if (formData[0].fieldType === "prefill") {
        formData[0].options.forEach((field) => {
          setValue(field, user[field]);
        });
      }
    }
  }, [submissionData, formId, user, formData, setValue]);

  // Custom changes for prefill form fields
  const createPrefillFormFields = (fieldData) => {
    if (!fieldData) return;
    let fieldType = fieldData.fieldType;

    if (fieldType !== "prefill") return;

    let opts = fieldData.options;
    let result = [];
    result.push(
      <Heading key="personalInfoHeading" as="h3" mb="2" size="md">
        Personal Information
      </Heading>
    );

    opts.forEach((fieldName) => {
      // Generate a label
      let label = (
        <FormLabel key={fieldName + "label"} id={fieldName + "label"}>
          {sentencize(fieldName)}{" "}
          <Text key={fieldName + "alert"} as="span" color="red">
            *
          </Text>
        </FormLabel>
      );

      // Generate the field itself
      let field = null;
      if (fieldName === "address") {
        field = (
          <Textarea
            key={fieldName}
            {...register(fieldName, { required: true })}
          />
        );
      } else {
        field = createGeneralInputField(fieldName, "text", { required: true });
      }

      // Generate validation errors
      let error = createErrorNotifier(fieldName);

      result.push(
        <FormControl
          key={fieldName + "Controller"}
          isInvalid={errors[fieldName]}
        >
          {label}
          {field}
          {error}
        </FormControl>
      );
    });

    return result;
  };

  // Helper function to create the input fields
  const createFormField = (fieldData) => {
    let fieldName = fieldData.fieldName;
    let fieldType = fieldData.fieldType;
    let opts = fieldData.options;
    let required = fieldData.required;

    let inputField = [];

    switch (fieldType) {
      case "prefill":
        break;
      case "select":
        let items = [];

        opts.map((option) => {
          let o = (
            <option
              key={fieldName + option}
              id={camelize(fieldName + option)}
              value={option}
            >
              {" "}
              {option}{" "}
            </option>
          );
          items.push(o);
          return o;
        });

        inputField.push(
          <Select
            id={camelize(fieldName)}
            key={fieldName}
            {...register(fieldName, { required: required })}
          >
            {" "}
            {items}{" "}
          </Select>
        );
        break;
      case "radio":
        let radioOptions = [];
        opts.map((option) => {
          let o = (
            <Radio
              id={camelize(fieldName + option)}
              key={fieldName + option}
              {...register(fieldName, { required: required })}
              type="radio"
              value={option}
            >
              {option}
            </Radio>
          );
          radioOptions.push(o);
          return true;
        });
        inputField.push(
          <Controller
            key={fieldName}
            control={control}
            name={camelize(fieldName)}
            render={({ field: { onChange } }) => (
              <RadioGroup onChange={onChange}>
                <Stack direction="row">{radioOptions}</Stack>
              </RadioGroup>
            )}
          />
        );
        break;
      case "textarea":
        inputField.push(
          <Textarea
            id={camelize(fieldName)}
            key={fieldName}
            {...register(fieldName, { required: required })}
          />
        );
        break;
      case "header":
        inputField.push(
          <Heading key={fieldName} as="h3" size="md">
            {fieldName}
          </Heading>
        );
        break;
      case "checkbox":
        inputField.push(<Checkbox key={fieldName}>{fieldName}</Checkbox>);
        break;
      default:
        inputField.push(
          createGeneralInputField(fieldName, fieldType, { required: required })
        );
        break;
    }

    if (required === true) {
      inputField.push(createErrorNotifier(fieldName));
    }

    return inputField;
  };

  const createGeneralInputField = (fieldName, fieldType, validation) => {
    return (
      <Input
        key={fieldName}
        type={fieldType}
        {...register(fieldName, validation)}
      />
    );
  };

  const createErrorNotifier = (fieldName) => {
    return (
      <FormErrorMessage key={fieldName + "errorMessage"}>
        {errors[fieldName] && "This field is required"}
      </FormErrorMessage>
    );
  };

  return (
    <Box mt="12" mb="12">
      <Modal isOpen={modalOpen} onClose={onModalClose}>
        <ModalOverlay />
        <ModalContent borderRadius="20">
          <VStack>
            <Text
              color="#79B71A"
              fontSize="2xl"
              fontWeight="700"
              mt={6}
              flex={1}
            >
              Submitted successfully
            </Text>
            <Box flex={4}>
              <Image src={process.env.PUBLIC_URL + "/big-green-check.png"} />
            </Box>
          </VStack>
          <ModalFooter />
        </ModalContent>
      </Modal>

      {!user.id && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>You aren't logged in!</AlertTitle>
          <AlertDescription>
            You need to sign in before you can fill in this form
          </AlertDescription>
        </Alert>
      )}
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        {formImage !== "" && (
          <Image
            key="formImage"
            boxSize="100%"
            objectFit="cover"
            mb=""
            src={formImage}
          />
        )}
        <Heading
          key="formName"
          fontWeight="bold"
          mt="6"
          textAlign="center"
          as="h1"
          size="xl"
        >
          {formName}
        </Heading>
        <Text key="formDescription" textAlign="center" mb="8">
          {formDescription}
        </Text>
        <Stack direction="column" spacing={5}>
          {formData && createPrefillFormFields(formData[0])}
          {formData.map((fieldData, i) => (
            <FormControl
              key={fieldData.fieldName + i}
              isInvalid={errors[fieldData.fieldName]}
            >
              {!["header", "prefill", "checkbox"].includes(
                fieldData.fieldType
              ) && (
                <FormLabel
                  key={fieldData.fieldName + "label"}
                  id={camelize(fieldData.fieldName + "label")}
                >
                  {fieldData.fieldName}{" "}
                  {fieldData.required && (
                    <Text
                      key={fieldData.fieldName + "alert"}
                      as="span"
                      color="red"
                    >
                      *
                    </Text>
                  )}
                </FormLabel>
              )}
              {createFormField(fieldData)}
              {fieldData.fieldDescription !== "" && (
                <FormHelperText
                  key={fieldData.fieldName + "description"}
                  id={camelize(fieldData.fieldName + "description")}
                >
                  {fieldData.fieldDescription}
                </FormHelperText>
              )}
            </FormControl>
          ))}
        </Stack>
        <Center>
          <Button
            mt={4}
            width="25%"
            variant="outline"
            colorScheme="blackAlpha"
            type="submit"
            isLoading={submitStatus}
            loadingText="Submitting"
          >
            Submit
          </Button>
        </Center>
      </form>
      <Button onClick={temporaryLogin}>LOGIN</Button>
    </Box>
  );
};

export default Form;
