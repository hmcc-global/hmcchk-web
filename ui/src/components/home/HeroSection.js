import {
  Flex,
  VStack,
  Stack,
  Image,
  useBreakpointValue,
  Heading,
  Container,
  Text,
  Box,
} from '@chakra-ui/react';
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
    <>
      <Flex
        as="video"
        ref={vidRef}
        w="full"
        h="100vh"
        src={process.env.PUBLIC_URL + '/images/home/Homepage_Video.mp4'}
        loop
        muted
        objectFit="cover"
        justify="center"
        playsInline
        sx={{ aspectRatio: '16/9' }}
        background="linear-gradient(to top, rgb(246,250,255,1) 45%, rgba(255,255,255,0) 100%)"
      />
      <Flex
        w="100%"
        h="100vh"
        marginTop="-100vh"
        background="linear-gradient(to right, rgb(246,250,255,1) 45%, rgba(255,255,255,0) 100%)"
        style={{ zIndex: 1 }}
        position="relative"
      >
        <Container
          width="100%"
          display="flex"
          maxW="100%"
          justifyContent="flex-start"
        >
          <VStack
            w="100%"
            h="100%"
            px={useBreakpointValue({ base: 4, md: 8 })}
            spacing={12}
          >
            <Stack
              w="100%"
              align="flex-start"
              spacing={6}
              justifyContent="center"
              height="90%"
              marginTop="6em"
            >
              <Image src={process.env.PUBLIC_URL + '/images/home/ripple.png'} />
              <Heading
                color="black"
                as="h4"
                textAlign="center"
                blackSpace="pre-wrap"
                fontSize={{ base: '0.8em', md: '1.2em' }}
                fontWeight={600}
              >
                Harvest Mission Community Church
              </Heading>
              <Heading
                color="black"
                as="h1"
                fontSize='6em'
                fontWeight={600}
                blackSpace="pre-wrap"
                letterSpacing="-5.5px"
              >
                Transforming <span style={{ fontFamily: 'DMSerifDisplay_Italic', fontWeight: 'lighter' }}>Lives,</span>
              </Heading>
              <Heading
                color="black"
                as="h1"
                fontSize='6em'
                fontWeight={600}
                blackSpace="pre-wrap"
                letterSpacing="-5.5px"
              >
                Transforming <span style={{ fontFamily: 'DMSerifDisplay_Italic', fontWeight: 'lighter' }}> the World</span>
              </Heading>
              <Text
                color="black"
                display={{ base: 'none', md: 'flex' }}
                style={{ textShadow: '0px 3.2px 32px rgba(0, 0, 0, 0.25)' }}
                fontSize="16px"
              >
                Every Sunday at 10AM HKT 
              </Text>
              <Text
                color="black"
                display={{ base: 'none', md: 'flex' }}
                style={{ textShadow: '0px 3.2px 32px rgba(0, 0, 0, 0.25)' }}
                fontSize="16px"
              >
                Transformation Center
                22/F Crocodile Center, Kwun Tong & Online
              </Text>
              <Text
                color="black"
                display={{ base: 'none', md: 'flex' }}
                style={{ textShadow: '0px 3.2px 32px rgba(0, 0, 0, 0.25)' }}
                fontSize="16px"
              >
                Unit 2, 22/F Crocodile Center, Kwun Tong & Online
              </Text>
            </Stack>
            <Box
              style={{
                background: 'rgba(27, 53, 102, 0.8)',
              }}
              padding={{ base: '8px', md: '0px' }}
              position="relative"
              bottom="4%"
            >
              <Text
                color="black"
                display={{ base: 'flex', md: 'none' }}
                justifyContent="center"
                style={{ textShadow: '0px 3.2px 32px rgba(0, 0, 0, 0.25)' }}
                fontSize="12px"
              >
                Every Sunday at 10AM HKT
              </Text>
              <Text
                color="black"
                display={{ base: 'flex', md: 'none' }}
                style={{ textShadow: '0px 3.2px 32px rgba(0, 0, 0, 0.25)' }}
                fontSize="12px"
                align="center"
              >
                Transformation Center - Unit 02, 22/F Crocodile Center, Kwun
                Tong & Online
              </Text>
            </Box>
          </VStack>
        </Container>
      </Flex>
    </>
  );
};

export default HeroSection;
