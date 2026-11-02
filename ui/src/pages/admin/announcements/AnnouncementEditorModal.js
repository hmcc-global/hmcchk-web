import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiX } from 'react-icons/fi';
import { CUIAutoComplete } from 'chakra-ui-autocomplete';
import { DateTime } from 'luxon';
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Icon,
  IconButton,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Select,
  FileUpload,
  Text,
  Textarea,
  useToast,
} from 'components';
import { customAxios as axios } from 'utils/customAxios';
import { eventIntervalList, eventTypeList } from 'utils/lists';
import {
  ADMIN_FONT,
  DISPLAY_DATE_ERROR,
  announcementColors,
  buildInitialForm,
  datePairSx,
  editorContainerSx,
  editorNote,
  nextPublishedValue,
  primaryButtonProps,
  quietButtonProps,
  saveToast,
  serializeForm,
  textInputProps,
  toEventTypeItems,
} from './announcementShared';

const clusterProps = {
  bg: announcementColors.wash,
  borderRadius: '12px',
  p: '14px',
  display: 'flex',
  flexDirection: 'column',
  gap: '14px',
};

const EditorField = (props) => {
  const { id, label, hint, error, required, children } = props;
  return (
    <FormControl isInvalid={Boolean(error)}>
      <FormLabel
        htmlFor={id}
        display="flex"
        alignItems="baseline"
        flexWrap="wrap"
        gap="6px"
        mb="6px"
        fontFamily={ADMIN_FONT}
        fontWeight="600"
        fontSize="14px"
        color={announcementColors.ink}
      >
        {label}
        {required ? (
          <Text
            as="span"
            fontFamily={ADMIN_FONT}
            fontWeight="500"
            fontSize="12px"
            color={announcementColors.muted}
          >
            Required
          </Text>
        ) : null}
      </FormLabel>
      {children}
      {hint ? (
        <FormHelperText
          fontFamily={ADMIN_FONT}
          color={announcementColors.muted}
          fontSize="13px"
        >
          {hint}
        </FormHelperText>
      ) : null}
      <FormErrorMessage fontFamily={ADMIN_FONT}>{error}</FormErrorMessage>
    </FormControl>
  );
};

const checkboxSx = {
  '.chakra-checkbox__control': {
    borderColor: announcementColors.line,
    mt: '3px',
    _checked: {
      bg: announcementColors.blue,
      borderColor: announcementColors.blue,
    },
  },
};

const DestinationCheck = (props) => {
  const { isChecked, onChange, label, hint } = props;
  return (
    <Checkbox
      isChecked={isChecked}
      onChange={onChange}
      alignItems="flex-start"
      sx={checkboxSx}
    >
      <Box mt="-2px">
        <Text
          fontFamily={ADMIN_FONT}
          fontWeight="600"
          fontSize="14px"
          color={announcementColors.ink}
        >
          {label}
        </Text>
        <Text
          fontFamily={ADMIN_FONT}
          fontWeight="500"
          fontSize="13px"
          color={announcementColors.muted}
        >
          {hint}
        </Text>
      </Box>
    </Checkbox>
  );
};

