import React from 'react';
import {
  AspectRatio,
  Box,
  Image,
  Text,
  HStack,
  VStack,
  Stack,
  Icon,
  Tag,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { DateTime } from 'luxon';

const sermonCardStyle = {
  borderWidth: '1px',
  borderRadius: '20px',
  overflow: 'hidden',
  bg: 'white',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)',
  align: 'stretch',
  maxW: '100%',
};

const VideoCard = ({ videoData }) => {
  const videoDate = DateTime.fromISO(videoData.startDate).toFormat('LLLL dd, yyyy');

  return (
    <Link
      style={sermonCardStyle}
      to={{
        pathname: `/witness/testimonies/videos/${videoData.id}`,
        state: { videoData },
      }}
    >
      <Stack direction={['row', 'column']}>
        <AspectRatio minW={{ base: '36%', md: '18%' }} ratio={16 / 9}>
          <Image
            borderTopRadius={['0', '20']}
            borderLeftRadius={['20', '0']}
            src={videoData.imageUrl}
            objectFit="cover"
          />
        </AspectRatio>
        <Box
          overflow="hidden"
          position="relative"
          paddingLeft={[2, 4]}
          paddingRight={[2, 4]}
          paddingBottom={[2, 4]}
          paddingTop={[1, 2]}
        >
          <VStack alignItems="left" spacing={2}>
            <Text
              fontSize={{ base: 'sm', md: 'lg' }}
              fontWeight={['600', '800']}
            >
              {videoData.title}
            </Text>
            <Stack direction={['column', 'row']} spacing="auto">
              <Text fontSize={{ base: 'xs', md: 'sm' }} isTruncated>
                {videoDate}
              </Text>
            </Stack>
          </VStack>
          <Box marginTop={3}>
              {videoData.tags.map((tag) => (
                <Tag colorScheme="teal">{tag}</Tag>
              ))}
            </Box>
        </Box>
      </Stack>
    </Link>
  );
};

export default VideoCard;
