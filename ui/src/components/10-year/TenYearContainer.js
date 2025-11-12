import { Flex, Box, VStack } from '@chakra-ui/react';
import HeroSection from './HeroSection';
import Testimony from './Testimony';
import TenYearVideo from './TenYearVideo';
import OfferingSection from './OfferingSection';
import ClosingRemarks from './ClosingRemarks';
import TenYearTimeline from './TenYearTimeline';

import { tenYearTheme } from './theme';
const TenYearContainer = () => {
  const backgroundImage = `${process.env.PUBLIC_URL}/images/10-year/10y_bg.png`;

  return (
    <Flex direction="column" bgColor={tenYearTheme.colors.background}>
      <HeroSection />
      <Flex
        direction="column"
        backgroundImage={`url(${backgroundImage})`}
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        background
        align="center"
        height="100%"
      >
        <TenYearTimeline />
        <Testimony />
        <Box w="100%" px={[4, 8]}>
          <TenYearVideo />
        </Box>

        <OfferingSection
          title="Years: More To Come"
          subtitle="For a decade, we've witnessed God's       ransformative work in and through HMCC of Hong Kong. 

As we celebrate this 10-year milestone, we invite you to invest in the next chapter. 
Your generosity will enable us to respond to God’s call. We pray to see more lives being transformed, LIFE Groups multiplied, churches planted, people being sent out for global missions, and so much more.

Join us to see God transforming lives and transforming the world through HMCC-HK in the coming years! "
        />

        <ClosingRemarks />
      </Flex>
    </Flex>
  );
};

export default TenYearContainer;
