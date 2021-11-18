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
      w={["20em", "25em"]}
      h={["15em", "10em"]}
      borderWidth="1px"
      borderRadius="20"
      // TODO-aparedan: change bgimage
      // bgImage={`url('${process.env.PUBLIC_URL}/images/visitus/header-banner.jpg')`}
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
        fontSize={["2xl", "4xl"]}
        fontWeight={700}
        lineHeight={1}
        color="#0628A3"
        textAlign="center"
      >
        {title}
      </Heading>
      <Text color="black" fontSize={["xs", "sm"]} textAlign="center">
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
      bgImage={`url('${process.env.PUBLIC_URL}/images/visitus/header-banner.jpg')`}
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
