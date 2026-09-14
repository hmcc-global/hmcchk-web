import { useState, useEffect, useRef } from 'react';
import { customAxios as axios } from 'utils/customAxios';
import {
  Button,
  Heading,
  Text,
  Box,
  Container,
  useToast,
  Stack,
  Flex,
  Badge,
  Image,
  Grid,
  HStack,
  ButtonGroup,
  Divider,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  IconButton,
  Skeleton,
  Tooltip,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Wrap,
  WrapItem,
} from 'components';
import {
  CalendarIcon,
  TimeIcon,
  InfoOutlineIcon,
  SearchIcon,
  StarIcon,
  ChatIcon,
} from 'components/icons';
import { FiMoreVertical } from 'react-icons/fi';
import AnnouncementEditorModal from './AnnouncementEditorModal';
import { DateTime } from 'luxon';
import { pastRecencyMs } from './announcementListHelpers';

const FilterChip = ({ label, isActive, onClick }) => (
  <Button
    size="sm"
    variant={isActive ? 'solid' : 'outline'}
    colorScheme={isActive ? 'blue' : 'gray'}
    onClick={onClick}
    aria-pressed={isActive}
  >
    {label}
  </Button>
);

const isCurrentItem = (item, now) => {
  if (item.displayEndDateTime) {
    const end = DateTime.fromISO(item.displayEndDateTime);
    if (end.isValid) return end > now;
  }
  if (item.eventEndDate) {
    const end = DateTime.fromISO(item.eventEndDate);
    if (end.isValid) return end.endOf('day') > now;
  }
  return true;
};

const formatDisplayWindow = (item) => {
  const fmt = (value) => {
    if (!value) return null;
    const dt = DateTime.fromISO(value);
    return dt.isValid ? dt.toFormat('dd MMM yyyy HH:mm') : value;
  };
  const start = fmt(item.displayStartDateTime);
  const end = fmt(item.displayEndDateTime);
  if (!start && !end) return 'No display window';
  return `${start || '…'} – ${end || '…'}`;
};

const DESTINATION_OPTIONS = [
  { value: 'both', label: 'Both' },
  { value: 'web', label: 'Web' },
  { value: 'ppt', label: 'PPT' },
];

