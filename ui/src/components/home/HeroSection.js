import {
  Flex,
  Stack,
  Image,
  Box,
  Heading,
  Container,
  Text,
} from '@chakra-ui/react';
import { SocialIcon } from 'react-social-icons';
import { useEffect, useRef } from 'react';

const HeroSection = () => {
  const vidRef = useRef();

  useEffect(() => {
    if (vidRef.current) {
      vidRef.current.addEventListener('loadedmetadata', (e) => {
        vidRef.current.play();
      });
    }
  }, [vidRef]);

  return (
    <Box position="relative">
      {/* Layer 0 - video bg */}
      <Box>
        <Flex
          as="video"
          ref={vidRef}
          w="full"
          h="95vh"
          src={process.env.PUBLIC_URL + '/images/home/Homepage_Video.mp4'}
          loop
          muted
          objectFit="cover"
          justify="center"
          playsInline
          sx={{ aspectRatio: '16/9' }}
          zIndex="0"
          position="absolute"
          top="0"
          left="0"
        />
        <Flex
          w="full"
          h="95.1vh"
          zIndex="0"
          background="linear-gradient(to right, rgb(246,250,255,1) 45%, rgba(255,255,255,0) 100%)"
          position="absolute"
          top="0"
          left="0"
        />
      </Box>
      {/* Layer 1 - clone of content, exclusion effect for header text */}
      <Flex
        w="full"
        h="95vh"
        zIndex="1"
        position="absolute"
        top="0"
        left="0"
        mixBlendMode="exclusion"
      >
        <Container
          display="flex"
          maxW="container.xl"
          justifyContent="flex-start"
        >
          <Stack
            w="100%"
            height="93%"
            spacing={5}
            align="flex-start"
            justifyContent="end"
            fontFamily="Manrope"
            fontSize={{ base: '0.8em', md: '1.1em' }}
            letterSpacing="-0.02em"
            color="#4A6EEB"
          >
            <Image
              opacity="0"
              src={process.env.PUBLIC_URL + '/images/home/hmcc-ripple-blue.svg'}
            />
            <Text opacity="0" textAlign="center" fontWeight="bold">
              Harvest Mission Community Church of Hong Kong
            </Text>
            <Stack spacing={0}>
              <Heading
                fontSize="5.5em"
                fontWeight="semibold"
                letterSpacing="-5.5px"
                color="black"
              >
                Transforming{' '}
                <span
                  style={{
                    color: '#ffffff',
                    fontFamily: 'DMSerifDisplay_Italic',
                    fontWeight: 'lighter',
                  }}
                >
                  Lives,
                </span>
              </Heading>
              <Heading
                fontSize="5.5em"
                fontWeight="semibold"
                letterSpacing="-5.5px"
                color="black"
              >
                Transforming{' '}
                <span
                  style={{
                    color: '#ffffff',
                    fontFamily: 'DMSerifDisplay_Italic',
                    fontWeight: 'lighter',
                  }}
                >
                  the World
                </span>
              </Heading>
            </Stack>
            <Text
              display={{ base: 'none', md: 'flex' }}
              style={{ textShadow: '0px 3.2px 32px rgba(0, 0, 0, 0.25)' }}
              whiteSpace="pre"
              opacity="0"
            >
              Every Sunday at <b>10AM</b> HKT
            </Text>
            <Text
              display={{ base: 'none', md: 'flex' }}
              style={{ textShadow: '0px 3.2px 32px rgba(0, 0, 0, 0.25)' }}
              flexDir="column"
              opacity="0"
            >
              <Text fontWeight="bold">Transformation Center</Text>
              <Text>Unit 2, 22/F Crocodile Center, Kwun Tong & Online</Text>
            </Text>
            <Stack opacity="0" spacing={0} pl="40%">
              <SocialIcon
                target="_blank"
                bgColor="none"
                fgColor="#4A6EEB"
                url="https://www.instagram.com/hmcc_hk/?hl=en"
              />
              <SocialIcon
                target="_blank"
                bgColor="none"
                fgColor="#4A6EEB"
                url="https://open.spotify.com/user/hmccofhk?si=bd64100596904a95"
              />
              <SocialIcon
                target="_blank"
                bgColor="none"
                fgColor="#4A6EEB"
                url="https://www.youtube.com/channel/UC1O1T7RaKWTGHd7R_0KMZ8Q"
              />
            </Stack>
          </Stack>
        </Container>
      </Flex>

      {/* Layer 2 - true content layer */}
      <Flex w="full" h="95vh" zIndex="1" position="relative">
        <Container
          display="flex"
          maxW="container.xl"
          justifyContent="flex-start"
        >
          <Stack
            w="100%"
            height="93%"
            spacing={5}
            align="flex-start"
            justifyContent="end"
            fontFamily="Manrope"
            fontSize={{ base: '0.8em', md: '1.1em' }}
            letterSpacing="-0.02em"
            color="#4A6EEB"
          >
            <Image
              src={process.env.PUBLIC_URL + '/images/home/hmcc-ripple-blue.svg'}
            />
            <Text textAlign="center" fontWeight="bold">
              Harvest Mission Community Church of Hong Kong
            </Text>

            {/* Hide the text with exclusion effect*/}
            <Stack spacing={0}>
              <Heading
                fontSize="5.5em"
                fontWeight="semibold"
                letterSpacing="-5.5px"
                color="black"
              >
                Transforming{' '}
                <span
                  style={{
                    color: '#ffffff',
                    fontFamily: 'DMSerifDisplay_Italic',
                    fontWeight: 'lighter',
                    opacity: 0,
                  }}
                >
                  Lives,
                </span>
              </Heading>
              <Heading
                fontSize="5.5em"
                fontWeight="semibold"
                letterSpacing="-5.5px"
                color="black"
              >
                Transforming{' '}
                <span
                  style={{
                    color: '#ffffff',
                    fontFamily: 'DMSerifDisplay_Italic',
                    fontWeight: 'lighter',
                    opacity: 0,
                  }}
                >
                  the World
                </span>
              </Heading>
            </Stack>
            <Text
              display={{ base: 'none', md: 'flex' }}
              style={{ textShadow: '0px 3.2px 32px rgba(0, 0, 0, 0.25)' }}
              whiteSpace="pre"
            >
              Every Sunday at <b>10AM</b> HKT
            </Text>
            <Text
              display={{ base: 'none', md: 'flex' }}
              style={{ textShadow: '0px 3.2px 32px rgba(0, 0, 0, 0.25)' }}
              flexDir="column"
            >
              <Text fontWeight="bold">Transformation Center</Text>
              <Text>Unit 2, 22/F Crocodile Center, Kwun Tong & Online</Text>
            </Text>
            <Stack spacing={0} pl="40%">
              <SocialIcon
                target="_blank"
                bgColor="none"
                fgColor="#4A6EEB"
                url="https://www.instagram.com/hmcc_hk/?hl=en"
              />
              <SocialIcon
                target="_blank"
                bgColor="none"
                fgColor="#4A6EEB"
                url="https://open.spotify.com/user/hmccofhk?si=bd64100596904a95"
              />
              <SocialIcon
                target="_blank"
                bgColor="none"
                fgColor="#4A6EEB"
                url="https://www.youtube.com/channel/UC1O1T7RaKWTGHd7R_0KMZ8Q"
              />
            </Stack>
          </Stack>
        </Container>
      </Flex>
    </Box>
  );
};

export default HeroSection;
