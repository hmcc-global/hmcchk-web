import { Flex, Text, Box, Stack, Spacer } from '@chakra-ui/react';
import AboutSection from './AboutSection';

const AboutContainer = () => {
  return (
    <Flex
      w="full"
      h="100vh"
      justify="center"
      bgImage="linear-gradient(90deg, #0FB4BE 33%, rgba(0, 0, 0, 0) 33%), linear-gradient(90deg, #FFDC82 66%, #F39371 66%)"
    >
      <AboutSection />
    </Flex>
  );
};

export default AboutContainer;
