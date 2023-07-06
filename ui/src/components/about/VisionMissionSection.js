import {
  Box,
  Container,
  VStack,
  Stack,
  Text,
  Heading,
} from '@chakra-ui/layout';

const VisionMissionCard = ({ title, message }) => {
  return (
    <Stack spacing="5" w="100%">
      <Heading
        as="h2"
        fontSize={['3xl', '5xl']}
        fontWeight={800}
        lineHeight={1}
        color="#0628A3"
        textAlign="center"
        display={['none', 'block']}
      >
        {title}
      </Heading>
      <Box
        w="100%"
        h={['12em', '7em']}
        minH="5em"
        borderWidth="1px"
        borderRadius="7"
        shadow="md"
        bgImage={`url('${process.env.PUBLIC_URL}/images/about/water.jpeg')`}
        bgPosition="center"
        bgSize="cover"
        display="flex"
        flexDir="column"
        justifyContent="center"
        px={[9, 5]}
      >
        <Heading
          as="h2"
          fontSize={['3xl', '5xl']}
          fontWeight={800}
          lineHeight={1}
          color="#0628A3"
          textAlign="center"
          mb={5}
          display={['block', 'none']}
        >
          {title}
        </Heading>
        <Text color="black" fontSize={['md', 'md']} textAlign="center">
          {message}
        </Text>
      </Box>
    </Stack>
  );
};

const VisionMissionSection = (props) => {
  const { blurb } = props;
  return (
    <Container w="100vw" maxW="container.lg">
      <VStack height="100%" justifyContent="center" padding={1}>
        <Stack
          direction={{ base: 'column', md: 'column' }}
          w="100%"
          height="100%"
          alignItems="center"
          justifyContent="center"
          spacing="5"
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
