import { Heading, Text } from '@chakra-ui/react';
import React from 'react';
import { MotionBox, MotionVStack, fadeUp, staggerContainer } from './motion';

// Shared layout for each tab panel: a serif heading, a body paragraph, then
// the tab-specific visual passed as children. The whole panel staggers itself
// in on mount, which (with the tabs set to unmount inactive panels) means the
// content animates each time you switch to a tab.
const CommitmentPanel = ({ heading, body, children }) => {
  return (
    <MotionVStack
      spacing={{ base: '1.25rem', md: '2rem' }}
      align="center"
      w="100%"
      pt={{ base: '1.5rem', md: '2.5rem' }}
      variants={staggerContainer}
      initial="hidden"
      animate="show"
    >
      <MotionBox variants={fadeUp} w="100%">
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
      </MotionBox>
      <MotionBox variants={fadeUp} w="100%">
        <Text
          fontFamily="Manrope"
          fontWeight={500}
          fontSize={{ base: '0.875rem', md: '1.125rem' }}
          letterSpacing="0.0125rem"
          color="#000000"
          textAlign="center"
          maxW="820px"
          mx="auto"
        >
          {body}
        </Text>
      </MotionBox>
      <MotionBox
        variants={fadeUp}
        w="100%"
        display="flex"
        justifyContent="center"
      >
        {children}
      </MotionBox>
    </MotionVStack>
  );
};

export default CommitmentPanel;
