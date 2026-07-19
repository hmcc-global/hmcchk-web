import { VStack, Heading, Text } from '@chakra-ui/react';
import React from 'react';

// Shared layout for each tab panel: a serif heading, a body paragraph, then
// the tab-specific visual passed as children.
const CommitmentPanel = ({ heading, body, children }) => {
  return (
    <VStack
      spacing={{ base: '1.25rem', md: '2rem' }}
      align="center"
      w="100%"
      pt={{ base: '1.5rem', md: '2.5rem' }}
    >
      <Heading
        as="h3"
        fontFamily="DMSerifDisplay_Italic"
        fontWeight={400}
        textTransform="capitalize"
        fontSize={{ base: '1.5rem', md: '1.875rem' }}
        color="#000000"
        textAlign="center"
      >
        {heading}
      </Heading>
      <Text
        fontFamily="Manrope"
        fontWeight={500}
        fontSize={{ base: '0.875rem', md: '1.125rem' }}
        letterSpacing="0.0125rem"
        color="#000000"
        textAlign="center"
        maxW="820px"
      >
        {body}
      </Text>
      {children}
    </VStack>
  );
};

export default CommitmentPanel;
