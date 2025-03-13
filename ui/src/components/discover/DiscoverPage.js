import {
  Box,
  Container,
  Heading,
  VStack,
  useMediaQuery,
  Flex,
} from '@chakra-ui/react';
import PastorGreeting from './PastorGreeting';
import ExperienceHmcc from './ExperienceHmcc';
import Faq from './Faq';
import LifeGroups from './LifeGroups';
import { useLocation } from 'react-router-dom';
import scrollTo from '../helpers/ScrollTo';
import { useEffect, useRef } from 'react';

const DiscoverPage = (props) => {
  const [isLargerThan768] = useMediaQuery('(min-width: 768px)');
  const { hash } = useLocation();

  useEffect(() => {
    switch (hash) {
      case '#lifegroup':
        scrollTo('lifegroup');
        break;
      case '#ministries':
        scrollTo('ministries');
        break;
      default:
        break;
    }
  }, [hash]);

  return (
    <Box background="linear-gradient(151.15deg, rgba(223, 231, 255, 1.0) 11.18%, rgba(255, 255, 255, 0.3) 42.46%, rgba(202, 220, 255, 0.3) 76.7%), linear-gradient(194.34deg, #FFE6E6 1.83%, #FFFFFF 51.22%, #D6FFEA 99.59%)">
      <Container maxW="container.xl" py={10}>
        <VStack spacing={[4, 7]} align="stretch">
          <Flex
            bgImage={
              // `linear-gradient(90deg, rgba(231, 187, 187, 0.71) 0%, rgba(89, 168, 212, 0.62) 100%), ` +
              `url(${process.env.PUBLIC_URL}/images/connect/connect-welcome.gif)`
            }
            bgSize="cover"
            bgPosition="center"
            borderRadius="20"
            minHeight={['30vh', '30vh', '40vh', '60vh']}
            alt="Connect"
            padding={6}
            flexDirection="column-reverse"
          >
            <Box align="left" pb="3%" color="white">
              <Heading
                fontFamily="DMSerifDisplay_Italic"
                as="h3"
                fontSize={['2.75em', '3.5em', '6em']}
                fontWeight={800}
                textAlign="left"
                filter="drop-shadow(0px 4px 7px rgba(0, 0, 0, 0.44))"
                // bgGradient="linear-gradient(90deg, #79A7FF 31.77%, #D77CD9 91.79%)"
                // bgClip="text"
                letterSpacing={[-1, -3]}
                w="fit-content"
                mb="-2"
              >
                Welcome!
              </Heading>
              <Heading
                as="h3"
                zIndex="1"
                fontSize={['1.5em', '2.5em', '4em']}
                fontWeight={700}
                textAlign="left"
                textShadow="0px 4px 7px rgba(0, 0, 0, 0.44)"
                letterSpacing={-1}
                fontFamily="DMSerifDisplay_Italic"
              >
                We're so glad you're here :)
              </Heading>
            </Box>
          </Flex>
          {/* <PastorGreeting /> */}
          <ExperienceHmcc />
          <LifeGroups isLargerThan768={isLargerThan768} />
          <Faq />
        </VStack>
      </Container>
    </Box>
  );
};

export default DiscoverPage;
