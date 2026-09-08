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
const GUEST_HINT_TEXT = '#B2BEB5';

const SermonNotesContainer = (props) => {
  const { user, sermonNoteId } = props;
  const [sermonNotes, setSermonNotes] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingExistingNotes, setIsLoadingExistingNotes] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEmailing, setIsEmailing] = useState(false);
  // In General, userSermonNotes comes from db, editUserSermonNotes comes from localStorage
  const [userSermonNotes, setUserSermonNotes] = useState();
  const [editUserSermonNotes, setEditUserSermonNotes] = useState();
  // TipTap exposes getHTML() via this ref; Email reads it at click time (not mirrored state).
  const tipTapRef = useRef(null);
  const toast = useToast();

  const todayId = DateTime.fromISO(new Date().toISOString()).toFormat(
    'ddMMyyyy'
  );

  const fallbackSermonId = props && props.match && props.match.params.id;

  let sermonId;
  if (sermonNoteId === 'online') {
    sermonId = `sn-${todayId}-1`;
  } else if (sermonNoteId == null) {
    sermonId = fallbackSermonId;
  } else {
    sermonId = sermonNoteId;
  }

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
    if (isSubmitting) return;
    if (document.activeElement) {
      document.activeElement.blur();
    }
    if (!user?.id) return;
    setIsSubmitting(true);
    try {
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
    } finally {
      setIsSubmitting(false);
    }
  }, [
    isSubmitting,
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
    // Snapshot TipTap HTML now — email template needs HTML; Save uses JSON separately.
    const html = tipTapRef.current?.getHTML();
    if (!html) {
      toast({
        title: 'Notes still loading',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
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
    await emailSermonNote(email, html);
  };

  const emailSermonNote = async (email, html) => {
    if (isEmailing) return;
    setIsEmailing(true);
    try {
      const { data, status } = await axios.post(
        '/api/email-user-sermon-notes',
        {
          email: email,
          sermonNoteData: preprocessUserNotesAttribute(html),
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
    } finally {
      setIsEmailing(false);
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
    // User notes would still be properly reflected
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
                textColor={GUEST_HINT_TEXT}
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
                    ref={tipTapRef}
                    input={originalContentWithUserNotes}
                    textPassage={sermonNotes.passage}
                    setUserSermonNotes={setEditUserSermonNotes}
                  />
                </Container>
              )}

              <HStack
                position="sticky"
                bottom={{ base: '2rem', md: '1.25rem' }}
                justify="flex-end"
                spacing={2}
                mt={4}
                mb={{ base: '2rem', md: 0 }}
                zIndex={10}
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
                    _hover={{ bgColor: ACTION_BTN_HOVER }}
                    onClick={updateUserSermonNotes}
                  >
                    SAVE
                  </Button>
                )}
                <Button
                  isLoading={isEmailing}
                  isDisabled={isLoadingExistingNotes}
                  bgColor={ACTION_BTN_BG}
                  color="white"
                  borderRadius={20}
                  px={3}
                  boxShadow="md"
                  aria-label="Email"
                  _hover={{ bgColor: ACTION_BTN_HOVER }}
                  onClick={emailCheck}
                >
                  <Icon as={FaPaperPlane} />
                </Button>
              </HStack>
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
