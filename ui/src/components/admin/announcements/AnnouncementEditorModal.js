import { useForm } from 'react-hook-form';
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
  Button,
  Grid,
  GridItem,
  Textarea,
  useToast,
  Select,
} from '@chakra-ui/react';
import { eventIntervalList } from '../../helpers/lists';
import FileUpload from '../../helpers/components/FileUpload';

const AnnouncementEditorModal = (props) => {
  const {
    isOpen,
    setIsOpen,
    editAnnouncementData,
    announcementListCallback,
    actionOnEditor,
  } = props;
  const { register, handleSubmit, reset, setValue, formState, control } =
    useForm();
  const { errors } = formState;
  const toast = useToast();

  // TODO: add interval for dates to repeat events
  const [title, setTitle] = useState(undefined);
  const [isInWeb, setIsInWeb] = useState(false);
  const [isInPpt, setIsInPpt] = useState(false);
  const [description, setDescription] = useState(undefined);
  const [imageAdUrl, setImageAdUrl] = useState(undefined);
  const [location, setLocation] = useState(undefined);
  const [directionsUrl, setDirectionsUrl] = useState(undefined);
  const [displayStartDateTime, setDisplayStartDateTime] = useState(undefined);
  const [displayEndDateTime, setDisplayEndDateTime] = useState(undefined);
  const [eventStartDate, setEventStartDate] = useState(undefined);
  const [eventStartTime, setEventStartTime] = useState(undefined);
  const [eventEndDate, setEventEndDate] = useState(undefined);
  const [eventEndTime, setEventEndTime] = useState(undefined);
  const [eventInterval, setEventInterval] = useState('None'); // ['Daily', 'Weekly', 'Monthly', 'None'
  const [datePeriodInvalid, setDatePeriodInvalid] = useState(false);
  const [formId, setFormId] = useState(undefined);
  const [signUpUrl, setSignUpUrl] = useState(undefined);
  const [additionalNotes, setAdditionalNotes] = useState(undefined);

  const resetAnnouncementEditorCallback = () => {
    reset();
    setValue('title', undefined);
    setValue('isInWeb', false);
    setValue('isInPpt', false);
    setValue('description', undefined);
    setValue('imageAdUrl', undefined);
    setValue('location', undefined);
    setValue('directionsUrl', undefined);
    setValue('displayStartDateTime', undefined);
    setValue('displayEndDateTime', undefined);
    setValue('eventStartDate', undefined);
    setValue('eventStartTime', undefined);
    setValue('eventEndDate', undefined);
    setValue('eventEndTime', undefined);
    setValue('eventInterval', 'None');
    setValue('formId', undefined);
    setValue('formSignupLink', undefined);
    setValue('additionalNotes', undefined);

    setTitle(undefined);
    setIsInWeb(false);
    setIsInPpt(false);
    setDescription(undefined);
    setImageAdUrl(undefined);
    setLocation(undefined);
    setDirectionsUrl(undefined);
    setDisplayStartDateTime(undefined);
    setDisplayEndDateTime(undefined);
    setEventStartDate(undefined);
    setEventStartTime(undefined);
    setEventEndDate(undefined);
    setEventEndTime(undefined);
    setEventInterval('None');
    setFormId(undefined);
    setSignUpUrl(undefined);
    setAdditionalNotes(undefined);
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
      setValue('displayStartDateTime', data.displayStartDateTime);
      setValue('displayEndDateTime', data.displayEndDateTime);
      setValue('eventStartDate', data.eventStartDate);
      setValue('eventStartTime', data.eventStartTime);
      setValue('eventEndDate', data.eventEndDate);
      setValue('eventEndTime', data.eventEndTime);
      setValue('eventInterval', data.eventInterval);
      setValue('formId', data.formId);
      setValue('signUpUrl', data.signUpUrl);
      setValue('additionalNotes', data.additionalNotes);

      setTitle(data.title);
      setIsInWeb(data.isInWeb);
      setIsInPpt(data.isInPpt);
      setDescription(data.description);
      setImageAdUrl(data.imageAdUrl);
      setLocation(data.location);
      setDirectionsUrl(data.directionsUrl);
      setDisplayStartDateTime(data.displayStartDateTime);
      setDisplayEndDateTime(data.displayEndDateTime);
      setEventStartDate(data.eventStartDate);
      setEventStartTime(data.eventStartTime);
      setEventEndDate(data.eventEndDate);
      setEventEndTime(data.eventEndTime);
      setEventInterval(data.eventInterval);
      setFormId(data.formId);
      setSignUpUrl(data.signUpUrl);
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
        displayStartDateTime,
        displayEndDateTime,
        eventStartDate,
        eventStartTime,
        eventEndDate,
        eventEndTime,
        eventInterval,
        formId,
        signUpUrl,
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
    if (eventStartDate && eventEndDate) {
      if (DateTime.fromISO(eventEndDate) <= DateTime.fromISO(eventStartDate)) {
        setDatePeriodInvalid(true);
        return;
      }
    }
    setDatePeriodInvalid(false);
  }, [eventStartDate, eventEndDate]);

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
                  <FormControl isInvalid={errors['title']} isRequired>
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

                  <Grid
                    templateColumns={['repeat(1,1fr)', 'repeat(2, 1fr)']}
                    gap={6}
                  >
                    <GridItem>
                      <FormControl>
                        <FormLabel>Announcement Display Start Date</FormLabel>
                        <FormHelperText>
                          If the announcement is for web/mobile, please input
                          this field otherwise the announcement will not show
                        </FormHelperText>
                      </FormControl>
                      <Input
                        id="displayStartDateTime"
                        type="datetime-local"
                        {...register('displayStartDateTime')}
                        onChange={(e) =>
                          setDisplayStartDateTime(e.target.value)
                        }
                      />
                    </GridItem>
                    <GridItem>
                      <FormControl>
                        <FormLabel>Announcement Display End Date</FormLabel>
                        <FormHelperText>
                          If the announcement is for web/mobile, please input
                          this field otherwise the announcement will not show
                        </FormHelperText>
                      </FormControl>
                      <Input
                        id="displayEndDateTime"
                        type="datetime-local"
                        {...register('displayEndDateTime')}
                        onChange={(e) => setDisplayEndDateTime(e.target.value)}
                      />
                    </GridItem>

                    <GridItem>
                      <FormControl>
                        <FormLabel>Event Start Date</FormLabel>
                        <FormErrorMessage>
                          {datePeriodInvalid &&
                            'Start and end date is invalid, please check again'}
                        </FormErrorMessage>
                        <Input
                          id="eventStartDate"
                          type="date"
                          {...register('eventStartDate')}
                          onChange={(e) => setEventStartDate(e.target.value)}
                        />
                      </FormControl>
                    </GridItem>
                    <GridItem>
                      <FormControl>
                        <FormLabel>Event Start Time</FormLabel>
                        <Input
                          id="eventStartTime"
                          type="time"
                          {...register('eventStartTime')}
                          onChange={(e) => setEventStartTime(e.target.value)}
                        />
                      </FormControl>
                    </GridItem>
                    <GridItem>
                      <FormControl>
                        <FormLabel>Event End Date</FormLabel>
                        <FormErrorMessage>
                          {datePeriodInvalid &&
                            'Start and end date is invalid, please check again'}
                        </FormErrorMessage>
                        <Input
                          id="eventEndDate"
                          type="date"
                          {...register('eventEndDate')}
                          onChange={(e) => setEventEndDate(e.target.value)}
                        />
                      </FormControl>
                    </GridItem>
                    <GridItem>
                      <FormControl>
                        <FormLabel>Event End Time</FormLabel>
                        <Input
                          id="eventEndTime"
                          type="time"
                          {...register('eventEndTime')}
                          onChange={(e) => setEventEndTime(e.target.value)}
                        />
                      </FormControl>
                    </GridItem>
                  </Grid>

                  <FormControl>
                    <FormLabel>Event interval</FormLabel>
                    <FormHelperText>
                      If the event is recurring (e.g. Sunday Celebration),
                      please set an interval. If not, leave it as 'None'.
                    </FormHelperText>
                    <Select
                      id="eventInterval"
                      {...register('eventInterval')}
                      onChange={(e) => setEventInterval(e.target.value)}
                    >
                      {eventIntervalList.map((interval) => {
                        return <option value={interval}>{interval}</option>;
                      })}
                    </Select>
                  </FormControl>

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

                  <FileUpload
                    id="imageAdUrl"
                    name="imageAdUrl"
                    acceptedFileTypes="image/*"
                    placeholder="Click here to select a file"
                    setImageUrl={setImageAdUrl}
                    inputValue={imageAdUrl}
                    control={control}
                    onChange={(e) => setImageAdUrl(e.target.value)}
                  >
                    Upload Announcements Image
                  </FileUpload>

                  <FormControl>
                    <FormLabel>Announcements Sign-up link</FormLabel>
                    <Input
                      id="signUpUrl"
                      {...register('signUpUrl')}
                      onChange={(e) => setSignUpUrl(e.target.value)}
                    />
                  </FormControl>

                  <FormControl isInvalid={errors['description']} isRequired>
                    <FormLabel>Description</FormLabel>
                    <FormHelperText>
                      This field supports markdown. Just write it in somewhere
                      else (with formatting) and then paste it here and see the
                      magic happen.
                    </FormHelperText>
                    <Textarea
                      id="description"
                      {...register('description', {
                        required: 'Description is required',
                      })}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Additional Notes</FormLabel>
                    <FormHelperText>
                      If there is anything that any remarks, please put it in
                      here. Also, please put a remark in here if it's an updated
                      image
                    </FormHelperText>
                    <Textarea
                      id="additionalNotes"
                      {...register('additionalNotes')}
                      onChange={(e) => setAdditionalNotes(e.target.value)}
                    />
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
