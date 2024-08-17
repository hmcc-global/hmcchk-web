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
  const vidRefMobile = useRef();

  // Define some styling as variable to make editing them easier
  const headerTextSize = ['2.75rem', '3rem', '4.6rem', '5.75rem'];
  const headerTextWeight = ['bold', 'semibold', 'semibold'];
  const headerTextSpacing = ['-3px', '-4px', '-5.5px'];
  const headerHighlightTextSize = ['1.25em', '1.25em', '1em', '1.1em'];
  const headerHighlightTextWeight = ['normal', 'normal', 'lighter'];
  const headerHighlightTextSpacing = ['-2px', '-2.5px', '-5.5px'];
  const bodyTextSize = { base: '0.925rem', md: '1.2em' };

  useEffect(() => {
    if (vidRef.current) {
      vidRef.current.addEventListener('loadedmetadata', (e) => {
        vidRef.current.play();
      });
    }
    if (vidRefMobile.current) {
      vidRefMobile.current.addEventListener('loadedmetadata', (e) => {
        vidRefMobile.current.play();
      });
    }
  }, [vidRef, vidRefMobile]);

  return (
    <Box position="relative">
      <Box
        display={['none', 'none', 'block']}
        w="full"
        minH="95vh"
        overflow="hidden"
        position="absolute"
      >
        <Flex
          as="video"
          ref={vidRef}
          w="full"
          minH="95.1vh"
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
          left="350"
        />
        <Flex
          w="full"
          minH="95.1vh"
          zIndex="0"
          background="linear-gradient(to right, rgb(246,250,255,1) 45%, rgba(246,250,255,0) 100%)"
          position="absolute"
          sx={{ aspectRatio: '16/9' }}
          top="0"
          left="0"
        />
      </Box>

      <Flex
        w="full"
        minH={['30vh', '30vh', '95vh']}
        zIndex="1"
        position="absolute"
        flexDir="column"
        justifyContent="flex-start"
        px={[0, 0, '3%']}
        pt={['3vh', '3vh', '12vh', '12vh']}
        mixBlendMode="exclusion"
        display={['none', 'none', 'flex']}
      >
        <Container
          display="flex"
          maxW="container.xl"
          justifyContent="flex-start"
        >
          <Stack
            w="100%"
            spacing={[1, 1, 5]}
            align="flex-start"
            justifyContent="start"
            fontFamily="Manrope"
            fontSize={bodyTextSize}
            letterSpacing="-0.02em"
            color="#4A6EEB"
          >
            <Image
              display={['none', 'none', 'block']}
              src={process.env.PUBLIC_URL + '/images/home/hmcc-ripple-blue.svg'}
              opacity="0"
            />
            <Text
              display={['none', 'none', 'block']}
              textAlign="center"
              fontWeight="bold"
              opacity="0"
            >
              Harvest Mission Community Church of Hong Kong
            </Text>

            {/* Hide the text with exclusion effect*/}
            <Stack
              spacing={[1, 0]}
              px={['11%', '20%', '0']}
              w="full"
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
                  opacity={['1', '1', '1']}
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
                  opacity={['1', '1', '1']}
                >
                  the World
                </Text>
              </Heading>
            </Stack>
          </Stack>
        </Container>
        <Flex
          display={['flex', 'flex', 'none']}
          as="video"
          w="full"
          h="auto"
          src={process.env.PUBLIC_URL + '/images/home/Homepage_Video.mp4'}
          loop
          muted
          objectFit="cover"
          justify="center"
          playsInline
          sx={{ aspectRatio: '16/9' }}
          mt={[7, 7, 5]}
        ></Flex>
        <Container
          display="flex"
          maxW="container.xl"
          justifyContent="flex-start"
          mt={[7, 7, 5]}
          overflowX="hidden"
          opacity="0"
        >
          <Stack
            w="100%"
            spacing={[1, 1, 5]}
            fontFamily="Manrope"
            fontSize={bodyTextSize}
            textAlign={['right', 'right', 'left']}
            letterSpacing="-0.02em"
            color="#4A6EEB"
          >
            <Text whiteSpace="pre">
              Every Sunday at <b>10AM</b> HKT
            </Text>
            <Text flexDir="column">
              <Text fontWeight="bold">Transformation Center</Text>
              <Text>Unit 2, 22/F Crocodile Center, Kwun Tong & Online</Text>
            </Text>
            <Stack
              spacing={[0, 0, -3]}
              pl={[0, 0, '40%']}
              flexDir={['row', 'row', 'column']}
              justifyContent={['flex-end', 'flex-end', 'flex-start']}
            >
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

      <Flex
        w="full"
        minH={['30vh', '30vh', '95vh']}
        zIndex="1"
        position="relative"
        flexDir="column"
        justifyContent="flex-start"
        px={[0, 0, '3%']}
        pt={['3vh', '3vh', '12vh', '12vh']}
      >
        <Container
          display="flex"
          maxW="container.xl"
          justifyContent="flex-start"
        >
          <Stack
            w="100%"
            spacing={[1, 1, 5]}
            align="flex-start"
            justifyContent="start"
            fontFamily="Manrope"
            fontSize={bodyTextSize}
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
              px={['11%', '20%', '0']}
              w="full"
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
                  the World
                </Text>
              </Heading>
            </Stack>
          </Stack>
        </Container>
        <Flex
          display={['flex', 'flex', 'none']}
          as="video"
          ref={vidRefMobile}
          w="full"
          h="auto"
          src={process.env.PUBLIC_URL + '/images/home/Homepage_Video.mp4'}
          loop
          muted
          objectFit="cover"
          justify="center"
          playsInline
          sx={{ aspectRatio: '16/9' }}
          mt={[7, 7, 5]}
        ></Flex>
        <Container
          display="flex"
          maxW="container.xl"
          justifyContent="flex-start"
          mt={[7, 7, 5]}
          overflowX="hidden"
        >
          <Stack
            w="100%"
            spacing={[1, 1, 5]}
            fontFamily="Manrope"
            fontSize={bodyTextSize}
            textAlign={['right', 'right', 'left']}
            letterSpacing="-0.02em"
            color="#4A6EEB"
          >
            <Text whiteSpace="pre">
              Every Sunday at <b>10AM</b> HKT
            </Text>
            <Text flexDir="column">
              <Text fontWeight="bold">Transformation Center</Text>
              <Text>Unit 2, 22/F Crocodile Center, Kwun Tong & Online</Text>
            </Text>
            <Stack
              spacing={[0, 0, -3]}
              pl={[0, 0, '40%']}
              flexDir={['row', 'row', 'column']}
              justifyContent={['flex-end', 'flex-end', 'flex-start']}
            >
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
