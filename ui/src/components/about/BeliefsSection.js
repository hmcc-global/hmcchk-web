import {
  Flex,
  Text,
  Heading,
  Center,
  Box,
  SimpleGrid,
  Container,
} from "@chakra-ui/react";

const BeliefsSection = (props) => {
  const { title, blurb } = props;
  return (
    <Container maxW="container.lg">
      <Flex direction="column">
        <Center padding="5">
          <Heading
            as="h2"
            fontSize={["4xl", "6xl"]}
            fontWeight={700}
            lineHeight={1}
            textAlign="center"
            mb={5}
          >
            {title}
          </Heading>
        </Center>
        <SimpleGrid columns={[1, 1, 3]} spacingX="1" spacingY="1">
          <Box
            borderWidth="1px"
            borderRadius="20"
            shadow="lg"
            bg="#F8F8F8"
            px={[4, 8]}
            pt={[4, 6]}
            pb={[4, 6]}
            m={[0, 0, 4]}
            h={["16em", "16em", "18em"]}
            w={["full", "full", "19em"]}
          >
            <Box>
              <Text fontWeight="bold" color="#2C5282" fontSize="xl">
                {blurb.head[0]}
              </Text>
              <Text color="#2C5282" fontSize="sm">
                {blurb.body[0]}
              </Text>
            </Box>
          </Box>

          <Box
            borderWidth="1px"
            borderRadius="20"
            shadow="lg"
            bg="#F8F8F8"
            px={[4, 8]}
            pt={[4, 6]}
            pb={[4, 6]}
            m={[0, 0, 4]}
            h={["16em", "16em", "18em"]}
            w={["full", "full", "19em"]}
          >
            <Box>
              <Text fontWeight="bold" color="#2C5282" fontSize="xl">
                {blurb.head[1]}
              </Text>
              <Text color="#2C5282" fontSize="sm">
                {blurb.body[1]}
              </Text>
            </Box>
          </Box>
          <Box
            borderWidth="1px"
            borderRadius="20"
            shadow="lg"
            bg="#F8F8F8"
            px={[4, 8]}
            pt={[4, 6]}
            pb={[4, 6]}
            m={[0, 0, 4]}
            h={["16em", "16em", "18em"]}
            w={["full", "full", "19em"]}
          >
            <Box>
              <Text fontWeight="bold" color="#2C5282" fontSize="xl">
                {blurb.head[2]}
              </Text>
              <Text color="#2C5282" fontSize="sm">
                {blurb.body[2]}
              </Text>
            </Box>
          </Box>
          <Box
            borderWidth="1px"
            borderRadius="20"
            shadow="lg"
            bg="#F8F8F8"
            px={[4, 8]}
            pt={[4, 6]}
            pb={[4, 6]}
            m={[0, 0, 4]}
            h={["16em", "16em", "18em"]}
            w={["full", "full", "19em"]}
          >
            <Box>
              <Text fontWeight="bold" color="#2C5282" fontSize="xl">
                {blurb.head[3]}
              </Text>
              <Text color="#2C5282" fontSize="sm">
                {blurb.body[3]}
              </Text>
            </Box>
          </Box>
          <Box
            borderWidth="1px"
            borderRadius="20"
            shadow="lg"
            bg="#F8F8F8"
            px={[4, 8]}
            pt={[4, 6]}
            pb={[4, 6]}
            m={[0, 0, 4]}
            h={["16em", "16em", "18em"]}
            w={["full", "full", "19em"]}
          >
            <Box>
              <Text fontWeight="bold" color="#2C5282" fontSize="xl">
                {blurb.head[4]}
              </Text>
              <Text color="#2C5282" fontSize="sm">
                {blurb.body[4]}
              </Text>
            </Box>
          </Box>
          <Box
            borderWidth="1px"
            borderRadius="20"
            shadow="lg"
            bg="#F8F8F8"
            px={[4, 8]}
            pt={[4, 6]}
            pb={[4, 6]}
            m={[0, 0, 4]}
            h={["16em", "16em", "18em"]}
            w={["full", "full", "19em"]}
          >
            <Box>
              <Text fontWeight="bold" color="#2C5282" fontSize="xl">
                {blurb.head[5]}
              </Text>
              <Text color="#2C5282" fontSize="sm">
                {blurb.body[5]}
              </Text>
            </Box>
          </Box>
          <Box
            borderWidth="1px"
            borderRadius="20"
            shadow="lg"
            bg="#F8F8F8"
            px={[4, 8]}
            pt={[4, 6]}
            pb={[4, 6]}
            m={[0, 0, 4]}
            h={["16em", "16em", "18em"]}
            w={["full", "full", "19em"]}
          >
            <Box>
              <Text fontWeight="bold" color="#2C5282" fontSize="xl">
                {blurb.head[6]}
              </Text>
              <Text color="#2C5282" fontSize="sm">
                {blurb.body[6]}
              </Text>
            </Box>
          </Box>
          <Box
            borderWidth="1px"
            borderRadius="20"
            shadow="lg"
            bg="#F8F8F8"
            px={[4, 8]}
            pt={[4, 6]}
            pb={[4, 6]}
            m={[0, 0, 4]}
            h={["16em", "16em", "18em"]}
            w={["full", "full", "19em"]}
          >
            <Box>
              <Text fontWeight="bold" color="#2C5282" fontSize="xl">
                {blurb.head[7]}
              </Text>
              <Text color="#2C5282" fontSize="sm">
                {blurb.body[7]}
              </Text>
            </Box>
          </Box>
          <Box
            borderWidth="1px"
            borderRadius="20"
            shadow="lg"
            bg="#F8F8F8"
            px={[4, 8]}
            pt={[4, 6]}
            pb={[4, 6]}
            m={[0, 0, 4]}
            h={["16em", "16em", "18em"]}
            w={["full", "full", "19em"]}
          >
            <Box>
              <Text fontWeight="bold" color="#2C5282" fontSize="xl">
                {blurb.head[8]}
              </Text>
              <Text color="#2C5282" fontSize="sm">
                {blurb.body[8]}
              </Text>
            </Box>
          </Box>
        </SimpleGrid>
      </Flex>
    </Container>
  );
};

export default BeliefsSection;
