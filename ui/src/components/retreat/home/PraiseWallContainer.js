import {
  Button,
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

const whiteListWords = ['God', 'Hell'];

const PraiseWallContainer = ({ userObj }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [praiseList, setPraiseList] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);

  let Filter = require('bad-words'),
    filter = new Filter();

  filter.removeWords(...whiteListWords);

  const cardBgColors = ['#6dced3', '#ffdc82', '#f39371', '#ffdc82', '#6dced3'];
  const eventCategory = 'CWC 2022';

  useEffect(() => {
    GetPraise();
  }, []);
  const SplitToChunks = (array, parts) => {
    let result = [];

    for (let i = parts; i > 0; i--) {
      result.push(array.splice(0, Math.ceil(array.length / i)));
    }
    return result;
  };
  const InputModal = ({ userObj }) => {
    const PostPraise = async ({ message }) => {
      if (!filter.isProfane(message)) {
        try {
          onClose();

          const { data } = await axios.post('/api/praises/create', {
            fullName: userObj.fullName,
            message: message,
            category: eventCategory,
          });
          setFormSubmitted(true);
          GetPraise();
        } catch (err) {
          console.log(err);
        }
      }
    };

    const [value, setValue] = useState('');
    const { handleSubmit, register } = useForm();
    let handleInputChange = (e) => {
      let inputValue = e.target.value;
      setValue(inputValue);
    };

    return (
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent borderRadius="20">
          <ModalHeader fontWeight="bold" borderRadius="20">
            <Icon
              as={BiNote}
              w={5}
              h={5}
              my="auto"
              textStyle="sora"
              fontWeight="bold"
            />
            Submit A Praise!
            <Text fontSize="sm" textStyle="inter" fontWeight="bold">
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
                maxLength="500"
                {...register('message')}
                onChange={handleInputChange}
              />
              {filter.isProfane(value) && (
                <Text textStyle="inter" color="red.500">
                  Profanity Detected
                </Text>
              )}
            </ModalBody>

            <ModalFooter bgColor="#ebebeb" borderBottomRadius="20">
              <Button
                bg="#3DC78B"
                color="white"
                mx="1em"
                borderRadius="20"
                shadow="lg"
                m="auto"
                w="10em"
                _hover={{ opacity: '0.9', transform: 'scale(1.025)' }}
                type="submit"
              >
                <AddIcon w={3} h={3} mx="1" />
                <Text textStyle="inter">Submit Praise</Text>
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
      <Alert status="success" borderRadius="20">
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
            <VStack key={i} align="start" w="40vw">
              {filteredPraise.map((praise, index) => (
                <PraiseCard
                  message={praise.message}
                  key={i * 100 + index}
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
            <VStack key={i} align="start" w="19em" px="0.3em">
              {filteredPraise.map((praise, index) => (
                <PraiseCard
                  key={i * 100 + index}
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
  const PraiseWall = () => {
    useEffect(() => {
      const interval = setInterval(() => {
        // Dont getpraise and rerender if input modal open
        if (!isOpen) {
          GetPraise();
        }
      }, 30000);
      return () => {
        clearInterval(interval);
      };
    }, []);
    return (
      <Box justify="center">
        {formSubmitted && <AlertMessage />}
        <Box borderRadius="20" bgColor="#ebebeb" paddingBottom="3">
          <VStack>
            <Flex
              w="100%"
              direction={['column', 'column', 'row']}
              shadow="sm"
              borderRadius="20"
              bgColor="white"
              pb={[0, 3]}
              px={['1em', '2em']}
            >
              <Flex w={['100%', '60%']} align="left" direction="column">
                <Flex direction="row" pt={['1rem', '0.3em']} spacing={0}>
                  <Icon as={BiNote} w={[6, 8]} h={[6, 8]} my="auto" />
                  <Text
                    fontSize={['xl', '3xl']}
                    fontWeight={['800', '700']}
                    textAlign="left"
                    paddingLeft="0.3em"
                    textStyle="sora-bolder"
                  >
                    PRAISE WALL
                  </Text>
                </Flex>

                <Text
                  fontWeight="bold"
                  fontSize="sm"
                  textAlign="left"
                  textStyle="inter-bold"
                >
                  Share praises with the church throughout the conference!
                </Text>
              </Flex>
              <Spacer />
              <Button
                my={['1em', '1em', 'auto']}
                bg="#3DC78B"
                color="white"
                borderRadius="20"
                shadow="lg"
                onClick={onOpen}
                _hover={{ opacity: '0.9', transform: 'scale(1.025)' }}
              >
                <AddIcon w={3} h={3} mx="1" />
                <Text textStyle="sora"> Submit A Praise</Text>
              </Button>
            </Flex>
            <Box
              overflow="auto"
              w="100%"
              h="40vh"
              css={{
                '&::-webkit-scrollbar': {
                  display: 'none',
                },
                scrollbarWidth: 'none',
              }}
            >
              <MobileView />
              <DesktopView />
            </Box>
          </VStack>
        </Box>
      </Box>
    );
  };

  return (
    <Box>
      <PraiseWall />
      <InputModal userObj={userObj} />
    </Box>
  );
};

export default PraiseWallContainer;
