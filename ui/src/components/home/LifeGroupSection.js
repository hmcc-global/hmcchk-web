import {
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import CustomButton from "../helpers/components/CustomButton";

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

const lgUrl = "https://hongkong.hmcc.net/wp-content/uploads/Group-33-min.png";
const lg = {
  title: colorfulString("LIFE", ["#FD7B7E", "#43B77B", "#7DABFC", "#FEDD64"]),
  text: "There is no better way to get a taste of who we are and what we believe in then to check out one of our LIFE Groups. This is an opportunity to experience the life-changing power of Biblical community.",
};
const buttonText = "LEARN MORE >";

const LifeGroupSection = () => {
  return (
    <Flex w="full" h="100vh">
      <Container
        maxW={["container.md", "container.lg"]}
        justifyContent="center"
        display="flex"
      >
        <HStack w="100%">
          <VStack w="50%" align="baseline" spacing={12}>
            <Heading as="h1" fontSize="4em">
              {lg.title} GROUPS
            </Heading>
            <Text>{lg.text}</Text>
            <CustomButton
              alignSelf="baseline"
              bg="rgb(0, 0, 0, 0)"
              variant="outline"
              color="#0628A3"
              borderColor="#0628A3"
              w="38.2%"
              _hover={{
                bg: "#0628A3",
                color: "white",
                borderColor: "white",
              }}
              text={buttonText}
            />
          </VStack>
          <Image src={lgUrl} w="50%" />
        </HStack>
      </Container>
    </Flex>
  );
};

export default LifeGroupSection;
