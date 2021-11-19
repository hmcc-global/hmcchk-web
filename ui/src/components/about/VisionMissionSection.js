import {
  Box,
  Container,
  VStack,
  Stack,
  Text,
  Heading,
} from "@chakra-ui/layout";

const VisionMissionCard = ({ title, message }) => {
  return (
    <Box
      w={["20em", "30em"]}
      h={["15em", "13em"]}
      borderWidth="1px"
      borderRadius="20"
      bgColor="#FFFFFF"
      bgPosition="center"
      bgSize="cover"
      display="flex"
      flexDir="column"
      justifyContent="center"
      px={2}
    >
      <Heading
        as="h2"
        fontSize={["2xl", "5xl"]}
        fontWeight={800}
        lineHeight={1}
        color="#0628A3"
        textAlign="center"
        mb={1}
      >
        {title}
      </Heading>
      <Text color="black" fontSize={["sm", "md"]} textAlign="center">
        {message}
      </Text>
    </Box>
  );
};

const VisionMissionSection = (props) => {
  const { blurb } = props;
  return (
    <Container
      w="100vw"
      padding={0}
      maxW="unset"
      h={["100vh", "31.25vw"]}
      bgImage={`url('${process.env.PUBLIC_URL}/images/about/visionMissionBg.png')`}
    >
      <VStack height="100%" justifyContent="center">
        <Stack
          direction={["column", "row"]}
          w="100%"
          height="100%"
          alignItems="center"
          justifyContent="space-evenly"
        >
          {blurb && blurb.vision && (
            <VisionMissionCard title="VISION" message={blurb.vision} />
          )}
          {blurb && blurb.mission && (
            <VisionMissionCard title="MISSION" message={blurb.mission} />
          )}
        </Stack>
      </VStack>
    </Container>
  );
};

export default VisionMissionSection;
