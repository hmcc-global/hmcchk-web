import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { customAxios as axios } from '../helpers/customAxios';
import { camelize, sentencize } from '../helpers/formsHelpers';
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
  ministryTeamList,
} from '../helpers/lists';

const Form = (props) => {
  const { formId, formName, formDescription, formImage, formFields } = props;
  const { register, handleSubmit, control, formState, setValue } = useForm();
  const { errors } = formState;
  const { user, history } = props;

  const [submissionData, setSubmissionData] = useState(null);
  const [submitStatus, setSubmitStatus] = useState(false);

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
    // Set flag to true to prevent double submission
    setSubmitStatus(true);
    try {
      const { status } = await axios.post('/api/forms/post-create-submission', {
        formId: formId,
        submissionData: data,
        userId: userId,
      });
      if (status === 200) {
        history.push({
          pathname: '/form-success',
          state: { formName },
        });
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
      for (let field of formFields) {
        if (field.fieldType === 'prefill') {
          if (field.fieldName === 'address' && user['address']) {
            setValue('addressFloor', user['address']['floor']);
            setValue('addressFlat', user['address']['flat']);
            setValue('addressStreet', user['address']['street']);
            setValue('addressDistrict', user['address']['district']);
            setValue('addressRegion', user['address']['region']);
          } else if (
            field.fieldName === 'lifeGroup' &&
            !lifegroupList.includes(user['lifeGroup'])
          ) {
            setValue(field.fieldName, '');
          } else {
            setValue(field.fieldName, user[field.fieldName]);
          }
        }
      }
    }
  }, [submissionData, formId, user, formFields, setValue]);

  // Custom changes for prefill form fields
  const createPrefillFormField = (fieldData) => {
    if (!fieldData) return;
    let fieldType = fieldData.fieldType;
    let fieldName = fieldData.fieldName;

    if (fieldType !== 'prefill') return;

    // Generate a label
    let label = (
      <FormLabel key={fieldName + 'label'} id={fieldName + 'label'}>
        {fieldName === 'lifeGroup' ? 'LIFE Group' : sentencize(fieldName)}
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
      case 'ministryTeam':
        field = (
          <Select {...register('ministryTeam', { required: true })}>
            {ministryTeamList.map((item) => {
              return <option key={'mt' + item}>{item}</option>;
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
      case 'birthday':
        field = (
          <Input
            type="date"
            key={fieldName}
            {...register(fieldName, {
              required: true,
            })}
          />
        );
        break;
      case 'email':
        field = (
          <Input
            key={fieldName}
            {...register(fieldName, {
              required: true,
              pattern:
                /(?!.*hmcc.net)(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
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
      return (
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
    } else if (fieldName === 'email') {
      return (
        <FormControl
          key={fieldName + 'Controller'}
          isInvalid={errors[fieldName]}
        >
          {label}
          {field}
          <FormHelperText>Please don't use your HMCC email</FormHelperText>
          {error}
        </FormControl>
      );
    } else {
      return (
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
  };

  const createFormField = (fieldData, i) => {
    return (
      <FormControl
        key={fieldData.fieldName + i}
        isInvalid={errors[fieldData.fieldName]}
      >
        {!['header', 'prefill', 'checkbox'].includes(fieldData.fieldType) && (
          <FormLabel
            key={fieldData.fieldName + 'label'}
            id={camelize(fieldData.fieldName + 'label')}
          >
            {fieldData.fieldName}{' '}
            {fieldData.required && (
              <Text key={fieldData.fieldName + 'alert'} as="span" color="red">
                *
              </Text>
            )}
          </FormLabel>
        )}
        {createFormInput(fieldData)}
        {fieldData.fieldDescription !== '' && (
          <FormHelperText
            key={fieldData.fieldName + 'description'}
            id={camelize(fieldData.fieldName + 'description')}
          >
            {fieldData.fieldDescription}
          </FormHelperText>
        )}
      </FormControl>
    );
  };

  // Helper function to create the input fields
  const createFormInput = (fieldData) => {
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
            placeholder="Select option"
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
              key={fieldName + option}
              type="radio"
              value={option}
              {...register(fieldName, { required: required })}
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
          {/* If there is a prefill field, create it's heading */}
          {formFields &&
            formFields.length > 1 &&
            formFields[0].fieldType === 'prefill'}
          {
            <Heading key="personalInfoHeading" as="h3" mb="2" size="md">
              Personal Information
            </Heading>
          }
          {/* Generate the fields */}
          {formFields.map((fieldData, i) => {
            if (fieldData.fieldType === 'prefill') {
              return createPrefillFormField(fieldData);
            } else {
              return createFormField(fieldData, i);
            }
          })}
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
