import { Flex } from '@chakra-ui/react';
import TenYearHeroSection from './TenYearHeroSection';
import TenYearHeartSection from './TenYearHeartContainer';
import WaysToParticipate from './WaysToParticipate';

const TenYearCommitmentContainer = () => {
  return (
    <Flex direction="column">
      <TenYearHeroSection />
      <TenYearHeartSection />
      <WaysToParticipate />
    </Flex>
  );
};

export default TenYearCommitmentContainer;
