import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { customAxios as axios } from '../helpers/customAxios';
import Form from './Form';
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
  Flex,
  Stack,
  UnorderedList,
  ListItem,
  Center,
} from '@chakra-ui/react';

const FormEditor = (props) => {
  const { user } = props;
  const { formInformation, existingFormFieldsData, resetFormEditorCallback } =
    props;
  const [formFields, setFormFields] = useState([]);
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

  const prefillableField = [
    ['fullNameCheckbox', 'Full Name'],
    ['phoneNumberCheckbox', 'Phone Number'],
    ['emailCheckbox', 'Email'],
    ['addressCheckbox', 'Address'],
    ['countryOfOriginCheckbox', 'Country of Origin'],
    ['birthdayCheckbox', 'Birthday'],
    ['campusCheckbox', 'Campus'],
    ['lifestageCheckbox', 'Lifestage'],
    ['lifeGroupCheckbox', 'LIFE Group'],
    ['ministryTeamCheckbox', 'Ministry Team'],
  ];

  // Handler for prefillable form arguments
  const onPrefillableSubmit = (data) => {
    let chosenFields = [];
    for (let [key, value] of Object.entries(data)) {
      if (value) chosenFields.push(key.replace('Checkbox', ''));
    }

    const dataObject = {
      fieldName: 'prefill',
      fieldType: 'prefill',
      options: chosenFields,
      fieldDescription: '',
      required: true,
    };

    let temp = [...formFields];
    try {
      let spliceAmount = temp[0].fieldType === 'prefill' ? 1 : 0;
      temp.splice(0, spliceAmount, dataObject);
    } catch (err) {
      temp.push(dataObject);
    }

    setFormFields(temp);
  };

  // Handler for new custom field submissions
  const onCustomSubmit = (data) => {
    // Format the data
    data.fieldName = data.fieldName.trim();
    if (data.options) {
      data.options = data.options.split(';');
    }
    let temp = [...formFields];

    if (editData) {
      temp.splice(editData, 1, data);
      setEditData(null);
    } else {
      temp.push(data);
    }
    setFormFields(temp);

    reset();
  };

  // Handler for field data edits
  const onEdit = (e) => {
    const temp = formFields[e.target.value];
    setEditData(e.target.value);
    setValue('fieldName', temp.fieldName);
    setValue('fieldType', temp.fieldType);
    setValue('fieldDescription', temp.fieldDescription);
    if (temp.options) {
      setValue('options', temp.options.join(';'));
    }
    setValue('required', temp.required);
  };

  // Handler for deletion of field data
  const onDelete = (e) => {
    if (editData) {
      alert('Cannot delete while editing');
    } else {
      if (window.confirm('Are you sure you want to delete this?')) {
        let temp = [...formFields];
        temp.splice(e.target.value, 1);
        setFormFields(temp);
      }
    }
  };

  // Write form data to DB
  const sendSaveRequestToDB = async (formToSave) => {
    if (existingFormFieldsData) {
      const { status } = await axios.post('/api/forms/post-update-form', {
        id: existingFormFieldsData.id,
        formToSave: formToSave,
      });

      return status;
    } else {
      const { status } = await axios.post('/api/forms/post-create-form', {
        formToSave: formToSave,
      });

      return status;
    }
  };

  // Handler for save to db button click
  const onSaveToDB = async (e) => {
    setSaveStatus(true);
    try {
      let formToSave = {
        formName: formInformation.formName,
        isPaymentRequired: formInformation.isPaymentRequired,
        formDescription: formInformation.formDescription,
        formImage: formInformation.formImage,
        requireLogin: formInformation.requireLogin,
        successEmailTemplate: formInformation.successEmailTemplate,
        customEmailSubject: formInformation.customEmailSubject,
        formAvailableFrom: formInformation.formAvailableFrom,
        formAvailableUntil: formInformation.formAvailableUntil,
        formFields: formFields,
      };

      for (let i = 0; i < formToSave.formFields.length; i++) {
        formToSave.formFields[i].fieldName =
          formToSave.formFields[i].fieldName.trim();
      }

      const statusCode = await sendSaveRequestToDB(formToSave);
      if (statusCode === 200) {
        setSaveStatus(false);
        resetFormEditorCallback();
      }
    } catch (err) {
      setSaveStatus(false);
      console.log(err);
    }
  };

  // Watch this to conditionally render custom things
  const ft = watch('fieldType');

  useEffect(() => {
    if (existingFormFieldsData) {
      if (existingFormFieldsData.formFields[0]?.fieldType === 'prefill') {
        let fields = existingFormFieldsData.formFields[0].options;
        fields.forEach((field) => {
          setValuePrefill(field + 'Checkbox', true);
        });
      }
      setFormFields(existingFormFieldsData.formFields);
    }
  }, [existingFormFieldsData, setValuePrefill, setFormFields]);

  return (
    <Flex
      direction={['column', 'row']}
      borderRadius="lg"
      borderWidth="1px"
      p="3"
    >
      <Stack flex="2" spacing="3" p="3">
        <Heading size="xl">
          Currently editing: {formInformation.formName}
        </Heading>
        <Box>
          <Text>
            Click the green button when you are done. A checklist to keep in
            mind:
          </Text>
          <UnorderedList>
            <ListItem>
              Have you clicked on <b>'Create/Update Form</b>
            </ListItem>
            <ListItem>
              Have you clicked on <b>'Save Prefilled Fields'</b>
            </ListItem>
          </UnorderedList>
        </Box>
        <Button
          isLoading={saveStatus}
          loadingText="Saving"
          mt={4}
          colorScheme="green"
          onClick={onSaveToDB}
        >
          Finalize and save
        </Button>

        <Box>
          <form onSubmit={handleSubmitPrefill(onPrefillableSubmit)}>
            <Heading as="h3" size="md">
              Prefillable Fields
            </Heading>
            {prefillableField.map((fieldInfo, i) => (
              <FormControl>
                <Controller
                  control={controlPrefill}
                  name={fieldInfo[0]}
                  key={fieldInfo[0]}
                  defaultValue={false}
                  render={({ field: { onChange, value, ref } }) => (
                    <Checkbox onChange={onChange} ref={ref} isChecked={value}>
                      {fieldInfo[1]}
                    </Checkbox>
                  )}
                />
              </FormControl>
            ))}
            <Button mt={2} colorScheme="blue" type="submit">
              Save Prefilled Fields
            </Button>
          </form>
        </Box>

        <Box borderRadius="lg" borderWidth="1px" p="3">
          <Heading as="h3" size="md">
            Created Custom Fields
          </Heading>
          {formFields
            .filter((obj) => {
              if (obj.fieldType === 'prefill') {
                return false;
              } else {
                return obj;
              }
            })
            .map((fieldData, i) => (
              <FormControl key={fieldData.fieldName}>
                <Flex p="1">
                  <Center flex="2">{fieldData.fieldName}</Center>
                  <ButtonGroup flex="1" colorScheme="blue">
                    <Button value={i + 1} onClick={onEdit}>
                      Edit
                    </Button>
                    <Button value={i + 1} onClick={onDelete}>
                      Delete
                    </Button>
                  </ButtonGroup>
                </Flex>
              </FormControl>
            ))}
        </Box>

        <Box>
          <form onSubmit={handleSubmit(onCustomSubmit)}>
            <Heading as="h3" size="md" mb="2">
              Custom Field Editor
            </Heading>
            {editData && (
              <Text>
                Currently editing field: {formFields[editData].fieldName}{' '}
              </Text>
            )}
            <FormControl isInvalid={errors['fieldName']}>
              <FormLabel>
                {ft === 'header' ? 'Header Text' : 'Field Name'}
              </FormLabel>
              <Input {...register('fieldName', { required: true })} />
              <FormErrorMessage>
                {errors['fieldName'] && 'Field name is required'}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors['fieldType']}>
              <FormLabel>Field Type</FormLabel>
              <Select {...register('fieldType', { required: true })}>
                <option value="text">Text</option>
                <option value="select">Select</option>
                <option value="checkbox">Checkbox</option>
                <option value="radio">Radio</option>
                <option value="textarea">Text Area</option>
                <option value="date">Datepicker</option>
                <option value="header">Header</option>
              </Select>
              <FormErrorMessage>
                {errors['fieldType'] && 'Field type is required'}
              </FormErrorMessage>
            </FormControl>
            <FormControl>
              <FormLabel>
                Field Description (describe what this field is for)
              </FormLabel>
              <Input {...register('fieldDescription')} />
              <FormHelperText>Leave blank if not needed</FormHelperText>
            </FormControl>
            {(ft === 'select' || ft === 'radio') && (
              <FormControl>
                <FormLabel>Options</FormLabel>
                <Input id="options" {...register('options')} />
                <FormHelperText htmlFor="options">
                  Enter options separated by ;
                </FormHelperText>
              </FormControl>
            )}
            {ft !== 'header' && (
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
            <Button mt={4} colorScheme="blue" type="submit">
              Save Field Data
            </Button>
          </form>
        </Box>
      </Stack>

      <Box flex="3" p="2" borderWidth="1px" borderRadius="lg">
        <Heading size="xl">Form Preview</Heading>
        <Form
          formId={null}
          formName={formInformation.formName}
          formDescription={formInformation.formDescription}
          formImage={formInformation.formImage}
          formFields={formFields}
          user={user}
        />
      </Box>
    </Flex>
  );
};

export default FormEditor;
