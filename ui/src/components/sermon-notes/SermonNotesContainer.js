import {
  Container,
  Box,
  Text,
  VStack,
  Button,
  useToast,
} from '@chakra-ui/react';
import { customAxios as axios } from '../helpers/customAxios';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useDebounce } from 'react-use';
import TiptapOutput from '../helpers/TipTap/TiptapOutput';
import { DateTime } from 'luxon';

const SermonNotesContainer = (props) => {
  const { user, history, sermonNoteId } = props;
  const [sermonNotes, setSermonNotes] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingExistingNotes, setIsLoadingExistingNotes] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userSermonNotes, setUserSermonNotes] = useState();
  const [editUserSermonNotes, setEditUserSermonNotes] = useState();
  const toast = useToast();

  const todayId = DateTime.fromISO(new Date().toISOString()).toFormat(
    'ddMMyyyy'
  );
  const urlPath = history.location.pathname.split('/').reverse()[0];
  const sermonId =
    sermonNoteId && sermonNoteId !== '' && sermonNoteId !== 'online'
      ? sermonNoteId // id from the live page
      : sermonNoteId === 'online'
      ? `sn-${todayId}-1` // Only works when theere is just one sermon note that day
      : urlPath; // Get the id at the back of the link

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

  const sermonDate = useMemo(() => {
    return new Date(sermonNotes?.date).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }, [sermonNotes]);

  useEffect(() => {
    getSermonNotesParent();
    getUserSermonNotes();
  }, [getSermonNotesParent, getUserSermonNotes]);

  useEffect(() => {
    const localUserNotes = localStorage.getItem(`sermonNotes-${sermonId}`);
    if (
      localUserNotes !== 'null' &&
      localUserNotes !== 'undefined' &&
      localUserNotes
    ) {
      setEditUserSermonNotes(JSON.parse(localUserNotes));
    }
  }, []);

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

    if (isUserSermonNotesExist || isEditUserSermonNotesExist) {
      const currentUserNotes = isEditUserSermonNotesExist
        ? editUserSermonNotes
        : isUserSermonNotesExist
        ? userSermonNotes.editedContent
        : sermonNotes?.originalContent.content;
      const userNotes =
        currentUserNotes &&
        currentUserNotes.content.filter(
          (content) => content.type === 'userNotes'
        );
      const updatedNotes = sermonNotes?.originalContent.content.map(
        (content) => {
          if (content.type === 'userNotes') {
            const userNote =
              userNotes &&
              userNotes.find(
                (note) =>
                  note && content && note.attrs?.id === content.attrs?.id
              );
            return userNote ? userNote : content;
          } else {
            return content;
          }
        }
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
            {isLoadingExistingNotes ? (
              <Text>Loading</Text>
            ) : (
              <TiptapOutput
                input={originalContentWithUserNotes}
                textPassage={sermonNotes.passage}
                setUserSermonNotes={setEditUserSermonNotes}
              />
            )}
            <Button
              display={!user?.id ? 'none' : 'block'}
              mt={8}
              isFullWidth
              isLoading={isSubmitting}
              colorScheme="teal"
              onClick={updateUserSermonNotes}
            >
              Save Notes
            </Button>
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
