import { Container, Box, Text, VStack } from '@chakra-ui/react';
import { customAxios as axios } from '../helpers/customAxios';
import { useState, useEffect, useCallback, useMemo } from 'react';
import TiptapOutput from '../helpers/TipTap/TiptapOutput';

const SermonNotesContainer = (props) => {
  const { user, history } = props;
  const [sermonNotes, setSermonNotes] = useState();
  const [userSermonNotes, setUserSermonNotes] = useState();
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
  }, []);

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
        setUserSermonNotes(data[0]);
      }
      // TO-DO: handle if the user does not have data
    } catch (error) {
      console.log(error);
    }
  }, [user]);
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
  console.log(sermonNotes);
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
          <Container>
            <TiptapOutput
              input={sermonNotes.originalContent}
              textPassage={sermonNotes.passage}
            />
          </Container>
        </>
      ) : null}
    </>
  );
};

export default SermonNotesContainer;
