import { Box, Container, Flex, Heading, Text, VStack } from "@chakra-ui/layout";

const AboutBanner = (props) => {
  return (
    <Container maxW="container.lg" py={10}>
      <VStack>
        <Box
          borderWidth="1px"
          borderRadius="20"
          bgImage={`url('${process.env.PUBLIC_URL}/images/visitus/header-banner.jpg')`}
          bgPosition="center"
          bgSize="cover"
          px={[6, 12, 36]}
          py={[8, 16, 20]}
          mb={[4, 0]}
        >
          <Heading
            as="h2"
            fontSize={["4xl", "6xl"]}
            fontWeight={700}
            lineHeight={1}
            color="white"
            textAlign="center"
            mb={5}
          >
            About Us
          </Heading>
          <Text
            color="white"
            fontSize={["md", "xl"]}
            fontWeight={600}
            textAlign="center"
            mb={[0, 5]}
          ></Text>
        </Box>
      </VStack>
    </Container>
  );
};

export default AboutBanner;
