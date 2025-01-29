import {
  HStack,
  VStack,
  Box,
  Button,
  Stack,
  AspectRatio,
  Text,
  Container,
  Grid,
  Icon,
  useBreakpointValue,
} from '@chakra-ui/react';
import { customAxios as axios } from '../helpers/customAxios';
import { DateTime } from 'luxon';
import { DATE_FULL } from 'luxon/src/impl/formats';
import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router';
import { sermonIdMap } from '../admin/sermonNotes/SermonNotesEditorModal';
import SermonSeriesCard from './SermonSeriesCard';
import { FaArrowRight } from 'react-icons/fa';
import OfflinePageTabs from './OfflinePageTabs';
import SermonSocialMediaButtons from './SermonSocialMediaButtons';

const getSermonNoteId = (sermon) => {
  const datePreached = DateTime.fromISO(sermon.datePreached).toFormat(
    'ddMMyyyy'
  );
  const serviceTypePrefix = sermonIdMap[sermon.serviceType[0].name];
  return `${serviceTypePrefix}-${datePreached}-1`;
};

const SermonDetails = (props) => {
  const [sermon, setSermon] = useState();
  const [allSermons, setAllSermons] = useState([]);
  const [sermonSeriesTitle, setSermonSeriesTitle] = useState('');
  const [sermonTitlePrefix, setSermonTitlePrefix] = useState('');
  const [sermonUrl, setSermonUrl] = useState();
  const [sermonDate, setSermonDate] = useState();
  const [sermonNoteId, setSermonNoteId] = useState('');
  const [latestSermonSeries, setLatestSermonSeries] = useState([]);
  const currId = props.match.params.id;
  const history = useHistory();
  const { user } = props;

  const isMobile = useBreakpointValue({ base: true, md: false });

  const getData = useCallback(async () => {
    try {
      const { data, status } = await axios.get('/api/sermons/get-sermons');
      if (status === 200) {
        let currentSermon = data.find(({ id }) => id === parseInt(currId));
        if (!currentSermon) {
          history.push('/404');
        }
        setAllSermons([...data]);
        if (currentSermon.streamLink && currentSermon.sermonNotes) {
        }
        setSermon(currentSermon);
      } else {
        throw Error('Something went wrong');
      }
    } catch (err) {
      console.log(err);
    }
  }, [currId, history]);

  useEffect(() => {
    (async () => {
      await getData();
    })();
  }, [currId, getData]);

  const getSermonDate = useCallback(() => {
    let sermonDate = DateTime.fromISO(sermon.datePreached).toLocaleString(
      DATE_FULL
    );

    setSermonNoteId(getSermonNoteId(sermon));
    setSermonDate(sermonDate);
  }, [sermon]);

  const getVideoCode = useCallback(() => {
    let sermonVideoCode =
      sermon.sermonVideoUrl.split('/')[
        sermon.sermonVideoUrl.split('/').length - 1
      ];
    setSermonUrl(`https://www.youtube.com/embed/${sermonVideoCode}`);
  }, [sermon]);

  const getLatestSermonSeries = useCallback(() => {
    const sortedSermonList = allSermons.sort((a, b) => {
      return (
        DateTime.fromISO(b.datePreached) - DateTime.fromISO(a.datePreached)
      );
    });

    const latestSermonSeries = sortedSermonList
      .map((sermon) => sermon.sermonSeries[0].name)
      .filter((sermonSeries) => sermonSeries !== sermon.sermonSeries[0].name);

    setLatestSermonSeries([...new Set(latestSermonSeries)].slice(0, 4));
  }, [allSermons, sermon]);

  const getSermonSeriesTitle = useCallback(() => {
    setSermonSeriesTitle(sermon.sermonSeries[0].name);
  }, [sermon]);

  const getSermonTitlePrefix = useCallback(() => {
    if (sermon.title.includes('Part')) {
      setSermonTitlePrefix(sermon.sermonSeries[0].name + ' Sermon Series - ');
    } else {
      setSermonTitlePrefix('');
    }
  }, [sermon]);

  useEffect(() => {
    if (allSermons && sermon) {
      getLatestSermonSeries();
      getSermonDate();
      getVideoCode();
      getSermonSeriesTitle();
      getSermonTitlePrefix();
    }
  }, [
    allSermons,
    getSermonDate,
    getVideoCode,
    sermon,
    getLatestSermonSeries,
    getSermonSeriesTitle,
    getSermonTitlePrefix,
  ]);

  return (
    <>
      {sermon && allSermons && (
        <Container maxW="container.xl" mt={{ base: '0.75rem', lg: '2.5rem' }}>
          <Box mb={{ base: '1rem', md: '2.5rem' }}>
            <Text
              fontFamily={'DMSerifDisplay_Italic'}
              fontWeight={400}
              fontSize={{ base: '2rem', md: '3.375rem' }}
              textAlign={{ base: 'center', md: 'left' }}
            >
              {sermonSeriesTitle}
            </Text>
            <Stack
              spacing={{ base: '0.5rem', lg: '2rem' }}
              direction={{ base: 'column', lg: 'row' }}
              alignItems={{ base: 'center', lg: 'flex-start' }}
              justifyContent={{ base: 'flex-start', lg: 'space-between' }}
              mt={'0.5rem'}
              mb={{ base: '2rem', lg: '4rem' }}
            >
              <Box
                w={{ base: '100%', lg: '60%' }}
                display={'flex'}
                flexDir={'column'}
                gap={'1rem'}
              >
                <AspectRatio mb="0.5rem" width="100%" ratio={16 / 9}>
                  <iframe
                    width="560"
                    height="315"
                    src={sermonUrl}
                    title="Video player"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
                    allowFullScreen
                  ></iframe>
                </AspectRatio>
                <VStack spacing={'0.5rem'} alignItems="left" mb={'1rem'}>
                  <Text
                    fontFamily={'DMSerifDisplay_Italic'}
                    fontWeight={400}
                    fontSize={{ base: '1.25rem', md: '2rem' }}
                  >
                    {sermonTitlePrefix + sermon.title}
                  </Text>
                  <HStack
                    spacing={{ base: '0.375rem', md: '1rem' }}
                    fontSize={{ base: '0.625rem', md: '0.875rem' }}
                    alignItems="center"
                    justifyContent="flex-start"
                    flexWrap={'wrap'}
                  >
                    <Text>{'Date: ' + sermonDate}</Text>
                    <Text>|</Text>
                    <Text>{'Speaker: ' + sermon.speaker[0].name}</Text>
                    <Text>|</Text>
                    <Text>{'Passage: ' + sermon.passage}</Text>
                  </HStack>
                  <Text
                    py={{ base: '0', lg: '0.75rem' }}
                    fontWeight={600}
                    fontSize={{ base: '0.875rem', md: '1rem' }}
                  >
                    {sermon.sermonDesc}
                  </Text>

                  {/* TODO-YY: to attach actual links */}
                  <SermonSocialMediaButtons
                    ytLink={'sermonUrl'}
                    spotifyLink={''}
                  />
                </VStack>
              </Box>
              <Box w={{ base: '100%', lg: '40%' }}>
                <Box w="100%" h="50%">
                  <OfflinePageTabs
                    sermonNoteId={sermonNoteId}
                    user={user}
                    history={history}
                    sermonSeries={sermon.sermonSeries[0].name}
                  />
                </Box>
              </Box>
            </Stack>

            <VStack alignItems="left" alignContent="center" spacing={4}>
              <HStack alignItems="center" justifyContent={'space-between'}>
                <Text
                  fontFamily={'DMSerifDisplay_Italic'}
                  fontWeight={400}
                  fontSize={{ base: '1.75rem', md: '2rem' }}
                >
                  Past Sermons
                </Text>
                <Button
                  borderRadius="80px"
                  border="1px solid #4A6EEB"
                  py={{ base: '1rem', md: '1.25rem' }}
                  px={{ base: '1.25rem', md: '1.5rem' }}
                  fontSize="1rem"
                  bgColor={'transparent'}
                  onClick={() => history.push('/sermons')}
                  color="#0C0C20"
                  _hover={{
                    backgroundColor: 'rgba(74, 110, 235, 0.1)',
                    color: '#FFFFFF',
                  }}
                  gap="0.75rem"
                >
                  <Text
                    color="#4A6EEB"
                    fontSize={{ base: '0.75rem', md: '0.875rem' }}
                  >
                    See All Sermons
                  </Text>
                  <Icon as={FaArrowRight} color={'#4A6EEB'} />
                </Button>
              </HStack>
              <Grid
                templateColumns={['repeat(1, 1fr)', 'repeat(4, 1fr)']}
                gap={[3, 6]}
              >
                {latestSermonSeries.length > 0 &&
                  latestSermonSeries.map((sermonSeries) => (
                    <SermonSeriesCard
                      key={sermonSeries}
                      sermonSeries={sermonSeries}
                      allSermons={allSermons}
                    />
                  ))}
              </Grid>
            </VStack>
          </Box>
        </Container>
      )}
    </>
  );
};

export default SermonDetails;
