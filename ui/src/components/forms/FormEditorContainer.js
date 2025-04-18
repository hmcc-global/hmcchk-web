import { useForm, Controller } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import {
  Stack,
  Container,
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
  Divider,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import FormEditor from './FormEditor';
import ExternalFormEditor from './ExternalFormEditor';

const isAlertTypeNone = (alertType) => alertType == null || alertType === '' || alertType === 'None';

const FormEditorContainer = (props) => {
  const {
    user,
    isOpen,
    setIsOpen,
    editFormData,
    formManagerCallback,
    staticData,
  } = props;
  const { formAlertTypeList } = staticData;
  const formAlertTypes = Object.keys(formAlertTypeList);

  // React forms basics
  const { register, reset, handleSubmit, setValue, watch, control, formState } =
    useForm();
  const { errors } = formState;

  // State variables
  const [formName, setFormName] = useState(null);
  const [formType, setFormType] = useState(null);
  const [formDescription, setFormDescription] = useState(null);
  const [formImage, setFormImage] = useState(null);
  const [requireLogin, setRequireLogin] = useState(true);
  const [requireMembership, setRequireMembership] = useState(false);
  const [requireBaptism, setRequireBaptism] = useState(false);
  const [parseUserData, setParseUserData] = useState(false);
  const [alertType, setAlertType] = useState(formAlertTypes[0]);
  const [customAlertRecipients, setCustomAlertRecipients] = useState([]);
  const [successEmailTemplate, setSuccessEmailTemplate] = useState(null);
  const [customEmailSubject, setCustomEmailSubject] = useState(null);
  const [formAvailableFrom, setFormAvailableFrom] = useState(null);
  const [formAvailableUntil, setFormAvailableUntil] = useState(null);
  const [formPeriodInvalid, setFormPeriodInvalid] = useState(false);

  // Payment variables
  const [isPaymentRequired, setIsPaymentRequired] = useState(false);
  const [
    paymentConfirmationEmailTemplate,
    setPaymentConfirmationEmailTemplate,
  ] = useState('');
  const [paymentEmailSubject, setPaymentEmailSubject] = useState('');
  const [paymentCcEmail, setPaymentCcEmail] = useState('');

  const resetFormEditorCallback = () => {
    reset();
    setValue('formName', null);
    setValue('isPaymentRequired', false);
    setValue('paymentConfirmationEmailTemplate', '');
    setValue('paymentEmailSubject', '');
    setValue('paymentCcEmail', '');
    setValue('formDescription', null);
    setValue('formImage', null);
    setValue('formType', null);
    setValue('requireLogin', true);
    setValue('requireMembership', false);
    setValue('requireBaptism', false);
    setValue('parseUserData', false);
    setValue('alertType', null);
    setValue('customAlertRecipients', []);
    setValue('successEmailTemplate', 'form-default-success');
    setValue('customEmailSubject', '');
    setValue('formAvailableFrom', '');
    setValue('formAvailableUntil', '');
    setFormName(null);
    setIsPaymentRequired(false);
    setPaymentConfirmationEmailTemplate(null);
    setPaymentEmailSubject('');
    setPaymentCcEmail('');
    setFormDescription('');
    setFormImage(null);
    setFormType('internal');
    setRequireLogin(true);
    setRequireMembership(false);
    setRequireBaptism(false);
    setParseUserData(false);
    setAlertType(formAlertTypes[0]);
    setCustomAlertRecipients([]);
    setSuccessEmailTemplate('form-default-success');
    setCustomEmailSubject('');
    setFormAvailableFrom('');
    setFormAvailableUntil('');
    setIsOpen(false);
    formManagerCallback();
  };

  const setFormManagerElements = (data) => {
    if (data) {
      let paymentCcEmail = data.paymentCcEmail;
      if (data.paymentCcEmail && Array.isArray(data.paymentCcEmail)) {
        paymentCcEmail = data.paymentCcEmail.join(';');
      }

      setValue('formName', data.formName);
      setValue('isPaymentRequired', data.isPaymentRequired);
      setValue(
        'paymentConfirmationEmailTemplate',
        data.paymentConfirmationEmailTemplate
      );
      setValue('paymentEmailSubject', data.paymentEmailSubject);
      setValue('paymentCcEmail', paymentCcEmail);
      setValue('formDescription', data.formDescription);
      setValue('formImage', data.formImage);
      setValue('formType', data.formType);
      setValue('requireLogin', data.requireLogin);
      setValue('requireMembership', data.requireMembership);
      setValue('requireBaptism', data.requireBaptism);
      setValue('alertType', data.alertType);
      setValue('parseUserData', data.parseUserData && !isAlertTypeNone(data.alertType));
      setValue('customAlertRecipients', data.customAlertRecipients);
      setValue('successEmailTemplate', data.successEmailTemplate);
      setValue('customEmailSubject', data.customEmailSubject);
      setValue('formAvailableFrom', data.formAvailableFrom);
      setValue('formAvailableUntil', data.formAvailableUntil);

      // Update React State for child props
      setFormName(data.formName);
      setIsPaymentRequired(data.isPaymentRequired);
      setPaymentConfirmationEmailTemplate(
        data.paymentConfirmationEmailTemplate
      );
      setPaymentEmailSubject(data.paymentEmailSubject);
      setPaymentCcEmail(paymentCcEmail);
      setFormDescription(data.formDescription);
      setFormImage(data.formImage);
      setFormType(data.formType);
      setRequireLogin(data.requireLogin);
      setRequireMembership(data.requireMembership);
      setRequireBaptism(data.requireBaptism);
      setParseUserData(data.parseUserData && !isAlertTypeNone(data.alertType));
      setAlertType(data.alertType);
      setCustomAlertRecipients(data.customAlertRecipients);
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

  // Watch this to conditionally render custom things
  const ftFlag = watch('formType');
  const alertTypeFlag = watch('alertType');

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <Container maxW="container.xl" mt="9" mb="9">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack
                borderRadius="lg"
                p="5"
                borderWidth="1px"
                mb="5"
                spacing={5}
              >
                <Stack spacing="2">
                  <Heading as="h2" mb="3" size="lg">
                    Form Information
                  </Heading>
                  <FormControl>
                    <FormLabel>Form Type</FormLabel>
                    <Select {...register('formType', { required: true })}>
                      <option value="internal">Internal</option>
                      <option value="external">
                        External (Google or other external form links)
                      </option>
                    </Select>
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
                </Stack>
                {ftFlag === 'internal' && (
                  <Stack spacing="2">
                    <Divider />
                    <Heading as="h4" size="md">
                      Paid Event Details
                    </Heading>
                    <Alert status="info">
                      <AlertIcon />
                      This setting is not changeable after form is created, a
                      paid event will always be a paid event!
                    </Alert>

                    <FormControl>
                      <FormLabel> Is Payment Required? </FormLabel>
                      <Controller
                        control={control}
                        name="isPaymentRequired"
                        defaultValue={false}
                        render={({ field: { onChange, value, ref } }) => (
                          <Switch
                            onChange={(e) => {
                              setIsPaymentRequired(e.target.checked);
                              onChange(e);
                            }}
                            ref={ref}
                            isChecked={value}
                            disabled={formName != null}
                          >
                            {value ? 'Yes' : 'No'}
                          </Switch>
                        )}
                      />
                    </FormControl>
                    {isPaymentRequired && (
                      <>
                        <FormControl
                          isInvalid={errors['paymentConfirmationEmailTemp']}
                          isRequired={isPaymentRequired}
                        >
                          <FormLabel>
                            {' '}
                            Payment Confirmation Email Template
                          </FormLabel>
                          <Select
                            {...register('paymentConfirmationEmailTemplate', {
                              required: isPaymentRequired,
                            })}
                            placeholder="Select option"
                          >
                            {/* To add more email template, please define the value and add the template here */}
                            <option value="email-retreat-payment-success">
                              Retreat 2025 Payment Confirmation
                            </option>
                            <option value="email-retreat-donation-payment-success">
                              Retreat 2025 Donation Payment Confirmation
                            </option>
                            <option value="email-ignite-payment-success">
                              !gnite 2023 Payment Confirmation
                            </option>
                            <option value="email-deep-payment-success">
                              Deep Retreat Payment Confirmation
                            </option>
                            <option value="email-ug-retreat-payment-success">
                              UG Retreat Payment Confirmation
                            </option>
                          </Select>
                          <FormErrorMessage>
                            {errors['paymentConfirmationEmailTemplate'] &&
                              'Field type is required'}
                          </FormErrorMessage>
                        </FormControl>
                        <FormControl>
                          <FormLabel>Payment Email Subject</FormLabel>
                          <Input {...register('paymentEmailSubject')} />
                          <FormHelperText>
                            If you need a custom subject for the payment email
                          </FormHelperText>
                        </FormControl>
                        <FormControl
                          isInvalid={errors['paymentCcEmail']}
                          isRequired={isPaymentRequired}
                        >
                          <FormLabel>Payment CC Email</FormLabel>
                          <Input
                            {...register('paymentCcEmail')}
                            placeholder={'john@gmail.com;doe@gmail.com'}
                          />
                          <FormHelperText>
                            *All Payment emails will be CC'ed to these emails
                            (addressees will be BCC'ed). Separate CC emails with
                            ;
                          </FormHelperText>
                        </FormControl>
                      </>
                    )}
                  </Stack>
                )}
                {ftFlag === 'internal' && (
                  <Stack spacing="2">
                    <Heading as="h4" size="md">
                      Form Prerequisites
                    </Heading>
                    <FormControl>
                      <FormLabel>Require login?</FormLabel>
                      <Controller
                        control={control}
                        name="requireLogin"
                        defaultValue={true}
                        render={({ field: { onChange, value, ref } }) => (
                          <Switch
                            onChange={onChange}
                            ref={ref}
                            isChecked={value}
                          >
                            {value ? 'Yes' : 'No'}
                          </Switch>
                        )}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Require membership?</FormLabel>
                      <Controller
                        control={control}
                        name="requireMembership"
                        defaultValue={true}
                        render={({ field: { onChange, value, ref } }) => (
                          <Switch
                            onChange={onChange}
                            ref={ref}
                            isChecked={value}
                          >
                            {value ? 'Yes' : 'No'}
                          </Switch>
                        )}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Require baptism?</FormLabel>
                      <Controller
                        control={control}
                        name="requireBaptism"
                        defaultValue={true}
                        render={({ field: { onChange, value, ref } }) => (
                          <Switch
                            onChange={onChange}
                            ref={ref}
                            isChecked={value}
                          >
                            {value ? 'Yes' : 'No'}
                          </Switch>
                        )}
                      />
                    </FormControl>
                    <Divider />
                  </Stack>
                )}
                <Stack spacing="2">
                  <Heading as="h4" size="md">
                    New Sign Up Notification
                  </Heading>
                  <FormControl>
                    <FormLabel>Alert Type</FormLabel>
                    <Select {...register('alertType', { required: true })}>
                      {formAlertTypes.map((val, i) => (
                        <option key={i}>{val}</option>
                      ))}
                    </Select>
                  </FormControl>
                  {alertTypeFlag === 'Custom' && (
                    <FormControl>
                      <FormLabel>Custom Email Recipients</FormLabel>
                      <Input
                        type="text"
                        {...register('customAlertRecipients')}
                        placeholder="first@person.com;second@person.com"
                      />
                    </FormControl>
                  )}
                  {
                    !isAlertTypeNone(alertTypeFlag) && (
                      <FormControl>
                        <FormLabel>Parse User Data?</FormLabel>
                        <FormHelperText>
                          This will send email queries to the alert recipients above which will update the submitter's information in our database.
                        </FormHelperText>
                        <Controller
                          control={control}
                          name="parseUserData"
                          defaultValue={false}
                          render={({ field: { onChange, value, ref } }) => (
                            <Switch
                              onChange={onChange}
                              ref={ref}
                              isChecked={value}
                            >
                              {value ? 'Yes' : 'No'}
                            </Switch>
                          )}
                        />
                      </FormControl>
                    )
                  }
                </Stack>
                {ftFlag === 'internal' && (
                  <Stack spacing="2">
                    <Heading as="h4" size="md">
                      Custom Autoreply Settings
                    </Heading>
                    <FormControl isInvalid={errors['successEmailTemplate']}>
                      <FormLabel>Select an email template</FormLabel>
                      <Select
                        {...register('successEmailTemplate', {
                          required: true,
                        })}
                      >
                        {/* To add more email template, please define the value and add the template here */}
                        <option value="form-default-success">Default</option>
                        <option value="form-retreat-success">
                          Retreat 2025
                        </option>
                        <option value="form-retreat-donation-success">
                          Retreat 2025 Donation
                        </option>
                        <option value="form-ignite-success">!gnite</option>
                        <option value="form-deep-success">Deep retreat</option>
                        <option value="form-ug-retreat-success">
                          UG Retreat
                        </option>
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
                  </Stack>
                )}
                <Stack spacing="2">
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
              </Stack>
            </form>

            {formName && formType === 'internal' && (
              <FormEditor
                formInformation={{
                  formName: formName,
                  isPaymentRequired: isPaymentRequired,
                  formDescription: formDescription,
                  formImage: formImage,
                  formType: formType,
                  requireLogin: requireLogin,
                  requireMembership: requireMembership,
                  requireBaptism: requireBaptism,
                  alertType: alertType,
                  parseUserData: parseUserData,
                  customAlertRecipients: customAlertRecipients,
                  successEmailTemplate: successEmailTemplate,
                  customEmailSubject: customEmailSubject,
                  formAvailableFrom: formAvailableFrom,
                  formAvailableUntil: formAvailableUntil,
                  paymentConfirmationEmailTemplate:
                    paymentConfirmationEmailTemplate,
                  paymentEmailSubject: paymentEmailSubject,
                  paymentCcEmail: paymentCcEmail,
                }}
                existingFormFieldsData={editFormData}
                resetFormEditorCallback={resetFormEditorCallback}
                user={user}
                staticData={props.staticData}
              />
            )}

            {formName && formType === 'external' && (
              <ExternalFormEditor
                formInformation={{
                  formName: formName,
                  formDescription: formDescription,
                  formImage: formImage,
                  formType: formType,
                  formAvailableFrom: formAvailableFrom,
                  formAvailableUntil: formAvailableUntil,
                }}
                existingFormData={editFormData}
                resetFormEditorCallback={resetFormEditorCallback}
              />
            )}
          </Container>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default FormEditorContainer;
