import {
  Box,
  Container,
  Heading,
  Image,
  VStack,
  useMediaQuery,
  Flex,
} from '@chakra-ui/react';
import ExperienceHmcc from './ExperienceHmcc';
import Faq from './Faq';
import LifeGroups from './LifeGroups';

const ConnectPage = (props) => {
  const [isLargerThan768] = useMediaQuery('(min-width: 768px)');
  return (
    <Box background="linear-gradient(151.15deg, rgba(255, 244, 201, 0.3) 11.18%, rgba(255, 255, 255, 0.3) 42.46%, rgba(202, 220, 255, 0.3) 76.7%), linear-gradient(194.34deg, #FFE6E6 1.83%, #FFFFFF 51.22%, #D6FFEA 99.59%)">
      <Container maxW="container.lg" py={10}>
        <VStack spacing={[4, 12]} align="stretch">
          <Flex
            justifyContent="center"
            flexDirection={isLargerThan768 ? 'row' : 'column'}
            mt={7}
          >
            <Box>
              <Heading
                as="h3"
                fontSize={['2.25em', '3.5em', '6em']}
                fontWeight={800}
                textAlign="left"
                bgGradient="linear-gradient(90deg, #79A7FF 31.77%, #D77CD9 91.79%)"
                bgClip="text"
                letterSpacing={-3}
              >
                Welcome!
              </Heading>
              <Heading
                as="h3"
                fontSize={['1.5m', '2.5em', '4em']}
                fontWeight={700}
                textAlign="left"
                letterSpacing={-1}
              >
                We're so glad you're here :)
              </Heading>
            </Box>
            <Image
              src={`${process.env.PUBLIC_URL}/images/connect/connect.png`}
              alt="Connect"
              width={550}
              padding={6}
            />
          </Flex>
          <ExperienceHmcc />
          <LifeGroups isLargerThan768={isLargerThan768} />
          <Faq />
        </VStack>
      </Container>
    </Box>
  );
};

export default ConnectPage;
