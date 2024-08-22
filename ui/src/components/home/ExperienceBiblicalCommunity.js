import {
  Box,
  Container,
  Flex,
  HStack,
  Text,
  VStack,
  Heading,
  Button,
  Fade,
  Spacer,
  Image,
  useMediaQuery,
  Link,
} from '@chakra-ui/react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import NewHereForm from './NewHereForm';
import { useState } from 'react';
import { InView } from 'react-intersection-observer';

const ExperienceBiblicalCommunity = () => {
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);
  const settings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 1500,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <InView rootMargin="-200px" triggerOnce={true}>
      {({ inView, ref }) => (
        <Fade transition={{ enter: { duration: 1 } }} in={inView}>
          <Box
            ref={ref}
            bgSize="contain"
            bgPos="10% 10%"
            bgRepeat="no-repeat"
            bgImage={
              isMobile
                ? ' '
                : `url('${process.env.PUBLIC_URL}/images/home/life-bg.png')`
            }
            w="100%"
          >
            <Container maxW="container.xl" py={8}>
              <VStack>
                <Box w="100%" alignItems="flex-start" py="1em">
                  <Box position="relative">
                    <Box
                      w="100%"
                      position="absolute"
                      h="122%"
                      bgPos={['60% 95%', '21% 95%']}
                      bgSize={['40%', '20%']}
                      bgRepeat="no-repeat"
                      bgImage={`url('${process.env.PUBLIC_URL}/images/home/vector-orange-1.svg')`}
                    ></Box>
                    <Heading
                      color="#0C0C20"
                      fontFamily="DMSerifDisplay_Italic"
                      fontWeight="400"
                      lineHeight="1"
                      wordBreak="break-word"
                      fontSize={['36', '60']}
                    >
                      Experience <br />
                      Biblical Community
                    </Heading>
                  </Box>
                </Box>
                <Box my={4} w="99vw" h={['13em', '40vh']} overflow="hidden">
                  <Slider {...settings}>
                    <Image
                      src={
                        process.env.PUBLIC_URL + '/images/home/community-1.png'
                      }
                      alt="Image 1"
                      borderRadius="md"
                      px={['0.5em', '2em']}
                    />

                    <Image
                      src={
                        process.env.PUBLIC_URL + '/images/home/community-2.png'
                      }
                      alt="Image 2"
                      borderRadius="md"
                      px={['0.5em', '2em']}
                    />

                    <Image
                      src={
                        process.env.PUBLIC_URL + '/images/home/community-3.png'
                      }
                      alt="Image 3"
                      borderRadius="md"
                      px={['0.5em', '2em']}
                    />

                    <Image
                      src={
                        process.env.PUBLIC_URL + '/images/home/community-1.png'
                      }
                      alt="Image 4"
                      borderRadius="md"
                      px={['0.5em', '2em']}
                    />

                    <Image
                      src={
                        process.env.PUBLIC_URL + '/images/home/community-5.png'
                      }
                      alt="Image 5"
                      borderRadius="md"
                      px={['0.5em', '2em']}
                    />
                  </Slider>
                </Box>
                {isMobile ? (
                  <VStack>
                    <VStack w="100%">
                      <Flex w="100%">
                        <HStack py="1em">
                          <Box
                            w="1.2em"
                            h="1.2em"
                            borderRadius="full"
                            bg="black"
                            display="flex"
                            justifyContent="center"
                            fontFamily="DMSerifDisplay_Regular"
                            fontWeight="400"
                            alignItems="center"
                            color="white"
                            fontSize="42"
                          >
                            1
                          </Box>
                          <Text
                            color="black"
                            fontSize="32"
                            px="0.5em"
                            fontFamily="DMSerifDisplay_Italic"
                            fontWeight="400"
                            lineHeight="39.48px"
                            wordBreak="break-word"
                          >
                            Join a LIFE Group
                          </Text>
                        </HStack>
                      </Flex>
                      <Box>
                        <Text
                          color="#0B0F19"
                          fontSize="14"
                          fontFamily="Manrope"
                          fontWeight="400"
                          wordBreak="break-word"
                        >
                          There is no better way to get a taste of who we are
                          and what we believe in then to check out one of our
                          LIFE Groups. This is an opportunity to experience the
                          life-changing power of Biblical community with Love,
                          Investment, Faith, and Enjoyment.
                        </Text>
                      </Box>
                      <Link
                        href="https://hongkong.hmcc.net/forms/669bcf723858791ed22578ea"
                        w="100%"
                      >
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
                          _active={{
                            bg: '#D46764',
                            color: 'white',
                          }}
                        >
                          <Flex w="40%">
                            <Box px="1em">
                              <Text
                                color="white"
                                fontSize="14"
                                fontFamily="Manrope"
                                fontWeight="700"
                                wordBreak="break-word"
                              >
                                Sign up now
                              </Text>
                            </Box>
                            <Spacer />
                            <ArrowForwardIcon color="white" my="auto" />
                          </Flex>
                        </Button>
                      </Link>
                    </VStack>
                    <VStack w="100%">
                      <Flex w="100%">
                        <HStack py="1em">
                          <Box
                            w="1.2em"
                            h="1.2em"
                            borderRadius="full"
                            bg="black"
                            display="flex"
                            justifyContent="center"
                            fontFamily="DMSerifDisplay_Regular"
                            fontWeight="400"
                            alignItems="center"
                            color="white"
                            fontSize="42"
                          >
                            2
                          </Box>
                          <Text
                            color="black"
                            fontSize="32"
                            fontFamily="DMSerifDisplay_Italic"
                            fontWeight="400"
                            lineHeight="39.48px"
                            px="0.5em"
                            wordBreak="break-word"
                          >
                            Connect with Us
                          </Text>
                        </HStack>
                      </Flex>
                      <Box>
                        <Text
                          color="#0B0F19"
                          fontSize="14"
                          fontFamily="Manrope"
                          fontWeight="400"
                          wordBreak="break-word"
                        >
                          New here and don’t know where to begin? Let us know
                          your contact & we can connect you to our church
                          community!
                        </Text>
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
                          <NewHereForm isOpen={isOpen} onClose={onClose} />
                          <Box px="1em">
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
                  </VStack>
                ) : (
                  <VStack>
                    <VStack w="80%" paddingBottom="2em">
                      <Flex w="100%">
                        <HStack>
                          <Box
                            w="2em"
                            h="2em"
                            borderRadius="full"
                            bg="black"
                            display="flex"
                            justifyContent="center"
                            fontFamily="DMSerifDisplay_Regular"
                            fontWeight="400"
                            alignItems="center"
                            color="white"
                            fontSize="24px"
                          >
                            1
                          </Box>
                          <Text
                            color="black"
                            fontSize="42px"
                            fontFamily="DMSerifDisplay_Italic"
                            fontWeight="400"
                            lineHeight="39.48px"
                            wordBreak="break-word"
                          >
                            Join a LIFE Group
                          </Text>
                        </HStack>
                        <Spacer />
                        <Link href="https://hongkong.hmcc.net/forms/669bcf723858791ed22578ea">
                          <Button
                            pt={6}
                            pb={6}
                            pl={10.5}
                            pr={7}
                            borderRadius={80}
                            border="0.70px solid #D46764"
                            justify="space-between"
                            bgColor="transparent"
                            align="center"
                            color="#D46764"
                            _hover={{
                              bg: '#D46764',
                              color: 'white',
                            }}
                          >
                            <Flex w="100%">
                              <Box px="1em">
                                <Text
                                  fontSize="20px"
                                  fontFamily="Manrope"
                                  fontWeight="700"
                                  wordBreak="break-word"
                                >
                                  Sign up now
                                </Text>
                              </Box>
                              <Spacer />
                              <ArrowForwardIcon my="auto" />
                            </Flex>
                          </Button>
                        </Link>
                      </Flex>
                      <Box>
                        <Text
                          color="#0B0F19"
                          fontSize="20"
                          fontFamily="Manrope"
                          fontWeight="400"
                          wordBreak="break-word"
                        >
                          There is no better way to get a taste of who we are
                          and what we believe in then to check out one of our
                          LIFE Groups. This is an opportunity to experience the
                          life-changing power of Biblical community with Love,
                          Investment, Faith, and Enjoyment.
                        </Text>
                      </Box>
                    </VStack>
                    <VStack w="80%">
                      <Flex w="100%">
                        <HStack>
                          <Box
                            w="2em"
                            h="2em"
                            borderRadius="full"
                            bg="black"
                            display="flex"
                            justifyContent="center"
                            fontFamily="DMSerifDisplay_Regular"
                            fontWeight="400"
                            alignItems="center"
                            color="white"
                            fontSize="24px"
                          >
                            2
                          </Box>
                          <Text
                            color="black"
                            fontSize="42px"
                            fontFamily="DMSerifDisplay_Italic"
                            fontWeight="400"
                            lineHeight="39.48px"
                            wordBreak="break-word"
                          >
                            Connect with Us
                          </Text>
                        </HStack>
                        <Spacer />
                        <Button
                          pt={6}
                          pb={6}
                          pl={10.5}
                          pr={7}
                          borderRadius={80}
                          border="0.70px solid #D46764"
                          justify="space-between"
                          align="center"
                          bgColor="transparent"
                          color="#D46764"
                          onClick={onOpen}
                          _hover={{
                            bg: '#D46764',
                            color: 'white',
                          }}
                        >
                          <Flex w="100%">
                            <NewHereForm isOpen={isOpen} onClose={onClose} />
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
                            <Spacer />
                            <ArrowForwardIcon my="auto" />
                          </Flex>
                        </Button>
                      </Flex>
                      <Box w="100%">
                        <Text
                          color="#0B0F19"
                          fontSize="20"
                          fontFamily="Manrope"
                          fontWeight="400"
                          wordBreak="break-word"
                        >
                          New here and don’t know where to begin? Let us know
                          your contact & we can connect you to our church
                          community!
                        </Text>
                      </Box>
                    </VStack>
                  </VStack>
                )}
              </VStack>
            </Container>
          </Box>
        </Fade>
      )}
    </InView>
  );
};

export default ExperienceBiblicalCommunity;
