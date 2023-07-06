import { useState, useEffect } from 'react';
import { customAxios as axios } from '../../helpers/customAxios';
import {
  Button,
  Heading,
  Text,
  Box,
  Container,
  useToast,
  Stack,
  HStack,
  List,
  ListItem,
  Flex,
  Spacer,
} from '@chakra-ui/react';
import { CalendarIcon, TimeIcon, InfoOutlineIcon } from '@chakra-ui/icons';
import AnnouncementEditorModal from './AnnouncementEditorModal';

export default function AdminAnnouncementContainer(props) {
  const toast = useToast();
  const { user } = props;

  const [announcementList, setAnnouncementList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editAnnouncementData, setEditAnnouncementData] = useState(null);
  const [actionOnEditor, setActionOnEditor] = useState('create');

  const getAnnouncementList = async () => {
    try {
      const { data, status } = await axios.get('/api/announcement/admin-get');
      if (status !== 200) {
        throw Error('Something went wrong with the request');
      }
      setAnnouncementList(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAnnouncementList();
  }, []);

  const announcementListCallback = async () => {
    await getAnnouncementList();
  };

  const onCreate = (e) => {
    setIsEditorOpen(true);
    setActionOnEditor('create');
    setEditAnnouncementData(null);
  };

  const onEdit = async (e) => {
    setIsLoading(true);
    try {
      const { data, status } = await axios.get('/api/announcement/admin-get', {
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
      setIsEditorOpen(true);
      setActionOnEditor('edit');
      setEditAnnouncementData(data[0]);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  const onDuplicate = async (e) => {
    setIsLoading(true);
    try {
      const { data, status } = await axios.get('/api/announcement/admin-get', {
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
      setIsEditorOpen(true);
      setActionOnEditor('duplicate');
      setEditAnnouncementData(data[0]);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  const onDelete = async (e) => {
    try {
      setIsLoading(true);
      if (window.confirm('Are you sure you want to delete this?')) {
        const { status } = await axios.put('/api/announcement/update', {
          id: e.target.value,
          isDeleted: true,
        });
        if (status === 200) {
          toast({
            description: 'Announcement has been deleted',
            status: 'success',
            duration: 8000,
            isClosable: true,
          });
        }
      }

      await getAnnouncementList;
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  const onPublish = async (e) => {
    try {
      setIsLoading(true);
      const announcementId = e.target.value;
      const announcementData = announcementList.find(
        (item) => item.id === announcementId
      );

      const { status } = await axios.put('/api/announcement/update', {
        id: announcementId,
        isPublished: !announcementData.isPublished,
      });

      if (status === 200) {
        toast({
          description: 'Announcement has been published',
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

      await getAnnouncementList();
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  const showProperDate = (startDate, endDate) => {
    if (startDate && endDate) {
      return `${startDate} - ${endDate}`;
    }
    if (!startDate && !endDate) {
      return '-';
    }
    return startDate;
  };

  const showProperTime = (startTime, endTime) => {
    if (startTime && endTime) {
      return `${startTime} - ${endTime}`;
    }
    if (!startTime && !endTime) {
      return '-';
    }
    return startTime;
  };

  return (
    <Container maxW="container.xl">
      <Heading as="h1" size="xl" pb={3}>
        Announcements Manager
      </Heading>
      <Stack direction="row">
        <Button colorScheme="blue" size="lg" onClick={onCreate}>
          Add New
        </Button>
        <Button colorScheme="blue" size="lg">
          Past Announcements
        </Button>
      </Stack>
      <Heading as="h2" size="lg" pt={7}>
        Current Announcements
      </Heading>
      <List spacing="2" pt={3}>
        {/* List announcements */}
        {announcementList.map((announcementItem) => (
          <ListItem key={announcementItem.id}>
            <Box p="3" borderRadius="lg" borderWidth="1px">
              <Flex direction={['column', 'row']} spacing={1}>
                <Stack direction="column" spacing={1}>
                  <Heading size="md">{announcementItem.title}</Heading>
                  <Text>
                    <CalendarIcon /> Date:{' '}
                    {showProperDate(
                      announcementItem.startDate,
                      announcementItem.endDate
                    )}
                  </Text>
                  <Text>
                    <TimeIcon /> Time:{' '}
                    {showProperTime(
                      announcementItem.startTime,
                      announcementItem.endTime
                    )}
                  </Text>
                  <Text>
                    <InfoOutlineIcon /> Location:{' '}
                    {announcementItem.location
                      ? announcementItem.location
                      : '-'}
                  </Text>
                </Stack>
                <Spacer />
                {/* Buttons to publish, edit, duplicate, delete */}
                <HStack spacing={1}>
                  <Button
                    colorScheme="purple"
                    value={announcementItem.id}
                    onClick={onPublish}
                    isLoading={isLoading}
                  >
                    {announcementItem.isPublished ? 'Unpublish' : 'Publish'}
                  </Button>
                  <Button
                    colorScheme="blue"
                    value={announcementItem.id}
                    onClick={onEdit}
                    isLoading={isLoading}
                  >
                    Edit
                  </Button>
                  <Button
                    colorScheme="blue"
                    value={announcementItem.id}
                    onClick={onDuplicate}
                    isLoading={isLoading}
                    actionOnEditor="duplicate"
                  >
                    Duplicate
                  </Button>
                  <Button
                    colorScheme="red"
                    value={announcementItem.id}
                    onClick={onDelete}
                    isLoading={isLoading}
                  >
                    Delete
                  </Button>
                </HStack>
              </Flex>
            </Box>
          </ListItem>
        ))}
      </List>
      {/* announcement editor*/}
      <AnnouncementEditorModal
        user={user}
        isOpen={isEditorOpen}
        setIsOpen={setIsEditorOpen}
        editAnnouncementData={editAnnouncementData}
        actionOnEditor={actionOnEditor}
        announcementListCallback={announcementListCallback}
      />
    </Container>
  );
}
