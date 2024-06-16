import { Container, Box, Text, VStack } from '@chakra-ui/react';
import { customAxios as axios } from '../helpers/customAxios';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useDebounce } from 'react-use';
import TiptapOutput from '../helpers/TipTap/TiptapOutput';

const SermonNotesContainer = (props) => {
  const { user, history, sermonNoteId } = props;
  const [sermonNotes, setSermonNotes] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [userSermonNotes, setUserSermonNotes] = useState();
  const [editUserSermonNotes, setEditUserSermonNotes] = useState();
  const sermonId =
    sermonNoteId && sermonNoteId !== ''
      ? sermonNoteId
      : history.location.pathname.split('/').reverse()[0]; // Get the id at the back of the link

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

  // send update to the userSermonNotes 5 seconds after the user stops typing
  const updateUserSermonNotes = useCallback(async () => {
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

  useDebounce(
    () => {
      setEditUserSermonNotes(editUserSermonNotes);
      updateUserSermonNotes();
    },
    5000,
    [editUserSermonNotes]
  );

  const originalContentWithUserNotes = useMemo(() => {
    //TO-DO: inject the old user notes to the updated original sermon notes properly, need to add id to the user notes attrs in tiptap
    if (
      userSermonNotes &&
      userSermonNotes.editedContent &&
      userSermonNotes.editedContent.content
    ) {
      const userNotes = userSermonNotes.editedContent.content.filter(
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
      return { type: 'doc', content: updatedNotes };
    } else {
      return sermonNotes?.originalContent;
    }
  }, [userSermonNotes, sermonNotes?.originalContent]);
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
            <TiptapOutput
              input={originalContentWithUserNotes}
              textPassage={sermonNotes.passage}
              setUserSermonNotes={setEditUserSermonNotes}
            />
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
