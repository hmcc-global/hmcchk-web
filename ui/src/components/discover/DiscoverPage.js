import {
  Box,
  Container,
  VStack,
  Text,
  Button,
  HStack,
  Image,
  Link,
} from '@chakra-ui/react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link as ReactLink } from 'react-router-dom';

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
      link: '/discover/visit-us-page',
      button_color: '#EDB115',
      hover_color: '#BE8E11',
    },
    lifeGroup: {
      title: 'Join a \n LIFE Group',
      image: '/images/people-community.svg',
      description:
        'There is no better way to get a taste of who we are and what we believe in then to check out one of our LIFE Groups. This is an opportunity to experience the life-changing power of Biblical community with Love, Investment, Faith, and Enjoyment.',
      link: '/discover/life-group',
      button_color: '#D46764',
      hover_color: '#AA5250',
    },
    ministry: {
      title: 'Connect with Our Ministries',
      image: '/images/compass-discover-line.svg',
      description:
        'At Harvest Mission Community Church, we are actively reaching out to people from all walks of life, specifically youths, college students, working adults, and families.',
      link: '/discover/connect-ministries',
      button_color: '#21A0A7',
      hover_color: '#477A7E',
    },
  };

  const ContentBox = (content) => {
    return (
      <VStack
        alignItems="start"
        justifyContent="space-between"
        h="90%"
        m={{ base: '1', md: '3' }}
        gap={{ base: '3', md: 'none' }}
      >
        <HStack justifyContent="space-between" w="100%">
          <Text
            fontFamily="DMSerifDisplay_Italic"
            fontSize={{ base: '1.5rem', md: '2.625rem' }}
            fontWeight="400"
            whiteSpace={{ base: 'none', md: 'pre-line' }}
            lineHeight="94%"
            letterSpacing={{ base: '0', md: '-2px' }}
          >
            {content.title}
          </Text>
          <Image src={process.env.PUBLIC_URL + content.image} />
        </HStack>
        <Text
          fontFamily="Manrope"
          fontSize={{ base: '0.875rem', md: '1.125rem' }}
          fontWeight="400"
        >
          {content.description}
        </Text>
        <Link href={content.link}>
          <Button
            fontFamily="Manrope"
            fontSize="0.9rem"
            borderRadius="0.938rem"
            backgroundColor={content.button_color}
            textColor="#F6FAFF"
            letterSpacing="0.25rem"
            border="1px solid #0C0C20;"
            px={{ base: '1.2rem', md: '2rem' }}
            py={{ base: '1rem', md: '1.4rem' }}
            fontWeight="700"
            _hover={{ backgroundColor: content.hover_color }}
          >
            LEARN MORE
          </Button>
        </Link>
      </VStack>
    );
  };

  return (
    <Box bgColor="#F6FAFF">
      <Container
        maxW="container.xl"
        paddingTop={5}
        paddingBottom={{ base: '4rem', lg: '5rem' }}
        fontFamily="DMSerifDisplay_Italic"
      >
        <Box
          max-width="100%"
          display="flex"
          flexDir={'column'}
          alignItems={'center'}
          gap={{ base: '1.75rem', md: '2.5rem', lg: '4rem' }}
        >
          <VStack
            maxWidth={{ base: '95%', lg: '100%' }}
            spacing={{ base: '1rem', lg: '1.5rem' }}
          >
            <Box mb="5" alignSelf="flex-start">
              <Text
                fontWeight="400"
                fontSize={{ base: '2.25rem', md: '3.75rem' }}
              >
                Discover HMCC of Hong Kong
              </Text>
              <Text
                fontFamily="Manrope"
                fontWeight="700"
                fontSize={{ base: '0.875rem', md: '1.125rem' }}
              >
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
            <VStack w="100%" gap={{ base: '3', md: 'none' }}>
              <HStack
                w="100%"
                alignItems="stretch"
                display={{ base: 'none', md: 'flex' }}
                justifyContent="space-between"
              >
                <Box
                  w="50%"
                  borderRadius="0.875rem"
                  border="0.5px solid var(--Blue-Primary, #4A6EEB);"
                  p="3"
                >
                  {ContentBox(content.visit)}
                </Box>
                <Box
                  w="50%"
                  borderRadius="0.875rem"
                  border="0.5px solid var(--Blue-Primary, #4A6EEB);"
                  p="3"
                >
                  {ContentBox(content.lifeGroup)}
                </Box>
              </HStack>
              <Box
                display={{ base: 'flex', md: 'none' }}
                w="100%"
                borderRadius="0.875rem"
                border="0.5px solid var(--Blue-Primary, #4A6EEB);"
                p="3"
                h="max-content"
              >
                {ContentBox(content.visit)}
              </Box>
              <Box
                display={{ base: 'flex', md: 'none' }}
                w="100%"
                borderRadius="0.875rem"
                border="0.5px solid var(--Blue-Primary, #4A6EEB);"
                p="3"
                h="max-content"
              >
                {ContentBox(content.lifeGroup)}
              </Box>
              <Box
                w="100%"
                borderRadius="0.875rem"
                border="0.5px solid var(--Blue-Primary, #4A6EEB);"
                p="3"
                h={{ base: 'max-content', md: '15rem' }}
              >
                {ContentBox(content.ministry)}
              </Box>
            </VStack>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
};

export default DiscoverPage;
