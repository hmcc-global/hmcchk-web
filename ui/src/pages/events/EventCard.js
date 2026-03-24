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
  ButtonGroup,
  Tag,
  Dialog,
  Portal,
} from '@chakra-ui/react';
import { RiCalendarEventFill } from 'react-icons/ri';
import { BsClockFill, BsFullscreen } from 'react-icons/bs';
import { ImLocation2 } from 'react-icons/im';
import { FaCalendarAlt } from 'react-icons/fa';
import { MdOutlineAddToPhotos } from 'react-icons/md';
import { useState, useEffect } from 'react';
import { getRenderDate } from '../helpers/eventsHelpers';
import { DateTime } from 'luxon';
import { generateGoogleCalendarLink } from '../helpers/eventsHelpers';
import { default as ReactMarkdown } from '../../components/CustomReactMarkdown';

const EventCard = (props) => {
  const { eventData, isShineInvolve = false } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const tagArray = [];

  const buttonBgColor = isShineInvolve ? '#7D5300' : '#2C5282';

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
        bg="transparent"
        onClick={onOpen}
        display="flex"
        fontFamily="Manrope"
        flexDirection={['column', 'row']}
      >
        <AspectRatio mb="5" width={['100%', '50%']} ratio={16 / 9}>
          <img
            alt="event-img"
            src={eventData.imageAdUrl}
            objectFit="cover"
            style={{ borderRadius: '10px' }}
          />
        </AspectRatio>
        <Box
          overflow="hidden"
          position="relative"
          ml={['0', '6']}
          width={['100%', '55%']}
        >
          <Stack gap={[2, 4]} direction="row" mb={['2', '5']}>
            {eventData.eventType?.length > 0 &&
              eventData.eventType.map((tag) => {
                tagArray.push({ value: tag.value, color: tag.color });
              })}

            {eventData.featured &&
              tagArray.push({ value: 'Featured', color: 'yellow' })}

            {tagArray.map((tag, i) => (
              <Tag.Root
                key={'event' + i}
                borderRadius={50}
                size="sm"
                fontSize={['10', '14']}
                fontWeight={'bold'}
                px={['2', '3']}
                py={1}
                colorPalette={tag.color}
              >
                {tag.value}
              </Tag.Root>
            ))}
          </Stack>
          <Heading
            as="h4"
            mb={['2', '5']}
            size="lg"
            fontWeight="900"
            lineClamp={1}
            wordBreak="break-all"
          >
            {eventData.title}
          </Heading>
          <Stack gap={1}>
            {eventData.eventStartDate && (
              <Text fontSize={['sm', 'lg']} fontWeight="bold">
                <Icon mr={2} asChild><RiCalendarEventFill /></Icon>
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
                <Icon mr={2} asChild><BsClockFill /></Icon>
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
                <Icon mr={2} asChild><ImLocation2 /></Icon>
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
              lineClamp={2}
              textOverflow="ellipsis"
              w="90%"
            >
              <ReactMarkdown children={eventData.description} skipHtml />{' '}
            </Text>
            <Icon position="absolute" right="6" cursor="pointer" asChild><BsFullscreen /></Icon>
          </Box>
          <Stack mt={['2', '5']} direction="row" gap={4}>
            {eventData.signUpUrl.length > 0 && (
              <Button
                size="md"
                bg={buttonBgColor}
                color="white"
                _hover={{ opacity: '90%', textDecoration: 'none' }}
                disabled={eventData.signUpUrl.length <= 0}
                fontSize={['xs', 'md']}
                asChild><Link target="_blank" href={eventData.signUpUrl ? eventData.signUpUrl : null}>Sign up
                                                <MdOutlineAddToPhotos /></Link></Button>
            )}
            {generateGoogleCalendarLink(eventData) && (
              <Button
                size="md"
                bg={buttonBgColor}
                color="white"
                _hover={{ opacity: '90%', textDecoration: 'none' }}
                fontSize={['xs', 'md']}
                whiteSpace={['wrap', 'nowrap']}
                asChild><Link target="_blank" href={generateGoogleCalendarLink(eventData)}>Add to Calendar
                                                <FaCalendarAlt /></Link></Button>
            )}
          </Stack>
        </Box>
      </Box>
      <Dialog.Root size='xl' open={isOpen} onOpenChange={e => {
        if (!e.open) {
          onClose();
        }
      }}>
        <Portal>

          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content borderRadius="20" justifyContent="center" p={[0, 5]}>
              {isMobile ? (
                <Center mt={4} mb={2}>
                  <Box w={10} h={1} bgColor="#A8A8A8" borderRadius={20} />
                </Center>
              ) : (
                <Dialog.CloseTrigger
                  position="absolute"
                  right="0"
                  top="-10"
                  bgColor="white"
                  borderRadius="20"
                />
              )}
              <AspectRatio ratio={16 / 9} m={[2, 0]}>
                <Image borderRadius={10} src={eventData.imageAdUrl} />
              </AspectRatio>
              <Dialog.Body ml={[-2, 0]} p={1} my={1} w={['90%', '100%']} m="auto">
                <Stack gap={4} direction="row" mt={[0, 2]} mb="3">
                  {tagArray.map((tag, i) => (
                    <Tag.Root
                      key={'event' + i}
                      borderRadius={20}
                      size="sm"
                      fontSize={['10', '14']}
                      px={['2', '3']}
                      fontWeight={'bold'}
                      py={1}
                      colorPalette={tag.color}
                    >
                      {tag.value}
                    </Tag.Root>
                  ))}
                </Stack>
                {eventData.title && (
                  <Heading as="h4" size="lg" fontWeight="900" mb="3">
                    {eventData.title}
                  </Heading>
                )}
                <Box>
                  {eventData.eventStartDate && (
                    <Text fontSize={['sm', 'md']} fontWeight="bold">
                      <Icon mr={2} asChild><RiCalendarEventFill /></Icon>
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
                      <Icon mr={2} asChild><BsClockFill /></Icon>
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
                      <Icon mr={2} asChild><ImLocation2 /></Icon>
                      Location: {eventData.location}
                    </Text>
                  )}
                </Box>
                <Box bg="#F9F9F9" borderRadius="20" mt={[2, 5]} p={4}>
                  <Text fontSize={['xs', 'md']} w="100%">
                    <ReactMarkdown children={eventData.description} skipHtml />
                  </Text>
                </Box>
              </Dialog.Body>
              <Dialog.Footer>
                <ButtonGroup
                  size="md"
                  flexDirection="row"
                  gap={[1, 2]}
                  w="100%"
                  variant="outline"
                  colorPalette="gray"
                  alignItems="center"
                >
                  {eventData.signUpUrl.length > 0 && (
                    <Button
                      bg={buttonBgColor}
                      color="white"
                      _hover={{ opacity: '90%', textDecoration: 'none' }}
                      whiteSpace={['wrap', 'nowrap']}
                      fontSize={['xs', 'md']}
                      p="4"
                      asChild><Link target="_blank" href={eventData.signUpUrl ? eventData.signUpUrl : null}>Sign up
                                                              <MdOutlineAddToPhotos /></Link></Button>
                  )}

                  {generateGoogleCalendarLink(eventData) && (
                    <Button
                      bg={buttonBgColor}
                      color="white"
                      _hover={{ opacity: '90%', textDecoration: 'none' }}
                      whiteSpace={['wrap', 'nowrap']}
                      fontSize={['xs', 'md']}
                      p="4"
                      asChild><Link target="_blank" href={generateGoogleCalendarLink(eventData)}>Add to Calendar
                                                              <FaCalendarAlt /></Link></Button>
                  )}
                </ButtonGroup>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>

        </Portal>
      </Dialog.Root>
    </>
  );
};

export default EventCard;
