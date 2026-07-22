import { VStack, Box, Heading, Text } from 'components';
import React from 'react';
import { COLORS, TYC_CARD_SUBTITLE, TYC_CARD_TITLE } from '../constants';

const BaseCard = ({ title, subtitle, children, footer }) => {
  return (
    <VStack
      spacing={{ base: '0.75rem', md: '1.25rem' }}
      p={{ base: '1.5rem' }}
      bg={COLORS.cardGradient}
      borderRadius="1.25rem"
      align="stretch"
      flex={1}
      h={footer ? 'auto' : '100%'}
      w="100%"
      minW={0}
    >
      <VStack spacing={{ base: '0.75rem', md: '1.5rem' }} align="center">
        <Heading as="h4" {...TYC_CARD_TITLE} color="#FFFFFF" textAlign="center">
          {title}
        </Heading>
        <Text
          {...TYC_CARD_SUBTITLE}
          color={COLORS.lightBlue}
          textAlign="center"
        >
          {subtitle}
        </Text>
      </VStack>

      <Box
        flex={footer ? undefined : 1}
        w="100%"
        display="flex"
        flexDirection="column"
        minH={footer ? undefined : 0}
      >
        {children}
      </Box>

      {footer && (
        <Box w="100%" pt={{ base: '1rem', md: '1.5rem' }}>
          {footer}
        </Box>
      )}
    </VStack>
  );
};

export default BaseCard;
