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
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  DrawerFooter,
  DrawerCloseButton,
  ButtonGroup,
  Tag,
  useDisclosure,
  useBreakpointValue,
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
import ReactMarkdown from 'react-markdown';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';

const EventCard = (props) => {
  const { eventData } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [colors, setColors] = useState([]);
  const tagArray = [];

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
        bg="#F6FAFF"
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
          bg="#F6FAFF"
        >
          <Stack spacing={[2, 4]} direction="row" mb={['2', '5']}>
            {eventData.eventType?.length > 0 &&
              eventData.eventType.map((tag) => {
                tagArray.push({ value: tag.value, color: tag.color });
              })}

            {eventData.featured &&
              tagArray.push({ value: 'Featured', color: 'yellow' })}

            {tagArray.map((tag, i) => (
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
            as="h4"
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
            bg="#EBF0F9"
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
            <Icon
              as={BsFullscreen}
              position="absolute"
              right="6"
              cursor="pointer"
            />
          </Box>
          <Stack mt={['2', '5']} direction="row" spacing={4}>
            {eventData.signUpUrl.length > 0 && (
              <Button
                as={Link}
                size="md"
                target="_blank"
                bg="#2C5282"
                color="white"
                _hover={{ opacity: '90%', textDecoration: 'none' }}
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
                bg="#2C5282"
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

      {isMobile ? (
        <Drawer placement="bottom" size="xl" isOpen={isOpen} onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent
            bg="#F6FAFF"
            borderRadius="20"
            justifyContent="center"
            p={1}
          >
            <Center mt={4} mb={2}>
              <Box w={10} h={1} bgColor="#A8A8A8" borderRadius={20} />
            </Center>
            <AspectRatio ratio={16 / 9} m={2}>
              <Image borderRadius={10} src={eventData.imageAdUrl} />
            </AspectRatio>
            <DrawerBody p={0} w={['90%', '100%']} m="auto">
              <Stack spacing={4} direction="row" mb="2">
                {tagArray.map((tag, i) => (
                  <Tag
                    key={'event' + i}
                    borderRadius={20}
                    size="sm"
                    fontSize="11"
                    fontWeight={'bold'}
                    px={3}
                    py={1}
                    colorScheme={tag.color}
                  >
                    {tag.value}
                  </Tag>
                ))}
              </Stack>
              {eventData.title && (
                <Heading as="h4" size="lg" fontWeight="900" mb="3">
                  {eventData.title}
                </Heading>
              )}
              <Box>
                {eventData.eventStartDate && (
                  <Text fontSize={"sm"} fontWeight="bold">
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
                  <Text fontSize={"sm"} fontWeight="bold">
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
                  <Text fontSize={"sm"} fontWeight="bold">
                    <Icon mr={2} as={ImLocation2} />
                    Location: {eventData.location}
                  </Text>
                )}
              </Box>
              <Box bg="#EBF0F9" borderRadius="20" mt="2" p={4}>
                <Text fontSize={"xs"} w="100%">
                  <ReactMarkdown
                    components={ChakraUIRenderer()}
                    children={eventData.description}
                    skipHtml
                  />
                </Text>
              </Box>
            </DrawerBody>
            <DrawerFooter py={1} mt={3} mb="2">
              <ButtonGroup
                display="flex"
                justifyContent="center"
                size="md"
                flexDirection="row"
                spacing="2"
                w="100%"
                variant="outline"
                colorScheme="#535353"
                alignItems="center"
              >
                {eventData.signUpUrl.length > 0 && (
                  <Button
                    flex="1"
                    as={Link}
                    target="_blank"
                    bg="#2C5282"
                    color="white"
                    _hover={{ opacity: '90%', textDecoration: 'none' }}
                    href={eventData.signUpUrl ? eventData.signUpUrl : null}
                    rightIcon={<MdOutlineAddToPhotos />}
                    fontSize="xs"
                    p="4"
                  >
                    Sign up
                  </Button>
                )}

                {generateGoogleCalendarLink(eventData) && (
                  <Button
                    flex="1"
                    as={Link}
                    target="_blank"
                    bg="#2C5282"
                    color="white"
                    _hover={{ opacity: '90%', textDecoration: 'none' }}
                    href={generateGoogleCalendarLink(eventData)}
                    rightIcon={<FaCalendarAlt />}
                    fontSize="xs"
                    p="4"
                  >
                    Add to Calendar
                  </Button>
                )}
              </ButtonGroup>
              
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      ) : (
        <Modal size="3xl" isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent
            bg="#F6FAFF"
            borderRadius="20"
            justifyContent="center"
            p={5}
          >
            <ModalCloseButton
              position="absolute"
              right="0"
              top="-10"
              bgColor="white"
              borderRadius="20"
            />

            <AspectRatio ratio={16 / 9}>
              <Image borderRadius={10} src={eventData.imageAdUrl} />
            </AspectRatio>
            <ModalBody p={1} w={['90%', '100%']} m="auto">
              <Stack spacing={4} direction="row" mt="2" mb="3">
                {tagArray.map((tag, i) => (
                  <Tag
                    key={'event' + i}
                    borderRadius={20}
                    size="sm"
                    fontSize={14}
                    px={3}
                    fontWeight={'bold'}
                    py={2}
                    colorScheme={tag.color}
                  >
                    {tag.value}
                  </Tag>
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
                  <Text fontSize={'md'} fontWeight="bold">
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
                  <Text fontSize={'md'} fontWeight="bold">
                    <Icon mr={2} as={ImLocation2} />
                    Location: {eventData.location}
                  </Text>
                )}
              </Box>
              <Box bg="#EBF0F9" borderRadius="20" mt={5} p={4}>
                <Text fontSize={'md'} w="100%">
                  <ReactMarkdown
                    components={ChakraUIRenderer()}
                    children={eventData.description}
                    skipHtml
                  />
                </Text>
              </Box>
            </ModalBody>
            <ModalFooter p={0} pl={1} mt={3}>
              <ButtonGroup
                size="md"
                flexDirection="row"
                spacing={2}
                w="100%"
                variant="outline"
                colorScheme="#535353"
                alignItems="center"
              >
                {eventData.signUpUrl.length > 0 && (
                  <Button
                    as={Link}
                    target="_blank"
                    bg="#2C5282"
                    color="white"
                    _hover={{ opacity: '90%', textDecoration: 'none' }}
                    href={eventData.signUpUrl ? eventData.signUpUrl : null}
                    rightIcon={<MdOutlineAddToPhotos />}
                    whiteSpace="nowrap"
                    fontSize={'md'}
                    p="4"
                  >
                    Sign up
                  </Button>
                )}

                {generateGoogleCalendarLink(eventData) && (
                  <Button
                    as={Link}
                    target="_blank"
                    bg="#2C5282"
                    color="white"
                    _hover={{ opacity: '90%', textDecoration: 'none' }}
                    href={generateGoogleCalendarLink(eventData)}
                    rightIcon={<FaCalendarAlt />}
                    whiteSpace="nowrap"
                    fontSize={'md'}
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
