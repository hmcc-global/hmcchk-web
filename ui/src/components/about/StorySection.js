import { Box, Flex, Heading, Text } from "@chakra-ui/layout";

const StorySection = (props) => {
  const { title, blurb } = props;
  return (
    <Flex direction="column">
      <Heading
        as="h2"
        fontSize={["4xl", "6xl"]}
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
        borderWidth="1px"
        borderRadius="20"
        // TODO-aparedan: change bgimage
        bgImage={`url('${process.env.PUBLIC_URL}/images/visitus/header-banner.jpg')`}
        bgPosition="center"
        bgSize="cover"
        px={[6, 12, 35]}
        py={[8, 16, 20]}
        mb={[4, 8]}
      ></Box>
      <Text color="black" textAlign="justify">
        {blurb[1]}
      </Text>
      <Box
        borderWidth="1px"
        borderRadius="20"
        // TODO-aparedan: change bgimage
        bgImage={`url('${process.env.PUBLIC_URL}/images/visitus/header-banner.jpg')`}
        bgPosition="center"
        bgSize="cover"
        px={[6, 12, 35]}
        py={[8, 16, 20]}
        mb={[4, 8]}
      ></Box>
      <Text color="black" textAlign="justify">
        {blurb[2]}
      </Text>
      <Text color="black" textAlign="justify">
        {blurb[3]}
      </Text>
    </Flex>
  );
};

export default StorySection;
