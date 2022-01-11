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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
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
import { ChevronLeftIcon } from '@chakra-ui/icons';
import RelatedSermonCard from './RelatedSermonCard';
import { customAxios as axios } from '../helpers/customAxios';
import { DateTime } from 'luxon';
import { DATE_FULL } from 'luxon/src/impl/formats';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import EventsPage from '../events/EventsPage';

const SermonDetails = (props) => {
  const [sermon, setSermon] = useState();
  const [allSermons, setAllSermons] = useState([]);
  const [relatedSermons, setRelatedSermons] = useState([]);
  const [sermonVideoCode, setSermonVideoCode] = useState();
  const [sermonDate, setSermonDate] = useState();
  const [randomSermons, setRandomSermons] = useState([]);
  const [onlineSermon, setOnlineSermon] = useState(false);
  const [noteId, setNoteId] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const currId = props.match.params.id;
  const history = useHistory();

  const onOpen = (e) => {
    if (!e.target.href) {
      setIsOpen(true);
    }
  };

  const onClose = (e) => {
    setIsOpen(false);
  };

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
        sermon.sermonVideoUrl.split('/')[
          sermon.sermonVideoUrl.split('/').length - 1
        ];
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
        <HStack>
          <Button width={'33%'} onClick={onOpen}>
            Connection Issues
          </Button>
          <Modal size="2xl" isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalCloseButton />
              <ModalHeader>Connection Issues</ModalHeader>
              <ModalBody>
                In cases where the livestream video is not working or sermon
                notes are not up to date, please <u>hard refresh</u> using the
                following commands: <br />
                <br />
                <b>On a PC:</b> Press CTRL + SHIFT + R <br />
                <b>On a Mac (Chrome):</b> Press CMD + SHIFT + R <br />
                <b>On a Mac (Safari):</b> Press CMD + OPTION + E (afterwards)
                CMD + R
                <br />
                <br />
                This refreshes your browser's content and ensures proper loading
                of up-to-date page content Alternatively, you can choose to open
                the site through Incognito browsing If you have issues loading
                the video stream on this site, please try and access the stream
                at{' '}
                <Link
                  href="http://youtube.com/c/hmcchk"
                  fontStyle="italic"
                  color="blue"
                  target="_blank"
                >
                  http://youtube.com/c/hmcchk
                </Link>
                .
              </ModalBody>
              <ModalFooter />
            </ModalContent>
          </Modal>
          <Button
            variant="outline"
            width={'33%'}
            as="a"
            href="https://bit.ly/hmcc-prayer"
            target="_blank"
          >
            Need Prayer?
          </Button>
          <Button
            width={'33%'}
            bg="#0628A3"
            color="white"
            as="a"
            href="/give"
            target="_blank"
          >
            Giving
          </Button>
        </HStack>
        <Box bgColor="#F1F1F3" p={5} borderRadius={15}>
          <Text fontWeight="bold" color="#0628A3" fontSize="md">
            Description:
          </Text>
          <Text>{sermon.sermonDesc}</Text>
        </Box>
        <Tabs align="center">
          <TabList>
            <Tab>Sermon Notes</Tab>
            <Tab>Announcements</Tab>
            <Tab>New to HMCC</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Button
                mb={3}
                width="100%"
                fontWeight="bold"
                bg="#F1F1F3"
                color="#0628A3"
                fontSize="md"
                onClick={refreshSermonNotes}
              >
                Refresh Notes
              </Button>
              <AspectRatio
                mb="5"
                width="100%"
                height={{ base: '100vh', md: '50vh' }}
              >
                <iframe
                  key={noteId}
                  title="Sermon Notes"
                  class="resource-tab"
                  src={sermon.sermonNotes}
                ></iframe>
              </AspectRatio>
            </TabPanel>
            <TabPanel>
              <AspectRatio
                mb="5"
                width="100%"
                height={{ base: '100vh', md: '50vh' }}
              >
                <iframe src="/events"></iframe>
                {/* <EventsPage props={props} /> */}
              </AspectRatio>
            </TabPanel>
            <TabPanel>
              <Accordion allowToggle allowMultiple>
                <AccordionItem>
                  <AccordionButton
                    _expanded={{ bg: '#0628A3', color: 'white' }}
                    justifyContent="space-between"
                  >
                    Join Our ZOOM Call!
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel>
                    As a church, we believe that there is power when we worship
                    together and can fellowship with one another in real-time.
                    We encourage our LIFE Groups (small group communities) to
                    zoom together LIVE during the Sunday Celebration to engage
                    with each other for worship, discussion time, etc. If you
                    are new and joining us for the first time or are not yet
                    part of a LIFE Group, feel free to join this ZOOM link to
                    worship together with some people in our welcoming team to
                    get connected. <br />
                    <br />
                    <b>Join Zoom Meeting</b>
                    <br />
                    <Link
                      href="https://us02web.zoom.us/j/87590888306?pwd=dG5lcUdta2liaVduZ2gwWDdTbndpZz09"
                      fontStyle="bold"
                      color="blue"
                      target="_blank"
                    >
                      Meeting Link
                    </Link>
                    <br />
                    <br />
                    <b>Meeting ID:</b> 875 9088 8306
                    <br />
                    <b>Passcode:</b> 434106
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                  <AccordionButton
                    _expanded={{ bg: '#0628A3', color: 'white' }}
                    justifyContent="space-between"
                  >
                    Who are we?
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel>
                    Over 7 million people live in the city of Hong Kong, a
                    fast-paced hub for people all over Asia. We believe that
                    only the <b>power of the gospel</b> is able to{' '}
                    <b>provide hope</b> to transform a life in a global city
                    like Hong Kong. No matter what your cultural background,
                    stage of life, field of study or profession is, and no
                    matter where you are in your spiritual journey, we believe
                    that you can experience the transforming power of God at
                    Harvest Mission Community Church (HMCC). <br />
                    <br />
                    We hope that you will experience God as you worship with us
                    and get connected to our community of faith. Through this,
                    we pray that you will catch a glimpse of God’s desire to
                    transform your life so that you can go out and transform the
                    world.
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                  <AccordionButton
                    _expanded={{ bg: '#0628A3', color: 'white' }}
                    justifyContent="space-between"
                  >
                    Vision and Mission
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel>
                    <b>
                      <u>Vision</u>
                    </b>
                    <br />
                    Multiplying churches in campuses and cities to transform the
                    next generation among the nations. <br />
                    <br />
                    <b>
                      <u>Mission</u>
                    </b>
                    <br />
                    To transform lost people into Christ's disciples who will
                    then transform the world.
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                  <AccordionButton
                    _expanded={{ bg: '#0628A3', color: 'white' }}
                    justifyContent="space-between"
                  >
                    Get Connected
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel>
                    No matter what stage of life you’re in, you are not meant to
                    experience life alone. At HMCC, we believe in the power of
                    community and the fullness of life that it offers -- which
                    is why we believe in <b>LIFE Groups</b>. <br />
                    <br /> LIFE Group is{' '}
                    <b>more than just a weekly Bible study</b>. It’s about
                    loving one another, investing in the community, growing in
                    our faith, and enjoying life together as a family living out
                    the Gospel. If you are new to our church, the best way to
                    get a taste of who we are and what we believe in is to check
                    out one of our LIFE Groups! <br />
                    <br />
                    <b>
                      Get connected and sign up{' '}
                      <Link
                        href="https://rebrand.ly/hmccLG2122"
                        color="blue"
                        target="_blank"
                      >
                        here
                      </Link>
                      !
                    </b>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </TabPanel>
          </TabPanels>
        </Tabs>
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
