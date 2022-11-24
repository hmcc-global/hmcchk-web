import { React, useState, useEffect } from 'react';
import { Container, Flex, Spacer } from '@chakra-ui/react';
import AdventCalendar from './AdventCalendar';
import AdventLivingRoom from './AdventLivingRoom';
import { customAxios as axios } from '../helpers/customAxios';
import MailingListForm from '../home/MailingListForm';
const AdventContainer = (props) => {
  useEffect(() => {
    document.querySelector('#advent-container').scrollTo(3000, 0);
  }, []);
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
    props.user.email ? getMailingList(props.user) : setUserSignedUp(false);
  }, []);

  return (
    <Container
      minW="100%"
      m={0}
      p={0}
      style={{
        overflowX: 'scroll',
        overflowY: 'hidden',
      }}
      css={{
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      }}
      id="advent-container"
    >
      {!userSignedUp && <MailingListForm props={user} />}
      <Flex flexDirection="rows" w="200%">
        <AdventLivingRoom />
        <Spacer />
        <AdventCalendar />
      </Flex>
    </Container>
  );
};

export default AdventContainer;
