import { Container, Box } from '@chakra-ui/react';
import { customAxios as axios } from '../helpers/customAxios';
import { useState, useEffect, useCallback } from 'react';

const SermonNotesContainer = (props) => {
  const { user } = props;
  const [sermonNotes, setSermonNotes] = useState();
  const [userSermonNotes, setUserSermonNotes] = useState();
  const sermonId = 'sn-24042024-1';

  const getSermonNotesParent = useCallback(async () => {
    try {
      const { data, status } = await axios.get('/api/sermon-notes-parent/get', {
        params: {
          sermonId: sermonId,
        },
      });
      if (status === 200) {
        setSermonNotes(data);
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
        setUserSermonNotes(data);
      }
      // TO-DO: handle if the user does not have data
    } catch (error) {
      console.log(error);
    }
  }, [user]);

  useEffect(() => {
    getSermonNotesParent();
    getUserSermonNotes();
  }, [getSermonNotesParent, getUserSermonNotes]);
  console.log(sermonNotes);
  return (
    <>
      <Box />
      <Container>test</Container>
    </>
  );
};

export default SermonNotesContainer;
