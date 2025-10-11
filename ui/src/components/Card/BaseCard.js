import React from 'react';
import { Box } from '@chakra-ui/react';
/**
 * Renders a card with a customizable card header and card body. The header can be any valid React node.
 * The body can be stack of text links or any other react nodes.
 * @param {React.ReactNode} title - The title to display in the card.
 * @param {React.ReactNode} body - The body to display in the card.
 * @param {React.ReactNode} footer - The footer to display in the card.
 * @param {object} cardContainerStyles - The styles to apply to the card container.
 * @returns {React.ReactNode} The total price.
 */

const BaseCard = ({
  title = '',
  body,
  footer,
  onClick,
  cardContainerStyles,
}) => {
  return (
    <Box sx={cardContainerStyles} onClick={onClick}>
      {/* Card Header */}
      <Box>{title}</Box>
      {/* Card Body */}
      <Box>{body}</Box>
      {/* Card Footer */}
      {footer && <Box>{footer}</Box>}
    </Box>
  );
};

export default BaseCard;
