import {
  Grid,
  GridItem,
  Box,
  VStack,
  Text,
  Button,
  AspectRatio,
  Spacer,
  Flex,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Stack,
  Link,
  ModalBody,
  ModalFooter,
  HStack,
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
          bgImage={`url('${process.env.PUBLIC_URL}/images/easter-2024/good_friday.png')`}
          bgSize="cover"
        >
          <VStack
            align="left"
            w="90%"
            mx="auto"
            my=" 1em"
            fontFamily="Cousine"
            spacing="0.25em"
          >
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
          bgImage={`url('${process.env.PUBLIC_URL}/images/easter-2024/easter.png')`}
          bgSize="cover"
        >
          <VStack
            align="left"
            w="90%"
            mx="auto"
            my=" 1em"
            fontFamily="Cousine"
            spacing="0.25em"
          >
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
          bgImage={`url('${process.env.PUBLIC_URL}/images/easter-2024/baptism.png')`}
          bgSize="cover"
        >
          <VStack
            align="left"
            w="90%"
            mx="auto"
            my=" 1em"
            fontFamily="Cousine"
            spacing="0.25em"
          >
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
        <Box textalign={['left']} w="90%">
          <Text
            color="#464646"
            fontFamily="Cousine"
            fontSize={['1em', '1.5em']}
            fontStyle="normal"
            fontWeight="700"
            lineHeight="normal"
            textTransform="uppercase"
            paddingTop="1em"
            textAlign={['left', 'center']}
          >
            #UNDEFEATED
          </Text>
          <Text
            color="#464646"
            fontFamily="Inter"
            fontSize={['1.2em', '2em']}
            fontStyle="normal"
            fontWeight="900"
            lineHeight="normal"
            textTransform="uppercase"
            textAlign={['left', 'center']}
          >
            WE'RE SHARING TESTIMONIES!
          </Text>
        </Box>
        <Stack
          w={['90%', '60%']}
          h={['auto', '50%']}
          justifyContent="space-between"
          direction={['column', 'row']}
        >
          <Button
            borderRadius="2em"
            w={['15em', '20em']}
            border="2px solid #525252"
            bgcolor="#FFF"
            onClick={openModalParticipate}
          >
            <Text
              color="#525252"
              fontFamily="Cousine"
              fontSize={['0.75em', '1em']}
              fontStyle="italic"
              fontWeight="700"
              lineHeight="normal"
              px="0.5em"
            >
              Learn how to participate
            </Text>
            <InfoIcon color="#525252" />
          </Button>
          <Link
            href="https://www.instagram.com/explore/tags/2023witnessjesus?igsh=ejUyenB6em80em9s"
            isExternal
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              borderRadius="2em"
              w={['15em', '20em']}
              border="2px solid #B0005C"
              bgcolor="#FFF"
            >
              <Text
                color="#B0005C"
                fontFamily="Cousine"
                fontSize={['0.75em', '1em']}
                fontStyle="italic"
                fontWeight="700"
                lineHeight="normal"
                px="1em"
              >
                Check it out on IG
              </Text>
              <ExternalLinkIcon color="#B0005C" />
            </Button>
          </Link>
          <Modal
            isOpen={isOpenModalParticipate}
            onClose={closeModalParticipate}
          >
            <ModalOverlay />
            <ModalContent bgColor="#FFDED7">
              <ModalHeader>
                <Flex position="relative" top={['-3.25em', '-3em']} w="100%">
                  <Button
                    onClick={closeModalParticipate}
                    borderRadius="2.0625rem"
                    border="1px solid #FFF"
                    background="black"
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
                </Flex>
                <Text
                  align="left"
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
              </ModalHeader>
              <ModalBody>
                <VStack textAlign="left" w="90%">
                  <VStack spacing="1.5em">
                    <HStack>
                      <Box
                        borderRadius="50%"
                        border="1px solid #FFF"
                        background="#464646"
                        padding="0.75em"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        textColor="white"
                        h="2em"
                      >
                        1
                      </Box>
                      <Box
                        color="#4F4F4F"
                        fontFamily="Cousine"
                        fontSize="0.803rem"
                        fontStyle="normal"
                        fontWeight="400"
                        lineHeight="normal"
                      >
                        Post an image, reel, or any creative form of expression
                        on your Instagram, and write your testimony in the
                        caption.
                      </Box>
                    </HStack>
                    <HStack>
                      <Box
                        borderRadius="50%"
                        border="1px solid #FFF"
                        background="#464646"
                        padding="0.625rem"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        textColor="white"
                        h="2em"
                        w="2em"
                        marginTop="-4em"
                      >
                        2
                      </Box>
                      <Box>
                        <Box
                          color="#4F4F4F"
                          fontFamily="Cousine"
                          fontSize="0.803rem"
                          fontStyle="normal"
                          fontWeight="400"
                          lineHeight="normal"
                        >
                          Share your personal testimony about how the power of
                          Jesus has impacted your life using the following
                          prompt:
                        </Box>
                        <Box
                          color="#863100"
                          fontFamily="Cousine"
                          fontSize="0.803rem"
                          fontStyle="italic"
                          fontWeight="700"
                          lineHeight="normal"
                          py="1em"
                        >
                          "I was once defeated by ___, but now I'm undefeated
                          because Jesus ___."
                        </Box>
                      </Box>
                    </HStack>
                    <HStack>
                      <Box
                        borderRadius="50%"
                        border="1px solid #FFF"
                        background="#464646"
                        padding="0.625rem"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        textColor="white"
                        h="2em"
                        w="2em"
                      >
                        3
                      </Box>
                      <Box
                        color="#4F4F4F"
                        fontFamily="Cousine"
                        fontSize="0.803rem"
                        fontStyle="normal"
                        fontWeight="400"
                        lineHeight="normal"
                      >
                        Include the hashtag
                        <Text
                          color="#863100"
                          fontFamily="Cousine"
                          fontSize="0.803rem"
                          fontWeight="700"
                          lineHeight="normal"
                          as="span"
                        >
                          {' '}
                          #hmccundefeated{' '}
                        </Text>
                        and tag
                        <Text
                          color="#863100"
                          fontFamily="Cousine"
                          fontSize="0.803rem"
                          fontWeight="700"
                          lineHeight="normal"
                          as="span"
                        >
                          {' '}
                          @hmcc_hk{' '}
                        </Text>
                        in your post.
                      </Box>
                    </HStack>
                    <HStack>
                      <Box
                        borderRadius="50%"
                        border="1px solid #FFF"
                        background="#464646"
                        padding="0.625rem"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        textColor="white"
                        h="2em"
                        w="2em"
                      >
                        4
                      </Box>
                      <Box
                        color="#4F4F4F"
                        fontFamily="Cousine"
                        fontSize="0.803rem"
                        fontStyle="normal"
                        fontWeight="400"
                        lineHeight="normal"
                      >
                        Make sure to visit our Easter website to view and read
                        other people's posts and testimonies!
                      </Box>
                    </HStack>
                  </VStack>
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