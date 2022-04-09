import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { customAxios as axios } from '../helpers/customAxios';
import FormCreator from './FormCreator';
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
  Textarea,
  FormHelperText,
  Switch,
  Select,
} from '@chakra-ui/react';
import FormDataDownloader from './FormDataDownloader';

const FormManager = (props) => {
  const { register, reset, handleSubmit, setValue, control, formState } =
    useForm();

  const [formName, setFormName] = useState(null);
  const [formDescription, setFormDescription] = useState(null);
  const [formImage, setFormImage] = useState(null);
  const [requireLogin, setRequireLogin] = useState(true);
  const [successEmailTemplate, setSuccessEmailTemplate] = useState(null);
  const [customEmailSubject, setCustomEmailSubject] = useState(null);

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

  const setFormManagerElements = (data) => {
    setValue('formName', data.formName);
    setValue('formDescription', data.formDescription);
    setValue('formImage', data.formImage);
    setValue('requireLogin', data.requireLogin);
    setValue('successEmailTemplate', data.successEmailTemplate);
    setValue('customEmailSubject', data.customEmailSubject);

    // Update React State for child props
    setFormName(data.formName);
    setFormDescription(data.formDescription);
    setFormImage(data.formImage);
    setRequireLogin(data.requireLogin);
    setSuccessEmailTemplate(data.successEmailTemplate);
    setCustomEmailSubject(data.customEmailSubject);
  };

  const onSubmit = (data, e) => {
    setFormManagerElements(data);
  };

  const onEdit = async (e) => {
    try {
      setIsLoading(true);
      const { data, status } = await axios.get('/api/forms/admin-get-form', {
        params: { id: e.target.value },
      });

      if (status !== 200) {
        alert(
          'There was an issue with the request, please talk to a DB manager'
        );
      }

      setFormManagerElements(data[0]);
      setEditFormData(data[0]);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const onClickRedirect = async (e) => {
    history.push('/forms/' + e.target.value);
  };

  const onDelete = async (e) => {
    try {
      setIsLoading(true);
      if (window.confirm('Are you sure you want to delete this?')) {
        await axios.post('/api/forms/post-delete-form', {
          id: e.target.value,
        });
        await getFormListFromDatabase();
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
      await axios.post('/api/forms/post-update-form', {
        id: id,
        formToSave: { isPublished: !formData.isPublished },
      });
      await getFormListFromDatabase();
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
    reset();
    setValue('formName', null);
    setValue('formDescription', null);
    setValue('formImage', null);
    setValue('requireLogin', true);
    setValue('successEmailTemplate', null);
    setValue('customEmailSubject', null);
    setFormName(null);
    setFormDescription(null);
    setFormImage(null);
    setRequireLogin(true);
    setEditFormData(null);
    setSuccessEmailTemplate(null);
    setCustomEmailSubject(null);
    await getFormListFromDatabase();
  };

  const getFormListFromDatabase = async () => {
    try {
      const { data, status } = await axios.get('/api/forms/admin-get-form');
      if (status !== 200) {
        throw Error('Something went wrong with the request');
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
                  {' '}
                  <Badge colorScheme={formItem.isPublished ? 'green' : 'red'}>
                    {formItem.isPublished ? 'LIVE' : 'PRIVATE'}
                  </Badge>{' '}
                  {formItem.formName}
                </Text>
                <Stack direction={['column', 'row']} spacing={1}>
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
                    {formItem.isPublished ? 'Unpublish' : 'Publish'}
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
        <Heading as="h2" mb="5" size="lg">
          Create A New Form
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing="5">
            <FormControl isInvalid={errors['formName']}>
              <FormLabel>Form Name</FormLabel>
              <Input
                id="formName"
                {...register('formName', { required: 'Form name is required' })}
              />
              <FormErrorMessage>
                {errors['formName'] && 'Form name is required'}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors['formDescription']}>
              <FormLabel>Form Description</FormLabel>
              <Textarea id="formDescription" {...register('formDescription')} />
              <FormHelperText>
                This field supports markdown. Just write it in somewhere else
                and then paste it in and see the magic happen
              </FormHelperText>
            </FormControl>
            <FormControl isInvalid={errors['formImage']}>
              <FormLabel>Form Image</FormLabel>
              <Input id="formImage" {...register('formImage')} />
            </FormControl>
            <FormControl>
              <FormLabel>Require login?</FormLabel>
              <Controller
                control={control}
                name="requireLogin"
                defaultValue={true}
                render={({ field: { onChange, value, ref } }) => (
                  <Switch onChange={onChange} ref={ref} isChecked={value}>
                    {value ? 'Yes' : 'No'}
                  </Switch>
                )}
              />
            </FormControl>
            <FormControl isInvalid={errors['successEmailTemplate']}>
              <FormLabel>Select an email template</FormLabel>
              <Select {...register('successEmailTemplate', { required: true })}>
                <option value="form-default-success">Default</option>
                <option value="form-retreat-success">Retreat</option>
                <option value="form-ignite-success">!gnite</option>
              </Select>
              <FormErrorMessage>
                {errors['successEmailTemplate'] && 'Field type is required'}
              </FormErrorMessage>
            </FormControl>
            <FormControl>
              <FormLabel>Custom Email Subject</FormLabel>
              <Input {...register('customEmailSubject')} />
              <FormHelperText>
                If you need a custom subject for the success email
              </FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>
                If you updated the fields above please click here again before
                saving to DB
              </FormLabel>
              <Button colorScheme="teal" type="submit">
                Create/Update Form
              </Button>
            </FormControl>
          </Stack>
        </form>
      </Box>

      {formName && (
        <FormCreator
          formInformation={{
            formName: formName,
            formDescription: formDescription,
            formImage: formImage,
            requireLogin: requireLogin,
            successEmailTemplate: successEmailTemplate,
            customEmailSubject: customEmailSubject,
          }}
          existingFormFieldsData={editFormData}
          resetFormEditorCallback={resetFormEditorCallback}
          user={user}
        />
      )}
    </Container>
  );
};

export default FormManager;
