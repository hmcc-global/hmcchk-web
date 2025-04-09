import { Box, Flex, Image } from '@chakra-ui/react';
import EasterHero from './EasterHero';
import YouAreInvitedSection from './YouAreInvitedSection';
import RedeemedAndChosenSection from './RedeemedAndChosenSection';
import InstagramSection from './InstagramSection';

const EasterPageContainer = (props) => {
  return (
    <Flex direction="column" mt="-7vh">
      <EasterHero />
      <Box
        backgroundImage={
          process.env.PUBLIC_URL + '/images/easter-2025/bg-blur.jpg'
        }
        backgroundSize="cover"
        backgroundRepeat="no-repeat"
      >
        <RedeemedAndChosenSection />
        <YouAreInvitedSection />
      </Box>
      <Flex direction="column" mt="7vh">
        <InstagramSection />
      </Flex>
    </Flex>
  );
};

export default EasterPageContainer;
