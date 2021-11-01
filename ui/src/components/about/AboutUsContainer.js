import { Flex } from "@chakra-ui/layout";
import AboutBanner from "./AboutBanner";
import BeliefsSection from "./BeliefsSection";
import StaffSection from "./StaffSection";
import StorySection from "./StorySection";
import StrategySection from "./StrategySection";
import ValuesSection from "./ValuesSection";
import VisionMissionSection from "./VisionMissionSection";

const AboutUsContainer = (props) => {
  return (
    <Flex direction="column" justifyContent="center">
      <AboutBanner />
      <StorySection />
      <VisionMissionSection />
      <ValuesSection />
      <StrategySection />
      <StaffSection />
      <BeliefsSection />
    </Flex>
  );
};

export default AboutUsContainer;
