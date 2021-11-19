import { Box, Flex, Heading, Stack, VStack, Text } from "@chakra-ui/layout";

const PictureStory = ({ image, text }) => {
  return (
    <VStack h="100%" px={2}>
      <Box
        w="100%"
        h="13em"
        borderWidth="1px"
        borderRadius="20"
        bgImage={image}
        bgPosition="center"
        bgSize="cover"
        minWidth="unset"
        mb={3}
      ></Box>
      <Box w="100%" bgColor="#E9E9E9" px={10} py={1}>
        <Text color="black" textAlign="center">
          {text}
        </Text>
      </Box>
    </VStack>
  );
};

const StorySection = (props) => {
  const { title, blurb } = props;
  return (
    <Flex direction="column" maxW="container.lg">
      <Heading
        as="h2"
        fontSize={["2xl", "6xl"]}
        fontWeight={700}
        lineHeight={1}
        color="#0628A3"
        textAlign="center"
        mb={5}
      >
        {title}
      </Heading>
      <Text color="black" textAlign="justify">
        {blurb[0]}
      </Text>
      <Box
        w="100%"
        h={["15em", "25em"]}
        borderWidth="1px"
        borderRadius="20"
        bgImage={`url('${process.env.PUBLIC_URL}/images/about/picture1.png')`}
        bgPosition="center"
        bgSize="cover"
        px={[6, 12, 35]}
        py={[8, 16, 20]}
        mt={[4, 8]}
        mb={[4, 8]}
      ></Box>
      <Text color="black" textAlign="justify">
        {blurb[1]}
      </Text>
      <Stack
        direction={["column", "row"]}
        mt={[4, 8]}
        mb={[4, 8]}
        maxW="container.lg"
      >
        <PictureStory
          image={`url('${process.env.PUBLIC_URL}/images/about/picture2.png')`}
          text="Hong Kong Church Plant Team arriving at Hong Kong"
        />
        <PictureStory
          image={`url('${process.env.PUBLIC_URL}/images/about/picture3.png')`}
          text="Arriving at CUHK for the first LIFE Group"
        />
        <PictureStory
          image={`url('${process.env.PUBLIC_URL}/images/about/picture4.png')`}
          text="Inagural Sunday Celebration at Hong Kong in 2015"
        />
      </Stack>
      <Text color="black" textAlign="justify">
        {blurb[2]}
      </Text>
      <br />
      <Text color="black" textAlign="justify">
        {blurb[3]}
      </Text>
    </Flex>
  );
};

export default StorySection;
