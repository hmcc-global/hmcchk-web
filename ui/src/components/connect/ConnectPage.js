import { Box, Container, Heading, Text, VStack } from "@chakra-ui/react";
import ExperienceHmcc from "./ExperienceHmcc";
import Faq from "./Faq";
import OurMinistries from "./OurMinistries";

const ConnectPage = (props) => {
  return (
    <Container maxW="container.xl" py={10}>
      <VStack spacing={[4, 12]} align="stretch">
        <Box>
          <Heading
            as="h1"
            fontSize={["2.25em", "6em"]}
            fontWeight={800}
            textAlign="left"
          >
            Welcome!
          </Heading>
          <Heading
            as="h2"
            fontSize={["1.5m", "4em"]}
            fontWeight={800}
            textAlign="left"
          >
            We're so glad you're here :)
          </Heading>
        </Box>
        <ExperienceHmcc />
        <OurMinistries />
        <Faq />
      </VStack>
    </Container>
  );
};

export default ConnectPage;
