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

  // Define some styling as variable to make editing them easier
  const headerTextSize = ['3.8em', '4.75em', '4.25em', '5.5em'];
  const headerTextWeight = ['bold', 'bold', 'semibold'];
  const headerTextSpacing = ['-3px', '-5.5px'];
  const headerHighlightTextSize = ['1.2em', '1.25em', '1em', '1em'];
  const headerHighlightTextWeight = ['normal', 'normal', 'lighter'];
  const headerHighlightTextSpacing = ['-2px', '-2.5px', '-5.5px'];

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
      <Box display={['none', 'none', 'block']}>
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
          background="linear-gradient(to right, rgb(246,250,255,1) 45%, rgba(246,250,255,0) 100%)"
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
        opacity={['0', '0', '1']}
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
            justifyContent={['start', 'start', 'end']}
            fontFamily="Manrope"
            fontSize={{ base: '0.8em', md: '1.1em' }}
            letterSpacing="-0.02em"
            color="#4A6EEB"
          >
            <Image
              opacity="0"
              display={['none', 'none', 'block']}
              src={process.env.PUBLIC_URL + '/images/home/hmcc-ripple-blue.svg'}
            />
            <Text
              opacity="0"
              display={['none', 'none', 'block']}
              textAlign="center"
              fontWeight="bold"
            >
              Harvest Mission Community Church of Hong Kong
            </Text>

            {/* Hide the text with exclusion effect*/}
            <Stack
              spacing={[1, 0]}
              pt={['10%', '10%', 0]}
              px={['15%', '15%', '0']}
              textAlign={['center', 'center', 'left']}
            >
              <Heading
                fontSize={headerTextSize}
                fontWeight={headerTextWeight}
                letterSpacing={headerTextSpacing}
                color="black"
                lineHeight="1.05"
              >
                Transforming{' '}
                <Text
                  as="span"
                  color={['#000000', '#ffffff']}
                  fontFamily="DMSerifDisplay_Italic"
                  fontSize={headerHighlightTextSize}
                  fontWeight={headerHighlightTextWeight}
                  letterSpacing={headerHighlightTextSpacing}
                >
                  Lives,
                </Text>
              </Heading>
              <Heading
                fontSize={headerTextSize}
                fontWeight={headerTextWeight}
                letterSpacing={headerTextSpacing}
                color="black"
                lineHeight="1.05"
              >
                Transforming{' '}
                <Text
                  as="span"
                  color={['#000000', '#ffffff']}
                  fontFamily="DMSerifDisplay_Italic"
                  fontSize={headerHighlightTextSize}
                  fontWeight={headerHighlightTextWeight}
                  letterSpacing={headerHighlightTextSpacing}
                >
                  the World,
                </Text>
              </Heading>
            </Stack>
            <Text opacity="0" whiteSpace="pre">
              Every Sunday at <b>10AM</b> HKT
            </Text>
            <Text opacity="0" flexDir="column">
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
            justifyContent={['start', 'start', 'end']}
            fontFamily="Manrope"
            fontSize={{ base: '0.8em', md: '1.1em' }}
            letterSpacing="-0.02em"
            color="#4A6EEB"
          >
            <Image
              display={['none', 'none', 'block']}
              src={process.env.PUBLIC_URL + '/images/home/hmcc-ripple-blue.svg'}
            />
            <Text
              display={['none', 'none', 'block']}
              textAlign="center"
              fontWeight="bold"
            >
              Harvest Mission Community Church of Hong Kong
            </Text>

            {/* Hide the text with exclusion effect*/}
            <Stack
              spacing={[1, 0]}
              pt={['10%', '10%', 0]}
              px={['15%', '15%', '0']}
              textAlign={['center', 'center', 'left']}
            >
              <Heading
                fontSize={headerTextSize}
                fontWeight={headerTextWeight}
                letterSpacing={headerTextSpacing}
                color="black"
                lineHeight="1.05"
              >
                Transforming{' '}
                <Text
                  as="span"
                  color={['#000000', '#000000', '#ffffff']}
                  fontFamily="DMSerifDisplay_Italic"
                  fontSize={headerHighlightTextSize}
                  fontWeight={headerHighlightTextWeight}
                  letterSpacing={headerHighlightTextSpacing}
                  opacity={['1', '1', '0']}
                >
                  Lives,
                </Text>
              </Heading>
              <Heading
                fontSize={headerTextSize}
                fontWeight={headerTextWeight}
                letterSpacing={headerTextSpacing}
                color="black"
                lineHeight="1.05"
              >
                Transforming{' '}
                <Text
                  as="span"
                  color={['#000000', '#000000', '#ffffff']}
                  fontFamily="DMSerifDisplay_Italic"
                  fontSize={headerHighlightTextSize}
                  fontWeight={headerHighlightTextWeight}
                  letterSpacing={headerHighlightTextSpacing}
                  opacity={['1', '1', '0']}
                >
                  the World,
                </Text>
              </Heading>
            </Stack>
            <Text whiteSpace="pre">
              Every Sunday at <b>10AM</b> HKT
            </Text>
            <Text flexDir="column">
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
