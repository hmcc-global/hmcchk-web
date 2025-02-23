import {
  Button,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  Box,
  Image,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { RepeatIcon } from '@chakra-ui/icons';
import { useMemo, useState, useRef } from 'react';
import SermonNotesContainer from '../sermon-notes/SermonNotesContainer';
import SermonSeries from './SermonSeries';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const OnlinePageTabs = ({ user, history, sermonNoteId, sermonSeries }) => {
  const [noteId, setNoteId] = useState(0);
  const [tab, setTab] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);

  const slider = useRef(null);

  const refreshSermonNotes = () => {
    setNoteId(noteId + 1);
  };

  const sliderSettings = {
    centerMode: false,
    dots: false,
    infinite: false,
    speed: 500,
    swipeToSlide: true,
    variableWidth: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          variableWidth: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          variableWidth: true,
        },
      },
    ],
  };

  const slideButtons = [
    {
      text: 'Sermon Notes',
      image: '/images/sermons/sermon_icon_unclicked.svg',
    },

    {
      text: 'Need Prayer?',
      image: '/images/sermons/prayer_icon_unclicked.svg',
    },
    { text: 'Giving', image: '/images/sermons/giving_icon_unclicked.svg' },
    {
      text: 'Upcoming Events',
      image: '/images/sermons/event_icon_unclicked.svg',
    },

    {
      text: 'More in Series',
      image: '/images/sermons/more_series_unclicked.svg',
    },
  ];

  const sliderStyle = {
    width: '100%',
    position: 'relative',
    height: 'auto',
  };

  const handleClick = (index) => {
    if (index === 0) {
      setSlideIndex(index);
    }
    if (index === 1) {
      window.open('https://bit.ly/hmcc-prayer', '_blank');
    } else if (index === 2) {
      window.open('/give', '_blank');
    } else if (index === 3) {
      window.open('/events', '_blank');
    } else if (index === 4) {
      setSlideIndex(1);
    }
  };

  return (
    <>
      <Tabs
        isFitted
        h="100%"
        onChange={(i) => setTab(i)}
        overflowY={tab ? 'auto' : 'hidden'}
        display={{ base: 'none', md: 'block' }}
        maxH={700}
        borderRadius={'12px'}
        borderWidth={'1px'}
        borderColor="#4A6EEB"
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
              <Image
                src={
                  tab === 1
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
              <Image
                src={
                  tab === 0
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
          <TabPanel p={'1rem'}>
            <SermonSeries sermonSeriesName={sermonSeries} />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <VStack align="center" gap="5" display={{ base: 'block', lg: 'none' }}>
        <Slider ref={slider} {...sliderSettings} style={sliderStyle}>
          {slideButtons.length > 0 &&
            slideButtons.map((button, i) => {
              const imageSrc =
                slideIndex === i
                  ? process.env.PUBLIC_URL +
                    button.image.replace('_unclicked', '_clicked')
                  : process.env.PUBLIC_URL + button.image;

              return (
                <Box marginRight="1em" key={i}>
                  <Button
                    backgroundColor={slideIndex === i ? '#4A6EEB' : '#DFE7FF'}
                    borderRadius="30px"
                    textAlign="center"
                    w="90%"
                    _hover={{}}
                    onClick={() => handleClick(i)}
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
                </Box>
              );
            })}
        </Slider>
        {slideIndex === 0 && (
          <Box
            height={['85vh', '90%']}
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
            />
          </Box>
        )}
        {slideIndex === 1 && (
          <Box
            height={['85vh', '90%']}
            w="100%"
            paddingBottom={15}
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

export default OnlinePageTabs;
