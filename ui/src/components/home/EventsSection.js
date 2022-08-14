import {
  chakra,
  Box,
  Container,
  Flex,
  HStack,
  Text,
  VStack,
  Heading,
  Link,
  Button,
  LinkOverlay,
} from '@chakra-ui/react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';
import { getRenderDate } from '../helpers/eventsHelpers';
import EventsSectionCard from './EventsSectionCards';

const allEventsText = 'See All Events';

const EventsSection = () => {
  const [events, setEvents] = useState([]);

  const sliderSettings = {
    adaptiveHeight: true,
    arrows: false,
    centerMode: true,
    dots: false,
    focusOnSelect: true,
    infinite: false,
    slidesPerRow: 1,
    speed: 500,
    swipeToSlide: true,
    variableWidth: true,
  };

  const sliderStyle = {
    width: '100%',
    position: 'relative',
    left: '50%',
    right: '50%',
    marginLeft: '-50vw',
    marginRight: '-50vw',
  };

  const populateData = async () => {
    try {
      const { data } = await axios.get('/api/announcements/get-announcements');
      const filtered = data.filter((item) => {
        if (item.endDate) {
          let endDate = new DateTime.fromISO(item.endDate).plus({ days: 1 });
          const renderDate = getRenderDate(
            item.startDate,
            item.endDate,
            item.recurrence
          );
          item.renderDate = renderDate;
          return endDate > DateTime.now();
        } else return false;
      });
      filtered.sort((a, b) => (a.renderDate > b.renderDate ? 1 : -1));
      let upcoming = filtered.slice(0, 5);
      setEvents(upcoming);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    populateData();
  }, []);

  return (
    <Flex
      w="full"
      h={{ base: 'auto', md: 'auto' }}
      direction="column"
      background="#172848"
    >
      <Container
        maxW="container.lg"
        justifyContent="center"
        display="flex"
        marginTop="2em"
      >
        <VStack w="full" alignItems={['flex-start', null]}>
          <HStack
            w={[null, 'full']}
            whiteSpace="nowrap"
            height="10vh"
            marginBottom="1em"
            justifyContent="space-between"
          >
            <VStack alignItems="flex-start">
              <Heading fontSize={['2em', '4xl']} fontWeight={600} color="white">
                Events
              </Heading>
              <Text color="white">
                Check out what's happening in HMCC of Hong Kong
              </Text>
            </VStack>
            <Link
              href="/events"
              textDecoration="none"
              _hover={{ textDecoration: 'none' }}
            >
              <Button
                color="#A5CBFF"
                background="transparent"
                border="2px solid #A5CBFF"
                borderRadius="7px"
                display={{ base: 'none', md: 'block' }}
                fontWeight="700"
              >
                {allEventsText}
              </Button>
            </Link>
          </HStack>
        </VStack>
      </Container>
      <Box
        w="full"
        display="flex"
        justifyContent="flex-start"
        height="auto"
        overflowX={['auto', 'auto', 'auto', 'auto', 'hidden']}
        overflowY="hidden"
        whiteSpace="nowrap"
        marginBottom={['none', '3em']}
        _hover={{
          overflowX: 'auto',
        }}
      >
        <Slider {...sliderSettings} style={sliderStyle}>
          {events.length > 0 &&
            events.map((event, i) => (
              <EventsSectionCard
                width={['15em', '35em']}
                height="auto"
                event={event}
                key={'event' + i}
              />
            ))}
        </Slider>
      </Box>
      <Button
          display={{base:'block', md:'none'}}
          width="15em"
          color="#A5CBFF"
          background="transparent"
          border="2px solid #A5CBFF"
          borderRadius="7px"
          alignSelf="center"
          mb="10%"
        >
          <LinkOverlay href="/events">All events</LinkOverlay>
        </Button>
    </Flex>
  );
};

export default EventsSection;
