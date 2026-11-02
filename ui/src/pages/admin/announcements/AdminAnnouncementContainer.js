import { useCallback, useEffect, useRef, useState } from 'react';
import { FiMoreVertical, FiPlus, FiSearch, FiX } from 'react-icons/fi';
import { DateTime } from 'luxon';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  IconButton,
  Image,
  Input,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Spinner,
  Text,
  useDisclosure,
  useToast,
} from 'components';
import { StarIcon } from 'components/icons';
import { customAxios as axios } from 'utils/customAxios';
import AnnouncementEditorModal from './AnnouncementEditorModal';
import {
  ADMIN_FONT,
  DISPLAY_DATE_ERROR,
  announcementColors,
  announcementListSx,
  announcementTitle,
  auditLine,
  dangerButtonProps,
  eventLine,
  focusRing,
  isPastAnnouncement,
  isShowingNow,
  isWebsiteLive,
  primaryButtonProps,
  publishButtonProps,
  quietButtonProps,
  showingLine,
} from './announcementShared';

const useMatchMedia = (query) => {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    const media = window.matchMedia(query);
    const handleChange = () => setMatches(media.matches);
    media.addEventListener('change', handleChange);
    return () => media.removeEventListener('change', handleChange);
  }, [query]);

  return matches;
};

const listErrorToast = {
  description:
    'There was an issue with the request, please talk to a t3ch support',
  status: 'warning',
  duration: 8000,
  isClosable: true,
};

const AnnouncementThumb = (props) => {
  const { url } = props;
  const [failed, setFailed] = useState(false);
  const source = typeof url === 'string' ? url.trim() : '';

  useEffect(() => {
    setFailed(false);
  }, [source]);

  if (!source || failed) {
    return (
      <Flex className="announcement-thumb is-empty" aria-hidden>
        No image
      </Flex>
    );
  }

  return (
    <Box className="announcement-thumb" aria-hidden>
      <Image
        src={source}
        alt=""
        w="100%"
        h="100%"
        objectFit="cover"
        onError={() => setFailed(true)}
      />
    </Box>
  );
};

const LiveTag = (props) => {
  const { isLive } = props;
  return (
    <Flex
      as="span"
      align="center"
      h="24px"
      pr="2px"
      color={announcementColors.ink}
      fontFamily={ADMIN_FONT}
      fontSize="12px"
      fontWeight="600"
      lineHeight="1"
    >
      <Box
        as="span"
        w="8px"
        h="8px"
        mr="6px"
        borderRadius="full"
        flex="none"
        bg={isLive ? announcementColors.live : announcementColors.offline}
        aria-hidden
      />
      {isLive ? 'Live' : 'Not live'}
    </Flex>
  );
};

const Pill = (props) => {
  const { children, bg, color } = props;
  return (
    <Flex
      as="span"
      align="center"
      h="24px"
      px="8px"
      borderRadius="999px"
      bg={bg}
      color={color}
      fontFamily={ADMIN_FONT}
      fontSize="12px"
      fontWeight="700"
      letterSpacing="-0.01em"
      lineHeight="1"
    >
      {children}
    </Flex>
  );
};

