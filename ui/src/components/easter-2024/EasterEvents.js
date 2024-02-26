import {
  Grid,
  GridItem,
  Box,
  VStack,
  Text,
  Button,
  AspectRatio,
  HStack,
  Spacer,
  Flex,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Heading,
  Stack,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';
import '@fontsource/cousine';
import {
  bodyFontSizeMobile,
  bodyFontSizeDesktop,
  greyColor,
} from './constants';

import {
  DownloadIcon,
  InfoIcon,
  ExternalLinkIcon,
  ArrowBackIcon,
} from '@chakra-ui/icons';
import { RWebShare } from 'react-web-share';
const EasterEvents = () => {
  const {
    isOpen: isOpenModalShare,
    onOpen: openModalShare,
    onClose: closeModalShare,
  } = useDisclosure();
  const {
    isOpen: isOpenModalParticipate,
    onOpen: openModalParticipate,
    onClose: closeModalParticipate,
  } = useDisclosure();

  return (
    <VStack h="90em" w="100%">
      <Grid
        h={['auto', '30em']}
        templateRows="repeat(3, 1fr)"
        templateColumns="repeat(2, 1fr)"
        gap={4}
        w="100%"
      >
        <GridItem rowSpan={3} colSpan={[2, 1]}>
          <Box w="100%" h="100%" borderRadius="0.75rem" bgColor="#FFDFAF">
            <Flex
              paddingTop="1em"
              align="left"
              w="90%"
              m="auto"
              h="95%"
              flexDirection="column"
            >
              <Text
                color="#464646"
                fontFamily="Inter"
                fontSize="2em"
                fontStyle="normal"
                fontWeight="900"
                lineHeight="normal"
                textTransform="uppercase"
              >
                EVENTS
              </Text>
              <Text
                color="#4F4F4F"
                fontFamily="Cousine"
                fontSize="1em"
                fontStyle="normal"
                fontWeight="400"
                lineHeight="normal"
                py={['1em', '']}
              >
                Join us to remember Jesus’ death and celebrate His resurrection!
              </Text>
              <Spacer />

              <Button
                borderRadius="2em"
                w="15em"
                border="2px solid #D67944"
                bgcolor="#FFF"
                onClick={openModalShare}
              >
                <Text
                  color="#D67944"
                  fontFamily="Cousine"
                  fontSize="1em"
                  fontStyle="italic"
                  fontWeight="700"
                  lineHeight="normal"
                  px="1em"
                >
                  Share an invite
                </Text>

                <DownloadIcon color="#D67944" />
              </Button>

              <Modal isOpen={isOpenModalShare} onClose={closeModalShare}>
                <ModalOverlay />
                <ModalContent>
                  <Flex
                    textColor="white"
                    position="relative"
                    top="-3em"
                    w="100%"
                  >
                    <Button
                      onClick={closeModalShare}
                      borderRadius="2.0625rem"
                      border="1px solid #FFF"
                      background="#623105"
                      _hover={{ background: 'black' }}
                      _active={{ background: 'black' }}
                    >
                      <ArrowBackIcon color="white" />
                      Back
                    </Button>
                    <Spacer />
                    <Button
                      as="a"
                      link=""
                      borderRadius="2.0625rem"
                      border="1px solid #FFF"
                      background="#623105"
                      _hover={{ background: 'black' }}
                      _active={{ background: 'black' }}
                    >
                      Download
                      <DownloadIcon color="white" />
                    </Button>
                    <Spacer />
                    <div>
                      <RWebShare
                        data={{
                          text: 'Easter 2024 Invitation',
                          url: 'https://on.natgeo.com/2zHaNup',
                          title: 'HMCC Easter ',
                        }}
                      >
                        <Button
                          borderRadius="2.0625rem"
                          border="1px solid #FFF"
                          background="#623105"
                          _hover={{ background: 'black' }}
                          _active={{ background: 'black' }}
                        >
                          Share
                          <ExternalLinkIcon color="white" />
                        </Button>
                      </RWebShare>
                    </div>
                  </Flex>

                  <ModalHeader> </ModalHeader>
                  <ModalBody>Content for Modal 1</ModalBody>
                  <ModalFooter></ModalFooter>
                </ModalContent>
              </Modal>
            </Flex>
          </Box>
        </GridItem>
        <GridItem
          colSpan={[2, 1]}
          borderRadius="0.75em"
          border="1px solid #181818"
          bgImage={`url('${process.env.PUBLIC_URL}/images/easter2024/good_friday_bg.svg')`}
          bgSize="cover"
        >
          <VStack align="left" w="90%" mx="auto" my=" 1em" fontFamily="Cousine">
            <Text fontSize="1.5em" fontWeight="700">
              Good Friday
            </Text>
            <Flex
              fontSize={{ base: bodyFontSizeMobile, lg: bodyFontSizeDesktop }}
            >
              <Text>When: </Text>
              <Text fontWeight={['normal', '700']}>
                Friday March 29, 2024 @8PM
              </Text>
            </Flex>
            <Flex
              fontSize={{ base: bodyFontSizeMobile, lg: bodyFontSizeDesktop }}
            >
              <Text>Where: </Text>
              <Text fontWeight={['normal', '700']}>
                Transformation Center, Kwun Tong
              </Text>
            </Flex>
          </VStack>
        </GridItem>
        <GridItem
          colSpan={[2, 1]}
          borderRadius="0.75em"
          border="1px solid #181818"
          bgImage={`url('${process.env.PUBLIC_URL}/images/easter2024/easter_bg.svg')`}
          bgSize="cover"
        >
          <VStack align="left" w="90%" mx="auto" my=" 1em" fontFamily="Cousine">
            <Text fontSize="1.5em" fontWeight="700">
              Easter Celebration
            </Text>
            <Flex
              fontSize={{ base: bodyFontSizeMobile, lg: bodyFontSizeDesktop }}
            >
              <Text>When: </Text>
              <Text fontWeight={['normal', '700']}>
                {' '}
                Sunday March 31, 2024 @10AM
              </Text>
            </Flex>
            <Flex
              fontSize={{ base: bodyFontSizeMobile, lg: bodyFontSizeDesktop }}
            >
              <Text>Where: </Text>
              <Text fontWeight={['normal', '700']}>
                Transformation Center, Kwun Tong
              </Text>
            </Flex>
          </VStack>
        </GridItem>
        <GridItem
          colSpan={[2, 1]}
          borderRadius="0.75em"
          border="1px solid #181818"
          bgImage={`url('${process.env.PUBLIC_URL}/images/easter2024/baptism_bg.svg')`}
          bgSize="cover"
        >
          <VStack align="left" w="90%" mx="auto" my=" 1em" fontFamily="Cousine">
            <Text fontSize="1.5em" fontWeight="700">
              Baptism Celebration
            </Text>
            <Flex
              fontSize={{ base: bodyFontSizeMobile, lg: bodyFontSizeDesktop }}
            >
              <Text>When: </Text>
              <Text fontWeight={['normal', '700']}>
                {' '}
                Sunday March 31, 2024 @2PM
              </Text>
            </Flex>
            <Flex
              fontSize={{ base: bodyFontSizeMobile, lg: bodyFontSizeDesktop }}
            >
              <Text>Where: </Text>
              <Text fontWeight={['normal', '700']}>
                Transformation Center, Kwun Tong
              </Text>
            </Flex>
          </VStack>
        </GridItem>
      </Grid>
      <VStack
        w="100%"
        h={['40em', '60em']}
        borderRadius="0.75em"
        bgColor="#FFF"
        border=" 1px solid #181818;"
      >
        <Text
          color="#464646"
          fontFamily="Cousine"
          fontSize="1.5em"
          fontStyle="normal"
          fontWeight="700"
          lineHeight="normal"
          textTransform="uppercase"
          paddingTop="1em"
        >
          #UNDEFEATED
        </Text>
        <Text
          color="#464646"
          fontFamily="Inter"
          fontSize="2em"
          fontStyle="normal"
          fontWeight="900"
          lineHeight="normal"
          textTransform="uppercase"
        >
          WE'RE SHARING TESTIMONIES!
        </Text>
        <Stack
          w={['90%', '60%']}
          h={['auto', '50%']}
          justifyContent="space-between"
          direction={['column', 'row']}
        >
          <Button
            borderRadius="2em"
            w={['18em', '20em']}
            border="2px solid #525252"
            bgcolor="#FFF"
            onClick={openModalParticipate}
          >
            <Text
              color="#525252"
              fontFamily="Cousine"
              fontSize="1em"
              fontStyle="italic"
              fontWeight="700"
              lineHeight="normal"
              px="0.5em"
            >
              Learn how to participate
            </Text>
            <InfoIcon color="#525252" />
          </Button>
          <Button
            borderRadius="2em"
            w={['18em', '20em']}
            border="2px solid #B0005C"
            bgcolor="#FFF"
          >
            <Text
              color="#B0005C"
              fontFamily="Cousine"
              fontSize="1em"
              fontStyle="italic"
              fontWeight="700"
              lineHeight="normal"
              px="1em"
            >
              Check it out on IG
            </Text>
            <ExternalLinkIcon color="#B0005C" />
          </Button>
          <Modal
            isOpen={isOpenModalParticipate}
            onClose={closeModalParticipate}
          >
            <ModalOverlay />
            <ModalContent bgColor="#FFDED7">
              <ModalHeader>
                <Button
                  onClick={closeModalParticipate}
                  borderRadius="2.0625rem"
                  border="1px solid #FFF"
                  background="#623105"
                  _hover={{ background: 'black' }}
                  _active={{ background: 'black' }}
                  fontFamily="Cousine"
                  fontStyle="italic"
                  fontWeight="700"
                  textColor="white"
                >
                  <ArrowBackIcon color="white" />
                  Back
                </Button>
              </ModalHeader>
              <ModalBody>
                <VStack textAlign="left" w="90%">
                  <Text
                    as="h1"
                    color="#464646"
                    fontFamily="Inter"
                    fontSize="1.25rem"
                    fontStyle="normal"
                    fontWeight="900"
                    lineHeight="normal"
                    textTransform="uppercase"
                  >
                    HOW TO PARTICIPATE
                  </Text>
                  <Box></Box>
                </VStack>
              </ModalBody>
              <ModalFooter></ModalFooter>
            </ModalContent>
          </Modal>
        </Stack>
        <AspectRatio h={['30em', '50em']} w="80%" ratio={1}>
          <iframe
            title="Easter 2024 Events"
            src="https://widgets.sociablekit.com/instagram-hashtag-feed/iframe/25366574"
          />
        </AspectRatio>
      </VStack>
    </VStack>
  );
};

export default EasterEvents;
