import { Box, Container, Heading, Text, VStack } from "@chakra-ui/react";

const Card = (props) => {
  const { width, height, color, title, titleColor, text, textColor } = props;
  return (
    <Box
      w={width}
      h={height}
      borderWidth={1}
      borderColor="white"
      borderRadius={10}
      display="flex"
      flexDir="column"
      justifyContent="center"
      alignItems="center"
      background={color}
<<<<<<< 54-homepage
<<<<<<< 54-homepage
      _hover={{
        background: "rgba(0, 0, 0, 0.2)",
      }}
    >
      <Container>
        <VStack>
          <Heading fontSize={["1em", "3em"]} color={titleColor}>
            {title}
          </Heading>
          <Text
            textAlign="center"
            fontSize={["xs", "1em"]}
            color={textColor}
          >
=======
=======
      _hover={{
        background: "rgba(0, 0, 0, 0.2)",
      }}
>>>>>>> GH-54: Complete functionality, started mobile
    >
      <Container>
        <VStack>
          <Heading size="2xl" color={titleColor}>
            {title}
          </Heading>
          <Text textAlign="center" color={textColor}>
>>>>>>> Finish About Us Section
            {text}
          </Text>
        </VStack>
      </Container>
    </Box>
  );
};

export default Card;
