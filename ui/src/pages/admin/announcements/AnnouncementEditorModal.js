import { useForm } from 'react-hook-form';
import { customAxios as axios } from '../../helpers/customAxios';
import { useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import {
  Container,
  Box,
  Stack,
  Heading,
  Input,
  Checkbox,
  Button,
  Grid,
  GridItem,
  Textarea,
  Link,
  Switch,
  NativeSelect,
  Separator,
  Field,
  Dialog,
  Portal,
} from '@chakra-ui/react';
import { toaster } from '../../../components/ui/toaster';
import { eventIntervalList, eventTypeList } from '../../helpers/lists';
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
  const [eventInterval, setEventInterval] = useState('None');
  const [eventType, setEventType] = useState(undefined);
  const [featured, setFeatured] = useState(false);
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
    setValue('eventType', undefined);
    setValue('featured', false);
    setValue('formId', undefined);
    setValue('formSignupLink', undefined);
    setValue('additionalNotes', undefined);

    setSelectedItems(undefined);

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
    setEventType(undefined);
    setFeatured(false);
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
      setValue('eventType', data.eventType);
      setValue('featured', data.featured);
      setValue('formId', data.formId);
      setValue('signUpUrl', data.signUpUrl);
      setValue('additionalNotes', data.additionalNotes);

      setSelectedItems(data.eventType);

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
      setEventType(data.eventType);
      setFeatured(data.featured);
      setFormId(data.formId);
      setSignUpUrl(data.signUpUrl);
      setAdditionalNotes(data.additionalNotes);
    }
  };
  const [pickerItems] = useState(eventTypeList);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelectedItemsChange = (selectedItems) => {
    if (selectedItems) {
      setSelectedItems(selectedItems);
      setEventType(
        [...selectedItems].sort((a, b) => a.value.localeCompare(b.value))
      );
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
        eventType,
        featured,
        formId,
        signUpUrl,
        additionalNotes,
      };

      const statusCode = await saveAnnouncementDataToDB(announcementToSave);
      if (statusCode === 200) {
        if (actionOnEditor === 'edit') {
          toaster.create({
            title: 'Announcement Saved',
            description: 'Your announcement has been saved.',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
        } else {
          toaster.create({
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
      toaster.create({
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
              <Container maxW="container.xl">
                <Heading as="h2" size="lg" pb={3}>
                  {modalTitle(actionOnEditor)}
                </Heading>

                <Box>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack gap={2}>
                      <Field.Root invalid={errors['title']} required>
                        <Field.Label>Title</Field.Label>
                        <Input
                          id="title"
                          {...register('title', {
                            required: ' Title is required',
                          })}
                          onValueChange={(e) => setTitle(e.target.value)}
                        />
                      </Field.Root>
                      <Field.Root>
                        <Field.Label>Where should this announcement go?</Field.Label>
                        <Field.HelperText>
                          Check both if it should be shared in both Web/Mobile and
                          PPT
                        </Field.HelperText>
                        <Stack gap={10} direction={['column', 'row']}>
                          <Checkbox.Root
                            size="lg"
                            id="isInWeb"
                            {...register('isInWeb')}
                            onCheckedChange={(e) => setIsInWeb(e.target.checked)}
                            checked={isInWeb}
                          ><Checkbox.HiddenInput /><Checkbox.Control><Checkbox.Indicator /></Checkbox.Control><Checkbox.Label>Web/Mobile
                                                    </Checkbox.Label></Checkbox.Root>
                          <Checkbox.Root
                            size="lg"
                            id="isInPpt"
                            {...register('isInPpt')}
                            onCheckedChange={(e) => setIsInPpt(e.target.checked)}
                            checked={isInPpt}
                          ><Checkbox.HiddenInput /><Checkbox.Control><Checkbox.Indicator /></Checkbox.Control><Checkbox.Label>PPT
                                                    </Checkbox.Label></Checkbox.Root>
                        </Stack>
                      </Field.Root>
                      <Grid
                        templateColumns={['repeat(1,1fr)', 'repeat(2, 1fr)']}
                        gap={6}
                      >
                        <GridItem>
                          <Field.Root required>
                            <Field.Label>Announcement Display Start Date</Field.Label>
                            <Field.HelperText>
                              If the announcement is for web/mobile, please input
                              this field otherwise the announcement will not show
                            </Field.HelperText>
                          </Field.Root>
                          <Input
                            id="displayStartDateTime"
                            type="datetime-local"
                            {...register('displayStartDateTime', {
                              required: 'Display Start Date is required',
                            })}
                            onValueChange={(e) =>
                              setDisplayStartDateTime(e.target.value)
                            }
                          />
                        </GridItem>
                        <GridItem>
                          <Field.Root required>
                            <Field.Label>Announcement Display End Date</Field.Label>
                            <Field.HelperText>
                              If the announcement is for web/mobile, please input
                              this field otherwise the announcement will not show
                            </Field.HelperText>
                          </Field.Root>
                          <Input
                            id="displayEndDateTime"
                            type="datetime-local"
                            {...register('displayEndDateTime', {
                              required: 'Display End Date is required',
                            })}
                            onValueChange={(e) => setDisplayEndDateTime(e.target.value)}
                          />
                        </GridItem>

                        <GridItem>
                          <Field.Root>
                            <Field.Label>Event Start Date</Field.Label>
                            <Field.ErrorText>
                              {datePeriodInvalid &&
                                'Start and end date is invalid, please check again'}
                            </Field.ErrorText>
                            <Input
                              id="eventStartDate"
                              type="date"
                              {...register('eventStartDate')}
                              onValueChange={(e) => setEventStartDate(e.target.value)}
                            />
                          </Field.Root>
                        </GridItem>
                        <GridItem>
                          <Field.Root>
                            <Field.Label>Event Start Time</Field.Label>
                            <Input
                              id="eventStartTime"
                              type="time"
                              {...register('eventStartTime')}
                              onValueChange={(e) => setEventStartTime(e.target.value)}
                            />
                          </Field.Root>
                        </GridItem>
                        <GridItem>
                          <Field.Root>
                            <Field.Label>Event End Date</Field.Label>
                            <Field.ErrorText>
                              {datePeriodInvalid &&
                                'Start and end date is invalid, please check again'}
                            </Field.ErrorText>
                            <Input
                              id="eventEndDate"
                              type="date"
                              {...register('eventEndDate')}
                              onValueChange={(e) => setEventEndDate(e.target.value)}
                            />
                          </Field.Root>
                        </GridItem>
                        <GridItem>
                          <Field.Root>
                            <Field.Label>Event End Time</Field.Label>
                            <Input
                              id="eventEndTime"
                              type="time"
                              {...register('eventEndTime')}
                              onValueChange={(e) => setEventEndTime(e.target.value)}
                            />
                          </Field.Root>
                        </GridItem>
                      </Grid>
                      <Field.Root>
                        <Field.Label>Event interval</Field.Label>
                        <Field.HelperText>
                          If the event is recurring (e.g. Sunday Celebration),
                          please set an interval. If not, leave it as 'None'.
                        </Field.HelperText>
                        <NativeSelect.Root>
                          <NativeSelect.Field
                            id="eventInterval"
                            {...register('eventInterval')}
                            onValueChange={(e) => setEventInterval(e.target.value)}>
                            {eventIntervalList.map((interval) => {
                              return <option value={interval}>{interval}</option>;
                            })}
                          </NativeSelect.Field>
                          <NativeSelect.Indicator />
                        </NativeSelect.Root>
                      </Field.Root>
                      <Separator orientation="horizontal" />
                      <Field.Root>
                        {/* TODO: Update the Input to autocomplete when chakra is updated to v3 */}
                        <Input
                          label="Event type"
                          placeholder="Classes, Resources, Others"
                          disableCreateItem={true}
                          items={pickerItems}
                          tagStyleProps={{
                            rounded: 'full',
                            fontSize: '1rem',
                          }}
                          selectedItems={selectedItems}
                          {...register('eventType')}
                          onSelectedItemsChange={(changes) =>
                            handleSelectedItemsChange(changes.selectedItems)
                          }
                        />
                      </Field.Root>
                      <Field.Root display="flex" alignItems="center">
                        <Field.Label mb="0">Featured </Field.Label>

                        <Switch
                          px="1em"
                          id="featured"
                          {...register('featured')}
                          onValueChange={(e) => setFeatured(e.target.checked)}
                          checked={featured}
                        />
                        <Field.HelperText>
                          Determines if it will show up as featured in our events
                          page
                        </Field.HelperText>
                      </Field.Root>
                      <Separator orientation="horizontal" />
                      <Field.Root>
                        <Field.Label>Location</Field.Label>
                        <Field.HelperText>
                          Enter 'TBA' if not confirmed. If not applicable, leave it
                          blank.
                        </Field.HelperText>
                        <Input
                          id="location"
                          {...register('location')}
                          onValueChange={(e) => setLocation(e.target.value)}
                        />
                      </Field.Root>
                      <FileUpload
                        id="imageAdUrl"
                        name="imageAdUrl"
                        acceptedFileTypes="image/*"
                        setImageUrl={setImageAdUrl}
                        inputValue={imageAdUrl}
                        control={control}
                        onChange={(e) => setImageAdUrl(e.target.value)}
                      >
                        Upload Announcements Image
                      </FileUpload>
                      <Field.Root>
                        <Field.Label>Announcements Sign-up link</Field.Label>
                        <Input
                          id="signUpUrl"
                          {...register('signUpUrl')}
                          onValueChange={(e) => setSignUpUrl(e.target.value)}
                        />
                      </Field.Root>
                      <Field.Root invalid={errors['description']} required>
                        <Field.Label>Description</Field.Label>
                        <Field.HelperText>
                          This field supports formatting, you can add it yourself.
                          on how to use {''}
                          <Link
                            color="blue.500"
                            href="https://www.markdownguide.org/cheat-sheet/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Click here
                          </Link>{' '}
                        </Field.HelperText>
                        <Textarea
                          id="description"
                          {...register('description', {
                            required: 'Description is required',
                          })}
                          onValueChange={(e) => setDescription(e.target.value)}
                        />
                      </Field.Root>
                      <Field.Root>
                        <Field.Label>Additional Notes</Field.Label>
                        <Field.HelperText>
                          If there is anything that any remarks, please put it in
                          here. Also, please put a remark in here if it's an updated
                          image
                        </Field.HelperText>
                        <Textarea
                          id="additionalNotes"
                          {...register('additionalNotes')}
                          onValueChange={(e) => setAdditionalNotes(e.target.value)}
                        />
                      </Field.Root>
                      <Button
                        colorPalette="blue"
                        type="submit"
                        onClick={onSubmitEditor}
                      >
                        {modalSubmitButton(actionOnEditor)}
                      </Button>
                      ;
                    </Stack>
                  </form>
                </Box>
              </Container>
            </Dialog.Body>
            <Dialog.Footer></Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>

      </Portal>
    </Dialog.Root>
  );
};

export default AnnouncementEditorModal;
