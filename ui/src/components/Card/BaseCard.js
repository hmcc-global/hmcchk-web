import React from 'react';
import { Card } from '@chakra-ui/react';
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
    <Card.Root sx={cardContainerStyles} onClick={onClick}>
      <Card.Header>{title}</Card.Header>
      <Card.Body>{body}</Card.Body>
      {footer && <Card.Footer>{footer}</Card.Footer>}
    </Card.Root>
  );
};

export default BaseCard;
