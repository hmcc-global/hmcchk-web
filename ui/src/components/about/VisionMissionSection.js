import {
  Box,
  Container,
  VStack,
  Stack,
  Text,
  Heading,
} from '@chakra-ui/layout';
import {
  Image,
  Button,
  Link,
} from '@chakra-ui/react';
import { saturateText } from '../home/SaturateVisionSection';

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
          id="vision-mission"
        >
        <Box
          w="100%"
          borderWidth="1px"
          borderRadius="7"
          shadow="md"
          bgImage={`url('${process.env.PUBLIC_URL}/images/home/saturate-bg.png')`}
          bgPosition="center"
          bgSize="cover"
          display="flex"
          flexDir="column"
          justifyContent="center"
          padding={8}
        >
          <Stack
            w="100%"
            direction={['column', 'row']}
            justify="center"
            alignItems='center'
            spacing={[6, null]}
          >
            <VStack
              w={['85%', '35%']}
              align='center'
              spacing={[6, 8]}
            >
              <Image
                src={process.env.PUBLIC_URL + '/images/home/saturate-logo.png'}
                w={['90%']}
              />
            </VStack>
            <VStack
              maxW={['100%', '50%']}
              align='center'
              spacing={[6, 8]}
            >
              <Text fontSize={['0.9em', '1.0em']} textAlign={['justify']}>
                {saturateText.text}
              </Text>
              <Button
                alignSelf='center'
                bg="white"
                variant="outline"
                color="#0628A3"
                borderColor="#0628A3"
                borderWidth="2px"
                w={['45%', '38.2%']}
                _hover={{
                  bg: '#0628A3',
                  color: 'white',
                  borderColor: '#0628A3',
                  textDecoration: 'none',
                }}
                fontSize="1.2em"
              >
                {/* TODO-aparedan: Chagne this link */}
                <Link to={{ pathname: '/connect', hash: '#lifegroup' }}>
                  Learn More
                </Link>
              </Button>
            </VStack>
          </Stack>
        </Box>
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
