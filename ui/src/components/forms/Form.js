import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { customAxios as axios } from '../helpers/customAxios';
import { camelize, sentencize } from '../helpers/formsHelpers';
import { CheckCircleIcon } from '@chakra-ui/icons';
import ReactMarkdown from 'react-markdown';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';

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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  VStack,
  Alert,
  AlertIcon,
  Link,
} from '@chakra-ui/react';
import {
  campusList,
  countryList,
  districtList,
  lifegroupList,
  lifestageList,
  regionList,
} from '../helpers/lists';

const Form = (props) => {
  const { formId, formName, formDescription, formImage, formFields } = props;
  const { register, handleSubmit, control, formState, setValue } = useForm();
  const { errors } = formState;
  const { user, history } = props;

  const [submissionData, setSubmissionData] = useState(null);
  const [submitStatus, setSubmitStatus] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const onModalClose = (e) => {
    setModalOpen(false);
  };

  // Handle a form submission event
  const handleSubmitForm = (data, e) => {
    let address = {
      flat: data.addressFlat,
      floor: data.addressFloor,
      street: data.addressStreet,
      district: data.addressDistrict,
      region: data.addressRegion,
    };

    let modifiedData = data;
    modifiedData['address'] = address;

    // Sanity check if it's all empty, just delete it
    if (
      !(
        data.addressFlat &&
        data.addressFloor &&
        data.addressStreet &&
        data.addressDistrict &&
        data.addressRegion
      )
    )
      delete modifiedData['address'];

    delete modifiedData['addressFlat'];
    delete modifiedData['addressFloor'];
    delete modifiedData['addressStreet'];
    delete modifiedData['addressDistrict'];
    delete modifiedData['addressRegion'];

    if (formId) setSubmissionData(modifiedData);
    else console.log("this form doesn't support submission");
  };

  const postSubmission = async (formId, data, userId) => {
    const redirectTarget = userId ? '/profile' : '/';
    // Set flag to true to prevent double submission
    setSubmitStatus(true);
    try {
      const { status } = await axios.post('/api/forms/post-create-submission', {
        formId: formId,
        submissionData: data,
        userId: userId,
      });
      if (status === 200) {
        setModalOpen(true);
        setTimeout(() => {
          history.push(redirectTarget);
          setSubmitStatus(false);
        }, 3000);
      }
    } catch (err) {
      console.log(err);
      setSubmitStatus(false);
    }
  };

  useEffect(() => {
    if (submissionData) {
      postSubmission(formId, submissionData, user.id);
    } else if (!submissionData && user.id && formFields.length > 0) {
      if (formFields[0].fieldType === 'prefill') {
        formFields[0].options.forEach((field) => {
          if (field === 'address' && user['address']) {
            setValue('addressFloor', user['address']['floor']);
            setValue('addressFlat', user['address']['flat']);
            setValue('addressStreet', user['address']['street']);
            setValue('addressDistrict', user['address']['district']);
            setValue('addressRegion', user['address']['region']);
          } else {
            setValue(field, user[field]);
          }
        });
      }
    }
  }, [submissionData, formId, user, formFields, setValue]);

  // Custom changes for prefill form fields
  const createPrefillFormFields = (fieldData) => {
    if (!fieldData) return;
    let fieldType = fieldData.fieldType;

    if (fieldType !== 'prefill') return;

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
        <FormLabel key={fieldName + 'label'} id={fieldName + 'label'}>
          {sentencize(fieldName)}
          <Text key={fieldName + 'alert'} as="span" color="red">
            *
          </Text>
        </FormLabel>
      );

      // Generate the field itself
      let field = null;
      switch (fieldName) {
        case 'countryOfOrigin':
          field = (
            <Select
              placeholder="Country of Origin"
              {...register('countryOfOrigin', { required: true })}
            >
              {countryList.map((item) => {
                return <option key={'co' + item}>{item}</option>;
              })}
            </Select>
          );
          break;
        case 'lifestage':
          field = (
            <Select {...register('lifestage', { required: true })}>
              {lifestageList.map((item) => {
                return <option key={'li' + item}>{item}</option>;
              })}
            </Select>
          );
          break;
        case 'campus':
          field = (
            <Select {...register('campus', { required: true })}>
              {campusList.map((item) => {
                return <option key={'ca' + item}>{item}</option>;
              })}
            </Select>
          );
          break;
        case 'lifeGroup':
          field = (
            <Select {...register('lifeGroup', { required: true })}>
              {lifegroupList.map((item) => {
                return <option key={'lg' + item}>{item}</option>;
              })}
            </Select>
          );
          break;
        case 'address':
          field = (
            <Stack direction={'column'}>
              <Stack direction={['column', 'row']} w="100%">
                <Box flex={1}>
                  <Input
                    placeholder="Floor/Level"
                    {...register('addressFloor', { required: true })}
                  />
                </Box>
                <Box flex={1}>
                  <Input
                    placeholder="Room/Flat/Unit/Suite"
                    {...register('addressFlat', { required: true })}
                  />
                </Box>
              </Stack>
              <Stack direction={['column', 'row']} w="100%">
                <Box flex={1}>
                  <Input
                    placeholder="Street Address"
                    {...register('addressStreet', { required: true })}
                  />
                </Box>
                <Box flex={1}>
                  <Select
                    placeholder="District"
                    {...register('addressDistrict', { required: true })}
                  >
                    {districtList.map((item) => {
                      return <option key={'di' + item}>{item}</option>;
                    })}
                  </Select>
                </Box>
              </Stack>
              <Stack direction={['column', 'row']} w="100%">
                <Box flex={1}>
                  <Select
                    placeholder="Region"
                    {...register('addressRegion', { required: true })}
                  >
                    {regionList.map((item) => {
                      return <option key={'re' + item}>{item}</option>;
                    })}
                  </Select>
                </Box>
                <Box flex={1} display={['none', 'flex']}></Box>
              </Stack>
            </Stack>
          );

          break;
        case 'email':
          field = (
            <Input
              key={fieldName}
              {...register(fieldName, {
                required: true,
                pattern: /^\S+@\S+$/i,
              })}
            />
          );
          break;
        default:
          field = createGeneralInputField(fieldName, 'text', {
            required: true,
          });
          break;
      }

      // Generate validation errors
      let error = createErrorNotifier(fieldName);

      if (fieldName === 'address') {
        result.push(
          <FormControl
            key={fieldName + 'Controller'}
            isInvalid={
              errors['addressFloor'] ||
              errors['addressFlat'] ||
              errors['addressStreet'] ||
              errors['addressDistrict'] ||
              errors['addressRegion']
            }
          >
            {label}
            {field}
            <FormErrorMessage key={fieldName + 'errorMessage'}>
              {(errors['addressFloor'] ||
                errors['addressFlat'] ||
                errors['addressStreet'] ||
                errors['addressDistrict'] ||
                errors['addressRegion']) &&
                'Please fill in all of the fields!'}
            </FormErrorMessage>
          </FormControl>
        );
      } else {
        result.push(
          <FormControl
            key={fieldName + 'Controller'}
            isInvalid={errors[fieldName]}
          >
            {label}
            {field}
            {error}
          </FormControl>
        );
      }
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
      case 'prefill':
        break;
      case 'select':
        let items = [];

        opts.map((option) => {
          let o = (
            <option
              key={fieldName + option}
              id={camelize(fieldName + option)}
              value={option}
            >
              {option}
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
            {items}
          </Select>
        );
        break;
      case 'radio':
        let radioOptions = [];
        opts.map((option) => {
          let o = (
            <Radio
              // id={camelize(fieldName + option)}
              key={fieldName + option}
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
            name={fieldName}
            render={({ field: { onChange } }) => (
              <RadioGroup onChange={onChange}>
                <Stack direction="row">{radioOptions}</Stack>
              </RadioGroup>
            )}
          />
        );
        break;
      case 'textarea':
        inputField.push(
          <Textarea
            id={camelize(fieldName)}
            key={fieldName}
            {...register(fieldName, { required: required })}
          />
        );
        break;
      case 'header':
        inputField.push(
          <Heading key={fieldName} as="h3" size="md">
            {fieldName}
          </Heading>
        );
        break;
      case 'checkbox':
        inputField.push(
          <Controller
            control={control}
            name={fieldName}
            key={fieldName}
            defaultValue={false}
            render={({ field: { onChange, value, ref } }) => (
              <Checkbox onChange={onChange} ref={ref} isChecked={value}>
                {fieldName}
              </Checkbox>
            )}
          />
        );
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
      <FormErrorMessage key={fieldName + 'errorMessage'}>
        {errors[fieldName] && 'Please fill in this field correctly'}
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
              p={5}
              textAlign="center"
            >
              Submitted successfully, redirecting you soon.
            </Text>
            <Box flex={4}>
              <Center w="100%" h="100%">
                <CheckCircleIcon mt={5} w="70%" h="70%" color="#79B71A" />
              </Center>
            </Box>
          </VStack>
          <ModalFooter />
        </ModalContent>
      </Modal>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        {formImage !== '' && (
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
        <Box key="formDescription" textAlign="justify" mb="8">
          <ReactMarkdown
            components={ChakraUIRenderer()}
            children={formDescription}
            skipHtml
          />
        </Box>
        <Stack direction="column" spacing={4}>
          {formFields && createPrefillFormFields(formFields[0])}
          {formFields
            .filter((fieldData) => {
              if (fieldData.fieldType === 'prefill') return false;
              else return true;
            })
            .map((fieldData, i) => (
              <FormControl
                key={fieldData.fieldName + i}
                isInvalid={errors[fieldData.fieldName]}
              >
                {!['header', 'prefill', 'checkbox'].includes(
                  fieldData.fieldType
                ) && (
                  <FormLabel
                    key={fieldData.fieldName + 'label'}
                    id={camelize(fieldData.fieldName + 'label')}
                  >
                    {fieldData.fieldName}{' '}
                    {fieldData.required && (
                      <Text
                        key={fieldData.fieldName + 'alert'}
                        as="span"
                        color="red"
                      >
                        *
                      </Text>
                    )}
                  </FormLabel>
                )}
                {createFormField(fieldData)}
                {fieldData.fieldDescription !== '' && (
                  <FormHelperText
                    key={fieldData.fieldName + 'description'}
                    id={camelize(fieldData.fieldName + 'description')}
                  >
                    {fieldData.fieldDescription}
                  </FormHelperText>
                )}
              </FormControl>
            ))}
        </Stack>
        {!user.id && (
          <Alert status="info" mt={4}>
            <AlertIcon />
            <Text>
              This form submission will be a one-off entry. However, if you want
              an auto-fill feature to be enabled for you for this and all future
              church event forms,{' '}
              <Link href="/login">
                you can create an HMCC account right over here
              </Link>
            </Text>
          </Alert>
        )}
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
    </Box>
  );
};

export default Form;
