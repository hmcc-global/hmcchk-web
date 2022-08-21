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
// TODO figure out a way to have a central location to edit photo url, blurbs etc.
// sm = 30em, md = 48em, lg = 62em, xl = 80em, 2xl = "96em"
// sm = 480px, md = 768px, lg = 992px, xl = 1280px, 2xl = "1536px"
const heroText = 'Transforming Lives,\nTransforming the World';

const HeroSection = ({ anchorTarget }) => {
  const vidRef = useRef();

  useEffect(() => {
    if (vidRef.current) {
      vidRef.current.addEventListener('loadedmetadata', e => {
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
        h={['92vh', '96vh']}
        src={process.env.PUBLIC_URL + '/images/home/Homepage_Video.mp4'}
        loop
        muted
        objectFit="cover"
        justify="center"
        playsInline
        sx={{ aspectRatio: '16/9' }}
      />
      <Flex
        w="full"
        h="100vh"
        marginTop="-100vh"
        background="rgba(73, 94, 123, 0.53)"
        style={{ zIndex: 1 }}
        position="relative"
      >
        <Container
          maxW="container.lg"
          w="full"
          justifyContent="center"
          display="flex"
        >
          <VStack
            w="full"
            justify="center"
            h="100%"
            px={useBreakpointValue({ base: 4, md: 8 })}
            spacing={12}
          >
            <Stack
              w="full"
              align="center"
              spacing={6}
              justifyContent="center"
              height="90%"
              marginTop="6em"
            >
              <Heading
                color="white"
                as="h1"
                fontSize={{ base: '1.5em', md: '3em' }}
                textAlign="center"
                fontWeight={600}
                whiteSpace="pre-wrap"
                alignSelf="center"
              >
                {heroText}
              </Heading>
              <Image src={process.env.PUBLIC_URL + '/images/home/ripple.png'} />
              <Stack
                w="full"
                align="center"
                marginTop="-1rem !important"
                rowGap={12}
              >
                <Box>
                  <Heading
                    color="white"
                    as="h4"
                    textAlign="center"
                    whiteSpace="pre-wrap"
                    alignSelf="center"
                    fontSize={{ base: '0.8em', md: '1.2em' }}
                    fontWeight={600}
                  >
                    Harvest Mission Community Church
                  </Heading>
                  <Heading
                    color="white"
                    as="h4"
                    fontSize={{ base: '0.8em', md: '1.2em' }}
                    textAlign="center"
                    whiteSpace="pre-wrap"
                    alignSelf="center"
                    fontWeight={600}
                  >
                    of Hong Kong
                  </Heading>
                </Box>
                <Box
                  style={{
                    background: 'rgba(27, 53, 102, 0.8)',
                  }}
                  padding={{ base: '0px', md: '8px' }}
                >
                  <Text
                    color="white"
                    display={{ base: 'none', md: 'flex' }}
                    style={{ textShadow: '0px 3.2px 32px rgba(0, 0, 0, 0.25)' }}
                    fontSize="16px"
                  >
                    Every Sunday at 10AM HKT | Organize, Kwun Tong & Online
                  </Text>
                </Box>
              </Stack>
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
                color="white"
                display={{ base: 'flex', md: 'none' }}
                justifyContent="center"
                style={{ textShadow: '0px 3.2px 32px rgba(0, 0, 0, 0.25)' }}
                fontSize="12px"
              >
                Every Sunday at 10AM HKT
              </Text>
              <Text
                color="white"
                justifyContent="center"
                display={{ base: 'flex', md: 'none' }}
                style={{ textShadow: '0px 3.2px 32px rgba(0, 0, 0, 0.25)' }}
                fontSize="12px"
              >
                Organize, Kwun Tong & Online
              </Text>
            </Box>
            <Stack position="relative" bottom="6%" width="35px" height="35px">
              <Image
                src={process.env.PUBLIC_URL + '/images/home/DownArrow.png'}
                style={{ cursor: 'pointer' }}
                onClick={() =>
                  anchorTarget.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                    inline: 'nearest',
                  })
                }
              />
            </Stack>
          </VStack>
        </Container>
      </Flex>
    </>
  );
};

export default HeroSection;
