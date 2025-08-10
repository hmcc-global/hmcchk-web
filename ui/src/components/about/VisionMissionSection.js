
import {
  Box,
  Container,
  Flex,
  VStack,
  Text,
  useBreakpointValue,
  Stack,
  Link,
  Button
} from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';

import VisionMissionValuesAccordion from './VisionMisionValuesAccordion'

const VisionMissionValuesSection = (props) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const direction = isMobile ? 'column' : 'row';
  const textAlign = isMobile ? 'center' : 'left';
  return (
    <Flex h="100vh">
      <Box flex={1} p={4} overflow="auto">
        <VStack spacing={6} align="stretch">
          <Box
            textAlign={textAlign}
          >

          <Text
              display="inline"
              fontWeight="400"
              lineHeight="1.6rem"
              wordBreak="break-word"
              fontSize="2.125rem"
              // color="#4A6EEB"
              fontFamily="DMSerifDisplay_Italic, serif"
            >
                Vision, Mission & Our Values
            </Text>
          </Box>
          {isMobile ? 
          (
          <VStack 
            w="100%"
            borderRadius="0.5rem"
            border="1px solid"
            borderColor="#97D0D4"
            py="2em"
            px="1em"
            spacing="1.5em"
            align="center"
          >
              <Box>
                <Text
                  color="#0C0C20"
                  fontSize="0.8rem"
                  fontFamily="Manrope"
                  fontWeight="400"
                  wordBreak="break-word"
                  textAlign="center"
                >
                  From January 2024 through December 2029, our church will
                  journey together to fulfil God’s calling for us through
                  the Saturate Vision in Hong Kong.
                </Text>
              </Box>
              <Box
                w="100%"
                px="0.5em"
                pt="0.75em"
                pb="1.25em"
                bgColor="white"
                borderRadius="12"
              >
                <Box w="100%" p="0.6em" bgColor="white">
                  <Text
                    color="#4A6EEB"
                    fontSize="0.9rem"
                    fontFamily="Manrope"
                    fontWeight="700"
                    textTransform="uppercase"
                    lineHeight="1rem"
                    letterSpacing="4px"
                    wordBreak="break-word"
                    textAlign="center"
                    py={'0.5em'}
                  >
                    SATURATE VISION
                  </Text>
                </Box>
                <Text
                  color="#0C0C20"
                  fontSize="1rem"
                  fontFamily="DMSerifDisplay_Italic, serif"
                  fontWeight="400"
                  lineHeight="1.1rem"
                  wordBreak="break-word"
                  textAlign="center"
                >
                  To saturate Hong Kong with the knowledge of God's glory
                  by living out the Kingdom lifestyle and proclaiming the
                  Gospel, so that we can make more disciples of all
                  nations, locally, regionally, and globally for the
                  spread of Jesus's fame.
                </Text>
              </Box>


            <Link href="/saturate" w="100%">
              <Button
                my="auto"
                borderRadius="2.75rem"
                w="100%"
                bgColor="#77C2C6"
                _active={{
                  bgColor: '#DBF1F1',  // Color when clicked/active
                  transform: 'scale(0.98)'  // Optional: slight press effect
                }}
                _hover={{
                  bgColor: '#77C2C6'  // Maintain same color on hover
                }}
                transition="all 0.2s"
              >
                <Text
                    fontSize="0.8rem"
                    fontFamily="Manrope"
                    fontWeight="700"
                    wordBreak="break-word"
                    mx="1em"
                  >
                    Learn more
                  </Text>
                  <ArrowForwardIcon
                    color="black"
                    transform="rotate(315deg)"
                    boxSize="30px"
                  />
              </Button>
            </Link>
          </VStack>
          )
          :
          (<VStack
            w="100%"
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
                  fontSize="1.125rem"
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
                      fontSize="1.125rem"
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
                  fontSize="1.2rem"
                  fontFamily="Manrope"
                  fontWeight="700"
                  textTransform="uppercase"
                  lineHeight="1rem"
                  letterSpacing="4px"
                  wordBreak="break-word"
                >
                  SATURATE VISION
                </Text>
              </Box>
              <Box textAlign="left" w="100%">
                <Text
                  color="#0C0C20"
                  fontSize="1.25rem"
                  fontFamily="DMSerifDisplay_Italic, serif"
                  fontWeight="400"
                  lineHeight="1.4rem"
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
          </VStack>)
          }

          <Stack direction={direction} spacing={4} w="100%">
            {/* Vision Card */}
            <Box
              flex={1}
              minH={isMobile ? undefined : "12em"}
              borderRadius="10"
              border="1px solid"
              borderColor="#97D0D4"
              p={{base:"1rem", md:"1.7rem" ,lg:"2rem"}}
            >
              <Box textAlign={"center"}>
                <Box
                  display="inline-block"
                  borderRadius="1.875em"
                  bgColor="white"
                  mx="auto"
                  px="1em"
                  mb={{base:"1rem", md:"1.7rem" ,lg:"2rem"}}
                  border="1px solid"
                  borderColor="#4A6EEB"
                >
                  <Text
                    color="#4A6EEB"
                    fontSize={{base:"0.9rem", md:"1.2rem", lg:"1.2rem"}}
                    fontFamily="Manrope"
                    fontWeight="700"
                    textTransform="uppercase"
                    lineHeight={"1rem"}
                    letterSpacing="4px"
                    wordBreak="break-word"
                    py="0.5em"
                  >
                    VISION
                  </Text>
                </Box>
              </Box>
              <Box textAlign={textAlign}>
                <Text>
                    <Text
                      display="inline"
                      fontWeight="400"
                      lineHeight={{base:"0.4rem", md:"1.5rem", lg:"1.6rem"}}
                      wordBreak="break-word"
                      fontSize={{base:"1.1rem", md:"1.7rem", lg:"1.75rem"}}
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
            </Box>

            {/* Mission Card */}
            <Box
              flex={1}
              minH={isMobile ? undefined : "12em"}
              borderRadius="10"
              border="1px solid"
              borderColor="#97D0D4"
              p={{base:"1rem", md:"1.7rem" ,lg:"2rem"}}
            >
              <Box textAlign={"center"}>
                <Box
                  display="inline-block"
                  borderRadius="1.875em"
                  bgColor="white"
                  mx="auto"
                  px="1em"
                  mb={{base:"1rem", md:"1.7rem" ,lg:"2rem"}}
                  border="1px solid"
                  borderColor="#4A6EEB"
                >
                  <Text
                    color="#4A6EEB"
                    fontSize={{base:"0.9rem", md:"1.2rem", lg:"1.2rem"}}
                    fontFamily="Manrope"
                    fontWeight="700"
                    textTransform="uppercase"
                    lineHeight={"1rem"}
                    letterSpacing="4px"
                    wordBreak="break-word"
                    py="0.5em"
                  >
                    MISSION
                  </Text>
                </Box>
              </Box>
              <Box textAlign={textAlign}>
                <Text
                  as={"span"}
                  display="inline"
                  fontWeight="400"
                  lineHeight={{base:"0.4rem", md:"1.5rem", lg:"1.6rem"}}
                  wordBreak="break-word"
                  fontSize={{base:"1.1rem", md:"1.7rem", lg:"1.75rem"}}
                  whiteSpace={"normal"}
                >
                  <Text
                    color="#141419"
                    fontFamily="DMSerifDisplay_Regular, serif"
                    display="inline"
                  >
                    To{' '}
                  </Text>
                  <Text
                    color="#4A6EEB"
                    fontFamily="DMSerifDisplay_Italic, serif"
                    display="inline"
                  >
                    transform{' '}
                  </Text>
                  <Text
                    color="#141419"
                    fontFamily="DMSerifDisplay_Regular, serif"
                    display="inline"
                  >
                    lost people into{' '}
                  </Text>
                  <Text
                    color="#141419"
                    fontFamily="DMSerifDisplay_Italic, serif"
                    display="inline"
                  >
                    Christ's disciples{' '}
                  </Text>
                  <Text
                    color="#141419"
                    fontFamily="DMSerifDisplay_Regular, serif"
                    display="inline"
                  >
                    who will then{' '}
                  </Text>
                  <Text
                    color="#4A6EEB"
                    fontFamily="DMSerifDisplay_Italic, serif"
                    display="inline"
                  >
                    transform{' '}
                  </Text>
                  <Text
                    color="#141419"
                    fontFamily="DMSerifDisplay_Regular, serif"
                    display="inline"
                  >
                    the{' '}
                  </Text>
                  <Text
                    color="#141419"
                    fontFamily="DMSerifDisplay_Italic, serif"
                    display="inline"
                  >
                    world.
                  </Text>
                </Text>
              </Box>
            </Box>
          </Stack>

          <Box textAlign="left" mb={{base:"1rem", md:"1.7rem" ,lg:"2rem"}}>
            <Box
              display="inline-block" 
              borderRadius="1.875em"
              bgColor="white"
              px="1em" 
              py="0.5em"
              border="1px solid"
              borderColor="#4A6EEB"
              lineHeight="1rem"  
            >
                <Text
                  color="#4A6EEB"
                  fontSize={{base:"0.9rem", md:"1.2rem", lg:"1.2rem"}}
                  fontFamily="Manrope"
                  fontWeight="700"
                  textTransform="uppercase"
                  letterSpacing="4px"
                  whiteSpace="nowrap" 
                >
                  Our values
                </Text>
              </Box>
            </Box>

          <VisionMissionValuesAccordion/>
        </VStack>
      </Box>
    </Flex>
  );
};

export default VisionMissionValuesSection;
