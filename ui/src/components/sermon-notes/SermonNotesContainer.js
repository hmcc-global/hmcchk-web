import {
  Container,
  Box,
  Text,
  VStack,
  Button,
  useToast,
  HStack,
} from '@chakra-ui/react';
import { customAxios as axios } from '../helpers/customAxios';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useDebounce } from 'react-use';
import TiptapOutput from '../helpers/TipTap/TiptapOutput';
import { DateTime } from 'luxon';
import {
  getAllUserSermonNotes,
  deepUpdateUserNotes,
} from '../helpers/SermonNotes';

const SermonNotesContainer = (props) => {
  const { user, history, sermonNoteId, isOfflineSermonNote } = props;
  const [sermonNotes, setSermonNotes] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingExistingNotes, setIsLoadingExistingNotes] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // In General, userSermonNotes comes from db, editUserSermonNotes comes from localStorage
  const [userSermonNotes, setUserSermonNotes] = useState();
  const [htmlUserSermonNotes, setHtmlUserNotes] = useState();
  const [editUserSermonNotes, setEditUserSermonNotes] = useState();
  const [heightAboveTitle, setHeightAboveTitle] = useState(false);
  const toast = useToast();

  const todayId = DateTime.fromISO(new Date().toISOString()).toFormat(
    'ddMMyyyy'
  );
  const urlPath = history.location.pathname.split('/').reverse()[0];

  const sermonId = isOfflineSermonNote
    ? sermonNoteId // If offline, use the passed sermonNoteId directly
    : sermonNoteId && sermonNoteId !== '' && sermonNoteId !== 'online'
    ? sermonNoteId // Use the ID from the live page
    : sermonNoteId === 'online'
    ? `sn-${todayId}-1` // Only works when there is just one sermon note that day
    : urlPath; // Get the ID from the URL path as a fallback

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
    let email = user.email || window.prompt('Input Email Address');

    if (email && !isValidEmail(email)) {
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
          sermonNoteData: htmlUserSermonNotes,
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

  useEffect(() => {
    if (sermonId) {
      getSermonNotesParent();
      getUserSermonNotes();
    }
  }, [sermonId, getSermonNotesParent, getUserSermonNotes]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight * 0.32 < window.scrollY) {
        setHeightAboveTitle(true);
      } else {
        setHeightAboveTitle(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight * 0.32 < window.scrollY) {
        setHeightAboveTitle(true);
      } else {
        setHeightAboveTitle(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
  }, []);

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
              id="title"
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
              <Container
                mb="3"
                zIndex={3}
                pos={!user?.id ? 'relative' : 'sticky'}
              >
                <Text
                  fontStyle="italic"
                  textColor="#B2BEB5"
                  display={!user?.id ? 'block' : 'none'}
                >
                  Please log into your HMCC account to get the save notes
                  feature.
                </Text>
                <Container
                  pos={heightAboveTitle ? 'fixed' : 'relative'}
                  top={heightAboveTitle ? '10vh' : '0'}
                  display="flex"
                  flexDir="row"
                  w="100%"
                  m="auto"
                  left={0}
                  right={0}
                  justifyContent="space-around"
                  zIndex={2}
                >
                  <Button
                    display={!user?.id ? 'none' : 'sticky'}
                    width="45%"
                    isLoading={isSubmitting}
                    colorScheme="teal"
                    onClick={updateUserSermonNotes}
                    zIndex={3}
                  >
                    Save Notes
                  </Button>
                  <Button
                    pos="sticky"
                    display={!user?.id ? 'none' : 'sticky'}
                    width="45%"
                    isLoading={isSubmitting}
                    colorScheme="teal"
                    onClick={emailCheck}
                    zIndex={3}
                  >
                    Email
                  </Button>
                </Container>
              </Container>

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
