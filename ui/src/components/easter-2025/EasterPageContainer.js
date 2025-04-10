import { Box, Flex, Image } from '@chakra-ui/react';
import EasterHero from './EasterHero';
import YouAreInvitedSection from './YouAreInvitedSection';
import RedeemedAndChosenSection from './RedeemedAndChosenSection';
import InstagramSection from './InstagramSection';
import ShareAndInviteSection from './ShareAndInviteSection';

const EasterPageContainer = (props) => {
  return (
    <Flex
      direction="column"
      mt="-7vh"
      backgroundImage={{
        base: `${process.env.PUBLIC_URL}/images/easter-2025/BG_Mobile-sm.png`,
        md: `${process.env.PUBLIC_URL}/images/easter-2025/web.png`,
      }}
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      backgroundPosition={{ base: '0 -245vw', md: '0 -45vw', lg: '0 -40vw' }}
    >
      <EasterHero />
      <Box>
        <RedeemedAndChosenSection />
        <YouAreInvitedSection />
        <ShareAndInviteSection />
      </Box>
      <Flex
        direction="column"
        mt="4vh"
        backgroundColor="white"
        mx="6%"
        borderRadius={24}
        mb="10vh"
      >
        <InstagramSection />
      </Flex>
    </Flex>
  );
};

export default EasterPageContainer;
