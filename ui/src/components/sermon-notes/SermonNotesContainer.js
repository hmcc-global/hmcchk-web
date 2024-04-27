import { Container, Image } from '@chakra-ui/react';
import { customAxios as axios } from '../helpers/customAxios';
import { useState, useEffect, useCallback } from 'react';

const SermonNotesContainer = (props) => {
  const { user, history } = props;
  const [sermonNotes, setSermonNotes] = useState();
  const [userSermonNotes, setUserSermonNotes] = useState();
  const sermonId = history.location.pathname.split('/').reverse()[0]; // Get the id at the back of the link
  console.log(sermonId);
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
  console.log(sermonNotes);
  console.log(userSermonNotes);
  useEffect(() => {
    getSermonNotesParent();
    
    getUserSermonNotes();
  }, [getSermonNotesParent, getUserSermonNotes]);
  return (
    <>
      {sermonNotes ? (
        <>
          <Image
            // src={sermonNotes.imageLink}
            style={{ width: '100vw', height: '30vh' }}
          />
          <Container>{sermonNotes.originalContent}</Container>
        </>
      ) : null}
    </>
  );
};

export default SermonNotesContainer;
