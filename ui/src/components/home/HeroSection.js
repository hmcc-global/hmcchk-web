import {
  Flex,
  VStack,
  Stack,
  Link,
  useBreakpointValue,
  Heading,
  Container,
  Button,
} from '@chakra-ui/react';

// TODO figure out a way to have a central location to edit photo url, blurbs etc.
// sm = 30em, md = 48em, lg = 62em, xl = 80em, 2xl = "96em"
// sm = 480px, md = 768px, lg = 992px, xl = 1280px, 2xl = "1536px"
const heroText = 'Transforming Lives,\nTransforming the World';
const worshipText = 'WORSHIP IN-PERSON >';
const churchText = 'CHURCH ONLINE >';
const covidText = 'OUR LATEST COVID-19 POLICY >';

const HeroSection = () => {
  return (
    <Flex
      w="full"
      h="100vh"
      bgImage={`linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ),url(${
        process.env.PUBLIC_URL + '/images/home/hero.png'
      })`}
      bgSize="cover"
      bgPosition="center center"
      justify="center"
    >
      <Container maxW="container.lg" justifyContent="center" display="flex">
        <VStack
          w="full"
          justify="center"
          px={useBreakpointValue({ base: 4, md: 8 })}
        >
          <Stack w="full" align="center" spacing={6}>
            <Heading
              color="white"
              as="h1"
              fontSize={['1.9em', '4em']}
              textAlign="center"
              whiteSpace="pre-wrap"
              alignSelf="center"
            >
              {heroText}
            </Heading>
            <Stack
              direction={['column', 'row']}
              w="90%"
              alignItems={['center']}
            >
              <Button
                bg="rgb(0, 0, 0, 0)"
                variant="outline"
                color="white"
                _hover={{
                  bg: 'white',
                  color: '#1A365D',
                  borderColor: '#1A365D',
                  textDecoration: 'none',
                }}
                w="inherit"
                as={Link}
                // href="/visit-us"
                href="https://hongkong.sub.hmcc.net/urgent-announcements/hmcc-covid-19-safety-precautions/"
                fontSize={['sm', 'md']}
              >
                {covidText}
              </Button>
              <Button
                bg="rgb(0, 0, 0, 0)"
                variant="outline"
                color="white"
                _hover={{
                  bg: 'white',
                  color: '#1A365D',
                  borderColor: '#1A365D',
                  textDecoration: 'none',
                }}
                w="inherit"
                as={Link}
                href="/sermons"
                fontSize={['sm', 'md']}
              >
                {churchText}
              </Button>
            </Stack>
          </Stack>
        </VStack>
      </Container>
    </Flex>
  );
};

export default HeroSection;
