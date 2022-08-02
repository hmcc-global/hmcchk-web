import {
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

const allEventsText = 'all events >';

const EventsSection = () => {
  const [events, setEvents] = useState([]);
  const [computedMargin, setComputedMargin] = useState();
  const [slideIndex, setSlideIndex] = useState(0);

  const marginRef = useRef(null);

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
  const currentWindow = useWindowSize();
  useEffect(
    () =>
      marginRef.current
        ? setComputedMargin(
            window
              .getComputedStyle(marginRef.current)
              .getPropertyValue('margin-left')
          )
        : '',
    [currentWindow]
  );

  useEffect(() => {
    document.querySelectorAll('.slick-track').forEach((el) => {
      el.style.setProperty('margin-left', computedMargin, 'important');
    });
  }, [computedMargin]);

  useEffect(() => {
    populateData();
  }, []);
  const sliderSettings = {
    adaptiveHeight: true,
    centerMode: false,
    dots: false,
    focusOnSelect: true,
    infinite: false,
    slidesPerRow: 1,
    speed: 500,
    swipeToSlide: true,
    variableWidth: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow index={slideIndex} maxSlide={events.length} />,
    prevArrow: <SamplePrevArrow index={slideIndex} />,
    afterChange: onArrowClick,
  };

  const sliderStyle = {
    width: '100%',
    position: 'relative',
    height: 'auto',
  };
  return (
    <Flex w="full" h={['95vh', 'auto']} direction="column">
      <Container
        maxW="container.lg"
        justifyContent="center"
        display="flex"
        marginTop="2em"
        ref={marginRef}
      >
        <VStack w="full" alignItems={['flex-start', null]}>
          <HStack
            w={[null, 'full']}
            whiteSpace="nowrap"
            height="10vh"
            marginBottom="1em"
            justifyContent="space-between"
          >
            <Heading fontSize={['2em', '5xl']} color="black">
              Upcoming Events
            </Heading>
            <chakra.hr
              width="full"
              color="black"
              border="none"
              height="2px"
              bgColor="black"
              display={['none', 'block']}
            />
            <Text color="black" display={['none', 'block']} fontWeight="900">
              <Link href="/events">{allEventsText}</Link>
            </Text>
          </HStack>
        </VStack>
      </Container>
      <Box
        w="100%"
        boxSizing="border-box"
        display="flex"
        justifyContent="flex-start"
        alignItems="flex-start"
        height="auto"
        overflowX={['auto', 'auto', 'auto', 'auto', 'hidden']}
        overflowY="hidden"
        whiteSpace="nowrap"
        marginBottom={['none', '1.5em']}
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
        display={['block', 'none']}
        width="15em"
        color="#A5CBFF"
        marginTop="2em"
        background="transparent"
        border="2px solid #A5CBFF"
        borderRadius="7px"
        alignSelf="center"
        mb="10%"
      >
        <LinkOverlay href="/events">See All Events</LinkOverlay>
      </Button>
    </Flex>
  );
};

export default EventsSection;
