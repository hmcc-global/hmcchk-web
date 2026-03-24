import { useForm, Controller } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import {
  Stack,
  Container,
  Heading,
  Button,
  Textarea,
  Switch,
  NativeSelect,
  Input,
  Alert,
  Separator,
  Field,
  Dialog,
  Portal,
} from '@chakra-ui/react';
import FormEditor from './FormEditor';
import ExternalFormEditor from './ExternalFormEditor';

const isAlertTypeNone = (alertType) =>
  alertType == null || alertType === '' || alertType === 'None';

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
      setValue(
        'parseUserData',
        data.parseUserData && !isAlertTypeNone(data.alertType)
      );
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
    <Dialog.Root open={isOpen} size='full' onOpenChange={e => {
      if (!e.open) {
        onClose();
      }
    }}>
      <Portal>

        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.CloseTrigger />
            <Dialog.Body>
              <Container maxW="container.xl" mt="9" mb="9">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Stack
                    borderRadius="lg"
                    p="5"
                    borderWidth="1px"
                    mb="5"
                    gap={5}
                  >
                    <Stack gap="2">
                      <Heading as="h2" mb="3" size="lg">
                        Form Information
                      </Heading>
                      <Field.Root>
                        <Field.Label>Form Type</Field.Label>
                        <NativeSelect.Root>
                          <NativeSelect.Field {...register('formType', { required: true })}>
                            <option value="internal">Internal</option>
                            <option value="external">
                              External (Google or other external form links)
                            </option>
                          </NativeSelect.Field>
                          <NativeSelect.Indicator />
                        </NativeSelect.Root>
                      </Field.Root>
                      <Field.Root invalid={errors['formName']}>
                        <Field.Label>Form Name</Field.Label>
                        <Input
                          id="formName"
                          {...register('formName', {
                            required: 'Form name is required',
                          })}
                        />
                        <Field.ErrorText>
                          {errors['formName'] && 'Form name is required'}
                        </Field.ErrorText>
                      </Field.Root>
                      <Field.Root invalid={errors['formImage']}>
                        <Field.Label>Form Image Link</Field.Label>
                        <Input id="formImage" {...register('formImage')} />
                      </Field.Root>
                      <Field.Root invalid={errors['formDescription']}>
                        <Field.Label>Form Description</Field.Label>
                        <Textarea
                          id="formDescription"
                          {...register('formDescription')}
                        />
                        <Field.HelperText>
                          This field supports markdown. Just write it in somewhere
                          else and then paste it in and see the magic happen
                        </Field.HelperText>
                      </Field.Root>
                      <Field.Root invalid={formPeriodInvalid}>
                        <Field.Label>Form Availability Period</Field.Label>
                        <Field.ErrorText>
                          {formPeriodInvalid &&
                            'Availability Period is invalid, please check again'}
                        </Field.ErrorText>
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
                      </Field.Root>
                    </Stack>
                    {ftFlag === 'internal' && (
                      <Stack gap="2">
                        <Separator />
                        <Heading as="h4" size="md">
                          Paid Event Details
                        </Heading>
                        <Alert.Root status="info">
                          <Alert.Indicator />
                          This setting is not changeable after form is created, a
                          paid event will always be a paid event!
                        </Alert.Root>

                        <Field.Root>
                          <Field.Label> Is Payment Required? </Field.Label>
                          <Controller
                            control={control}
                            name="isPaymentRequired"
                            defaultValue={false}
                            render={({ field: { onChange, value, ref } }) => (
                              <Switch
                                onValueChange={(e) => {
                                  setIsPaymentRequired(e.target.checked);
                                  onChange(e);
                                }}
                                ref={ref}
                                checked={value}
                                disabled={formName != null}
                              >
                                {value ? 'Yes' : 'No'}
                              </Switch>
                            )}
                          />
                        </Field.Root>
                        {isPaymentRequired && (
                          <>
                            <Field.Root
                              invalid={errors['paymentConfirmationEmailTemp']}
                              required={isPaymentRequired}
                            >
                              <Field.Label>
                                {' '}
                                Payment Confirmation Email Template
                              </Field.Label>
                              <NativeSelect.Root>
                                <NativeSelect.Field
                                  {...register('paymentConfirmationEmailTemplate', {
                                    required: isPaymentRequired,
                                  })}
                                  placeholder="Select option">
                                  {/* To add more email template, please define the value and add the template here */}
                                  <option value="email-10y-payment-success">
                                    10Y anniversary Payment Confirmation
                                  </option>
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
                                </NativeSelect.Field>
                                <NativeSelect.Indicator />
                              </NativeSelect.Root>
                              <Field.ErrorText>
                                {errors['paymentConfirmationEmailTemplate'] &&
                                  'Field type is required'}
                              </Field.ErrorText>
                            </Field.Root>
                            <Field.Root>
                              <Field.Label>Payment Email Subject</Field.Label>
                              <Input {...register('paymentEmailSubject')} />
                              <Field.HelperText>
                                If you need a custom subject for the payment email
                              </Field.HelperText>
                            </Field.Root>
                            <Field.Root
                              invalid={errors['paymentCcEmail']}
                              required={isPaymentRequired}
                            >
                              <Field.Label>Payment CC Email</Field.Label>
                              <Input
                                {...register('paymentCcEmail')}
                                placeholder={'john@gmail.com;doe@gmail.com'}
                              />
                              <Field.HelperText>
                                *All Payment emails will be CC'ed to these emails
                                (addressees will be BCC'ed). Separate CC emails with
                                ;
                              </Field.HelperText>
                            </Field.Root>
                          </>
                        )}
                      </Stack>
                    )}
                    {ftFlag === 'internal' && (
                      <Stack gap="2">
                        <Heading as="h4" size="md">
                          Form Prerequisites
                        </Heading>
                        <Field.Root>
                          <Field.Label>Require login?</Field.Label>
                          <Controller
                            control={control}
                            name="requireLogin"
                            defaultValue={true}
                            render={({ field: { onChange, value, ref } }) => (
                              <Switch
                                onValueChange={onChange}
                                ref={ref}
                                checked={value}
                              >
                                {value ? 'Yes' : 'No'}
                              </Switch>
                            )}
                          />
                        </Field.Root>
                        <Field.Root>
                          <Field.Label>Require membership?</Field.Label>
                          <Controller
                            control={control}
                            name="requireMembership"
                            defaultValue={true}
                            render={({ field: { onChange, value, ref } }) => (
                              <Switch
                                onValueChange={onChange}
                                ref={ref}
                                checked={value}
                              >
                                {value ? 'Yes' : 'No'}
                              </Switch>
                            )}
                          />
                        </Field.Root>
                        <Field.Root>
                          <Field.Label>Require baptism?</Field.Label>
                          <Controller
                            control={control}
                            name="requireBaptism"
                            defaultValue={true}
                            render={({ field: { onChange, value, ref } }) => (
                              <Switch
                                onValueChange={onChange}
                                ref={ref}
                                checked={value}
                              >
                                {value ? 'Yes' : 'No'}
                              </Switch>
                            )}
                          />
                        </Field.Root>
                        <Separator />
                      </Stack>
                    )}
                    <Stack gap="2">
                      <Heading as="h4" size="md">
                        New Sign Up Notification
                      </Heading>
                      <Field.Root>
                        <Field.Label>Alert Type</Field.Label>
                        <NativeSelect.Root>
                          <NativeSelect.Field {...register('alertType', { required: true })}>
                            {formAlertTypes.map((val, i) => (
                              <option key={i}>{val}</option>
                            ))}
                          </NativeSelect.Field>
                          <NativeSelect.Indicator />
                        </NativeSelect.Root>
                      </Field.Root>
                      {alertTypeFlag === 'Custom' && (
                        <Field.Root>
                          <Field.Label>Custom Email Recipients</Field.Label>
                          <Input
                            type="text"
                            {...register('customAlertRecipients')}
                            placeholder="first@person.com;second@person.com"
                          />
                        </Field.Root>
                      )}
                      {!isAlertTypeNone(alertTypeFlag) && (
                        <Field.Root>
                          <Field.Label>Parse User Data?</Field.Label>
                          <Field.HelperText>
                            This will send email queries to the alert recipients
                            above which will update the submitter's information in
                            our database.
                          </Field.HelperText>
                          <Controller
                            control={control}
                            name="parseUserData"
                            defaultValue={false}
                            render={({ field: { onChange, value, ref } }) => (
                              <Switch
                                onValueChange={onChange}
                                ref={ref}
                                checked={value}
                              >
                                {value ? 'Yes' : 'No'}
                              </Switch>
                            )}
                          />
                        </Field.Root>
                      )}
                    </Stack>
                    {ftFlag === 'internal' && (
                      <Stack gap="2">
                        <Heading as="h4" size="md">
                          Custom Autoreply Settings
                        </Heading>
                        <Field.Root invalid={errors['successEmailTemplate']}>
                          <Field.Label>Select an email template</Field.Label>
                          <NativeSelect.Root>
                            <NativeSelect.Field
                              {...register('successEmailTemplate', {
                                required: true,
                              })}>
                              {/* To add more email template, please define the value and add the template here */}
                              <option value="form-default-success">Default</option>
                              <option value="form-10y-success">
                                10Y Confirmation
                              </option>
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
                            </NativeSelect.Field>
                            <NativeSelect.Indicator />
                          </NativeSelect.Root>
                          <Field.ErrorText>
                            {errors['successEmailTemplate'] &&
                              'Field type is required'}
                          </Field.ErrorText>
                        </Field.Root>
                        <Field.Root>
                          <Field.Label>Custom Email Subject</Field.Label>
                          <Input {...register('customEmailSubject')} />
                          <Field.HelperText>
                            If you need a custom subject for the success email
                          </Field.HelperText>
                        </Field.Root>
                      </Stack>
                    )}
                    <Stack gap="2">
                      <Field.Root pt="3">
                        <Field.Label>
                          If you updated the fields above please click here again
                          before saving to DB
                        </Field.Label>
                        <Button colorPalette="blue" type="submit">
                          {!formName ? 'Create' : 'Update'} Form
                        </Button>
                      </Field.Root>
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
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>

      </Portal>
    </Dialog.Root>
  );
};

export default FormEditorContainer;
