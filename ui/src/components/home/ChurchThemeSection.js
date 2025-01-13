import {
    Button,
    Box,
    Flex,
    Heading,
    VStack,
    Text,
    Image,
    Fade,
    Container,
    HStack,
  } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { InView } from 'react-intersection-observer';

const ChurchThemeSection = () => {
  return (
    <InView rootMargin="-50px" triggerOnce={true}>
      {({ inView, ref }) => (
        <Fade transition={{ enter: { duration: 1 } }} in={inView}>
          <Container
            maxW="container.xl"
            py={10}
            ref={ref}
          >
            <VStack>
              <Box w="100%" alignItems="flex-start" paddingBottom={'1em'}>
                <Box w="100%" position="relative">
                  <Box
                    w="100%"
                    position="absolute"
                    h="120%"
                    bgPos="70% 100%"
                    bgSize="15%"
                    bgRepeat="no-repeat"
                    bgImage={`url('${process.env.PUBLIC_URL}/images/home/vector-purple-1.svg')`}
                  ></Box>
                  <Heading
                    color="#0C0C20"
                    fontFamily="DMSerifDisplay_Italic, serif"
                    fontSize={['2rem', '2rem', '3rem', '3.75rem']}
                    fontWeight="400"
                    lineHeight="1"
                    wordBreak="break-word"
                  >
                    Our 2024-25 Church Theme: Pursue
                  </Heading>
                </Box>
              </Box>
              <Flex minH="12em">
                <HStack
                  w="100%"
                  borderRadius="0.5rem"
                  border="1px solid"
                  borderColor="#EDECFF"
                  p="1.5em"
                  bgColor="#EDECFF"
                >
                  <VStack w="50%">
                    <Flex h="full" justifyContent="space-between">
                      <Box>
                        <Text
                          color="#0C0C20"
                          fontSize="18px"
                          px="0.5em"
                          fontFamily="Manrope"
                          fontWeight="400"
                        >
                          As our church approaches our 10th year, we recognize the need to more actively <b>"pursue"</b> the vision and calling God has given us. 
                        </Text>
                        <br></br>
                        <Text
                          color="#0C0C20"
                          fontSize="18px"
                          px="0.5em"
                          fontFamily="Manrope"
                          fontWeight="400"
                        >
                        The 3 specific reasons for this theme:
                        </Text>
                        <br></br>
                      </Box>
                    </Flex>
                    <Box
                      borderRadius="10"
                      w="80%"
                      border="1px solid"
                      borderColor="#B9B5F4"
                      textAlign="center"
                      padding="0.5em"
                    >
                      <Text
                        fontFamily="DMSerifDisplay_Italic, serif"
                        display="inline"
                        fontWeight="400"
                        fontSize="20"
                        wordBreak="break-word"
                      >
                        <Text 
                          color="#141419"
                          display="inline"> 
                            We want to 
                        </Text>
                        {' '}
                        <Text 
                          color="#C17150"
                          display="inline"> 
                            SEEK
                        </Text>
                        {' '}
                        <Text 
                          color="#141419"
                          display="inline"> 
                            after Jesus and Kingdom things 
                        </Text>
                         
                      </Text>
                    </Box>
                    <Box
                      borderRadius="10"
                      w="80%"
                      border="1px solid"
                      borderColor="#B9B5F4"
                      textAlign="center"
                      padding="0.5em"
                    >
                      <Text
                        fontFamily="DMSerifDisplay_Italic, serif"
                        display="inline"
                        fontWeight="400"
                        fontSize="20"
                        wordBreak="break-word"
                      >
                        <Text 
                          color="#141419"
                          display="inline"> 
                            We want to 
                        </Text>
                        {' '}
                        <Text 
                          color="#C17150"
                          display="inline"> 
                            SET
                        </Text>
                        {' '}
                        <Text 
                          color="#141419"
                          display="inline"> 
                            a standard for discipleship
                        </Text>
                         
                      </Text>
                      
                    </Box>
                    <Box
                      borderRadius="10"
                      w="80%"
                      border="1px solid"
                      borderColor="#B9B5F4"
                      textAlign="center"
                      padding="0.5em"
                    >
                      <Text
                        fontFamily="DMSerifDisplay_Italic, serif"
                        display="inline"
                        fontWeight="400"
                        fontSize="20"
                        wordBreak="break-word"
                      >
                        <Text 
                          color="#141419"
                          display="inline"> 
                            We want to 
                        </Text>
                        {' '}
                        <Text 
                          color="#C17150"
                          display="inline"> 
                            SEE
                        </Text>
                        {' '}
                        <Text 
                          color="#141419"
                          display="inline"> 
                            progress in the Saturate Vision
                        </Text>
                         
                      </Text>
                    </Box>
                  </VStack>
                  <Box>
                    <Image
                      width="38rem" 
                      src={process.env.PUBLIC_URL+'images/home/pursue_theme.png'} 
                    />
                  </Box> 
                </HStack>
              </Flex>
            </VStack>
          </Container>
        </Fade>
      )}
    </InView>
  );
};

export default ChurchThemeSection;
