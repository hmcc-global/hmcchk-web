import React from 'react';
import {
  AspectRatio,
  Box,
  Image,
  Text,
  HStack,
  VStack,
  Stack,
  Tag,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { DateTime } from 'luxon';

// tag masih ga berfungsi
// filter masih ga berfungsi
const Background = {
  0: '#EDE2EF',
  1: '#FFD8D8',
  2: '#FFF8D2',
};

const TextCard = ({ textData, allText }) => {
  const textDate = DateTime.fromISO(textData.createdAt).toFormat(
    'LLLL dd, yyyy'
  );

  const BackgroundColor = () => {
    let num = Math.floor(Math.random() * 10) % 3;
    return Background[num];
  };

  return (
    <Link
      to={{
        pathname: `/witness/testimonies/${textData.id}`,
        state: { textData, allText },
      }}
    >
      <Stack
        direction={['row', 'column']}
        bg={BackgroundColor()}
        borderRadius={10}
      >
        {textData.image ? (
          <>
            <AspectRatio minW={{ base: '36%', md: '18%' }} ratio={16 / 9}>
              <Image objectFit="cover" borderTopRadius={10} />
            </AspectRatio>
          </>
        ) : null}
        <Box
          position="relative"
          paddingLeft={[4, 5]}
          paddingRight={[4, 5]}
          paddingBottom={[4, 5]}
          paddingTop={[1, 2]}
        >
          <HStack marginTop={textData.image ? -6 : 0} marginBottom={3}>
            {/* {textData.tags
              ? textData.tags.map((tag) => <Tag size={'sm'}>{tag}</Tag>)
              : null} */}
          </HStack>
          <VStack alignItems="left" spacing={2}>
            <Text
              fontSize={{ base: 'sm', md: 'lg' }}
              fontWeight={['600', '800']}
            >
              {textData.theme}
            </Text>
            <Text fontSize={{ base: 'xs', md: 'sm' }} isTruncated>
              {textData.testimony}
            </Text>
            <Text fontSize={{ base: 'xs', md: 'sm' }} alignSelf="flex-end">
              {textDate}
            </Text>
          </VStack>
        </Box>
      </Stack>
    </Link>
  );
};

export default TextCard;
