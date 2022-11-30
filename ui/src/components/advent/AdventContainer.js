import { React, useEffect, useState } from 'react';
import { Img, Box, Container, Flex, Spacer } from '@chakra-ui/react';
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

  let [side, setSide] = useState('right');
  const onArrowClick = () => {
    document.querySelector('#advent-container').scrollTo({
      left: side === 'right' ? 0 : 3000,
      top: 0,
      behavior: 'smooth',
    });

    setSide(side === 'right' ? 'left' : 'right');
  };

  return (
    <Container
      minW="100%"
      maxH="110vh"
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
      <Flex flexDirection="rows" w={['100%', '200%']}>
        <Box w="100%" display={{ base: 'none', lg: 'block' }}>
          <AdventLivingRoom />
        </Box>
        <Spacer />
        <AdventCalendar />
        {side === 'right' && (
          <Box
            position="absolute"
            h="90vh"
            bg="linear-gradient(to right, rgba(0,0,0,0.5) 0%,rgba(0,0,0,0) 100%)"
            display={{ base: 'none', lg: 'block' }}
          >
            <Img
              position="relative"
              top="45%"
              src={
                process.env.PUBLIC_URL +
                '/images/advent/adventCalendar/arrow.gif'
              }
              transform={'rotateZ(90deg)'}
              width="5em"
              onClick={onArrowClick}
            />
          </Box>
        )}
        {side === 'left' && (
          <Box
            position="absolute"
            h="90vh"
            bg="linear-gradient(to left, rgba(0,0,0,0.5) 0%,rgba(0,0,0,0) 100%)"
            right="0"
            display={{ base: 'none', lg: 'block' }}
          >
            <Img
              position="relative"
              top="45%"
              src={
                process.env.PUBLIC_URL +
                '/images/advent/adventCalendar/arrow.gif'
              }
              transform={'rotateZ(-90deg)'}
              width="5em"
              onClick={onArrowClick}
            />
          </Box>
        )}{' '}
      </Flex>
    </Container>
  );
};

export default AdventContainer;
