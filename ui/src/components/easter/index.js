import HeroContainer from './hero/HeroContainer';
import InvitationContainer from './invitation/InvitationContainer';
import StoryContainer from './story/StoryContainer';
import { Container, Box } from '@chakra-ui/react';
import React from 'react';
import BackgroundElements from './BackgroundElements';
import BecauseJesus from './becauseJesus/BecauseJesus';
import BecauseJesusAnimation from './becauseJesus/BecauseJesusAnimation';

const EasterContainer = (props) => {
  return (
    <>
      <HeroContainer />
      {/* relative positioning to stack the elements */}
      <Box
        w="100vw"
        minH={['190em', '212em', '230em', '215em', '212em']}
        position="relative"
      >
        {/* z index is 0, appear behind */}
        <BackgroundElements />

        {/* z index is 1 *, appear in front */}
        <Box w="100%" position="absolute" top="0" zIndex="1">
          <Container maxW="container.lg">
            <StoryContainer />
            <BecauseJesusAnimation />
            <BecauseJesus />
            <InvitationContainer />
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default EasterContainer;
