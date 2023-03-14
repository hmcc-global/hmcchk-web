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
import { prayerTopics } from './EasterPrayerModal';

const getPrayerTopic = (idx) => {
  let topic = prayerTopics.find((e) => e.index === idx).text;
  return topic;
};

const Background = {
  0: '#F8ACCB',
  1: '#D5AAE5',
  2: '#FF9283',
  3: '#FF9D72',
};

const TextCard = ({ textData, allText }) => {
  const textDate = DateTime.fromISO(textData.createdAt).toFormat(
    'LLLL dd, yyyy'
  );

  const BackgroundColor = () => {
    let num = Math.floor(Math.random() * 10) % 4;
    return Background[num];
  };

  return (
    <Link
      to={{
        pathname: `/witness/prayers/text/${textData.id}`,
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
        <Box p={4} w={{ base: '45vw', sm: '43vw', md: '45vw', lg: '30vw' }}>
          <VStack alignItems="left" spacing={2}>
            <Wrap>
              <Tag
                size="md"
                px={2}
                borderRadius="full"
                color="black"
                bgColor="white"
                textAlign="center"
                fontSize="xs"
                fontWeight={600}
                display={{ base: 'none', md: 'inline-flex' }}
              >
                {getPrayerTopic(textData.topic)}
              </Tag>
            </Wrap>
            <Box minH={['8vw', '5vw']}>
              <Text
                fontSize={{ base: 'xs', md: 'sm' }}
                // isTruncated
                noOfLines={[4, 3]}
                color="black"
                fontWeight={500}
                textAlign="left"
              >
                {textData.prayer}
              </Text>
            </Box>

            <Text
              fontSize={{ base: 'xx-small', md: 'sm' }}
              alignSelf="flex-end"
              color="black"
            >
            {textData.lifestage} 
            </Text>
            <Text
              fontSize={{ base: 'xx-small', md: 'sm' }}
              alignSelf="flex-end"
              color="black"
            >
              {textData.fullName} &bull; {textDate}
            </Text>
            <Wrap>
              <Tag
                size="sm"
                px={2}
                borderRadius="full"
                color="black"
                bgColor="white"
                textAlign="center"
                display={{ base: 'inline-flex', md: 'none' }}
                fontSize={['2vw', 'xx-small']}
                fontWeight={600}
              >
                {getPrayerTopic(textData.topic)}
              </Tag>
            </Wrap>
          </VStack>
        </Box>
      </Stack>
    </Link>
  );
};

export default TextCard;
