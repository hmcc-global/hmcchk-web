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
  AspectRatio,
} from '@chakra-ui/react';
import { RepeatIcon } from '@chakra-ui/icons';
import { useState } from 'react';

const OnlinePageTabs = ({ sermonNotes }) => {
  const [noteId, setNoteId] = useState(0);

  const refreshSermonNotes = () => {
    setNoteId(noteId + 1);
  };

  return (
    <Tabs isFitted>
      <TabList orientation="horizontal">
        <Tab>Sermon Notes</Tab>
        <Tab>New to HMCC</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
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
          <AspectRatio
            mb="5"
            width="100%"
            height={{ base: '100vh', md: '50vh' }}
          >
            <iframe
              key={noteId}
              title="Sermon Notes"
              src={sermonNotes}
            ></iframe>
          </AspectRatio>
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
                fast-paced hub for people all over Asia. We believe that only
                the <b>power of the gospel</b> is able to <b>provide hope</b> to
                transform a life in a global city like Hong Kong. No matter what
                your cultural background, stage of life, field of study or
                profession is, and no matter where you are in your spiritual
                journey, we believe that you can experience the transforming
                power of God at Harvest Mission Community Church (HMCC). <br />
                <br />
                We hope that you will experience God as you worship with us and
                get connected to our community of faith. Through this, we pray
                that you will catch a glimpse of God’s desire to transform your
                life so that you can go out and transform the world.
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
                To transform lost people into Christ's disciples who will then
                transform the world.
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
                community and the fullness of life that it offers -- which is
                why we believe in <b>LIFE Groups</b>. <br />
                <br /> LIFE Group is <b>more than just a weekly Bible study</b>.
                It’s about loving one another, investing in the community,
                growing in our faith, and enjoying life together as a family
                living out the Gospel. If you are new to our church, the best
                way to get a taste of who we are and what we believe in is to
                check out one of our LIFE Groups! <br />
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
  );
};

export default OnlinePageTabs;
