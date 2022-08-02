import { Container, Flex, Heading, Text, VStack } from '@chakra-ui/react';

const vision = {
  title: 'VISION',
  text: 'Multiplying churches in campuses and cities to transform the next generation among the nations.',
};
const mission = {
  title: 'MISSION',
  text: 'To transform lost people into Christ’s disciples who will then transform the world.',
};

const AboutSection = () => {
  return (
    <Flex
      w="full"
      h={{ base: '100vh', md: 'auto' }}
      justify="center"
      bgImage={process.env.PUBLIC_URL + '/images/home/about-us-bg.png'}
      bgSize="cover"
      bgPosition="center center"
    >
      <Flex
        w="full"
        h={{ base: '100vh', md: '80vh' }}
        justify="center"
        style={{ backdropFilter: 'blur(7px)' }}
      >
        <Container
          maxW={['container.md', 'container.lg']}
          justifyContent="center"
          display="flex"
        >
          <VStack
            rowGap={12}
            w="full"
            justify="center"
            spacing={8}
            padding="2rem"
          >
            <VStack rowGap={2}>
              <Heading fontSize="4xl" color="#0628A3">
                {vision.title}
              </Heading>
              <Text
                fontWeight={400}
                textAlign="center"
                fontSize="xl"
                width="80%"
              >
                {vision.text}
              </Text>
            </VStack>
            <VStack rowGap={2}>
              <Heading fontSize="4xl" color="#0628A3">
                {mission.title}
              </Heading>
              <Text
                fontWeight={400}
                textAlign="center"
                fontSize="xl"
                width="80%"
              >
                {mission.text}
              </Text>
            </VStack>
          </VStack>
        </Container>
      </Flex>
    </Flex>
  );
};

export default AboutSection;
