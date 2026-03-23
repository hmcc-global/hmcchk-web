import {
  Image,
  Text,
  Container,
  Box,
  Heading,
  Fade,
  VStack,
  IconButton,
} from '@chakra-ui/react';
import { useState } from 'react';
import { MdExpandLess, MdExpandMore } from 'react-icons/md';
import { InView } from 'react-intersection-observer';

const OVERFLOW_BLURB =
  'The theme for 2025-2026 is "Overflow," calling us to boldly trust in God\'s promise that as our intimacy with Him deepens, His Kingdom blessings will fill us to the point of overflowing. This overflow will first be visible in our relationships and influence with others as we live out a transformed life. This  abundance will then propel our 10-year commitment to plant churches, reproduce disciples, and extend our impact into new campuses and cities. We believe this season of overflow will empower us to transform the next generation among the nations for the glory of God\'s Kingdom.';

const VisionMissionSectionMobile = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const onExpandClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <InView rootMargin="-50px" triggerOnce={true}>
        {({ inView, ref }) => (
          <Fade transition={{ enter: { duration: 1 } }} in={inView}>
            <Container maxW="container.xl" ref={ref}>
              <VStack>
                <Box w="100%" alignItems="flex-start" py="1em" marginTop="3em">
                  <Box position="relative">
                    <Box
                      w="100%"
                      position="absolute"
                      h="122%"
                      bgPos="42% 90%"
                      bgSize="26%"
                      bgRepeat="no-repeat"
                      bgImage={`url('${process.env.PUBLIC_URL}/images/home/church-theme-overflow-vector-underline.svg')`}
                    ></Box>
                    <Heading
                      color="#0C0C20"
                      fontFamily="DMSerifDisplay_Italic, serif"
                      fontWeight="400"
                      lineHeight="1"
                      wordBreak="break-word"
                      fontSize={['2rem', '2rem', '3rem', '3.75rem']}
                    >
                      Our 2025-26 Church <br></br>Theme: Overflow
                    </Heading>
                  </Box>
                </Box>
                <VStack
                  borderRadius="0.5rem"
                  border="1px solid"
                  borderColor="#E7F4FF"
                  bgColor="#E7F4FF"
                  p="1em"
                  spacing="16px"
                >
                  <VStack>
                    <Image
                      src={
                        process.env.PUBLIC_URL +
                        'images/home/church-theme-overflow-2526.jpg'
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
                      As we recognize how God has poured and continues to pour
                      His grace into our lives, we are called to let it
                      overflow, transforming the world around us.
                      <br></br>
                      <br></br>
                      The 3 specific areas for us to overflow from:
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
                        <Text color="#0C0C20" display="inline">
                          We want to overflow in our
                        </Text>{' '}
                        <Text color="#84588F" display="inline">
                          INTIMACY
                        </Text>{' '}
                        <Text color="#0C0C20" display="inline">
                          with God
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
                        <Text color="#0C0C20" display="inline">
                          We want to overflow in our
                        </Text>{' '}
                        <Text color="#84588F" display="inline">
                          INFLUENCE
                        </Text>{' '}
                        <Text color="#0C0C20" display="inline">
                          with others
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
                      marginBottom="200px"
                    >
                      <Text
                        fontFamily="DMSerifDisplay_Italic, serif"
                        display="inline"
                        fontWeight="400"
                        fontSize="18px"
                        wordBreak="break-word"
                      >
                        <Text color="#0C0C20" display="inline">
                          We want to overflow to
                        </Text>{' '}
                        <Text color="#84588F" display="inline">
                          IMPACT
                        </Text>{' '}
                        <Text color="#0C0C20" display="inline">
                          the Nations
                        </Text>
                      </Text>
                    </Box>
                  </VStack>
                  <IconButton
                    onClick={onExpandClick}
                    icon={isExpanded ? <MdExpandLess /> : <MdExpandMore />}
                    isRound
                    fontSize={'24px'}
                    bg={'rgba(76, 120, 157, 0.2)'}
                    color="#5F5F5F"
                  />
                </VStack>
                {isExpanded && (
                  <Box
                    borderRadius={'10px'}
                    p={'12px 24px'}
                    bg={'#4C789D'}
                    color={'#F6FAFF'}
                    fontFamily="Manrope"
                    fontWeight="400"
                    fontSize="14px"
                  >
                    {OVERFLOW_BLURB}
                  </Box>
                )}
              </VStack>
            </Container>
          </Fade>
        )}
      </InView>
    </>
  );
};
export default VisionMissionSectionMobile;
