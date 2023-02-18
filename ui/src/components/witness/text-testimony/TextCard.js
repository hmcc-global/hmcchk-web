import React from 'react';
import {
  AspectRatio,
  Box,
  Image,
  Text,
  VStack,
  Stack,
  Tag,
  Wrap,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { DateTime } from 'luxon';

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

  const tagSet = new Set();
  Object.values(textData).forEach((tags) => {
    if (typeof textData.tags === 'string') {
      tagSet.add(textData.tags);
    } else {
      textData.tags.forEach((tag) => {
        tagSet.add(tag);
      });
    }
  });
  const Tags = Array.from(tagSet);

  return (
    <Link
      to={{
        pathname: `/witness/testimonies/text/${textData.id}`,
        state: { textData, allText },
      }}
    >
      <Stack
        direction={['column', 'row']}
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
        <Box margin={[3, 3, 3, 4]} w={['42vw', '25vw']}>
          <VStack alignItems="left" spacing={2}>
            <Wrap>
              {Tags.map((tag) => {
                return (
                  <Tag
                    size={['sm']}
                    px={2}
                    borderRadius="full"
                    color="black"
                    bgColor="white"
                    textAlign="center"
                  >
                    {tag}
                  </Tag>
                );
              })}
            </Wrap>
            <Text
              fontSize={{ base: 'sm', md: 'lg' }}
              fontWeight={['600', '800']}
              color="black"
            >
              {textData.theme}
            </Text>
            <Text fontSize={{ base: 'xs', md: 'sm' }} isTruncated color="black">
              {textData.testimony}
            </Text>
            <Text
              fontSize={{ base: 'xs', md: 'sm' }}
              alignSelf="flex-end"
              color="black"
            >
              {textData.name ? `${textData.name} • ` : null}
              {textDate}
            </Text>
          </VStack>
        </Box>
      </Stack>
    </Link>
  );
};

export default TextCard;
