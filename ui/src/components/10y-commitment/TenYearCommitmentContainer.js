import { Flex } from '@chakra-ui/react';
import TenYearHeroSection from './TenYearHeroSection';
import TenYearHeartSection from './TenYearHeartContainer';

const TenYearCommitmentContainer = () => {
  return (
    <Flex direction="column">
      <TenYearHeroSection />
      <TenYearHeartSection />
    </Flex>
  );
};

export default TenYearCommitmentContainer;
