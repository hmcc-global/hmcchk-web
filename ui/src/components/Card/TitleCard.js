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

const TitleCard = ({
  title,
  titleColor,
  titleIconPath = '/images/home/call-made.svg',
  direction = 'column',
  bgDesktopImage,
  bgMobileImage,
  bgPosition = ['center bottom', 'left bottom'],
  bodyColor = '#4A6EEB',
  borderColor = '#4A6EEB',
  body,
  linkTo,
}) => {
  const history = useHistory();
  return (
    <BaseCard
      title={
        <Box display="flex" justifyContent="space-between" direction="row">
          <Text
            fontSize={['1.5rem', '1.5rem', '2rem']}
            fontFamily="DMSerifDisplay_Italic"
            color={titleColor}
          >
            {title}
          </Text>

          <Image
            pl="5"
            pb={[0, 0, 0, '5']}
            h={['2em', '2em', '2.5em', '3em']}
            w="auto"
            src={process.env.PUBLIC_URL + titleIconPath}
          />
        </Box>
      }
      cardContainerStyles={{
        display: 'flex',
        flexDirection: direction,
        justifyContent: ['none', 'space-around', 'space-between'],
        bgImage: [
          process.env.PUBLIC_URL + '/images/home/' + bgMobileImage ||
            bgDesktopImage,
          process.env.PUBLIC_URL + '/images/home/' + bgMobileImage ||
            bgDesktopImage,
          process.env.PUBLIC_URL + '/images/home/' + bgDesktopImage,
        ],
        bgPosition: bgPosition,
        bgRepeat: 'no-repeat',
        bgSize: 'contain',
        border: `1px solid ${borderColor}`,
        borderRadius: '8px',
        p: [3, 3, 5, 5],
        minH: ['4em', '5em', '6em', '10.75em'],
        cursor: linkTo ? 'pointer' : 'default',
      }}
      body={
        typeof body === 'string' ? (
          <Text
            fontSize={{ base: '0.825rem', md: '1rem' }}
            color={bodyColor}
            whiteSpace="pre-wrap"
            display={['none', 'none', 'inline-block']}
          >
            {body}
          </Text>
        ) : (
          body
        )
      }
      onClick={() => {
        history.push(linkTo);
      }}
    />
  );
};

export default TitleCard;
