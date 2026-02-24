import { Flex, Box, Container, Image, Text, VStack } from '@chakra-ui/react';
import Slider from 'react-slick';

import { typography } from './typography';

const { fontSizes, fontFamilies } = typography;

const bgImage = {
  base: process.env.PUBLIC_URL + '/images/shine/hero-mobile.png',
  lg: process.env.PUBLIC_URL + '/images/shine/hero-desktop.png',
};

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

const blurb = {
  description:
    'You are the light of the world. A city set on a hill cannot be hidden. Nor do people light a lamp and put it under a basket, but on a stand, and it gives light to all in the house.',
  subDescription: 'Matthew 5:14-15',
};

const HeroSection = () => {
  return (
    <Box
      position="relative"
      width="100vw"
      height={{ base: '90vh', md: '110vh', lg: '100vh' }}
      bgColor="#000"
      overflow="hidden"
    >
      <Box
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height={{ base: '90%', md: '100%', lg: '90%' }}
        backgroundImage={bgImage}
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        zIndex="0"
      />

      <Flex
        width="100%"
        height="10%"
        zIndex="1"
        background="linear-gradient(180deg, rgba(105, 105, 105, 0.00) 0%, rgba(105, 105, 105, 0.30) 30.77%, rgba(187, 187, 187, 0.60) 62.98%, #F6FAFF 100%)"
        position="absolute"
        bottom="0"
        left="0"
      />
      <Container
        display="flex"
        height="100%"
        position="relative"
        maxW="container.xl"
        alignItems="center"
        justifyContent="center"
        zIndex="2"
      >
        {/* Start of Desktop */}
        <Flex
          width="100%"
          height="100%"
          display={{ base: 'none', lg: 'flex' }}
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          fontFamily={fontFamilies.primary}
        >
          <Box
            flex="1"
            display="flex"
            alignItems="center"
            justifyContent={{ base: 'center', '2xl': 'flex-start' }}
            minWidth={{ lg: '50%' }}
            height="100%"
          >
            <Image
              src={process.env.PUBLIC_URL + '/images/shine/shine-logo.png'}
              alt="Logo"
              width={{ base: '30%', lg: '55%', '2xl': '63%' }}
              mb="10em"
              objectFit="contain"
            />
          </Box>

          <Box flex="1" minWidth={{ lg: '50%' }}>
            <VStack
              spacing="24px"
              alignItems="flex-start"
              justifyContent="center"
              height="100%"
              gap={{ base: '0.5em', lg: '1em', '2xl': '2em' }}
            >
              <Text
                fontSize={{ base: 'md', lg: fontSizes.normal }}
                fontWeight="bold"
                color="white"
                textShadow="-3px 0 10px #FFF"
              >
                Harvest Mission Community Church's SHINE Ministry
              </Text>

              <Text
                fontSize={fontSizes.normal}
                color="white"
                lineHeight="1.6"
                maxWidth="90%"
                textShadow="-3px 0 10px #FFF"
              >
                {blurb.description}
                <br />
                <span style={{ fontWeight: '800' }}>
                  {blurb.subDescription}
                </span>
              </Text>

              <Box
                width="100%"
                mt={{ base: '10px', lg: '20px' }}
                position="relative"
              >
                <Box
                  width="100%"
                  height={{ base: '180px', md: '250px', lg: '300px' }}
                  overflow="hidden"
                  position="relative"
                >
                  <Slider {...settings}>
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <Box key={num} px={{ base: '5px', md: '10px' }}>
                        <Box
                          bgImage={
                            process.env.PUBLIC_URL +
                            `/images/shine/hero-${num}.jpg`
                          }
                          borderRadius="2xl"
                          bgSize="cover"
                          bgPosition="center"
                          height="8em"
                          transition="transform 0.3s ease"
                          _hover={{ transform: 'scale(1.02)' }}
                        />
                      </Box>
                    ))}
                  </Slider>
                </Box>
              </Box>
            </VStack>
          </Box>
        </Flex>
        {/* End of Desktop */}

        {/* Start of Mobile */}
        <Flex
          width="100%"
          height="100%"
          display={{ base: 'flex', lg: 'none' }}
          flexDirection="column"
          alignItems="center"
          justifyContent="flex-start"
          fontFamily={fontFamilies.primary}
          py="2em"
          gap="1em"
        >
          <Box display="flex" alignItems="baseline" justifyContent="center">
            <Text
              fontSize={{
                base: fontSizes.base,
                md: fontSizes.md,
              }}
              fontWeight="bold"
              color="var(--Grays-White, #FFF)"
              textAlign="center"
              textShadow="-3px 0 10px #FFF"
              lineHeight="1.4"
            >
              Harvest Mission Community Church's
              <br />
              SHINE Ministry
            </Text>
          </Box>

          {/* Logo */}
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            width="100%"
          >
            <Image
              src={process.env.PUBLIC_URL + '/images/shine/shine-logo.png'}
              alt="SHINE Ministry Logo"
              width={{ base: '40%', md: '35%' }}
              objectFit="contain"
            />
          </Box>

          <Box
            display="flex"
            alignItems="flex-start"
            justifyContent="center"
            width="100%"
          >
            <Text
              fontSize={{
                base: fontSizes.base,
                md: fontSizes.md,
              }}
              color="var(--Grays-White, #FFF)"
              lineHeight="1.6"
              maxWidth="90%"
              textAlign="center"
              textShadow="-3px 0 10px #FFF"
            >
              {blurb.description}
              <br />
              {blurb.subDescription}
            </Text>
          </Box>
          <Box width="100%" position="relative" marginTop="5">
            <Box
              width="100%"
              height={{ base: '180px', md: '250px', lg: '300px' }}
              overflow="hidden"
              position="relative"
            >
              <Slider {...settings}>
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <Box key={num} px={{ base: '5px', md: '10px' }}>
                    <Box
                      bgImage={
                        process.env.PUBLIC_URL + `/images/shine/hero-${num}.jpg`
                      }
                      borderRadius="2xl"
                      bgSize="cover"
                      bgPosition="center"
                      height="8em"
                      transition="transform 0.3s ease"
                      _hover={{ transform: 'scale(1.02)' }}
                    />
                  </Box>
                ))}
              </Slider>
            </Box>
          </Box>
        </Flex>
        {/* End of Mobile */}
      </Container>
    </Box>
  );
};

export default HeroSection;
