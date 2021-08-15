import {
  chakra,
  Box,
  Container,
  Flex,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import FeaturedEvent from "./FeaturedEvent";

const EventsSection = () => {
  return (
    <Flex w="full" h="100vh" direction="column">
      <Container
        maxW={["container.md", "container.lg"]}
        justifyContent="center"
        display="flex"
        h="50%"
      >
        <VStack>
          <FeaturedEvent />
        </VStack>
      </Container>
      <Box
        w="full"
        height="50vh"
        display="flex"
        justifyContent="flex-start"
        overflowX="auto"
        overflowY="hidden"
        whiteSpace="nowrap"
      >
        <HStack spacing={4} padding={5} justifyContent="flex-start">
          <Box border="1px" bgColor="grey" w="500px" h={500 * 0.618}>
            TEST
          </Box>
          <Box border="1px" bgColor="grey" w="500px" h={500 * 0.618}>
            TEST
          </Box>
          <Box border="1px" bgColor="grey" w="500px" h={500 * 0.618}>
            TEST
          </Box>
          <Box border="1px" bgColor="grey" w="500px" h={500 * 0.618}>
            TEST
          </Box>
          <Box border="1px" bgColor="grey" w="500px" h={500 * 0.618}>
            TEST
          </Box>
        </HStack>
      </Box>
    </Flex>
  );
};

export default EventsSection;
