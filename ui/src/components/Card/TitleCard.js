import { Box, Image, Text } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import BaseCard from './BaseCard';
/**
 * Renders a card with a customizable card header and card body. The header can be any valid React node.
 * The body can be stack of text links or any other react nodes.
 * @param {React.ReactNode} title - The title to display in the card.
 * @param {React.ReactNode} body - The body to display in the card.
 * @param {React.ReactNode} footer - The footer to display in the card.
 * @param {object} cardContainerStyles - The styles to apply to the card container.
 * @returns {React.ReactNode} The total price.
 */

const TitleCard = ({ title, direction, bgImage, body }) => {
  const history = useHistory();
  return (
    <BaseCard
      title={
        <Box>
          <Text variant="h6">{title}</Text>
          <Image />
        </Box>
      }
      cardContainerStyles={{
        display: 'flex',
        flexDirection: direction,
        bgImage: bgImage,
      }}
      body={body}
      onClick={() => history.push('')}
    />
  );
};

export default TitleCard;
