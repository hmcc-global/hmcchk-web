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
} from '@chakra-ui/react';
import { RiCalendarEventFill } from 'react-icons/ri';
import { BsClockFill } from 'react-icons/bs';
import { ImLocation2 } from 'react-icons/im';
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
              fontWeight="900"
              fontSize={['2xl', '3xl']}
            >
              {event.title}
            </ModalHeader>
          )}
          <ModalBody ml={[0, 16]} mr={[0, 16]}>
            <Stack spacing={0}>
              {event.eventStartDate && (
                <Text fontSize={['sm', 'md']} fontWeight="bold">
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
                  Location: {event.location}
                </Text>
              )}
            </Stack>
            <Box fontSize="sm" mt="5">
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
      </Modal>
    </>
  );
};

export default EventsSectionCard;
