import {
  Button,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  Box,
  useBreakpointValue,
  Image,
  HStack,
  Text,
} from '@chakra-ui/react';
import { RepeatIcon } from '@chakra-ui/icons';
import { useMemo, useState } from 'react';
import SermonNotesContainer from '../sermon-notes/SermonNotesContainer';
import SermonSeries from '../helpers/components/SermonSeries';

const OnlinePageTabs = ({
  user,
  history,
  sermonNoteId,
}) => {
  const [noteId, setNoteId] = useState(0);
  const [tab, setTab] = useState(0);
  const isMobile = useBreakpointValue({ base: true, lg: false });

  const refreshSermonNotes = () => {
    setNoteId(noteId + 1);
  };

  return (
    <Tabs
      isFitted
      h="100%"
      onChange={(i) => setTab(i)}
      overflowY={tab ? 'auto' : 'hidden'}
      border="1px solid"
      borderColor="#4A6EEB"
      borderRadius="10px"
      variant="unstyled"
    >
      <TabList orientation="horizontal" bgColor="#EAF0FF" textColor="#4A6EEB">
        <Tab
          _selected={{
            bgColor: '#4A6EEB',
            textColor: 'white',
            borderColor: '#4A6EEB',
          }}
          fontSize="0.938rem"
        >
          <HStack>
            <Box>
              <Image
                src={
                  tab === 1
                    ? process.env.PUBLIC_URL +
                      '/images/sermons/sermon_icon_unclicked.svg'
                    : process.env.PUBLIC_URL +
                      '/images/sermons/sermon_icon_clicked.svg'
                }
              />
            </Box>{' '}
            <Text>Sermon Notes</Text>
          </HStack>
        </Tab>
        <Tab
          _selected={{
            bgColor: '#4A6EEB',
            textColor: 'white',
            borderColor: '#4A6EEB',
          }}
          fontSize="0.938rem"
        >
          <HStack>
            <Box>
              <Image
                src={
                  tab === 0
                    ? process.env.PUBLIC_URL +
                      '/images/sermons/more_series_unclicked.svg'
                    : process.env.PUBLIC_URL +
                      '/images/sermons/more_series_clicked.svg'
                }
              />
            </Box>{' '}
            <Text>More in The Series</Text>
          </HStack>
        </Tab>
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
          <Box height={['85vh', '90%']} paddingBottom={15} overflow="auto">
            <SermonNotesContainer
              sermonNoteId={sermonNoteId}
              history={history}
              user={user}
            />
          </Box>
        </TabPanel>
        <TabPanel>
          <Box height={['85vh', '90%']} paddingBottom={15} overflow="auto">
            <SermonSeries />
          </Box>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default OnlinePageTabs;
