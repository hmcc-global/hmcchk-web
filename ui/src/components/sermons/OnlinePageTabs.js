import {
  Button,
  Link,
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
  Box,
  Image,
  GridItem,
  VStack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { RepeatIcon } from '@chakra-ui/icons';
import { Schedule } from '../ignite/streaming/Schedule';
import { useState } from 'react';

const OnlinePageTabs = ({ sermonNotes, isIgnite }) => {
  const [noteId, setNoteId] = useState(0);
  const [tab, setTab] = useState(0);
  const isMobile = useBreakpointValue({ base: true, lg: false });

  const refreshSermonNotes = () => {
    setNoteId(noteId + 1);
  };

  const IgnitePage = () => {
    return (
      <Tabs
        isFitted
        h="100%"
        onChange={(i) => setTab(i)}
        overflowY={tab ? 'auto' : 'hidden'}
      >
        <TabList orientation="horizontal">
          <Tab
            _selected={{
              color: '#46B2D3',
              borderBottom: '2px solid',
              borderBottomColor: '#46B2D3',
            }}
            borderBottomColor="black"
            color="white"
          >
            About Ignite 2022
          </Tab>
          <Tab
            _selected={{
              color: '#FF7461',
              borderBottom: '2px solid',
              borderBottomColor: '#FF7461',
            }}
            borderBottomColor="black"
            color="white"
          >
            Schedule
          </Tab>
        </TabList>
        <TabPanels h="100%">
          <TabPanel h="100%">
            <VStack spacing={3} align="stretch">
              {/*red box*/}
              <Box height="100%" bg="#FF7461" color="white">
                <Text textStyle="Rubik_bold" textAlign="center" padding={4}>
                  !gnite 2022: Go
                </Text>
                <Text
                  marginTop="-20px"
                  textStyle="Rubik"
                  textAlign="center"
                  fontSize="12px"
                  padding={2}
                >
                  Ignite Conference aims to ignite everyone with a passion for
                  God so that they can take the Gospel to every nation in our
                  generation.
                  <br />
                  <br />
                  In the Great Commission (Matthew 28:19-20), Jesus commands us
                  to go and make disciples of all nations. We want to go beyond
                  ourselves and into the world to be His salt and light!
                </Text>
              </Box>
              {/* blue box*/}
              <Box
                height="100%"
                bg="#46B2D3"
                color="white"
                textStyle="Rubik"
                align="center"
              >
                <Text textStyle="Rubik_bold" textAlign="center" padding={5}>
                  Speaker: Rev. Dr. Seth S. Kim
                </Text>
                <Image
                  width="30%"
                  mt={-2}
                  mb={2}
                  src={`${process.env.PUBLIC_URL + '/images/ignite/PSeth.png'}`}
                />
                <Text
                  marginTop="-10px"
                  textStyle="Rubik"
                  textAlign="center"
                  fontSize="12px"
                  padding={2}
                >
                  ​Pastor Seth graduated from the University of Illinois at
                  Urbana-Champaign in 1992, and received his call into full-time
                  ministry while serving as a member of a gospel praise band
                  during his undergraduate years. <br />
                  <br /> In 1996, Pastor Seth and his wife, Christina, started
                  Harvest Mission Community Church in Ann Arbor with the vision
                  of planting a church that would be used by God to “transform
                  lost people into Christ’s disciples who will then transform
                  the world.” In July 2015, Pastor Seth moved to Hong Kong with
                  his whole family to start HMCC of Hong Kong.
                </Text>
              </Box>
              <Box
                height="100%"
                bg="#46B2D3"
                color="white"
                textStyle="Rubik"
                align="center"
              >
                <Text textStyle="Rubik_bold" textAlign="center" padding={5}>
                  Speaker: Pastor Bo Zhu
                </Text>
                <Image
                  width="30%"
                  mt={-2}
                  mb={2}
                  src={`${process.env.PUBLIC_URL + '/images/ignite/PBo.png'}`}
                />
                <Text
                  marginTop="-10px"
                  textStyle="Rubik"
                  textAlign="center"
                  fontSize="12px"
                  padding={2}
                >
                  ​​Pastor Bo graduated from University of Michigan where he
                  accepted Christ and continued to grow in his relationship with
                  God. He was a part of the church plant team in Hong Kong with
                  Pastor Seth. <br />
                  <br />
                  In 2016, he was commissioned as a Pastor during !gnite
                  Conference, and has been serving the church faithfully. He
                  currently lives in Hong Kong with his wife, Erica Zhu, and
                  their son, Noah.
                </Text>
              </Box>
              <Box
                height="100%"
                bg="#46B2D3"
                color="white"
                textStyle="Rubik"
                align="center"
              >
                <Text textStyle="Rubik_bold" textAlign="center" padding={5}>
                  Guest Speaker: Pastor Daniel Jung
                </Text>
                <Image
                  width="30%"
                  mt={-2}
                  mb={2}
                  src={`${process.env.PUBLIC_URL + '/images/ignite/PDan.png'}`}
                />
                <Text
                  marginTop="-10px"
                  textStyle="Rubik"
                  textAlign="center"
                  fontSize="12px"
                  padding={2}
                >
                  ​​Pastor Daniel Jung is from the US but moved his family to
                  live in Chiang Mai, Thailand 12 years ago to live as
                  missionaries.
                  <br />
                  <br />
                  He started and runs Mango House, an orphanage/children’s home
                  with a vision to make disciples for Jesus and to use education
                  to end the cycle of poverty among the children that he serves.
                  <br />
                  <br />
                  He is married to Sue and has 2 sons, Kido and Kiwon.
                </Text>
              </Box>
            </VStack>
          </TabPanel>
          <TabPanel>
            <Schedule maxH={'590'} minW="100%" />
          </TabPanel>
        </TabPanels>
      </Tabs>
    );
  };

  return (
    <>
      {isIgnite ? (
        IgnitePage()
      ) : (
        <Tabs
          isFitted
          h="100%"
          onChange={(i) => setTab(i)}
          overflowY={tab ? 'auto' : 'hidden'}
        >
          <TabList orientation="horizontal">
            <Tab>Sermon Notes</Tab>
            <Tab>New to HMCC</Tab>
          </TabList>
          <TabPanels h="100%">
            <TabPanel h="100%">
              <Button
                mb={3}
                fontWeight="bold"
                bg="#F1F1F3"
                color="#0628A3"
                fontSize="md"
                onClick={refreshSermonNotes}
              >
                <RepeatIcon />
              </Button>
              <Box height="90%" paddingBottom={15}>
                <iframe
                  key={noteId}
                  title="Sermon Notes"
                  src={sermonNotes}
                  width="100%"
                  style={
                    isMobile
                      ? {
                          height: '100vh',
                        }
                      : {
                          height: '100%',
                        }
                  }
                ></iframe>
              </Box>
            </TabPanel>
            <TabPanel>
              <Accordion allowToggle allowMultiple>
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
      )}
      ;
    </>
  );
};

export default OnlinePageTabs;
