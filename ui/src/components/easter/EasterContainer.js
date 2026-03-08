import React from 'react';
import { Box, Container, useTheme } from '@chakra-ui/react';
import EasterInvitationSection from './EasterInvitationSection';

const EasterContainer = () => {
  const theme = useTheme();

  return (
    <Box fontFamily={theme.fonts?.body}>
      {/* Banner Section - Placeholder for future implementation */}
      <Box
        bg="linear-gradient(180deg, #F6FAFF 0%, #FFF7E2 23.56%, #F9E6DB 65.87%, #F6FAFF 92.79%)"
        py={[12, 16, 20]}
        fontFamily={theme.fonts?.body}
        position="relative"
        overflow="hidden"
      >
        <Container maxW="container.lg">
          {/* <Heading textAlign="center">Easter 2026: Living Hope</Heading> */}

          {/* Invitation Section */}
          <EasterInvitationSection />
        </Container>
      </Box>

      {/* Testimonies Section - Placeholder for future implementation */}
      {/* <Box bg="gray.50" py={8}>
        <Container maxW="container.lg">
          <Text textAlign="center" color="gray.600">Testimonies Section - Coming Soon</Text>
        </Container>
      </Box> */}
    </Box>
  );
};

export default EasterContainer;
