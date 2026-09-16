import { useCallback, useEffect, useRef, useState } from 'react';
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
  HStack,
  ButtonGroup,
  Divider,
  Input,
  InputGroup,
  InputLeftElement,
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
import { SearchIcon } from 'components/icons';
import { FiPlus } from 'react-icons/fi';
import AnnouncementEditorModal from './AnnouncementEditorModal';
import AdminAnnouncementCard from './AdminAnnouncementCard';
import { DateTime } from 'luxon';
import { BRAND_BLUE, pastRecencyMs } from './announcementListHelpers';

const FilterChip = ({ label, isActive, onClick }) => (
  <Button
    size="sm"
    variant={isActive ? 'solid' : 'outline'}
    bg={isActive ? BRAND_BLUE : 'transparent'}
    color={isActive ? 'white' : BRAND_BLUE}
    borderColor={BRAND_BLUE}
    _hover={isActive ? { opacity: '90%' } : { bg: '#F6FAFF' }}
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

  const getAnnouncementList = useCallback(async () => {
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
  }, [toast]);

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

  const loadForEditor = useCallback(
    async (id, action) => {
      const gen = ++loadGen.current;
      setBusyId(id);
      try {
        const { data, status } = await axios.get(
          '/api/announcement/admin-get',
          {
            params: { id },
          }
        );
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
    },
    [toast]
  );

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

  const onPublish = useCallback(
    async (id) => {
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
    },
    [allAnnouncements, getAnnouncementList, toast]
  );

  // Stable per-action handlers (id in, side effect out) so the memoized
  // AdminAnnouncementCard skips re-renders while filtering/searching.
  const editItem = useCallback(
    (id) => loadForEditor(id, 'edit'),
    [loadForEditor]
  );
  const duplicateItem = useCallback(
    (id) => loadForEditor(id, 'duplicate'),
    [loadForEditor]
  );
  const publishItem = useCallback((id) => onPublish(id), [onPublish]);
  const deleteItem = useCallback(
    (id) => setPendingDelete(allAnnouncements.find((item) => item.id === id)),
    [allAnnouncements]
  );

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
    if (unpublishedOnly && item.isPublished) return false;
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
                variant={isCurrentAnnouncements ? 'solid' : 'outline'}
                bg={isCurrentAnnouncements ? BRAND_BLUE : 'transparent'}
                color={isCurrentAnnouncements ? 'white' : BRAND_BLUE}
                borderColor={BRAND_BLUE}
                _hover={
                  isCurrentAnnouncements
                    ? { opacity: '90%' }
                    : { bg: '#F6FAFF' }
                }
                aria-pressed={isCurrentAnnouncements}
                onClick={() => setIsCurrentAnnouncements(true)}
              >
                Current
              </Button>
              <Button
                variant={!isCurrentAnnouncements ? 'solid' : 'outline'}
                bg={!isCurrentAnnouncements ? BRAND_BLUE : 'transparent'}
                color={!isCurrentAnnouncements ? 'white' : BRAND_BLUE}
                borderColor={BRAND_BLUE}
                _hover={
                  !isCurrentAnnouncements
                    ? { opacity: '90%' }
                    : { bg: '#F6FAFF' }
                }
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
                leftIcon={<FiPlus />}
                bg={BRAND_BLUE}
                color="white"
                _hover={{ opacity: '90%' }}
                onClick={onCreate}
                isDisabled={!canCreate}
              >
                New Announcement
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
                  label="Unpublished"
                  isActive={unpublishedOnly}
                  onClick={() => setUnpublishedOnly(!unpublishedOnly)}
                />
              </WrapItem>
            </Wrap>
          </Box>
        </Flex>

        {listLoading && (
          <Stack>
            <Skeleton height="400px" />
            <Skeleton height="400px" />
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
              <Button
                leftIcon={<FiPlus />}
                bg={BRAND_BLUE}
                color="white"
                _hover={{ opacity: '90%' }}
                onClick={onCreate}
              >
                New Announcement
              </Button>
            )}
          </Box>
        )}

        {!listLoading && filtered.length > 0 && (
          <Stack spacing={6}>
            {filtered.map((announcementItem) => (
              <AdminAnnouncementCard
                key={announcementItem.id}
                item={announcementItem}
                busy={busyId === announcementItem.id}
                canCreate={canCreate}
                canPublish={canPublish}
                createDisabledReason={createDisabledReason}
                publishDisabledReason={publishDisabledReason}
                onEdit={editItem}
                onDuplicate={duplicateItem}
                onPublish={publishItem}
                onDelete={deleteItem}
              />
            ))}
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
