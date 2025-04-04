import { Box, useBreakpointValue } from '@chakra-ui/react';

import RedeemedAndChosenSection from './RedeemedAndChosenSection';

const EasterPageContainer = (props) => {
  const imageSrc = useBreakpointValue({
    base: process.env.PUBLIC_URL + 'images/easter-2025/easter-mobile.png',
    md: process.env.PUBLIC_URL + 'images/easter-2025/easter-desktop.png',
  });

  return (
    <>
      {/* <Box
        width="100%"
        height={0}
        backgroundImage={imageSrc}
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        paddingTop={{base: "350%", md: "120%"}}
      >
      </Box> */}
      <RedeemedAndChosenSection />
    </>
  );
};

export default EasterPageContainer;
