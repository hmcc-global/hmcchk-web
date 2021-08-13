import AboutSection from "./AboutSection";
import EventsSection from "./EventsSection";
import HeroSection from "./HeroSection";
import LifeGroupSection from "./LifeGroupSection";
import NewHereSection from "./NewHereSection";

const HomeContainer = (props) => {
  return (
    <>
      <HeroSection />
      <EventsSection />
      <AboutSection />
      <LifeGroupSection />
      <NewHereSection />
    </>
  );
};

export default HomeContainer;
