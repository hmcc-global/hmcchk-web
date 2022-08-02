import {
  Flex,
  VStack,
  Stack,
  Link,
  Image,
  useBreakpointValue,
  Heading,
  Container,
  Text,
  Box,
} from '@chakra-ui/react';

// TODO figure out a way to have a central location to edit photo url, blurbs etc.
// sm = 30em, md = 48em, lg = 62em, xl = 80em, 2xl = "96em"
// sm = 480px, md = 768px, lg = 992px, xl = 1280px, 2xl = "1536px"
const heroText = 'Transforming Lives,\nTransforming the World';

const HeroSection = () => {
  return (
    <>
      <Flex
        as="video"
        w="full"
        h="100vh"
        src={process.env.PUBLIC_URL + '/images/home/Homepage_Video.mp4'}
        loop
        autoPlay
        muted
        objectFit="cover"
        justify="center"
        // position="fixed"
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
        <Container maxW="container.lg" justifyContent="center" display="flex">
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
            >
              <Heading
                color="white"
                as="h1"
                fontSize={{ base: '2.5em', md: '4em' }}
                textAlign="center"
                whiteSpace="pre-wrap"
                alignSelf="center"
              >
                {heroText}
              </Heading>
              <Image src={process.env.PUBLIC_URL + '/images/home/ripple.png'} />
              <Stack w="full" align="center" marginTop="-1rem !important">
                <Heading
                  color="white"
                  as="h4"
                  textAlign="center"
                  whiteSpace="pre-wrap"
                  alignSelf="center"
                  fontSize={{ base: '1em', md: '1.5em' }}
                >
                  Harvest Mission Community Church
                </Heading>
                <Heading
                  color="white"
                  as="h4"
                  fontSize={{ base: '1em', md: '1.5em' }}
                  textAlign="center"
                  whiteSpace="pre-wrap"
                  alignSelf="center"
                >
                  of Hong Kong
                </Heading>
                <Box
                  style={{
                    background: 'rgba(23, 40, 72, 0.39)',
                    padding: '8px',
                  }}
                  display={{ base: 'none', md: 'flex' }}
                >
                  <Text
                    color="white"
                    style={{ textShadow: '0px 3.2px 32px rgba(0, 0, 0, 0.25)' }}
                  >
                    Every Sunday at 10AM (HKT) @Organize, Kwun Tong
                  </Text>
                </Box>
              </Stack>
            </Stack>
            <Stack position="relative" bottom="4%" width="35px" height="35px">
              <Link href="/">
                <Image
                  src={process.env.PUBLIC_URL + '/images/home/DownArrow.png'}
                />
              </Link>
            </Stack>
          </VStack>
        </Container>
      </Flex>
    </>
  );
};

export default HeroSection;
