import {
  Icon,
  AspectRatio,
  Box,
  Center,
  Heading,
  Image,
  Text,
  Link,
  Button,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  ButtonGroup,
  Tag,
} from '@chakra-ui/react';
import { RiCalendarEventFill } from 'react-icons/ri';
import { BsClockFill, BsFullscreen } from 'react-icons/bs';
import { ImLocation2 } from 'react-icons/im';
import { FaCalendarAlt } from 'react-icons/fa';
import { MdOutlineDirections, MdOutlineAddToPhotos } from 'react-icons/md';
import { useState, useEffect } from 'react';
import { getRenderDate } from '../helpers/eventsHelpers';
import { DateTime } from 'luxon';
import { generateGoogleCalendarLink } from '../helpers/eventsHelpers';
import ReactMarkdown from 'react-markdown';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';

// TODO: color button according to image
// TODO: button directions
const EventCard = (props) => {
  const { eventData } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const onOpen = (e) => {
    if (!e.target.href) {
      setIsOpen(true);
    }
  };

  const onClose = (e) => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleChange = () => {
      if (window.innerWidth < 750) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    window.addEventListener('resize', handleChange);

    return () => {
      window.removeEventListener('resize', handleChange);
    };
  }, []);

  return (
    <>
      <Box
        overflow="hidden"
        bg="white"
        onClick={onOpen}
        display="flex"
        flexDirection={['column', 'row']}
      >
        <AspectRatio mb="5" width={['100%', '45%']} ratio={16 / 9}>
          <Image
            borderRadius="20"
            src={eventData.imageAdUrl}
            objectFit="cover"
            class="an_image"
            alt="event_img"
            id="event_img"
          />
        </AspectRatio>
        <Box
          // height={['200', '280']}
          overflow="hidden"
          position="relative"
          ml={['0', '6']}
          width={['100%', '55%']}
        >
          <Stack spacing={4} direction="row" mb={['2', '5']}>
            {eventData.eventTags.length > 0 &&
              eventData.eventTags.map((tag, i) => (
                <Tag
                  key={'event' + i}
                  borderRadius={20}
                  size="sm"
                  fontSize={['10', '14']}
                >
                  {tag}
                </Tag>
              ))}
          </Stack>
          <Heading
            as="h4"
            mb={['2', '5']}
            size="lg"
            fontWeight="900"
            isTruncated
          >
            {eventData.title}
          </Heading>
          <Stack spacing={-1}>
            {eventData.eventStartDate && (
              <Text fontSize={['sm', 'lg']} fontWeight="bold">
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
              <Text fontSize={['sm', 'lg']} fontWeight="bold">
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
              <Text fontSize={['sm', 'lg']} fontWeight="bold">
                <Icon mr={2} as={ImLocation2} />
                Location: {eventData.location}
              </Text>
            )}
          </Stack>
          <Box
            bg="#F9F9F9"
            borderRadius="20"
            mt={['2', '5']}
            p={4}
            display="flex"
            flexDirection="row"
            alignItems="center"
          >
            <Text
              fontSize={['xs', 'md']}
              overflow="hidden"
              noOfLines={2}
              textOverflow="ellipsis"
              w="90%"
            >
              <ReactMarkdown
                components={ChakraUIRenderer()}
                children={eventData.description}
                skipHtml
              />{' '}
            </Text>
            <Icon as={BsFullscreen} position="absolute" right="6" />
          </Box>
          <Stack mt={['2', '5']} direction="row" spacing={4}>
            {eventData.signUpUrl.length > 0 && (
              <Button
                as={Link}
                size="md"
                target="_blank"
                href={eventData.signUpUrl ? eventData.signUpUrl : null}
                isDisabled={eventData.signUpUrl.length <= 0}
                fontSize={['xs', 'md']}
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
                href={generateGoogleCalendarLink(eventData)}
                fontSize={['xs', 'md']}
                rightIcon={<FaCalendarAlt />}
                whiteSpace={['wrap', 'nowrap']}
              >
                Add to Calendar
              </Button>
            )}
            {eventData.location.length > 0 && (
              <Button
                as={Link}
                size="md"
                target="_blank"
                href={eventData.directionsUrl ? eventData.directionsUrl : null}
                rightIcon={<MdOutlineDirections />}
                fontSize={['xs', 'md']}
                whiteSpace={['wrap', 'nowrap']}
              >
                Get Directions
              </Button>
            )}
          </Stack>
        </Box>
      </Box>
      <Modal size="3xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent borderRadius="20" justifyContent="center" p={[0, 5]}>
          {isMobile ? (
            <Center mt={4} mb={2}>
              <Box w={10} h={1} bgColor="#A8A8A8" borderRadius={20} />
            </Center>
          ) : (
            <ModalCloseButton
              position="absolute"
              right="0"
              top="-10"
              bgColor="white"
              borderRadius="20"
            />
          )}
          <AspectRatio ratio={16 / 9} m={[2, 0]}>
            <Image borderRadius={20} src={eventData.imageAdUrl} />
          </AspectRatio>
          <ModalBody ml={[-2, 0]}>
            <Stack spacing={4} direction="row" mt={[0, 2]} mb="2">
              {eventData.eventTags.length > 0 &&
                eventData.eventTags.map((tag, i) => (
                  <Tag
                    key={'event' + i}
                    borderRadius={20}
                    size={['sm', 'lg']}
                    fontSize={[10, 16]}
                    p={[1, 2]}
                  >
                    {tag}
                  </Tag>
                ))}
            </Stack>
            {eventData.title && (
              <Heading as="h4" size="lg" fontWeight="900" mb="2">
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
                      DateTime.fromISO(eventData.eventEndTime).toLocaleString({
                        hour: 'numeric',
                        minute: 'numeric',
                        hourCycle: 'h12',
                      })
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
              {eventData.location.length > 0 && (
                <Button
                  as={Link}
                  target="_blank"
                  href={
                    eventData.directionsUrl ? eventData.directionsUrl : null
                  }
                  rightIcon={<MdOutlineDirections />}
                  whiteSpace={['wrap', 'nowrap']}
                  fontSize={['xs', 'md']}
                  p="4"
                >
                  Get Directions
                </Button>
              )}
              {eventData.signUpUrl.length > 0 && (
                <Button
                  as={Link}
                  target="_blank"
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
    </>
  );
};

export default EventCard;
