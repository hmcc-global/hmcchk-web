import React, { useEffect, useState, useCallback } from 'react';
import { customAxios as axios } from '../../helpers/customAxios';
import {
  Container,
  Heading,
  Stack,
  Box,
  FormControl,
  FormLabel,
  Text,
  Textarea,
  HStack,
  Checkbox,
  Button,
  useToast,
  Select,
} from '@chakra-ui/react';
import FaqGrid from './FaqGrid';
import { faqPageTopicList } from '../../helpers/lists';

export default function AdminFaqContainer(props) {
  const toast = useToast();

  // faqs grid data
  const [faqs, setFaqs] = useState(null);
  const [selected, setSelected] = useState();

  // individual faq data
  const [id, setId] = useState('');
  const [pageTopic, setPageTopic] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [order, setOrder] = useState('');
  const [createdBy, setCreatedBy] = useState('');
  const [lastUpdatedBy, setLastUpdatedBy] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [published, setPublished] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const getData = useCallback(async () => {
    try {
      const { data } = await axios.get('/api/faq/admin-get');
      console.log(data);
      if (data) setFaqs(data);
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
      setPageTopic(selected.pageTopic);
      setQuestion(selected.question);
      setAnswer(selected.answer);
      setOrder(selected.order);
      setCreatedBy(selected.createdBy);
      setLastUpdatedBy(selected.lastUpdatedBy);
      setPublished(selected.isPublished);
      setDeleted(selected.isDeleted);
    }
  }, [selected]);

  useEffect(() => {
    if (deleted) setPublished(false);
  }, [deleted]);

  const updateHandler = async (toUpdate) => {
    try {
      const res = await axios.put('/api/faq/update', {
        ...toUpdate,
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
      const res = await axios.post('/api/faq/create', {
        pageTopic: pageTopic,
        question: question,
        answer: answer,
        order: order === '' ? -1 : order,
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
    let isUpdate = id && id.length > 0;
    if (isUpdate) {
      const toUpdate = {
        id,
        pageTopic: pageTopic,
        question: question,
        answer: answer,
        order: order === '' ? -1 : deleted ? -1 : order,
        isDeleted: deleted,
      };
      success = await updateHandler(toUpdate);
    } else {
      success = await createHandler();
    }

    if (success) {
      toast({
        description: isUpdate ? 'Updated FAQ' : 'Created FAQ',
        status: 'success',
        duration: 5000,
      });
      await getData();
    }
    setIsLoading(false);
    resetHandler();
  };

  const resetHandler = () => {
    setId('');
    setPageTopic('');
    setQuestion('');
    setAnswer('');
    setOrder('');
    setCreatedBy('');
    setLastUpdatedBy('');
    setPublished(false);
    setDeleted(false);
    setSelected();
  };

  return (
    <Container w="100%" maxW="100%">
      <Heading as="h5" mb={5}>
        FAQ Manager
      </Heading>
      <Stack direction={['column', 'row']} w="100%">
        <Box w={['100%', '30%']}>
          <form onSubmit={onSubmit}>
            <FormControl isRequired>
              <FormLabel>Page Topic</FormLabel>
              <Select
                placeholder='Select Page Topic'
                borderRadius={5}
                size="md"
                value={pageTopic}
                onChange={(e) => setPageTopic(e.target.value)}
              >
                {faqPageTopicList.map((item) => {
                  return <option>{item}</option>;
                })}
              </Select>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Question</FormLabel>
              <Textarea
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Answer</FormLabel>
              <Textarea
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
            </FormControl>
            <Text my={2.5}>Order: {order}</Text>
            <Text fontStyle="italic">Created by: {createdBy}</Text>
            <Text fontStyle="italic">Last Updated by: {lastUpdatedBy}</Text>
            <HStack mt={5} spacing={5} justifyContent="flex-end">
              <FormControl w="auto" isDisabled={deleted}>
                <Checkbox
                  isReadOnly={true}
                  isChecked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                >
                  Published?
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
                {id === '' ? 'CREATE' : 'UPDATE'}
              </Button>
            </FormControl>
            <Button colorScheme="red" w="full" mt={5} onClick={resetHandler}>
              RESET
            </Button>
          </form>
        </Box>
        <Box w={['100%', '70%']}>
          <FaqGrid
            faqs={faqs}
            setSelected={setSelected}
            toast={toast}
            resetHandler={resetHandler}
            updateHandler={updateHandler}
            isLoading={isLoading}
            getData={getData}
          />
        </Box>
      </Stack>
    </Container>
  );
}