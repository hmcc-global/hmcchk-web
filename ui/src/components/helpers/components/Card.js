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
            fontSize={["0.3em", "1em"]}
            color={textColor}
          >
            {text}
          </Text>
        </VStack>
      </Container>
    </Box>
  );
};

export default Card;
