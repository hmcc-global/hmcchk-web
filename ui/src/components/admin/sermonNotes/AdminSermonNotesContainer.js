import React, { useState, useEffect } from 'react';
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

export default function AdminSermonNotesContainer(props) {
  const { user } = props;
  const toast = useToast();

  // This useState is to open the Editor Modal
  const [isEditorOpen, setIsEditorOpen] = useState(true);
  const [actionOnEditor, setActionOnEditor] = useState('create');

  const [isLoading, setIsLoading] = useState(false);
  const [sermonNotesList, setSermonNotesList] = useState([]);

  const fetchSermonNotes = async () => {
    try {
      const { data, status } = await axios.get('/api/sermon-notes-parent/get');
      if (status !== 200) {
        throw Error('There was an issue with the request');
      }
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
  };

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
        console.log(e.target.value);
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

  useEffect(() => {
    fetchSermonNotes();
  }, []);

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
          disabled={isPublishDisabled}
          onClick={() => setIsEditorOpen(true)}
        >
          Add New
        </Button>
        <Button
          colorScheme="blue"
          variant={isEditorOpen ? 'outline' : 'solid'}
          borderColor="#3182CE"
          borderWidth={3}
          size="lg"
          onClick={() => setIsEditorOpen(false)}
        >
          Past Sermons
        </Button>
      </Stack>
      {!isEditorOpen && (
        <>
          {/* <Stack direction={['row']} w="100%" spacing={5}>
            <form>
              <FormControl isInvalid={title === ''}>
                <FormLabel>Title</FormLabel>
                <Input type="text" value={title} />
              </FormControl>
            </form>
            <form>
              <FormControl isInvalid={sermonSeries === ''}>
                <FormLabel>Sermon Series</FormLabel>
                <Input type="Sermon Series" value={sermonSeries} />
              </FormControl>
            </form>
            <form>
              <FormControl isInvalid={sermonDateTime === ''}>
                <FormLabel>Date &#38; Time</FormLabel>
                <Input type="datetime-local" value={sermonDateTime} />
              </FormControl>
            </form>
          </Stack> */}
          <List spacing="2" pt={3}>
            {sermonNotesList.map((sermonNoteItem) => (
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
                    {/* buttons */}
                    <Stack
                      pt={[3, 0]}
                      spacing={1}
                      direction={['column', 'row']}
                      alignItems="center"
                    >
                      <Button
                        value={sermonNoteItem.sermonId}
                        bgColor={sermonNoteItem.isPublished ? 'purple' : 'gray'}
                        onClick={onPublish}
                        disabled={isPublishDisabled()}
                      >
                        {sermonNoteItem.isPublished ? 'Unpublish' : 'Publish'}
                      </Button>

                      <Button
                        colorScheme="blue"
                        value={sermonNoteItem.sermonId}
                        // onClick={onEdit}
                        // isLoading={isLoading}
                        width={['100%', 'auto']}
                        disabled={isPublishDisabled()}
                      >
                        Edit
                      </Button>
                      <Button
                        colorScheme="blue"
                        value={sermonNoteItem.sermonId}
                        // onClick={onDuplicate}
                        // isLoading={isLoading}
                        // disabled={isCreateDisabled()}
                        actionOnEditor="duplicate"
                        width={['100%', 'auto']}
                      >
                        Duplicate
                      </Button>
                      <Button
                        colorScheme="red"
                        value={sermonNoteItem.sermonId}
                        onClick={onDelete}
                        disabled={isPublishDisabled()}
                        // isLoading={isLoading}
                        width={['100%', 'auto']}
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
      {isEditorOpen && <SermonNotesEditorModal user={user} />}
    </Container>
  );
}
