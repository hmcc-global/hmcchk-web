import { Flex, Container } from '@chakra-ui/react';
import MissionsMonthHero from './MissionsMonthHero';
import MissionsMonthVerse from './MissionsMonthVerse';
import MissionsMonthVideo from './MissionsMonthVideo';
import MissionTab from "./MissionsMonthTabs";

const MissionsMonthContainer = () => {
  return (
    <Flex direction="column">
      <MissionsMonthHero />
      <MissionsMonthVerse />
      <MissionsMonthVideo />
      <Container minW="100%">
        <MissionTab />
      </Container>
    </Flex>
  );
};

export default MissionsMonthContainer;
