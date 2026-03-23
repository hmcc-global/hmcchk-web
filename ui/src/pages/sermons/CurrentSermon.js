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
import SermonSocialMediaButtons from './SermonSocialMediaButtons';
import { DateTime } from 'luxon';
import { DATE_FULL } from 'luxon/src/impl/formats';

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
        : currentSermon.sermonSeries[0]?.name +
            ' Sermon Series - ' +
            currentSermon.title || '';
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

  const WatchButton = () => (
    <Button
      borderRadius="80px"
      border="1px solid #4A6EEB"
      py={{ base: '1.125rem', md: '1.375rem' }}
      px={{ base: '1.625rem', md: '1.875rem' }}
      backgroundColor={'#4A6EEB'}
      color="#FFFFFF"
      fontSize="1rem"
      onClick={() =>
        history.push(isOnline ? '/online' : '/sermons/' + currentSermon.id)
      }
      _hover={{ backgroundColor: 'rgba(74, 110, 235, 0.9)' }}
    >
      <HStack spacing="1rem" alignItems="center" justifyContent={'center'}>
        <Text>Watch Now</Text>
        <Icon as={FaArrowRight} boxSize="1rem" />
      </HStack>
    </Button>
  );

  const { header, sermonSeriesName, sermonDesc, mediaUrl } = sermonData;

  const getSermonDate = () => {
    if (currentSermon.sermonDateTime) {
      return DateTime.fromISO(currentSermon.sermonDateTime).toLocaleString(
        DATE_FULL
      );
    }
  };

  return (
    currentSermon && (
      <Box boxSizing="border-box">
        <Stack
          direction={{ base: 'column', md: 'row' }}
          alignItems={{ base: 'center', lg: 'center' }}
        >
          <Text
            fontWeight={400}
            fontSize={'1.5rem'}
            color="#272727"
            fontFamily="DMSerifDisplay_Italic"
            display={{ base: 'block', md: 'none' }}
          >
            {header}
          </Text>
          <MediaDisplay isOnline={isOnline} mediaUrl={mediaUrl} />

          <Stack
            pl={{ base: '0', md: '1.5rem' }}
            alignItems={{ base: 'center', lg: 'flex-start' }}
            flex="1"
            direction="column"
            gap="0.5rem"
          >
            <Text
              fontWeight={400}
              fontSize={{ base: '1.875rem', md: '2.625rem' }}
              color="#272727"
              fontFamily="DMSerifDisplay_Italic"
              display={{ base: 'none', md: 'block' }}
            >
              {header}
            </Text>
            <HStack spacing="0.5rem" alignItems="center">
              {isOnline && <LiveButton />}
              <Text
                fontWeight="bold"
                fontSize={{ base: '1rem', md: '1.125rem' }}
              >
                {sermonSeriesName}
              </Text>
            </HStack>
            {isOnline && (
              <HStack
                spacing={0}
                fontSize={{ base: '0.625rem', md: '0.875rem' }}
                alignItems="center"
                justifyContent="flex-start"
                flexWrap={'wrap'}
              >
                <Text>{'Date: ' + getSermonDate()}</Text>
                <Text px={{ base: '0.375rem', md: '1rem' }}>|</Text>
                <Text>{'Speaker: ' + currentSermon.speaker}</Text>
                <Text px={{ base: '0.375rem', md: '1rem' }}>|</Text>
                <Text>{'Passage: ' + currentSermon.sermonPassage}</Text>
              </HStack>
            )}
            <Text
              fontSize={{ base: '0.875rem', md: '1rem' }}
              fontWeight={500}
              pb={{ base: '0', lg: '1rem' }}
            >
              {sermonDesc}
            </Text>
            <WatchButton />
          </Stack>
        </Stack>
      </Box>
    )
  );
};

export default CurrentSermon;
