import { Flex } from '@chakra-ui/react';
import EasterHero from './EasterHero';
import YouAreInvitedSection from './YouAreInvitedSection';
import RedeemedAndChosenSection from './RedeemedAndChosenSection';
import InstagramSection from './InstagramSection';

const EasterPageContainer = (props) => {
  return (
    <Flex direction="column" mt="-7vh">
      <EasterHero />
      <RedeemedAndChosenSection />
      <YouAreInvitedSection />
      <Flex direction="column">
        <InstagramSection />
      </Flex>
    </Flex>
  );
};

export default EasterPageContainer;
