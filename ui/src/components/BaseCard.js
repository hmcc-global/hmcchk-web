import React from 'react';
import { Card, CardHeader, CardBody, Heading } from '@chakra-ui/react';

/**

     * Renders a card with a customizable card header and card body. The header can be any valid React node.
     * The body can be stack of text links or any other react nodes. 
     * @param {React.ReactNode} title - The title to display in the card.
     * @returns {React.ReactNode} The total price.
*/

const BaseCard = ({ title, children }) => {
  return (
    <Card>
      {title && (
        <CardHeader>
          <Heading size="md">{title}</Heading>
        </CardHeader>
      )}
      <CardBody>
        {children}
      </CardBody>
    </Card>
  );
};

export default BaseCard;
