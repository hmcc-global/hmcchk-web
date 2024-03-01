import { Box, Container, useBreakpointValue } from '@chakra-ui/react';
import EasterNavbar from './EasterNavbar';
import EasterBodyWeb from './EasterBodyWeb';
import EasterBodyMobile from './EasterBodyMobile';
import { useEffect } from 'react';
const EasterContainer = (props) => {
  const isMobile = useBreakpointValue({ base: true, lg: false });

  return (
    <Box overflow="initial">
      <EasterNavbar />
      <Container maxW="container.lg" minHeight="fill" p={0} scrollBehavior="smooth">
        {isMobile ? <EasterBodyMobile /> : <EasterBodyWeb />}
      </Container>
    </Box>
  );
};

export default EasterContainer;
