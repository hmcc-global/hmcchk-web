import { React, useState, useEffect } from 'react';
import { Container, Center, Text } from '@chakra-ui/react';
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
    <Container
      maxW=""
      w="100vw"
      h="100vh"
      bg={`url('${process.env.PUBLIC_URL}/images/advent/adventad.png')`}
      bgSize="cover"
    >
      {/* <AdventCalendar /> */}
      {!userSignedUp && <MailingListForm props={user} />}
    </Container>
  );
};

export default AdventContainer;
