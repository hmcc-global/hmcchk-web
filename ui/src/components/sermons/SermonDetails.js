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
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import { ChevronLeftIcon, RepeatIcon } from '@chakra-ui/icons';
import OnlinePageButtons from './OnlinePageButtons';
import RelatedSermonCard from './RelatedSermonCard';
import { customAxios as axios } from '../helpers/customAxios';
import { DateTime } from 'luxon';
import { DATE_FULL } from 'luxon/src/impl/formats';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import OnlinePageTabs from './OnlinePageTabs';

const SermonDetails = (props) => {
  const [sermon, setSermon] = useState();
  const [allSermons, setAllSermons] = useState([]);
  const [relatedSermons, setRelatedSermons] = useState([]);
  const [sermonVideoCode, setSermonVideoCode] = useState();
  const [sermonDate, setSermonDate] = useState();
  const [randomSermons, setRandomSermons] = useState([]);
  const [onlineSermon, setOnlineSermon] = useState(false);
  const [noteId, setNoteId] = useState(0);
  const currId = props.match.params.id;
  const history = useHistory();

  useEffect(() => {
    (async () => {
      await getData();
    })();
  }, [currId]);

  const getData = async () => {
    try {
      const { data, status } = await axios.get('/api/sermons/get-sermons');
      if (status === 200) {
        let currentSermon = data.find(({ id }) => id === parseInt(currId));
        if (!currentSermon) {
          history.push('/404');
        }
        setAllSermons([...data]);
        if (currentSermon.streamLink && currentSermon.sermonNotes) {
          setOnlineSermon(true);
        }
        setSermon(currentSermon);
      } else {
        throw Error('Something went wrong');
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (allSermons && sermon) {
      !onlineSermon && getRelatedSermons();
      getSermonDate();
      getVideoCode();
      !onlineSermon && getRandomSermons();
    }
  }, [allSermons, sermon, onlineSermon]);

  const getRelatedSermons = () => {
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
  };

  const getSermonDate = () => {
    let sermonDate = DateTime.fromISO(sermon.datePreached).toLocaleString(
      DATE_FULL
    );
    setSermonDate(sermonDate);
  };

  const getVideoCode = () => {
    if (sermon.streamLink === '') {
      let sermonVideoCode =
        sermon.sermonUrl.split('/')[sermon.sermonUrl.split('/').length - 1];
      setSermonVideoCode(`https://www.youtube.com/embed/${sermonVideoCode}`);
    } else {
      setSermonVideoCode(sermon.streamLink);
    }
  };

  const randomIndex = (max) => {
    var arr = [];
    while (arr.length < Math.min(max, 5)) {
      var r = Math.floor(Math.random() * max);
      if (arr.indexOf(r) === -1) arr.push(r);
    }
    return arr;
  };

  const getRandomSermons = () => {
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
  };

  const refreshSermonNotes = () => {
    setNoteId(noteId + 1);
  };

  const OnlineSection = () => {
    return (
      <>
        <OnlinePageButtons />
        <Box bgColor="#F1F1F3" p={5} borderRadius={15}>
          <Text fontWeight="bold" color="#0628A3" fontSize="md">
            Description:
          </Text>
          <Text>{sermon.sermonDesc}</Text>
        </Box>
        <OnlinePageTabs
          noteId={noteId}
          sermonNotes={sermon.sermonNotes}
          refreshCallback={refreshSermonNotes}
        />
      </>
    );
  };

  return (
    <>
      {sermon && allSermons && (
        <Container maxW="container.lg">
          <Box mb="20px" mt="20px">
            <VStack alignItems="left" alignContent="left">
              <Link href="/sermons">
                <Button
                  variant="link"
                  fontSize="lg"
                  color="black"
                  justifyContent="left"
                  leftIcon={<ChevronLeftIcon />}
                  display={{ base: 'none', md: 'flex' }}
                >
                  See all past sermons
                </Button>
              </Link>
              <AspectRatio mb="5" width="100%" ratio={16 / 9}>
                <iframe
                  width="560"
                  height="315"
                  src={sermonVideoCode}
                  title="Video player"
                  frameBorder="0"
                  allow={`accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; ${
                    sermon.streamLink ? 'autoplay;' : ''
                  }`}
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
                    {sermon.streamTime ? (
                      <HStack>
                        <Text fontWeight="bold">Time: </Text>
                        <Text>{sermon.streamTime}</Text>
                      </HStack>
                    ) : (
                      <HStack>
                        <Text fontWeight="bold">Series: </Text>
                        <Text>{sermon.sermonSeries[0].name}</Text>
                      </HStack>
                    )}
                  </Stack>
                  <Stack
                    spacing={{ base: 'normal', md: 'auto' }}
                    direction={{ base: 'column', md: 'row' }}
                  >
                    {sermon.streamTime ? (
                      <>
                        <HStack>
                          <Text fontWeight="bold">Series: </Text>
                          <Text>{sermon.sermonSeries[0].name}</Text>
                        </HStack>
                        <HStack>
                          <Text fontWeight="bold">Passage:</Text>
                          <Text>{sermon.passage}</Text>
                        </HStack>
                      </>
                    ) : (
                      <HStack>
                        <Text fontWeight="bold">Passage:</Text>
                        <Text>{sermon.passage}</Text>
                      </HStack>
                    )}
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
                        height="232"
                        frameBorder="0"
                        controls
                        allowFullScreen=""
                        allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      />
                    </HStack>
                  </Box>
                )}
                {onlineSermon ? (
                  <OnlineSection />
                ) : (
                  <>
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
                  </>
                )}
              </Stack>
            </VStack>
          </Box>
        </Container>
      )}
    </>
  );
};

export default SermonDetails;
