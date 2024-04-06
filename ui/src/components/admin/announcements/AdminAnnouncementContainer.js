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
  List,
  ListItem,
  Flex,
  Spacer,
  Badge,
  Image,
  Grid,
} from '@chakra-ui/react';
import {
  CalendarIcon,
  TimeIcon,
  InfoOutlineIcon,
  ChatIcon,
  ViewIcon,
  EditIcon,
} from '@chakra-ui/icons';
import AnnouncementEditorModal from './AnnouncementEditorModal';
import { DateTime } from 'luxon';

export default function AdminAnnouncementContainer(props) {
  const toast = useToast();
  const { user } = props;
  const today = new DateTime.now();

  const [announcementList, setAnnouncementList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editAnnouncementData, setEditAnnouncementData] = useState(null);
  const [actionOnEditor, setActionOnEditor] = useState('create');
  const [isCurrentAnnouncements, setIsCurrentAnnouncements] = useState(true);

  const getAnnouncementList = async () => {
    try {
      const { data, status } = await axios.get('/api/announcement/admin-get');
      if (status !== 200) {
        throw Error('Something went wrong with the request');
      }
      // TODO: filter out announcements that are current and past accordingly
      if (isCurrentAnnouncements) {
        const current = data.filter((item) => {
          if (item.displayEndDateTime) {
            return DateTime.fromISO(item.displayEndDateTime) > today;
          }
          if (item.displayStartDateTime && item.displayEndDateTime) {
            return DateTime.fromISO(item.eventStartDate) < today;
          }
          if (item.eventEndDate) {
            return DateTime.fromISO(item.eventEndDate) > today;
          }
          if (item.eventStartDate && !item.eventEndDate) {
            return DateTime.fromISO(item.eventStartDate) < today;
          }
          return true;
        });
        setAnnouncementList(current);
      } else {
        const past = data.filter((item) => {
          if (item.displayEndDateTime) {
            return DateTime.fromISO(item.displayEndDateTime) < today;
          }
          if (item.eventEndDate) {
            return DateTime.fromISO(item.eventEndDate) < today;
          }
          return false;
        });
        setAnnouncementList(past);
      }
    } catch (err) {
      console.log(err);
      toast({
        description:
          'There was an issue with the request, please talk to a t3ch support',
        status: 'error',
        duration: 8000,
        isClosable: true,
      });
    }
  };

  const toggleAnnouncementsView = () => {
    setIsCurrentAnnouncements(!isCurrentAnnouncements);
  };

  useEffect(() => {
    getAnnouncementList();
  }, [isCurrentAnnouncements]);

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
          description: 'Announcement has been updated',
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

  const isPublishDisabled = () => {
    const aboveT3chPrivs = ['t3ch', 'admin', 'stewardship'];
    if (aboveT3chPrivs.includes(user.accessType)) {
      return false;
    }
    return true;
  };

  const isCreateDisabled = () => {
    const aboveTcPrivs = ['tc', 't3ch', 'admin', 'stewardship'];
    if (aboveTcPrivs.includes(user.accessType)) {
      return false;
    }
    return true;
  };

  const showProperDate = (startDate, endDate, interval) => {
    if (startDate && endDate) {
      return `${startDate} - ${endDate}`;
    }
    if (startDate && !endDate) {
      return startDate.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY);
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
        <Button
          colorScheme="blue"
          size="lg"
          onClick={onCreate}
          disabled={isCreateDisabled()}
        >
          Add New
        </Button>
        <Button colorScheme="blue" size="lg" onClick={toggleAnnouncementsView}>
          {isCurrentAnnouncements
            ? 'Past Announcements'
            : 'Current Announcements'}
        </Button>
      </Stack>
      <Heading as="h2" size="lg" pt={7}>
        {isCurrentAnnouncements
          ? 'Current Announcements'
          : 'Past Announcements'}
      </Heading>
      <List spacing="2" pt={3}>
        {/* List announcements */}
        {announcementList.map((announcementItem) => (
          <ListItem key={announcementItem.id}>
            <Box p="3" borderRadius="lg" borderWidth="1px">
              <Flex direction={['column', 'row']} spacing={1}>
                <Box maxW="12rem" pr={5}>
                  <Image
                    src={announcementItem.imageAdUrl}
                    fallbackSrc="https://hongkong.sub.hmcc.net/wp-content/uploads/Screenshot-2020-09-04-at-6.39.50-PM.png"
                  />
                </Box>
                <Stack direction="column" spacing={1}>
                  <Heading size="md">{announcementItem.title}</Heading>
                  <Grid
                    templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)']}
                    gap={1}
                  >
                    <Text>
                      <CalendarIcon /> Date:{' '}
                      {showProperDate(
                        announcementItem.eventStartDate,
                        announcementItem.eventEndDate,
                        announcementItem.eventInterval
                      )}
                    </Text>
                    <Text>
                      <TimeIcon /> Time:{' '}
                      {showProperTime(
                        announcementItem.eventStartTime,
                        announcementItem.eventEndTime
                      )}
                    </Text>
                    <Text>
                      <InfoOutlineIcon /> Location:{' '}
                      {announcementItem.location || '-'}
                    </Text>
                    <Text>
                      <ChatIcon /> Submitter: {announcementItem.submittedBy}
                    </Text>
                    <Text>
                      <ViewIcon /> Announce in:{' '}
                      {announcementItem.isInWeb && (
                        <Badge colorScheme="teal">Web</Badge>
                      )}{' '}
                      &nbsp;
                      {announcementItem.isInPpt && (
                        <Badge colorScheme="orange">PPT</Badge>
                      )}
                    </Text>
                    <Text>
                      <EditIcon /> Last updated by:{' '}
                      {announcementItem.lastUpdatedBy || '-'}
                    </Text>
                  </Grid>
                </Stack>
                <Spacer />
                {/* Buttons to publish, edit, duplicate, delete */}
                <Stack
                  pt={[3, 0]}
                  spacing={1}
                  direction={{ base: 'column', lg: 'row' }}
                  alignItems="center"
                >
                  {announcementItem.isInWeb && isCurrentAnnouncements && (
                    <Button
                      bgColor={
                        announcementItem.isPublished
                          ? 'purple.800'
                          : 'purple.500'
                      }
                      color="white"
                      value={announcementItem.id}
                      onClick={onPublish}
                      isLoading={isLoading}
                      disabled={isPublishDisabled()}
                      width={{ base: '100%', lg: 'auto' }}
                    >
                      {announcementItem.isPublished ? 'Unpublish' : 'Publish'}
                    </Button>
                  )}
                  <Button
                    colorScheme="blue"
                    value={announcementItem.id}
                    onClick={onEdit}
                    isLoading={isLoading}
                    width={{ base: '100%', lg: 'auto' }}
                  >
                    Edit
                  </Button>
                  <Button
                    colorScheme="blue"
                    value={announcementItem.id}
                    onClick={onDuplicate}
                    isLoading={isLoading}
                    disabled={isCreateDisabled()}
                    actionOnEditor="duplicate"
                    width={{ base: '100%', lg: 'auto' }}
                  >
                    Duplicate
                  </Button>
                  <Button
                    colorScheme="red"
                    value={announcementItem.id}
                    onClick={onDelete}
                    disabled={isPublishDisabled()}
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
      {/* announcement editor*/}
      <AnnouncementEditorModal
        user={user}
        isOpen={isEditorOpen}
        setIsOpen={setIsEditorOpen}
        editAnnouncementData={editAnnouncementData}
        actionOnEditor={actionOnEditor}
        announcementListCallback={announcementListCallback}
        announcementList={announcementList}
      />
    </Container>
  );
}
