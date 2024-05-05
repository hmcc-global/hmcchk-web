import { useState, useEffect, useCallback } from 'react';
import { customAxios as axios } from '../../helpers/customAxios';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  List,
  ListItem,
  Spacer,
  Stack,
  Text,
  useDisclosure,
  useToast,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { AtSignIcon, ChatIcon, LinkIcon, EditIcon } from '@chakra-ui/icons';

export default function AdminUrlContainer() {
  const baseUrl = window.location.origin + '/redirect';
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [urlList, setUrlList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [originalUrl, setOriginalUrl] = useState('');
  const [urlCode, setUrlCode] = useState('');

  const getUrlList = useCallback(async () => {
    try {
      const { data, status } = await axios.get('/api/url/get');

      if (status !== 200) {
        throw Error('Something went wrong with the request');
      }
      setUrlList(data);
    } catch (err) {
      console.log(err);
      toast({
        description:
          'There was an issue with retrieving the URLs, please talk to a t3ch support',
        status: 'error',
        duration: 8000,
        isClosable: true,
      });
    }
  }, [toast]);

  useEffect(() => {
    getUrlList();
  }, [getUrlList]);

  // when edit is clicked, retrieve the url document
  const onOpenEdit = async (e) => {
    onOpen();
    setIsLoading(true);

    try {
      const { data, status } = await axios.get('/api/url/get', {
        params: { id: e.target.value },
      });

      if (status !== 200) {
        toast({
          description:
            'There was an issue with the request, please talk to a t3ch support',
          status: 'warning',
          duration: 8000,
          isClosable: true,
        });
      }

      // set all the fields data, especially id
      setId(data[0]._id);
      setTitle(data[0].title);
      setOriginalUrl(data[0].originalUrl);
      setUrlCode(data[0].urlCode);

      setIsLoading(false);
    } catch (err) {
      console.log(err);
      toast({
        description:
          'There was an issue with the request, please talk to a t3ch support',
        status: 'warning',
        duration: 8000,
        isClosable: true,
      });
      setIsLoading(false);
    }
  };

  // when add new, clear all the fields
  const onOpenAdd = async (e) => {
    try {
      setIsLoading(true);
      onOpen();

      setId('');
      setTitle('');
      setOriginalUrl('');
      setUrlCode('');

      setIsLoading(false);
    } catch (err) {
      console.log(err);

      toast({
        description:
          'There was an issue with the request, please talk to a t3ch support',
        status: 'warning',
        duration: 8000,
        isClosable: true,
      });
      setIsLoading(false);
    }
  };

  // reset all fields when drawer is closed
  const onCloseDrawer = async (e) => {
    setId('');
    setTitle('');
    setOriginalUrl('');
    setUrlCode('');

    onClose();
    setIsLoading(false);
  };

  // soft delete the selected url
  const onDelete = async (e) => {
    try {
      setIsLoading(true);

      // trigger a window alert to confirm deletion
      if (window.confirm('Are you sure you want to delete this?')) {
        const { status } = await axios.put('/api/url/update', {
          id: e.target.value,
          isDeleted: true,
        });
        if (status === 200) {
          toast({
            description: 'Short URL deleted.',
            status: 'success',
            duration: 8000,
            isClosable: true,
          });
        }
      }

      await getUrlList();
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      toast({
        description:
          'There was an issue with the request, please talk to a t3ch support',
        status: 'warning',
        duration: 8000,
        isClosable: true,
      });
      setIsLoading(false);
    }
  };

  // when drawer fields are submitted to either add or edit
  const onSubmit = async (e) => {
    e.preventDefault();

    const urlToSave = {
      title,
      originalUrl,
      urlCode,
    };

    try {
      if (id && id.length > 0) {
        // update if there is id
        const { status } = await axios.put('/api/url/update', {
          id,
          baseUrl,
          ...urlToSave,
        });

        if (status === 200) {
          toast({
            title: 'Short URL updated!',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
        }
      } else {
        // create new if there is no id
        const { status } = await axios.post('/api/url/shorten', {
          baseUrl,
          ...urlToSave,
        });

        if (status === 200) {
          toast({
            title: 'Short URL created!',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
        }
      }

      await getUrlList();
      onCloseDrawer();
    } catch (err) {
      console.log(err);
      toast({
        title: 'Error',
        description: 'An error occurred. Please contact t3ch support.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const copyShortLinkHandler = (e) => {
    navigator?.clipboard?.writeText(e.target.value);
    toast({
      description: 'Short URL copied to clipboard!',
      status: 'success',
      duration: 5000,
    });
  };

  return (
    <Container maxW="container.xl">
      <Heading as="h1" size="xl" pb={3}>
        Short URL Manager
      </Heading>

      <Stack direction="row">
        <Button colorScheme="blue" size="lg" onClick={onOpenAdd}>
          Add New
        </Button>
        {/* <Button colorScheme="blue" size="lg" onClick={toggleUrlView}>
          {isCurrentUrls
            ? 'Past URLs'
            : 'Current URLs'}
        </Button> */}
      </Stack>

      <List spacing="2" pt={3}>
        {urlList.map((urlItem) => (
          <ListItem key={urlItem.id}>
            <Box p="3" borderRadius="lg" borderWidth="1px">
              <Flex direction={['column', 'row']} spacing={1}>
                {/* URL information */}
                <Stack direction="column" spacing={1}>
                  <Heading size="md">{urlItem.title}</Heading>

                  <Text>
                    <LinkIcon /> <i>Original URL:</i> {urlItem.originalUrl}
                  </Text>

                  <Text>
                    <AtSignIcon /> <i>Short URL:</i> {urlItem.shortUrl}
                  </Text>

                  <Text>
                    <ChatIcon /> <i>Created By:</i> {urlItem.createdBy}
                  </Text>

                  <Text>
                    <EditIcon /> <i>Last Updated By:</i>{' '}
                    {urlItem.lastUpdatedBy || '-'}
                  </Text>
                </Stack>

                <Spacer />

                {/* Interaction buttons */}
                <Stack
                  pt={[3, 0]}
                  spacing={1}
                  direction={{ base: 'column', lg: 'row' }}
                  alignItems="center"
                >
                  <Button
                    colorScheme="blue"
                    onClick={copyShortLinkHandler}
                    value={urlItem.shortUrl}
                  >
                    Copy Link
                  </Button>
                  <Button
                    colorScheme="blue"
                    value={urlItem.id}
                    onClick={onOpenEdit}
                    width={{ base: '100%', lg: 'auto' }}
                  >
                    Edit
                  </Button>
                  <Button
                    colorScheme="red"
                    value={urlItem.id}
                    onClick={onDelete}
                    isLoading={isLoading}
                    width={{ base: '100%', lg: 'auto' }}
                  >
                    Delete
                  </Button>
                </Stack>
              </Flex>
            </Box>
          </ListItem>
        ))}
      </List>

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onCloseDrawer}
        size="lg"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader />

          <DrawerBody>
            <form id="url-form" onSubmit={onSubmit}>
              <FormControl isRequired>
                <FormLabel>Title</FormLabel>
                <Input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Original URL</FormLabel>
                <Input
                  type="text"
                  value={originalUrl}
                  onChange={(e) => setOriginalUrl(e.target.value)}
                />
              </FormControl>

              <FormControl>
                <FormLabel>URL Code</FormLabel>
                <Input
                  type="text"
                  value={urlCode}
                  onChange={(e) => setUrlCode(e.target.value)}
                />
              </FormControl>
            </form>
          </DrawerBody>

          <DrawerFooter>
            <Button form="url-form" type="submit" isLoading={isLoading}>
              {id && id.length > 0 ? 'UPDATE' : 'CREATE'}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Container>
  );
}
