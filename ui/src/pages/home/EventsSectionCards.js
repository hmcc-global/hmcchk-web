import {
  AspectRatio,
  Box,
  Button,
  Image,
  VStack,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Icon,
  Text,
  ButtonGroup,
  Link,
  UnorderedList,
  OrderedList,
  ListItem,
  Stack,
  Center,
  Tag,
} from '@chakra-ui/react';
import { RiCalendarEventFill } from 'react-icons/ri';
import { BsClockFill, BsFullscreen } from 'react-icons/bs';
import { ImLocation2 } from 'react-icons/im';
import { FaCalendarAlt } from 'react-icons/fa';
import { MdOutlineAddToPhotos } from 'react-icons/md';
import { DateTime } from 'luxon';
import parse, { domToReact, attributesToProps } from 'html-react-parser';
import {
  generateGoogleCalendarLink,
  getStartDate,
  getRenderDate,
  EndDateElement,
} from '../helpers/eventsHelpers';
import { useState } from 'react';
import TrackingUtil from '../../util/TrackingUtil';
import ReactMarkdown from 'react-markdown';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';

const EventsSectionCard = (props) => {
  const { width, height, event } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const tagArray = [];

  event.eventType?.length > 0 &&
    event.eventType.map((tag) => {
      tagArray.push({ value: tag.value, color: tag.color });
    });
  event.featured && tagArray.push({ value: 'Featured', color: 'yellow' });

  const onOpen = (e) => {
    if (!e.target.href) {
      setIsOpen(true);
    }
  };

  const onClose = (e) => {
    setIsOpen(false);
  };

  const options = {
    replace: (domNode) => {
      if (domNode.name === 'p') {
        return <Text mb="2">{domToReact(domNode.children, options)}</Text>;
      } else if (domNode.name === 'ul') {
        return (
          <UnorderedList marginInlineStart="1.25em" mb="2">
            {domToReact(domNode.children, options)}
          </UnorderedList>
        );
      } else if (domNode.name === 'ol') {
        return (
          <OrderedList marginInlineStart="1.25em" mb="2">
            {domToReact(domNode.children, options)}
          </OrderedList>
        );
      } else if (domNode.name === 'li') {
        return <ListItem>{domToReact(domNode.children, options)}</ListItem>;
      } else if (domNode.name === 'a') {
        return (
          <Link color="teal.500" {...attributesToProps(domNode.attribs)}>
            {domToReact(domNode.children, options)}
          </Link>
        );
      }
    },
  };

  const getStartEndDateStr = (eventData) => {
    const eventRenderDate = DateTime.fromISO(
      getRenderDate(
        eventData.eventStartDate,
        eventData.eventEndDate,
        eventData.eventInterval,
        eventData.eventStartTime
      )
    );
    const dateFormat = DateTime.DATE_MED_WITH_WEEKDAY;
    return (
      <>
        {eventData.eventStartDate
          ? eventData.renderDate
            ? 'Date: ' +
              DateTime.fromISO(eventData.renderDate).toLocaleString(
                dateFormat
              ) +
              (eventData.eventInterval === 'None' && eventData.eventEndDate
                ? ' - ' +
                  DateTime.fromISO(eventData.eventEndDate).toLocaleString(
                    dateFormat
                  )
                : '')
            : eventRenderDate.toLocaleString(dateFormat)
          : null}
      </>
    );
  };

  return (
    <>
      <Box w={width} h={height} px={2}>
        <Box border="1px solid #8C8C8C" borderRadius={10}>
          <VStack
            justifyContent="space-between"
            alignItems="center"
            spacing={[2, 2, 5]}
            p={['3%', '3%', '5%']}
          >
            <AspectRatio
              width="100%"
              ratio={16 / 9}
              onClick={onOpen}
              cursor="pointer"
              zIndex={5}
            >
              <Image
                borderRadius={10}
                objectFit="cover"
                src={event.imageAdUrl}
              />
            </AspectRatio>
            <VStack
              fontFamily="Manrope"
              fontWeight="semibold"
              color="#818181"
              alignItems="flex-start"
              width="100%"
              spacing={'0'}
              overflow="hidden"
              fontSize={{ base: 'sm', md: 'md' }}
            >
              <Heading
                onClick={onOpen}
                maxWidth={'100%'}
                fontSize={['lg', '2xl']}
                cursor="pointer"
                fontFamily="Manrope"
                fontWeight="bold"
                color="black"
                isTruncated
                mt={[1, 1, 0]}
                mb={[2, 2, 0]}
              >
                {event.title}
              </Heading>
              <Text overflow="wrap">{getStartEndDateStr(event)}</Text>
              <Text>
                {event.eventStartTime
                  ? 'Time: ' +
                    event.eventStartTime +
                    (event.eventEndTime ? ' - ' + event.eventEndTime : '')
                  : ''}
              </Text>
              <Text>{event.location ? 'Location: ' + event.location : ''}</Text>
            </VStack>
          </VStack>
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
            <Image borderRadius={10} src={event.imageAdUrl} />
          </AspectRatio>
          <ModalBody ml={[-2, 0]} p={1} my={1} w={['90%', '100%']} m="auto">
            <Stack spacing={4} direction="row" mt={[0, 2]} mb="3">
              {tagArray.map((tag, i) => (
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
            {event.title && (
              <Heading as="h4" size="lg" fontWeight="900" mb="3">
                {event.title}
              </Heading>
            )}
            <Box>
              {event.eventStartDate && (
                <Text fontSize={['sm', 'md']} fontWeight="bold">
                  <Icon mr={2} as={RiCalendarEventFill} />
                  Date:{' '}
                  {event.renderDate
                    ? event.renderDate.toLocaleString(
                        DateTime.DATE_MED_WITH_WEEKDAY
                      )
                    : getRenderDate(
                        event.eventStartDate,
                        event.eventEndDate,
                        event.eventInterval,
                        event.eventStartTime
                      ).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)}
                  {event.eventEndDate &&
                    getRenderDate(
                      event.eventStartDate,
                      event.eventEndDate,
                      event.eventInterval,
                      event.eventStartTime
                    ).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY) !==
                      DateTime.fromISO(event.eventEndDate).toLocaleString(
                        DateTime.DATE_MED_WITH_WEEKDAY
                      ) &&
                    event.eventInterval === 'None' &&
                    ' - ' +
                      DateTime.fromISO(event.eventEndDate).toLocaleString(
                        DateTime.DATE_MED_WITH_WEEKDAY
                      )}
                </Text>
              )}
              {event.eventStartTime && (
                <Text fontSize={['sm', 'md']} fontWeight="bold">
                  <Icon mr={2} as={BsClockFill} />
                  Time:{' '}
                  {DateTime.fromISO(event.eventStartTime).toLocaleString({
                    hour: 'numeric',
                    minute: 'numeric',
                    hourCycle: 'h12',
                  })}
                  {event.eventEndTime &&
                  event.eventStartTime !== event.eventEndTime
                    ? ' - ' +
                      DateTime.fromISO(event.eventEndTime).toLocaleString({
                        hour: 'numeric',
                        minute: 'numeric',
                        hourCycle: 'h12',
                      })
                    : ''}
                </Text>
              )}
              {event.location && (
                <Text fontSize={['sm', 'md']} fontWeight="bold">
                  <Icon mr={2} as={ImLocation2} />
                  Location: {event.location}
                </Text>
              )}
            </Box>
            <Box bg="#F9F9F9" borderRadius="20" mt={[2, 5]} p={4}>
              <Text fontSize={['xs', 'md']} w="100%">
                <ReactMarkdown
                  components={ChakraUIRenderer()}
                  children={event.description}
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
              {event.signUpUrl.length > 0 && (
                <Button
                  as={Link}
                  target="_blank"
                  bg="#2C5282"
                  color="white"
                  _hover={{ opacity: '90%', textDecoration: 'none' }}
                  href={event.signUpUrl ? event.signUpUrl : null}
                  rightIcon={<MdOutlineAddToPhotos />}
                  whiteSpace={['wrap', 'nowrap']}
                  fontSize={['xs', 'md']}
                  p="4"
                >
                  Sign up
                </Button>
              )}

              {generateGoogleCalendarLink(event) && (
                <Button
                  as={Link}
                  target="_blank"
                  bg="#2C5282"
                  color="white"
                  _hover={{ opacity: '90%', textDecoration: 'none' }}
                  href={generateGoogleCalendarLink(event)}
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
      {/* <Modal size="3xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent borderRadius="20" fontFamily="Manrope">
          <AspectRatio width="100%" ratio={16 / 9}>
            <Image
              borderTopLeftRadius="20"
              borderTopRightRadius="20"
              src={event.imageAdUrl}
              objectFit="cover"
            />
          </AspectRatio>
          <ModalCloseButton />
          {event.title && (
            <ModalHeader
              ml={[0, 16]}
              mr={[0, 16]}
              pb="1"
              fontWeight="900"
              fontSize={['2xl', '3xl']}
            >
              {event.title}
            </ModalHeader>
          )}
          <ModalBody ml={[0, 16]} mr={[0, 16]}>
            <Stack spacing={0}>
              {event.eventStartDate && (
                <Text fontSize={'md'} fontWeight="bold">
                  Date:{' '}
                  {event.renderDate
                    ? event.renderDate.toLocaleString(
                        DateTime.DATE_MED_WITH_WEEKDAY
                      )
                    : getRenderDate(
                        event.eventStartDate,
                        event.eventEndDate,
                        event.eventInterval,
                        event.eventStartTime
                      ).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)}
                  {event.eventEndDate &&
                    getRenderDate(
                      event.eventStartDate,
                      event.eventEndDate,
                      event.eventInterval,
                      event.eventStartTime
                    ).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY) !==
                      DateTime.fromISO(event.eventEndDate).toLocaleString(
                        DateTime.DATE_MED_WITH_WEEKDAY
                      ) &&
                    event.eventInterval === 'None' &&
                    ' - ' +
                      DateTime.fromISO(event.eventEndDate).toLocaleString(
                        DateTime.DATE_MED_WITH_WEEKDAY
                      )}
                </Text>
              )}
              {event.eventStartTime && (
                <Text fontSize={'md'} fontWeight="bold">
                  Time:{' '}
                  {DateTime.fromISO(event.eventStartTime).toLocaleString({
                    hour: 'numeric',
                    minute: 'numeric',
                    hourCycle: 'h12',
                  })}
                  {event.eventEndTime &&
                  event.eventStartTime !== event.eventEndTime
                    ? ' - ' +
                      DateTime.fromISO(event.eventEndTime).toLocaleString({
                        hour: 'numeric',
                        minute: 'numeric',
                        hourCycle: 'h12',
                      })
                    : ''}
                </Text>
              )}
              {event.location && (
                <Text fontSize={'md'} fontWeight="bold">
                  Location: {event.location}
                </Text>
              )}
            </Stack>
            <Box fontSize="sm" mt="3">
              <ReactMarkdown
                components={ChakraUIRenderer()}
                children={event.description}
                skipHtml
              />
            </Box>
          </ModalBody>
          <ModalFooter ml={[0, 16]} mr={[0, 16]}>
            <ButtonGroup
              size="md"
              flexDirection={['column', 'row']}
              spacing={[0, 2]}
              w="100%"
              variant="outline"
              colorScheme="gray"
            >
              <Button
                flex={[false, 1]}
                as={Link}
                target="_blank"
                href={event.directionsUrl ? event.directionsUrl : null}
                isDisabled={event.directionsUrl.length <= 0}
                size="sm"
              >
                Directions
              </Button>
              <Button
                flex={[false, 1]}
                mt={[2, 0]}
                as={Link}
                target="_blank"
                href={event.signUpUrl ? event.signUpUrl : null}
                isDisabled={event.signUpUrl.length <= 0}
                size="sm"
                id={`events-signup-${TrackingUtil.generateIdFromTitle(
                  event.title
                )}}`}
              >
                Sign up
              </Button>
              <Button
                flex={[false, 1]}
                mt={[2, 0]}
                as={Link}
                target="_blank"
                href={generateGoogleCalendarLink(event)}
                isDisabled={generateGoogleCalendarLink(event) ? false : true}
                size="sm"
                id={`events-calendar-${TrackingUtil.generateIdFromTitle(
                  event.title
                )}}`}
              >
                Add to Calendar
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal> */}
    </>
  );
};

export default EventsSectionCard;
