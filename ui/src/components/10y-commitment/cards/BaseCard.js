import {
  VStack,
  HStack,
  Heading,
  Text,
} from '@chakra-ui/react';
import React from 'react';

/**
 * BaseCard Component
 * Provides the common structure for all participation cards:
 * - Title (e.g., "Pray")
 * - Title Suffix (e.g., "Fuel the Vision")
 * - Subtitle (e.g., "Become a Prayer Partner")
 * - Customizable content area (passed as children)
 */
const BaseCard = ({
  title,
  titleSuffix,
  subtitle,
  children,
}) => {
  return (
    <VStack
      spacing={{base: "0.75rem", md: "1.5rem"}}
      p={{ base: '1.5rem', md: '2rem' }}
      bg="linear-gradient(180deg, #506AC4, #010B2D)"
      borderRadius="12px"
      align="stretch"
      h="100%"
    >
      {/* Card Header - Common across all cards */}
      <VStack spacing={{base: "0.75rem", md: "1.5rem"}} align="center">
        <Heading
        as="h4"
        fontSize={{ base: '1.56rem', md: '1.75rem' }}
        fontWeight={700}
        color="#FFFFFF"
        fontFamily="DM Serif Display"
        fontStyle="italic"
        >
        {title}
        </Heading>
        <Text
          fontSize={{ base: '0.813rem', md: '1.125rem' }}
          fontWeight={800}
          color="#ABD8FF"
          fontFamily="Manrope"
          textTransform="uppercase"
          textAlign="center"
          letterSpacing="0.1rem"
        >
          {subtitle}
        </Text>
      </VStack>

      {/* Custom Content for each card */}
      {children}
    </VStack>
  );
};

export default BaseCard;
