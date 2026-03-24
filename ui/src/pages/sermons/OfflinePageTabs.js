import {
  Button,
  Tabs,
  Box,
  HStack,
  Text,
  VStack,
  Image,
} from '@chakra-ui/react';
import { useState } from 'react';
import SermonNotesContainer from '../sermon-notes/SermonNotesContainer';
import SermonSeries from './SermonSeries';
import { LuRepeat } from 'react-icons/lu';

const OfflinePageTabs = ({ user, history, sermonNoteId, sermonSeries }) => {
  const [noteId, setNoteId] = useState(0);
  const [tab, setTab] = useState('tab-0');
  const [slideIndex, setSlideIndex] = useState(0);

  const refreshSermonNotes = () => {
    setNoteId(noteId + 1);
  };

  const slideButtons = [
    {
      text: 'Sermon Notes',
      image: '/images/sermons/sermon_icon_unclicked.svg',
    },
    {
      text: 'More in Series',
      image: '/images/sermons/more_series_unclicked.svg',
    },
  ];

  const handleClick = (index) => {
    setSlideIndex(index);
  };

  return (
    <>
      <Tabs.Root
        fitted
        h="100%"
        defaultValue="tab-0"
        onValueChange={(details) => setTab(details.value)}
        overflowY={'hidden'}
        display={{ base: 'none', md: 'block' }}
        maxH={700}
        borderRadius={'12px'}
        borderWidth={'1px'}
        borderColor="#4A6EEB"
      >
        <Tabs.List orientation="horizontal">
          <Tabs.Trigger
            value="tab-0"
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
            <HStack alignItems="center" gap={'0.75rem'} py="0.75rem">
              <Image
                src={
                  tab === 'tab-1'
                    ? process.env.PUBLIC_URL +
                      '/images/sermons/sermon_icon_unclicked.svg'
                    : process.env.PUBLIC_URL +
                      '/images/sermons/sermon_icon_clicked.svg'
                }
              />
              <Text fontSize={{ base: '0.75rem', md: '1rem' }} fontWeight={400}>
                Sermon Notes
              </Text>
            </HStack>
          </Tabs.Trigger>
          <Tabs.Trigger
            value="tab-1"
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
            <HStack alignItems="center" gap={'0.75rem'} py="0.375rem">
              <Image
                src={
                  tab === 'tab-0'
                    ? process.env.PUBLIC_URL +
                      '/images/sermons/more_series_unclicked.svg'
                    : process.env.PUBLIC_URL +
                      '/images/sermons/more_series_clicked.svg'
                }
              />
              <Text fontSize={{ base: '0.75rem', md: '1rem' }} fontWeight={400}>
                More in Series
              </Text>
            </HStack>
          </Tabs.Trigger>
        </Tabs.List>
          <Tabs.Content value="tab-0" h="100%">
            <Button
              mb={3}
              fontWeight="bold"
              bg="#F1F1F3"
              color="#0628A3"
              fontSize="md"
              onClick={refreshSermonNotes}
            >
              <LuRepeat />
            </Button>
            <Box height={'90%'} paddingBottom={15} overflow="auto">
              <SermonNotesContainer
                sermonNoteId={sermonNoteId}
                history={history}
                user={user}
              />
            </Box>
          </Tabs.Content>
          <Tabs.Content value="tab-1" h="100%">
            <Box height={'90%'} overflow="auto">
              <SermonSeries sermonSeriesName={sermonSeries} />
            </Box>
          </Tabs.Content>
      </Tabs.Root>
      <VStack
        alignItems="center"
        gap={'1rem'}
        maxW="100%"
        display={{ base: 'block', md: 'none' }}
      >
        <HStack
          gap="1rem"
          w="100%"
          alignItems={'center'}
          justifyContent={'center'}
        >
          {slideButtons.length > 0 &&
            slideButtons.map((button, i) => {
              const imageSrc =
                slideIndex === i
                  ? process.env.PUBLIC_URL +
                    button.image.replace('_unclicked', '_clicked')
                  : process.env.PUBLIC_URL + button.image;

              return (
                <Button
                  key={i}
                  backgroundColor={slideIndex === i ? '#4A6EEB' : '#DFE7FF'}
                  borderRadius="30px"
                  textAlign="center"
                  _hover={{}}
                  onClick={() => handleClick(i)}
                  px={'1rem'}
                >
                  <Image src={imageSrc} mr="2" />
                  <Text
                    fontFamily="Manrope"
                    fontWeight="600"
                    fontSize="0.625rem"
                    textColor={slideIndex === i ? '#F6FAFF' : '#4A6EEB'}
                    textAlign="center"
                  >
                    {button.text}
                  </Text>
                </Button>
              );
            })}
        </HStack>

        {slideIndex === 0 && (
          <Box
            height={'85vh'}
            paddingBottom={15}
            overflow="auto"
            borderRadius="15px"
            borderWidth="1px"
            borderColor="#4A6EEB"
          >
            <SermonNotesContainer
              sermonNoteId={sermonNoteId}
              history={history}
              user={user}
              isOfflineSermonNote={true}
            />
          </Box>
        )}
        {slideIndex === 1 && (
          <Box
            height={'85vh'}
            w="100%"
            p={'1rem'}
            overflow="auto"
            borderRadius="15px"
            borderWidth="1px"
            borderColor="#4A6EEB"
          >
            <SermonSeries sermonSeriesName={sermonSeries} />
          </Box>
        )}
      </VStack>
    </>
  );
};

export default OfflinePageTabs;
