import { Container, Box } from '@chakra-ui/react';
import UserProfileDesktop from './UserProfileDesktop';
import UserProfileMobile from './UserProfileMobile';

const UserProfileContainer = (props) => {
  return (
    <Box>
      {/* Breaks footer... commenting out until fixable */}
      {/* <Image
        position="absolute"
        top="35%"
        left="0"
        w="75%"
        zIndex="0"
        src={process.env.PUBLIC_URL + '/userProfile/hmcc-ripple-white.png'}
        display={['none', 'block']}
      /> */}
      <Container
        maxW="container.lg"
        zIndex="2"
        position="relative"
        display={{ base: 'none', md: 'block' }}
      >
        <UserProfileDesktop {...props} />
      </Container>

      <Container
        maxW="container.lg"
        zIndex="2"
        position="relative"
        display={{ base: 'block', md: 'none' }}
      >
        <UserProfileMobile {...props} />
      </Container>
    </Box>
  );
};

export default UserProfileContainer;
