import React from 'react';
import { Box, Container, Heading, Text, Stack, Image, Button, useTheme } from '@chakra-ui/react';

const EasterContainer = () => {
  const theme = useTheme();

  return (
    <Box 
      background="linear-gradient(180deg, #F6FAFF 0%, #FFF7E2 23.56%, #F9E6DB 65.87%, #F6FAFF 92.79%)"
      minH="1800px"
      py={8} 
      fontFamily={theme.fonts?.body}
    >
      <Container maxW="container.lg">

      </Container>
    </Box>
  );
};

export default EasterContainer;
