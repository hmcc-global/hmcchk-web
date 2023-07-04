import { useForm, Controller, set } from 'react-hook-form';
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

  const [title, setTitle] = useState(null);
  const [isInWeb, setIsInWeb] = useState(false);
  const [isInPpt, setIsInPpt] = useState(false);
  const [description, setDescription] = useState(null);
  const [imageAdLink, setImageAdLink] = useState(null);
  const [location, setLocation] = useState(null);
  const [directionsLink, setDirectionsLink] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [datePeriodInvalid, setDatePeriodInvalid] = useState(false);
  const [formType, setFormType] = useState(null);
  const [formId, setFormId] = useState(null);
  const [formSignupLink, setFormSignupLink] = useState(null);
  const [imageAdTakedownDate, setImageAdTakedownDate] = useState(null);
  const [additionalNotes, setAdditionalNotes] = useState(null);
  const [submitter, setSubmitter] = useState(null);
  const [approvedBy, setApprovedBy] = useState(null);

  const resetAnnouncementEditorCallback = () => {
    reset();
    setValue('title', null);
    setValue('isInWeb', false);
    setValue('isInPpt', false);
    setValue('description', null);
    setValue('imageAdLink', null);
    setValue('location', null);
    setValue('directionsLink', null);
    setValue('startDate', null);
    setValue('startTime', null);
    setValue('endDate', null);
    setValue('endTime', null);
    setValue('formId', null);
    setValue('formSignupLink', null);
    setValue('imageAdTakedownDate', null);
    setValue('additionalNotes', null);
    setTitle(null);
    setIsInWeb(false);
    setIsInPpt(false);
    setDescription(null);
    setImageAdLink(null);
    setLocation(null);
    setDirectionsLink(null);
    setStartDate(null);
    setStartTime(null);
    setEndDate(null);
    setEndTime(null);
    setFormId(null);
    setFormSignupLink(null);
    setImageAdTakedownDate(null);
    setAdditionalNotes(null);
    setIsOpen(false);
  };

  const setAnnouncementEditorData = (data) => {
    if (data) {
      setValue('title', data.title);
      setValue('isInWeb', data.isInWeb);
      setValue('isInPpt', data.isInPpt);
      setValue('description', data.description);
      setValue('imageAdLink', data.imageAdUrl);
      setValue('location', data.location);
      setValue('directionsLink', data.directionsUrl);
      setValue('startDate', data.startDate);
      setValue('startTime', data.startTime);
      setValue('endDate', data.endDate);
      setValue('endTime', data.endTime);
      setValue('formId', data.formId);
      setValue('formSignupLink', data.signUpUrl);
      setValue('imageAdTakedownDate', data.imageAdTakedownDate);
      setValue('additionalNotes', data.additionalNotes);

      setTitle(data.title);
      setIsInWeb(data.isInWeb);
      setIsInPpt(data.isInPpt);
      setDescription(data.description);
      setImageAdLink(data.imageAdUrl);
      setLocation(data.location);
      setDirectionsLink(data.directionsUrl);
      setStartDate(data.startDate);
      setStartTime(data.startTime);
      setEndDate(data.endDate);
      setEndTime(data.endTime);
      setFormId(data.formId);
      setFormSignupLink(data.signUpUrl);
      setImageAdTakedownDate(data.imageAdTakedownDate);
      setAdditionalNotes(data.additionalNotes);
      setSubmitter(data.submitter);
      setApprovedBy(data.approvedBy);
    }
  };

  const onSubmit = async (data, e) => {
    setAnnouncementEditorData(data);
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
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Where should this announcement go?</FormLabel>
                    <FormHelperText>
                      Check both if it should be shared in both Web/Mobile and
                      PPT
                    </FormHelperText>
                    <Stack spacing={10} direction={['column', 'row']}>
                      <Checkbox size="lg" id="isInWeb" {...register('isInWeb')}>
                        Web/Mobile
                      </Checkbox>
                      <Checkbox size="lg" id="isInPpt" {...register('isInPpt')}>
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
                    <Input id="location" {...register('location')} />
                  </FormControl>

                  <FormControl isInvalid={errors['imageAdLink']}>
                    <FormLabel>Announcements Image Link</FormLabel>
                    <Input
                      id="imageAdLink"
                      {...register('imageAdLink', {
                        required: 'Image is required',
                      })}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Is there a form? </FormLabel>
                    <Select {...register('formType')}>
                      <option value="no">No form</option>
                      <option value="hmcc">Yes, a HMCC form</option>
                      <option value="others">Yes, others form</option>
                    </Select>
                  </FormControl>
                  {(() => {
                    switch (formType) {
                      case 'hmcc':
                        return (
                          <>
                            <FormControl>
                              <FormLabel>Select Form</FormLabel>
                            </FormControl>
                          </>
                        );
                      case 'others':
                        return (
                          <>
                            <FormControl>
                              <FormLabel>Sign-up link</FormLabel>
                            </FormControl>
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
                    />
                    <FormHelperText>
                      This field supports markdown. Just write it in somewhere
                      else (with formatting) and then paste it here and see the
                      magic happen.
                    </FormHelperText>
                  </FormControl>
                  <Button colorScheme="blue" type="submit">
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
