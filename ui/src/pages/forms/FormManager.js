import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { customAxios as axios } from '../helpers/customAxios';
import {
  Button,
  Heading,
  Container,
  Box,
  Text,
  Badge,
  Stack,
  HStack,
  SimpleGrid,
} from '@chakra-ui/react';
import { toaster } from '../../components/ui/toaster';
import FormEditorContainer from './FormEditorContainer';

const FormManager = (props) => {
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
    const formTarget = e.target.value;

    navigator?.clipboard?.writeText(`${host}/forms/${formTarget}`);
    toaster.create({
      description: 'Public Link Copied to clipboard!',
      status: 'success',
      duration: 5000,
    });
  };

  const copyPublicLinkHandlerForExternalForms = (e) => {
    navigator?.clipboard?.writeText(e.target.value);
    toaster.create({
      description: 'Public Link Copied to clipboard!',
      status: 'success',
      duration: 5000,
    });
  };

  const onClickRedirect = async (e) => {
    history.push('/forms/' + e.target.value);
  };

  const onClickRedirectExternal = async (e) => {
    window.open(e.target.value);
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
        id: formItem.id,
        formFields: formItem.formFields,
        isPaymentRequired: formItem.isPaymentRequired,
      },
    });
  };

  const noViewPermission = (formItem) => {
    const currentUserAccessType = user.accessType;
    const hasPaymentViewPermissions = ['admin', 'stewardship'];
    const hasAllViewPermissions = ['tc', 'admin', 'stewardship'];

    // only admin and stewardship can view payment data
    if (formItem.isPaymentRequired) {
      return !hasPaymentViewPermissions.includes(currentUserAccessType);
    }

    // only tc, et/admin, and stewardship can view form data
    return !hasAllViewPermissions.includes(currentUserAccessType);
  };

  return (
    <Container maxW="container.xl" pt={10} minH="100vh">
      <Stack gap="5">
        <Heading as="h1" size="xl">
          Form Management System
        </Heading>
        <Button colorPalette="blue" onClick={onCreate}>
          Create a new form
        </Button>
        <Box borderRadius="lg">
          <HStack>
            <Heading mb="2" as="h2" size="lg" align="left">
              Existing Forms
            </Heading>
          </HStack>
          <SimpleGrid gap="2" columns={[1, 2]}>
            {formList.map((formItem) => (
              <Box key={formItem.id}>
                <Box p="3" borderRadius="lg" borderWidth="1px">
                  <Text mb="3">
                    <Badge colorPalette={formItem.isPublished ? 'green' : 'red'}>
                      {formItem.isPublished ? 'LIVE' : 'PRIVATE'}
                    </Badge>{' '}
                    <Badge>
                      {formItem.formType ? formItem.formType : 'internal'}
                    </Badge>{' '}
                    {formItem.formName}
                  </Text>
                  <Stack
                    direction={['column', 'column', 'column', 'column', 'row']}
                    gap={1}
                  >
                    <Button
                      colorPalette="blue"
                      onClick={onEdit}
                      value={formItem.id}
                      loading={isLoading}
                    >
                      Edit
                    </Button>
                    <Button
                      colorPalette="blue"
                      onClick={onPublish}
                      value={formItem.id}
                      loading={isLoading}
                    >
                      {formItem.isPublished ? 'Unpublish' : 'Publish'}
                    </Button>
                    {formItem.formType === 'external' && (
                      <Button
                        colorPalette="blue"
                        onClick={copyPublicLinkHandlerForExternalForms}
                        value={formItem.externalFormLink}
                      >
                        Public Link
                      </Button>
                    )}
                    {formItem.formType !== 'external' && (
                      <Button
                        colorPalette="blue"
                        onClick={copyPublicLinkHandler}
                        value={formItem.id}
                      >
                        Public Link
                      </Button>
                    )}

                    {formItem.formType === 'external' && (
                      <Button
                        colorPalette="blue"
                        onClick={onClickRedirectExternal}
                        value={formItem.externalFormLink}
                      >
                        View Form
                      </Button>
                    )}
                    {formItem.formType !== 'external' && (
                      <Button
                        colorPalette="blue"
                        onClick={onClickRedirect}
                        value={formItem.id}
                      >
                        View Form
                      </Button>
                    )}

                    <Button
                      colorPalette="blue"
                      onClick={() => onClickHandler(formItem)}
                      disabled={
                        noViewPermission(formItem) ||
                        formItem.formType === 'external'
                      }
                    >
                      View Data
                    </Button>
                    <Button
                      colorPalette="red"
                      onClick={onDelete}
                      value={formItem.id}
                      loading={isLoading}
                    >
                      Delete
                    </Button>
                  </Stack>
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
        <FormEditorContainer
          user={user}
          isOpen={isEditorOpen}
          setIsOpen={setIsEditorOpen}
          editFormData={editFormData}
          formManagerCallback={formManagerCallback}
          staticData={props.staticData}
        />
      </Stack>
    </Container>
  );
};

export default FormManager;
