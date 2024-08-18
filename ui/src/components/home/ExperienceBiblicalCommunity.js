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
} from '@chakra-ui/react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ExperienceBiblicalCommunity = () => {
  const isDesktop = useBreakpointValue({ base: false, md: true });
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
      maxW="container.lg"
      py={10}
      bgImage={`url('${process.env.PUBLIC_URL}/images/home/hk-green.png')`}
      bgPos="center right"
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
              bgPos="70% 100%"
              bgSize="70%"
              bgRepeat="no-repeat"
              bgImage={`url('${process.env.PUBLIC_URL}/images/home/vector-green-3.svg')`}
            ></Box>
            <Heading
              color="#0C0C20"
              fontFamily="'DM Serif Display', serif"
              fontStyle="italic"
              fontWeight="400"
              lineHeight="1"
              wordBreak="break-word"
              fontSize="36px"
            >
              Experience <br />
              Biblical Community
            </Heading>
          </Box>
        </Box>
        <Box my={8} w={'100vw'} h={['30vw', '']}>
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
                fontFamily="'DM Serif Display', serif"
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
                fontFamily="'DM Serif Display', serif"
                fontStyle="italic"
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
                    fontFamily="'Manrope', sans-serif"
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
              fontSize="14px"
              fontFamily="'Manrope', sans-serif"
              fontWeight="400"
              wordBreak="break-word"
            >
              There is no better way to get a taste of who we are and what we
              believe in then to check out one of our LIFE Groups. This is an
              opportunity to experience the life-changing power of Biblical
              community with Love, Investment, Faith, and Enjoyment.
            </Text>
          </Box>
        </VStack>
      </VStack>
    </Container>
  );
};

export default ExperienceBiblicalCommunity;
