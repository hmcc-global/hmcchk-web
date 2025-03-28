import { Box, Container, VStack, Text } from '@chakra-ui/react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ArrowForwardIcon } from '@chakra-ui/icons';
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

  return (
    <Box>
      <Container maxW="100%" py={10} px={0} fontFamily="DMSerifDisplay_Italic">
        <VStack alignItems="start" gap={0}>
          <Box px="7rem">
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
        </VStack>
      </Container>
    </Box>
  );
};

export default DiscoverPage;
