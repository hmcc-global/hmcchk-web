import {
  Box,
  Container,
  Flex,
  Text,
  VStack,
  Heading,
  Link,
  Button,
  LinkOverlay,
  Image,
  Fade,
  IconButton,
} from '@chakra-ui/react';
import { ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons';
import { InView } from 'react-intersection-observer';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import { DateTime } from 'luxon';
import { useEffect, useRef, useState, React } from 'react';
import { getRenderDate } from '../helpers/eventsHelpers';
import EventsSectionCard from './EventsSectionCards';

const EventsSection = () => {
  const [events, setEvents] = useState([]);
  const [slideIndex, setSlideIndex] = useState(0);

  const slider = useRef(null);

  const onArrowClick = (_, next) => {
    setSlideIndex(next);
  };
  const populateData = async () => {
    try {
      const { data, status } = await axios.get('/api/announcement/get');

      if (status === 200) {
        const filtered = [];
        const filteredEndDate = data.filter((item) => {
          if (item.displayStartDateTime) {
            let displayStartDate = new DateTime.fromISO(
              item.displayStartDateTime
            );
            if (displayStartDate > DateTime.now()) return false;
          }

          if (item.displayEndDateTime !== '') {
            // Add one day to offset end date to end of day
            let endDate = new DateTime.fromISO(item.displayEndDateTime);
            let startDate = new DateTime.fromISO(item.displayStartDateTime);
            const renderDate = getRenderDate(
              item.eventStartDate,
              item.eventEndDate,
              item.eventInterval,
              item.eventStartTime
            );
            item.renderDate = renderDate;

            return endDate > DateTime.now() && DateTime.now() > startDate;
          } else return false;
        });
        filteredEndDate.sort((a, b) =>
          a.renderDate === ''
            ? 1
            : b.renderDate === ''
            ? -1
            : a.renderDate < b.renderDate
            ? -1
            : 1
        );
        // Resources are last in the list
        filteredEndDate.sort((a, b) => {
          const hasOthersA = a.eventType?.some(
            (type) => type.value === 'Resources'
          );
          const hasOthersB = b.eventType?.some(
            (type) => type.value === 'Resources'
          );

          if (hasOthersA && !hasOthersB) {
            return 1;
          } else if (!hasOthersA && hasOthersB) {
            return -1;
          } else {
            return a.renderDate < b.renderDate ? -1 : 1;
          }
        });
        filtered.push(...filteredEndDate);
        setEvents(filtered);
      } else {
        throw Error('Something went wrong with the request');
      }
    } catch (err) {
      console.log(err);
    }
  };

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
    variableWidth: false,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
    beforeChange: onArrowClick,
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

  const sliderStyle = {
    width: '100%',
    position: 'relative',
    height: 'auto',
  };
  return (
    <InView rootMargin="-50px" triggerOnce={true}>
      {({ inView, ref }) => (
        <Fade transition={{ enter: { duration: 1 } }} in={inView}>
          <Container maxW="container.xl" pr="0" ref={ref}>
            <Flex
              h="auto"
              direction={{ base: 'column', md: 'row' }}
              alignItems="flex-start"
              paddingTop={'2em'}
              paddingBottom="2em"
            >
              <Flex
                w={{ base: '100%', md: '30%' }}
                justifyContent="flex-start"
                display="flex"
              >
                <VStack
                  w="100%"
                  fontFamily="Manrope"
                  alignItems="flex-start"
                  color="black"
                  spacing={[3, 3, 10]}
                >
                  <Box position="relative">
                    <Box
                      w={{ base: '105%', md: '100%' }}
                      position="absolute"
                      h={{ base: '115%', md: '110%' }}
                      bgPos={{ base: '100% 100%', md: '0% 100%' }}
                      bgSize={{ base: '40%', md: '56%' }}
                      bgRepeat="no-repeat"
                      bgImage={`url('${process.env.PUBLIC_URL}/images/home/vector-yellow-1.svg')`}
                    />
                    <Heading
                      fontFamily="DMSerifDisplay_Italic"
                      fontSize={['2rem', '2rem', '3rem', '3.75rem']}
                      fontWeight={400}
                    >
                      Upcoming Events
                    </Heading>
                  </Box>
                  <Text
                    display={['none', 'none', 'block']}
                    fontSize={{ base: '0.925rem', md: '1.2rem' }}
                  >
                    Check out what's happening in HMCC of Hong Kong
                  </Text>
                  <Text
                    display={['block', 'block', 'none']}
                    fontSize={{ base: '0.925rem', md: '1.2rem' }}
                  >
                    Click on the events below to see what's happening at HMCC of
                    Hong Kong!
                  </Text>
                  <Link
                    href="/events"
                    textDecoration="none"
                    _hover={{ textDecoration: 'none' }}
                    id="homepage-events"
                    minW="12em"
                    display={{ base: 'none', md: 'block' }}
                  >
                    <Button
                      color="#black"
                      bgColor="#EBBB41"
                      borderRadius="20em"
                      border="1px solid #F6FAFF"
                      fontWeight="700"
                      p={[0, 0, '0.4em', '0.6em 1.75em']}
                      boxSizing="content-box"
                      _hover={{
                        background: 'none',
                        border: '1px solid #EBBB41',
                      }}
                      id="homepage-events"
                      w="full"
                    >
                      <Flex
                        flexDir="row"
                        h="full"
                        w="full"
                        justifyContent="space-evenly"
                      >
                        <Text
                          fontSize={['1rem', '1rem', '1.2rem', '1.4rem']}
                          my="auto"
                        >
                          All Events
                        </Text>
                        <Image
                          w="auto"
                          fill="black"
                          my="auto"
                          h="70%"
                          src={
                            process.env.PUBLIC_URL +
                            '/images/home/call-made-black.svg'
                          }
                        />
                      </Flex>
                    </Button>
                  </Link>
                </VStack>
              </Flex>
              <Flex w={['100%', '100%', '70%']} flexDir="column">
                <Box
                  w="100%"
                  boxSizing="border-box"
                  display="flex"
                  justifyContent="space-evenly"
                  alignItems="flex-start"
                  height="auto"
                  marginTop={['1em', '2.5em']}
                  marginBottom={'1em'}
                >
                  <Box w="100%" display={['block', 'block', 'block']}>
                    <Slider
                      ref={slider}
                      {...sliderSettings}
                      style={sliderStyle}
                    >
                      {events.length > 0 &&
                        events.map((event, i) => {
                          return (
                            <EventsSectionCard
                              width={['17em', '17em', '100%']}
                              height="auto"
                              event={event}
                              key={'event' + i}
                            />
                          );
                        })}
                    </Slider>
                  </Box>
                </Box>
                <Flex display={['none', 'none', 'block']} flexDir="row">
                  <IconButton
                    onClick={() => {
                      return slideIndex != 0
                        ? slider?.current?.slickPrev()
                        : '';
                    }}
                    isRound={true}
                    bgColor={
                      (slideIndex != 0 ? '#EBBB41' : 'gray') + ' !important'
                    }
                    mr={10}
                    icon={<ChevronLeftIcon boxSize={7} color="white" />}
                  />
                  <IconButton
                    onClick={() => {
                      return slideIndex < events.length - 2
                        ? slider?.current?.slickNext()
                        : '';
                    }}
                    isRound={true}
                    bgColor={
                      (slideIndex < events.length - 2 ? '#EBBB41' : 'gray') +
                      ' !important'
                    }
                    icon={<ChevronRightIcon boxSize={7} color="white" />}
                  />
                </Flex>
              </Flex>

              <Button
                display={{ base: 'block', md: 'none' }}
                w="95%"
                color="black"
                bgColor="#EBBB41"
                borderRadius="20em"
                alignSelf="start"
                mt="1"
                ml={['auto', 'auto', '5%']}
                mr={['auto', 'auto', 0]}
                mb="10%"
                fontSize=""
                id="homepage-events"
              >
                <LinkOverlay href="/events">
                  <Flex flexDir="row" h="full" w="full" justifyContent="center">
                    <Text fontSize="1rem" mr="2%" my="auto">
                      See All Events
                    </Text>
                    <Image
                      w="auto"
                      fill="black"
                      ml="2%"
                      my="auto"
                      h="70%"
                      src={
                        process.env.PUBLIC_URL +
                        '/images/home/call-made-black.svg'
                      }
                    />
                  </Flex>
                </LinkOverlay>
              </Button>
            </Flex>
          </Container>
        </Fade>
      )}
    </InView>
  );
};

export default EventsSection;
