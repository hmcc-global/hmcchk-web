import React from 'react';
import { Box, Container, Heading, Text, Stack, Image, Button, useTheme } from '@chakra-ui/react';

const EasterContainer = () => {
  const theme = useTheme();

  return (
    <Box bg="linear-gradient(135deg, #FFF8DC 0%, #F0E68C 100%)" py={8} fontFamily={theme.fonts?.body}>
      <Container maxW="container.lg">
        Easter 2026: Living Hope
      </Container>
    </Box>
  );
};

export default EasterContainer;
