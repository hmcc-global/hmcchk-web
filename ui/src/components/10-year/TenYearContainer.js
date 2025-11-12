import { Flex } from '@chakra-ui/react';
import FakeFullPageSection from './FakeFullPageSection';
import TenYearTimeline from './TenYearTimeline';

const TenYearContainer = () => {
  const handleExit = () => {
    // Optionally navigate or reveal next section after timeline
    // This container is minimal and lets the parent page continue naturally
  };

  return (
    <Flex direction="column" bgColor="#000214">
      <FakeFullPageSection
        title="Our Journey"
        subtitle="Celebrating 10 years of God's faithfulness"
      />
      <TenYearTimeline onExit={handleExit} />
      <FakeFullPageSection
        title="Looking Forward"
        subtitle="The next chapter of our story"
      />
    </Flex>
  );
};

export default TenYearContainer;
