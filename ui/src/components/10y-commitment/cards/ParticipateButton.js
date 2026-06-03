import { Button, Text } from '@chakra-ui/react';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { COLORS } from '../constants';

// Shared CTA used across the Ways to Participate cards.
// Pass `to` for an internal route (react-router) or `href` for an external link.
const ParticipateButton = ({ to, href, children, ...rest }) => {
  let linkProps;
  if (to) {
    linkProps = { as: RouterLink, to };
  } else if (href) {
    linkProps = { as: 'a', href, target: '_blank', rel: 'noopener noreferrer' };
  } else {
    linkProps = { as: 'button', type: 'button' };
  }

  return (
    <Button
      {...linkProps}
      w="100%"
      bg={COLORS.buttonGradient}
      color={COLORS.brandBlue}
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
