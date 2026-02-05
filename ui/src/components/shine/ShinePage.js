import { Flex, Box } from '@chakra-ui/react';
import HeroSection from './HeroSection';
import ValuesSection from './ValuesSection';
import ApproachSection from './ApproachSection';
import PastOpportunitiesSection from './PastOpportunitiesSection';

import ShineInvolve from './ShineInvolve';
import ContactUs from './ContactUs';

const ShinePage = (props) => {
  return (
    <Flex direction="column" bgColor="#F6FAFF">
      <HeroSection />
      <Flex
        alignSelf="center"
        direction="column"
        justifyContent="space-between"
        w={{ base: '100%', md: '85%' }}
        maxW="container.xl"
        m={{ base: '1', md: '3' }}
        px={{ base: 4, md: 6, lg: 8 }}
        gap={{ base: '3', md: '6', lg: '8' }}
      >
        <Box marginBottom={{ base: 10, md: 20 }}>
          <ValuesSection />
        </Box>
        <Box marginBottom={{ base: 10, md: 20 }}>
          <ApproachSection />
        </Box>
        {/* Add components and content for the Shine page here */}
        <PastOpportunitiesSection />
        <ShineInvolve />
        <ContactUs />
      </Flex>
    </Flex>
  );
};

export default ShinePage;
