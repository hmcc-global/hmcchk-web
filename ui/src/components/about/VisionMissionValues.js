
import {
  Box,
  Container,
  Flex,
  VStack,
  Spacer,
  Text,
  useBreakpointValue,
  Stack,
} from '@chakra-ui/react';

import VisionMissionValuesAccordion from './VisionMisionValuesAccordion'

const VisionMissionValues = (props) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const direction = isMobile ? 'column' : 'row';
  const textAlign = isMobile ? 'center' : 'justify';
  return (
    <Container maxW="container.xl" py={{ base: '4rem', lg: '5rem' }}>
      <Flex h="100vh">
        {/* Left Side - Navbar */}
        {!isMobile && (
          <Box 
            w="350px" 
            bg="gray.100" 
            p={4}
            borderRight="1px solid"
            borderColor="gray.200"
          >
            <Text>Vision & Mission Menu</Text>
          </Box>
        )}
        
        {/* Right Side - Main Content */}
        <Box flex={1} p={4} overflow="auto">
          <VStack spacing={6} align="stretch">

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
                        lineHeight={{base:"0.7rem", md:"1.5rem", lg:"1.6rem"}}
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
                    display="inline"
                    fontWeight="400"
                    lineHeight={{base:"0.7rem", md:"1.5rem", lg:"1.6rem"}}
                    wordBreak="break-word"
                    fontSize={{base:"1.1rem", md:"1.7rem", lg:"1.75rem"}}
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
              </Box>
            </Stack>

            <VisionMissionValuesAccordion/>
          </VStack>
        </Box>
      </Flex>
    </Container>
  );
};

export default VisionMissionValues;
