import { Box, IconButton, Text, keyframes, Image } from '@chakra-ui/react';
import { useLocation, useHistory } from 'react-router-dom';
import livingHopeIcon from './living_hope.png';

// Pulsing animation for the button
const pulse = keyframes`
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(83, 48, 0, 0.7);
  }
  
  70% {
    transform: scale(1.05);
    box-shadow: 0 0 0 10px rgba(83, 48, 0, 0);
  }
  
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(83, 48, 0, 0);
  }
`;

// Class to organize button styling parameters
class ButtonStyles {
  static props = {
    size: 'lg',
    isRound: true,
    color: 'white',
    width: { base: '80px', md: '100px' },
    height: { base: '80px', md: '100px' },
    background:
      'linear-gradient(180deg, rgba(246, 250, 255, 0.20) 0%, rgba(255, 247.06, 225.87, 0.20) 24%, rgba(249.05, 229.52, 219.01, 0.20) 66%, rgba(246, 250, 255, 0.20) 93%)',
    animation: `${pulse} 3s infinite`,
    _hover: {
      background:
        'linear-gradient(180deg, rgba(246, 250, 255, 0.30) 0%, rgba(255, 247.06, 225.87, 0.30) 24%, rgba(249.05, 229.52, 219.01, 0.30) 66%, rgba(246, 250, 255, 0.30) 93%)',
      transform: 'scale(1.05)',
    },
    _active: {
      background:
        'linear-gradient(180deg, rgba(246, 250, 255, 0.40) 0%, rgba(255, 247.06, 225.87, 0.40) 24%, rgba(249.05, 229.52, 219.01, 0.40) 66%, rgba(246, 250, 255, 0.40) 93%)',
      transform: 'scale(0.98)',
    },
    boxShadow: '3.28px 0.55px 6.06px rgba(119, 130, 133, 0.30)',
    'aria-label': 'Go to Easter section',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
}

const FloatingEasterButton = () => {
  const location = useLocation();
  const history = useHistory();

  // Routes where the button should NOT appear
  const excludedRoutes = ['/', '/sermons/notes/', '/sn-online', '/online'];

  // Check if current path should exclude the button
  const shouldHideButton =
    location.pathname === '/' || // Homepage
    excludedRoutes
      .slice(1)
      .some(
        (route) =>
          location.pathname === route || location.pathname.startsWith(route)
      );

  // Don't render the button if we're on an excluded route
  if (shouldHideButton) {
    return null;
  }

  const handleClick = () => {
    // Navigate to home with hash to easter section
    history.push('/#easter-2026');
    // Small delay to ensure page loads before scrolling
    setTimeout(() => {
      const easterElement = document.getElementById('easter-2026');
      if (easterElement) {
        easterElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <Box
      position="fixed"
      bottom={['100px', '40px']}
      right="20px"
      zIndex={1000}
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Text
        bg="#FFF1C5"
        color="#544C45"
        fontSize="sm"
        px={2}
        py={1}
        borderRadius="md"
        mb={1}
        fontWeight="500"
        whiteSpace="nowrap"
        boxShadow="sm"
      >
        Check it out!
      </Text>
      <IconButton {...ButtonStyles.props} onClick={handleClick}>
        <Image
          src={livingHopeIcon}
          alt="Living Hope"
          width={{ base: '80px', md: '100px' }}
          height={{ base: '80px', md: '100px' }}
          ml="5px"
        />
      </IconButton>
    </Box>
  );
};

export default FloatingEasterButton;
