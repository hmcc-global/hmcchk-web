import {
  Button,
  Container,
  Flex,
  Spacer,
  Text,
  Box,
  VStack,
  Icon,
  Modal,
  ModalOverlay,
  Textarea,
  useDisclosure,
  ModalContent,
  ModalHeader,
  Alert,
  AlertIcon,
  AlertDescription,
  HStack,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Center,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { BiNote } from 'react-icons/bi';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { customAxios as axios } from '../../helpers/customAxios';
import PraiseCard from './PraiseCard';

const PraiseWallContainer = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = props;

  const [praiseList, setPraiseList] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const cardBgColors = ['#6dced3', '#ffdc82', '#f39371', '#ffdc82', '#6dced3'];
  const eventCategory = 'CWC 2022';

  const SplitToChunks = (array, parts) => {
    let result = [];

    for (let i = parts; i > 0; i--) {
      result.push(array.splice(0, Math.ceil(array.length / i)));
    }
    return result;
  };
  const InputModal = () => {
    const PostPraise = async ({ message }) => {
      try {
        onClose();
        const { data } = await axios.post('/api/praises/create', {
          fullName: user.fullName,
          message: message,
          category: eventCategory,
        });
        setFormSubmitted(true);
        GetPraise();
      } catch (err) {
        console.log(err);
      }
    };

    const [value, setValue] = useState('');
    const { handleSubmit, register } = useForm();

    return (
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent borderRadius="20">
          <ModalHeader fontWeight="bold" borderRadius="20">
            <Icon as={BiNote} w={5} h={5} my="auto" />
            Submit A Praise!
            <Text fontSize="sm">
              Share praises with the church throughout the conference!{' '}
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(PostPraise)}>
            <ModalBody bgColor="#ebebeb">
              <Textarea
                placeholder="Type your praise here..."
                id="message"
                size="xl"
                h="10em"
                {...register('message')}
                onChange={setValue}
              />
            </ModalBody>

            <ModalFooter bgColor="#ebebeb" borderBottomRadius="20">
              <Button
                colorScheme="teal"
                mx="1em"
                borderRadius="20"
                shadow="lg"
                m="auto"
                w="10em"
                type="submit"
              >
                <AddIcon w={3} h={3} mx="1" />
                Submit Praise
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    );
  };
  const AlertMessage = () => {
    const [show, setShow] = useState(true);
    useEffect(() => {
      const timeId = setTimeout(() => {
        setShow(false);
        setFormSubmitted(false);
      }, 5000);
      return () => {
        clearTimeout(timeId);
      };
    }, []);
    if (!show) {
      return null;
    }
    return (
      <Alert status="success">
        <AlertIcon />
        <AlertDescription>Praise submitted successfully!</AlertDescription>
      </Alert>
    );
  };
  const GetPraise = async () => {
    try {
      const { data, status } = await axios.get('/api/praises/get', {
        params: { category: eventCategory },
      });
      if (status === 200) {
        data.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
        setPraiseList([...data]);
      } else {
        throw Error('Something went wrong');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const MobileView = () => {
    return (
      <Center display={{ base: 'flex', lg: 'none' }}>
        <HStack align="start" spacing="5">
          {SplitToChunks(
            praiseList.filter(
              (partitionedList) => partitionedList.category == eventCategory
            ),
            2
          ).map((filteredPraise, i) => (
            <VStack align="start" w="10em">
              {filteredPraise.map((praise, index) => (
                <PraiseCard
                  message={praise.message}
                  cardColor={cardBgColors[(i % 3) + (index % 3)]}
                />
              ))}
            </VStack>
          ))}
        </HStack>
      </Center>
    );
  };
  const DesktopView = () => {
    return (
      <Center display={{ base: 'none', lg: 'flex' }}>
        <HStack align="start" spacing="1">
          {SplitToChunks(
            praiseList.filter(
              (partitionedList) => partitionedList.category == eventCategory
            ),
            3
          ).map((filteredPraise, i) => (
            <VStack align="start" w="18em" px="0.3em">
              {filteredPraise.map((praise, index) => (
                <PraiseCard
                  message={praise.message}
                  cardColor={cardBgColors[(i % 3) + (index % 3)]}
                />
              ))}
            </VStack>
          ))}
        </HStack>
      </Center>
    );
  };
  const PraiseWall = (props) => {
    useEffect(() => {
      const interval = setInterval(() => GetPraise(), 30000);
      return () => {
        clearInterval(interval);
      };
    }, []);

    return (
      <Container maxW="container.lg">
        <Box justify="center">
          {formSubmitted && <AlertMessage />}
          <Box borderRadius="20" bgColor="#ebebeb">
            <VStack>
              <Flex
                w="100%"
                direction={['column', 'column', 'row']}
                shadow="sm"
                borderRadius="20"
                bgColor="white"
                h={['9em', '9em', '5em']}
              >
                <Flex
                  w={['90%', '90%', '60%']}
                  align="left"
                  px="2em"
                  direction="column"
                >
                  <Flex direction="row">
                    <Icon as={BiNote} w={6} h={6} my="auto" />
                    <Text
                      fontWeight="bold"
                      fontSize="2xl"
                      textAlign="left"
                      paddingLeft="0.3em"
                    >
                      PRAISE WALL
                    </Text>
                  </Flex>

                  <Text fontWeight="bold" fontSize="sm" textAlign="left">
                    Share praises with the church throughout the conference!
                  </Text>
                </Flex>
                <Spacer />
                <Button
                  my={['1em', '1em', 'auto']}
                  mx="2em"
                  colorScheme="teal"
                  borderRadius="20"
                  shadow="lg"
                  onClick={onOpen}
                >
                  <AddIcon w={3} h={3} mx="1" />
                  Submit A Praise
                </Button>
              </Flex>
              <Box
                overflow="auto"
                w="100%"
                h="50vh"
                css={{
                  '&::-webkit-scrollbar': {
                    display: 'none',
                  },
                  'scrollbar-width': 'none',
                }}
              >
                <MobileView />
                <DesktopView />
              </Box>
            </VStack>
          </Box>
        </Box>
      </Container>
    );
  };
  useEffect(() => {
    GetPraise();
  }, []);
  return (
    <Box>
      <PraiseWall props={props} />
      <InputModal />
    </Box>
  );
};

export default PraiseWallContainer;
