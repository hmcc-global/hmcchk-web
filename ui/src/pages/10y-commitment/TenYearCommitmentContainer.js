import React from 'react';
import { Flex } from 'components';
import TenYearHeroSection from './TenYearHeroSection';
import ThreeFoldCommitment from './ThreeFoldCommitment';
import TenYearHeartSection from './TenYearHeartContainer';
import WaysToParticipate from './WaysToParticipate';

const TenYearCommitmentContainer = () => {
  return (
    <Flex direction="column" sx={{ overscrollBehaviorX: 'none' }}>
      <TenYearHeroSection />
      <ThreeFoldCommitment />
      <TenYearHeartSection />
      <WaysToParticipate />
    </Flex>
  );
};

export default TenYearCommitmentContainer;
