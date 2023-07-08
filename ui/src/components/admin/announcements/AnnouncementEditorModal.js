import { useForm, Controller, set } from 'react-hook-form';
import { customAxios as axios } from '../../helpers/customAxios';
import { useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import {
  ModalBody,
  ModalCloseButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  Container,
  Box,
  Stack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  FormHelperText,
  Checkbox,
  Select,
  Button,
  Grid,
  GridItem,
  Textarea,
  useToast,
  Divider,
} from '@chakra-ui/react';

const AnnouncementEditorModal = (props) => {
  const {
    user,
    isOpen,
    setIsOpen,
    editAnnouncementData,
    announcementListCallback,
    actionOnEditor,
  } = props;
  const { register, handleSubmit, control, reset, setValue, formState } =
    useForm();
  const { errors } = formState;
  const toast = useToast();

  // TODO: add interval for dates to repeat events
  // TODO: clarify if we still need imageTakedownDate
  const [title, setTitle] = useState(null);
  const [isInWeb, setIsInWeb] = useState(false);
  const [isInPpt, setIsInPpt] = useState(false);
  const [description, setDescription] = useState(null);
  const [imageAdUrl, setImageAdUrl] = useState(null);
  const [location, setLocation] = useState(null);
  const [directionsUrl, setDirectionsUrl] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [datePeriodInvalid, setDatePeriodInvalid] = useState(false);
  const [formType, setFormType] = useState(null);
  const [formId, setFormId] = useState(null);
  const [signUpUrl, setSignUpUrl] = useState(null);
  const [imageAdTakedownDate, setImageAdTakedownDate] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState(null);

  const resetAnnouncementEditorCallback = () => {
    reset();
    setValue('title', null);
    setValue('isInWeb', false);
    setValue('isInPpt', false);
    setValue('description', null);
    setValue('imageAdUrl', null);
    setValue('location', null);
    setValue('directionsUrl', null);
    setValue('startDate', null);
    setValue('startTime', null);
    setValue('endDate', null);
    setValue('endTime', null);
    setValue('formId', null);
    setValue('formSignupLink', null);
    setValue('imageAdTakedownDate', '');
    setValue('additionalNotes', null);

    setTitle(null);
    setIsInWeb(false);
    setIsInPpt(false);
    setDescription(null);
    setImageAdUrl(null);
    setLocation(null);
    setDirectionsUrl(null);
    setStartDate(null);
    setStartTime(null);
    setEndDate(null);
    setEndTime(null);
    setFormId(null);
    setSignUpUrl(null);
    setImageAdTakedownDate('');
    setAdditionalNotes(null);
    setIsOpen(false);
    announcementListCallback();
  };

  const setAnnouncementEditorData = (data) => {
    if (data) {
      setValue('title', data.title);
      setValue('isInWeb', data.isInWeb);
      setValue('isInPpt', data.isInPpt);
      setValue('description', data.description);
      setValue('imageAdUrl', data.imageAdUrl);
      setValue('location', data.location);
      setValue('directionsUrl', data.directionsUrl);
      setValue('startDate', data.startDate);
      setValue('startTime', data.startTime);
      setValue('endDate', data.endDate);
      setValue('endTime', data.endTime);
      setValue('formId', data.formId);
      setValue('signUpUrl', data.signUpUrl);
      setValue('imageAdTakedownDate', data.imageAdTakedownDate);
      setValue('additionalNotes', data.additionalNotes);

      setTitle(data.title);
      setIsInWeb(data.isInWeb);
      setIsInPpt(data.isInPpt);
      setDescription(data.description);
      setImageAdUrl(data.imageAdUrl);
      setLocation(data.location);
      setDirectionsUrl(data.directionsUrl);
      setStartDate(data.startDate);
      setStartTime(data.startTime);
      setEndDate(data.endDate);
      setEndTime(data.endTime);
      setFormId(data.formId);
      setSignUpUrl(data.signUpUrl);
      setImageAdTakedownDate(data.imageAdTakedownDate);
      setAdditionalNotes(data.additionalNotes);
    }
  };

  const onSubmit = async (data, e) => {
    setAnnouncementEditorData(data);
  };

  const saveAnnouncementDataToDB = async (data) => {
    if (actionOnEditor === 'edit') {
      const { status } = await axios.put('/api/announcement/update', {
        id: editAnnouncementData.id,
        ...data,
      });
      return status;
    } else {
      const { status } = await axios.post('/api/announcement/create', {
        ...data,
      });
      return status;
    }
  };

  const onSubmitEditor = async (e) => {
    try {
      const announcementToSave = {
        title,
        isInWeb,
        isInPpt,
        description,
        imageAdUrl,
        location,
        directionsUrl,
        startDate,
        startTime,
        endDate,
        endTime,
        formId,
        signUpUrl,
        imageAdTakedownDate: '',
        additionalNotes,
      };

      const statusCode = await saveAnnouncementDataToDB(announcementToSave);
      if (statusCode === 200) {
        if (actionOnEditor === 'edit') {
          toast({
            title: 'Announcement Saved',
            description: 'Your announcement has been saved.',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
        } else {
          toast({
            title: 'Announcement Created',
            description: 'Your announcement has been created.',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
        }
      }

      setIsOpen(false);
      resetAnnouncementEditorCallback();
    } catch (err) {
      console.log(err);
      toast({
        title: 'Error',
        description: 'An error occurred. Please try again later.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const onClose = () => {
    resetAnnouncementEditorCallback();
  };

  useEffect(() => {
    setAnnouncementEditorData(editAnnouncementData);
  }, [editAnnouncementData]);

  useEffect(() => {
    if (startDate && endDate) {
      if (DateTime.fromISO(endDate) <= DateTime.fromISO(startDate)) {
        setDatePeriodInvalid(true);
        return;
      }
    }
    setDatePeriodInvalid(false);
  }, [startDate, endDate]);

  const modalTitle = (actionOnEditor) => {
    switch (actionOnEditor) {
      default:
        return 'New Announcement';
      case 'edit':
        return 'Edit Announcement';
      case 'duplicate':
        return 'Duplicate Announcement';
    }
  };

  const modalSubmitButton = (actionOnEditor) => {
    switch (actionOnEditor) {
      default:
        return 'Create Announcement';
      case 'edit':
        return 'Save Changes';
      case 'duplicate':
        return 'Duplicate Announcement';
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <Container maxW="container.xl">
            <Heading as="h2" size="lg" pb={3}>
              {modalTitle(actionOnEditor)}
            </Heading>

            <Box>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={2}>
                  <FormControl isInvalid={errors['title']}>
                    <FormLabel>Title</FormLabel>
                    <Input
                      id="title"
                      {...register('title', {
                        required: ' Title is required',
                      })}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Where should this announcement go?</FormLabel>
                    <FormHelperText>
                      Check both if it should be shared in both Web/Mobile and
                      PPT
                    </FormHelperText>
                    <Stack spacing={10} direction={['column', 'row']}>
                      <Checkbox
                        size="lg"
                        id="isInWeb"
                        {...register('isInWeb')}
                        isChecked={isInWeb}
                        onChange={(e) => setIsInWeb(e.target.checked)}
                      >
                        Web/Mobile
                      </Checkbox>
                      <Checkbox
                        size="lg"
                        id="isInPpt"
                        {...register('isInPpt')}
                        isChecked={isInPpt}
                        onChange={(e) => setIsInPpt(e.target.checked)}
                      >
                        PPT
                      </Checkbox>
                    </Stack>
                  </FormControl>

                  <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                    <GridItem>
                      <FormControl>
                        <FormLabel>Start Date</FormLabel>
                        <FormErrorMessage>
                          {datePeriodInvalid &&
                            'Start and end date is invalid, please check again'}
                        </FormErrorMessage>
                        <Input
                          id="startDate"
                          type="date"
                          {...register('startDate')}
                          onChange={(e) => setStartDate(e.target.value)}
                        />
                      </FormControl>
                    </GridItem>
                    <GridItem>
                      <FormControl>
                        <FormLabel>Start Time</FormLabel>
                        <Input
                          id="startTime"
                          type="time"
                          {...register('startTime')}
                          onChange={(e) => setStartTime(e.target.value)}
                        />
                      </FormControl>
                    </GridItem>
                    <GridItem>
                      <FormControl>
                        <FormLabel>End Date</FormLabel>
                        <FormErrorMessage>
                          {datePeriodInvalid &&
                            'Start and end date is invalid, please check again'}
                        </FormErrorMessage>
                        <Input
                          id="endDate"
                          type="date"
                          {...register('endDate')}
                          onChange={(e) => setEndDate(e.target.value)}
                        />
                      </FormControl>
                    </GridItem>
                    <GridItem>
                      <FormControl>
                        <FormLabel>End Time</FormLabel>
                        <Input
                          id="endTime"
                          type="time"
                          {...register('endTime')}
                          onChange={(e) => setEndTime(e.target.value)}
                        />
                      </FormControl>
                    </GridItem>
                  </Grid>

                  <FormControl>
                    <FormLabel>Location</FormLabel>
                    <FormHelperText>
                      Enter 'TBA' if not confirmed. If not applicable, leave it
                      blank.
                    </FormHelperText>
                    <Input
                      id="location"
                      {...register('location')}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </FormControl>

                  <FormControl isInvalid={errors['imageAdUrl']}>
                    <FormLabel>Announcements Image Link</FormLabel>
                    <Input
                      id="imageAdUrl"
                      {...register('imageAdUrl', {
                        required: 'Image is required',
                      })}
                      onChange={(e) => setImageAdUrl(e.target.value)}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Is there a form? </FormLabel>
                    <Controller
                      control={control}
                      name="formType"
                      defaultValue="no"
                      render={({ field: { onChange, value, ref } }) => (
                        <Select
                          onChange={(e) => {
                            onChange(e);
                            setFormType(e.target.value);
                          }}
                          ref={ref}
                          disabled={title === null}
                        >
                          <option value="no">No form</option>
                          <option value="hmcc">Yes, a HMCC form</option>
                          <option value="other">Yes, other form</option>
                        </Select>
                      )}
                    ></Controller>
                  </FormControl>
                  {(() => {
                    switch (formType) {
                      case 'hmcc':
                        return (
                          <>
                            <FormControl>
                              <FormLabel>Select Form</FormLabel>
                            </FormControl>
                            <Divider />
                          </>
                        );
                      case 'other':
                        return (
                          <>
                            <FormControl>
                              <FormLabel>Sign-up link</FormLabel>
                              <Input
                                id="signUpUrl"
                                {...register('signUpUrl')}
                              />
                            </FormControl>
                            <Divider />
                          </>
                        );
                      default:
                        return null;
                    }
                  })()}

                  <FormControl isInvalid={errors['description']}>
                    <FormLabel>Description</FormLabel>
                    <Textarea
                      id="description"
                      {...register('description', {
                        required: 'Description is required',
                      })}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                    <FormHelperText>
                      This field supports markdown. Just write it in somewhere
                      else (with formatting) and then paste it here and see the
                      magic happen.
                    </FormHelperText>
                  </FormControl>
                  <Button
                    colorScheme="blue"
                    type="submit"
                    onClick={onSubmitEditor}
                  >
                    {modalSubmitButton(actionOnEditor)}
                  </Button>
                </Stack>
              </form>
            </Box>
          </Container>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AnnouncementEditorModal;
