import React from 'react';
import {
  AspectRatio,
  Box,
  Image,
  Text,
  VStack,
  Stack,
  Tag,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { DateTime } from 'luxon';

const VideoCard = ({ videoData, allVideos }) => {
  const videoDate = DateTime.fromISO(videoData.startDate).toFormat(
    'LLLL dd, yyyy'
  );

  return (
    <Link
      to={{
        pathname: `/witness/testimonies/videos/${videoData.id}`,
        state: { videoData, allVideos },
      }}
    >
      <Stack direction={['row', 'column']} spacing={3}>
        <AspectRatio minW={{ base: '40%', md: '18%' }} ratio={16 / 9}>
          <Image borderRadius={10} src={videoData.imageUrl} objectFit="cover" />
        </AspectRatio>
        <Box overflow="hidden">
          <VStack alignItems="left" spacing={[1, 2]}>
            <Text
              fontSize={{ base: 'sm', md: 'lg' }}
              fontWeight={['600', '800']}
              noOfLines={2}
              minHeight="2rem"
            >
              {videoData.title}
            </Text>
            <Stack direction={['column', 'row']} spacing="auto">
              <Box display="flex">
                <Text
                  fontSize={{ base: 'xs', md: 'sm' }}
                  isTruncated
                  alignSelf="flex-end"
                  justifyContent="flex-start"
                  textAlign="left"
                  mb={[1, 0]}
                >
                  {videoDate}
                </Text>
              </Box>
              <Box mt={3} display="flex" overflowX="hidden">
                {videoData.tags.map((tag) => (
                  <Tag
                    fontSize={['xs', 'sm']}
                    borderRadius={20}
                    colorScheme="blue"
                    alignSelf="flex-end"
                  >
                    {tag}
                  </Tag>
                ))}
              </Box>
            </Stack>
          </VStack>
        </Box>
      </Stack>
    </Link>
  );
};

export default VideoCard;
