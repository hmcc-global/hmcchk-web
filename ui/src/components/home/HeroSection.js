import {
  Flex,
  VStack,
  Stack,
  Link,
  useBreakpointValue,
  Heading,
  ButtonGroup,
  Container,
  Button,
} from "@chakra-ui/react";
import CustomButton from "../helpers/components/CustomButton";

// TODO figure out a way to have a central location to edit photo url, blurbs etc.
// sm = 30em, md = 48em, lg = 62em, xl = 80em, 2xl = "96em"
// sm = 480px, md = 768px, lg = 992px, xl = 1280px, 2xl = "1536px"
const heroUrl =
  "https://hongkong.hmcc.net/wp-content/uploads/2021_Apr_4_Easter_Celebration_Worship_Wide_2-1-min.jpg";
const heroText = "Transforming Lives,\nTransforming the World";
const worshipText = "WORSHIP IN-PERSON >";
const churchText = "CHURCH ONLINE >";

const HeroSection = () => {
  return (
    <Flex
      w="full"
      h="100vh"
      bgImage={`linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ),url(${heroUrl})`}
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
              fontSize={["1.9em", "4em"]}
              textAlign="center"
              whiteSpace="pre-wrap"
              alignSelf="center"
            >
              {heroText}
            </Heading>
            <ButtonGroup
              bg="rgb(0, 0, 0, 0)"
              variant="outline"
              color="white"
              w="100%"
              flexDirection={["column", "row"]}
            >
              <Button
                _hover={{
                  bg: "white",
                  color: "#1A365D",
                  borderColor: "#1A365D",
                }}
                w="inherit"
                as={Link}
                target="_blank"
                href="/visit-us"
              >
                {worshipText}
              </Button>
              <Button
                _hover={{
                  bg: "white",
                  color: "#1A365D",
                  borderColor: "#1A365D",
                }}
                w="inherit"
                as={Link}
                target="_blank"
                href="https://www.hongkong.hmcc.net/online"
              >
                {churchText}
              </Button>
            </ButtonGroup>
          </Stack>
        </VStack>
      </Container>
    </Flex>
  );
};

export default HeroSection;
