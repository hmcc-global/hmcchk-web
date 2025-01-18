import {
  HStack,
  VStack,
  Box,
  Button,
  Stack,
  AspectRatio,
  Link,
  Text,
  Container,
} from '@chakra-ui/react';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import RelatedSermonCard from './RelatedSermonCard';
import { customAxios as axios } from '../helpers/customAxios';
import { DateTime } from 'luxon';
import { DATE_FULL } from 'luxon/src/impl/formats';
import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router';
import OnlinePageTabs from './OnlinePageTabs';
import { sermonIdMap } from '../admin/sermonNotes/SermonNotesEditorModal';

const getSermonNoteId = (sermon) => {
  const datePreached = DateTime.fromISO(sermon.datePreached).toFormat('ddMMyyyy');
  const serviceTypePrefix = sermonIdMap[sermon.serviceType[0].name];
  return `${serviceTypePrefix}-${datePreached}-1`;
}

const SermonDetails = (props) => {
  const [sermon, setSermon] = useState();
  const [allSermons, setAllSermons] = useState([]);
  const [relatedSermons, setRelatedSermons] = useState([]);
  const [sermonUrl, setSermonUrl] = useState();
  const [sermonDate, setSermonDate] = useState();
  const [randomSermons, setRandomSermons] = useState([]);
  const [sermonNoteId, setSermonNoteId] = useState('');
  const currId = props.match.params.id;
  const history = useHistory();
  const { user } = props;

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

  const getRelatedSermons = useCallback(() => {
    let relatedSermon = allSermons
      .filter((related) => {
        return (
          related.sermonSeries &&
          related.sermonSeries[0].name.includes(
            sermon.sermonSeries && sermon.sermonSeries[0].name
          ) &&
          related.id !== sermon.id
        );
      })
      .slice(0, 5);
    setRelatedSermons(relatedSermon);
  }, [allSermons, sermon]);

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

  const randomIndex = (max) => {
    var arr = [];
    while (arr.length < Math.min(max, 5)) {
      var r = Math.floor(Math.random() * max);
      if (arr.indexOf(r) === -1) arr.push(r);
    }
    return arr;
  };

  const getRandomSermons = useCallback(() => {
    let sameYearSermons = allSermons.filter(
      (random) =>
        DateTime.fromISO(sermon.datePreached).hasSame(
          DateTime.fromISO(random.datePreached),
          'year'
        ) && random.sermonSeries[0].name !== sermon.sermonSeries[0].name
    );
    let randomSermons = [];
    randomIndex(sameYearSermons.length).forEach((i) => {
      randomSermons.push(sameYearSermons[i]);
    });
    randomSermons = randomSermons.sort(
      (a, b) =>
        DateTime.fromISO(b.datePreached) - DateTime.fromISO(a.datePreached)
    );
    setRandomSermons(randomSermons);
  }, [allSermons, sermon]);

  useEffect(() => {
    if (allSermons && sermon) {
      getRelatedSermons();
      getSermonDate();
      getVideoCode();
      getRandomSermons();
    }
  }, [
    allSermons,
    getRandomSermons,
    getRelatedSermons,
    getSermonDate,
    getVideoCode,
    sermon,
  ]);

  return (
    <>
      {sermon && allSermons && (
        <Container maxW="container.xl">
          <Box mb="20px" mt="20px">
            <Link href="/sermons" id="sermon_details-sermons">
              <Button
                variant="link"
                fontSize="lg"
                color="black"
                justifyContent="left"
                leftIcon={<ChevronLeftIcon />}
                display={{ base: 'none', md: 'flex' }}
                mb="10px"
              >
                See all past sermons
              </Button>
            </Link>
            <Stack
              spacing={4}
              direction={{ base: 'column', lg: 'row' }}
              alignItems="flex-start"
              mb={5}
            >
              <Box w={{ base: '100%', lg: '60%' }}>
                <AspectRatio mb="5" width="100%" ratio={16 / 9}>
                  <iframe
                    width="560"
                    height="315"
                    src={sermonUrl}
                    title="Video player"
                    frameBorder="0"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
                    allowFullScreen
                  ></iframe>
                </AspectRatio>
                <Text fontWeight="bold" fontSize={{ base: 'xl', md: '3xl' }}>
                  {sermon.title}
                </Text>
                <Stack spacing={8}>
                  <Box>
                    <Stack
                      spacing={{ base: 'normal', md: 'auto' }}
                      direction={{ base: 'column', md: 'row' }}
                    >
                      <HStack>
                        <Text fontWeight="bold">Speaker:</Text>
                        <Text>{sermon.speaker[0].name}</Text>
                      </HStack>
                      <HStack>
                        <Text fontWeight="bold">Date: </Text>
                        <Text>{sermonDate}</Text>
                      </HStack>
                      <HStack>
                        <Text fontWeight="bold">Series: </Text>
                        <Text>{sermon.sermonSeries[0].name}</Text>
                      </HStack>
                    </Stack>
                    <Stack
                      spacing={{ base: 'normal', md: 'auto' }}
                      direction={{ base: 'column', md: 'row' }}
                    >
                      <HStack>
                        <Text fontWeight="bold">Passage:</Text>
                        <Text>{sermon.passage}</Text>
                      </HStack>
                    </Stack>
                  </Box>

                  {sermon.sermonAudioUrl && (
                    <Box>
                      <Text fontWeight="bold" color="#0628A3" fontSize="xl">
                        Audio Sermon:
                      </Text>
                      <HStack>
                        <audio
                          src={sermon.sermonAudioUrl}
                          width="100%"
                          controls
                          allowFullScreen=""
                          allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        />
                      </HStack>
                    </Box>
                  )}
                </Stack>
              </Box>
              <Box
                w={{ base: '100%', lg: '40%' }}
                overflowY="auto"
                borderRadius={10}
                boxShadow="0px 4px 18px rgba(0, 0, 0, 0.25)"
                maxH={700}
              >
                <Box w="100%" h="50%">
                  <OnlinePageTabs
                    sermonNoteId={sermonNoteId}
                    user={user}
                    history={history}
                  />
                </Box>
              </Box>
            </Stack>
            <VStack
              alignItems="left"
              alignContent="center"
              mx={{ base: '5px', lg: '20px' }}
            >
              <Stack spacing={8}>
                <Stack spacing={4}>
                  {relatedSermons.length > 0 && (
                    <Text fontWeight="bold" color="#0628A3" fontSize="xl">
                      More from this series:
                    </Text>
                  )}
                  {relatedSermons.length > 0 &&
                    relatedSermons.map((sermon, i) => (
                      <RelatedSermonCard
                        key={sermon.id}
                        sermonData={sermon}
                        allSermons={allSermons}
                      />
                    ))}
                </Stack>
                <Stack spacing={4}>
                  <Text fontWeight="bold" color="#0628A3" fontSize="xl">
                    Other past sermons you might like:
                  </Text>
                  {randomSermons.length > 0 &&
                    randomSermons.map((sermon, i) => (
                      <RelatedSermonCard
                        key={sermon.id}
                        sermonData={sermon}
                        allSermons={allSermons}
                      />
                    ))}
                </Stack>
              </Stack>
            </VStack>
          </Box>
        </Container>
      )}
    </>
  );
};

export default SermonDetails;
