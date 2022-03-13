import { Center, Container, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const NoMatch = () => {
  return (
    <Container size="container.lg" minH="100vh">
      <Center>
        <VStack>
          <Text fontSize={["xl", "3xl"]} spacing="5">
            Uh-oh!
          </Text>
          <Text fontSize={["lg", "2xl"]} spacing="5">
            We can't seem to find the page you are looking for.
          </Text>
          <Text fontSize="md">
            <Link to="/connect">
              But if you're looking for a community, head right here
            </Link>
          </Text>
        </VStack>
      </Center>
    </Container>
  );
};

export default NoMatch;
