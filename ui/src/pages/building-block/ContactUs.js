import {
  Box,
  Flex,
  HStack,
  Text,
  VStack,
  Heading,
  Button,
  Spacer,
  useMediaQuery,
  Image,
} from '@chakra-ui/react';
import { forwardRef } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ContactForm from './ContactForm';
import { useState } from 'react';
import { InView } from 'react-intersection-observer';

const ContactUs = forwardRef((props, ref) => {
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);

  return (
    <Box ref={ref}>
      <InView rootMargin="-50px" triggerOnce={true}>
        {({ inView, ref: inViewRef }) => (
          <Box
            ref={inViewRef}
            w="100%"
            opacity={inView ? 1 : 0}
            transform={inView ? 'none' : 'translateY(20px)'}
            transition="opacity 1s ease, transform 1s ease"
          >
            {isMobile ? (
              <VStack spacing={5}>
                <Flex w="100%">
                  <Heading
                    as="h1"
                    fontSize={{ base: '2rem', md: '2.25rem', lg: '2.625rem' }}
                    fontWeight={400}
                    textAlign="center"
                    fontFamily="DMSerifDisplay_Italic"
                    letterSpacing={{ base: '-0.0625rem', lg: '-0.125rem' }}
                  >
                    Contact Us
                  </Heading>
                </Flex>
                <Box>
                  <Text
                    color="#0C0C20"
                    fontSize={{
                      base: '0.875rem',
                      md: '0.9rem',
                      lg: '1.25rem',
                    }}
                    fontFamily="Manrope"
                    fontWeight={400}
                  >
                    Feel free to drop us any questions and inquiries regarding
                    Building Blocks or reach out to the Building Blocks
                    coordinators. 
                  </Text>
                </Box>
                <Box position="relative" width="100%" pb="100%">
                  <Image
                    src={`${process.env.PUBLIC_URL}/images/buildingblock/ContactUsPic_mobile.jpg`}
                    alt="BB"
                    position="absolute"
                    top="0"
                    left="0"
                    width="100%"
                    height="100%"
                    objectFit="cover"
                    borderRadius={'80px'}
                  />
                </Box>
                <Button
                  w="100%"
                  pl={10.5}
                  pr={7}
                  borderRadius={80}
                  border="0.70px solid #D46764"
                  justify="space-between"
                  align="center"
                  bgColor="#D46764"
                  color="white"
                  onClick={onOpen}
                  _active={{
                    bg: '#D46764',
                    color: 'white',
                  }}
                >
                  <Flex w="40%">
                    <ContactForm isOpen={isOpen} onClose={onClose} />
                    <Box px="1rem">
                      <Text
                        fontSize="14"
                        fontFamily="Manrope"
                        fontWeight="700"
                        wordBreak="break-word"
                      >
                        Get in touch
                      </Text>
                    </Box>
                    <Spacer />
                    <ArrowForwardIcon color="white" my="auto" />
                  </Flex>
                </Button>
              </VStack>
            ) : (
              <VStack w="100%" align="center" spacing={7}>
                <HStack align={'stretch'} spacing={0} width={'100%'}>
                  <Box
                    flex="7" // 70% of available space
                    display="flex"
                    alignItems="center"
                    flexDirection="column"
                    justifyContent="center"
                  >
                    <VStack
                      align="flex-start"
                      w="100%"
                      textAlign="left"
                      spacing={6}
                    >
                      <Heading
                        as="h1"
                        fontSize={{
                          base: '2rem',
                          md: '2.25rem',
                          lg: '2.625rem',
                        }}
                        fontWeight={'3rem'}
                        fontFamily="DMSerifDisplay_Italic"
                        letterSpacing={'-0.1rem'}
                      >
                        Contact Us
                      </Heading>
                      <Text
                        color="#0C0C20"
                        fontSize={['0.875rem', '0.9rem', '1.25rem']}
                        fontFamily="Manrope"
                        fontWeight={400}
                      >
                        Feel free to drop us any questions and inquiries
                        regarding Building Blocks or reach out to the Building
                        Blocks coordinators.
                      </Text>
                    </VStack>
                  </Box>
                  <Spacer />
                  <Box flex="3" display="flex" justifyContent="flex-end">
                    <Button
                      pt={6}
                      pb={6}
                      pl={10.5}
                      pr={7}
                      borderRadius={80}
                      border="0.70px solid #D46764"
                      bgColor="transparent"
                      color="#D46764"
                      onClick={onOpen}
                      _hover={{
                        bg: '#D46764',
                        color: 'white',
                      }}
                    >
                      <Flex align="center">
                        <ContactForm isOpen={isOpen} onClose={onClose} />
                        <Box px="1em">
                          <Text
                            fontSize="20px"
                            fontFamily="Manrope"
                            fontWeight="700"
                            wordBreak="break-word"
                          >
                            Get in touch
                          </Text>
                        </Box>
                        <ArrowForwardIcon />
                      </Flex>
                    </Button>
                  </Box>
                </HStack>

                <Spacer />

                <Box
                  w="70%"
                  position="relative"
                  overflow="hidden"
                  borderRadius="80px"
                >
                  <Image
                    src={`${process.env.PUBLIC_URL}/images/buildingblock/ContactUsPic.jpg`}
                    alt="BB"
                    width="100%"
                    height="100%"
                    objectFit="cover"
                  />
                </Box>
              </VStack>
            )}
          </Box>
        )}
      </InView>
    </Box>
  );
});

export default ContactUs;
