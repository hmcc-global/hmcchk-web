import { Flex, useBreakpointValue } from '@chakra-ui/react';
import HeroSection from './HeroSection';

const TenYearCommitmentContainer = (props) => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Flex direction="column" bgColor="#F6FAFF">
      <HeroSection />
    </Flex>
  );
};

export default TenYearCommitmentContainer;
