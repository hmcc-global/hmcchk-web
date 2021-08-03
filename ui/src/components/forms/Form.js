import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
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
  const {
    formId,
    formName,
    formDescription,
    formImage,
    formData,
    submitHandler,
  } = props;
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
  }, submissionData);

  // String conversion tools
  const camelize = (str) => {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
      })
      .replace(/\s+/g, "");
  };

  function sentencize(str) {
    return str
      .split(/([A-Z]|\d)/)
      .map((v, i, arr) => {
        // If first block then capitalise 1st letter regardless
        if (!i) return v.charAt(0).toUpperCase() + v.slice(1);
        // Skip empty blocks
        if (!v) return v;
        // Underscore substitution
        if (v === "_") return " ";
        // We have a capital or number
        if (v.length === 1 && v === v.toUpperCase()) {
          const previousCapital = !arr[i - 1] || arr[i - 1] === "_";
          const nextWord =
            i + 1 < arr.length && arr[i + 1] && arr[i + 1] !== "_";
          const nextTwoCapitalsOrEndOfString =
            i + 3 > arr.length || (!arr[i + 1] && !arr[i + 3]);
          // Insert space
          if (!previousCapital || nextWord) v = " " + v;
          // Start of word or single letter word
          if (nextWord || (!previousCapital && !nextTwoCapitalsOrEndOfString))
            v = v.toLowerCase();
        }
        return v;
      })
      .join("");
  }

  // Helper function to create the input fields
  const createFormField = (fieldData) => {
    let fieldName = fieldData.fieldName;
    let fieldType = fieldData.fieldType;
    let opts = fieldData.options;
    let required = fieldData.required;

    let inputField = [];

    if (fieldType === "prefill") {
      return;
    } else if (fieldType === "select") {
      let items = [];

      opts.map((option) => {
        let o = (
          <option id={camelize(fieldName + option)} value={option}>
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
          {...register(fieldName, { required: required })}
        >
          {" "}
          {items}{" "}
        </Select>
      );
    } else if (fieldType === "radio") {
      let radioOptions = [];
      opts.map((option) => {
        let o = (
          <Radio
            id={camelize(fieldName + option)}
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
          control={control}
          name={camelize(fieldName)}
          render={({ field: { onChange } }) => (
            <RadioGroup onChange={onChange}>
              <Stack direction="row">{radioOptions}</Stack>
            </RadioGroup>
          )}
        />
      );
    } else if (fieldType === "textarea") {
      inputField.push(
        <Textarea
          id={camelize(fieldName)}
          {...register(fieldName, { required: required })}
        />
      );
    } else if (fieldType === "header") {
      inputField.push(
        <Heading as="h3" size="md">
          {fieldName}
        </Heading>
      );
    } else if (fieldType === "checkbox") {
      inputField.push(<Checkbox>{fieldName}</Checkbox>);
    } else {
      inputField.push(
        createGeneralInputField(fieldName, fieldType, { required: required })
      );
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
      <Heading as="h3" mb="2" size="md">
        Personal Information
      </Heading>
    );

    opts.forEach((fieldName) => {
      // Generate a label
      let label = (
        <FormLabel id={fieldName + "label"}>
          {sentencize(fieldName)}{" "}
          <Text as="span" color="red">
            *
          </Text>
        </FormLabel>
      );

      // Generate the field itself
      let field = null;
      if (fieldName === "address") {
        field = (
          <Textarea
            key={camelize(fieldName)}
            {...register(fieldName, { required: true })}
          />
        );
      } else {
        field = createGeneralInputField(fieldName, "text", { required: true });
      }

      // Generate validation errors
      let error = createErrorNotifier(fieldName);

      result.push(
        <FormControl isInvalid={errors[fieldName]}>
          {label}
          {field}
          {error}
        </FormControl>
      );
    });

    return result;
  };

  const createErrorNotifier = (fieldName) => {
    // let errorElement = sentencize(fieldName) + " is required";
    // console.log(errors[fieldName], fieldName);
    return (
      <FormErrorMessage>
        {errors[fieldName] && "This field is required"}
      </FormErrorMessage>
    );
  };

  const createGeneralInputField = (fieldName, fieldType, validation) => {
    return (
      <Input
        key={camelize(fieldName)}
        type={fieldType}
        {...register(fieldName, validation)}
      />
    );
  };

  return (
    <Box color="white">
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        {formImage !== "" && (
          <Image boxSize="100%" objectFit="cover" src={formImage} />
        )}
        <Heading textAlign="center" as="h1" size="xl">
          {formName}
        </Heading>
        <Text textAlign="center" mb="4">
          {formDescription}
        </Text>
        <Stack direction="column" spacing={5}>
          {formData && createPrefillFormFields(formData[0])}
          {formData.map((fieldData, i) => (
            <FormControl
              // mt={5}
              key={fieldData.fieldName + i}
              isInvalid={errors[fieldData.fieldName]}
            >
              {!["header", "prefill", "checkbox"].includes(
                fieldData.fieldType
              ) && (
                <FormLabel id={camelize(fieldData.fieldName + "label")}>
                  {fieldData.fieldName}{" "}
                  {fieldData.required && (
                    <Text as="span" color="red">
                      *
                    </Text>
                  )}
                </FormLabel>
              )}
              {createFormField(fieldData)}
              {fieldData.fieldDescription !== "" && (
                <FormHelperText
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
            colorScheme="whiteAlpha"
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
