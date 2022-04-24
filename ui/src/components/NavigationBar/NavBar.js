import React, { useState, useEffect } from 'react';
import {
  Flex,
  Center,
  Stack,
  Box,
  Text,
  Image,
  Button,
  Menu,
  Container,
  MenuButton,
  MenuList,
  MenuItem,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Link,
  LinkOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { customAxios as axios } from '../helpers/customAxios';
import MainMenu from './MainMenu';
import { useHistory } from 'react-router-dom';
import EasterBanner from '../easter/EasterBanner';
import { DateTime } from 'luxon';

const NavBar = (props) => {
  const isOnlineSermon = useHistory().location.pathname.includes("online");
  const [loggedIn, setLoggedIn] = useState(false);
  const user = useSelector((state) => state.user);
  const [username, setUsername] = useState('');
  const welcomeMsg = ['Login or Sign up', `Hi, ${username}`];
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const liveScStyle = {
    border: '5px',
    backgroundColor: '#EB4335',
    color: 'white',
    fontSize: 'xs',
    justify: 'center',
    fontWeight: '600',
    align: 'center',
  };

  const onLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const getUserObj = async (token) => {
    const { data } = await axios.post('/api/auth/verify-token', {
      token: token,
    });
    return data;
  };

  useEffect(async () => {
    const userObj = await getUserObj(user);
    if (userObj) {
      const { fullName } = userObj;
      setUsername(fullName.split(' ')[0]);
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

  const currDate = new DateTime.local();
  const easterDateStart = DateTime.local(2022, 4, 17);
  const easterDateEnd = DateTime.local(2022, 4, 17, 23, 59, 59);
  const isEaster = currDate > easterDateStart && currDate < easterDateEnd;

  return (
    <>
      <Flex w="100vw" background="rgba(0, 0, 0, 0.4)" justify="center">
        <Flex
          w="100vw"
          justify={['space-between', 'space-around']}
          backgroundColor="white"
          backdrop-filter="blur(39px)"
          align="center"
          fontSize={{ md: 'xs', lg: 'sm', xl: 'md' }}
          h={{ md: '7vh', lg: '7vh', xl: '8.5vh' }}
        >
          <Container maxW="container.lg">
            <Flex
              justify={['space-between', 'space-around']}
              align="center"
              fontSize={{ md: 'xs', lg: 'sm', xl: 'md' }}
              h={{ md: '7vh', lg: '7vh', xl: '8.5vh' }}
            >
              <Box position="relative">
                <LinkOverlay href="/">
                  <Image
                    h={{
                      base: '3vh',
                      sm: '3vh',
                      md: '3vh',
                      lg: '5vh',
                    }}
                    src={process.env.PUBLIC_URL + '/images/ripple_black.svg'}
                    alt="Logo of HMCC"
                  />
                </LinkOverlay>
              </Box>

              <Stack
                fontWeight="600"
                spacing={10}
                color="black"
                justify="center"
                align="center"
                display={{ base: 'none', md: 'flex' }}
                marginLeft="40px"
                isInline
              >
                <Box position="relative">
                  <Link href="/visit-us">VISIT</Link>
                </Box>
                <Box position="relative">
                  <Link href="/about-us">ABOUT</Link>
                </Box>
                <Box position="relative">
                  <Link href="/connect">CONNECT</Link>
                </Box>
                <Box position="relative">
                  <Link href="/events">EVENTS</Link>
                </Box>
                <Box position="relative">
                  <Link href="/sermons">SERMONS</Link>
                </Box>
                <Box position="relative">
                  <Link href="/give">GIVE</Link>
                </Box>
              </Stack>
              <Stack
                spacing={2}
                color="black"
                justify="right"
                align="right"
                alignItems="center"
                isInline
              >
                <Box
                  fontWeight="600"
                  color="#1A365D"
                  display={{ base: 'none', md: 'flex' }}
                >
                  {loggedIn ? (
                    <Menu>
                      <MenuButton>
                        <Text marginLeft="10px" fontWeight="600">
                          {welcomeMsg[1]}
                        </Text>
                      </MenuButton>
                      <MenuList>
                        <MenuItem>
                          <Link href="/profile">View Profile</Link>
                        </MenuItem>
                        <MenuItem onClick={onLogout}>
                          <Link href="/">Log Out</Link>
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  ) : (
                    <Link href="/login">
                      <Text fontWeight="600" marginLeft="10px">
                        {welcomeMsg[0]}
                      </Text>
                    </Link>
                  )}
                </Box>
                <Box>
                  <Button
                    ref={btnRef}
                    onClick={onOpen}
                    style={{ background: 'none' }}
                  >
                    <Image
                      h="2.5vh"
                      src={process.env.PUBLIC_URL + '/images/menu.svg'}
                      alt="Menu Button"
                    />
                  </Button>
                </Box>
              </Stack>
            </Flex>
          </Container>
        </Flex>
      </Flex>

      { !isOnlineSermon && isEaster && <EasterBanner /> }
      {currDate.weekdayShort === 'Sun' && !isOnlineSermon && !isEaster ? (
        <Flex
          w="100vw"
          background="#ffffff"
          border="1px solid #E2E8F0"
          box-shadow="0px 4px 4px rgba(0, 0, 0, 0.25), 0px 1px 3px rgba(0, 0, 0, 0.1)"
          border-radius="4px"
          align="center"
          color="gray.100"
          justify="center"
          h="6vh"
          p={2}
        >
          <Flex w="100vw" justify="space-around">
            <Stack justify="center" align="center" isInline>
              <Center>
                <Link href="/online" style={{ lineHeight: '0' }}>
                  <Button
                    h="3.5vh"
                    style={liveScStyle}
                    fontSize="xs"
                    lineHeight="0"
                    w="95%"
                  >
                    WATCH SUNDAY CELEBRATION LIVE
                  </Button>
                </Link>
              </Center>
            </Stack>
          </Flex>
        </Flex>
      ) : null}
      <Drawer
        isOpen={isOpen}
        size="full"
        onClose={onClose}
        finalFocusRef={btnRef}
        placement="top"
      >
        <DrawerOverlay />
        <DrawerContent
          background="url('/images/ripple_bg.png')"
          backgroundRepeat="no-repeat"
          backgroundColor="#2c5282"
          backgroundSize="70%"
          backgroundPosition="120% 75%"
          width={{ base: '100%', md: '70%' }}
          style={{ position: 'absolute' }}
          marginLeft={{ base: 'none', md: '15%' }}
        >
          <DrawerCloseButton
            position="absolute"
            right="5%"
            top="5%"
            color="white"
          />
          <DrawerHeader />
          <DrawerBody>
            <MainMenu login={loggedIn} onClose={onClose} />
          </DrawerBody>
          <DrawerFooter fontSize="sm" color="white" justifyContent="center">
            Harvest Mission Community Church {new Date().getFullYear()}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default NavBar;
