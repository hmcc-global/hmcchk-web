import { Flex } from '@chakra-ui/react';
import InstagramSection from './InstagramSection';
import EasterHero from './EasterHero';

const EasterPageContainer = (props) => {
  return (
    <Flex direction="column" mt="-7vh">
      <EasterHero />
      <InstagramSection />
    </Flex>
  );
};

export default EasterPageContainer;
