import React from 'react';
import { Box, Container, Fade, useTheme } from '@chakra-ui/react';
import { InView } from 'react-intersection-observer';
import EasterBanner from './EasterBanner';

const EasterContainer = () => {
  const theme = useTheme();

  return (
    <InView rootMargin="-50px" triggerOnce={true}>
      {({ inView, ref }) => (
        <Fade transition={{ enter: { duration: 1 } }} in={inView}>
          <Box
            background="linear-gradient(180deg, #F6FAFF 0%, #FFF7E2 23.56%, #F9E6DB 65.87%, #F6FAFF 92.79%)"
            minH="1800px"
            py={8}
            fontFamily={theme.fonts?.body}
            ref={ref}
          >
            <Container maxW="container.xl" px={{ base: 6, md: 10 }}>
              <EasterBanner />
            </Container>
          </Box>
        </Fade>
      )}
    </InView>
  );
};

export default EasterContainer;
