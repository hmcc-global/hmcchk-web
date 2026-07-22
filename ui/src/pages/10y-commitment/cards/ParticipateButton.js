import { Button } from 'components';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { ArrowForwardIcon } from 'components/icons';
import { COLORS, TYC_CTA_ICON_SIZE, TYC_CTA_TEXT } from '../constants';

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
      minW={0}
      overflow="hidden"
      bg={COLORS.buttonGradient}
      color={COLORS.brandBlue}
      _hover={{ opacity: 0.9 }}
      {...TYC_CTA_TEXT}
      borderRadius="80px"
      px="1.25rem"
      py="0.625rem"
      rightIcon={<ArrowForwardIcon fontSize={TYC_CTA_ICON_SIZE} />}
      justifyContent="space-between"
      {...rest}
    >
      {children}
    </Button>
  );
};

export default ParticipateButton;
