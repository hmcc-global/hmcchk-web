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
  LinkBox,
  LinkOverlay,
  useDisclosure,
  HStack,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { signout } from '../../reducers/userSlice';
import { customAxios as axios } from '../helpers/customAxios';
import MainMenu from './MainMenu';
import { useHistory } from 'react-router-dom';

const NavBar = (props) => {
  const isOnlineSermon = useHistory().location.pathname.includes('online');
  const [loggedIn, setLoggedIn] = useState(false);
  const user = useSelector((state) => state.user);
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const liveScStyle = {
    border: '5px',
    backgroundColor: '#EB4335',
    color: 'white',
    fontWeight: '600',
    align: 'center',
  };

  const onLogout = () => {
    dispatch(signout());
    localStorage.clear();
    window.location.reload();
  };

  const getUserObj = async (token) => {
    const { data } = await axios.post('/api/auth/verify-token', {
      token: token,
    });
    return data;
  };

  useEffect(() => {
    const fetch = async () => {
      const userObj = await getUserObj(user);
      return userObj;
    };

    const userObj = fetch();

    if (userObj) {
      const { fullName } = userObj;
      setUsername(fullName.split(' ')[0]);
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [user]);

  let currDate = new Date().toDateString().substr(0, 3);

  return (
    <>
      <Flex background="rgba(0, 0, 0, 0.4)">
        <Flex
          width="100%"
          backgroundColor="rgba(39, 39, 39, 1)"
          backdrop-filter="blur(39px)"
          align="center"
          fontSize={{ md: 'xs', lg: 'sm', xl: 'md' }}
          h={{ md: '7vh', lg: '7vh', xl: '8vh' }}
        >
          <Container maxW="100%" padding={5}>
            <Flex
              justify="space-between"
              align="center"
              fontSize={{ md: 'x-small', lg: 'smaller', xl: 'small' }}
              h={{ base: '5vh', md: '7vh', lg: '7vh', xl: '8.5vh' }}
            >
              <HStack spacing={5}>
                <LinkBox>
                  <LinkOverlay href="/">
                    <Image
                      h="3vh"
                      src={process.env.PUBLIC_URL + '/images/ripple.svg'}
                      alt="Logo of HMCC"
                    />
                  </LinkOverlay>
                </LinkBox>
                <Link href="/">
                  <Text
                    textColor="#FFFFFF"
                    fontSize={{
                      base: 'small',
                      md: 'x-small',
                      lg: 'smaller',
                      xl: 'small',
                    }}
                  >
                    Harvest Mission Community Church
                  </Text>
                </Link>
                {currDate === 'Sun' && !isOnlineSermon ? (
                  <Link href="/online" style={{ lineHeight: '0' }}>
                    <Button
                      h="6"
                      paddingLeft="2"
                      paddingRight="3"
                      style={liveScStyle}
                      lineHeight="0"
                      borderRadius="8"
                      fontSize={{
                        md: 'x-small',
                        lg: 'small',
                        xl: 'small',
                      }}
                    >
                      &bull; Live
                    </Button>
                  </Link>
                ) : null}
              </HStack>

              <Stack
                fontWeight="600"
                spacing={7}
                color="rgba(255, 255, 255, 1)"
                justify={['space-between', 'space-around']}
                align="center"
                display={{ base: 'none', md: 'flex' }}
                marginLeft="15px"
                marginRight={{ md: '15px', lg: '40px' }}
                isInline
              >
                <Box position="relative">
                  <Link href="/visit-us">VISIT</Link>
                </Box>
                <Box position="relative">
                  <Link href="/about-us">ABOUT</Link>
                </Box>
                <Box position="relative">
                  <Text
                    transform="rotate(10deg)"
                    position="fixed"
                    textColor="yellow"
                    fontSize="xx-small"
                    marginStart="10"
                    lineHeight="0"
                  >
                    I'm new!
                  </Text>
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
                    <Flex align="center" justify="space-between">
                      <LinkBox>
                        <Button
                          textAlign="center"
                          bgColor="rgba(72, 72, 72, 1)"
                          borderColor="rgba(68, 68, 68, 1)"
                          borderWidth="medium"
                          h="3.5vh"
                          marginLeft="10px"
                          px={{ md: '2', lg: '5' }}
                          py="4"
                          _hover={{ backgroundColor: 'rgba(56, 56, 56, 1)' }}
                          onClick={onLogout}
                        >
                          <LinkOverlay href="/">
                            <Text
                              fontWeight="600"
                              textColor="rgba(249, 249, 249, 1)"
                              fontSize={{
                                md: 'x-small',
                                lg: 'smaller',
                                xl: 'small',
                              }}
                            >
                              LOGOUT
                            </Text>
                          </LinkOverlay>
                        </Button>
                      </LinkBox>
                      <LinkBox>
                        <Button
                          textAlign="center"
                          bgColor="rgba(0, 88, 210, 1)"
                          borderColor="rgba(0, 88, 210, 1)"
                          borderWidth="medium"
                          h="3.5vh"
                          marginLeft="10px"
                          px={{ md: '2', lg: '5' }}
                          py="4"
                          _hover={{ backgroundColor: 'rgba(0, 60, 143, 1)' }}
                          onClick={onClose}
                        >
                          <LinkOverlay href="/profile">
                            <Text
                              fontWeight="600"
                              textColor="rgba(249, 249, 249, 1)"
                              fontSize={{
                                md: 'x-small',
                                lg: 'small',
                                xl: 'small',
                              }}
                            >
                              MY PROFILE
                            </Text>
                          </LinkOverlay>
                        </Button>
                      </LinkBox>
                    </Flex>
                  ) : (
                    <Flex align="center" justify="space-between">
                      <LinkBox>
                        <Button
                          textAlign="center"
                          bgColor="rgba(72, 72, 72, 1)"
                          borderColor="rgba(68, 68, 68, 1)"
                          borderWidth="medium"
                          h="3.5vh"
                          marginLeft="10px"
                          px={{ md: '2', lg: '5' }}
                          py="4"
                          _hover={{ backgroundColor: 'rgba(56, 56, 56, 1)' }}
                          onClick={onClose}
                        >
                          <LinkOverlay href="/signup">
                            <Text
                              fontWeight="600"
                              textColor="rgba(255, 255, 255, 1)"
                              fontSize={{
                                md: 'x-small',
                                lg: 'small',
                                xl: 'small',
                              }}
                            >
                              SIGN UP
                            </Text>
                          </LinkOverlay>
                        </Button>
                      </LinkBox>
                      <LinkBox>
                        <Button
                          textAlign="center"
                          bgColor="rgba(0, 88, 210, 1)"
                          borderColor="rgba(0, 88, 210, 1)"
                          borderWidth="medium"
                          h="3.5vh"
                          marginLeft="10px"
                          px={{ md: '2', lg: '5' }}
                          py="4"
                          _hover={{ backgroundColor: 'rgba(0, 60, 143, 1)' }}
                          onClick={{ onClose }}
                        >
                          <LinkOverlay href="/login">
                            <Text
                              fontWeight="600"
                              textColor="rgba(249, 249, 249, 1)"
                              fontSize={{
                                md: 'x-small',
                                lg: 'smaller',
                                xl: 'small',
                              }}
                            >
                              LOGIN
                            </Text>
                          </LinkOverlay>
                        </Button>
                      </LinkBox>
                    </Flex>
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

      {/* {currDate === 'Wed' && !isOnlineSermon ? (
        <Flex
          w="100vw"
          background="black"
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
      ) : null} */}
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
          backgroundColor="rgba(18, 72, 146, 1)"
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
