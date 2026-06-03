import {
  VStack,
  Heading,
  Text,
} from '@chakra-ui/react';
import React from 'react';

const BaseCard = ({
  title,
  subtitle,
  children,
}) => {
  return (
    <VStack
      spacing={{base: "0.75rem", md: "1.5rem"}}
      p={{ base: '1.5rem', md: '2rem' }}
      bg="linear-gradient(180deg, #506AC4, #010B2D)"
      borderRadius="1.25rem"
      align="stretch"
      h="100%"
    >
      <VStack spacing={{base: "0.75rem", md: "1.5rem"}} align="center">
        <Heading
            as="h4"
            fontSize={{ base: '1.56rem', md: '1.875rem' }}
            fontWeight={600}
            color="#FFFFFF"
            fontFamily="DMSerifDisplay_Italic"
        >
        {title}
        </Heading>
        <Text
          fontSize={{ base: '0.813rem', md: '1.25rem' }}
          fontWeight={800}
          color="#ABD8FF"
          fontFamily="Manrope"
          textTransform="uppercase"
          textAlign="center"
          letterSpacing="0.125rem"
        >
          {subtitle}
        </Text>
      </VStack>

      {children}
    </VStack>
  );
};

export default BaseCard;
