import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { camelize, sentencize } from "../helpers/formsHelpers";
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
} from "@chakra-ui/react";

const Form = (props) => {
  const { formId, formName, formDescription, formImage, formData } = props;
  const { register, handleSubmit, control, formState } = useForm();
  const { errors } = formState;

  const [submissionData, setSubmissionData] = useState(null);

  // Handle a form submission event
  const handleSubmitForm = (data, e) => {
    console.log(data);
    if (formId) setSubmissionData(data);
    else console.log("this form doesn't support submission");
  };

  const postSubmission = async (formId, data, userId) => {
    try {
      const { status } = await axios.post("/api/forms/post-create-submission", {
        formId: formId,
        submissionData: data,
        userId: userId,
      });
      if (status === 200) {
        alert("Submission successful");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (submissionData) {
      postSubmission(formId, submissionData, "");
    }
  }, [submissionData, formId]);

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

  const createErrorNotifier = (fieldName) => {
    return (
      <FormErrorMessage key={fieldName + "errorMessage"}>
        {errors[fieldName] && "This field is required"}
      </FormErrorMessage>
    );
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

  return (
    <Box mt="12" mb="12">
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
          >
            Submit
          </Button>
        </Center>
      </form>
    </Box>
  );
};

export default Form;
