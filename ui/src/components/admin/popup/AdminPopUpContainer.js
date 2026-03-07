import { useEffect, useState, useCallback } from 'react';
import { customAxios as axios } from '../../helpers/customAxios';
import {
  Container,
  Heading,
  Stack,
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  HStack,
  Checkbox,
  Button,
  FormErrorMessage,
  useToast,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import PopUpGrid from './PopUpGrid';
import PopupContainer from './PopupContainer';
import FileUpload from '../../helpers/components/FileUpload';

const DEFAULT_FORM_VALUES = {
  name: '',
  title: '',
  description: '',
  imageLink: '',
  buttonTexts: '',
  buttonLinks: '',
  isPublished: false,
  isDeleted: false,
};

const serializeArray = (value) => {
  if (!Array.isArray(value)) {
    const parsed = value
      .split(',')
      .map((entry) => entry.trim())
      .filter(Boolean);

    return parsed.length > 0 ? parsed : null;
  }
  return value.join(',');
};

const toFormValues = (popup) => ({
  name: popup?.name || '',
  title: popup?.title || '',
  description: popup?.description || '',
  imageLink: popup?.imageLink || '',
  buttonTexts: serializeArray(popup?.buttonTexts),
  buttonLinks: serializeArray(popup?.buttonLinks),
  isPublished: Boolean(popup?.isPublished),
  isDeleted: Boolean(popup?.isDeleted),
});

const validationSchema = yup.object({
  name: yup
    .string()
    .trim()
    .required('Name is required')
    .test(
      'unique-popup-name',
      'Another PopUp with the same name already exists',
      function uniquePopupName(value) {
        const normalizedName = value?.trim();
        if (!normalizedName) return true;

        const { popUps, selectedId } = this.options.context || {};
        if (!Array.isArray(popUps)) return true;

        return !popUps.some(
          (popup) =>
            popup.id !== selectedId &&
            popup.name?.trim()?.toLowerCase() === normalizedName.toLowerCase()
        );
      }
    ),
  title: yup.string().nullable(),
  description: yup.string().nullable(),
  imageLink: yup.string().required(),
  buttonTexts: yup.string().nullable(),
  buttonLinks: yup
    .string()
    .nullable()
    .test(
      'valid-button-links',
      'Number of button links cannot exceed number of button texts',
      function validButtonLinks(value) {
        const parsedLinks = serializeArray(value) || [];
        if (parsedLinks.length === 0) return true;

        const parsedTexts = serializeArray(this.parent.buttonTexts) || [];
        return parsedLinks.length <= parsedTexts.length;
      }
    ),
  isPublished: yup.boolean(),
  isDeleted: yup.boolean(),
});

const AdminPopUpContainer = (props) => {
  const toast = useToast();

  const [popUps, setPopUps] = useState([]);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [selected, setSelected] = useState();
  const [selectedId, setSelectedId] = useState('');

  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(validationSchema),
    context: {
      popUps,
      selectedId,
    },
    defaultValues: DEFAULT_FORM_VALUES,
  });

  const watchedImage = watch('imageLink');
  const watchedDeleted = watch('isDeleted');

  //Always called when selectedId cahnges.
  const getData = useCallback(async () => {
    try {
      const { data } = await axios.get('/api/popup/get');
      if (data) {
        setPopUps(data);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  const handleUpdateSelectedPopup = useCallback((popup) => {
    if (popup) {
      setSelected(popup);
      setSelectedId(popup.id || '');
      reset(toFormValues(popup));
      return;
    }

    setSelected(undefined);
    setSelectedId('');
    reset(DEFAULT_FORM_VALUES);
  }, [reset]);

  useEffect(() => {
    if (watchedDeleted) {
      setValue('isPublished', false, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, [watchedDeleted, setValue]);

  const handleUpdate = async (formValues) => {
    try {
      const payload = {
        id: selectedId,
        ...toFormValues(formValues),
        isDeleted: Boolean(formValues.isDeleted),
      };

      const res = await axios.put('/api/popup/update', {
        ...payload,
      });

      if (res.status === 200) return true;
    } catch (e) {
      console.log(e.response);
      toast({
        description: e.response?.data || 'Unable to update popup',
        status: 'error',
        duration: 5000,
      });
      return false;
    }
  };

  const handleCreate = async (formValues) => {
    try {
      const payload = {
        ...toFormValues(formValues),
      };

      const res = await axios.post('/api/popup/create', {
        ...payload,
      });

      if (res.status === 200) {
        const { data } = res;
        if (data?.id) {
          setSelectedId(data.id);
        }
        return true;
      }
    } catch (e) {
      console.log(e.response);
      toast({
        description: e.response?.data || 'Unable to create popup',
        status: 'error',
        duration: 5000,
      });
      return false;
    }
  };

  const onSubmit = async (formValues) => {
    let success = false;
    if (selectedId) {
      success = await handleUpdate(formValues);
    } else {
      success = await handleCreate(formValues);
    }

    if (success) {
      toast({
        description: 'Saved',
        status: 'success',
        duration: 5000,
      });
      await getData();
    }
  };

  const handleReset = () => {
    reset(DEFAULT_FORM_VALUES);
    setSelectedId('');
    setSelected(undefined);
    setIsPreviewing(false);
  };

  const handlePreview = () => {
    setIsPreviewing(true);
  };

  return (
    <Container w="100%" maxW="100%">
      <Heading as="h5" mb={5}>
        Pop Up Manager
      </Heading>
      <Stack direction={['column', 'row']} w="100%">
        <Box w={['100%', '50%']}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isRequired isInvalid={Boolean(errors.name)}>
              <FormLabel>Name</FormLabel>
              <Input type="text" {...register('name')} />
              <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
            </FormControl>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input type="text" {...register('title')} />
            </FormControl>
            <FormControl>
              <FormLabel>Desc</FormLabel>
              <Textarea {...register('description')} />
            </FormControl>

            <FileUpload
              name="imageLink"
              acceptedFileTypes="image/*"
              setImageUrl={(url) =>
                setValue('imageLink', url, {
                  shouldDirty: true,
                  shouldValidate: true,
                })
              }
              inputValue={watchedImage || ''}
              control={control}
            >
              Image URL
            </FileUpload>

            <FormControl>
              <FormLabel>Button Text</FormLabel>
              <Input type="text" {...register('buttonTexts')} />
            </FormControl>
            <FormControl isInvalid={Boolean(errors.buttonLinks)}>
              <FormLabel>Button Links</FormLabel>
              <Input type="text" {...register('buttonLinks')} />
              <FormErrorMessage>{errors.buttonLinks?.message}</FormErrorMessage>
            </FormControl>
            <HStack spacing={5} justifyContent="flex-end">
              <FormControl w="auto" isDisabled={watchedDeleted}>
                <Checkbox {...register('isPublished')}>Publish?</Checkbox>
              </FormControl>
              <FormControl w="auto">
                <Checkbox {...register('isDeleted')}>Delete?</Checkbox>
              </FormControl>
            </HStack>
            <FormControl mt={5}>
              <Button type="submit" w="full" isLoading={isSubmitting}>
                {selectedId ? 'UPDATE' : 'SAVE'}
              </Button>
            </FormControl>
            <Button colorScheme="red" w="full" mt={5} onClick={handleReset}>
              RESET
            </Button>
            <Button colorScheme="blue" w="full" mt={5} onClick={handlePreview}>
              PREVIEW
            </Button>
          </form>
        </Box>
        <Box w={['100%', '50%']}>
          <PopUpGrid popUps={popUps} setSelected={handleUpdateSelectedPopup} />
        </Box>
      </Stack>
      {selected && (
        <PopupContainer
          popupData={selected}
          isPreviewing={isPreviewing}
          setIsPreviewing={setIsPreviewing}
        />
      )}
    </Container>
  );
};

export default AdminPopUpContainer;
