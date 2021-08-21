import {
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Link,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";

const colorfulString = (text, colorArray) => {
  if (colorArray.length !== text.length) {
    return <span>{text}</span>;
  }
  let result = [];
  for (let i = 0; i < text.length; i++) {
    result[i] = (
      <span key={i} style={{ color: colorArray[i] }}>
        {text[i]}
      </span>
    );
  }
  return result;
};

const lg = {
  title: colorfulString("LIFE", ["#FD7B7E", "#43B77B", "#7DABFC", "#FEDD64"]),
  text: "There is no better way to get a taste of who we are and what we believe in then to check out one of our LIFE Groups. This is an opportunity to experience the life-changing power of Biblical community.",
};
const buttonText = "LEARN MORE >";

const LifeGroupSection = () => {
  return (
    <Flex w="full" h="100vh">
      <Container maxW="container.lg" justifyContent="center" display="flex">
        <Stack
          w="100%"
          direction={["column", "row"]}
          justify="center"
          alignItems="center"
          spacing={[6, null]}
        >
          <VStack
            w={["100%", "50%"]}
            align={["center", "baseline"]}
            spacing={[6, 12]}
          >
            <Heading as="h1" fontSize={["2em", "4.5em"]}>
              {lg.title} GROUPS
            </Heading>
            <Text fontSize={["0.9em", "1.5em"]} textAlign={["justify", "left"]}>
              {lg.text}
            </Text>
            <Button
              alignSelf={["center", "baseline"]}
              bg="rgb(0, 0, 0, 0)"
              variant="outline"
              color="#0628A3"
              borderColor="#0628A3"
              w={["85%", "38.2%"]}
              _hover={{
                bg: "#0628A3",
                color: "white",
                borderColor: "white",
                textDecoration: "none",
              }}
              as={Link}
              href="/connect/#lifegroup"
            >
              {buttonText}
            </Button>
          </VStack>
          <Image
            src={process.env.PUBLIC_URL + "/images/home/lifegroup.png"}
            w={["90%", "50%"]}
          />
        </Stack>
      </Container>
    </Flex>
  );
};

export default LifeGroupSection;
