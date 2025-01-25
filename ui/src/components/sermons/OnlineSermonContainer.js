import { useCallback, useEffect, useState } from 'react';
import { customAxios as axios } from '../helpers/customAxios';
import {
  HStack,
  VStack,
  Box,
  AspectRatio,
  Text,
  Container,
} from '@chakra-ui/react';
import { DateTime } from 'luxon';
import OnlinePageButtons from './OnlinePageButtons';
import OnlinePageTabs from './OnlinePageTabs';
import SermonSocialMediaButtons from './SermonSocialMediaButtons';

const OnlineSermonContainer = (props) => {
  const { user, history } = props;
  const [onlineSermon, setOnlineSermon] = useState();
  const getOnlineSermon = useCallback(async () => {
    try {
      const { data, status } = await axios.get(
        '/api/live-sermon/get-live-sermon'
      );
      if (status === 200) {
        const current = data && data[0];
        if (current && current.streamLink) {
          setOnlineSermon(current);
        } else {
          history.push(`/sermons/`);
        }
      } else {
        throw Error('Something went wrong');
      }
    } catch (err) {
      console.log(err);
      history.push(`/sermons/`);
    }
  }, [history]);

  useEffect(() => {
    (async () => {
      await getOnlineSermon();
    })();
  }, [getOnlineSermon]);

  const getSermonDate = () => {
    if (onlineSermon.sermonDateTime) {
      return DateTime.fromISO(onlineSermon.sermonDateTime).toFormat(
        'dd MMM yyyy'
      );
    }
  };

  const getSermonTime = () => {
    if (onlineSermon.sermonDateTime) {
      return DateTime.fromISO(onlineSermon.sermonDateTime).toFormat('hh:mm a');
    }
  };

  return (
    <>
      {onlineSermon && (
        <Container maxW="container.xl" mt={{ base: '0.75rem', lg: '1.75rem' }}>
          <Box mb={{ base: '1rem', md: '2.5rem' }}>
            <Text
              fontFamily={'DMSerifDisplay_Italic'}
              fontWeight={400}
              fontSize={{ base: '2rem', md: '3.375rem' }}
              textAlign={{ base: 'center', md: 'left' }}
            >
              {onlineSermon.sermonSeries}
            </Text>
            <Box
              display="flex"
              flexDirection={{ base: 'column', lg: 'row' }}
              alignItems={{ base: 'center', lg: 'unset' }}
              w="100%"
              mb={'2rem'}
            >
              <Box
                w={{ base: '100%', lg: '60%' }}
                display={'flex'}
                flexDir={'column'}
                gap={'1rem'}
              >
                <AspectRatio mb="0" width="100%" ratio={16 / 9}>
                  <iframe
                    width="560"
                    height="315"
                    src={onlineSermon.streamLink}
                    title="Video player"
                    frameBorder="0"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; autoplay;"
                    allowFullScreen
                  ></iframe>
                </AspectRatio>
                <VStack spacing={'0.5rem'} alignItems="left" mb={'1rem'}>
                  <Text
                    fontWeight="400"
                    fontSize={{ base: '1.125rem', md: '2rem' }}
                    fontFamily="DMSerifDisplay_Italic"
                  >
                    {onlineSermon.title}
                  </Text>
                  <HStack
                    spacing={0}
                    fontSize={{ base: '0.625rem', md: '0.875rem' }}
                    alignItems="center"
                    justifyContent="flex-start"
                    flexWrap={'wrap'}
                  >
                    <Text>{'Date: ' + getSermonDate()}</Text>
                    <Text px={{ base: '0.375rem', md: '1rem' }}>|</Text>
                    <Text>{'Speaker: ' + onlineSermon.speaker}</Text>
                    <Text px={{ base: '0.375rem', md: '1rem' }}>|</Text>
                    <Text>{'Passage: ' + onlineSermon.sermonPassage}</Text>
                  </HStack>
                  <Text
                    py={{ base: '0', lg: '0.75rem' }}
                    fontWeight={600}
                    fontSize={{ base: '0.875rem', md: '1rem' }}
                  >
                    {onlineSermon.sermonDescription}
                  </Text>

                  <SermonSocialMediaButtons
                    ytLink={
                      'https://www.youtube.com/channel/UC1O1T7RaKWTGHd7R_0KMZ8Q'
                    }
                  />
                </VStack>
              </Box>
              <Box
                ml={{ base: '0px', lg: '20px' }}
                w={{ base: '100%', lg: '40%' }}
                overflowY="auto"
                position="relative"
                borderRadius={10}
              >
                <Box w="100%" h="100%">
                  <OnlinePageTabs
                    sermonNotes={onlineSermon.sermonNotes}
                    user={user}
                    history={history}
                    sermonSeries={onlineSermon.sermonSeries}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
          <Text
            fontFamily={'DMSerifDisplay_Italic'}
            fontWeight={400}
            fontSize={{ base: '1.75rem', md: '2rem' }}
          >
            Other Links
          </Text>
          <OnlinePageButtons />
        </Container>
      )}
    </>
  );
};

export default OnlineSermonContainer;
