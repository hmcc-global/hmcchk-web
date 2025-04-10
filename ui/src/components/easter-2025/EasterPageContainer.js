import { Box, Flex } from '@chakra-ui/react';
import EasterHero from './EasterHero';
import EasterStorySection from './EasterStorySection';
import YouAreInvitedSection from './YouAreInvitedSection';
import RedeemedAndChosenSection from './RedeemedAndChosenSection';
import InstagramSection from './InstagramSection';

const EasterPageContainer = (props) => {
  return (
    <Flex direction="column" mt="-7vh">
      <EasterHero />

      <Box
        backgroundImage={{
          base: `${process.env.PUBLIC_URL}/images/easter-2025/bg-mobile.png`,
          md: `${process.env.PUBLIC_URL}/images/easter-2025/bg-web.png`,
        }}
        backgroundSize="cover"
        backgroundRepeat="no-repeat"
        backgroundPosition={{ base: '0 -245vw', md: '0 -45vw', lg: '0 -40vw' }}
      >
        <EasterStorySection />
        <RedeemedAndChosenSection />
        <YouAreInvitedSection />
        <Flex direction="column" mt="7vh">
          <InstagramSection />
        </Flex>
      </Box>
    </Flex>
  );
};

export default EasterPageContainer;
