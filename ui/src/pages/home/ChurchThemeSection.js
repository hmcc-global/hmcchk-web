import {
  Box,
  Flex,
  Heading,
  VStack,
  Text,
  Image,
  Fade,
  Container,
  HStack,
  IconButton,
} from '@chakra-ui/react';
import { InView } from 'react-intersection-observer';
import { MdExpandLess, MdExpandMore } from 'react-icons/md';
import { useState } from 'react';

const OVERFLOW_BLURB =
  'The theme for 2025-2026 is "Overflow," calling us to boldly trust in God\'s promise that as our intimacy with Him deepens, His Kingdom blessings will fill us to the point of overflowing. This overflow will first be visible in our relationships and influence with others as we live out a transformed life. This  abundance will then propel our 10-year commitment to plant churches, reproduce disciples, and extend our impact into new campuses and cities. We believe this season of overflow will empower us to transform the next generation among the nations for the glory of God\'s Kingdom.';

const ChurchThemeSection = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const onExpandClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <InView rootMargin="-50px" triggerOnce={true}>
      {({ inView, ref }) => (
        <Fade transition={{ enter: { duration: 1 } }} in={inView}>
          <Container maxW="container.xl" py={10} ref={ref}>
            <VStack>
              <Box w="100%" alignItems="flex-start" paddingBottom={'1em'}>
                <Box w="100%" position="relative">
                  <Box
                    w="100%"
                    position="absolute"
                    h="120%"
                    bgPos={{ md: '85% 100%', xl: '67% 100%' }}
                    bgSize="13%"
                    bgRepeat="no-repeat"
                    bgImage={`url('${process.env.PUBLIC_URL}/images/home/church-theme-overflow-vector-underline.svg')`}
                  ></Box>
                  <Heading
                    color="#0C0C20"
                    fontFamily="DMSerifDisplay_Italic, serif"
                    fontSize={['2rem', '2rem', '3rem', '3.75rem']}
                    fontWeight="400"
                    lineHeight="1"
                  >
                    Our 2025-26 Church Theme: Overflow
                  </Heading>
                </Box>
              </Box>
              <Flex
                minH="12em"
                flexDir={'column'}
                alignItems={'center'}
                gap={'1rem'}
              >
                <VStack
                  w="100%"
                  borderRadius="0.5rem"
                  border="1px solid"
                  borderColor="#E7F4FF"
                  p="1.5em"
                  bgColor="#E7F4FF"
                  gap={'16px'}
                >
                  <HStack>
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
                            As we recognize how God has poured and continues to
                            pour His grace into our lives, we are called to let
                            it overflow, transforming the world around us.
                          </Text>
                          <br></br>
                          <Text
                            color="#0C0C20"
                            fontSize="18px"
                            px="0.5em"
                            fontFamily="Manrope"
                            fontWeight="400"
                          >
                            The 3 specific areas for us to overflow from:
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
                    <Box>
                      <Image
                        width="38rem"
                        borderRadius={'10px'}
                        src={
                          process.env.PUBLIC_URL +
                          'images/home/church-theme-overflow-2526.jpg'
                        }
                      />
                    </Box>
                  </HStack>
                  <IconButton
                    onClick={onExpandClick}
                    icon={isExpanded ? <MdExpandLess /> : <MdExpandMore />}
                    isRound
                    fontSize={'28px'}
                    bg={'rgba(76, 120, 157, 0.2)'}
                    color="#5F5F5F"
                  />
                </VStack>
                {isExpanded && (
                  <Box
                    borderRadius={'10px'}
                    p={'16px 32px'}
                    bg={'#4C789D'}
                    color={'#F6FAFF'}
                    fontFamily="Manrope"
                    fontWeight="400"
                    fontSize="18px"
                    textAlign={'justify'}
                  >
                    {OVERFLOW_BLURB}
                  </Box>
                )}
              </Flex>
            </VStack>
          </Container>
        </Fade>
      )}
    </InView>
  );
};

export default ChurchThemeSection;
