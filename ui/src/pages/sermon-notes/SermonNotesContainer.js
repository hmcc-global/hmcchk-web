import {
  Container,
  Box,
  Text,
  VStack,
  HStack,
  Button,
  useToast,
  Icon,
} from 'components';
import { customAxios as axios } from 'utils/customAxios';
import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useDebounce } from 'react-use';
import { MdSave } from 'react-icons/md';
import { FaPaperPlane } from 'react-icons/fa';
import TiptapOutput from 'components/TipTap/TiptapOutput';
import { DateTime } from 'luxon';
import { getAllUserSermonNotes, deepUpdateUserNotes } from 'utils/SermonNotes';

const ACTION_BTN_BG = '#526de3';
const ACTION_BTN_HOVER = '#4459c4';

const SermonNotesContainer = (props) => {
  const { user, sermonNoteId } = props;
  const [sermonNotes, setSermonNotes] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingExistingNotes, setIsLoadingExistingNotes] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // In General, userSermonNotes comes from db, editUserSermonNotes comes from localStorage
  const [userSermonNotes, setUserSermonNotes] = useState();
  const [htmlUserSermonNotes, setHtmlUserNotes] = useState();
  const [editUserSermonNotes, setEditUserSermonNotes] = useState();
  const [pinActions, setPinActions] = useState(false);
  const [actionsRight, setActionsRight] = useState(16);
  const [actionsHeight, setActionsHeight] = useState(40);
  const actionsWrapperRef = useRef(null);
  const actionsRef = useRef(null);
  const toast = useToast();

  const todayId = DateTime.fromISO(new Date().toISOString()).toFormat(
    'ddMMyyyy'
  );

  const fallbackSermonId = props && props.match && props.match.params.id;

  const sermonId =
    sermonNoteId === 'online'
      ? `sn-${todayId}-1`
      : sermonNoteId == null
      ? fallbackSermonId
      : sermonNoteId;

  const getSermonNotesParent = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data, status } = await axios.get('/api/sermon-notes-parent/get', {
        params: {
          sermonId: sermonId,
        },
      });
      if (status === 200) {
        setSermonNotes(data[0]);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }, [sermonId]);

  const getUserSermonNotes = useCallback(async () => {
    setIsLoadingExistingNotes(true);
    if (!user?.id) {
      setIsLoadingExistingNotes(false);
      return;
    }
    try {
      const { data, status } = await axios.get('/api/user-sermon-notes/get', {
        params: {
          userId: user?.id || '',
          sermonId: sermonId,
        },
      });
      if (status === 200) {
        setUserSermonNotes(data);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoadingExistingNotes(false);
  }, [user, sermonId]);

  // send update to the localstorage 1 seconds after the user stops typing
  // send update to db when user click save
  const updateUserSermonNotes = useCallback(async () => {
    if (document.activeElement) {
      document.activeElement.blur();
    }
    setIsSubmitting(true);
    if (!user?.id) {
      setIsSubmitting(false);
      return;
    }
    if (userSermonNotes) {
      try {
        const { data, status } = await axios.put(
          '/api/user-sermon-notes/update',
          {
            userId: user?.id || '',
            sermonId: sermonId,
            editedContent: editUserSermonNotes,
          }
        );
        if (status === 200) {
          setUserSermonNotes(data);
          toast({
            title: 'Sermon Notes Saved',
            status: 'success',
            duration: 2000,
            isClosable: true,
          });
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const { data, status } = await axios.post(
          '/api/user-sermon-notes/create',
          {
            userId: user?.id || '',
            sermonId: sermonId,
            editedContent: editUserSermonNotes,
          }
        );
        if (status === 200) {
          setUserSermonNotes(data);
        }
      } catch (error) {
        console.log(error);
        getUserSermonNotes();
      }
    }
    setIsSubmitting(false);
  }, [
    user?.id,
    sermonId,
    editUserSermonNotes,
    userSermonNotes,
    getUserSermonNotes,
  ]);

  const isValidEmail = (email) => {
    const emailAddress = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailAddress.test(email);
  };

  const emailCheck = async () => {
    let email = user?.email || window.prompt('Input Email Address');
    if (!email) return;

    if (!isValidEmail(email)) {
      toast({
        title: 'Error in Email Address',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    await emailSermonNote(email);
  };

  const emailSermonNote = async (email) => {
    try {
      const { data, status } = await axios.post(
        '/api/email-user-sermon-notes',
        {
          email: email,
          sermonNoteData: preprocessUserNotesAttribute(htmlUserSermonNotes),
        }
      );
      if (status === 200) {
        toast({
          title: 'Emailed Sermon Note',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const sermonDate = useMemo(() => {
    return new Date(sermonNotes?.date).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }, [sermonNotes]);

  const preprocessUserNotesAttribute = (htmlString) => {
    if (!htmlString) return htmlString;

    return htmlString.replace(/&lt;br&gt;/g, '<br>');
  };

  useEffect(() => {
    if (sermonId) {
      getSermonNotesParent();
      getUserSermonNotes();
    }
  }, [sermonId, getSermonNotesParent, getUserSermonNotes]);

  // Float/pin action buttons; sticky won't work — ancestors use overflow auto/hidden.
  useEffect(() => {
    const handleScroll = () => {
      const wrap = actionsWrapperRef.current;
      if (!wrap) return;
      const offset =
        window.innerWidth < 768 ? window.innerHeight * 0.08 + 16 : 24;
      const rect = wrap.getBoundingClientRect();
      const nextRight = window.innerWidth - rect.right;
      const nextPin = rect.bottom <= window.innerHeight - offset;
      const nextHeight = actionsRef.current
        ? actionsRef.current.offsetHeight
        : null;
      setActionsRight((prev) => (prev === nextRight ? prev : nextRight));
      setPinActions((prev) => (prev === nextPin ? prev : nextPin));
      if (nextHeight != null) {
        setActionsHeight((prev) => (prev === nextHeight ? prev : nextHeight));
      }
    };
    handleScroll();
    // capture phase: the app scrolls inside nested overflow containers,
    // and scroll events don't bubble
    window.addEventListener('scroll', handleScroll, true);
    window.addEventListener('resize', handleScroll);
    // recompute when async content (notes, images) changes the layout
    const wrap = actionsWrapperRef.current;
    const observer =
      typeof ResizeObserver !== 'undefined' && wrap && wrap.parentElement
        ? new ResizeObserver(handleScroll)
        : null;
    if (observer) observer.observe(wrap.parentElement);
    return () => {
      window.removeEventListener('scroll', handleScroll, true);
      window.removeEventListener('resize', handleScroll);
      if (observer) observer.disconnect();
    };
    // isLoading gates the early return, so the wrapper only exists after it
    // flips; isLoadingExistingNotes swaps the notes content in
  }, [isLoading, isLoadingExistingNotes]);

  useEffect(() => {
    if (sermonId) {
      const localUserNotes = localStorage.getItem(`sermonNotes-${sermonId}`);
      if (
        localUserNotes !== 'null' &&
        localUserNotes !== 'undefined' &&
        localUserNotes
      ) {
        setEditUserSermonNotes(JSON.parse(localUserNotes));
      }
    }
  }, [sermonId]);

  useDebounce(
    () => {
      localStorage.setItem(
        `sermonNotes-${sermonId}`,
        JSON.stringify(editUserSermonNotes)
      );
    },
    0,
    [editUserSermonNotes]
  );

  const originalContentWithUserNotes = useMemo(() => {
    const isUserSermonNotesExist =
      userSermonNotes &&
      userSermonNotes.editedContent &&
      userSermonNotes.editedContent.content;
    const isEditUserSermonNotesExist =
      editUserSermonNotes && editUserSermonNotes.content;
    // We are passing the notes manually like this, in the event we need to edit the notes mid sermon.
    // User notes would still be properly refelcted
    if (isUserSermonNotesExist || isEditUserSermonNotesExist) {
      const currentUserNotes = isEditUserSermonNotesExist
        ? editUserSermonNotes
        : isUserSermonNotesExist
        ? userSermonNotes.editedContent
        : sermonNotes?.originalContent.content;
      //get All user notes inside nested object
      const userNotes =
        currentUserNotes && getAllUserSermonNotes(currentUserNotes.content);
      // parse the userNotes into the new nested object
      const updatedNotes = deepUpdateUserNotes(
        sermonNotes?.originalContent.content,
        userNotes
      );
      return { type: 'doc', content: updatedNotes };
    } else {
      return sermonNotes?.originalContent;
    }
  }, [userSermonNotes, sermonNotes?.originalContent, editUserSermonNotes]);
  if (isLoading) return <Text>Loading Sermon Notes...</Text>;

  return (
    <>
      {sermonNotes && sermonNotes.isPublished ? (
        <>
          <Container minW="100%" p="0">
            <Box
              width="100%"
              minHeight="30vh"
              height="auto"
              style={{
                backgroundImage: `url(${sermonNotes.imageLink})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            >
              <Box
                width="100%"
                height="100%"
                minHeight="30vh"
                display="flex"
                alignItems="center"
                justifyContent="center"
                padding="16px"
                backgroundColor="rgba(0, 0, 0, 0.5)"
              >
                <VStack height="100%" justifyContent="center" spacing={4}>
                  <Text
                    color="white"
                    fontWeight={700}
                    fontSize={[24, 40]}
                    textAlign="center"
                  >
                    {sermonNotes.title}
                  </Text>
                  <Text
                    color="white"
                    fontSize={[14, 22]}
                    textAlign="center"
                  >{`By ${sermonNotes.speaker}, ${sermonDate}`}</Text>
                </VStack>
              </Box>
            </Box>

            <Container my={[4, 8]} width="100%">
              <Text
                fontStyle="italic"
                textColor="#B2BEB5"
                display={!user?.id ? 'block' : 'none'}
                mb="3"
              >
                Please log into your HMCC account to get the save notes feature.
              </Text>

              {isLoadingExistingNotes ? (
                <Text>Loading</Text>
              ) : (
                <Container>
                  <TiptapOutput
                    input={originalContentWithUserNotes}
                    textPassage={sermonNotes.passage}
                    setUserSermonNotes={setEditUserSermonNotes}
                    setHtmlUserNotes={setHtmlUserNotes}
                  />
                </Container>
              )}

              <Box
                ref={actionsWrapperRef}
                position="relative"
                w="100%"
                mt={4}
                h={`${actionsHeight}px`}
              >
                <HStack
                  ref={actionsRef}
                  spacing={2}
                  zIndex={10}
                  pointerEvents="none"
                  position={pinActions ? 'absolute' : 'fixed'}
                  bottom={
                    pinActions ? 0 : { base: 'calc(8vh + 16px)', md: '24px' }
                  }
                  right={pinActions ? 0 : `${actionsRight}px`}
                >
                  {user?.id && (
                    <Button
                      isLoading={isSubmitting}
                      bgColor={ACTION_BTN_BG}
                      color="white"
                      borderRadius={20}
                      px={5}
                      boxShadow="md"
                      leftIcon={<Icon as={MdSave} />}
                      aria-label="Save Notes"
                      pointerEvents="auto"
                      _hover={{ bgColor: ACTION_BTN_HOVER }}
                      onClick={updateUserSermonNotes}
                    >
                      SAVE
                    </Button>
                  )}
                  <Button
                    isLoading={isSubmitting}
                    bgColor={ACTION_BTN_BG}
                    color="white"
                    borderRadius={20}
                    px={3}
                    boxShadow="md"
                    aria-label="Email"
                    pointerEvents="auto"
                    _hover={{ bgColor: ACTION_BTN_HOVER }}
                    onClick={emailCheck}
                  >
                    <Icon as={FaPaperPlane} />
                  </Button>
                </HStack>
              </Box>
            </Container>
          </Container>
        </>
      ) : (
        <Box p={[2, 4]}>
          <Text>Sermon Notes not available.</Text>
        </Box>
      )}
    </>
  );
};

export default SermonNotesContainer;
