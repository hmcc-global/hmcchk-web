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
    >
      <Container>
        <VStack>
          <Heading size="2xl" color={titleColor}>
            {title}
          </Heading>
          <Text textAlign="center" color={textColor}>
            {text}
          </Text>
        </VStack>
      </Container>
    </Box>
  );
};

export default Card;
