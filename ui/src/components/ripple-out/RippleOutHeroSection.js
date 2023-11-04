import {
  Box,
  Container,
  Flex,
  Text,
  Center,
  HStack,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  Button,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useHistory } from 'react-router-dom';

const RippleOutHeroSection = () => {
  const history = useHistory();
  const navStyle = {
    color: '#F0F0F0',
    fontFamily: 'Inter',
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: '32px' /* 177.778% */,
    textDecorationLine: 'underline',
    cursor: 'pointer',
  };
  const navDotStyle = {
    borderRadius: '20px',
    borderColor: '#F0F0F0',
    border: '3px #F0F0F0 solid',
  };

  const getCurrentPage = (path) => {
    console.log(path);
    if (path.includes('/steps')) {
      return 'THE STEPS';
    }
    if (path.includes('/space')) {
      return 'THE SPACE';
    }
    if (path.includes('/support')) {
      return 'THE SUPPORT';
    }
    if (path.includes('/progress')) {
      return 'THE PROGRESS';
    }
    return 'THE STORY';
  };

  return (
    <>
      {/* Hero section - desktop */}
      <Box
        w="full"
        h="100%"
        bgImage={`url(${process.env.PUBLIC_URL}/images/ripple-out/ripple-out-hero.png)`}
        bgSize="cover"
        bgPos={['right', 'center']}
        display={['none', 'block']}
      >
        <Container maxW={['container.xl']} h="100%">
          <Center
            h="full"
            flexDirection="column"
            justifyContent="space-between"
          >
            <HStack paddingTop="40px" />
            <Flex w="100%" flexDir="column" color="#ffffff">
              <Text
                textStyle="darker_grotesque_bold"
                fontWeight="900"
                fontSize={['4em', '8em', '8em', '14em']}
                lineHeight={['1em', '0em']}
              >
                RIPPLE OUT
              </Text>
              <Text
                textStyle="darker_grotesque"
                fontSize={['3em', '6em', '6em', '12em']}
              >
                CAMPAIGN
              </Text>
            </Flex>
            <HStack
              alignItems="center"
              w="100%"
              justifyContent="center"
              paddingBottom="20px"
              spacing={6}
            >
              <Text
                onClick={() => history.push('/ripple-out/story')}
                style={navStyle}
              >
                THE STORY
              </Text>
              <Box style={navDotStyle} />
              <Text
                onClick={() => history.push('/ripple-out/steps')}
                style={navStyle}
              >
                THE STEPS
              </Text>
              <Box style={navDotStyle} />
              <Text
                onClick={() => history.push('/ripple-out/space')}
                style={navStyle}
              >
                THE SPACE
              </Text>
              <Box style={navDotStyle} />
              <Text
                onClick={() => history.push('/ripple-out/support')}
                style={navStyle}
              >
                THE SUPPORT
              </Text>
              <Box style={navDotStyle} />
              <Text
                onClick={() => history.push('/ripple-out/progress')}
                style={navStyle}
              >
                THE PROGRESS
              </Text>
            </HStack>
          </Center>
        </Container>
      </Box>
      {/* Hero section - mobile */}
      <Box
        w="full"
        h="36%"
        bgImage={`url(${process.env.PUBLIC_URL}/images/ripple-out/ripple-out-hero-mobile.png)`}
        bgSize="cover"
        bgPos={['right', 'center']}
        display={['block', 'none']}
      >
        <Container maxW={['container.xl']} h="100%">
          <Center
            h="full"
            flexDirection="column"
            justifyContent="space-between"
          >
            <HStack paddingTop="40px" />
            <Flex w="100%" flexDir="column" color="#ffffff">
              <Text
                textStyle="darker_grotesque_bold"
                fontWeight="900"
                fontSize={['4em', '14em']}
                lineHeight={['0.25em', '0em']}
              >
                RIPPLE OUT
              </Text>
              <Text textStyle="darker_grotesque" fontSize={['3em', '12em']}>
                CAMPAIGN
              </Text>
            </Flex>
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />} mb={3}>
                {getCurrentPage(window.location.pathname)}
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => history.push('/ripple-out/story')}>
                  THE STORY
                </MenuItem>
                <MenuItem onClick={() => history.push('/ripple-out/steps')}>
                  THE STEPS
                </MenuItem>
                <MenuItem onClick={() => history.push('/ripple-out/space')}>
                  THE SPACE
                </MenuItem>
                <MenuItem onClick={() => history.push('/ripple-out/support')}>
                  THE SUPPORT
                </MenuItem>
                <MenuItem onClick={() => history.push('/ripple-out/progress')}>
                  THE PROGRESS
                </MenuItem>
              </MenuList>
            </Menu>
          </Center>
        </Container>
      </Box>
    </>
  );
};

export default RippleOutHeroSection;