export default function AdminAnnouncementContainer(props) {
  const toast = useToast();
  const { user } = props;
  const now = DateTime.now();
  const cancelRef = useRef();
  const loadGen = useRef(0);

  const [allAnnouncements, setAllAnnouncements] = useState([]);
  const [listLoading, setListLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editAnnouncementData, setEditAnnouncementData] = useState(null);
  const [actionOnEditor, setActionOnEditor] = useState('create');
  const [isCurrentAnnouncements, setIsCurrentAnnouncements] = useState(true);
  const [query, setQuery] = useState('');
  const [destinationFilter, setDestinationFilter] = useState('both');
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [unpublishedOnly, setUnpublishedOnly] = useState(false);
  const [pendingDelete, setPendingDelete] = useState(null);

  const canCreate = ['tc', 't3ch', 'admin', 'stewardship'].includes(
    user.accessType
  );
  const canPublish = ['t3ch', 'admin', 'stewardship'].includes(user.accessType);

  const getAnnouncementList = async () => {
    try {
      const { data, status } = await axios.get('/api/announcement/admin-get');
      if (status !== 200) {
        throw Error('Something went wrong with the request');
      }
      setAllAnnouncements(data);
    } catch (err) {
      console.log(err);
      toast({
        description: 'Could not load announcements. Please try again.',
        status: 'error',
        duration: 8000,
        isClosable: true,
      });
    } finally {
      setListLoading(false);
    }
  };

  useEffect(() => {
    getAnnouncementList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const announcementListCallback = async () => {
    await getAnnouncementList();
  };

  const onCreate = () => {
    setIsEditorOpen(true);
    setActionOnEditor('create');
    setEditAnnouncementData(null);
  };

  const loadForEditor = async (id, action) => {
    const gen = ++loadGen.current;
    setBusyId(id);
    try {
      const { data, status } = await axios.get('/api/announcement/admin-get', {
        params: { id },
      });
      if (gen !== loadGen.current) return;
      if (status !== 200 || !data[0]) {
        toast({
          description: 'Could not open this announcement. Please try again.',
          status: 'warning',
          duration: 8000,
          isClosable: true,
        });
        return;
      }
      setIsEditorOpen(true);
      setActionOnEditor(action);
      setEditAnnouncementData(data[0]);
    } catch (err) {
      console.log(err);
      if (gen !== loadGen.current) return;
      toast({
        description: 'Could not open this announcement. Please try again.',
        status: 'warning',
        duration: 8000,
        isClosable: true,
      });
    } finally {
      if (gen === loadGen.current) setBusyId(null);
    }
  };

  const confirmDelete = async () => {
    const id = pendingDelete && pendingDelete.id;
    if (!id) return;
    setBusyId(id);
    try {
      const { status } = await axios.put('/api/announcement/update', {
        id,
        isDeleted: true,
      });
      if (status === 200) {
        toast({
          description: 'Announcement deleted',
          status: 'success',
          duration: 8000,
          isClosable: true,
        });
        setPendingDelete(null);
        await getAnnouncementList();
      } else {
        toast({
          description: 'Could not delete this announcement. Please try again.',
          status: 'error',
          duration: 8000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.log(err);
      toast({
        description: 'Could not delete this announcement. Please try again.',
        status: 'warning',
        duration: 8000,
        isClosable: true,
      });
    } finally {
      setBusyId(null);
    }
  };

  const onPublish = async (id) => {
    const announcementData = allAnnouncements.find((item) => item.id === id);
    if (!announcementData) return;
    setBusyId(id);
    try {
      const { status } = await axios.put('/api/announcement/update', {
        id,
        isPublished: !announcementData.isPublished,
      });
      if (status === 200) {
        toast({
          description: announcementData.isPublished
            ? 'Announcement unpublished'
            : 'Announcement published',
          status: 'success',
          duration: 8000,
          isClosable: true,
        });
      } else {
        toast({
          description: 'There was an issue with the request',
          status: 'error',
          duration: 8000,
          isClosable: true,
        });
      }
      await getAnnouncementList();
    } catch (err) {
      console.log(err);
      toast({
        description: 'Could not update publish state. Please try again.',
        status: 'warning',
        duration: 8000,
        isClosable: true,
      });
    } finally {
      setBusyId(null);
    }
  };

  const showProperDate = (startDate, endDate) => {
    if (startDate && endDate) {
      return `${startDate} - ${endDate}`;
    }
    if (startDate && !endDate) {
      return startDate;
    }
    if (!startDate && !endDate) {
      return '-';
    }
    return startDate;
  };

  const showProperTime = (startTime, endTime) => {
    if (startTime && endTime) {
      return `${startTime} - ${endTime}`;
    }
    if (!startTime && !endTime) {
      return '-';
    }
    return startTime;
  };

  const matchesDestination = (item) => {
    if (destinationFilter === 'web') return !!item.isInWeb;
    if (destinationFilter === 'ppt') return !!item.isInPpt;
    return true;
  };

  const filtered = allAnnouncements.filter((item) => {
    const current = isCurrentItem(item, now);
    if (isCurrentAnnouncements ? !current : current) return false;
    const title = (item.title || '').toLowerCase();
    if (query && !title.includes(query.trim().toLowerCase())) return false;
    if (!matchesDestination(item)) return false;
    if (featuredOnly && !item.featured) return false;
    if (unpublishedOnly && !(item.isInWeb && !item.isPublished)) return false;
    return true;
  });
  if (!isCurrentAnnouncements) {
    filtered.sort((a, b) => pastRecencyMs(b) - pastRecencyMs(a));
  }

  const createDisabledReason = canCreate
    ? null
    : 'Only TC and above can create announcements';
  const publishDisabledReason = canPublish
    ? null
    : 'Only t3ch, admin, or stewardship can publish or delete';

  return (
    <Container maxW="container.xl" pt={6} pb={10}>
      <Stack spacing={5}>
        <Flex
          justify="space-between"
          align={{ base: 'stretch', md: 'center' }}
          wrap="wrap"
          gap={3}
        >
          <HStack spacing={4} align="center" flexWrap="wrap">
            <Heading as="h1" size="lg">
              Announcements
            </Heading>
            <ButtonGroup size="sm" isAttached variant="outline">
              <Button
                colorScheme={isCurrentAnnouncements ? 'blue' : 'gray'}
                variant={isCurrentAnnouncements ? 'solid' : 'outline'}
                aria-pressed={isCurrentAnnouncements}
                onClick={() => setIsCurrentAnnouncements(true)}
              >
                Current
              </Button>
              <Button
                colorScheme={!isCurrentAnnouncements ? 'blue' : 'gray'}
                variant={!isCurrentAnnouncements ? 'solid' : 'outline'}
                aria-pressed={!isCurrentAnnouncements}
                onClick={() => setIsCurrentAnnouncements(false)}
              >
                Past
              </Button>
            </ButtonGroup>
          </HStack>
          <Tooltip
            label={createDisabledReason}
            isDisabled={!createDisabledReason}
            hasArrow
          >
            <Box>
              <Button
                colorScheme="blue"
                onClick={onCreate}
                isDisabled={!canCreate}
              >
                Add new
              </Button>
            </Box>
          </Tooltip>
        </Flex>

        <Flex wrap="wrap" align="center" gap={3}>
          <InputGroup
            flex="1"
            minW={{ base: '100%', md: '12rem' }}
            maxW={{ md: 'sm' }}
          >
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.400" />
            </InputLeftElement>
            <Input
              placeholder="Search by title"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search announcements"
            />
          </InputGroup>
          <Box role="group" aria-label="Destination">
            <Wrap>
              {DESTINATION_OPTIONS.map((opt) => (
                <WrapItem key={opt.value}>
                  <FilterChip
                    label={opt.label}
                    isActive={destinationFilter === opt.value}
                    onClick={() => setDestinationFilter(opt.value)}
                  />
                </WrapItem>
              ))}
            </Wrap>
          </Box>
          <Divider
            orientation="vertical"
            h="8"
            display={{ base: 'none', md: 'block' }}
          />
          <Box role="group" aria-label="Tags">
            <Wrap>
              <WrapItem>
                <FilterChip
                  label="Featured"
                  isActive={featuredOnly}
                  onClick={() => setFeaturedOnly(!featuredOnly)}
                />
              </WrapItem>
              <WrapItem>
                <FilterChip
                  label="Web unpublished"
                  isActive={unpublishedOnly}
                  onClick={() => setUnpublishedOnly(!unpublishedOnly)}
                />
              </WrapItem>
            </Wrap>
          </Box>
        </Flex>

        {listLoading && (
          <Stack>
            <Skeleton height="96px" />
            <Skeleton height="96px" />
            <Skeleton height="96px" />
          </Stack>
        )}

        {!listLoading && filtered.length === 0 && (
          <Box borderWidth="1px" borderRadius="lg" p={8} textAlign="center">
            <Text mb={4}>
              {allAnnouncements.length === 0
                ? 'No announcements yet.'
                : 'No announcements match these filters.'}
            </Text>
            {allAnnouncements.length === 0 && canCreate && (
              <Button colorScheme="blue" onClick={onCreate}>
                Add new
              </Button>
            )}
          </Box>
        )}

        {!listLoading && filtered.length > 0 && (
          <Stack spacing={3}>
            {filtered.map((announcementItem) => {
              const busy = busyId === announcementItem.id;
              return (
                <Box
                  key={announcementItem.id}
                  p={4}
                  borderRadius="lg"
                  borderWidth="1px"
                >
                  <Flex
                    direction={{ base: 'column', md: 'row' }}
                    align={{ md: 'flex-start' }}
                    gap={4}
                  >
                    <Box maxW="12rem" w="100%" flexShrink={0}>
                      <Image
                        src={announcementItem.imageAdUrl}
                        alt={announcementItem.title || ''}
                        fallbackSrc="https://hongkong.sub.hmccglobal.org/wp-content/uploads/Screenshot-2020-09-04-at-6.39.50-PM.png"
                        borderRadius="md"
                      />
                    </Box>
                    <Stack spacing={2} flex={1} minW={0}>
                      <HStack spacing={2} flexWrap="wrap">
                        <Heading size="md">{announcementItem.title}</Heading>
                        {announcementItem.featured && (
                          <HStack color="green.600" spacing={1}>
                            <StarIcon />
                            <Text fontSize="sm">Featured</Text>
                          </HStack>
                        )}
                      </HStack>
                      <HStack spacing={2} flexWrap="wrap">
                        {announcementItem.isInWeb && (
                          <Badge colorScheme="teal">Web</Badge>
                        )}
                        {announcementItem.isInPpt && (
                          <Badge colorScheme="orange">PPT</Badge>
                        )}
                        {announcementItem.isInWeb && (
                          <Badge
                            colorScheme={
                              announcementItem.isPublished ? 'green' : 'gray'
                            }
                          >
                            {announcementItem.isPublished
                              ? 'Published'
                              : 'Unpublished'}
                          </Badge>
                        )}
                      </HStack>
                      <Text fontSize="sm" color="gray.600">
                        Display: {formatDisplayWindow(announcementItem)}
                      </Text>
                      <Grid
                        templateColumns={{
                          base: '1fr',
                          md: 'repeat(2, 1fr)',
                        }}
                        gap={1}
                        fontSize="sm"
                      >
                        <Text>
                          <CalendarIcon /> Date:{' '}
                          {showProperDate(
                            announcementItem.eventStartDate,
                            announcementItem.eventEndDate
                          )}
                        </Text>
                        <Text>
                          <TimeIcon /> Time:{' '}
                          {showProperTime(
                            announcementItem.eventStartTime,
                            announcementItem.eventEndTime
                          )}
                        </Text>
                        <Text>
                          <InfoOutlineIcon /> Location:{' '}
                          {announcementItem.location || '-'}
                        </Text>
                        <Text>
                          <ChatIcon /> Submitter:{' '}
                          {announcementItem.submittedBy || '-'}
                        </Text>
                        <Text>
                          Last updated by:{' '}
                          {announcementItem.lastUpdatedBy || '-'}
                        </Text>
                      </Grid>
                    </Stack>
                    <HStack
                      spacing={2}
                      flexWrap="wrap"
                      alignSelf={{ base: 'stretch', md: 'flex-start' }}
                    >
                      <Button
                        size="sm"
                        colorScheme="blue"
                        onClick={() =>
                          loadForEditor(announcementItem.id, 'edit')
                        }
                        isLoading={busy}
                      >
                        Edit
                      </Button>
                      {announcementItem.isInWeb && (
                        <Tooltip
                          label={publishDisabledReason}
                          isDisabled={!publishDisabledReason}
                          hasArrow
                        >
                          <Box>
                            <Button
                              size="sm"
                              variant="outline"
                              colorScheme={
                                announcementItem.isPublished ? 'gray' : 'green'
                              }
                              isDisabled={!canPublish || busy}
                              isLoading={busy}
                              onClick={() => {
                                if (canPublish) onPublish(announcementItem.id);
                              }}
                            >
                              {announcementItem.isPublished
                                ? 'Unpublish'
                                : 'Publish'}
                            </Button>
                          </Box>
                        </Tooltip>
                      )}
                      <Menu>
                        <MenuButton
                          as={IconButton}
                          aria-label={`More actions for ${announcementItem.title}`}
                          icon={<FiMoreVertical />}
                          variant="ghost"
                          size="sm"
                          isDisabled={busy}
                        />
                        <MenuList>
                          {canCreate ? (
                            <MenuItem
                              onClick={() =>
                                loadForEditor(announcementItem.id, 'duplicate')
                              }
                            >
                              Duplicate
                            </MenuItem>
                          ) : (
                            <Tooltip label={createDisabledReason} hasArrow>
                              <Box>
                                <MenuItem isDisabled>Duplicate</MenuItem>
                              </Box>
                            </Tooltip>
                          )}
                          <MenuDivider />
                          <Tooltip
                            label={publishDisabledReason}
                            isDisabled={!publishDisabledReason}
                            hasArrow
                          >
                            <Box>
                              <MenuItem
                                color="red.500"
                                isDisabled={!canPublish}
                                onClick={() => {
                                  if (canPublish)
                                    setPendingDelete(announcementItem);
                                }}
                              >
                                Delete
                              </MenuItem>
                            </Box>
                          </Tooltip>
                        </MenuList>
                      </Menu>
                    </HStack>
                  </Flex>
                </Box>
              );
            })}
          </Stack>
        )}
      </Stack>

      <AnnouncementEditorModal
        user={user}
        isOpen={isEditorOpen}
        setIsOpen={setIsEditorOpen}
        editAnnouncementData={editAnnouncementData}
        actionOnEditor={actionOnEditor}
        announcementListCallback={announcementListCallback}
        announcementList={allAnnouncements}
      />

      <AlertDialog
        isOpen={!!pendingDelete}
        leastDestructiveRef={cancelRef}
        onClose={() => {
          if (busyId !== (pendingDelete && pendingDelete.id)) {
            setPendingDelete(null);
          }
        }}
        closeOnOverlayClick={busyId !== (pendingDelete && pendingDelete.id)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete announcement
            </AlertDialogHeader>
            <AlertDialogBody>
              Delete {pendingDelete && pendingDelete.title}? This cannot be
              undone from this screen.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={() => setPendingDelete(null)}
                isDisabled={busyId === (pendingDelete && pendingDelete.id)}
              >
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={confirmDelete}
                ml={3}
                isLoading={busyId === (pendingDelete && pendingDelete.id)}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Container>
  );
}
