import {
  Box,
  Container,
  VStack,
  Text,
  Button,
  HStack,
  Image,
} from '@chakra-ui/react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const DiscoverPage = () => {
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

  const content = {
    visit: {
      title: 'Plan a Visit',
      image: '/images/location.svg',
      description:
        "Sunday Celebration is HMCC's weekend gathering where everyone in the church comes together to receive God's message, worship in community and enjoy fellowship. Everybody's welcome!",
      link: '',
      button_color: '#EDB115',
    },
    lifeGroup: {
      title: 'Join a \n LIFE Group',
      image: '/images/people-community.svg',
      description:
        'There is no better way to get a taste of who we are and what we believe in then to check out one of our LIFE Groups. This is an opportunity to experience the life-changing power of Biblical community with Love, Investment, Faith, and Enjoyment.',
      link: '',
      button_color: '#D46764',
    },
    ministry: {
      title: 'Connect with Our Ministries',
      image: '/images/compass-discover-line.svg',
      description:
        'At Harvest Mission Community Church, we are actively reaching out to people from all walks of life, specifically youths, college students, working adults, and families.',
      link: '',
      button_color: '#21A0A7',
    },
  };

  const ContentBox = (content) => {
    return (
      <VStack
        alignItems="start"
        justifyContent="space-between"
        h="90%"
        px="4"
        my="3"
      >
        <HStack justifyContent="space-between" w="100%">
          <Text
            fontFamily="DMSerifDisplay_Italic"
            fontSize="2.625rem"
            fontWeight="400"
            whiteSpace="pre-line"
            lineHeight="94%"
            letterSpacing="-2px"
          >
            {content.title}
          </Text>
          <Image src={process.env.PUBLIC_URL + content.image} />
        </HStack>
        <Text fontFamily="Manrope" fontSize="1.125rem" fontWeight="400">
          {content.description}
        </Text>
        <Button
          fontFamily="Manrope"
          fontSize="1rem"
          borderRadius="0.938rem"
          backgroundColor={content.button_color}
          textColor="#F6FAFF"
          letterSpacing="0.25rem"
          border="1px solid #0C0C20;"
          mx="4"
          marginY="6"
          fontWeight="700"
        >
          LEARN MORE
        </Button>
      </VStack>
    );
  };

  return (
    <Box>
      <Container
        maxW="100%"
        paddingTop={5}
        paddingBottom={10}
        px={0}
        fontFamily="DMSerifDisplay_Italic"
      >
        <VStack alignItems="start" gap={0}>
          <Box px="6rem" mb="5">
            <Text fontWeight="400" fontSize="3.75rem">
              Discover HMCC of Hong Kong
            </Text>
            <Text fontFamily="Manrope" fontWeight="700" fontSize="1.125rem">
              New here or just wanting to discover
            </Text>
          </Box>
          <Box my={4} w="100vw" minH={['13em', '40vh']} overflow="hidden">
            <Slider {...settings}>
              <Box px={['0.5rem', '0.5rem']}>
                <Box
                  bgImage={`url('${process.env.PUBLIC_URL}/images/home/community-1.png')`}
                  borderRadius="md"
                  bgSize="cover"
                  h={['11em', '15rem']}
                  bgPosition="center"
                ></Box>
              </Box>

              <Box px={['0.5rem', '0.5rem']}>
                <Box
                  bgImage={`url('${process.env.PUBLIC_URL}/images/home/community-2.png')`}
                  borderRadius="md"
                  bgSize="cover"
                  h={['11em', '15rem']}
                  bgPosition="center"
                ></Box>
              </Box>

              <Box px={['0.5rem', '0.5rem']}>
                <Box
                  bgImage={`url('${process.env.PUBLIC_URL}/images/home/community-3.png')`}
                  borderRadius="md"
                  bgSize="cover"
                  h={['11em', '15rem']}
                  bgPosition="center"
                ></Box>
              </Box>

              <Box px={['0.5rem', '0.5rem']}>
                <Box
                  bgImage={`url('${process.env.PUBLIC_URL}/images/home/community-4.png')`}
                  borderRadius="md"
                  bgSize="cover"
                  h={['11em', '15rem']}
                  bgPosition="center"
                ></Box>
              </Box>
              <Box px={['0.5rem', '0.5rem']}>
                <Box
                  bgImage={`url('${process.env.PUBLIC_URL}/images/home/community-5.png')`}
                  borderRadius="md"
                  bgSize="cover"
                  h={['11em', '15rem']}
                  bgPosition="center"
                ></Box>
              </Box>
              <Box px={['0.5rem', '0.5rem']}>
                <Box
                  bgImage={`url('${process.env.PUBLIC_URL}/images/home/community-6.png')`}
                  borderRadius="md"
                  bgSize="cover"
                  h={['11em', '15rem']}
                  px="1em"
                  bgPosition="center"
                ></Box>
              </Box>
              <Box px={['0.5rem', '0.5rem']}>
                <Box
                  bgImage={`url('${process.env.PUBLIC_URL}/images/home/community-7.png')`}
                  borderRadius="md"
                  bgSize="cover"
                  h={['11em', '15rem']}
                  bgPosition="center"
                ></Box>
              </Box>
            </Slider>
          </Box>
          <VStack w="100%" px="6rem">
            <HStack w="100%" h="21.5rem" justifyContent="space-between">
              <Box
                w="50%"
                borderRadius="0.875rem"
                border="0.5px solid var(--Blue-Primary, #4A6EEB);"
                p="3"
                h="100%"
              >
                {ContentBox(content.visit)}
              </Box>
              <Box
                w="50%"
                borderRadius="0.875rem"
                border="0.5px solid var(--Blue-Primary, #4A6EEB);"
                p="3"
                h="100%"
              >
                {ContentBox(content.lifeGroup)}
              </Box>
            </HStack>
            <Box
              w="100%"
              borderRadius="0.875rem"
              border="0.5px solid var(--Blue-Primary, #4A6EEB);"
              p="3"
              h="15rem"
            >
              {ContentBox(content.ministry)}
            </Box>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
};

export default DiscoverPage;
