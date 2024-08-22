import {
  Button,
  Box,
  Flex,
  Heading,
  VStack,
  Text,
  Spacer,
  Link,
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
              <Flex minH="12em">
                <VStack
                  borderRadius="10"
                  w="49%"
                  border="1px solid"
                  borderColor="#97D0D4"
                  p="10"
                  textAlign="justify"
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
                      py="0.5em"
                    >
                      VISION
                    </Text>
                  </Box>
                  <Box>
                    <Text>
                      <Text
                        display="inline"
                        fontWeight="400"
                        lineHeight="28.84px"
                        wordBreak="break-word"
                        fontSize="28"
                      >
                        <Text
                          color="#4A6EEB"
                          fontFamily="DMSerifDisplay_Italic, serif"
                          display="inline"
                        >
                          Multiplying
                        </Text>{' '}
                        <Text
                          color="#141419"
                          fontFamily="DMSerifDisplay_Regular, serif"
                          display="inline"
                        >
                          churches in
                        </Text>{' '}
                        <Text
                          color="#141419"
                          fontFamily="DMSerifDisplay_Italic, serif"
                          display="inline"
                        >
                          campuses and cities
                        </Text>{' '}
                        <Text
                          color="#141419"
                          fontFamily="DMSerifDisplay_Regular, serif"
                          display="inline"
                        >
                          to
                        </Text>{' '}
                        <Text
                          color="#4A6EEB"
                          fontFamily="DMSerifDisplay_Italic, serif"
                          display="inline"
                        >
                          transform
                        </Text>{' '}
                        <Text
                          color="#141419"
                          fontFamily="DMSerifDisplay_Regular, serif"
                          display="inline"
                        >
                          the
                        </Text>{' '}
                        <Text
                          color="#141419"
                          fontFamily="DMSerifDisplay_Italic, serif"
                          display="inline"
                        >
                          next generation
                        </Text>{' '}
                        <Text
                          color="#141419"
                          fontFamily="DMSerifDisplay_Regular, serif"
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
                  borderRadius="10"
                  border="1px solid"
                  borderColor="#97D0D4"
                  p="10"
                  w="49%"
                  textAlign="justify"
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
                      py="0.5em"
                    >
                      MISSION
                    </Text>
                  </Box>
                  <Box>
                    <Text
                      display="inline"
                      fontWeight="400"
                      lineHeight="28.84px"
                      fontSize="28"
                      wordWrap="break-word"
                    >
                      <Text
                        color="#141419"
                        fontFamily="DMSerifDisplay_Regular, serif"
                        display="inline"
                      >
                        To
                      </Text>{' '}
                      <Text
                        color="#4A6EEB"
                        fontFamily="DMSerifDisplay_Italic, serif"
                        display="inline"
                      >
                        transform
                      </Text>{' '}
                      <Text
                        color="#141419"
                        fontFamily="DMSerifDisplay_Regular, serif"
                        display="inline"
                      >
                        lost people into
                      </Text>{' '}
                      <Text
                        color="#141419"
                        fontFamily="DMSerifDisplay_Italic, serif"
                        display="inline"
                      >
                        Christ's disciples
                      </Text>{' '}
                      <Text
                        color="#141419"
                        fontFamily="DMSerifDisplay_Regular, serif"
                        display="inline"
                      >
                        who will then
                      </Text>{' '}
                      <Text
                        color="#4A6EEB"
                        fontFamily="DMSerifDisplay_Italic, serif"
                        display="inline"
                      >
                        transform
                      </Text>{' '}
                      <Text
                        color="#141419"
                        fontFamily="DMSerifDisplay_Regular, serif"
                        display="inline"
                      >
                        the
                      </Text>{' '}
                      <Text
                        color="#141419"
                        fontFamily="DMSerifDisplay_Italic, serif"
                        display="inline"
                      >
                        world.
                      </Text>
                    </Text>
                  </Box>
                </VStack>
              </Flex>
              <Flex py="1em">
                <Box bgColor={'#DBF1F1'} p="1.75em" w="24%">
                  <Flex
                    h="full"
                    flexDir="column"
                    justifyContent="space-between"
                  >
                    <VStack spacing="3">
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
                        <Text
                          fontFamily="Manrope"
                          fontWeight="400"
                          fontSize="18"
                        >
                          Learn more about who we are, our values, our beliefs,
                          and more
                        </Text>
                      </Box>
                    </VStack>

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
                          py="1.75em"
                          px="1.25em"
                        >
                          <ArrowForwardIcon boxSize={6} />
                        </Button>
                      </Link>
                    </Flex>
                  </Flex>
                </Box>
                <Spacer />
                <VStack
                  w="74%"
                  borderRadius="0.5rem"
                  border="1px solid"
                  borderColor="#97D0D4"
                  p="2em"
                  spacing="1.5em"
                >
                  <Flex h="full" justifyContent="space-between">
                    <Box w="65%">
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
                    <Link href="/saturate" my="auto">
                      <Button
                        border="0.7px solid var(--chakra-colors-Blue-Primary, #4A6EEB)"
                        borderRadius="2.75rem"
                        _hover={{ bg: '#4A6EEB', color: 'white' }}
                        textColor="#4A6EEB"
                        bgColor="transparent"
                        px="2.4em"
                        py="1.6em"
                      >
                        <Flex
                          flexDir="row"
                          w="100%"
                          justifyContent="space-between"
                          minW="9em"
                        >
                          <Text
                            fontSize="18px"
                            fontFamily="Manrope"
                            fontWeight="700"
                            wordBreak="break-word"
                          >
                            Learn More
                          </Text>
                          <ArrowForwardIcon boxSize={6} my="auto" />
                        </Flex>
                      </Button>
                    </Link>
                  </Flex>
                  <VStack
                    bgColor="white"
                    borderRadius="0.5rem"
                    p="1.25em"
                    spacing="0.75em"
                  >
                    <Box textAlign="left" w="100%">
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
                    <Box textAlign="left" w="100%">
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
