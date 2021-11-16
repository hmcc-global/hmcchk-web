import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/layout";

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
        boxSize="md"
        w="100%"
        borderWidth="1px"
        borderRadius="20"
        // TODO-aparedan: change bgimage
        bgImage={`url('${process.env.PUBLIC_URL}/images/visitus/header-banner.jpg')`}
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
      <Box
        boxSize="sm"
        w="100%"
        borderWidth="1px"
        borderRadius="20"
        // TODO-aparedan: change bgimage
        bgImage={`url('${process.env.PUBLIC_URL}/images/visitus/header-banner.jpg')`}
        bgPosition="center"
        bgSize="cover"
        px={[6, 12, 35]}
        py={[8, 16, 20]}
      ></Box>
      <Box
        boxSize="sm"
        w="100%"
        borderWidth="1px"
        borderRadius="20"
        // TODO-aparedan: change bgimage
        bgImage={`url('${process.env.PUBLIC_URL}/images/visitus/header-banner.jpg')`}
        bgPosition="center"
        bgSize="cover"
        px={[6, 12, 35]}
        py={[8, 16, 20]}
      ></Box>
      <Box
        boxSize="sm"
        w="100%"
        borderWidth="1px"
        borderRadius="20"
        // TODO-aparedan: change bgimage
        bgImage={`url('${process.env.PUBLIC_URL}/images/visitus/header-banner.jpg')`}
        bgPosition="center"
        bgSize="cover"
        px={[6, 12, 35]}
        py={[8, 16, 20]}
      ></Box>
      </Stack>
      <Text color="black" textAlign="justify">
        {blurb[2]}
      </Text>
      <br/>
      <Text color="black" textAlign="justify">
        {blurb[3]}
      </Text>
    </Flex>
  );
};

export default StorySection;