const AnnouncementEditorModal = (props) => {
  const {
    layout,
    isOpen,
    editorSession,
    focusRequest,
    onRequestClose,
    onDirtyChange,
    onSaved,
  } = props;
  const toast = useToast();
  const { control } = useForm();
  const titleRef = useRef(null);
  const displayStartRef = useRef(null);
  const displayEndRef = useRef(null);
  const descriptionRef = useRef(null);

  const [form, setForm] = useState(() => buildInitialForm('create', null));
  const [snapshot, setSnapshot] = useState(() =>
    serializeForm(buildInitialForm('create', null))
  );
  const [errors, setErrors] = useState({});
  const [wasOnWeb, setWasOnWeb] = useState(false);
  const [wasPublished, setWasPublished] = useState(false);
  const [datePeriodInvalid, setDatePeriodInvalid] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [appliedToken, setAppliedToken] = useState(0);
  const [appliedFocus, setAppliedFocus] = useState(0);

  const sessionToken = editorSession?.token ?? 0;
  const action = editorSession?.action || 'create';

  if (isOpen && editorSession && sessionToken !== appliedToken) {
    const nextForm = buildInitialForm(action, editorSession.announcement);
    setAppliedToken(sessionToken);
    setForm(nextForm);
    setSnapshot(serializeForm(nextForm));
    setWasOnWeb(
      action === 'edit' && editorSession.announcement?.isInWeb === true
    );
    setWasPublished(
      action === 'edit' && editorSession.announcement?.isPublished === true
    );
    setErrors(
      editorSession.pendingError?.message
        ? { display: editorSession.pendingError.message }
        : {}
    );
    setDatePeriodInvalid(false);
  }

  const focusToken = focusRequest?.token ?? 0;
  if (isOpen && focusRequest && focusToken !== appliedFocus) {
    setAppliedFocus(focusToken);
    setErrors({ display: focusRequest.message });
  }

  useEffect(() => {
    onDirtyChange(isOpen && serializeForm(form) !== snapshot);
  }, [form, snapshot, isOpen, onDirtyChange]);

  useEffect(() => {
    if (form.eventStartDate && form.eventEndDate) {
      const start = DateTime.fromISO(form.eventStartDate);
      const end = DateTime.fromISO(form.eventEndDate);
      if (start.isValid && end.isValid && end <= start) {
        setDatePeriodInvalid(true);
        return;
      }
    }
    setDatePeriodInvalid(false);
  }, [form.eventStartDate, form.eventEndDate]);

  useEffect(() => {
    if (!isOpen || !appliedToken) return undefined;
    const field =
      focusRequest?.field || editorSession?.pendingError?.field || '';
    const handle = window.setTimeout(() => {
      const node =
        field === 'displayEnd'
          ? displayEndRef.current
          : field === 'displayStart'
          ? displayStartRef.current
          : titleRef.current;
      if (node && typeof node.focus === 'function') {
        node.focus();
        node.scrollIntoView({ block: 'center' });
      }
    }, 40);
    return () => window.clearTimeout(handle);
  }, [appliedToken, appliedFocus, isOpen, editorSession, focusRequest]);

  const updateField = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      const next = { ...current };
      if (key === 'title') delete next.title;
      if (key === 'description') delete next.description;
      if (key === 'displayStartDateTime' || key === 'displayEndDateTime') {
        delete next.display;
      }
      return next;
    });
  };

  const handleSave = async (event) => {
    if (event && typeof event.preventDefault === 'function') {
      event.preventDefault();
    }
    const title = form.title.trim();
    const description = form.description.trim();
    const nextErrors = {};
    if (!title) {
      nextErrors.title =
        'Add a title so people know what this announcement is.';
    }
    if (!description) {
      nextErrors.description =
        'Add a description. This is the text people read.';
    }
    if (
      form.isInWeb &&
      (!form.displayStartDateTime || !form.displayEndDateTime)
    ) {
      nextErrors.display = DISPLAY_DATE_ERROR;
    }
    if (Object.keys(nextErrors).length || datePeriodInvalid) {
      setErrors(nextErrors);
      const node = nextErrors.title
        ? titleRef.current
        : nextErrors.description
        ? descriptionRef.current
        : nextErrors.display
        ? form.displayStartDateTime
          ? displayEndRef.current
          : displayStartRef.current
        : document.getElementById('announcement-event-end');
      if (node && typeof node.focus === 'function') node.focus();
      return;
    }

    const isPublished = nextPublishedValue({
      action,
      isInWeb: form.isInWeb,
      wasOnWeb,
      wasPublished,
    });
    const eventType = toEventTypeItems(form.eventType).sort((left, right) =>
      left.value.localeCompare(right.value)
    );
    const payload = {
      title,
      isInWeb: form.isInWeb,
      isInPpt: form.isInPpt,
      description,
      imageAdUrl: form.imageAdUrl,
      location: form.location.trim(),
      directionsUrl: form.directionsUrl,
      displayStartDateTime: form.displayStartDateTime,
      displayEndDateTime: form.displayEndDateTime,
      eventStartDate: form.eventStartDate,
      eventStartTime: form.eventStartTime,
      eventEndDate: form.eventEndDate,
      eventEndTime: form.eventEndTime,
      eventInterval: form.eventInterval || 'None',
      eventType,
      featured: form.featured,
      formId: form.formId,
      signUpUrl: form.signUpUrl.trim(),
      additionalNotes: form.additionalNotes.trim(),
      isPublished,
    };

    // The update action treats isPublished without approvedBy as a fresh Publish
    // and skips lastUpdatedBy. A save of an announcement that is already live
    // must send the approver it already has.
    const existingApprover = editorSession?.announcement?.approvedBy;
    if (
      action === 'edit' &&
      isPublished &&
      wasOnWeb &&
      wasPublished &&
      typeof existingApprover === 'string' &&
      existingApprover
    ) {
      payload.approvedBy = existingApprover;
    }

    setIsSaving(true);
    try {
      const response =
        action === 'edit'
          ? await axios.put('/api/announcement/update', {
              id: editorSession?.announcement?.id,
              ...payload,
            })
          : await axios.post('/api/announcement/create', payload);
      if (response.status !== 200) {
        throw new Error('save');
      }
      setSnapshot(serializeForm({ ...form, title, description }));
      toast({
        description: saveToast({
          isInWeb: form.isInWeb,
          isInPpt: form.isInPpt,
          isPublished,
          action,
        }),
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      onSaved({ isInWeb: form.isInWeb, isPublished, action });
      onRequestClose({ force: true });
    } catch (err) {
      console.log(err);
      toast({
        title: 'Error',
        description: 'An error occurred. Please try again later.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const note = editorNote({
    action,
    isInWeb: form.isInWeb,
    isInPpt: form.isInPpt,
    wasOnWeb,
    wasPublished,
  });
  const heading =
    action === 'edit'
      ? 'Edit announcement'
      : action === 'duplicate'
      ? 'Duplicate announcement'
      : 'New announcement';
  const showDisplay = form.isInWeb || Boolean(errors.display);
  const intervalOptions = eventIntervalList.includes(form.eventInterval)
    ? eventIntervalList
    : [form.eventInterval, ...eventIntervalList].filter(Boolean);

  const fields = (
    <Box
      as="form"
      id="announcement-editor-form"
      onSubmit={handleSave}
      display="flex"
      flexDirection="column"
      gap="18px"
    >
      <EditorField
        id="announcement-title"
        label="Title"
        required
        error={errors.title}
      >
        <Input
          id="announcement-title"
          ref={titleRef}
          value={form.title}
          autoComplete="off"
          aria-required="true"
          aria-invalid={errors.title ? true : undefined}
          onChange={(event) => updateField('title', event.target.value)}
          {...textInputProps}
          borderColor={
            errors.title ? announcementColors.danger : announcementColors.line
          }
        />
      </EditorField>

      <Box as="fieldset" border="0" m="0" p="0">
        <Text
          as="legend"
          mb="10px"
          fontFamily={ADMIN_FONT}
          fontWeight="600"
          fontSize="14px"
        >
          Where should this announcement go?
        </Text>
        <Flex direction="column" gap="10px">
          <DestinationCheck
            isChecked={form.isInWeb}
            onChange={(event) => updateField('isInWeb', event.target.checked)}
            label="Website"
            hint="People can read this on the church website."
          />
          <DestinationCheck
            isChecked={form.isInPpt}
            onChange={(event) => updateField('isInPpt', event.target.checked)}
            label="Sunday slides"
            hint="Shown with the Sunday slides. Tick both if it belongs in both places."
          />
        </Flex>
      </Box>

      {showDisplay ? (
        <Box {...clusterProps}>
          <Text fontFamily={ADMIN_FONT} fontSize="13px" fontWeight="700">
            When it shows on the website{' '}
            <Text
              as="span"
              fontWeight="500"
              fontSize="12px"
              color={announcementColors.muted}
            >
              Required for the website
            </Text>
          </Text>
          <Text
            fontFamily={ADMIN_FONT}
            fontSize="13px"
            color={announcementColors.muted}
          >
            These decide when people can see it on the website. They are not the
            time of the gathering.
          </Text>
          <Box sx={datePairSx}>
            <EditorField id="announcement-display-start" label="Display start">
              <Input
                id="announcement-display-start"
                ref={displayStartRef}
                type="datetime-local"
                value={form.displayStartDateTime}
                aria-required={form.isInWeb ? 'true' : 'false'}
                aria-invalid={errors.display ? true : undefined}
                onChange={(event) =>
                  updateField('displayStartDateTime', event.target.value)
                }
                {...textInputProps}
                borderColor={
                  errors.display
                    ? announcementColors.danger
                    : announcementColors.line
                }
              />
            </EditorField>
            <EditorField
              id="announcement-display-end"
              label="Display end"
              hint="After this, it leaves Showing now."
            >
              <Input
                id="announcement-display-end"
                ref={displayEndRef}
                type="datetime-local"
                value={form.displayEndDateTime}
                aria-required={form.isInWeb ? 'true' : 'false'}
                aria-invalid={errors.display ? true : undefined}
                onChange={(event) =>
                  updateField('displayEndDateTime', event.target.value)
                }
                {...textInputProps}
                borderColor={
                  errors.display
                    ? announcementColors.danger
                    : announcementColors.line
                }
              />
            </EditorField>
          </Box>
          {errors.display ? (
            <Text
              role="alert"
              fontFamily={ADMIN_FONT}
              fontSize="13px"
              color={announcementColors.danger}
            >
              {errors.display}
            </Text>
          ) : null}
        </Box>
      ) : null}

      <Flex direction="column" gap="18px">
        <Box {...clusterProps}>
          <Text fontFamily={ADMIN_FONT} fontSize="13px" fontWeight="700">
            The event
          </Text>
          <Text
            fontFamily={ADMIN_FONT}
            fontSize="13px"
            color={announcementColors.muted}
          >
            This is when people should show up. Leave a box blank if you do not
            know it yet.
          </Text>
          <Box sx={datePairSx}>
            <EditorField id="announcement-event-start" label="Event start date">
              <Input
                id="announcement-event-start"
                type="date"
                value={form.eventStartDate}
                onChange={(event) =>
                  updateField('eventStartDate', event.target.value)
                }
                {...textInputProps}
              />
            </EditorField>
            <EditorField
              id="announcement-event-start-time"
              label="Event start time"
            >
              <Input
                id="announcement-event-start-time"
                type="time"
                value={form.eventStartTime}
                onChange={(event) =>
                  updateField('eventStartTime', event.target.value)
                }
                {...textInputProps}
              />
            </EditorField>
          </Box>
          <Box sx={datePairSx}>
            <EditorField id="announcement-event-end" label="Event end date">
              <Input
                id="announcement-event-end"
                type="date"
                value={form.eventEndDate}
                aria-invalid={datePeriodInvalid ? true : undefined}
                onChange={(event) =>
                  updateField('eventEndDate', event.target.value)
                }
                {...textInputProps}
                borderColor={
                  datePeriodInvalid
                    ? announcementColors.danger
                    : announcementColors.line
                }
              />
            </EditorField>
            <EditorField
              id="announcement-event-end-time"
              label="Event end time"
            >
              <Input
                id="announcement-event-end-time"
                type="time"
                value={form.eventEndTime}
                onChange={(event) =>
                  updateField('eventEndTime', event.target.value)
                }
                {...textInputProps}
              />
            </EditorField>
          </Box>
          {datePeriodInvalid ? (
            <Text
              role="alert"
              fontFamily={ADMIN_FONT}
              fontSize="13px"
              color={announcementColors.danger}
            >
              Start and end date is invalid, please check again
            </Text>
          ) : null}
          <EditorField
            id="announcement-interval"
            label="Event interval"
            hint="For a repeating event, such as Sunday Celebration. Otherwise leave it as None."
          >
            <Select
              id="announcement-interval"
              value={form.eventInterval}
              onChange={(event) =>
                updateField('eventInterval', event.target.value)
              }
              {...textInputProps}
            >
              {intervalOptions.map((interval) => (
                <option key={interval} value={interval}>
                  {interval}
                </option>
              ))}
            </Select>
          </EditorField>
          <Box>
            <CUIAutoComplete
              key={`event-type-${appliedToken}`}
              label="Event type"
              placeholder="Classes, Resources, Others"
              disableCreateItem
              items={eventTypeList}
              selectedItems={
                Array.isArray(form.eventType) ? form.eventType : []
              }
              tagStyleProps={{ rounded: 'full', fontSize: '1rem' }}
              onSelectedItemsChange={(changes) => {
                const next = Array.isArray(changes?.selectedItems)
                  ? changes.selectedItems
                  : [];
                updateField('eventType', next);
              }}
            />
            <Text
              mt="6px"
              fontFamily={ADMIN_FONT}
              fontSize="13px"
              color={announcementColors.muted}
            >
              A category, such as Classes, Resources, or Others. Not a second
              title.
            </Text>
          </Box>
          <DestinationCheck
            isChecked={form.featured}
            onChange={(event) => updateField('featured', event.target.checked)}
            label="Featured"
            hint="Pins this near the top of the announcements on the website."
          />
          <EditorField
            id="announcement-location"
            label="Location"
            hint="Write TBA if it is not confirmed. Leave blank if there is no place."
          >
            <Input
              id="announcement-location"
              value={form.location}
              autoComplete="off"
              onChange={(event) => updateField('location', event.target.value)}
              {...textInputProps}
            />
          </EditorField>
        </Box>

        <Box {...clusterProps}>
          <Text fontFamily={ADMIN_FONT} fontSize="13px" fontWeight="700">
            What people see
          </Text>
          <Box>
            <FileUpload
              key={`image-${appliedToken}`}
              id="imageAdUrl"
              name="imageAdUrl"
              acceptedFileTypes="image/*"
              setImageUrl={(url) =>
                updateField('imageAdUrl', typeof url === 'string' ? url : '')
              }
              inputValue={form.imageAdUrl}
              control={control}
            >
              Image link
            </FileUpload>
            <Text
              mt="6px"
              fontFamily={ADMIN_FONT}
              fontSize="13px"
              color={announcementColors.muted}
            >
              Paste the link to the picture, or upload one. Leave blank and the
              list shows No image.
            </Text>
          </Box>
          <EditorField
            id="announcement-signup"
            label="Sign-up link"
            hint="Example: https://hongkong.hmccglobal.org/signup"
          >
            <Input
              id="announcement-signup"
              value={form.signUpUrl}
              autoComplete="off"
              inputMode="url"
              onChange={(event) => updateField('signUpUrl', event.target.value)}
              {...textInputProps}
            />
          </EditorField>
          <EditorField
            id="announcement-description"
            label="Description"
            required
            error={errors.description}
            hint={
              <>
                What people read. This is the public text, not an internal note.
                This field supports formatting.{' '}
                <Link
                  color={announcementColors.blueLight}
                  href="https://www.markdownguide.org/cheat-sheet/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Formatting guide
                </Link>
              </>
            }
          >
            <Textarea
              id="announcement-description"
              ref={descriptionRef}
              value={form.description}
              minH="88px"
              resize="vertical"
              aria-required="true"
              aria-invalid={errors.description ? true : undefined}
              borderColor={
                errors.description
                  ? announcementColors.danger
                  : announcementColors.line
              }
              fontFamily={ADMIN_FONT}
              borderRadius="8px"
              onChange={(event) =>
                updateField('description', event.target.value)
              }
            />
          </EditorField>
        </Box>
      </Flex>

      <EditorField
        id="announcement-notes"
        label="Additional notes"
        hint="Internal remarks, including when the image was updated. People on the website do not see this."
      >
        <Textarea
          id="announcement-notes"
          value={form.additionalNotes}
          minH="88px"
          resize="vertical"
          fontFamily={ADMIN_FONT}
          borderRadius="8px"
          borderColor={announcementColors.line}
          onChange={(event) =>
            updateField('additionalNotes', event.target.value)
          }
        />
      </EditorField>
    </Box>
  );

  const footer = (
    <Flex
      align="center"
      gap="8px"
      w="100%"
      pt="16px"
      pb="20px"
      px="24px"
      borderTop="1px solid"
      borderColor={announcementColors.line}
    >
      {layout === 'dialog' ? (
        <IconButton
          aria-label="Close editor"
          icon={<Icon as={FiX} boxSize="18px" />}
          onClick={() => onRequestClose()}
          {...quietButtonProps}
          w="44px"
          h="44px"
          minW="44px"
        />
      ) : null}
      <Button
        type="button"
        onClick={() => onRequestClose()}
        {...quietButtonProps}
      >
        Cancel
      </Button>
      <Button
        type="submit"
        form="announcement-editor-form"
        ml="auto"
        isLoading={isSaving}
        {...primaryButtonProps}
      >
        Save
      </Button>
    </Flex>
  );

  const openEditor = (
    <>
      <Box
        position="relative"
        px="24px"
        pt="22px"
        pb="16px"
        pr={layout === 'dock' ? '64px' : '24px'}
      >
        <Heading
          as="h2"
          id="announcement-editor-title"
          fontFamily={ADMIN_FONT}
          fontSize="20px"
          fontWeight="600"
          letterSpacing="-0.03em"
        >
          {heading}
        </Heading>
        <Text
          mt="4px"
          fontFamily={ADMIN_FONT}
          fontSize="14px"
          color={announcementColors.muted}
        >
          {note}
        </Text>
        {layout === 'dock' ? (
          <IconButton
            aria-label="Close editor"
            icon={<Icon as={FiX} boxSize="18px" />}
            onClick={() => onRequestClose()}
            position="absolute"
            top="18px"
            right="16px"
            {...quietButtonProps}
            w="40px"
            h="40px"
            minW="40px"
          />
        ) : null}
      </Box>
      <Box flex="1" minH="0" overflow="auto" px="24px" py="20px">
        {fields}
      </Box>
      {footer}
    </>
  );

  if (layout === 'dialog') {
    return (
      <Modal
        isOpen={isOpen}
        onClose={() => onRequestClose()}
        size="full"
        blockScrollOnMount
        trapFocus
      >
        <ModalOverlay bg="rgba(20, 23, 28, 0.28)" />
        <ModalContent
          m="0"
          h="100vh"
          maxW="100%"
          borderRadius="0"
          display="flex"
          flexDirection="column"
          bg={announcementColors.paper}
          fontFamily={ADMIN_FONT}
          color={announcementColors.ink}
          sx={editorContainerSx}
          aria-labelledby="announcement-editor-title"
        >
          <ModalBody
            p="0"
            display="flex"
            flexDirection="column"
            flex="1"
            minH="0"
            overflow="hidden"
          >
            {isOpen ? openEditor : null}
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  }

  return (
    <Flex
      as="aside"
      aria-labelledby="announcement-editor-title"
      direction="column"
      flex="0 0 560px"
      w="560px"
      maxW="100%"
      alignSelf="flex-start"
      position="sticky"
      top="0"
      maxH="calc(100vh - 7vh - 48px)"
      bg={announcementColors.paper}
      border="1px solid"
      borderColor={announcementColors.line}
      borderRadius="16px"
      boxShadow={announcementColors.shadow}
      overflow="hidden"
      fontFamily={ADMIN_FONT}
      color={announcementColors.ink}
      sx={editorContainerSx}
    >
      {isOpen ? (
        openEditor
      ) : (
        <Box p="28px" px="24px" maxW="36ch">
          <Heading
            as="h2"
            id="announcement-editor-title"
            fontFamily={ADMIN_FONT}
            fontSize="20px"
            fontWeight="600"
            letterSpacing="-0.03em"
          >
            Announcement
          </Heading>
          <Text
            mt="8px"
            fontFamily={ADMIN_FONT}
            fontSize="15px"
            color={announcementColors.muted}
          >
            Select an announcement to see and edit it. The list stays beside
            this column, so you can tell which one you are changing.
          </Text>
        </Box>
      )}
    </Flex>
  );
};

export default AnnouncementEditorModal;
