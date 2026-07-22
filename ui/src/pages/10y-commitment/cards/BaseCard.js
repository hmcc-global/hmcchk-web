import { VStack, Box, Heading, Text } from 'components';
import React from 'react';
import { COLORS } from '../constants';

const BaseCard = ({ title, subtitle, children, footer }) => {
  return (
    <VStack
      spacing={{ base: '0.75rem', md: '1.25rem' }}
      p={{ base: '1.5rem' }}
      bg={COLORS.cardGradient}
      borderRadius="1.25rem"
      align="stretch"
      flex={1}
      h="100%"
      w="100%"
      minW={0}
    >
      <VStack spacing={{ base: '0.75rem', md: '1.5rem' }} align="center">
        <Heading
          as="h4"
          fontSize={{ base: '1.56rem', md: '1.75rem' }}
          fontWeight={400}
          color="#FFFFFF"
          fontFamily="DMSerifDisplay_Italic"
          textAlign="center"
        >
          {title}
        </Heading>
        <Text
          fontSize={{ base: '0.813rem', md: '1.25rem' }}
          fontWeight={800}
          color={COLORS.lightBlue}
          fontFamily="Manrope"
          textTransform="uppercase"
          textAlign="center"
          letterSpacing="0.125rem"
        >
          {subtitle}
        </Text>
      </VStack>

      <Box flex={1} w="100%" display="flex" flexDirection="column" minH={0}>
        {children}
      </Box>

      {footer && (
        <Box w="100%" mt="auto" pt={{ base: '1rem', md: '1.5rem' }}>
          {footer}
        </Box>
      )}
    </VStack>
  );
};

export default BaseCard;
