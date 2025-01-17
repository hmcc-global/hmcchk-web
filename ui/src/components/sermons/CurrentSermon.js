import { useEffect, useState } from 'react';
import {
  Stack,
  Text,
  Box,
  AspectRatio,
  Image,
  Button,
  HStack,
  Icon,
} from '@chakra-ui/react';
import { useHistory } from 'react-router';
import { FaArrowRight } from 'react-icons/fa';
import LiveButton from '../helpers/components/LiveButton';

const headers = ['Latest Sermon', 'HMCC is Live!'];

const CurrentSermon = ({ currentSermon, isOnline }) => {
  const [sermonData, setSermonData] = useState({
    header: headers[0],
    sermonSeriesName: '',
    sermonDesc: '',
    mediaUrl: '',
  });

  const history = useHistory();

  useEffect(() => {
    if (currentSermon) {
      const header = isOnline ? headers[1] : headers[0];
      const sermonSeriesName = isOnline
        ? currentSermon.title
        : currentSermon.sermonSeries[0]?.name || '';
      const sermonDesc = isOnline
        ? currentSermon.sermonDescription
        : currentSermon.sermonDesc;
      const mediaUrl = isOnline
        ? currentSermon.sermonSeriesUrl
        : currentSermon.sermonVideoUrl.split('/').pop();

      setSermonData({ header, sermonSeriesName, sermonDesc, mediaUrl });
    }
  }, [currentSermon, isOnline]);

  const MediaDisplay = ({ isOnline, mediaUrl }) => (
    <AspectRatio
      borderRadius="20px"
      width={{ base: '100%', md: '40%' }}
      ratio={16 / 9}
    >
      {isOnline ? (
        <Image src={mediaUrl} objectFit="cover" />
      ) : (
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${mediaUrl}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      )}
    </AspectRatio>
  );

  const onWatchButtonClick = () => {
    if (isOnline) {
      history.push('/online');
    } else {
      history.push({
        pathname: `/sermons/${sermonData.id}`,
        state: { sermonData: sermonData },
      });
    }
  };

  const WatchButton = () => (
    <Button
      borderRadius="80px"
      border="1px solid #4A6EEB"
      py={{ base: '1.125rem', md: '1.375rem' }}
      px={{ base: '1.625rem', md: '1.875rem' }}
      backgroundColor={'#4A6EEB'}
      color="#FFFFFF"
      fontSize="1rem"
      onClick={() => history.push('/online')}
      _hover={{ backgroundColor: 'rgba(74, 110, 235, 0.9)' }}
    >
      <HStack spacing="1rem" alignItems="center" justifyContent={'center'}>
        <Text>Watch Now</Text>
        <Icon as={FaArrowRight} boxSize="1rem" />
      </HStack>
    </Button>
  );

  const { header, sermonSeriesName, sermonDesc, mediaUrl } = sermonData;

  return (
    <Box boxSizing="border-box">
      <Stack direction={{ base: 'column', md: 'row' }}>
        <MediaDisplay isOnline={isOnline} mediaUrl={mediaUrl} />

        {isOnline ? (
          <>
            <Stack
              pl={{ base: '0', md: '1.5rem' }}
              alignItems="flex-start"
              flex="1"
              direction="column"
              gap="0.5rem"
            >
              <Text
                fontWeight={400}
                fontSize={{ base: '1.875rem', md: '2.625rem' }}
                color="#272727"
                fontFamily="DMSerifDisplay_Italic"
              >
                {header}
              </Text>
              <HStack spacing="0.5rem" alignItems="center">
                <LiveButton />
                <Text
                  fontWeight="bold"
                  fontSize={{ base: '1rem', md: '1.125rem' }}
                >
                  {sermonSeriesName}
                </Text>
              </HStack>
              <Text
                fontSize={{ base: '0.875rem', md: '1rem' }}
                fontWeight={500}
              >
                {sermonDesc}
              </Text>
              <WatchButton />
            </Stack>
          </>
        ) : (
          <>
            <Stack
              pl={{ base: '0', md: '1.5rem' }}
              alignItems="left"
              direction="column"
              fontFamily="Manrope"
              gap="0.875rem"
            >
              <Text
                fontWeight="800"
                fontSize={{ base: '1rem', md: '1.125rem' }}
                color="#4A6EEB"
              >
                {header}
              </Text>
              <Text
                fontWeight="400"
                fontSize={{ base: '1.75rem', md: '2rem' }}
                fontFamily="DMSerifDisplay_Italic"
              >
                {sermonSeriesName}
              </Text>
              <Text fontSize="sm" lineHeight="shorter">
                {sermonDesc}
              </Text>
              <WatchButton />
            </Stack>
          </>
        )}
      </Stack>
    </Box>
  );
};

export default CurrentSermon;
