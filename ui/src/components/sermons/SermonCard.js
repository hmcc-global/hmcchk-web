import { AspectRatio, Box, Image, Text, VStack, Stack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';

const SermonCard = ({ sermonData, allSermons }) => {
  const [sermonImage, setSermonImage] = useState(
    process.env.PUBLIC_URL + '/images/sermons/placeholder.svg'
  );
  const [sermonDate, setSermonDate] = useState('');

  useEffect(() => {
    if (sermonData) {
      if (sermonData.sermonSeries && sermonData.sermonSeries[0].image !== null)
        setSermonImage(sermonData.sermonSeries[0].image.sourceUrl);
      if (sermonData.datePreached) {
        setSermonDate(
          DateTime.fromISO(sermonData.datePreached).toFormat('LLLL dd, yyyy')
        );
      }
    }
  }, [sermonData]);

  const sermonCardStyle = {
    borderWidth: '1px',
    borderRadius: '20px',
    overflow: 'hidden',
    bg: 'white',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)',
    align: 'stretch',
    maxW: '100%',
  };

  return (
    <Link
      style={sermonCardStyle}
      to={{
        pathname: `/sermons/${sermonData.id}`,
        state: { sermonData: sermonData, allSermons: allSermons },
      }}
    >
      <Stack direction={['row', 'column']}>
        <AspectRatio minW={{ base: '36%', md: '18%' }} ratio={16 / 9}>
          <>
            <Image
              borderTopRadius={['0', '20']}
              borderLeftRadius={['20', '0']}
              src={sermonImage}
              objectFit="cover"
            />
          </>
        </AspectRatio>
        <Box position="absolute" left="100%" top="50%">
          <AspectRatio width="20%" ratio={1 / 1}>
            <Image
              borderRadius="100%"
              src={process.env.PUBLIC_URL + '/images/PlayButton.png'}
            />
          </AspectRatio>
        </Box>
        <Box
          overflow="hidden"
          position="relative"
          paddingLeft={[2, 4]}
          paddingRight={[2, 4]}
          paddingBottom={[2, 4]}
          paddingTop={[1, 2]}
        >
          <VStack alignItems="left" spacing={1}>
            <Text
              fontSize={{ base: 'sm', md: 'lg' }}
              fontWeight={['600', '800']}
              isTruncated
            >
              {sermonData.title}
            </Text>
            <Text fontSize={{ base: 'xs', md: 'sm' }} isTruncated>
              {sermonData.sermonSeries[0].name}
            </Text>
            <Stack
              direction={['column', 'row']}
              spacing="1"
              justifyContent="space-between"
            >
              <Text fontSize={{ base: 'xs', md: 'sm' }} isTruncated>
                {sermonData.speaker[0].name}
              </Text>
              <Text fontSize={{ base: 'xs', md: 'sm' }} isTruncated>
                {sermonDate}
              </Text>
            </Stack>
          </VStack>
        </Box>
      </Stack>
    </Link>
  );
};

export default SermonCard;
