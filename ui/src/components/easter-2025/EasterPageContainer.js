import { Box, useBreakpointValue } from '@chakra-ui/react';
import EasterHero from './EasterHero';
const EasterPageContainer = (props) => {
  const imageSrc = useBreakpointValue({
    base: process.env.PUBLIC_URL + 'images/easter-2025/easter-mobile.png',
    md: process.env.PUBLIC_URL + 'images/easter-2025/easter-desktop.png',
  });

  return (
    <>
      <EasterHero />
      <Box></Box>
    </>
  );
};

export default EasterPageContainer;
