import React, { useEffect, useState, useCallback } from 'react';
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
  useToast,
} from '@chakra-ui/react';
import PrayerGrid from './PrayerGrid';
import { getPrayerTopic } from '../../witness/prayer/EasterPrayerModal';

export default function AdminPrayerContainer(props) {
  const toast = useToast();

  //testimonies grid data
  const [prayers, setPrayers] = useState([]);
  const [selected, setSelected] = useState();

  // individual testimony data
  const [id, setId] = useState('');
  const [prayer, setPrayer] = useState('');
  const [fullName, setFullName] = useState('');
  const [lifestage, setLifestage] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState(0);
  const [published, setPublished] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [deleted, setDeleted] = useState(false);

  console.log(selected)

  const getData = useCallback(async () => {
    try {
      const { data } = await axios.get('/api/easter/get');
      console.log(data);
      if (data) setPrayers(data);
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
      setPrayer(selected.prayer);
      setFullName(selected.fullName);
      setLifestage(selected.lifestage);
      setEmail(selected.email);
      setTopic(selected.topic);
      setPublished(selected.isPublished);
      setDeleted(selected.isDeleted);
    }
  }, [selected]);

  useEffect(() => {
    if (deleted) setPublished(false);
  }, [deleted]);

  const updateHandler = async () => {
    try {
      const res = await axios.put('/api/easter/update', {
        id,
        fullName,
        lifestage,
        email,
        topic,
        prayer,
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

  const onSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    let success = false;
    if (id && id.length > 0) {
      success = await updateHandler();
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
    if (selected) {
      setId(selected.id);
      setPrayer(selected.prayer);
      setFullName(selected.fullName);
      setLifestage(selected.lifestage);
      setEmail(selected.email);
      setTopic(selected.topic);
      setPublished(selected.isPublished);
      setDeleted(selected.isDeleted);
    }
  };

  return (
    <Container w="100%" maxW="100%">
      <Heading as="h5" mb={5}>
        Prayer Manager
      </Heading>
      <Stack direction={['column', 'row']} w="100%">
        <Box w={['100%', '50%']}>
          <form onSubmit={onSubmit}>
            <FormControl isRequired>
              <FormLabel>Prayer</FormLabel>
              <Textarea
                type="text"
                value={prayer}
                onChange={(e) => setPrayer(e.target.value)}
              />
            </FormControl>
            <FormControl isReadOnly>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                value={fullName}
              />
            </FormControl>
            <FormControl isReadOnly>
              <FormLabel>Campus/Lifestage</FormLabel>
              <Input
                type="text"
                value={lifestage}
              />
            </FormControl>
            <FormControl isReadOnly>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={email}
              />
            </FormControl>
            <FormControl isRequired isReadOnly>
              <FormLabel>Topic</FormLabel>
              <Input
                type="text"
                value={getPrayerTopic(topic)}
              />
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
                SAVE
              </Button>
            </FormControl>
            <Button colorScheme="red" w="full" mt={5} onClick={resetHandler}>
              RESET
            </Button>
          </form>
        </Box>
        <Box w={['100%', '50%']}>
          <PrayerGrid prayers={prayers} setSelected={setSelected} />
        </Box>
      </Stack>
    </Container>
  );
}
