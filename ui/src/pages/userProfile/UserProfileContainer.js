import { Container, Box } from 'components';
import { Redirect } from 'react-router-dom';
import UserProfileDesktop from './UserProfileDesktop';
import UserProfileMobile from './UserProfileMobile';
import {
  DEFAULT_PROFILE_TAB,
  getProfileTabIndex,
  getProfileTabSlug,
} from './profileTabs';

const UserProfileContainer = (props) => {
  const { match, history } = props;
  const activeTabIndex = getProfileTabIndex(match?.params?.tab);

  // Covers a bare /profile, an unknown slug, and the branches of PrivateRoute
  // that render this container without a :tab param.
  if (activeTabIndex === -1) {
    return <Redirect to={`/profile/${DEFAULT_PROFILE_TAB}`} />;
  }

  const handleTabChange = (index) => {
    history.push(`/profile/${getProfileTabSlug(index)}`);
  };

  const tabProps = { activeTabIndex, onTabChange: handleTabChange };

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
        <UserProfileDesktop {...props} {...tabProps} />
      </Container>

      <Container
        maxW="container.lg"
        zIndex="2"
        position="relative"
        display={{ base: 'block', md: 'none' }}
      >
        <UserProfileMobile {...props} {...tabProps} />
      </Container>
    </Box>
  );
};

export default UserProfileContainer;
