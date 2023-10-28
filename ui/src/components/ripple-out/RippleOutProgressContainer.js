import ProgressSection from './ProgressSection';
import RippleOutFaqSection from './RippleOutFaqSection';
import RippleOutHeroSection from './RippleOutHeroSection';

const RippleOutProgressContainer = () => {
  return (
    <>
      <RippleOutHeroSection />
      <ProgressSection />
      <RippleOutFaqSection pageTopic="ripple-out-progress" />
    </>
  );
};

export default RippleOutProgressContainer;
