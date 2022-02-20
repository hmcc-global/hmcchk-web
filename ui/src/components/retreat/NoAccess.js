import retreatTheme from './retreatTheme';
import '@fontsource/sora';
import '@fontsource/inter';
import { Box, Container } from '@chakra-ui/react';

const NoAccessRetreat = () => {
  return (
    <>
      <Container
        minH="full"
        minW="full"
        bgImage={process.env.PUBLIC_URL + '/images/retreat/retreat.png'}
        bgSize="cover"
        bgPosition="center center"
        bgAttachment="fixed"
        justify="center"
      >
        {/* <Box h="500vh">HELLO THERE</Box> */}
      </Container>
    </>
  );
};

export default NoAccessRetreat;
