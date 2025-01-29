import {
  Button,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  Box,
  HStack,
  Text,
  Icon,
} from '@chakra-ui/react';
import { RepeatIcon } from '@chakra-ui/icons';
import { useMemo, useState } from 'react';
import SermonNotesContainer from '../sermon-notes/SermonNotesContainer';
import { MdOutlineLibraryBooks } from 'react-icons/md';
import { RiPlayList2Line } from 'react-icons/ri';
import SermonSeries from './SermonSeries';

const OfflinePageTabs = ({ user, history, sermonNotes, sermonSeries }) => {
  const [noteId, setNoteId] = useState(0);
  const [tab, setTab] = useState(0);
  const sermonId = useMemo(() => {
    return sermonNotes && sermonNotes.split('/').reverse()[0];
  }, [sermonNotes]);

  const refreshSermonNotes = () => {
    setNoteId(noteId + 1);
  };

  return (
    <Tabs
      isFitted
      h="100%"
      onChange={(i) => setTab(i)}
      overflowY={tab ? 'auto' : 'hidden'}
    >
      <TabList orientation="horizontal">
        <Tab
          p={0}
          _selected={{
            bgColor: '#4A6EEB',
            textColor: 'white',
            color: 'white',
            borderColor: '#4A6EEB',
          }}
          bgColor={'#EAF0FF'}
          color={'#4A6EEB'}
        >
          <HStack alignItems="center" spacing={'0.75rem'} py="0.75rem">
            <Icon
              as={MdOutlineLibraryBooks}
              boxSize={{ base: '1.25rem', lg: '1.5rem' }}
            />
            <Text fontSize={{ base: '0.75rem', md: '1rem' }} fontWeight={400}>
              Sermon Notes
            </Text>
          </HStack>
        </Tab>
        <Tab
          p={0}
          _selected={{
            bgColor: '#4A6EEB',
            textColor: 'white',
            color: 'white',
            borderColor: '#4A6EEB',
          }}
          bgColor={'#EAF0FF'}
          color={'#4A6EEB'}
        >
          <HStack alignItems="center" spacing={'0.75rem'} py="0.375rem">
            <Icon
              as={RiPlayList2Line}
              boxSize={{ base: '1.25rem', lg: '1.5rem' }}
            />
            <Text fontSize={{ base: '0.75rem', md: '1rem' }} fontWeight={400}>
              More in Series
            </Text>
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
              sermonNoteId={sermonId}
              history={history}
              user={user}
              isOfflineSermonNote={true}
            />
          </Box>
        </TabPanel>
        <TabPanel p={'1rem'}>
          <SermonSeries sermonSeriesName={sermonSeries} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default OfflinePageTabs;
