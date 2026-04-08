import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { customAxios as axios } from '../helpers/customAxios';
import { Flex, Stack, Heading, Box, Text, Button, Input, Field, List } from '@chakra-ui/react';

const ExternalFormEditor = (props) => {
  const { formInformation, existingFormData, resetFormEditorCallback } = props;

  const [externalFormLink, setExternalFormLink] = useState([]);
  const [saveStatus, setSaveStatus] = useState(false);
  const {
    register,
    reset,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // const externalFormLink = watch('externalFormLink');

  const onFormSubmit = (data) => {
    setExternalFormLink(data['externalFormLink']);
  };

  const onSaveToDB = async (e) => {
    setSaveStatus(true);
    try {
      let formToSave = {
        formName: formInformation.formName,
        formDescription: formInformation.formDescription,
        formImage: formInformation.formImage,
        formType: formInformation.formType,
        formAvailableFrom: formInformation.formAvailableFrom,
        formAvailableUntil: formInformation.formAvailableUntil,
        externalFormLink: externalFormLink,
      };

      const statusCode = await sendSaveRequestToDB(formToSave);
      if (statusCode === 200) {
        setSaveStatus(false);
        resetFormEditorCallback();
        reset();
      }
    } catch (err) {
      setSaveStatus(false);
      console.log(err);
    }
  };

  // Write form data to DB
  const sendSaveRequestToDB = async (formToSave) => {
    if (existingFormData) {
      const { status } = await axios.post('/api/forms/post-update-form', {
        id: existingFormData.id,
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

  useEffect(() => {
    if (existingFormData && existingFormData['externalFormLink']) {
      setExternalFormLink(existingFormData['externalFormLink']);
      setValue('externalFormLink', existingFormData['externalFormLink']);
    }
  }, [existingFormData]);

  return (
    <Flex
      direction={['column', 'row']}
      borderRadius="lg"
      borderWidth="1px"
      p="3"
    >
      <Stack flex="2" gap="3" p="3">
        <Heading size="xl">
          Currently editing: {formInformation.formName}
        </Heading>
        <Box>
          <Text>
            Click the green button when you are done. A checklist to keep in
            mind:
          </Text>
          <List.Root as='ul'>
            <List.Item>
              Have you clicked on <b>'Create/Update Form</b>
            </List.Item>
            <List.Item>
              Have you clicked on <b>'Save Prefilled Fields'</b>
            </List.Item>
          </List.Root>
        </Box>
        <Button
          loading={saveStatus}
          loadingText="Saving"
          mt={4}
          colorPalette="green"
          onClick={onSaveToDB}
        >
          Finalize and save
        </Button>
        <Box>
          <form onSubmit={handleSubmit(onFormSubmit)}>
            <Field.Root invalid={errors['externalFormLink']}>
              <Field.Label>External Form Link</Field.Label>
              <Input
                id="externalFormLink"
                {...register('externalFormLink', { required: true })}
              />
              <Field.ErrorText>
                {errors['externalFormLink'] && 'External Form Link is required'}
              </Field.ErrorText>
            </Field.Root>
            <Button mt={4} colorPalette="blue" type="submit">
              Save External Form Link
            </Button>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};

export default ExternalFormEditor;
