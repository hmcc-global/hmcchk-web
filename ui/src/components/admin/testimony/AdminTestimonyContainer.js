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
import TestimonyGrid from './TestimonyGrid';

export default function AdminTestimonyContainer(props) {
  const toast = useToast();

  //testimonies grid data
  const [testimonies, setTestimonies] = useState([]);
  const [selected, setSelected] = useState();

  // individual testimony data
  const [id, setId] = useState('');
  const [theme, setTheme] = useState('');
  const [testimony, setTestimony] = useState('');
  const [name, setName] = useState('');
  const [lifestage, setLifestage] = useState('');
  const [email, setEmail] = useState('');
  const [published, setPublished] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const getData = useCallback(async () => {
    try {
      const { data } = await axios.get('/api/testimony/get');
      console.log(data);
      if (data) setTestimonies(data);
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
      setTheme(selected.theme);
      setTestimony(selected.testimony);
      setName(selected.name);
      setLifestage(selected.lifestage);
      setEmail(selected.email);
      setPublished(selected.isPublished);
      setDeleted(selected.isDeleted);
    }
  }, [selected]);

  useEffect(() => {
    if (deleted) setPublished(false);
  }, [deleted]);

  const updateHandler = async () => {
    try {
      const res = await axios.put('/api/testimony/update', {
        id,
        theme: theme,
        testimony: testimony,
        name: name,
        lifestage: lifestage,
        email: email,
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
    setId('');
    setTheme('');
    setTestimony('');
    setName('');
    setLifestage('');
    setEmail('');
    setPublished(false);
    setDeleted(false);
    setSelected();
  };

  return (
    <Container w="100%" maxW="100%">
      <Heading as="h5" mb={5}>
        Testimony Manager
      </Heading>
      <Stack direction={['column', 'row']} w="100%">
        <Box w={['100%', '50%']}>
          <form onSubmit={onSubmit}>
            <FormControl isRequired>
              <FormLabel>Theme</FormLabel>
              <Textarea
                type="text"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Testimony</FormLabel>
              <Textarea
                type="text"
                value={testimony}
                onChange={(e) => setTestimony(e.target.value)}
              />
            </FormControl>
            <FormControl isReadOnly>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
            <FormControl isReadOnly>
              <FormLabel>Campus/Lifestage</FormLabel>
              <Input
                type="text"
                value={lifestage}
                onChange={(e) => setLifestage(e.target.value)}
              />
            </FormControl>
            <FormControl isReadOnly>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
          <TestimonyGrid testimonies={testimonies} setSelected={setSelected} />
        </Box>
      </Stack>
    </Container>
  );
}
