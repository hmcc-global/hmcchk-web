import {
  Box,
  Center,
  Grid,
  GridItem,
  Image,
  Text,
  HStack,
  Link,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from '@chakra-ui/react';

import { FaRainbow } from 'react-icons/fa';
import { IoDocumentsOutline } from 'react-icons/io5';
import { RiComputerLine } from 'react-icons/ri';
import { GrCircleInformation } from 'react-icons/gr';
import PraiseWallContainer from './PraiseWallContainer';
import { Schedule, ScheduleHeader } from './Schedule';

const HomeMobile = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { sessionText } = props;

  return (
    <Grid minH="50vh" templateColumns={'repeat(1, 1fr)'} gap={3}>
      <GridItem w="100%">
        <Center flexDirection="column">
          <Image
            w="100%"
            src={
              process.env.PUBLIC_URL +
              '/images/retreat/with-everything-text.png'
            }
          />
          <Text
            mt="-1.5rem"
            textAlign="center"
            textStyle="sora_bolder"
            color="white"
            fontWeight="700"
            fontSize="2xl"
            lineHeight="1.25em"
            w="80%"
            mb="3"
          >
            CHURCH-WIDE CONFERENCE 2022
          </Text>
          <GridItem mb="3" boxShadow="lg" w="100%">
            <ScheduleHeader onClick={onOpen} />
            <Modal
              size="full"
              isOpen={isOpen}
              onClose={onClose}
              blockScrollOnMount={true}
              scrollBehavior="inside"
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>
                  <ModalCloseButton
                    size="sm"
                    position="absolute"
                    zIndex={1000}
                  />
                  <ScheduleHeader />
                </ModalHeader>
                <ModalBody padding={0}>
                  <Schedule maxH="100vh" minW="100%" withoutHeader={true} />
                </ModalBody>
                {/* <ModalFooter /> */}
              </ModalContent>
            </Modal>
          </GridItem>
          <Link
            bg="#0FB4BE"
            w="100%"
            textStyle="sora_bolder"
            fontWeight="700"
            fontSize="lg"
            color="white"
            p="1.75rem 0"
            borderRadius="xl"
            boxShadow="lg"
            href="/with-everything/stream"
            mb="3"
            _hover={{ opacity: '0.9', transform: 'scale(1.025)' }}
          >
            <Center>
              <HStack>
                <RiComputerLine size="30" />
                <Text>Session Stream</Text>
              </HStack>
            </Center>
          </Link>
          <Box
            w="100%"
            bg={sessionText.startsWith('Session') ? '#F2BBA8' : '#A9E0E3'}
            textStyle="inter-bold"
            fontSize="sm"
            fontWeight="700"
            p="0.8rem 1rem"
            borderRadius="xl"
            mb="3"
            boxShadow="lg"
          >
            <HStack>
              <GrCircleInformation size="20" />
              <Text>{sessionText}</Text>
            </HStack>
          </Box>
          <Grid
            w="100%"
            templateColumns="repeat(2, 1fr)"
            gap={3}
            textStyle="sora_bolder"
            color="white"
            fontWeight="700"
            fontSize="lg"
          >
            <Link
              href="/with-everything/about"
              p="1.25rem 0"
              bg="#EE794E"
              borderRadius="xl"
              boxShadow="lg"
              _hover={{ opacity: '0.9', transform: 'scale(1.025)' }}
            >
              <Center>
                <VStack>
                  <FaRainbow size="30" />
                  <Text mt="0">About CWC</Text>
                </VStack>
              </Center>
            </Link>
            <Link
              href="/with-everything/resources"
              p="1.25rem 0"
              bg="#FFC632"
              borderRadius="xl"
              boxShadow="lg"
              _hover={{ opacity: '0.9', transform: 'scale(1.025)' }}
            >
              <Center>
                <VStack>
                  <IoDocumentsOutline size="30" />
                  <Text mt="0">Resources</Text>
                </VStack>
              </Center>
            </Link>
          </Grid>
        </Center>
      </GridItem>
      <GridItem minH="40vh" mb={10}>
        <PraiseWallContainer userObj={props.userObj} />
      </GridItem>
    </Grid>
  );
};

export default HomeMobile;
