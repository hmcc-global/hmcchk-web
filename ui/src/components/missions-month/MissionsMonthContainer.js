import { Container, Flex, VStack } from '@chakra-ui/react';

import MissionTab from './MissionsMonthTabs';

const MissionsMonthContainer = () => {
  return (
    <VStack width="100%">
      <Container minH="100px">Top</Container>
      <Container minW="100%">
        <MissionTab />
      </Container>
    </VStack>
  );
};

export default MissionsMonthContainer;
