import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Link,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import Card from "../helpers/components/Card";
import CustomButton from "../helpers/components/CustomButton";

const aboutUrl =
  "https://hongkong.hmcc.net/wp-content/uploads/2021_07_11_Membership_Recognition_Prayer_1-scaled.jpg";
const about = {
  title: "About us",
  text: "Harvest Mission Community Church of Hong Kong is an international church that was planted in 2015, when a team of 20 people came to Hong Kong with a vision to reach this great city and be a 1st-century church in the 21st century. We value transculturalism and we are actively reaching out to people from all walks of life, specifically college students, working adults, and families.",
};
const vision = {
  title: "VISION",
  text: "Multiplying churches in campuses and cities to transform the next generation among the nations.",
};
const mission = {
  title: "MISSION",
  text: "To transform lost people into Christ’s disciples who will then transform the world.",
};
const moreAboutUs = "More about us >";

const AboutSection = () => {
  return (
    <Flex
      w="full"
      h="100vh"
      justify="center"
      bgImage={`linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ),url(${aboutUrl})`}
      bgSize="cover"
      bgPosition="center center"
    >
      <Flex
        w="full"
        h="100vh"
        justify="center"
        style={{ backdropFilter: "blur(7px)" }}
      >
        <Container
          maxW={["container.md", "container.lg"]}
          justifyContent="center"
          display="flex"
        >
          <VStack w="full" justify="center" spacing={8}>
            <Heading
              color="white"
              as="h2"
              fontSize={["2em", "5em"]}
              alignSelf="baseline"
            >
              {about.title}
            </Heading>
            <Text fontSize={["0.8em", "1em"]} color="white" textAlign="justify">
              {about.text}
            </Text>
            <Stack
              w="full"
              justify="center"
              direction={["column", "row"]}
              alignItems="center"
            >
              <Card
                width="full"
                height={["5em", "15em"]}
                color="rgba(255, 255, 255, 0.2)"
                title={vision.title}
                titleColor="#63B3ED"
                text={vision.text}
                textColor="white"
              />
              <Card
                width="full"
                height={["5em", "15em"]}
                color="rgba(255, 255, 255, 0.2)"
                title={mission.title}
                titleColor="#63B3ED"
                text={mission.text}
                textColor="white"
              />
            </Stack>
            <Button
              alignSelf={["center", "flex-end"]}
              bg="rgb(0, 0, 0, 0)"
              variant="outline"
              color="white"
              w={["full", "23.5%"]}
              _hover={{
                bg: "white",
                color: "#1A365D",
                borderColor: "#1A365D",
                textDecoration: "none",
              }}
              as={Link}
              target="_blank"
              href="https://hongkong.hmcc.net/about/who-we-are"
            >
              {"More about us >"}
            </Button>
          </VStack>
        </Container>
      </Flex>
    </Flex>
  );
};

export default AboutSection;
