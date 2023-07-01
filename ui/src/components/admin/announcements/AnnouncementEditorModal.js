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
  Switch,
  Select,
  Button,
} from '@chakra-ui/react';

const AnnouncementEditorModal = (props) => {
  const {
    user,
    isOpen,
    setIsOpen,
    editAnnouncementData,
    announcementListCallback,
  } = props;
  const { register, handleSubmit, control, reset, setValue, formState } =
    useForm();
  const { errors } = formState;

  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [imageAdLink, setImageAdLink] = useState(null);
  const [location, setLocation] = useState(null);
  const [directionsLink, setDirectionsLink] = useState(null);
  const [startDateTime, setStartDateTime] = useState(null);
  const [endDateTime, setEndDateTime] = useState(null);
  const [dateTimePeriodInvalid, setDateTimePeriodInvalid] = useState(false);
  const [formType, setFormType] = useState(null);
  const [formId, setFormId] = useState(null);
  const [formSignupLink, setFormSignupLink] = useState(null);
  const [imageAdTakedownDate, setImageAdTakedownDate] = useState(null);
  const [additionalNotes, setAdditionalNotes] = useState(null);
  const [submitter, setSubmitter] = useState(null);
  const [approvedBy, setApprovedBy] = useState(null);
  const [publishedAt, setPublishedAt] = useState(null);

  const resetAnnouncementEditorCallback = () => {
    setTitle(null);
    setDescription(null);
    setImageAdLink(null);
    setLocation(null);
    setDirectionsLink(null);
    setStartDateTime(null);
    setEndDateTime(null);
    setFormId(null);
    setFormSignupLink(null);
    setImageAdTakedownDate(null);
    setAdditionalNotes(null);
    setSubmitter(null);
    setApprovedBy(null);
    setPublishedAt(null);
    setIsOpen(false);
  };

  const setAnnouncementEditorData = (data) => {
    if (data) {
      setTitle(data.announcementTitle);
      setDescription(data.description);
      setImageAdLink(data.imageAdLink);
      setLocation(data.location);
      setDirectionsLink(data.directionsLink);
      setStartDateTime(data.startDateTime);
      setEndDateTime(data.endDateTime);
      setFormId(data.formId);
      setFormSignupLink(data.formSignupLink);
      setImageAdTakedownDate(data.imageAdTakedownDate);
      setAdditionalNotes(data.additionalNotes);
      setSubmitter(data.submitter);
      setApprovedBy(data.approvedBy);
      setPublishedAt(data.publishedAt);
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
    if (startDateTime && endDateTime) {
      if (DateTime.fromISO(endDateTime) <= DateTime.fromISO(startDateTime)) {
        setDateTimePeriodInvalid(true);
        return;
      }
    }
    setDateTimePeriodInvalid(false);
  }, [startDateTime, endDateTime]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <Container maxW="container.xl">
            <Heading as="h2" size="lg">
              New/Edit/Duplicate Announcement
            </Heading>

            <Box>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={2}>
                  <FormControl isInvalid={errors['title']}>
                    <FormLabel> Title</FormLabel>
                    <Input
                      id="title"
                      {...register('title', {
                        required: ' Title is required',
                      })}
                    />
                  </FormControl>

                  <FormControl isInvalid={dateTimePeriodInvalid}>
                    <FormLabel>Start/End Date & Time</FormLabel>
                    <FormErrorMessage>
                      {dateTimePeriodInvalid &&
                        'Starting date and time is invalid. Please check again.'}
                    </FormErrorMessage>
                    Start Date & Time
                    <Input
                      type="datetime-local"
                      {...register('startDateTime')}
                    />
                    End Date & Time
                    <Input type="datetime-local" {...register('endDateTime')} />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Location</FormLabel>
                    <Input id="location" {...register('location')} />
                  </FormControl>

                  <FormControl isInvalid={errors['imageAdLink']}>
                    <FormLabel>Image Ad Link</FormLabel>
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
                    <Input
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
                  <Button type="submit">Create Announcement</Button>
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
