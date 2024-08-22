import {
  Button,
  Box,
  Flex,
  HStack,
  Heading,
  VStack,
  Text,
  Spacer,
  Link,
  Image,
  Fade,
  Container,
} from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { InView } from 'react-intersection-observer';
const VisionMissionSection = () => {
  return (
    <InView rootMargin="-200px" triggerOnce={true}>
      {({ inView, ref }) => (
        <Fade transition={{ enter: { duration: 1 } }} in={inView}>
          <Container
            maxW="container.xl"
            py={10}
            ref={ref}
            bgImage={`url('${process.env.PUBLIC_URL}/images/home/hk-green.png')`}
            bgPos="center right"
            bgSize="contain"
            bgRepeat="no-repeat"
          >
            <VStack>
              <Box w="100%" alignItems="flex-start" paddingBottom={'1em'}>
                <Box w="30%" position="relative">
                  <Box
                    w="100%"
                    position="absolute"
                    h="100%"
                    bgPos="45% 50%"
                    bgSize="40%"
                    bgRepeat="no-repeat"
                    bgImage={`url('${process.env.PUBLIC_URL}/images/home/vector-green-1.svg')`}
                  ></Box>
                  <Box
                    w="100%"
                    position="absolute"
                    h="107%"
                    bgPos="30% 100%"
                    bgSize="50%"
                    bgRepeat="no-repeat"
                    bgImage={`url('${process.env.PUBLIC_URL}/images/home/vector-green-2.svg')`}
                  ></Box>
                  <Heading
                    color="#0C0C20"
                    fontFamily="DMSerifDisplay_Italic, serif"
                    fontWeight="400"
                    lineHeight="1"
                    wordBreak="break-word"
                    fontSize="60"
                  >
                    Our Vision<br></br> & Mission
                  </Heading>
                </Box>
              </Box>
              <Flex h="12em">
                <VStack
                  borderRadius="0.5rem"
                  w="49%"
                  border="1px solid"
                  borderColor="green.400"
                  p="1em"
                >
                  <Box
                    borderRadius="1.875em"
                    bgColor="white"
                    mx="auto"
                    px="1em"
                    my="1em"
                  >
                    <Text
                      color="#0C0C20"
                      fontSize="20"
                      fontFamily="Manrope"
                      fontWeight="700"
                      textTransform="uppercase"
                      lineHeight="20.6px"
                      letterSpacing="4px"
                      wordBreak="break-word"
                    >
                      VISION
                    </Text>
                  </Box>
                  <Box>
                    <Text>
                      <Text display="inline">
                        <Text
                          color="#4A6EEB"
                          fontSize="28"
                          fontFamily="DMSerifDisplay_Italic, serif"
                          fontWeight="400"
                          lineHeight="28.84px"
                          wordBreak="break-word"
                          display="inline"
                        >
                          Multiplying
                        </Text>{' '}
                        <Text
                          color="#141419"
                          fontSize="28"
                          fontFamily="DMSerifDisplay_Regular, serif"
                          fontWeight="400"
                          lineHeight="28.84px"
                          wordBreak="break-word"
                          display="inline"
                        >
                          churches in
                        </Text>{' '}
                        <Text
                          color="#141419"
                          fontSize="28"
                          fontFamily="DMSerifDisplay_Italic, serif"
                          fontWeight="400"
                          lineHeight="28.84px"
                          wordBreak="break-word"
                          display="inline"
                        >
                          campuses and cities
                        </Text>{' '}
                        <Text
                          color="#141419"
                          fontSize="28"
                          fontFamily="DMSerifDisplay_Regular, serif"
                          fontWeight="400"
                          lineHeight="28.84px"
                          wordBreak="break-word"
                          display="inline"
                        >
                          to
                        </Text>{' '}
                        <Text
                          color="#4A6EEB"
                          fontSize="28"
                          fontFamily="DMSerifDisplay_Italic, serif"
                          fontWeight="400"
                          lineHeight="28.84px"
                          wordBreak="break-word"
                          display="inline"
                        >
                          transform
                        </Text>{' '}
                        <Text
                          color="#141419"
                          fontSize="28"
                          fontFamily="DMSerifDisplay_Regular, serif"
                          fontWeight="400"
                          lineHeight="28.84px"
                          wordBreak="break-word"
                          display="inline"
                        >
                          the
                        </Text>{' '}
                        <Text
                          color="#141419"
                          fontSize="28"
                          fontFamily="DMSerifDisplay_Italic, serif"
                          fontStyle="italic"
                          fontWeight="400"
                          lineHeight="28.84px"
                          wordBreak="break-word"
                          display="inline"
                        >
                          next generation
                        </Text>{' '}
                        <Text
                          color="#141419"
                          fontSize="28"
                          fontFamily="DMSerifDisplay_Regular, serif"
                          fontWeight="400"
                          lineHeight="28.84px"
                          wordBreak="break-word"
                          display="inline"
                        >
                          among the nations.
                        </Text>
                      </Text>
                    </Text>
                  </Box>
                </VStack>
                <Spacer />
                <VStack
                  borderRadius="0.5rem"
                  border="1px solid"
                  borderColor="green.400"
                  p="1em"
                  w="49%"
                >
                  <Box
                    borderRadius="1.875em"
                    bgColor="white"
                    mx="auto"
                    px="1em"
                    my="1em"
                  >
                    <Text
                      color="#0C0C20"
                      fontSize="20"
                      fontFamily="Manrope"
                      fontWeight="700"
                      textTransform="uppercase"
                      lineHeight="20.6px"
                      letterSpacing="4px"
                      wordBreak="break-word"
                    >
                      MISSION
                    </Text>
                  </Box>
                  <Box>
                    <Text display="inline">
                      <Text
                        color="#141419"
                        fontSize="28"
                        fontFamily="DMSerifDisplay_Regular, serif"
                        fontWeight="400"
                        lineHeight="28.84px"
                        wordWrap="break-word"
                        display="inline"
                      >
                        To
                      </Text>{' '}
                      <Text
                        color="#4A6EEB"
                        fontSize="28"
                        fontFamily="DMSerifDisplay_Italic, serif"
                        fontWeight="400"
                        lineHeight="28.84px"
                        wordWrap="break-word"
                        display="inline"
                      >
                        transform
                      </Text>{' '}
                      <Text
                        color="#141419"
                        fontSize="28"
                        fontFamily="DMSerifDisplay_Regular, serif"
                        fontWeight="400"
                        lineHeight="28.84px"
                        wordWrap="break-word"
                        display="inline"
                      >
                        lost people into
                      </Text>{' '}
                      <Text
                        color="#141419"
                        fontSize="28"
                        fontFamily="DMSerifDisplay_Italic, serif"
                        fontWeight="400"
                        lineHeight="28.84px"
                        wordWrap="break-word"
                        display="inline"
                      >
                        Christ's disciples
                      </Text>{' '}
                      <Text
                        color="#141419"
                        fontSize="28"
                        fontFamily="DMSerifDisplay_Regular, serif"
                        fontWeight="400"
                        lineHeight="28.84px"
                        wordWrap="break-word"
                        display="inline"
                      >
                        who will then
                      </Text>{' '}
                      <Text
                        color="#4A6EEB"
                        fontSize="28"
                        fontFamily="DMSerifDisplay_Italic, serif"
                        fontWeight="400"
                        lineHeight="28.84px"
                        wordWrap="break-word"
                        display="inline"
                      >
                        transform
                      </Text>{' '}
                      <Text
                        color="#141419"
                        fontSize="28"
                        fontFamily="DMSerifDisplay_Regular, serif"
                        fontWeight="400"
                        lineHeight="28.84px"
                        wordWrap="break-word"
                        display="inline"
                      >
                        the
                      </Text>{' '}
                      <Text
                        color="#141419"
                        fontSize="28"
                        fontFamily="DMSerifDisplay_Italic, serif"
                        fontWeight="400"
                        lineHeight="28.84px"
                        wordWrap="break-word"
                        display="inline"
                      >
                        world.
                      </Text>
                    </Text>
                  </Box>
                </VStack>
              </Flex>
              <Flex py="1em">
                <Box bgColor={'#DBF1F1'} p="1em" w="19%">
                  <VStack>
                    <Box textAlign="left">
                      <Text
                        color="#0C0C20"
                        fontSize="32px"
                        fontFamily="DMSerifDisplay_Italic, serif"
                        fontWeight="400"
                        wordBreak="break-word"
                      >
                        About Us
                      </Text>
                      <Text fontFamily="Manrope" fontWeight="400" fontSize="18">
                        Learn more about who we are, our values, our beliefs,
                        and more
                      </Text>
                    </Box>
                    <Flex justifyContent="flex-end" py="1em">
                      <Link
                        href="/about-us"
                        id="homepage-about"
                        paddingLeft="10em"
                      >
                        <Button
                          bgColor={'#DBF1F1'}
                          _hover={{ color: 'white', bgColor: 'black' }}
                          borderRadius="5rem"
                          border="0.7px solid"
                          borderColor="var(--Black, #0C0C20)"
                        >
                          <ArrowForwardIcon />
                        </Button>
                      </Link>
                    </Flex>
                  </VStack>
                </Box>
                <Spacer />
                <VStack
                  w="79%"
                  borderRadius="0.5rem"
                  border="1px solid"
                  borderColor="green.400"
                  p="1em"
                >
                  <Flex h="full">
                    <Box w="75%">
                      <Text
                        color="#0C0C20"
                        fontSize="18px"
                        px="0.5em"
                        fontFamily="Manrope"
                        fontWeight="400"
                        wordBreak="break-word"
                      >
                        From January 2024 through December 2029, our church will
                        journey together to fulfil God’s calling for us through
                        the Saturate Vision in Hong Kong.
                      </Text>
                    </Box>
                    <Spacer />
                    <Link href="/saturate">
                      <Button
                        border="0.7px solid var(--chakra-colors-Blue-Primary, #4A6EEB)"
                        my="auto"
                        borderRadius="2.75rem"
                        _hover={{ bg: '#4A6EEB', color: 'white' }}
                        textColor="#4A6EEB"
                        bgColor="transparent"
                      >
                        <Text
                          fontSize="18px"
                          fontFamily="Manrope"
                          fontWeight="400"
                          wordBreak="break-word"
                        >
                          Learn More
                        </Text>
                        <ArrowForwardIcon />
                      </Button>
                    </Link>
                  </Flex>
                  <VStack bgColor="white">
                    <Box textAlign="left" w="100%" px="1em" paddingTop="1em">
                      <Text
                        color="#4A6EEB"
                        fontSize="20px"
                        fontFamily="Manrope"
                        fontWeight="700"
                        textTransform="uppercase"
                        lineHeight="20.6px"
                        letterSpacing="4px"
                        wordBreak="break-word"
                      >
                        SATURATE VISION
                      </Text>
                    </Box>
                    <Box textAlign="left" w="100%" px="1em" paddingBottom="1em">
                      <Text
                        color="#0C0C20"
                        fontSize="20px"
                        fontFamily="DMSerifDisplay_Italic, serif"
                        fontWeight="400"
                        lineHeight="21.26px"
                        wordBreak="break-word"
                      >
                        To saturate Hong Kong with the knowledge of God's glory
                        by living out the Kingdom lifestyle and proclaiming the
                        Gospel, so that we can make more disciples of all
                        nations, locally, regionally, and globally for the
                        spread of Jesus's fame.
                      </Text>
                    </Box>
                  </VStack>
                </VStack>
              </Flex>
              bg
            </VStack>
          </Container>
        </Fade>
      )}
    </InView>
  );
};
export default VisionMissionSection;
