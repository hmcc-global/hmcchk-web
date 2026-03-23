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
import { useForm } from 'react-hook-form';
import PopUpGrid from './PopUpGrid';
import PopupContainer from './PopupContainer';
import FileUpload from '../../helpers/components/FileUpload';

export default function AdminPopUpContainer(props) {
  const toast = useToast();

  const { control } = useForm();

  const [popUps, setPopUps] = useState([]);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [selected, setSelected] = useState();

  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [image, setImage] = useState('');
  const [buttonTexts, setButtonTextsStr] = useState('');
  const [buttonLinks, setButtonLinksStr] = useState('');
  const [published, setPublished] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const setButtonTexts = useCallback((v) => {
    if (v && Array.isArray(v)) {
      setButtonTextsStr(v.join(','));
      return;
    }

    setButtonTextsStr('');
  }, []);

  const setButtonLinks = useCallback((v) => {
    if (v && Array.isArray(v)) {
      setButtonLinksStr(v.join(','));
      return;
    }

    setButtonLinksStr('');
  }, []);

  const getData = useCallback(async () => {
    try {
      const { data } = await axios.get('/api/popup/get');
      if (data) setPopUps(data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    if (selected) {
      setId(selected.id);
      setName(selected.name);
      setTitle(selected.title);
      setDesc(selected.description);
      setImage(selected.imageLink);
      setButtonTexts(selected.buttonTexts);
      setButtonLinks(selected.buttonLinks);
      setPublished(selected.isPublished);
      setDeleted(selected.isDeleted);
    }
  }, [selected, setButtonLinks, setButtonTexts]);

  useEffect(() => {
    if (deleted) setPublished(false);
  }, [deleted]);

  const updateHandler = async () => {
    try {
      const buttonTextsArr =
        buttonTexts && buttonTexts.length > 0 && buttonTexts.split(',');
      const buttonLinksArr =
        buttonLinks && buttonLinks.length > 0 && buttonLinks.split(',');
      const res = await axios.put('/api/popup/update', {
        id,
        name,
        title,
        description: desc,
        imageLink: image,
        buttonTexts: buttonTextsArr,
        buttonLinks: buttonLinksArr,
        isPublished: published,
        isDeleted: deleted,
      });

      if (res.status === 200) return true;
    } catch (e) {
      console.log(e.response);
      toast({
        description: e.response.data,
        status: 'error',
        duration: 5000,
      });
      return false;
    }
  };

  const createHandler = async () => {
    try {
      const buttonTextsArr =
        buttonTexts && buttonTexts.length > 0 && buttonTexts.split(',');
      const buttonLinksArr =
        buttonLinks && buttonLinks.length > 0 && buttonLinks.split(',');
      const res = await axios.post('/api/popup/create', {
        name,
        title,
        description: desc,
        imageLink: image,
        buttonTexts: buttonTextsArr,
        buttonLinks: buttonLinksArr,
        isPublished: published,
      });

      if (res.status === 200) {
        const { data } = res;
        setId(data.id);
        return true;
      }
    } catch (e) {
      console.log(e.response);
      toast({
        description: e.response.data,
        status: 'error',
        duration: 5000,
      });
      return false;
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!name || name.length === 0 || nameCheck() || buttonLinkCheck()) return;

    setIsLoading(true);
    let success = false;
    if (id && id.length > 0) {
      success = await updateHandler();
    } else {
      success = await createHandler();
    }

    if (success) {
      toast({
        description: 'Saved',
        status: 'success',
        duration: 5000,
      });
      await getData();
    }
    setIsLoading(false);
  };

  const resetHandler = () => {
    setId('');
    setName('');
    setTitle('');
    setDesc('');
    setImage('');
    setButtonTextsStr('');
    setButtonLinksStr('');
    setPublished(false);
    setDeleted(false);
    setSelected();
    setIsPreviewing(false);
  };

  const previewHandler = () => {
    setIsPreviewing(true);
  };

  const nameCheck = () => {
    if (popUps && popUps.some((i) => i.id !== id && i.name === name))
      return true;

    return false;
  };

  const buttonLinkCheck = () => {
    if (buttonLinks && buttonLinks.length > 0) {
      if (!buttonTexts || buttonTexts.length === 0) return true;

      const buttonTextsArr = buttonTexts.split(',');
      const buttonLinksArr = buttonLinks.split(',');

      if (buttonLinksArr.length > buttonTextsArr.length) return true;
    }

    return false;
  };

  return (
    <Container w="100%" maxW="100%">
      <Heading as="h5" mb={5}>
        Pop Up Manager
      </Heading>
      <Stack direction={['column', 'row']} w="100%">
        <Box w={['100%', '50%']}>
          <form onSubmit={onSubmit}>
            <FormControl isRequired isInvalid={nameCheck()}>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <FormErrorMessage>
                Another PopUp with the same name already exists
              </FormErrorMessage>
            </FormControl>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Desc</FormLabel>
              <Textarea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </FormControl>

            <FileUpload
              name="image"
              acceptedFileTypes="image/*"
              setImageUrl={setImage}
              inputValue={image}
              control={control}
              onChange={(e) => setImage(e.target.value)}
            >
              Image URL
            </FileUpload>

            <FormControl>
              <FormLabel>Button Text</FormLabel>
              <Input
                type="text"
                value={buttonTexts}
                onChange={(e) => setButtonTextsStr(e.target.value)}
              />
            </FormControl>
            <FormControl isInvalid={buttonLinkCheck()}>
              <FormLabel>Button Links</FormLabel>
              <Input
                type="text"
                value={buttonLinks}
                onChange={(e) => setButtonLinksStr(e.target.value)}
              />
              <FormErrorMessage>
                Number of button links cannot exceed number of button texts
              </FormErrorMessage>
            </FormControl>
            <HStack spacing={5} justifyContent="flex-end">
              <FormControl w="auto" isDisabled={deleted}>
                <Checkbox
                  isChecked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                >
                  Publish?
                </Checkbox>
              </FormControl>
              <FormControl w="auto">
                <Checkbox
                  isChecked={deleted}
                  onChange={(e) => setDeleted(e.target.checked)}
                >
                  Delete?
                </Checkbox>
              </FormControl>
            </HStack>
            <FormControl mt={5}>
              <Button type="submit" w="full" isLoading={isLoading}>
                {id && id.length > 0 ? 'UPDATE' : 'SAVE'}
              </Button>
            </FormControl>
            <Button colorScheme="red" w="full" mt={5} onClick={resetHandler}>
              RESET
            </Button>
            <Button colorScheme="blue" w="full" mt={5} onClick={previewHandler}>
              PREVIEW
            </Button>
          </form>
        </Box>
        <Box w={['100%', '50%']}>
          <PopUpGrid popUps={popUps} setSelected={setSelected} />
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
}
