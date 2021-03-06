import { AspectRatio, Box, Image, Text, Stack, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { DateTime } from 'luxon';
import React from 'react';

const RelatedSermonCard = ({ sermonData, allSermons }) => {
  const isOnline = sermonData.streamLink !== '';
  let sermonDate = DateTime.fromISO(sermonData.datePreached).toFormat(
    'LLLL dd, yyyy'
  );
  let sermonImage = '';
  if (sermonData.sermonSeries[0].image !== null)
    sermonImage = sermonData.sermonSeries[0].image.sourceUrl;
  else sermonImage = process.env.PUBLIC_URL + '/images/sermons/placeholder.svg';

  const sermonCardStyle = {
    borderWidth: '1px',
    borderRadius: '20px',
    overflow: 'hidden',
    bg: 'white',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)',
    maxW: '100%',
  };

  return (
    <>
      <Link
        style={sermonCardStyle}
        to={{
          pathname: (isOnline ? '/online' : `/sermons/${sermonData.id}`),
          state: { sermonData: sermonData, allSermons: allSermons },
        }}
      >
        <Stack direction="row">
          <AspectRatio minW={{ base: '33%', md: '18%' }} ratio={16 / 9}>
            <Image borderLeftRadius="20" src={sermonImage} objectFit="cover" />
          </AspectRatio>
          <Box overflow="hidden" p={[2, 6]} minW={{ base: '67%', md: '82%' }}>
            <VStack alignItems="left" spacing={{ base: 1, md: 2 }}>
              <Text
                fontWeight="600"
                fontSize={{ base: 'sm', md: 'md' }}
                isTruncated
              >
                {sermonData.title}
              </Text>
              <Text fontSize={{ base: 'xs', md: 'md' }} isTruncated>
                {sermonData.sermonSeries[0].name}
              </Text>
              <Stack
                spacing={{ base: 1, md: 'auto' }}
                direction={{ base: 'column', md: 'row' }}
              >
                <Text fontSize={{ base: 'xs', md: 'md' }} isTruncated>
                  {sermonData.speaker[0].name}
                </Text>
                <Text fontSize={{ base: 'xs', md: 'md' }} isTruncated>
                  {sermonDate}
                </Text>
              </Stack>
            </VStack>
          </Box>
        </Stack>
      </Link>
    </>
  );
};

export default RelatedSermonCard;
