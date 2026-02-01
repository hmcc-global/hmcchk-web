import React from 'react';
import { Flex, Box, Container, Image, Text, VStack } from '@chakra-ui/react';
import Slider from 'react-slick';

const bgImage = {
    base: process.env.PUBLIC_URL + '/images/shine/hero-mobile.png',
    lg: process.env.PUBLIC_URL + '/images/shine/hero-desktop.png',
};

const settings = {
  infinite: true,
  // autoplay: true,
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
  "description": "Shine Ministry serves the city of Hong Kong...... We partner with Mother’s Choice, Christian Action to help children in loving and following Jesus. ...., community building, and lots of fun!"
};

const HeroSection = () => {
  return (
    <Box position="relative" width="100vw" height="100vh" overflow="hidden">
      <Box
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="90vh"
        backgroundImage={bgImage}
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        zIndex="0"
      />
      
      <Flex
        width="100%"
        height="100%"
        zIndex="1"
        background="linear-gradient(to top, rgb(246,250,255, 1) 10%, rgba(21,11,6,0) 15%)"
        position="absolute"
        top="0"
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
          display={{base: "none", lg: "flex"}}
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          fontFamily="Manrope"
        >
          <Box
            flex="1"
            display="flex"
            alignItems="center"
            justifyContent={{base: "center", "2xl": "flex-start"}}
            minWidth={{ lg: "50%" }}
            height="100%"
          >
            <Image
              src={process.env.PUBLIC_URL + '/images/shine/shine-logo.png'}
              alt="Logo"
              width={{base: "30%", lg: "55%", "2xl": "75%"}}
              mb="10em"
              objectFit="contain"
            />
          </Box>
          
          <Box
            flex="1"
            minWidth={{ lg: "50%" }}
          >
            <VStack
              spacing="24px"
              alignItems="flex-start"
              justifyContent="center"
              height="100%"
              gap={{ base: "0.5em", lg: "1em", "2xl": "2em"}}
            >
              <Text
                fontSize={{ base: "md", lg: "xl", "2xl": "2xl"}}
                fontWeight="bold"
                color="white"
                textShadow="0px 2px 4px rgba(0,0,0,0.3)"
              >
                Harvest Mission Community Church's SHINE Ministry
              </Text>
              
              <Text
                fontSize={{ base: "sm", lg: "md"}}
                color="white"
                lineHeight="1.6"
                maxWidth="90%"
                textShadow="0px 1px 2px rgba(0,0,0,0.3)"
              >
                {blurb.description}
              </Text>

              <Box 
                width="100%" 
                mt={{ base: "10px", lg: "20px" }}
                position="relative"
              >
                <Box 
                  width="100%"
                  height={{ base: "180px", md: "250px", lg: "300px" }}
                  overflow="hidden"
                  position="relative"
                >
                  <Slider {...settings}>
                    {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                      <Box key={num} px={{ base: "5px", md: "10px" }}>
                        <Box
                          // TODO-aparedan: change to releveant SHINE pics
                          bgImage={process.env.PUBLIC_URL + `/images/home/community-${num}.png`}
                          borderRadius="2xl"
                          bgSize="cover"
                          bgPosition="center"
                          height="8em"
                          transition="transform 0.3s ease"
                          _hover={{ transform: "scale(1.02)" }}
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
          display={{base: "flex", lg: "none"}}
          flexDirection="column"
          alignItems="center"
          justifyContent="flex-start"
          fontFamily="Manrope"
          py="2em"
          gap="1em"
        >
          <Box 
            display="flex"
            alignItems="baseline"
            justifyContent="center"
          >
            <Text
              fontSize="md"
              fontWeight="bold"
              color="white"
              textAlign="center"
              textShadow="0px 2px 4px rgba(0,0,0,0.3)"
              lineHeight="1.4"
            >
              Harvest Mission Community Church's<br/>SHINE Ministry
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
              width="40%"
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
              fontSize="0.8em"
              color="white"
              lineHeight="1.6"
              maxWidth="90%"
              textAlign="center"
              textShadow="0px 1px 2px rgba(0,0,0,0.3)"
            >
              {blurb.description}
            </Text>
          </Box>
          <Box 
            width="100%" 
            position="relative"
          >
            <Box 
              width="100%"
              height={{ base: "180px", md: "250px", lg: "300px" }}
              overflow="hidden"
              position="relative"
            >
              <Slider {...settings}>
                {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                  <Box key={num} px={{ base: "5px", md: "10px" }}>
                    <Box
                      // TODO-aparedan: change to releveant SHINE pics
                      bgImage={process.env.PUBLIC_URL + `/images/home/community-${num}.png`}
                      borderRadius="2xl"
                      bgSize="cover"
                      bgPosition="center"
                      height="8em"
                      transition="transform 0.3s ease"
                      _hover={{ transform: "scale(1.02)" }}
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
}

export default HeroSection;