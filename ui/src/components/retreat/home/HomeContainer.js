import { Box, Container } from '@chakra-ui/react';
import HomeDesktop from './HomeDesktop';
import HomeMobile from './HomeMobile';

import { useState, useEffect } from 'react';
import { NextEvent } from './Schedule';

const RetreatHomeContainer = (props) => {
  const [width, setWidth] = useState(window.innerWidth);
  const [sessionText, setSessionText] = useState('');

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    setSessionText(NextEvent());
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 768;

  return (
    <Box
      minH="full"
      minW="full"
      bgImage={process.env.PUBLIC_URL + '/images/retreat/retreat.png'}
      bgSize="cover"
      bgPosition="center center"
      bgAttachment="fixed"
      justify="center"
    >
      <Container maxW={['container.lg']} minH="100vh">
        {isMobile ? (
          <HomeMobile sessionText={sessionText} userObj={props.user} />
        ) : (
          <HomeDesktop sessionText={sessionText} userObj={props.user} />
        )}
      </Container>
    </Box>
  );
};
export default RetreatHomeContainer;
