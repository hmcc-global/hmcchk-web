import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { customAxios as axios } from '../../helpers/customAxios';
import {
  Container,
  Heading,
  Text,
  Stack,
  Button,
  ListItem,
  Flex,
  Grid,
  Spacer,
  List,
  Box,
  Image,
  HStack,
  useToast,
} from '@chakra-ui/react';
import SermonNotesEditorModal from './SermonNotesEditorModal';
import { MdOutlineVideoLibrary } from 'react-icons/md';
import { BiDonateHeart } from 'react-icons/bi';
import { IoPeopleOutline } from 'react-icons/io5';
import { IoBookOutline } from 'react-icons/io5';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';

// TO-DO: need to refactor in the future so the components rely on the pathname not the current state of the page
// current solution with useEffect is rly whack, no time to refactor it this cycle :)
const AdminSermonNotesContainer = (props) => {
  const { user } = props;
  const toast = useToast();
  const history = useHistory();
  const path = history.location.pathname.split('/');

  const isEditorPath = useMemo(() => {
    return path.includes('edit');
  }, [path]);

  const isPastSermonsExist = useMemo(() => {
    return path.length > 4;
  }, [path]);

  const sermonId = useMemo(() => {
    return isPastSermonsExist ? path[path.length - 1] : '';
  }, [path, isPastSermonsExist]);

  // This useState is to open the Editor Modal
  const [isEditorOpen, setIsEditorOpen] = useState(isEditorPath ? true : false);
  const [actionOnEditor, setActionOnEditor] = useState(
    isPastSermonsExist ? 'edit' : 'create'
  );

  const [isLoading, setIsLoading] = useState(false);
  const [sermonNotesList, setSermonNotesList] = useState([]);
  const [editSermonNotesData, setEditSermonNotesData] = useState(null);

  const fetchSermonNotes = useCallback(async () => {
    try {
      const { data } = await axios.get('/api/sermon-notes-parent/get');
      setSermonNotesList(data);
    } catch (err) {
      console.log(err);
      toast({
        description:
          'There was an issue with the request, please talk to t3ch support',
        status: 'warning',
        duration: 8000,
        isClosable: true,
      });
    }
  }, [toast, setSermonNotesList]); // add empty dependency array to useCallback

  const getExistingSermonNotes = useCallback(
    async (id) => {
      const { data } = await axios.get('/api/sermon-notes-parent/get', {
        params: {
          sermonId: id,
        },
      });
      setEditSermonNotesData(data[0]);
    },
    [setEditSermonNotesData]
  );

  const isPublishDisabled = () => {
    const aboveT3chPrivs = ['t3ch', 'admin', 'stewardship'];
    if (aboveT3chPrivs.includes(user.accessType)) {
      return false;
    }
    return true;
  };

  const onDelete = async (e) => {
    try {
      if (window.confirm('Are you sure you want to delete this sermon note?')) {
        const { status } = await axios.put('/api/sermon-notes-parent/delete', {
          sermonId: e.target.value,
        });
        if (status === 200) {
          toast({
            description: 'Sermon Notes has been deleted',
            status: 'success',
            duration: 8000,
            isClosable: true,
          });
        }
      }
      await fetchSermonNotes();
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      toast({
        description:
          'There was an issue with the request, please talk to t3ch support',
        status: 'warning',
        duration: 8000,
        isClosable: true,
      });
      setIsLoading(false);
    }
  };

  const copyPublicLinkHandler = (e, sermonNoteItem) => {
    const host = window.location.host;
    const sermonLink = e.target.value;
    let publicLink = '';
    if (sermonLink === '') {
      publicLink = `${host}/sermons/notes/${sermonNoteItem.sermonId}`;
    } else {
      // use this once sermonLink is implemented
      // publicLink = `${host}/${sermonLink}`;
      publicLink = `${host}/sermons/notes/${sermonNoteItem.sermonId}`;
    }
    navigator?.clipboard?.writeText(publicLink);
    toast({
      description: 'Sermon Notes Public Link Copied to clipboard!',
      status: 'success',
      duration: 5000,
    });
  };

  const onDuplicate = async (e) => {
    try {
      setIsLoading(true);
      const { data } = await axios.get('/api/sermon-notes-parent/get', {
        params: {
          sermonId: e.target.value,
        },
      });
      setIsEditorOpen(true);
      setActionOnEditor('duplicate');
      setEditSermonNotesData(data[0]);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      toast({
        description:
          'There was an issue with the request, please talk to t3ch support',
        status: 'warning',
        duration: 8000,
        isClosable: true,
      });
      setIsLoading(false);
    }
  };

  const onPublish = async (e) => {
    try {
      setIsLoading(true);
      const sermonNotesId = e.target.value;
      const sermonNotesData = sermonNotesList.find(
        (sermonNote) => sermonNote.sermonId === sermonNotesId
      );
      const { status } = await axios.put('/api/sermon-notes-parent/update', {
        sermonId: sermonNotesId,
        title: sermonNotesData.title,
        speaker: sermonNotesData.speaker,
        date: sermonNotesData.date,
        originalContent: sermonNotesData.originalContent,
        sermonLink: sermonNotesData.sermonLink,
        serviceType: sermonNotesData.serviceType,
        passage: sermonNotesData.passage,
        isPublished: !sermonNotesData.isPublished,
      });
      if (status === 200) {
        toast({
          description: 'Sermon Notes has been updated',
          status: 'success',
          duration: 8000,
          isClosable: true,
        });
      } else {
        toast({
          description: 'There was an issue with the request',
          status: 'error',
          duration: 8000,
          isClosable: true,
        });
      }

      await fetchSermonNotes();
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      toast({
        description:
          'There was an issue with the request, please talk to t3ch support',
        status: 'warning',
        duration: 8000,
        isClosable: true,
      });
      setIsLoading(false);
    }
  };

  const onEdit = async (e) => {
    setIsEditorOpen(true);
    try {
      const { data } = await axios.get('/api/sermon-notes-parent/get', {
        params: {
          sermonId: e.target.value,
        },
      });
      history.push(`/admin/sermonNotes/edit/${e.target.value}`);
      setEditSermonNotesData(data[0]);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      toast({
        description:
          'There was an issue with the request, please talk to t3ch support',
        status: 'warning',
        duration: 8000,
        isClosable: true,
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    isEditorPath ? setIsEditorOpen(true) : setIsEditorOpen(false);
    if (isPastSermonsExist) {
      setActionOnEditor('edit');
      getExistingSermonNotes(sermonId);
    } else {
      setActionOnEditor('create');
    }
  }, [isEditorPath, getExistingSermonNotes, isPastSermonsExist, sermonId]);

  useEffect(() => {
    fetchSermonNotes();
  }, [fetchSermonNotes]);

  return (
    <Container maxW="container.xl">
      <Heading as="h1" size="xl" pb={3}>
        Sermon Notes Manager
      </Heading>
      <Stack direction="row" mb={5}>
        <Button
          colorScheme="blue"
          variant={isEditorOpen ? 'solid' : 'outline'}
          borderColor="#3182CE"
          borderWidth={3}
          size="lg"
          disabled={isPublishDisabled()}
          onClick={() => {
            history.push('/admin/sermonNotes/edit');
            setActionOnEditor('create');
          }}
        >
          Add New
        </Button>
        <Button
          colorScheme="blue"
          variant={isEditorOpen ? 'outline' : 'solid'}
          borderColor="#3182CE"
          borderWidth={3}
          size="lg"
          onClick={() => {
            history.push('/admin/sermonNotes');
            setIsEditorOpen(false);
          }}
        >
          Past Sermons
        </Button>
      </Stack>
      {!isEditorOpen && (
        <>
          <List spacing="2" pt={3}>
            {sermonNotesList
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .map((sermonNoteItem) => (
                <ListItem key={sermonNoteItem.sermonId}>
                  <Box p="3" borderRadius="lg" borderWidth="1px">
                    <Flex direction={['column', 'row']} spacing={1}>
                      <Box maxW="13rem" pr={6}>
                        <Image
                          src={sermonNoteItem.imageLink}
                          fallbackSrc="https://hongkong.sub.hmcc.net/wp-content/uploads/Screenshot-2020-09-04-at-6.39.50-PM.png"
                        />
                      </Box>
                      <Stack direction="column" spacing={2}>
                        <Heading size="md">{sermonNoteItem.title}</Heading>
                        <Grid
                          templateColumns={['repeat(1,2fr)', 'repeat(2,2fr)']}
                          gap={1.5}
                        >
                          <HStack alignments="center" gap={1}>
                            <FaRegCalendarAlt />
                            <Text> Date: {sermonNoteItem.date} </Text>
                          </HStack>
                          <HStack alignments="center" gap={1}>
                            <IoPeopleOutline />
                            <Text>Speaker: {sermonNoteItem.speaker}</Text>
                          </HStack>
                          <HStack alignments="center" gap={1}>
                            <MdOutlineVideoLibrary />
                            <Text>
                              Sermon Series: {sermonNoteItem.sermonSeries}
                            </Text>
                          </HStack>
                          <HStack alignments="center" gap={1}>
                            <IoBookOutline />
                            <Text>Passage: {sermonNoteItem.passage}</Text>
                          </HStack>
                          <HStack alignments="center" gap={1}>
                            <BiDonateHeart />
                            <Text>
                              Service Type: {sermonNoteItem.serviceType}
                            </Text>
                          </HStack>
                        </Grid>
                      </Stack>
                      <Spacer />
                      <Stack
                        pt={[3, 0]}
                        spacing={1}
                        direction={['column', 'row']}
                        alignItems="center"
                      >
                        <Button
                          color="white"
                          value={sermonNoteItem.sermonId}
                          bgColor={
                            sermonNoteItem.isPublished
                              ? 'purple.800'
                              : 'purple.500'
                          }
                          onClick={onPublish}
                          disabled={isPublishDisabled()}
                          width={['100%', '100%', '100%', 'auto']}
                        >
                          {sermonNoteItem.isPublished ? 'Unpublish' : 'Publish'}
                        </Button>
                        <Button
                          colorScheme="blue"
                          value={sermonNoteItem.sermonId}
                          onClick={onEdit}
                          isLoading={isLoading}
                          width={['100%', '100%', '100%', 'auto']}
                          disabled={isPublishDisabled()}
                        >
                          Edit
                        </Button>
                        <Button
                          colorScheme="blue"
                          value={sermonNoteItem.sermonLink}
                          onClick={(e) =>
                            copyPublicLinkHandler(e, sermonNoteItem)
                          }
                          width={['100%', '100%', '100%', 'auto']}
                          disabled={isPublishDisabled()}
                        >
                          Public Link
                        </Button>
                        <Button
                          colorScheme="blue"
                          value={sermonNoteItem.sermonId}
                          onClick={onDuplicate}
                          isLoading={isLoading}
                          name="duplicate"
                          width={['100%', '100%', '100%', 'auto']}
                        >
                          Duplicate
                        </Button>
                        <Button
                          colorScheme="red"
                          value={sermonNoteItem.sermonId}
                          onClick={onDelete}
                          disabled={isPublishDisabled()}
                          isLoading={isLoading}
                          width={['100%', '100%', '100%', 'auto']}
                        >
                          Delete
                        </Button>
                      </Stack>
                    </Flex>
                  </Box>
                </ListItem>
              ))}
          </List>
        </>
      )}
      {isEditorOpen && (
        <SermonNotesEditorModal
          user={user}
          editSermonNotesData={editSermonNotesData}
          actionOnEditor={actionOnEditor}
          setIsEditorOpen={setIsEditorOpen}
        />
      )}
    </Container>
  );
};

export default AdminSermonNotesContainer;
