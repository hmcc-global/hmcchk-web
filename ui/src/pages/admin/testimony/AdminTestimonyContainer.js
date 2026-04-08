import React, { useEffect, useState, useCallback } from 'react';
import { customAxios as axios } from '../../helpers/customAxios';
import {
  Container,
  Heading,
  Stack,
  Box,
  Input,
  Textarea,
  HStack,
  Checkbox,
  Button,
  Field,
} from '@chakra-ui/react';
import { toaster } from '../../../components/ui/toaster';
import TestimonyGrid from './TestimonyGrid';

export default function AdminTestimonyContainer(props) {
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
  const [tags, setTagsStr] = useState('');
  const [published, setPublished] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const setTags = useCallback((t) => {
    if (t && Array.isArray(t)) {
      setTagsStr(t.join(','));
      return;
    }

    setTagsStr('');
  }, []);

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
      setTags(selected.tags);
      setPublished(selected.isPublished);
      setDeleted(selected.isDeleted);
    }
  }, [selected, setTags]);

  useEffect(() => {
    if (deleted) setPublished(false);
  }, [deleted]);

  const updateHandler = async () => {
    const tagsArr = tags && tags.length > 0 ? tags.split(',') : []; 

    try {
      const res = await axios.put('/api/testimony/update', {
        id,
        theme: theme,
        testimony: testimony,
        name: name,
        lifestage: lifestage,
        email: email,
        tags: tagsArr,
        isPublished: published,
        isDeleted: deleted,
      });

      if (res.status === 200) return true;
    } catch (e) {
      console.log(e.response);
      toaster.create({
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
      toaster.create({
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
    setTagsStr('');
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
            <Field.Root required>
              <Field.Label>Theme</Field.Label>
              <Textarea
                type="text"
                value={theme}
                onValueChange={(e) => setTheme(e.target.value)}
              />
            </Field.Root>
            <Field.Root required>
              <Field.Label>Testimony</Field.Label>
              <Textarea
                type="text"
                value={testimony}
                onValueChange={(e) => setTestimony(e.target.value)}
              />
            </Field.Root>
            <Field.Root readOnly>
              <Field.Label>Name</Field.Label>
              <Input
                type="text"
                value={name}
                onValueChange={(e) => setName(e.target.value)}
              />
            </Field.Root>
            <Field.Root readOnly>
              <Field.Label>Campus/Lifestage</Field.Label>
              <Input
                type="text"
                value={lifestage}
                onValueChange={(e) => setLifestage(e.target.value)}
              />
            </Field.Root>
            <Field.Root readOnly>
              <Field.Label>Email</Field.Label>
              <Input
                type="email"
                value={email}
                onValueChange={(e) => setEmail(e.target.value)}
              />
            </Field.Root>
            <Field.Root>
              <Field.Label>Tags</Field.Label>
              <Input
                type="text"
                value={tags}
                onValueChange={(e) => setTagsStr(e.target.value)}
              />
            </Field.Root>
            <HStack gap={5} justifyContent="flex-end">
              <Field.Root w="auto" disabled={deleted}>
                <Checkbox.Root
                  onCheckedChange={(e) => setPublished(e.target.checked)}
                  checked={published}
                ><Checkbox.HiddenInput /><Checkbox.Control><Checkbox.Indicator /></Checkbox.Control><Checkbox.Label>Publish?
                                    </Checkbox.Label></Checkbox.Root>
              </Field.Root>
              <Field.Root w="auto">
                <Checkbox.Root
                  onCheckedChange={(e) => setDeleted(e.target.checked)}
                  checked={deleted}
                ><Checkbox.HiddenInput /><Checkbox.Control><Checkbox.Indicator /></Checkbox.Control><Checkbox.Label>Delete?
                                    </Checkbox.Label></Checkbox.Root>
              </Field.Root>
            </HStack>
            <Field.Root mt={5}>
              <Button type="submit" w="full" loading={isLoading}>
                SAVE
              </Button>
            </Field.Root>
            <Button colorPalette="red" w="full" mt={5} onClick={resetHandler}>
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
