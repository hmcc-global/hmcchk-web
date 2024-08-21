import {
  Box,
  Container,
  Flex,
  HStack,
  Text,
  VStack,
  Heading,
  Link,
  Button,
  Spacer,
  Image,
  LinkOverlay,
  useMediaQuery,
} from '@chakra-ui/react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ExperienceBiblicalCommunity = () => {
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const settings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
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
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <Container
      maxW="container.xl"
      py={8}
      bgImage={`url('${process.env.PUBLIC_URL}/images/home/vector-life.svg')`}
      bgPos="right top"
      bgSize="contain"
      bgRepeat="no-repeat"
    >
      <VStack>
        <Box w="100%" alignItems="flex-start" py="1em">
          <Box position="relative">
            <Box
              w="100%"
              position="absolute"
              h="122%"
              bgPos="21% 95%"
              bgSize="20%"
              bgRepeat="no-repeat"
              bgImage={`url('${process.env.PUBLIC_URL}/images/home/vector-orange-1.svg')`}
            ></Box>
            <Heading
              color="#0C0C20"
              fontFamily="DMSerifDisplay_Italic"
              fontWeight="400"
              lineHeight="1"
              wordBreak="break-word"
              fontSize="60"
            >
              Experience <br />
              Biblical Community
            </Heading>
          </Box>
        </Box>
        <Box my={4} w={['100%', '99vw']} h={['30vw', '40vh']} overflow="hidden">
          <Slider {...settings}>
            <Image
              src={process.env.PUBLIC_URL + '/images/home/community-1.png'}
              alt="Image 1"
              borderRadius="md"
              px={['0.5em', '2em']}
            />

            <Image
              src={process.env.PUBLIC_URL + '/images/home/community-2.png'}
              alt="Image 2"
              borderRadius="md"
              px={['0.5em', '2em']}
            />

            <Image
              src={process.env.PUBLIC_URL + '/images/home/community-3.png'}
              alt="Image 3"
              borderRadius="md"
              px={['0.5em', '2em']}
            />

            <Image
              src={process.env.PUBLIC_URL + '/images/home/community-1.png'}
              alt="Image 4"
              borderRadius="md"
              px={['0.5em', '2em']}
            />

            <Image
              src={process.env.PUBLIC_URL + '/images/home/community-5.png'}
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
                  There is no better way to get a taste of who we are and what
                  we believe in then to check out one of our LIFE Groups. This
                  is an opportunity to experience the life-changing power of
                  Biblical community with Love, Investment, Faith, and
                  Enjoyment.
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
                  New here and don’t know where to begin? Let us know your
                  contact & we can connect you to our church community!
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
                <Button
                  pt={6}
                  pb={6}
                  pl={10.5}
                  pr={7}
                  borderRadius={80}
                  border="0.70px solid #D46764"
                  justify="space-between"
                  align="center"
                >
                  <Flex w="100%">
                    <Box px="1em">
                      <Text
                        color="#D46764"
                        fontSize="20px"
                        fontFamily="Manrope"
                        fontWeight="700"
                        wordBreak="break-word"
                      >
                        Sign up now
                      </Text>
                    </Box>
                    <Spacer />
                    <ArrowForwardIcon color="#D46764" my="auto" />
                  </Flex>
                </Button>
              </Flex>
              <Box>
                <Text
                  color="#0B0F19"
                  fontSize="20"
                  fontFamily="Manrope"
                  fontWeight="400"
                  wordBreak="break-word"
                >
                  There is no better way to get a taste of who we are and what
                  we believe in then to check out one of our LIFE Groups. This
                  is an opportunity to experience the life-changing power of
                  Biblical community with Love, Investment, Faith, and
                  Enjoyment.
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
                >
                  <Flex w="100%">
                    <Box px="1em">
                      <Text
                        color="#D46764"
                        fontSize="20px"
                        fontFamily="Manrope"
                        fontWeight="700"
                        wordBreak="break-word"
                      >
                        Get in touch
                      </Text>
                    </Box>
                    <Spacer />
                    <ArrowForwardIcon color="#D46764" my="auto" />
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
                  New here and don’t know where to begin? Let us know your
                  contact & we can connect you to our church community!
                </Text>
              </Box>
            </VStack>
          </VStack>
        )}
      </VStack>
    </Container>
  );
};

export default ExperienceBiblicalCommunity;
