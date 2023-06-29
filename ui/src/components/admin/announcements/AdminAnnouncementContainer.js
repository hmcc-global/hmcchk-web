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

export default function AdminAnnouncementContainer(props) {
  const toast = useToast();
  const { user } = props;

  const [announcementList, setAnnouncementList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editAnnouncementData, setEditAnnouncementData] = useState(null);

  const getAnnouncementList = async () => {
    try {
      const { data, status } = await axios.get('');
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

  const onCreate = (e) => {
    setIsEditorOpen(true);
    setEditAnnouncementData(null);
  };

  const onEdit = async (e) => {
    setIsLoading(true);
    try {
      const { data, status } = await axios.get('');

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
      const { data, status } = await axios.get('');

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
        await axios.post('');
        await getAnnouncementList;
      }
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  return (
    <Container maxW="container.xl">
      <Heading as="h1" size="xl" pb={3}>
        Announcements Manager
      </Heading>
      <Stack direction="row">
        <Button colorScheme="blue" size="lg">
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
                    <CalendarIcon /> Date: {announcementItem.date}
                  </Text>
                  <Text>
                    <TimeIcon /> Time: {announcementItem.time}
                  </Text>
                  <Text>
                    <InfoOutlineIcon /> Location: {announcementItem.location}
                  </Text>
                </Stack>
                <Spacer />
                {/* Buttons to edit, duplicate, delete */}
                <HStack spacing={1}>
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
                    onClick={onEdit}
                    isLoading={isLoading}
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
    </Container>
  );
}
