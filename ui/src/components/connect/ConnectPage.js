import {
  Box,
  Container,
  Heading,
  Image,
  VStack,
  useMediaQuery,
} from "@chakra-ui/react";
import ExperienceHmcc from "./ExperienceHmcc";
import Faq from "./Faq";
import OurMinistries from "./OurMinistries";
import LifeGroups from "./LifeGroups";

const ConnectPage = (props) => {
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  return (
    <Box background="linear-gradient(151.15deg, rgba(255, 244, 201, 0.3) 11.18%, rgba(255, 255, 255, 0.3) 42.46%, rgba(202, 220, 255, 0.3) 76.7%), linear-gradient(194.34deg, #FFE6E6 1.83%, #FFFFFF 51.22%, #D6FFEA 99.59%)">
      <Container maxW="container.lg" py={10}>
        <VStack spacing={[4, 12]} align="stretch">
          <Box>
            <Heading
              as="h1"
              fontSize={["2.25em", "3.5em", "6em"]}
              fontWeight={800}
              textAlign="left"
            >
              Welcome!
            </Heading>
            <Heading
              as="h2"
              fontSize={["1.5m", "2.5em", "4em"]}
              fontWeight={800}
              textAlign="left"
            >
              We're so glad you're here :)
            </Heading>
          </Box>
          {isLargerThan768 ? (
            <Image
              src={`${process.env.PUBLIC_URL}/images/connect/connect-collage.png`}
              alt="Connect collage"
            />
          ) : (
            <Image
              src={`${process.env.PUBLIC_URL}/images/connect/connect-collage-mobile.png`}
              alt="Connect collage"
            />
          )}
          <ExperienceHmcc />
          <OurMinistries />
          <LifeGroups isLargerThan768={isLargerThan768} />
          <Faq />
        </VStack>
      </Container>
    </Box>
  );
};

export default ConnectPage;
