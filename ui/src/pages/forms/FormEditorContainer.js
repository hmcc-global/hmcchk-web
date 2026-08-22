import { useForm, Controller } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import { v4 as uuidv4 } from 'uuid';
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
  Box,
  HStack,
  SimpleGrid,
  IconButton,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Checkbox,
} from 'components';
import { FiTrash2, FiPlus } from 'react-icons/fi';
import FormEditor from './FormEditor';
import ExternalFormEditor from './ExternalFormEditor';

const isAlertTypeNone = (alertType) =>
  alertType == null || alertType === '' || alertType === 'None';

const newCourse = () => ({
  courseId: uuidv4(),
  name: '',
  platform: '',
  type: 'Online',
  courseLink: '',
  isActive: true,
});

const FormEditorContainer = (props) => {
  const {
    user,
    isOpen,
    setIsOpen,
    editFormData,
    formManagerCallback,
    staticData,
  } = props;
  const { formAlertTypeList, classPlatformTypes } = staticData;
  const formAlertTypes = Object.keys(formAlertTypeList);
  const classPlatforms = Object.keys(classPlatformTypes);

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

  // Class variables
  const [isClass, setIsClass] = useState(false);
  const [courses, setCourses] = useState([]);
  const [persistedCourseIds, setPersistedCourseIds] = useState([]);
  const [classEndingTime, setClassEndingTime] = useState('');

  // Which tracking tab (Payment / Class) is open in the editor
  const [trackingTabIndex, setTrackingTabIndex] = useState(0);

  const resetFormEditorCallback = () => {
    reset();
    setValue('formName', null);
    setValue('isPaymentRequired', false);
    setValue('paymentConfirmationEmailTemplate', '');
    setValue('paymentEmailSubject', '');
    setValue('paymentCcEmail', '');
    setValue('isClass', false);
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
    setValue('classEndingTime', '');
    setFormName(null);
    setIsPaymentRequired(false);
    setPaymentConfirmationEmailTemplate(null);
    setPaymentEmailSubject('');
    setPaymentCcEmail('');
    setIsClass(false);
    setCourses([]);
    setPersistedCourseIds([]);
    setTrackingTabIndex(0);
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
      setValue('isClass', data.isClass);
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
      setValue(
        'classEndingTime',
        data.classTrackingTemplate?.classEndingTime ?? data.classEndingTime
      );

      // Update React State for child props
      setFormName(data.formName);
      setIsPaymentRequired(data.isPaymentRequired);
      setPaymentConfirmationEmailTemplate(
        data.paymentConfirmationEmailTemplate
      );
      setClassEndingTime(
        data.classTrackingTemplate?.classEndingTime ??
          data.classEndingTime ??
          ''
      );
      setPaymentEmailSubject(data.paymentEmailSubject);
      setPaymentCcEmail(paymentCcEmail);
      setIsClass(data.isClass);
      // courses isn't a react-hook-form field (it's edited directly via
      // addCourse/removeCourse/updateCourseField), so
      // data.classTrackingTemplate.courses is only ever populated when this
      // runs off a loaded editFormData record, not off the top form's
      // onSubmit. Fall back to the current state instead of [] so clicking
      // "Create/Update Form" doesn't wipe staged courses.
      setCourses(data.classTrackingTemplate?.courses ?? courses);
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

  const addCourse = () => {
    setCourses([...courses, newCourse()]);
  };

  const removeCourse = (courseId) => {
    // Only ever called on a course added this session (not yet persisted),
    // so it can't have registrant tracking data — a plain confirm is enough.
    if (window.confirm('Are you sure you want to remove this course?')) {
      setCourses(courses.filter((course) => course.courseId !== courseId));
    }
  };

  const updateCourseField = (courseId, field, value) => {
    setCourses(
      courses.map((course) =>
        course.courseId === courseId ? { ...course, [field]: value } : course
      )
    );
  };

  // A single state write sets both platform and its derived type, so the two
  // can never disagree. (Two separate updateCourseField calls would each read
  // the same stale `courses` closure and the second would clobber the first.)
  const updateCoursePlatform = (courseId, platform) => {
    setCourses(
      courses.map((course) =>
        course.courseId === courseId
          ? {
              ...course,
              platform,
              type: classPlatformTypes[platform] ?? course.type,
            }
          : course
      )
    );
  };

  const onClose = () => {
    resetFormEditorCallback();
  };

  useEffect(() => {
    setFormManagerElements(editFormData);
    setPersistedCourseIds(
      (editFormData?.classTrackingTemplate?.courses ?? []).map(
        (course) => course.courseId
      )
    );
    setTrackingTabIndex(editFormData?.isClass ? 1 : 0);
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
                    <SimpleGrid columns={[1, 2]} spacing="3">
                      <Box>
                        <FormLabel
                          htmlFor="formAvailableFrom"
                          fontSize="sm"
                          fontWeight="normal"
                          mb="1"
                        >
                          Starting Time
                        </FormLabel>
                        <Input
                          id="formAvailableFrom"
                          type="datetime-local"
                          {...register('formAvailableFrom')}
                        />
                      </Box>
                      <Box>
                        <FormLabel
                          htmlFor="formAvailableUntil"
                          fontSize="sm"
                          fontWeight="normal"
                          mb="1"
                        >
                          Ending Time
                        </FormLabel>
                        <Input
                          id="formAvailableUntil"
                          type="datetime-local"
                          {...register('formAvailableUntil')}
                        />
                      </Box>
                    </SimpleGrid>
                    <FormErrorMessage>
                      {formPeriodInvalid &&
                        'Availability Period is invalid, please check again'}
                    </FormErrorMessage>
                  </FormControl>
                </Stack>
                {ftFlag === 'internal' && (
                  <Stack spacing="2">
                    <Divider />
                    <Heading as="h4" size="md">
                      Tracking
                    </Heading>
                    <Alert status="info">
                      <AlertIcon />
                      Tracking settings cannot be changed after the form is
                      created. A paid event will always be a paid event, and a
                      class will always be a class!
                    </Alert>
                    <Tabs
                      index={trackingTabIndex}
                      onChange={setTrackingTabIndex}
                    >
                      <TabList>
                        <Tab>Payment</Tab>
                        <Tab>Class</Tab>
                      </TabList>
                      <TabPanels>
                        <TabPanel px="0">
                          <Stack spacing="2">
                            <FormControl display="flex" alignItems="center">
                              <FormLabel htmlFor="isPaymentRequired" mb="0">
                                Is Payment Required?
                              </FormLabel>
                              <Controller
                                control={control}
                                name="isPaymentRequired"
                                defaultValue={false}
                                render={({
                                  field: { onChange, value, ref },
                                }) => (
                                  <Switch
                                    id="isPaymentRequired"
                                    onChange={(e) => {
                                      setIsPaymentRequired(e.target.checked);
                                      onChange(e);
                                    }}
                                    ref={ref}
                                    isChecked={value}
                                    isDisabled={formName != null}
                                  >
                                    {value ? 'Yes' : 'No'}
                                  </Switch>
                                )}
                              />
                            </FormControl>
                            {isPaymentRequired && (
                              <>
                                <FormControl
                                  isInvalid={
                                    errors['paymentConfirmationEmailTemp']
                                  }
                                  isRequired={isPaymentRequired}
                                >
                                  <FormLabel>
                                    {' '}
                                    Payment Confirmation Email Template
                                  </FormLabel>
                                  <Select
                                    {...register(
                                      'paymentConfirmationEmailTemplate',
                                      {
                                        required: isPaymentRequired,
                                      }
                                    )}
                                    placeholder="Select option"
                                  >
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
                                  </Select>
                                  <FormErrorMessage>
                                    {errors[
                                      'paymentConfirmationEmailTemplate'
                                    ] && 'Field type is required'}
                                  </FormErrorMessage>
                                </FormControl>
                                <FormControl>
                                  <FormLabel>Payment Email Subject</FormLabel>
                                  <Input {...register('paymentEmailSubject')} />
                                  <FormHelperText>
                                    If you need a custom subject for the payment
                                    email
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
                                    *All Payment emails will be CC'ed to these
                                    emails (addressees will be BCC'ed). Separate
                                    CC emails with ;
                                  </FormHelperText>
                                </FormControl>
                              </>
                            )}
                          </Stack>
                        </TabPanel>
                        <TabPanel px="0">
                          <Stack spacing="5">
                            <FormControl display="flex" alignItems="center">
                              <FormLabel htmlFor="isClass" mb="0">
                                Is this a Class?
                              </FormLabel>
                              <Controller
                                control={control}
                                name="isClass"
                                defaultValue={false}
                                render={({
                                  field: { onChange, value, ref },
                                }) => (
                                  <Switch
                                    id="isClass"
                                    onChange={(e) => {
                                      setIsClass(e.target.checked);
                                      onChange(e);
                                    }}
                                    ref={ref}
                                    isChecked={value}
                                    isDisabled={formName != null}
                                  >
                                    {value ? 'Yes' : 'No'}
                                  </Switch>
                                )}
                              />
                            </FormControl>
                            {isClass && (
                              <Stack spacing="3">
                                <Heading as="h5" size="sm">
                                  Courses
                                  {courses.length > 0 && ` (${courses.length})`}
                                </Heading>
                                <Alert status="info">
                                  <AlertIcon />
                                  Courses cannot be deleted (to persist
                                  historical data), it can only be deactivated.
                                </Alert>
                                {courses.map((course) => (
                                  <HStack
                                    key={course.courseId}
                                    borderWidth="1px"
                                    borderRadius="md"
                                    p="2"
                                  >
                                    <Input
                                      placeholder="Course name"
                                      value={course.name}
                                      onChange={(e) =>
                                        updateCourseField(
                                          course.courseId,
                                          'name',
                                          e.target.value
                                        )
                                      }
                                    />
                                    <Select
                                      placeholder="Select platform"
                                      value={course.platform}
                                      onChange={(e) =>
                                        updateCoursePlatform(
                                          course.courseId,
                                          e.target.value
                                        )
                                      }
                                    >
                                      {classPlatforms.map((platform) => (
                                        <option key={platform} value={platform}>
                                          {platform}
                                        </option>
                                      ))}
                                    </Select>
                                    <Input
                                      placeholder="Course link (https://...)"
                                      value={course.courseLink ?? ''}
                                      onChange={(e) =>
                                        updateCourseField(
                                          course.courseId,
                                          'courseLink',
                                          e.target.value
                                        )
                                      }
                                    />
                                    <Select
                                      isDisabled
                                      value={
                                        classPlatformTypes[course.platform] ??
                                        course.type
                                      }
                                    >
                                      <option value="Online">Online</option>
                                      <option value="In-Person">
                                        In-Person
                                      </option>
                                    </Select>
                                    <Checkbox
                                      whiteSpace="nowrap"
                                      isChecked={course.isActive}
                                      onChange={(e) =>
                                        updateCourseField(
                                          course.courseId,
                                          'isActive',
                                          e.target.checked
                                        )
                                      }
                                    >
                                      Active
                                    </Checkbox>
                                    {!persistedCourseIds.includes(
                                      course.courseId
                                    ) && (
                                      <IconButton
                                        aria-label="Remove course"
                                        icon={<FiTrash2 />}
                                        onClick={() =>
                                          removeCourse(course.courseId)
                                        }
                                        variant="ghost"
                                        colorScheme="red"
                                      />
                                    )}
                                  </HStack>
                                ))}
                                {courses.length === 0 && (
                                  <Text color="gray.500">
                                    No courses yet — add at least one course for
                                    this class.
                                  </Text>
                                )}
                                <Button
                                  onClick={addCourse}
                                  leftIcon={<FiPlus />}
                                  alignSelf="start"
                                >
                                  Add Course
                                </Button>
                                <Box>
                                  <FormLabel
                                    htmlFor="classEndingTime"
                                    fontSize="sm"
                                    fontWeight="normal"
                                    mb="1"
                                  >
                                    Class Ending Time
                                  </FormLabel>
                                  <Input
                                    id="classEndingTime"
                                    type="datetime-local"
                                    {...register('classEndingTime')}
                                  />
                                </Box>
                              </Stack>
                            )}
                          </Stack>
                        </TabPanel>
                      </TabPanels>
                    </Tabs>
                  </Stack>
                )}
                {ftFlag === 'internal' && (
                  <Stack spacing="2">
                    <Heading as="h4" size="md" id="formPrerequisitesLabel">
                      Form Prerequisites
                    </Heading>
                    <Stack
                      direction={['column', 'row']}
                      spacing="4"
                      role="group"
                      aria-labelledby="formPrerequisitesLabel"
                    >
                      <Controller
                        control={control}
                        name="requireLogin"
                        defaultValue={true}
                        render={({ field: { onChange, value, ref } }) => (
                          <Checkbox
                            onChange={onChange}
                            ref={ref}
                            isChecked={value}
                          >
                            Require login
                          </Checkbox>
                        )}
                      />
                      <Controller
                        control={control}
                        name="requireMembership"
                        defaultValue={false}
                        render={({ field: { onChange, value, ref } }) => (
                          <Checkbox
                            onChange={onChange}
                            ref={ref}
                            isChecked={value}
                          >
                            Require membership
                          </Checkbox>
                        )}
                      />
                      <Controller
                        control={control}
                        name="requireBaptism"
                        defaultValue={false}
                        render={({ field: { onChange, value, ref } }) => (
                          <Checkbox
                            onChange={onChange}
                            ref={ref}
                            isChecked={value}
                          >
                            Require baptism
                          </Checkbox>
                        )}
                      />
                    </Stack>
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
                  {!isAlertTypeNone(alertTypeFlag) && (
                    <FormControl>
                      <Controller
                        control={control}
                        name="parseUserData"
                        defaultValue={false}
                        render={({ field: { onChange, value, ref } }) => (
                          <Checkbox
                            onChange={onChange}
                            ref={ref}
                            isChecked={value}
                          >
                            Parse user data
                          </Checkbox>
                        )}
                      />
                      <FormHelperText>
                        This will send email queries to the alert recipients
                        above which will update the submitter's information in
                        our database.
                      </FormHelperText>
                    </FormControl>
                  )}
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
                  isClass: isClass,
                  classEndingTime: classEndingTime,
                  courses: courses,
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
