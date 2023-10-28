import { Box, VStack, Image, Text } from '@chakra-ui/react';
import { bodyFontSize, fontColor } from './RippleOutTextStyle';

const RippleOutStoryCard = (props) => {
  const { storyCardContent } = props;
  return (
    <Box
      color={fontColor}
      w={'100%'}
      h={'auto'}
      px={['1em', '1.75em', '5em', '10em', '17.5em']}
    >
      <VStack justifyContent="space-between" spacing={15}>
        <Image
          borderRadius={10}
          margin="auto"
          src={process.env.PUBLIC_URL + storyCardContent.imageUrl}
          boxSize={'100%'}
          objectFit="cover"
        />
        <Box w="100%" borderRadius={10} bg="#C9DDED" p={5}>
          <Text fontSize={bodyFontSize}>
            {storyCardContent.content}
          </Text>
        </Box>
      </VStack>
    </Box>
  );
};

export default RippleOutStoryCard;
