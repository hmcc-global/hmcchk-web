import { useEffect, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { customAxios as axios } from 'utils/customAxios';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Select,
  RadioGroup,
  Radio,
  Stack,
  HStack,
  Box,
  Text,
  Badge,
  Alert,
  AlertIcon,
  Divider,
  Link,
  useToast,
} from 'components';
import {
  isSafeDestinationUrl,
  toStoredIso,
  toLocalInput,
  resolvePreview,
  scheduleOutsideForm,
  nowIsoHk,
} from 'utils/siteLinks';

const EMPTY_VALUES = {
  destinationType: 'form',
  formId: '',
  destinationUrl: '',
  activeFrom: '',
  activeUntil: '',
};

const SiteLinkTargetEditorModal = (props) => {
  const { isOpen, onClose, siteLink, target, forms, onSaved } = props;
  const toast = useToast();
  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({ mode: 'onChange', defaultValues: EMPTY_VALUES });

  useEffect(() => {
    if (!isOpen) return;
    reset(
      target
        ? {
            destinationType: target.destinationType || 'form',
            formId: target.formId || '',
            destinationUrl: target.destinationUrl || '',
            activeFrom: toLocalInput(target.activeFrom),
            activeUntil: toLocalInput(target.activeUntil),
          }
        : EMPTY_VALUES
    );
  }, [isOpen, target, reset]);

  const destinationType = watch('destinationType');
  const formId = watch('formId');
  const destinationUrl = watch('destinationUrl');
  const activeFrom = watch('activeFrom');
  const activeUntil = watch('activeUntil');

  const selectedForm = useMemo(
    () => (forms || []).find((form) => form.id === formId) || null,
    [forms, formId]
  );

  const formField = register('formId', {
    validate: (value, values) =>
      values.destinationType !== 'form' ||
      Boolean(value) ||
      'Please select a form.',
  });

  // Prefill the schedule from the form's availability window when empty.
  const onFormSelect = (e) => {
    formField.onChange(e);
    const form = (forms || []).find((item) => item.id === e.target.value);
    if (form) {
      if (!getValues('activeFrom') && form.formAvailableFrom) {
        setValue('activeFrom', toLocalInput(form.formAvailableFrom));
      }
      if (!getValues('activeUntil') && form.formAvailableUntil) {
        setValue('activeUntil', toLocalInput(form.formAvailableUntil));
      }
    }
  };

  const pseudoTarget = {
    destinationType,
    formId,
    destinationUrl,
    activeFrom: toStoredIso(activeFrom),
    activeUntil: toStoredIso(activeUntil),
  };
  const preview = resolvePreview(pseudoTarget, selectedForm, nowIsoHk());
  const scheduleWarning = scheduleOutsideForm(pseudoTarget, selectedForm);

  const onSubmit = async (values) => {
    const payload = {
      destinationType: values.destinationType,
      formId: values.destinationType === 'form' ? values.formId : '',
      destinationUrl:
        values.destinationType === 'url' ? values.destinationUrl : '',
      activeFrom: toStoredIso(values.activeFrom),
      activeUntil: toStoredIso(values.activeUntil),
    };
    try {
      if (target) {
        await axios.put('/api/site-links/update-target', {
          id: target.id,
          ...payload,
        });
      } else {
        await axios.post('/api/site-links/create-target', {
          siteLink: siteLink.id,
          ...payload,
        });
      }
      toast({
        description: 'Target saved',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      onSaved();
    } catch (err) {
      console.log(err);
      const data = err.response && err.response.data;
      const message =
        (typeof data === 'string' && data) ||
        (data && data.message) ||
        'Could not save target. Please check the fields and try again.';
      toast({
        description: message,
        status: 'error',
        duration: 8000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader>
          {target ? 'Edit target' : 'Add target'}
          {siteLink ? ` — /go/${siteLink.slug}` : ''}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>Destination type</FormLabel>
              <Controller
                name="destinationType"
                control={control}
                render={({ field }) => (
                  <RadioGroup {...field}>
                    <Stack direction="row" spacing={6}>
                      <Radio value="form">Existing Form</Radio>
                      <Radio value="url">Direct URL</Radio>
                    </Stack>
                  </RadioGroup>
                )}
              />
            </FormControl>

            {destinationType === 'form' && (
              <FormControl isRequired isInvalid={Boolean(errors.formId)}>
                <FormLabel>Form</FormLabel>
                <Select
                  placeholder="Select a form"
                  {...formField}
                  onChange={onFormSelect}
                >
                  {(forms || []).map((form) => (
                    <option key={form.id} value={form.id}>
                      {form.formName}{' '}
                      {form.formType === 'external'
                        ? '(external)'
                        : '(internal)'}
                    </option>
                  ))}
                </Select>
                <FormErrorMessage>
                  {errors.formId && errors.formId.message}
                </FormErrorMessage>
                {selectedForm && (
                  <Box mt={2} fontSize="sm">
                    <HStack spacing={2}>
                      <Badge
                        colorScheme={
                          selectedForm.formType === 'external'
                            ? 'orange'
                            : 'teal'
                        }
                      >
                        {selectedForm.formType === 'external'
                          ? 'External'
                          : 'Internal'}
                      </Badge>
                      <Badge
                        colorScheme={selectedForm.isPublished ? 'green' : 'red'}
                      >
                        {selectedForm.isPublished ? 'Published' : 'Unpublished'}
                      </Badge>
                    </HStack>
                    <Text mt={1} color="gray.600">
                      Available: {selectedForm.formAvailableFrom || '—'} to{' '}
                      {selectedForm.formAvailableUntil || '—'}
                    </Text>
                  </Box>
                )}
              </FormControl>
            )}

            {destinationType === 'url' && (
              <FormControl
                isRequired
                isInvalid={Boolean(errors.destinationUrl)}
              >
                <FormLabel>Destination URL or path</FormLabel>
                <Input
                  placeholder="https://… or /internal/path"
                  {...register('destinationUrl', {
                    validate: (value, values) =>
                      values.destinationType !== 'url' ||
                      (Boolean(value) && isSafeDestinationUrl(value)) ||
                      'Must be an https:// URL or a safe internal path.',
                  })}
                />
                <FormErrorMessage>
                  {errors.destinationUrl && errors.destinationUrl.message}
                </FormErrorMessage>
                <FormHelperText>
                  javascript:, data:, and protocol-relative (//) links are
                  rejected.
                </FormHelperText>
              </FormControl>
            )}

            <Divider />

            <HStack spacing={4} align="start">
              <FormControl>
                <FormLabel>Active from (HK time)</FormLabel>
                <Input type="datetime-local" {...register('activeFrom')} />
                <FormHelperText>Empty = immediately active.</FormHelperText>
              </FormControl>
              <FormControl isInvalid={Boolean(errors.activeUntil)}>
                <FormLabel>Active until (HK time)</FormLabel>
                <Input
                  type="datetime-local"
                  {...register('activeUntil', {
                    validate: (value, values) =>
                      !value ||
                      !values.activeFrom ||
                      new Date(toStoredIso(values.activeFrom)).getTime() <
                        new Date(toStoredIso(value)).getTime() ||
                      'End must be after start.',
                  })}
                />
                <FormErrorMessage>
                  {errors.activeUntil && errors.activeUntil.message}
                </FormErrorMessage>
                <FormHelperText>Empty = open-ended.</FormHelperText>
              </FormControl>
            </HStack>

            {scheduleWarning && (
              <Alert status="warning" borderRadius="md">
                <AlertIcon />
                This schedule falls outside the selected form&apos;s
                availability period.
              </Alert>
            )}

            <Box borderWidth="1px" borderRadius="md" p={3} bgColor="gray.50">
              <Text fontWeight="700" mb={1}>
                Preview (resolves now to):
              </Text>
              {preview.ok ? (
                <Text wordBreak="break-all" color="green.700">
                  {preview.url}
                </Text>
              ) : (
                <Text color="red.600">Unavailable — {preview.reason}</Text>
              )}
              {siteLink && (
                <Link
                  href={`/go/${siteLink.slug}`}
                  isExternal
                  color="blue.600"
                  fontSize="sm"
                >
                  Test /go/{siteLink.slug} ↗
                </Link>
              )}
            </Box>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue" type="submit" isLoading={isSubmitting}>
            Save target
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SiteLinkTargetEditorModal;
