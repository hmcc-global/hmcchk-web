import { Button, Text } from '@chakra-ui/react';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { ArrowForwardIcon } from '@chakra-ui/icons';

// Shared CTA used across the Ways to Participate cards.
// Pass `to` for an internal route (react-router) or `href` for an external link.
const ParticipateButton = ({ to, href, children, ...rest }) => {
  const linkProps = to
    ? { as: RouterLink, to }
    : { as: 'a', href, target: '_blank', rel: 'noopener noreferrer' };

  return (
    <Button
      {...linkProps}
      w="100%"
      bg="linear-gradient(90deg, #F3F6FF, #9CB5FF)"
      color="#0025a3"
      _hover={{ opacity: 0.9 }}
      fontFamily="Manrope"
      fontWeight={700}
      fontSize={{ base: 'sm', md: '1.125rem' }}
      borderRadius="80px"
      px={{ base: '1rem', md: '1.75rem' }}
      py={{ base: '0.5rem', md: '0.625rem' }}
      rightIcon={<ArrowForwardIcon />}
      justifyContent="space-between"
      {...rest}
    >
      <Text>{children}</Text>
    </Button>
  );
};

export default ParticipateButton;
