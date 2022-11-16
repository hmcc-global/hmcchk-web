import {
  Stack,
  Container,
  Box,
  Heading,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Textarea,
  FormHelperText,
  Switch,
  Select,
  Input,
  Modal,
  ModalOverlay,
  ModalCloseButton,
  ModalBody,
  ModalContent,
} from '@chakra-ui/react';
import FormEditor from './FormEditor';
import { useForm, Controller } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { DateTime } from 'luxon';

const FormEditorContainer = (props) => {
  const { user, isOpen, setIsOpen, editFormData, formManagerCallback } = props;

  // React forms basics
  const { register, reset, handleSubmit, setValue, control, formState } =
    useForm();
  const { errors } = formState;

  // State variables
  const [formName, setFormName] = useState(null);
  const [isPaymentRequired, setIsPaymentRequired] = useState(false);
  const [formDescription, setFormDescription] = useState(null);
  const [formImage, setFormImage] = useState(null);
  const [requireLogin, setRequireLogin] = useState(true);
  const [successEmailTemplate, setSuccessEmailTemplate] = useState(null);
  const [customEmailSubject, setCustomEmailSubject] = useState(null);
  const [formAvailableFrom, setFormAvailableFrom] = useState(null);
  const [formAvailableUntil, setFormAvailableUntil] = useState(null);
  const [formPeriodInvalid, setFormPeriodInvalid] = useState(false);

  const resetFormEditorCallback = () => {
    reset();
    setValue('formName', null);
    setValue('isPaymentRequired',false);
    setValue('formDescription', null);
    setValue('formImage', null);
    setValue('requireLogin', true);
    setValue('successEmailTemplate', 'form-default-success');
    setValue('customEmailSubject', '');
    setValue('formAvailableFrom', null);
    setValue('formAvailableUntil', null);
    setFormName(null);
    setIsPaymentRequired(false);
    setFormDescription(null);
    setFormImage(null);
    setRequireLogin(true);
    setSuccessEmailTemplate('form-default-success');
    setCustomEmailSubject('');
    setFormAvailableFrom(null);
    setFormAvailableUntil(null);
    setIsOpen(false);
    formManagerCallback();
  };

  const setFormManagerElements = (data) => {
    if (data) {
      setValue('formName', data.formName);
      setValue('isPaymentRequired', data.isPaymentRequired);
      setValue('formDescription', data.formDescription);
      setValue('formImage', data.formImage);
      setValue('requireLogin', data.requireLogin);
      setValue('successEmailTemplate', data.successEmailTemplate);
      setValue('customEmailSubject', data.customEmailSubject);
      setValue('formAvailableFrom', data.formAvailableFrom);
      setValue('formAvailableUntil', data.formAvailableUntil);

      // Update React State for child props
      setFormName(data.formName);
      setIsPaymentRequired(data.isPaymentRequired);
      setFormDescription(data.formDescription);
      setFormImage(data.formImage);
      setRequireLogin(data.requireLogin);
      setSuccessEmailTemplate(data.successEmailTemplate);
      setCustomEmailSubject(data.customEmailSubject);
      setFormAvailableFrom(data.formAvailableFrom);
      setFormAvailableUntil(data.formAvailableUntil);
    }
  };

  const onSubmit = (data, e) => {
    setFormManagerElements(data);
  };

  const onClose = () => {
    resetFormEditorCallback();
  };

  useEffect(() => {
    setFormManagerElements(editFormData);
  }, [editFormData]);



  useEffect(() => {
    if (formAvailableFrom && formAvailableUntil) {
      const fromDate = DateTime.fromISO(formAvailableFrom);
      const untilDate = DateTime.fromISO(formAvailableUntil);
      if (untilDate <= fromDate) {
        setFormPeriodInvalid(true);
        return;
      }
    }
    setFormPeriodInvalid(false);
  }, [formAvailableFrom, formAvailableUntil]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <Container maxW="container.xl" mt="9" mb="9">
            <Box borderRadius="lg" p="5" borderWidth="1px" mb="5">
              <Heading as="h2" mb="3" size="lg">
                Form Information
              </Heading>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing="2">
                  <FormControl>
                    <FormLabel> Is Payment Required? </FormLabel>
                    <Controller
                      control={control}
                      name="isPaymentRequired"
                      defaultValue={false}
                      render={({ field: { onChange, value, ref } }) => (
                        <Switch onChange={onChange} ref={ref} isChecked= {value} disabled={formName != null}>
                          {value ? 'Yes' : 'No'}
                        </Switch>
                      )}
                      />
                  </FormControl>
                  <FormControl isInvalid={errors['formName']}>
                    <FormLabel>Form Name</FormLabel>
                    <Input
                      id="formName"
                      {...register('formName', {
                        required: 'Form name is required',
                      })}
                    />
                    <FormErrorMessage>
                      {errors['formName'] && 'Form name is required'}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={errors['formImage']}>
                    <FormLabel>Form Image Link</FormLabel>
                    <Input id="formImage" {...register('formImage')} />
                  </FormControl>
                  <FormControl isInvalid={errors['formDescription']}>
                    <FormLabel>Form Description</FormLabel>
                    <Textarea
                      id="formDescription"
                      {...register('formDescription')}
                    />
                    <FormHelperText>
                      This field supports markdown. Just write it in somewhere
                      else and then paste it in and see the magic happen
                    </FormHelperText>
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
                    <Select
                      {...register('successEmailTemplate', { required: true })}
                    >
                      {/* To add more email template, please define the value and add the template here */}
                      <option value="form-default-success">Default</option>
                      <option value="form-retreat-success">Retreat</option>
                      <option value="form-ignite-success">!gnite</option>
                    </Select>
                    <FormErrorMessage>
                      {errors['successEmailTemplate'] &&
                        'Field type is required'}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Custom Email Subject</FormLabel>
                    <Input {...register('customEmailSubject')} />
                    <FormHelperText>
                      If you need a custom subject for the success email
                    </FormHelperText>
                  </FormControl>
                  <FormControl isInvalid={formPeriodInvalid}>
                    <FormLabel>Form Availability Period</FormLabel>
                    <FormErrorMessage>
                      {formPeriodInvalid &&
                        'Availability Period is invalid, please check again'}
                    </FormErrorMessage>
                    Starting Time
                    <Input
                      type="datetime-local"
                      {...register('formAvailableFrom')}
                    />
                    Ending Time
                    <Input
                      type="datetime-local"
                      {...register('formAvailableUntil')}
                    />
                  </FormControl>
                  <FormControl pt="3">
                    <FormLabel>
                      If you updated the fields above please click here again
                      before saving to DB
                    </FormLabel>
                    <Button colorScheme="blue" type="submit">
                      {!formName ? 'Create' : 'Update'} Form
                    </Button>
                  </FormControl>
                </Stack>
              </form>
            </Box>

            {formName && (
              <FormEditor
                formInformation={{
                  formName: formName,
                  isPaymentRequired: isPaymentRequired,
                  formDescription: formDescription,
                  formImage: formImage,
                  requireLogin: requireLogin,
                  successEmailTemplate: successEmailTemplate,
                  customEmailSubject: customEmailSubject,
                  formAvailableFrom: formAvailableFrom,
                  formAvailableUntil: formAvailableUntil,
                }}
                existingFormFieldsData={editFormData}
                resetFormEditorCallback={resetFormEditorCallback}
                user={user}
              />
            )}
          </Container>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default FormEditorContainer;