const MoreMenu = (props) => {
  const { title, canDuplicate, canDelete, onDuplicate, onDelete } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Popover
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      placement="bottom-end"
      isLazy
    >
      <PopoverTrigger>
        <IconButton
          type="button"
          aria-label={`More actions for ${title}`}
          aria-expanded={isOpen}
          aria-haspopup="menu"
          icon={<Icon as={FiMoreVertical} boxSize="18px" />}
          onClick={(event) => event.stopPropagation()}
          {...quietButtonProps}
          w="40px"
          minW="40px"
          px="0"
        />
      </PopoverTrigger>
      <PopoverContent
        w="220px"
        borderColor={announcementColors.line}
        borderRadius="16px"
        boxShadow={announcementColors.shadow}
        onClick={(event) => event.stopPropagation()}
      >
        <PopoverBody p="6px">
          <Button
            type="button"
            role="menuitem"
            variant="ghost"
            justifyContent="flex-start"
            w="100%"
            h="auto"
            px="10px"
            py="8px"
            borderRadius="6px"
            fontFamily={ADMIN_FONT}
            fontWeight="600"
            isDisabled={!canDuplicate}
            onClick={(event) => {
              event.stopPropagation();
              onClose();
              onDuplicate();
            }}
          >
            Duplicate
          </Button>
          <Button
            type="button"
            role="menuitem"
            variant="ghost"
            justifyContent="flex-start"
            w="100%"
            h="auto"
            px="10px"
            py="8px"
            borderRadius="6px"
            fontFamily={ADMIN_FONT}
            fontWeight="600"
            color={announcementColors.danger}
            isDisabled={!canDelete}
            onClick={(event) => {
              event.stopPropagation();
              onClose();
              onDelete();
            }}
          >
            Delete
          </Button>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

const AnnouncementRow = (props) => {
  const {
    announcement,
    view,
    isSelected,
    isBusy,
    showPublish,
    publishLocked,
    createLocked,
    onOpen,
    onPublish,
    onDuplicate,
    onDelete,
  } = props;
  const title = announcementTitle(announcement);
  const event = eventLine(announcement);
  const showing = showingLine(announcement);
  const audit = auditLine(announcement);
  const slidesOnly =
    announcement?.isInPpt === true && announcement?.isInWeb !== true;
  const isLive = isWebsiteLive(announcement);

  return (
    <Box
      as="article"
      className={`announcement-row is-${view}${
        isSelected ? ' is-selected' : ''
      }`}
      onClick={() => onOpen(announcement)}
    >
      <AnnouncementThumb url={announcement?.imageAdUrl} />
      <Box minW="0" display="flex" flexDirection="column" gap="8px">
        <Heading
          as="h2"
          fontFamily={ADMIN_FONT}
          fontSize="16px"
          fontWeight="600"
          letterSpacing="-0.02em"
          lineHeight="1.4"
          overflowWrap="anywhere"
        >
          {title}
        </Heading>
        <Flex wrap="wrap" gap="6px" align="center">
          <LiveTag isLive={isLive} />
          {announcement?.isInWeb === true ? (
            <Pill
              bg={announcementColors.tagWebBg}
              color={announcementColors.tagWeb}
            >
              Web
            </Pill>
          ) : null}
          {announcement?.isInPpt === true ? (
            <Pill
              bg={announcementColors.tagSlidesBg}
              color={announcementColors.tagSlides}
            >
              PPT
            </Pill>
          ) : null}
          {announcement?.featured === true ? (
            <Pill
              bg={announcementColors.tagFeatureBg}
              color={announcementColors.tagFeature}
            >
              <StarIcon boxSize="12px" mr="4px" aria-hidden />
              Featured
            </Pill>
          ) : null}
        </Flex>
        {slidesOnly ? (
          <Text
            fontFamily={ADMIN_FONT}
            fontSize="13px"
            color={announcementColors.muted}
          >
            Sunday slides only. It is not on the website.
          </Text>
        ) : null}
        {event ? (
          <Text
            fontFamily={ADMIN_FONT}
            fontSize="14px"
            fontWeight="600"
            overflowWrap="anywhere"
          >
            {event}
          </Text>
        ) : null}
        {showing ? (
          <Text
            fontFamily={ADMIN_FONT}
            fontSize="13px"
            color={announcementColors.muted}
            overflowWrap="anywhere"
          >
            {showing}
          </Text>
        ) : null}
        {audit ? (
          <Text
            fontFamily={ADMIN_FONT}
            fontSize="13px"
            color={announcementColors.muted}
            overflowWrap="anywhere"
          >
            {audit}
          </Text>
        ) : null}
      </Box>
      <Box
        className="announcement-actions"
        onClick={(event) => event.stopPropagation()}
      >
        {showPublish ? (
          <Button
            type="button"
            isDisabled={publishLocked || isBusy}
            isLoading={isBusy}
            aria-label={
              announcement.isPublished
                ? `Unpublish ${title}. It leaves the website. Sunday slides stay as they are.`
                : `Publish ${title} on the website`
            }
            onClick={() => onPublish(announcement)}
            {...(announcement.isPublished
              ? quietButtonProps
              : publishButtonProps)}
          >
            {announcement.isPublished ? 'Unpublish' : 'Publish'}
          </Button>
        ) : null}
        <Button
          type="button"
          isDisabled={isBusy}
          onClick={() => onOpen(announcement)}
          {...quietButtonProps}
        >
          Edit
        </Button>
        <MoreMenu
          title={title}
          canDuplicate={!createLocked}
          canDelete={!publishLocked}
          onDuplicate={() => onDuplicate(announcement)}
          onDelete={() => onDelete(announcement)}
        />
      </Box>
    </Box>
  );
};

const AdminAnnouncementContainer = (props) => {
  const { user } = props;
  const toast = useToast();
  const toastRef = useRef(toast);
  toastRef.current = toast;
  const cancelRef = useRef(null);
  const discardCancelRef = useRef(null);
  const isPhone = useMatchMedia('(max-width: 520px)');
  const isWide = useMatchMedia('(min-width: 1280px)');

  const [allAnnouncements, setAllAnnouncements] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [period, setPeriod] = useState('now');
  const [query, setQuery] = useState('');
  const [liveFilter, setLiveFilter] = useState(null);
  const [sessionView, setSessionView] = useState(null);
  const [busyId, setBusyId] = useState(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isEditorDirty, setIsEditorDirty] = useState(false);
  const [editorSession, setEditorSession] = useState(null);
  const [focusRequest, setFocusRequest] = useState(null);
  const [discard, setDiscard] = useState(null);
  const [confirm, setConfirm] = useState(null);

  const isPublishDisabled = () => {
    const aboveT3chPrivs = ['t3ch', 'admin', 'stewardship'];
    if (aboveT3chPrivs.includes(user?.accessType)) return false;
    return true;
  };

  const isCreateDisabled = () => {
    const aboveTcPrivs = ['tc', 't3ch', 'admin', 'stewardship'];
    if (aboveTcPrivs.includes(user?.accessType)) return false;
    return true;
  };

  const getAnnouncementList = useCallback(async () => {
    try {
      const { data, status } = await axios.get('/api/announcement/admin-get');
      if (status !== 200 || !Array.isArray(data)) {
        throw new Error('announcement list');
      }
      setAllAnnouncements(data);
    } catch (err) {
      console.log(err);
      toastRef.current(listErrorToast);
    } finally {
      setHasLoaded(true);
    }
  }, []);

  useEffect(() => {
    getAnnouncementList();
  }, [getAnnouncementList]);

  const handleDirtyChange = useCallback((dirty) => {
    setIsEditorDirty(dirty);
  }, []);

  const actuallyOpen = useCallback(async (action, id, pendingError) => {
    if (action === 'create') {
      setEditorSession({
        token: Date.now(),
        action,
        announcement: null,
        pendingError: null,
      });
      setFocusRequest(null);
      setIsEditorOpen(true);
      return;
    }

    setBusyId(id);
    try {
      const { data, status } = await axios.get('/api/announcement/admin-get', {
        params: { id },
      });
      const record = Array.isArray(data) ? data[0] : null;
      if (status !== 200 || !record || typeof record !== 'object') {
        toastRef.current(listErrorToast);
        return;
      }
      setEditorSession({
        token: Date.now(),
        action,
        announcement: record,
        pendingError: pendingError || null,
      });
      setFocusRequest(null);
      setIsEditorOpen(true);
    } catch (err) {
      console.log(err);
      toastRef.current(listErrorToast);
    } finally {
      setBusyId(null);
    }
  }, []);

  const isSameEdit = (id) =>
    isEditorOpen &&
    editorSession?.action === 'edit' &&
    editorSession?.announcement?.id === id;

  const requestOpen = (action, id, pendingError) => {
    if (action !== 'create' && !id) return;
    if (action === 'edit' && isSameEdit(id)) {
      if (pendingError) {
        setFocusRequest({ token: Date.now(), ...pendingError });
      }
      return;
    }
    if (isEditorOpen && isEditorDirty) {
      setDiscard({ action, id, pendingError: pendingError || null });
      return;
    }
    actuallyOpen(action, id, pendingError);
  };

  const requestClose = (options) => {
    if (options?.force) {
      setIsEditorDirty(false);
      setIsEditorOpen(false);
      setDiscard(null);
      return;
    }
    if (isEditorDirty) {
      setDiscard({ close: true });
      return;
    }
    setIsEditorOpen(false);
  };

  const keepVisible = (willBeLive) => {
    setLiveFilter((current) => {
      if (willBeLive && current === 'notlive') return null;
      if (!willBeLive && current === 'live') return null;
      return current;
    });
  };

  const handleSaved = useCallback(
    (saved) => {
      const live = saved?.isInWeb === true && saved?.isPublished === true;
      setLiveFilter((current) => {
        if (live && current === 'notlive') return null;
        if (!live && current === 'live') return null;
        return current;
      });
      if (saved?.action && saved.action !== 'edit') setPeriod('now');
      getAnnouncementList();
    },
    [getAnnouncementList]
  );

  const updatePublished = async (announcement, isPublished) => {
    if (!announcement?.id) return;
    setBusyId(announcement.id);
    try {
      const { status } = await axios.put('/api/announcement/update', {
        id: announcement.id,
        isPublished,
      });
      if (status !== 200) throw new Error('publish');
      keepVisible(announcement.isInWeb === true && isPublished);
      toast({
        description: isPublished
          ? 'On the website.'
          : 'Off the website. Sunday slides stay as they are.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      await getAnnouncementList();
    } catch (err) {
      console.log(err);
      toast(listErrorToast);
    } finally {
      setBusyId(null);
    }
  };

  const handlePublish = (announcement) => {
    if (!announcement?.id || announcement.isInWeb !== true) return;
    if (announcement.isPublished) {
      setConfirm({ kind: 'unpublish', announcement });
      return;
    }
    const hasStart = Boolean(announcement.displayStartDateTime);
    const hasEnd = Boolean(announcement.displayEndDateTime);
    if (!hasStart || !hasEnd) {
      requestOpen('edit', announcement.id, {
        field: hasStart ? 'displayEnd' : 'displayStart',
        message: DISPLAY_DATE_ERROR,
      });
      return;
    }
    updatePublished(announcement, true);
  };

  const deleteAnnouncement = async (announcement) => {
    if (!announcement?.id) return;
    setBusyId(announcement.id);
    try {
      const { status } = await axios.put('/api/announcement/update', {
        id: announcement.id,
        isDeleted: true,
      });
      if (status !== 200) throw new Error('delete');
      if (editorSession?.announcement?.id === announcement.id) {
        setIsEditorDirty(false);
        setIsEditorOpen(false);
      }
      toast({
        description: 'Announcement has been deleted',
        status: 'success',
        duration: 8000,
        isClosable: true,
      });
      await getAnnouncementList();
    } catch (err) {
      console.log(err);
      toast(listErrorToast);
    } finally {
      setBusyId(null);
    }
  };

  const handleDiscardConfirm = () => {
    const pending = discard;
    setDiscard(null);
    setIsEditorDirty(false);
    if (!pending || pending.close) {
      setIsEditorOpen(false);
      return;
    }
    actuallyOpen(pending.action, pending.id, pending.pendingError);
  };

  const handleConfirm = () => {
    const pending = confirm;
    setConfirm(null);
    if (!pending?.announcement) return;
    if (pending.kind === 'unpublish') {
      updatePublished(pending.announcement, false);
      return;
    }
    deleteAnnouncement(pending.announcement);
  };

  useEffect(() => {
    if (!isEditorOpen || !isWide) return undefined;
    const handleKey = (event) => {
      if (event.key !== 'Escape' || event.defaultPrevented) return;
      if (discard || confirm) return;
      if (isEditorDirty) setDiscard({ close: true });
      else setIsEditorOpen(false);
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isEditorOpen, isWide, isEditorDirty, discard, confirm]);

  const now = DateTime.now();
  const records = Array.isArray(allAnnouncements) ? allAnnouncements : [];
  const nowAnnouncements = records.filter((item) => isShowingNow(item, now));
  const pastAnnouncements = records.filter((item) =>
    isPastAnnouncement(item, now)
  );
  const periodAnnouncements =
    period === 'now' ? nowAnnouncements : pastAnnouncements;
  const queryText = query.trim().toLowerCase();
  const visible = periodAnnouncements.filter((item) => {
    if (!item || typeof item !== 'object') return false;
    if (queryText) {
      const title = typeof item.title === 'string' ? item.title : '';
      if (!title.toLowerCase().includes(queryText)) return false;
    }
    const live = isWebsiteLive(item);
    if (liveFilter === 'live' && !live) return false;
    if (liveFilter === 'notlive' && live) return false;
    return true;
  });
  const view = sessionView || (isPhone ? 'list' : 'cards');
  const publishLocked = isPublishDisabled();
  const createLocked = isCreateDisabled();
  const selectedId =
    isEditorOpen && editorSession?.action === 'edit'
      ? editorSession?.announcement?.id
      : null;
  const countLabel = `${visible.length} ${
    visible.length === 1 ? 'announcement' : 'announcements'
  }`;
  const filtered = Boolean(queryText) || Boolean(liveFilter);
  const confirmTitle = (() => {
    if (confirm?.kind === 'unpublish') return 'Unpublish this announcement?';
    if (confirm?.kind === 'delete') return 'Delete this announcement?';
    return '';
  })();
  const confirmName = announcementTitle(confirm?.announcement);
  const confirmCopy =
    confirm?.kind === 'unpublish'
      ? `“${confirmName}” will leave the website. Sunday slides stay as they are.`
      : `“${confirmName}” will be removed. If it is on the website, people will no longer see it.`;

  const newAnnouncementButton = (fullWidth) => (
    <Button
      type="button"
      leftIcon={<Icon as={FiPlus} boxSize="18px" />}
      onClick={() => requestOpen('create')}
      isDisabled={createLocked}
      w={fullWidth ? '100%' : 'auto'}
      {...primaryButtonProps}
    >
      New announcement
    </Button>
  );

  return (
    <Box fontFamily={ADMIN_FONT} color={announcementColors.ink}>
      <Flex
        direction={{ base: 'column', md: 'row' }}
        align={{ base: 'stretch', md: 'flex-start' }}
        justify="space-between"
        gap="12px"
        mb="18px"
      >
        <Box minW="0">
          <Heading
            as="h1"
            fontFamily={ADMIN_FONT}
            fontSize={{ base: '22px', xl: '26px' }}
            fontWeight="600"
            letterSpacing="-0.03em"
            lineHeight="1.2"
          >
            Announcements
          </Heading>
          <Text
            mt="6px"
            maxW="62ch"
            fontFamily={ADMIN_FONT}
            fontSize="14px"
            fontWeight="500"
            color={announcementColors.muted}
          >
            Live means people can see it on the website. Not live is saved here,
            or it is Sunday slides only.
          </Text>
        </Box>
        <Box display={{ base: 'none', md: 'block' }} flex="none">
          {newAnnouncementButton(false)}
        </Box>
        <Box display={{ base: 'block', md: 'none' }}>
          {newAnnouncementButton(true)}
        </Box>
      </Flex>

      {!hasLoaded ? (
        <Flex py="10" justify="center">
          <Spinner color={announcementColors.blue} />
        </Flex>
      ) : (
        <Flex direction={isWide ? 'row' : 'column'} align="stretch" gap="12px">
          <Box flex="1" minW="0" sx={announcementListSx}>
            <Flex direction="column" gap="14px">
              <Flex
                role="tablist"
                gap="20px"
                borderBottom="1px solid"
                borderColor={announcementColors.line}
                overflowX="auto"
              >
                {[
                  ['now', 'Showing now', nowAnnouncements.length],
                  ['past', 'Past', pastAnnouncements.length],
                ].map(([id, label, count]) => {
                  const isActive = period === id;
                  return (
                    <Button
                      key={id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      variant="unstyled"
                      display="inline-flex"
                      alignItems="center"
                      h={{ base: '44px', xl: 'auto' }}
                      pb={{ xl: '10px' }}
                      mb="-1px"
                      borderBottom="2px solid"
                      borderColor={
                        isActive ? announcementColors.blue : 'transparent'
                      }
                      borderRadius="0"
                      color={
                        isActive
                          ? announcementColors.blue
                          : announcementColors.muted
                      }
                      fontFamily={ADMIN_FONT}
                      fontWeight="600"
                      onClick={() => setPeriod(id)}
                      sx={focusRing}
                    >
                      {label}
                      <Text as="span" ml="6px" fontWeight="500">
                        {count}
                      </Text>
                    </Button>
                  );
                })}
              </Flex>

              <Box>
                <Flex
                  align="center"
                  gap="8px"
                  h="42px"
                  w="100%"
                  px="12px"
                  border="1px solid"
                  borderColor={announcementColors.line}
                  borderRadius="8px"
                  bg={announcementColors.paper}
                  sx={{
                    '&:focus-within': {
                      borderColor: announcementColors.blue,
                      boxShadow: '0 0 0 3px rgba(23, 53, 107, 0.16)',
                    },
                  }}
                >
                  <Icon
                    as={FiSearch}
                    boxSize="18px"
                    color={announcementColors.muted}
                    aria-hidden
                  />
                  <Input
                    type="search"
                    variant="unstyled"
                    flex="1"
                    minW="0"
                    value={query}
                    placeholder="Search by title"
                    aria-label="Search announcements by title"
                    fontFamily={ADMIN_FONT}
                    onChange={(event) => setQuery(event.target.value)}
                    sx={{
                      '&::-webkit-search-cancel-button': { display: 'none' },
                    }}
                  />
                  {query ? (
                    <IconButton
                      type="button"
                      aria-label="Clear search"
                      icon={<Icon as={FiX} boxSize="16px" />}
                      variant="ghost"
                      minW="28px"
                      w="28px"
                      h="28px"
                      color={announcementColors.muted}
                      onClick={() => setQuery('')}
                      sx={focusRing}
                    />
                  ) : null}
                </Flex>
                <Flex
                  role="group"
                  aria-label="Filter by live state"
                  wrap="wrap"
                  gap="8px"
                  mt="10px"
                >
                  {[
                    ['live', 'Live'],
                    ['notlive', 'Not live'],
                  ].map(([id, label]) => {
                    const isOn = liveFilter === id;
                    return (
                      <Button
                        key={id}
                        type="button"
                        aria-pressed={isOn}
                        h={{ base: '44px', xl: '36px' }}
                        px="12px"
                        borderRadius="8px"
                        border="1px solid"
                        borderColor={
                          isOn
                            ? announcementColors.blue
                            : announcementColors.line
                        }
                        bg={
                          isOn
                            ? announcementColors.blueSoft
                            : announcementColors.paper
                        }
                        color={
                          isOn
                            ? announcementColors.blue
                            : announcementColors.ink
                        }
                        fontFamily={ADMIN_FONT}
                        fontWeight="600"
                        fontSize="14px"
                        _hover={{
                          bg: isOn
                            ? announcementColors.blueSoft
                            : announcementColors.wash,
                        }}
                        sx={focusRing}
                        onClick={() =>
                          setLiveFilter((current) =>
                            current === id ? null : id
                          )
                        }
                      >
                        {label}
                      </Button>
                    );
                  })}
                </Flex>
              </Box>
            </Flex>

            <Flex
              mt="18px"
              align="center"
              justify="space-between"
              wrap="wrap"
              columnGap="16px"
              rowGap="8px"
            >
              <Text
                as="p"
                m="0"
                whiteSpace="nowrap"
                fontFamily={ADMIN_FONT}
                fontSize="13px"
                color={announcementColors.muted}
                aria-live="polite"
              >
                {countLabel}
              </Text>
              <Flex
                align="center"
                gap="10px"
                ml="auto"
                flex="none"
                whiteSpace="nowrap"
              >
                <Text
                  id="announcement-view-label"
                  fontFamily={ADMIN_FONT}
                  fontSize="13px"
                  fontWeight="600"
                  color={announcementColors.muted}
                >
                  Show as
                </Text>
                <Flex
                  role="group"
                  aria-labelledby="announcement-view-label"
                  border="1px solid"
                  borderColor={announcementColors.line}
                  borderRadius="8px"
                  overflow="hidden"
                  bg={announcementColors.paper}
                >
                  {[
                    ['cards', 'Cards'],
                    ['list', 'List'],
                  ].map(([id, label], index) => {
                    const isOn = view === id;
                    return (
                      <Button
                        key={id}
                        type="button"
                        aria-pressed={isOn}
                        h={{ base: '44px', xl: '36px' }}
                        px="14px"
                        borderRadius="0"
                        borderLeft={index === 0 ? '0' : '1px solid'}
                        borderColor={announcementColors.line}
                        bg={isOn ? announcementColors.blueSoft : 'transparent'}
                        color={
                          isOn
                            ? announcementColors.blue
                            : announcementColors.ink
                        }
                        fontFamily={ADMIN_FONT}
                        fontWeight="600"
                        fontSize="14px"
                        _hover={{
                          bg: isOn
                            ? announcementColors.cardHover
                            : announcementColors.wash,
                        }}
                        sx={focusRing}
                        onClick={() => setSessionView(id)}
                      >
                        {label}
                      </Button>
                    );
                  })}
                </Flex>
              </Flex>
            </Flex>

            {visible.length === 0 ? (
              <Box mt="28px" maxW="48ch">
                <Heading
                  as="h2"
                  fontFamily={ADMIN_FONT}
                  fontSize="18px"
                  fontWeight="600"
                  letterSpacing="-0.02em"
                >
                  {filtered
                    ? 'Nothing matches'
                    : period === 'now'
                    ? 'Nothing is showing right now'
                    : 'Nothing in the past list'}
                </Heading>
                <Text
                  mt="6px"
                  fontFamily={ADMIN_FONT}
                  color={announcementColors.muted}
                >
                  {filtered
                    ? 'Clear the search or filters to see the rest of this list.'
                    : period === 'now'
                    ? 'Create an announcement to put one on the website or in Sunday slides.'
                    : 'Announcements move here after the dates you set have passed.'}
                </Text>
                {filtered ? (
                  <Button
                    type="button"
                    mt="16px"
                    onClick={() => {
                      setQuery('');
                      setLiveFilter(null);
                    }}
                    {...quietButtonProps}
                  >
                    Clear search and filters
                  </Button>
                ) : null}
                {!filtered && period === 'now' ? (
                  <Box mt="16px">{newAnnouncementButton(false)}</Box>
                ) : null}
              </Box>
            ) : (
              <Flex direction="column" gap="10px" mt="14px">
                {visible.map((announcement) =>
                  announcement?.id ? (
                    <AnnouncementRow
                      key={announcement.id}
                      announcement={announcement}
                      view={view}
                      isSelected={selectedId === announcement.id}
                      isBusy={busyId === announcement.id}
                      showPublish={
                        announcement.isInWeb === true && period === 'now'
                      }
                      publishLocked={publishLocked}
                      createLocked={createLocked}
                      onOpen={(record) => requestOpen('edit', record.id)}
                      onPublish={handlePublish}
                      onDuplicate={(record) =>
                        requestOpen('duplicate', record.id)
                      }
                      onDelete={(record) =>
                        setConfirm({ kind: 'delete', announcement: record })
                      }
                    />
                  ) : null
                )}
              </Flex>
            )}
          </Box>

          <AnnouncementEditorModal
            layout={isWide ? 'dock' : 'dialog'}
            isOpen={isEditorOpen}
            editorSession={editorSession}
            focusRequest={focusRequest}
            onRequestClose={requestClose}
            onDirtyChange={handleDirtyChange}
            onSaved={handleSaved}
          />
        </Flex>
      )}

      <AlertDialog
        isOpen={Boolean(discard)}
        leastDestructiveRef={discardCancelRef}
        onClose={() => setDiscard(null)}
      >
        <AlertDialogOverlay bg="rgba(20, 23, 28, 0.28)">
          <AlertDialogContent
            borderRadius="16px"
            fontFamily={ADMIN_FONT}
            color={announcementColors.ink}
          >
            <AlertDialogHeader
              fontFamily={ADMIN_FONT}
              fontSize="18px"
              fontWeight="600"
            >
              Leave without saving?
            </AlertDialogHeader>
            <AlertDialogBody
              fontFamily={ADMIN_FONT}
              color={announcementColors.muted}
            >
              The changes in this announcement will be lost.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button
                ref={discardCancelRef}
                type="button"
                onClick={() => setDiscard(null)}
                {...quietButtonProps}
              >
                Keep editing
              </Button>
              <Button
                type="button"
                ml="8px"
                onClick={handleDiscardConfirm}
                {...dangerButtonProps}
              >
                Leave
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <AlertDialog
        isOpen={Boolean(confirm)}
        leastDestructiveRef={cancelRef}
        onClose={() => setConfirm(null)}
      >
        <AlertDialogOverlay bg="rgba(20, 23, 28, 0.28)">
          <AlertDialogContent
            borderRadius="16px"
            fontFamily={ADMIN_FONT}
            color={announcementColors.ink}
          >
            <AlertDialogHeader
              fontFamily={ADMIN_FONT}
              fontSize="18px"
              fontWeight="600"
            >
              {confirmTitle}
            </AlertDialogHeader>
            <AlertDialogBody
              fontFamily={ADMIN_FONT}
              color={announcementColors.muted}
            >
              {confirmCopy}
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                type="button"
                onClick={() => setConfirm(null)}
                {...quietButtonProps}
              >
                {confirm?.kind === 'delete' ? 'Keep it' : 'Cancel'}
              </Button>
              <Button
                type="button"
                ml="8px"
                onClick={handleConfirm}
                {...(confirm?.kind === 'delete'
                  ? dangerButtonProps
                  : primaryButtonProps)}
              >
                {confirm?.kind === 'delete' ? 'Delete' : 'Unpublish'}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default AdminAnnouncementContainer;
