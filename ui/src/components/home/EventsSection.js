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
import { useEffect, useRef, useState } from 'react';
import { getRenderDate } from '../helpers/eventsHelpers';
import EventsSectionCard from './EventsSectionCards';

const allEventsText = 'See All Events';

function SampleNextArrow(props) {
  const { onClick, index, maxSlide } = props;
  return index !== maxSlide - 1 ? (
    <div
      style={{
        display: 'block',
        right: '0%',
        position: 'absolute',
        top: '40%',
        zIndex: 8,
        cursor: 'pointer',
      }}
      onClick={onClick}
    >
      <img
        src={process.env.PUBLIC_URL + 'images/home/NextArrow.png'}
        width="80%"
        alt="Arrow"
      />
    </div>
  ) : null;
}

function SamplePrevArrow(props) {
  const { onClick, index } = props;
  return index !== 0 ? (
    <div
      style={{
        display: 'block',
        left: '3%',
        position: 'absolute',
        top: '40%',
        zIndex: 8,
        cursor: 'pointer',
      }}
      onClick={onClick}
    >
      <img
        src={process.env.PUBLIC_URL + 'images/home/PrevArrow.png'}
        width="80%"
        alt="Arrow"
      />
    </div>
  ) : null;
}

const EventsSection = () => {
  const [events, setEvents] = useState([]);
  const [computedMargin, setComputedMargin] = useState();
  const [slideIndex, setSlideIndex] = useState(0);

  const marginRef = useRef(null);

  function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
      width: undefined,
      height: undefined,
    });
    useEffect(() => {
      function handleResize() {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
      window.addEventListener('resize', handleResize);
      handleResize();
      return () => window.removeEventListener('resize', handleResize);
    }, []);
    return windowSize;
  }
  const onArrowClick = (e) => {
    setSlideIndex(e);
  };
  const populateData = async () => {
    try {
      const { data, status } = await axios.get('/api/announcement/get');
      if (status === 200) {
        const filtered = data.filter((item) => {
          if (item.displayEndDateTime === null) {
            return true;
          } else return false;
        });
        const filteredEndDate = data.filter((item) => {
          if (item.displayEndDateTime) {
            // Add one day to offset end date to end of day
            let endDate = new DateTime.fromISO(item.displayEndDateTime);
            const renderDate = getRenderDate(
              item.eventStartDate,
              item.eventEndDate,
              item.eventInterval,
              item.eventStartTime
            );
            item.renderDate = renderDate;
            return endDate > DateTime.now();
          } else return false;
        });
        filteredEndDate.sort((a, b) =>
          a.renderDate === ''
            ? 1
            : b.renderDate === ''
            ? -1
            : a.renderDate > b.renderDate
            ? -1
            : 1
        );
        filtered.push(...filteredEndDate);
        setEvents([...filtered]);
      } else {
        throw Error('Something went wrong with the request');
      }
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
    <Flex
      w="full"
      h="auto"
      direction="column"
      background="#172842"
      alignItems="center"
      paddingTop="2em"
      paddingBottom="2em"
      boxSizing=""
    >
      <Container
        maxW="container.lg"
        justifyContent={['flex-start', 'center']}
        display="flex"
        marginTop="2em"
        ref={marginRef}
      >
        <VStack w="full" alignItems={['flex-start', null]}>
          <HStack
            w={[null, 'full']}
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
                padding="6px 24px"
                boxSizing="content-box"
                _hover={{ background: '#A5CBFF', color: '#172848' }}
              >
                {allEventsText}
              </Button>
            </Link>
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
        whiteSpace="nowrap"
        marginTop="2.5em"
        marginBottom={['none', '3em']}
        _hover={{
          overflowX: 'auto',
        }}
      >
        <Slider {...sliderSettings} style={sliderStyle}>
          {events.length > 0 &&
            events.map((event, i) => {
              return (
                <EventsSectionCard
                  width={['20em', '35em']}
                  height="auto"
                  event={event}
                  key={'event' + i}
                />
              );
            })}
        </Slider>
      </Box>
      <Button
        display={{ base: 'block', md: 'none' }}
        width="10em"
        color="#A5CBFF"
        marginTop="2em"
        background="#172848"
        border="2px solid #A5CBFF"
        borderRadius="7px"
        alignSelf="start"
        ml="5%"
        mb="10%"
        fontSize="1.2em"
        id="homepage-events"
      >
        <LinkOverlay href="/events">See All Events</LinkOverlay>
      </Button>
    </Flex>
  );
};

export default EventsSection;
