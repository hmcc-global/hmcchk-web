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
  IconButton,
  Tag,
} from './chakra';
import { RiCalendarEventFill } from 'react-icons/ri';
import { BsClockFill, BsFullscreen } from 'react-icons/bs';
import { ImLocation2 } from 'react-icons/im';
import { FaCalendarAlt } from 'react-icons/fa';
import { MdOutlineAddToPhotos } from 'react-icons/md';
import { useState } from 'react';
import { getRenderDate, generateGoogleCalendarLink } from 'utils/eventsHelpers';
import { DateTime } from 'luxon';
import ReactMarkdown from 'react-markdown';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';

const formatTime = (time) =>
  DateTime.fromISO(time).toLocaleString({
    hour: 'numeric',
    minute: 'numeric',
    hourCycle: 'h12',
  });

const renderDateString = (eventData) => {
  const occurrence = eventData.renderDate
    ? eventData.renderDate
    : getRenderDate(
        eventData.eventStartDate,
        eventData.eventEndDate,
        eventData.eventInterval,
        eventData.eventStartTime
      );
  let text = occurrence.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY);
  if (
    eventData.eventEndDate &&
    eventData.eventInterval === 'None' &&
    occurrence.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY) !==
      DateTime.fromISO(eventData.eventEndDate).toLocaleString(
        DateTime.DATE_MED_WITH_WEEKDAY
      )
  ) {
    text +=
      ' - ' +
      DateTime.fromISO(eventData.eventEndDate).toLocaleString(
        DateTime.DATE_MED_WITH_WEEKDAY
      );
  }
  return text;
};

const renderTimeString = (eventData) => {
  if (!eventData.eventStartTime) return '';
  let text = formatTime(eventData.eventStartTime);
  if (
    eventData.eventEndTime &&
    eventData.eventStartTime !== eventData.eventEndTime
  ) {
    text += ' - ' + formatTime(eventData.eventEndTime);
  }
  return text;
};

const EventCard = (props) => {
  const { eventData, isShineInvolve = false } = props;
  const [isOpen, setIsOpen] = useState(false);

  const buttonBgColor = isShineInvolve ? '#7D5300' : 'blue.700';

  const eventTags = [
    ...(eventData.eventType ?? []),
    ...(eventData.featured ? [{ value: 'Featured', color: 'yellow' }] : []),
  ];

  const onOpen = (e) => {
    if (!e.target.closest('a')) {
      setIsOpen(true);
    }
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Box
        overflow="hidden"
        bg="transparent"
        onClick={onOpen}
        display="flex"
        fontFamily="Manrope"
        flexDirection={['column', 'row']}
      >
        <AspectRatio mb="5" width={['100%', '50%']} ratio={16 / 9}>
          <img
            alt={eventData.title || ''}
            src={eventData.imageAdUrl}
            objectFit="cover"
            loading="lazy"
            decoding="async"
            style={{ borderRadius: '10px' }}
          />
        </AspectRatio>
        <Box
          overflow="hidden"
          position="relative"
          ml={['0', '6']}
          width={['100%', '55%']}
        >
          <Stack spacing={[2, 4]} direction="row" mb={['2', '5']}>
            {eventTags.map((tag, i) => (
              <Tag
                key={'event' + i}
                borderRadius={50}
                size="sm"
                fontSize={['10', '14']}
                fontWeight={'bold'}
                px={['2', '3']}
                py={1}
                colorScheme={tag.color}
              >
                {tag.value}
              </Tag>
            ))}
          </Stack>
          <Heading
            as="h2"
            mb={['2', '5']}
            size="lg"
            fontWeight="900"
            isTruncated
          >
            {eventData.title}
          </Heading>
          <Stack spacing={1}>
            {eventData.eventStartDate && (
              <Text fontSize={['sm', 'lg']} fontWeight="bold">
                <Icon mr={2} as={RiCalendarEventFill} />
                Date: {renderDateString(eventData)}
              </Text>
            )}
            {eventData.eventStartTime && (
              <Text fontSize={['sm', 'lg']} fontWeight="bold">
                <Icon mr={2} as={BsClockFill} />
                Time: {renderTimeString(eventData)}
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
            bg="white"
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
            <IconButton
              aria-label="View details"
              icon={<Icon as={BsFullscreen} />}
              size="sm"
              variant="ghost"
              position="absolute"
              right="6"
              onClick={onOpen}
            />
          </Box>
          <Stack mt={['2', '5']} direction="row" spacing={4}>
            {eventData.signUpUrl?.length > 0 && (
              <Button
                as={Link}
                size="md"
                target="_blank"
                bg={buttonBgColor}
                color="white"
                _hover={{ opacity: '90%', textDecoration: 'none' }}
                href={eventData.signUpUrl ? eventData.signUpUrl : null}
                isDisabled={!eventData.signUpUrl?.length}
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
                bg={buttonBgColor}
                color="white"
                _hover={{ opacity: '90%', textDecoration: 'none' }}
                href={generateGoogleCalendarLink(eventData)}
                fontSize={['xs', 'md']}
                rightIcon={<FaCalendarAlt />}
                whiteSpace={['wrap', 'nowrap']}
              >
                Add to Calendar
              </Button>
            )}
          </Stack>
        </Box>
      </Box>
      {/* Only mount while open — Chakra AnimatePresence+Portal can stick after close (ghost overlay + RemoveScroll), locking #main-container scroll. */}
      {isOpen && (
        <Modal size="3xl" isOpen onClose={onClose} motionPreset="none">
          <ModalOverlay />
          <ModalContent borderRadius="20" justifyContent="center" p={[0, 5]}>
            <Center mt={4} mb={2} display={{ base: 'flex', md: 'none' }}>
              <Box w={10} h={1} bgColor="#A8A8A8" borderRadius={20} />
            </Center>
            <ModalCloseButton
              position="absolute"
              right="0"
              top="-10"
              bgColor="white"
              borderRadius="20"
            />
            <AspectRatio ratio={16 / 9} m={[2, 0]}>
              <Image
                borderRadius={10}
                src={eventData.imageAdUrl}
                alt={eventData.title || ''}
              />
            </AspectRatio>
            <ModalBody ml={[-2, 0]} p={1} my={1} w={['90%', '100%']} m="auto">
              <Stack spacing={4} direction="row" mt={[0, 2]} mb="3">
                {eventTags.map((tag, i) => (
                  <Tag
                    key={'event' + i}
                    borderRadius={20}
                    size="sm"
                    fontSize={['10', '14']}
                    px={['2', '3']}
                    fontWeight={'bold'}
                    py={1}
                    colorScheme={tag.color}
                  >
                    {tag.value}
                  </Tag>
                ))}
              </Stack>
              {eventData.title && (
                <Heading as="h2" size="lg" fontWeight="900" mb="3">
                  {eventData.title}
                </Heading>
              )}
              <Box>
                {eventData.eventStartDate && (
                  <Text fontSize={['sm', 'md']} fontWeight="bold">
                    <Icon mr={2} as={RiCalendarEventFill} />
                    Date: {renderDateString(eventData)}
                  </Text>
                )}
                {eventData.eventStartTime && (
                  <Text fontSize={['sm', 'md']} fontWeight="bold">
                    <Icon mr={2} as={BsClockFill} />
                    Time: {renderTimeString(eventData)}
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
                {eventData.signUpUrl?.length > 0 && (
                  <Button
                    as={Link}
                    target="_blank"
                    bg={buttonBgColor}
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
                    bg={buttonBgColor}
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
      )}
    </>
  );
};

export default EventCard;
