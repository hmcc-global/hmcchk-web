import { Container, Box, Text, VStack } from '@chakra-ui/react';
import { customAxios as axios } from '../helpers/customAxios';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useDebounce } from 'react-use';
import TiptapOutput from '../helpers/TipTap/TiptapOutput';

const SermonNotesContainer = (props) => {
  const { user, history } = props;
  const [sermonNotes, setSermonNotes] = useState();
  const [userSermonNotes, setUserSermonNotes] = useState();
  const [editUserSermonNotes, setEditUserSermonNotes] = useState();
  const sermonId = history.location.pathname.split('/').reverse()[0]; // Get the id at the back of the link

  const getSermonNotesParent = useCallback(async () => {
    try {
      const { data, status } = await axios.get('/api/sermon-notes-parent/get', {
        params: {
          sermonId: sermonId,
        },
      });
      if (status === 200) {
        setSermonNotes(data[0]);
      }
    } catch (error) {
      console.log(error);
    }
  }, [sermonId]);

  // TO-DO: check if the user logged in or not
  const getUserSermonNotes = useCallback(async () => {
    try {
      const { data, status } = await axios.get('/api/user-sermon-notes/get', {
        params: {
          userId: user.id,
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
            userId: user.id,
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
            userId: user.id,
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
    user.id,
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
    if (userSermonNotes) {
      const userNotes = userSermonNotes.editedContent.content.filter(
        (content) => content.type === 'userNotes'
      );
      const updatedNotes = sermonNotes?.originalContent.content.map(
        (content) => {
          if (content.type === 'userNotes') {
            // Find the corresponding user note, but currently theres no id attribute
            const userNote = userNotes.find((note) => note.id === content.id);
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

  return (
    <>
      {sermonNotes ? (
        <>
          <Box
            width="100vw"
            height="30vh"
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
          <Container my={[4, 8]} width="960px">
            <TiptapOutput
              input={originalContentWithUserNotes}
              textPassage={sermonNotes.passage}
              setUserSermonNotes={setEditUserSermonNotes}
            />
          </Container>
        </>
      ) : null}
    </>
  );
};

export default SermonNotesContainer;