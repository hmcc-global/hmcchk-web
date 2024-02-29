import { Box, Container, useBreakpointValue } from '@chakra-ui/react';
import EasterNavbar from './EasterNavbar';
import EasterBodyWeb from './EasterBodyWeb';
import EasterBodyMobile from './EasterBodyMobile';

const EasterContainer = (props) => {
  const isMobile = useBreakpointValue({ base: true, lg: false });

  return (
    <>
      <EasterNavbar />
      <Container maxW="container.lg" minHeight="fill" p={0}>
        <Box height="50px" />
        {isMobile ? <EasterBodyMobile /> : <EasterBodyWeb />}
      </Container>
    </>
  );
};

export default EasterContainer;
