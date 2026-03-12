import React from 'react';
import { Box, Container, useTheme } from '@chakra-ui/react';
import EasterBanner from './EasterBanner';
import EasterTestimony from './EasterTestimony';

const EasterContainer = () => {
  const theme = useTheme();

  return (
    <Box
      background="linear-gradient(180deg, #F6FAFF 0%, #FFF7E2 23.56%, #F9E6DB 65.87%, #F6FAFF 92.79%)"
      minH="1800px"
      py={8}
      fontFamily={theme.fonts?.body}
    >
      <Container maxW="container.xl" px={{ base: 6, md: 10 }}>
        <EasterBanner />
        <EasterTestimony />
      </Container>
    </Box>
  );
};

export default EasterContainer;
