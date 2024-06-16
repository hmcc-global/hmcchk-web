import { Container, Box, Text, VStack, Button } from '@chakra-ui/react';
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

  // TO-DO: check if the user logged in or not
  const getUserSermonNotes = useCallback(async () => {
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
  }, [user, sermonId]);

  // send update to the localstorage 1 seconds after the user stops typing
  // send update to db when user click save
  const updateUserSermonNotes = useCallback(async () => {
    setIsSubmitting(true);
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
    const localUserNotes = localStorage.getItem('sermonNotes');
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
      setEditUserSermonNotes(editUserSermonNotes);
      localStorage.setItem('sermonNotes', JSON.stringify(editUserSermonNotes));
    },
    1000,
    [editUserSermonNotes]
  );

  const originalContentWithUserNotes = useMemo(() => {
    setIsLoadingExistingNotes(true);
    if (
      userSermonNotes &&
      userSermonNotes.editedContent &&
      userSermonNotes.editedContent.content
    ) {
      const currentUserNotes =
        editUserSermonNotes && editUserSermonNotes.content
          ? editUserSermonNotes.editedContent
          : userSermonNotes.editedContent;
      const userNotes = currentUserNotes.content.filter(
        (content) => content.type === 'userNotes'
      );
      const updatedNotes = sermonNotes?.originalContent.content.map(
        (content) => {
          if (content.type === 'userNotes') {
            const userNote = userNotes.find(
              (note) => note && content && note.attrs?.id === content.attrs?.id
            );
            return userNote ? userNote : content;
          } else {
            return content;
          }
        }
      );
      setIsLoadingExistingNotes(false);
      return { type: 'doc', content: updatedNotes };
    } else {
      setIsLoadingExistingNotes(false);
      return sermonNotes?.originalContent;
    }
  }, [userSermonNotes, sermonNotes?.originalContent, editUserSermonNotes]);
  if (isLoading) return <Text>Loading Sermon Notes...</Text>;
  return (
    <>
      {sermonNotes ? (
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
              <VStack height="100%" justifyContent="center">
                <Text color="white" fontWeight={700} fontSize={[24, 40]}>
                  {sermonNotes.title}
                </Text>
                <Text
                  color="white"
                  fontSize={[10, 18]}
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
