import { React, useState, useEffect } from 'react';
import { Container } from '@chakra-ui/react';
import AdventCalendar from './AdventCalendar';
import { customAxios as axios } from '../helpers/customAxios';
import MailingListForm from '../home/MailingListForm';

const AdventContainer = (props) => {
  const [userSignedUp, setUserSignedUp] = useState(false);
  const { user } = props;

  const getMailingList = async (user) => {
    try {
      const { data } = await axios.get('/api/mailingList/get', {
        params: {
          email: user.email,
          category: 'advent',
        },
      });
      setUserSignedUp(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    props.user.email && getMailingList(props.user);
  }, []);

  return (
    <Container maxW="" m={0} p={0}>
      <AdventCalendar />
      {!userSignedUp && <MailingListForm props={user} />}
    </Container>
  );
};

export default AdventContainer;
