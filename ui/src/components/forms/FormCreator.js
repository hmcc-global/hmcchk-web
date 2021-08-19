import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { customAxios as axios } from "../helpers/customAxios";
import Form from "./Form";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Button,
  Input,
  Checkbox,
  Heading,
  Text,
  Box,
  Select,
  ButtonGroup,
} from "@chakra-ui/react";

const FormCreator = (props) => {
  const { user } = props;
  const {
    formName,
    formDescription,
    formImage,
    existingFormData,
    resetFormEditorCallback,
  } = props;
  const [formData, setFormData] = useState([]);
  const [editData, setEditData] = useState(null);
  const [saveStatus, setSaveStatus] = useState(false);
  const {
    register,
    reset,
    watch,
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const {
    setValue: setValuePrefill,
    handleSubmit: handleSubmitPrefill,
    control: controlPrefill,
  } = useForm();

  useEffect(() => {
    if (existingFormData) {
      if (existingFormData.formFields[0].fieldType === "prefill") {
        let fields = existingFormData.formFields[0].options;
        fields.forEach((field) => {
          setValuePrefill(field + "Checkbox", true);
        });
      }
      setFormData(existingFormData.formFields);
    }
  }, [existingFormData, setValuePrefill]);

  // Handler for prefillable form arguments
  const onPrefillableSubmit = (data, e) => {
    let chosenFields = [];
    for (let [key, value] of Object.entries(data)) {
      if (value) chosenFields.push(key.replace("Checkbox", ""));
    }

    const dataObject = {
      fieldName: "prefill",
      fieldType: "prefill",
      options: chosenFields,
      fieldDescription: "",
      required: true,
    };

    let temp = [...formData];
    try {
      let spliceAmount = temp[0].fieldType === "prefill" ? 1 : 0;
      temp.splice(0, spliceAmount, dataObject);
    } catch (err) {
      temp.push(dataObject);
    }

    setFormData(temp);
  };

  // Handler for new custom field submissions
  const onCustomSubmit = (data, e) => {
    // Format the data
    if (data.options) {
      data.options = data.options.split(";");
    }
    let temp = [...formData];

    if (editData) {
      temp.splice(editData, 1, data);
      setEditData(null);
    } else {
      temp.push(data);
    }
    setFormData(temp);

    reset();
  };

  // Handler for field data edits
  const onEdit = (e) => {
    const temp = formData[e.target.value];
    setEditData(e.target.value);
    setValue("fieldName", temp.fieldName);
    setValue("fieldType", temp.fieldType);
    setValue("fieldDescription", temp.fieldDescription);
    if (temp.options) {
      setValue("options", temp.options.join(";"));
    }
    setValue("required", temp.required);
  };

  // Handler for deletion of field data
  const onDelete = (e) => {
    if (editData) {
      alert("Cannot delete while editing");
    } else {
      if (window.confirm("Are you sure you want to delete this?")) {
        let temp = [...formData];
        temp.splice(e.target.value, 1);
        setFormData(temp);
      }
    }
  };

  // Write form data to DB
  const saveFormToDB = async (formToSave) => {
    if (existingFormData) {
      const { status } = await axios.post("/api/forms/post-update-form", {
        id: existingFormData.id,
        formToSave: formToSave,
      });

      return status;
    } else {
      const { status } = await axios.post("/api/forms/post-create-form", {
        formToSave: formToSave,
      });

      return status;
    }
  };

  const onSaveToDB = async (e) => {
    setSaveStatus(true);
    try {
      let formToSave = {
        formName: formName,
        formDescription: formDescription,
        formImage: formImage,
        formFields: formData,
      };
      const statusCode = await saveFormToDB(formToSave);
      if (statusCode === 200) {
        setSaveStatus(false);
        resetFormEditorCallback(formName);
      }
    } catch (err) {
      setSaveStatus(false);
      console.log(err);
    }
  };

  // Watch this to conditionally render custom things
  const ft = watch("fieldType");

  return (
    <Box borderRadius="lg" p="5" mt="3" borderWidth="1px">
      <Heading as="h1" size="xl">
        Form Editor
      </Heading>
      <Text>Creating/Editing form {formName}</Text>
      <Box mt="3" mb="3">
        <form onSubmit={handleSubmitPrefill(onPrefillableSubmit)}>
          <Heading as="h3" size="md">
            Prefillable Fields
          </Heading>
          <FormControl>
            <Controller
              control={controlPrefill}
              name="fullNameCheckbox"
              key="fullNameCheckbox"
              defaultValue={false}
              render={({ field: { onChange, value, ref } }) => (
                <Checkbox onChange={onChange} ref={ref} isChecked={value}>
                  Full Name
                </Checkbox>
              )}
            />
          </FormControl>
          <FormControl>
            <Controller
              control={controlPrefill}
              name="phoneNumberCheckbox"
              key="phoneNumberCheckbox"
              defaultValue={false}
              render={({ field: { onChange, value, ref } }) => (
                <Checkbox onChange={onChange} ref={ref} isChecked={value}>
                  Phone Number
                </Checkbox>
              )}
            />
          </FormControl>
          <FormControl>
            <Controller
              control={controlPrefill}
              name="emailCheckbox"
              key="emailCheckbox"
              defaultValue={false}
              render={({ field: { onChange, value, ref } }) => (
                <Checkbox onChange={onChange} ref={ref} isChecked={value}>
                  Email
                </Checkbox>
              )}
            />
          </FormControl>
          <FormControl>
            <Controller
              control={controlPrefill}
              name="addressCheckbox"
              key="addressCheckbox"
              defaultValue={false}
              render={({ field: { onChange, value, ref } }) => (
                <Checkbox onChange={onChange} ref={ref} isChecked={value}>
                  Address
                </Checkbox>
              )}
            />
          </FormControl>
          <FormControl>
            <Controller
              control={controlPrefill}
              name="countryOfOriginCheckbox"
              key="countryOfOriginCheckbox"
              defaultValue={false}
              render={({ field: { onChange, value, ref } }) => (
                <Checkbox onChange={onChange} ref={ref} isChecked={value}>
                  Country of Origin
                </Checkbox>
              )}
            />
          </FormControl>
          <FormControl>
            <Controller
              control={controlPrefill}
              name="lifeGroupCheckbox"
              key="lifeGroupCheckbox"
              defaultValue={false}
              render={({ field: { onChange, value, ref } }) => (
                <Checkbox onChange={onChange} ref={ref} isChecked={value}>
                  LIFE Group
                </Checkbox>
              )}
            />
          </FormControl>
          <Button mt={4} colorScheme="teal" type="submit">
            Save Prefilled Fields
          </Button>
        </form>
      </Box>

      <Box mt="3" mb="3">
        <form onSubmit={handleSubmit(onCustomSubmit)}>
          <Heading as="h3" size="md">
            Custom Fields
          </Heading>
          {editData && (
            <Text>
              Currently editing field: {formData[editData].fieldName}{" "}
            </Text>
          )}
          <FormControl isInvalid={errors["fieldName"]}>
            <FormLabel>
              {ft === "header" ? "Header Text" : "Field Name"}
            </FormLabel>
            <Input {...register("fieldName", { required: true })} />
            <FormErrorMessage>
              {errors["fieldName"] && "Field name is required"}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors["fieldType"]}>
            <FormLabel>Field Type</FormLabel>
            <Select {...register("fieldType", { required: true })}>
              <option value="text">Text</option>
              <option value="select">Select</option>
              <option value="checkbox">Checkbox</option>
              <option value="radio">Radio</option>
              <option value="textarea">Text Area</option>
              <option value="date">Datepicker</option>
              <option value="header">Header</option>
            </Select>
            <FormErrorMessage>
              {errors["fieldType"] && "Field type is required"}
            </FormErrorMessage>
          </FormControl>
          <FormControl>
            <FormLabel>
              Field Description (describe what this field is for)
            </FormLabel>
            <Input {...register("fieldDescription")} />
            <FormHelperText>Leave blank if not needed</FormHelperText>
          </FormControl>
          {(ft === "select" || ft === "radio") && (
            <FormControl>
              <FormLabel>Options</FormLabel>
              <Input id="options" {...register("options")} />
              <FormHelperText htmlFor="options">
                Enter options separated by ;
              </FormHelperText>
            </FormControl>
          )}
          {ft !== "header" && (
            <FormControl>
              <FormLabel>Do you want this field to be required?</FormLabel>
              <Controller
                control={control}
                name="required"
                key="required"
                defaultValue={false}
                render={({ field: { onChange, value, ref } }) => (
                  <Checkbox onChange={onChange} ref={ref} isChecked={value}>
                    Required
                  </Checkbox>
                )}
              />
            </FormControl>
          )}
          <Button mt={4} colorScheme="teal" type="submit">
            Save Field Data
          </Button>
        </form>
      </Box>

      <Box mt="3" mb="3">
        <Heading as="h3" size="md">
          Created Form Fields
        </Heading>
        {formData
          .filter((obj) => {
            if (obj.fieldType === "prefill") {
              return false;
            } else {
              return obj;
            }
          })
          .map((fieldData, i) => (
            <FormControl key={fieldData.fieldName}>
              {fieldData.fieldName}
              <ButtonGroup ml={4} colorScheme="teal">
                <Button mt={4} value={i + 1} onClick={onEdit}>
                  Edit
                </Button>
                <Button mt={4} onClick={onDelete}>
                  Delete
                </Button>
              </ButtonGroup>
            </FormControl>
          ))}
        <Button
          isLoading={saveStatus}
          loadingText="Saving"
          mt={4}
          colorScheme="teal"
          onClick={onSaveToDB}
        >
          Save to DB
        </Button>
      </Box>

      <Heading as="h2" size="lg">
        Form Preview
      </Heading>
      <Form
        formId={null}
        formName={formName}
        formDescription={formDescription}
        formImage={formImage}
        formData={formData}
        user={user}
      />
    </Box>
  );
};

export default FormCreator;
