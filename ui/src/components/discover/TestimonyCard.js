import { Box, Heading, Image, Stack, Text, VStack } from "@chakra-ui/react";

const TestimonyCard = (props) => {
  const { testimonyInfo } = props;
  const { imageUrl, name, bio, testimony, backgroundStyle } = testimonyInfo;
  return (
    <Box
      borderWidth="1px"
      borderRadius="20"
      shadow="lg"
      px={[6, 10]}
      pt={[6, 10]}
      pb={[4, 10]}
      mx={4}
      h={["31em", "20em"]}
      w={["18em", "47em"]}
      bg={backgroundStyle}
    >
      <Stack direction={["column", "row"]} spacing={6}>
        <Image
          src={imageUrl}
          fit="contain"
          borderRadius={10}
          h={["10em", "15em"]}
          ml={"auto"}
        />

        <VStack align="stretch" spacing={0}>
          <Heading mt={[-5, -1]} fontSize={["lg", "2xl"]}>
            {name}
          </Heading>
          <Text fontSize={["0.85em", "1em"]} fontWeight="bold" pb={2}>
            {bio}
          </Text>
          <Text fontSize={["0.75em", "0.925em"]}>{testimony}</Text>
        </VStack>
      </Stack>
    </Box>
  );
};

export default TestimonyCard;
