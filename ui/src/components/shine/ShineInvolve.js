import {
  Box,
  Flex,
  Text,
  Stack,
  Icon,
  HStack,
  VStack,
  Heading,
  AspectRatio,
  IconButton,
  Link,
  Button,
  ButtonGroup,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Center,
  Image,
} from '@chakra-ui/react';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { DateTime } from 'luxon';
import { getRenderDate } from '../helpers/eventsHelpers';
import EventCard from '../events/EventCard';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons';
import { RiCalendarEventFill } from 'react-icons/ri';
import { BsClockFill, BsFullscreen } from 'react-icons/bs';
import { ImLocation2 } from 'react-icons/im';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import ReactMarkdown from 'react-markdown';
import { MdOutlineAddToPhotos } from 'react-icons/md';
import { generateGoogleCalendarLink } from '../helpers/eventsHelpers';
import { FaCalendarAlt } from 'react-icons/fa';

import { typography } from './typography';

const { fontSizes, fontFamilies } = typography;

const ShineInvolve = (props) => {
  const [ShineMinList, setShineMinList] = useState([]);
  const [slideIndex, setSlideIndex] = useState(0);

  const slider = useRef(null);

  const onArrowClick = (_, next) => {
    setSlideIndex(next);
  };

  const sliderSettings = {
    centerMode: true,
    centerPadding: '12px',
    dots: false,
    focusOnSelect: true,
    infinite: false,
    slidesPerRow: 1,
    speed: 500,
    swipeToSlide: true,
    variableWidth: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    beforeChange: onArrowClick,
  };

  const getEventsListFromDatabase = async () => {
    try {
      const { data, status } = await axios.get('/api/announcement/get');

      if (status === 200) {
        const filteredEndDate = data.filter((item) => {
          if (item.displayStartDateTime) {
            let displayStartDate = new DateTime.fromISO(
              item.displayStartDateTime
            );
            if (displayStartDate > DateTime.now()) return false;
          }

          if (item.displayEndDateTime !== '') {
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
        const shineMinEvents = [];
        filteredEndDate.forEach((data) => {
          if (data.eventType === null || data.eventType === undefined) {
            console.log('data.eventType is null or undefined');
          } else if (data.eventType.length > 0) {
            const hasShineMinistry = data.eventType.some(
              (type) => type.value === 'Shine Ministry'
            );
            if (hasShineMinistry) {
              shineMinEvents.push(data);
            }
          }
        });

        const featureSortedShineMinEvents = shineMinEvents.sort((a, b) => {
          if (a.featured) {
            return -1;
          } else if (b.featured) {
            return 1;
          } else {
            return 0;
          }
        });
        setShineMinList([...featureSortedShineMinEvents]);
      } else {
        throw Error('Something went wrong with the request');
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getEventsListFromDatabase();
    const id = props.match?.params;
    if (id != null) {
      // call function to open eventcard
    }
  }, [props]);

  const EventsCardMobile = ({ eventData }) => {
    const [isOpen, setIsOpen] = useState(false);

    const onOpen = (e) => {
      if (!e.target.href) {
        setIsOpen(true);
      }
    };

    const onClose = (e) => {
      setIsOpen(false);
    };

    return (
      <Flex minW="100%" minH="100%">
        <Box
          bg="transparent"
          onClick={onOpen}
          display="flex"
          fontFamily="Manrope"
          flexDirection="column"
          w="90%"
          h="auto"
          my="3"
        >
          <AspectRatio mb="5" width="100%" ratio={16 / 9}>
            <img
              alt="event-img"
              src={eventData.imageAdUrl}
              objectFit="cover"
              style={{ borderRadius: '10px' }}
            />
          </AspectRatio>
          <Heading as="h4" mb="1" size="sm" fontWeight="900" isTruncated>
            {eventData.title}
          </Heading>
          <Stack spacing={1}>
            {eventData.eventStartDate && (
              <Text fontSize="sm" fontWeight="bold">
                <Icon mr={2} as={RiCalendarEventFill} />
                Date:{' '}
                {eventData.renderDate
                  ? eventData.renderDate.toLocaleString(
                      DateTime.DATE_MED_WITH_WEEKDAY
                    )
                  : getRenderDate(
                      eventData.eventStartDate,
                      eventData.eventEndDate,
                      eventData.eventInterval,
                      eventData.eventStartTime
                    ).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)}
                {eventData.eventEndDate &&
                  getRenderDate(
                    eventData.eventStartDate,
                    eventData.eventEndDate,
                    eventData.eventInterval,
                    eventData.eventStartTime
                  ).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY) !==
                    DateTime.fromISO(eventData.eventEndDate).toLocaleString(
                      DateTime.DATE_MED_WITH_WEEKDAY
                    ) &&
                  eventData.eventInterval === 'None' &&
                  ' - ' +
                    DateTime.fromISO(eventData.eventEndDate).toLocaleString(
                      DateTime.DATE_MED_WITH_WEEKDAY
                    )}
              </Text>
            )}
            {eventData.eventStartTime && (
              <Text fontSize="sm" fontWeight="bold">
                <Icon mr={2} as={BsClockFill} />
                Time:{' '}
                {DateTime.fromISO(eventData.eventStartTime).toLocaleString({
                  hour: 'numeric',
                  minute: 'numeric',
                  hourCycle: 'h12',
                })}
                {eventData.eventEndTime &&
                eventData.eventStartTime !== eventData.eventEndTime
                  ? ' - ' +
                    DateTime.fromISO(eventData.eventEndTime).toLocaleString({
                      hour: 'numeric',
                      minute: 'numeric',
                      hourCycle: 'h12',
                    })
                  : ''}
              </Text>
            )}
            {eventData.location && (
              <Text fontSize="sm" fontWeight="bold">
                <Icon mr={2} as={ImLocation2} />
                Location: {eventData.location}
              </Text>
            )}
          </Stack>
          <Box
            bg="#EBF0F9"
            borderRadius="10"
            mt={['2', '5']}
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-evenly"
          >
            <Text
              fontSize="xs"
              color="#535353"
              overflow="hidden"
              noOfLines={3}
              textOverflow="ellipsis"
              w="80%"
            >
              <ReactMarkdown
                components={ChakraUIRenderer()}
                children={eventData.description}
                skipHtml
              />{' '}
            </Text>
            <Icon as={BsFullscreen} cursor="pointer" />
          </Box>
          <Stack mt={['2', '5']} direction="row" spacing={4}>
            {eventData.signUpUrl.length > 0 && (
              <Button
                as={Link}
                size="md"
                target="_blank"
                bg="#7D5300"
                color="white"
                _hover={{ opacity: '90%', textDecoration: 'none' }}
                href={eventData.signUpUrl ? eventData.signUpUrl : null}
                isDisabled={eventData.signUpUrl.length <= 0}
                fontSize="xs"
                rightIcon={<MdOutlineAddToPhotos />}
              >
                Sign up
              </Button>
            )}
            {generateGoogleCalendarLink(eventData) && (
              <Button
                as={Link}
                size="md"
                target="_blank"
                bg="#7D5300"
                color="white"
                _hover={{ opacity: '90%', textDecoration: 'none' }}
                href={generateGoogleCalendarLink(eventData)}
                fontSize="xs"
                rightIcon={<FaCalendarAlt />}
                whiteSpace={['wrap', 'nowrap']}
              >
                Add to Calendar
              </Button>
            )}
          </Stack>
        </Box>
        <Modal size="3xl" isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent borderRadius="20" justifyContent="center" p={[0, 5]}>
            <Center mt={4} mb={2}>
              <Box w={10} h={1} bgColor="#A8A8A8" borderRadius={20} />
            </Center>

            <AspectRatio ratio={16 / 9} m={[2, 0]}>
              <Image borderRadius={10} src={eventData.imageAdUrl} />
            </AspectRatio>
            <ModalBody ml={[-2, 0]} p={1} my={1} w={['90%', '100%']} m="auto">
              {eventData.title && (
                <Heading as="h4" size="lg" fontWeight="900" mb="3">
                  {eventData.title}
                </Heading>
              )}
              <Box>
                {eventData.eventStartDate && (
                  <Text fontSize={['sm', 'md']} fontWeight="bold">
                    <Icon mr={2} as={RiCalendarEventFill} />
                    Date:{' '}
                    {eventData.renderDate
                      ? eventData.renderDate.toLocaleString(
                          DateTime.DATE_MED_WITH_WEEKDAY
                        )
                      : getRenderDate(
                          eventData.eventStartDate,
                          eventData.eventEndDate,
                          eventData.eventInterval,
                          eventData.eventStartTime
                        ).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)}
                    {eventData.eventEndDate &&
                      getRenderDate(
                        eventData.eventStartDate,
                        eventData.eventEndDate,
                        eventData.eventInterval,
                        eventData.eventStartTime
                      ).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY) !==
                        DateTime.fromISO(eventData.eventEndDate).toLocaleString(
                          DateTime.DATE_MED_WITH_WEEKDAY
                        ) &&
                      eventData.eventInterval === 'None' &&
                      ' - ' +
                        DateTime.fromISO(eventData.eventEndDate).toLocaleString(
                          DateTime.DATE_MED_WITH_WEEKDAY
                        )}
                  </Text>
                )}
                {eventData.eventStartTime && (
                  <Text fontSize={['sm', 'md']} fontWeight="bold">
                    <Icon mr={2} as={BsClockFill} />
                    Time:{' '}
                    {DateTime.fromISO(eventData.eventStartTime).toLocaleString({
                      hour: 'numeric',
                      minute: 'numeric',
                      hourCycle: 'h12',
                    })}
                    {eventData.eventEndTime &&
                    eventData.eventStartTime !== eventData.eventEndTime
                      ? ' - ' +
                        DateTime.fromISO(eventData.eventEndTime).toLocaleString(
                          {
                            hour: 'numeric',
                            minute: 'numeric',
                            hourCycle: 'h12',
                          }
                        )
                      : ''}
                  </Text>
                )}
                {eventData.location && (
                  <Text fontSize={['sm', 'md']} fontWeight="bold">
                    <Icon mr={2} as={ImLocation2} />
                    Location: {eventData.location}
                  </Text>
                )}
              </Box>
              <Box bg="#F9F9F9" borderRadius="20" mt={[2, 5]} p={4}>
                <Text fontSize={['xs', 'md']} w="100%">
                  <ReactMarkdown
                    components={ChakraUIRenderer()}
                    children={eventData.description}
                    skipHtml
                  />
                </Text>
              </Box>
            </ModalBody>
            <ModalFooter>
              <ButtonGroup
                size="md"
                flexDirection="row"
                spacing={[1, 2]}
                w="100%"
                variant="outline"
                colorScheme="gray"
                alignItems="center"
              >
                {eventData.signUpUrl.length > 0 && (
                  <Button
                    as={Link}
                    target="_blank"
                    bg="#7D5300"
                    color="white"
                    _hover={{ opacity: '90%', textDecoration: 'none' }}
                    href={eventData.signUpUrl ? eventData.signUpUrl : null}
                    rightIcon={<MdOutlineAddToPhotos />}
                    whiteSpace={['wrap', 'nowrap']}
                    fontSize={['xs', 'md']}
                    p="4"
                  >
                    Sign up
                  </Button>
                )}

                {generateGoogleCalendarLink(eventData) && (
                  <Button
                    as={Link}
                    target="_blank"
                    bg="#7D5300"
                    color="white"
                    _hover={{ opacity: '90%', textDecoration: 'none' }}
                    href={generateGoogleCalendarLink(eventData)}
                    rightIcon={<FaCalendarAlt />}
                    whiteSpace={['wrap', 'nowrap']}
                    fontSize={['xs', 'md']}
                    p="4"
                  >
                    Add to Calendar
                  </Button>
                )}
              </ButtonGroup>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
    );
  };

  return (
    <VStack
      bgColor="#F6FAFF"
      minW="100%"
      alignItems="flex-start"
      fontFamily={fontFamilies.primary}
    >
      <HStack gap={2} my={{ base: 2, md: 1 }}>
        <Box
          as="svg"
          width={{ base: '24px', md: '28px' }}
          height={{ base: '24px', md: '28px' }}
          viewBox="0 0 36 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          mt={{ base: '2px', md: '4px' }}
        >
          <g clipPath="url(#clip0_158_2614)">
            <path
              d="M17.0859 2.09326C17.2329 2.09326 17.3527 2.13954 17.4287 2.19775C17.4879 2.24312 17.5646 2.32588 17.6006 2.521L19.1504 10.9321C19.4361 12.483 20.6494 13.6962 22.2002 13.9819L30.6113 15.5317C30.8066 15.5677 30.8902 15.6444 30.9355 15.7036C30.9937 15.7796 31.04 15.8995 31.04 16.0464C31.04 16.1933 30.9937 16.3132 30.9355 16.3892C30.8902 16.4484 30.8066 16.5251 30.6113 16.561L22.2002 18.1108C20.6494 18.3966 19.4361 19.6098 19.1504 21.1606L17.6006 29.5718C17.5646 29.7669 17.4879 29.8496 17.4287 29.895C17.3527 29.9532 17.2329 30.0005 17.0859 30.0005C16.939 30.0004 16.8191 29.9532 16.7432 29.895C16.684 29.8496 16.6072 29.7666 16.5713 29.5718L15.0225 21.1606C14.7368 19.6097 13.5226 18.3965 11.9717 18.1108L3.56055 16.561C3.36557 16.525 3.28267 16.4483 3.2373 16.3892C3.17909 16.3132 3.13281 16.1934 3.13281 16.0464C3.13282 15.8994 3.1791 15.7796 3.2373 15.7036C3.28268 15.6444 3.36563 15.5677 3.56055 15.5317L11.9717 13.9819C13.5226 13.6962 14.7368 12.4831 15.0225 10.9321L16.5713 2.521C16.6072 2.32615 16.684 2.24318 16.7432 2.19775C16.8191 2.13957 16.9391 2.09331 17.0859 2.09326ZM-149.699 -41.0308C-149.552 -41.0308 -149.432 -40.9835 -149.356 -40.9253C-149.297 -40.8799 -149.221 -40.7972 -149.185 -40.6021L-147.635 -32.1909C-147.349 -30.6401 -146.136 -29.4269 -144.585 -29.1411L-136.174 -27.5913C-135.979 -27.5553 -135.895 -27.4787 -135.85 -27.4194C-135.791 -27.3434 -135.745 -27.2235 -135.745 -27.0767C-135.745 -26.9298 -135.791 -26.8099 -135.85 -26.7339C-135.895 -26.6747 -135.979 -26.598 -136.174 -26.562L-144.585 -25.0132C-146.136 -24.7275 -147.349 -23.5133 -147.635 -21.9624L-149.185 -13.5513C-149.221 -13.3562 -149.297 -13.2734 -149.356 -13.228C-149.432 -13.1698 -149.552 -13.1235 -149.699 -13.1235C-149.846 -13.1236 -149.966 -13.1698 -150.042 -13.228C-150.101 -13.2734 -150.178 -13.3564 -150.214 -13.5513L-151.763 -21.9624C-152.048 -23.5133 -153.263 -24.7275 -154.813 -25.0132L-163.225 -26.562C-163.42 -26.598 -163.502 -26.6747 -163.548 -26.7339C-163.606 -26.8099 -163.652 -26.9297 -163.652 -27.0767C-163.652 -27.2237 -163.606 -27.3435 -163.548 -27.4194C-163.502 -27.4786 -163.42 -27.5553 -163.225 -27.5913L-154.813 -29.1411C-153.263 -29.4268 -152.048 -30.64 -151.763 -32.1909L-150.214 -40.6021C-150.178 -40.7969 -150.101 -40.8799 -150.042 -40.9253C-149.966 -40.9835 -149.846 -41.0307 -149.699 -41.0308ZM-65.3555 -100.007C-65.2085 -100.007 -65.0887 -99.961 -65.0127 -99.9028C-64.9535 -99.8575 -64.8768 -99.7746 -64.8408 -99.5796L-63.291 -91.1685C-63.0053 -89.6176 -61.792 -88.4034 -60.2412 -88.1177L-51.8301 -86.5688C-51.6348 -86.5329 -51.5512 -86.4562 -51.5059 -86.397C-51.4477 -86.321 -51.4014 -86.2011 -51.4014 -86.0542C-51.4014 -85.9074 -51.4477 -85.7874 -51.5059 -85.7114C-51.5512 -85.6522 -51.6348 -85.5755 -51.8301 -85.5396L-60.2412 -83.9897C-61.792 -83.704 -63.0053 -82.4907 -63.291 -80.9399L-64.8408 -72.5288C-64.8768 -72.3335 -64.9535 -72.25 -65.0127 -72.2046C-65.0887 -72.1465 -65.2087 -72.1001 -65.3555 -72.1001C-65.5023 -72.1002 -65.6223 -72.1464 -65.6982 -72.2046C-65.7575 -72.25 -65.8341 -72.3335 -65.8701 -72.5288L-67.4189 -80.9399C-67.7047 -82.4908 -68.9188 -83.704 -70.4697 -83.9897L-78.8809 -85.5396C-79.0758 -85.5756 -79.1588 -85.6522 -79.2041 -85.7114C-79.2623 -85.7874 -79.3086 -85.9072 -79.3086 -86.0542C-79.3086 -86.2011 -79.2623 -86.321 -79.2041 -86.397C-79.1587 -86.4561 -79.0757 -86.5329 -78.8809 -86.5688L-70.4697 -88.1177C-68.9188 -88.4034 -67.7046 -89.6175 -67.4189 -91.1685L-65.8701 -99.5796C-65.8342 -99.7744 -65.7574 -99.8574 -65.6982 -99.9028C-65.6223 -99.961 -65.5023 -100.007 -65.3555 -100.007Z"
              fill="#EBAC09"
              stroke="#EBAC09"
              strokeWidth="3.27863"
            />
          </g>
          <defs>
            <clipPath id="clip0_158_2614">
              <rect width="36" height="31.7647" fill="white" />
            </clipPath>
          </defs>
        </Box>
        <Heading
          as="h2"
          fontFamily={fontFamilies.subheadings}
          fontWeight="400"
          fontStyle="italic"
          fontSize={fontSizes.headings}
          lineHeight="94%"
          letterSpacing={{ base: '-0.0625rem', md: '-0.125rem' }}
        >
          Get Involved
        </Heading>
      </HStack>
      <Text
        color="black"
        mb={{ base: 6, md: 8 }}
        fontFamily="Manrope, sans-serif"
        fontWeight="400"
        fontStyle="normal"
        fontSize={{
          base: fontSizes.base,
          md: fontSizes.md,
          lg: fontSizes.normal,
        }}
        lineHeight="100%"
        letterSpacing="0px"
        textAlign={{ base: 'left', md: 'left' }}
      >
        Here’s our future opportunities that you can participate in
      </Text>
      <VStack
        alignItems="flex-start"
        justifyContent="space-between"
        display={{ base: 'none', md: 'flex' }}
        w="100%"
        h={{ base: '20rem', sm: '20rem', md: '40rem', lg: '50rem' }}
        m={{ base: '1', md: '3' }}
        px={{ base: 4, md: 6, lg: 5 }}
        py={{ base: 3, md: 4 }}
        gap={{ base: '3', md: '6', lg: '8' }}
        overflowY="auto"
      >
        {ShineMinList.length > 0 ? (
          ShineMinList.map((event, i) => (
            <Box w="100%">
              <EventCard eventData={event} isShineInvolve={true} />
            </Box>
          ))
        ) : (
          <Box
            overflow="hidden"
            bg="transparent"
            display="flex"
            fontFamily={fontFamilies.primary}
            flexDirection={['column', 'row']}
            w="100%"
            p={4}
            borderRadius="10px"
            boxShadow="md"
            bgColor="white"
          >
            <AspectRatio mb="5" width={['100%', '50%']} ratio={16 / 9}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                borderRadius="10px"
              >
                <Text fontSize="2xl" color="black" fontWeight="bold">
                  Coming Soon
                </Text>
              </Box>
            </AspectRatio>
            <Box
              overflow="hidden"
              position="relative"
              ml={['0', '6']}
              width={['100%', '55%']}
            >
              <Heading
                as="h3"
                fontSize={['lg', 'xl']}
                fontWeight="600"
                mb={2}
                color="#2C5282"
              >
                More Shine Opportunities Coming Soon
              </Heading>
              <Text fontSize={['sm', 'md']} color="gray.600" mb={4}>
                We're excited to bring you more opportunities to shine God's
                light and serve our community. Stay tuned for upcoming
                opportunities!
              </Text>
            </Box>
          </Box>
        )}
      </VStack>
      <Flex w="100%" flexDir="column" display={{ base: 'flex', md: 'none' }}>
        <Box
          w="100%"
          boxSizing="border-box"
          display="flex"
          justifyContent="space-evenly"
          alignItems="flex-start"
          height="auto"
          marginBottom={'1em'}
        >
          <Box w="100%">
            <Slider
              ref={slider}
              {...sliderSettings}
              style={{
                width: '100%',
                position: 'relative',
                height: 'auto',
              }}
            >
              {ShineMinList.length > 0 &&
                ShineMinList.map((event, i) => {
                  return (
                    <Box key={i} w="90%" minH="100%">
                      <EventsCardMobile eventData={event} />
                    </Box>
                  );
                })}
            </Slider>
          </Box>
        </Box>
        <Flex flexDir="row" justifyContent="flex-start">
          <IconButton
            onClick={() => {
              return slideIndex != 0 ? slider?.current?.slickPrev() : '';
            }}
            isRound={true}
            bgColor={(slideIndex != 0 ? '#EBAC09' : 'gray') + ' !important'}
            mr={10}
            icon={<ChevronLeftIcon boxSize={7} color="white" />}
          />
          <IconButton
            onClick={() => {
              return slideIndex < ShineMinList.length - 1
                ? slider?.current?.slickNext()
                : '';
            }}
            isRound={true}
            bgColor={
              (slideIndex < ShineMinList.length - 1 ? '#EBAC09' : 'gray') +
              ' !important'
            }
            icon={<ChevronRightIcon boxSize={7} color="white" />}
          />
        </Flex>
      </Flex>
    </VStack>
  );
};

export default ShineInvolve;
