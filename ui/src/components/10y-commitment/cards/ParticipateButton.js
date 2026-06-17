import { Button } from '@chakra-ui/react';
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
      fontSize={{ base: '1rem', lg: '1rem' }}
      borderRadius="80px"
      px={{ base: '0.75rem', md: '1.5rem' }}
      py={{ base: '0.5rem', md: '1rem' }}
      rightIcon={
        <ArrowForwardIcon fontSize={{ base: '1.25rem', lg: '1rem' }} />
      }
      justifyContent="space-between"
      lineHeight="1"
      {...rest}
    >
      {children}
    </Button>
  );
};

export default ParticipateButton;
