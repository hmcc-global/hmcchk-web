import {
  Image,
  Text,
  Container,
  Box,
  Heading,
  Fade,
  VStack,
} from '@chakra-ui/react';
import { InView } from 'react-intersection-observer';
const VisionMissionSectionMobile = () => {
  return (
    <>
      <InView rootMargin="-50px" triggerOnce={true}>
        {({ inView, ref }) => (
          <Fade transition={{ enter: { duration: 1 } }} in={inView}>
            <Container maxW="container.xl" ref={ref}>
              <VStack>
                <Box 
                    w="100%" 
                    alignItems="flex-start" 
                    py="1em"
                    marginTop="3em"
                >
                  <Box position="relative">
                    <Box
                      w="100%"
                      position="absolute"
                      h="122%"
                      bgPos="42% 90%"
                      bgSize="30%"
                      bgRepeat="no-repeat"
                      bgImage={`url('${process.env.PUBLIC_URL}/images/home/vector-purple-2.svg')`}
                    ></Box>
                    <Heading
                      color="#0C0C20"
                      fontFamily="DMSerifDisplay_Italic, serif"
                      fontWeight="400"
                      lineHeight="1"
                      wordBreak="break-word"
                      fontSize={['2rem', '2rem', '3rem', '3.75rem']}
                    >
                      Our 2024-25 Church <br></br>Theme: Pursue
                    </Heading>
                  </Box>
                </Box>
                <VStack
                  borderRadius="0.5rem"
                  border="1px solid"
                  borderColor="#EDECFF"
                  bgColor="#EDECFF"
                  p="1em"
                >
                  <Image
                    src={
                      process.env.PUBLIC_URL + 'images/home/pursue_theme.png'
                    }
                  />

                  <Text
                    color="#0C0C20"
                    fontSize="14px"
                    px="0.5em"
                    fontFamily="Manrope"
                    fontWeight="400"
                    textAlign="center"
                  >
                    As our church approaches our 10th year, we recognize the
                    need to more actively <b>"pursue"</b> the vision and calling
                    God has given us.
                    <br></br>
                    <br></br>
                    The 3 specific reasons for this theme:
                  </Text>

                  <Box
                    borderRadius="10"
                    border="1px solid"
                    borderColor="#B9B5F4"
                    textAlign="center"
                    padding="0.5em"
               
                  >
                    <Text
                      fontFamily="DMSerifDisplay_Italic, serif"
                      display="inline"
                      fontWeight="400"
                      wordBreak="break-word"
                      fontSize="18px"
                      lineHeight="106.3%"
                    >
                      <Text color="#141419" display="inline">
                        We want to
                      </Text>{' '}
                      <Text color="#C17150" display="inline">
                        SEEK
                      </Text>{' '}
                      <Text color="#141419" display="inline">
                        after Jesus and Kingdom things
                      </Text>
                    </Text>
                  </Box>
                  <Box
                    borderRadius="10"
                    border="1px solid"
                    borderColor="#B9B5F4"
                    textAlign="center"
                    padding="0.5em"
                  >
                    <Text
                      fontFamily="DMSerifDisplay_Italic, serif"
                      display="inline"
                      fontWeight="400"
                      fontSize="18px"
                      wordBreak="break-word"
                      lineHeight="106.3%"
                    >
                      <Text color="#141419" display="inline">
                        We want to
                      </Text>{' '}
                      <Text color="#C17150" display="inline">
                        SET
                      </Text>{' '}
                      <Text color="#141419" display="inline">
                        a standard for discipleship
                      </Text>
                    </Text>
                  </Box>
                  <Box
                    borderRadius="10"
                    border="1px solid"
                    borderColor="#B9B5F4"
                    textAlign="center"
                    padding="0.5em"
                    lineHeight="106.3%"
                  >
                    <Text
                      fontFamily="DMSerifDisplay_Italic, serif"
                      display="inline"
                      fontWeight="400"
                      fontSize="18px"
                      wordBreak="break-word"
                    >
                      <Text color="#141419" display="inline">
                        We want to
                      </Text>{' '}
                      <Text color="#C17150" display="inline">
                        SEE
                      </Text>{' '}
                      <Text color="#141419" display="inline">
                        progress in the Saturate Vision
                      </Text>
                    </Text>
                  </Box>
                </VStack>
              </VStack>
            </Container>
          </Fade>
        )}
      </InView>
    </>
  );
};
export default VisionMissionSectionMobile;
