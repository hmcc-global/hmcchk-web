import { Flex } from "@chakra-ui/react";
import AboutSection from "./AboutSection";
import EventsSection from "./EventsSection";
import HeroSection from "./HeroSection";
import LifeGroupSection from "./LifeGroupSection";
import NewHereSection from "./NewHereSection";
const HomeContainer = (props) => {
  return (
    <Flex direction="column">
      <HeroSection />
      <EventsSection />
      <AboutSection />
      <LifeGroupSection />
      <NewHereSection />
    </Flex>
  );
};

export default HomeContainer;
