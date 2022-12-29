import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { customAxios as axios } from '../helpers/customAxios';
import {
  Button,
  Heading,
  Container,
  List,
  ListItem,
  Box,
  Text,
  Badge,
  Stack,
  useToast,
} from '@chakra-ui/react';
import FormEditorContainer from './FormEditorContainer';

const FormManager = (props) => {
  const toast = useToast();

  const { user } = props;
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formList, setFormList] = useState([]);
  const history = useHistory();
  const [editFormData, setEditFormData] = useState(null);

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

  useEffect(() => {
    getFormListFromDatabase();
  }, []);

  const formManagerCallback = async () => {
    await getFormListFromDatabase();
  };

  const onCreate = (e) => {
    setIsEditorOpen(true);
    setEditFormData(null);
  };

  const onEdit = async (e) => {
    setIsLoading(true);
    try {
      const { data, status } = await axios.get('/api/forms/admin-get-form', {
        params: { id: e.target.value },
      });

      if (status !== 200) {
        alert(
          'There was an issue with the request, please talk to a DB manager'
        );
      }
      setIsEditorOpen(true);
      setEditFormData(data[0]);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  const copyPublicLinkHandler = (e) => {
    const host = window.location.host;
    const formId = e.target.value;
    navigator?.clipboard?.writeText(`${host}/forms/${formId}`);
    toast({
      description: 'Public Link Copied to clipboard!',
      status: 'success',
      duration: 5000
    });
  }

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

  const onClickHandler = (formItem) => {
    history.push({
      pathname: '/admin/formViewer',
      state: {
        name: formItem.formName,
        id: formItem.id
      }
    });
  };

  return (
    <Container maxW="container.xl" pt={10} minH="100vh">
      <Stack spacing="5">
        <Heading as="h1" size="xl">
          Form Management System
        </Heading>
        <Button colorScheme="blue" onClick={onCreate}>
          Create a new form
        </Button>
        <Box borderRadius="lg">
          <Heading mb="2" as="h2" size="lg">
            Existing Forms
          </Heading>
          <List spacing="2">
            {formList.map((formItem) => (
              <ListItem key={formItem.id}>
                <Box p="3" borderRadius="lg" borderWidth="1px">
                  <Text mb="3">
                    <Badge colorScheme={formItem.isPublished ? 'green' : 'red'}>
                      {formItem.isPublished ? 'LIVE' : 'PRIVATE'}
                    </Badge>{' '}
                    {formItem.formName}
                  </Text>
                  <Stack direction={['column', 'row']} spacing={1}>
                    <Button
                      colorScheme="blue"
                      onClick={onEdit}
                      value={formItem.id}
                      isLoading={isLoading}
                    >
                      Edit
                    </Button>
                    <Button
                      colorScheme="blue"
                      onClick={onPublish}
                      value={formItem.id}
                      isLoading={isLoading}
                    >
                      {formItem.isPublished ? 'Unpublish' : 'Publish'}
                    </Button>
                    <Button
                      colorScheme="blue"
                      onClick={copyPublicLinkHandler}
                      value={formItem.id}
                    >
                      Public Link
                    </Button>
                    <Button
                      colorScheme="blue"
                      onClick={onClickRedirect}
                      value={formItem.id}
                    >
                      View Form
                    </Button>
                    <Button
                      colorScheme="blue"
                      onClick={() => onClickHandler(formItem)}
                    >
                      View Data
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
        <FormEditorContainer
          user={user}
          isOpen={isEditorOpen}
          setIsOpen={setIsEditorOpen}
          editFormData={editFormData}
          formManagerCallback={formManagerCallback}
        />
      </Stack>
    </Container>
  );
};

export default FormManager;
