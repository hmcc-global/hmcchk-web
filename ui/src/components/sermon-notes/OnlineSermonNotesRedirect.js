import React, { useEffect, useState } from 'react';
import { customAxios as axios } from '../helpers/customAxios';
import { Spinner } from '@chakra-ui/react';
import { useHistory } from 'react-router';

const OnlineSermonNotesRedirect = () => {
  const [id, setId] = useState();
  const history = useHistory();

  const latestSermonNoteId = async () => {
    const { data } = await axios.get('/api/sermon-notes-parent/latest');
    setId(data);
  };

  useEffect(() => {
    latestSermonNoteId();
  }, []);

  useEffect(() => {
    if (id != null) {
      const onlineSermonPrefix = '/sermons/notes/online';
      const { pathname } = history.location;
      if (pathname == null || pathname !== onlineSermonPrefix) {
        history.push(`/sermons/notes/${id}`);
      } else {
        history.push(id);
      }
    }
  }, [history, id]);

  return <>{id == null ? <>Sermon Notes not available</> : <Spinner />}</>;
};

export default OnlineSermonNotesRedirect;
