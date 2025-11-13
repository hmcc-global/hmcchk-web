import React, { useState, useEffect } from 'react';
import {
  Flex,
  Stack,
  Box,
  Text,
  Image,
  Button,
  Container,
  Link,
  LinkBox,
  LinkOverlay,
  HStack,
  Spacer,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { signout } from '../../reducers/userSlice';
import { customAxios as axios } from '../helpers/customAxios';
import { useLocation } from 'react-router-dom';
import LiveButton from '../helpers/components/LiveButton';

const NavBar = (props) => {
  const [isLive, setIsLive] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [userObj, setUserObj] = useState();
  const location = useLocation();

  const liveScStyle = {
    border: '5px',
    backgroundColor: '#D46764',
    color: 'white',
    fontWeight: '800',
    align: 'center',
    fontFamily: 'Manrope',
    letterSpacing: '0.1px',
  };

  const onLogout = () => {
    dispatch(signout());
    localStorage.clear();
    window.location.reload();
  };

  const getUserObj = async (token) => {
    if (Object.keys(token).length === 0) return;
    try {
      const { data } = await axios.post('/api/auth/verify-token', {
        token: token,
      });
      setUserObj(data);
    } catch (err) {
      console.log(err);
    }
  };

  const checkIfLive = async () => {
    try {
      const { data } = await axios.get('/api/live-sermon/get-live-sermon');
      if (data && data[0]) {
        setIsLive(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const fetch = async () => {
      await getUserObj(user);
      await checkIfLive();
      setIsLoading(false);
    };

    fetch();
  }, [user]);

  useEffect(() => {
    if (userObj) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [userObj]);

  const [yPosition, setYPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // console.log(window.scrollY);
      setYPosition(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <Flex
        position="fixed"
        top="0"
        width="100%"
        zIndex="9"
        display={
          location.pathname.includes('/admin')
            ? ['none', 'none', 'flex']
            : 'flex'
        }
      >
        <Flex
          bg="#F6FAFF"
          width="100%"
          h="7vh"
          align="center"
          fontFamily="Manrope"
          fontSize={{ md: '0.6rem', lg: '0.75rem' }}
          color="black"
          borderBottom="1px solid"
          borderColor="#4A6EEB"
        >
          <Container maxW="100%" padding={{ base: 4, md: 1, lg: 4 }}>
            <Flex
              justify="space-between"
              align="center"
              fontSize={{ md: '0.6rem', lg: '0.75rem' }}
              h={{ md: '7vh', lg: '7vh', xl: '8.5vh' }}
              display={{ base: 'none', md: 'flex' }}
            >
              <HStack gap={5} display={{ base: 'none', md: 'flex' }}>
                <LinkBox>
                  <LinkOverlay href="/">
                    <Image
                      w="3.5em"
                      minW="3.5em"
                      src={process.env.PUBLIC_URL + '/images/ripple-black.png'}
                      alt="Logo of HMCC"
                    />
                  </LinkOverlay>
                </LinkBox>
                <Link href="/">
                  <Text
                    fontSize={{ md: '0.7rem', lg: '0.875rem' }}
                    fontWeight="700"
                  >
                    Harvest Mission Community Church
                  </Text>
                </Link>
                {isLive ? <LiveButton /> : null}
              </HStack>

              <Stack
                gap={{ md: 5, lg: 7 }}
                justify={['space-between', 'space-around']}
                align="center"
                display={{ base: 'none', md: 'flex' }}
                marginLeft="15px"
                marginRight={{ md: '15px', lg: '30px' }}
                direction="row"
              >
                <Box position="relative">
                  <Link href="/about-us" id="navbar-about" fontWeight="600">
                    ABOUT
                  </Link>
                </Box>
                <Box position="relative">
                  <Text
                    transform="rotate(10deg)"
                    position="fixed"
                    fontSize="xx-small"
                    marginStart={{ md: '8', lg: '10' }}
                    lineHeight="0"
                    color="#4A6EEB"
                    marginTop={-1}
                    fontWeight="600"
                  >
                    I'm new!
                  </Text>
                  <Link href="/discover" id="navbar-connect" fontWeight="600">
                    DISCOVER
                  </Link>
                </Box>
                <Box position="relative">
                  <Link href="/events" id="navbar-events" fontWeight="600">
                    EVENTS
                  </Link>
                </Box>
                <Box position="relative">
                  <Link href="/sermons" id="navbar-sermons" fontWeight="600">
                    SERMONS
                  </Link>
                </Box>
                <Box position="relative">
                  <Link href="/give" id="navbar-give" fontWeight="600">
                    GIVE
                  </Link>
                </Box>
              </Stack>
              <Stack
                gap={2}
                color="black"
                justify="right"
                align="right"
                alignItems="center"
                direction="row"
              >
                {!isLoading && (
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
                            bg="rgba(0, 0, 0, 0)"
                            h="3.5vh"
                            marginLeft="10px"
                            px={{ md: '3', lg: '5' }}
                            py={{ md: '3', lg: '4' }}
                            _hover={{
                              bg: '#4A6EEB',
                              color: 'white',
                            }}
                            color="#1A365D"
                            id="navbar-signup"
                            letterSpacing={1}
                            borderRadius={20}
                            onClick={onLogout}
                          >
                            <LinkOverlay href="/">
                              <Text
                                fontWeight="600"
                                fontSize={{ md: '0.6rem', lg: '0.75rem' }}
                              >
                                LOGOUT
                              </Text>
                            </LinkOverlay>
                          </Button>
                        </LinkBox>
                        <LinkBox>
                          <Button
                            textAlign="center"
                            bg="#4A6EEB"
                            color="white"
                            borderColor="#4A6EEB"
                            borderWidth="medium"
                            h="3.5vh"
                            marginLeft="10px"
                            px={{ md: '2', lg: '5' }}
                            py={{ md: '3', lg: '4' }}
                            _hover={{
                              bg: '#ffffff',
                              color: 'black',
                              borderColor: '#ffffff',
                            }}
                            borderRadius={20}
                            letterSpacing={1}
                            id="navbar-profile"
                          >
                            <LinkOverlay href="/profile" id="navbar-profile">
                              <Text
                                fontWeight="600"
                                fontSize={{ md: '0.6rem', lg: '0.75rem' }}
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
                            bg="rgba(0, 0, 0, 0)"
                            h="3.5vh"
                            marginLeft="10px"
                            px={{ md: '3', lg: '5' }}
                            py={{ md: '3', lg: '4' }}
                            _hover={{
                              bg: '#4A6EEB',
                              color: 'white',
                            }}
                            color="#1A365D"
                            id="navbar-signup"
                            letterSpacing={1}
                            borderRadius={20}
                          >
                            <LinkOverlay href="/signup" id="navbar-signup">
                              <Text
                                fontWeight="600"
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
                            bg="#4A6EEB"
                            color="white"
                            borderColor="#4A6EEB"
                            borderWidth="medium"
                            h="3.5vh"
                            marginLeft="10px"
                            px={{ md: '2', lg: '5' }}
                            py={{ md: '3', lg: '4' }}
                            _hover={{
                              bg: '#ffffff',
                              color: 'black',
                              borderColor: '#ffffff',
                            }}
                            borderRadius={20}
                            letterSpacing={1}
                            id="navbar-login"
                          >
                            <LinkOverlay href="/login" id="navbar-login">
                              <Text
                                fontWeight="600"
                                fontSize={{ md: '0.6rem', lg: '0.75rem' }}
                              >
                                LOGIN
                              </Text>
                            </LinkOverlay>
                          </Button>
                        </LinkBox>
                      </Flex>
                    )}
                  </Box>
                )}
              </Stack>
            </Flex>
            <Flex
              display={{ base: 'flex', md: 'none' }}
              justify="space-between"
              align="center"
              h="5vh"
              position="relative"
              w="100%"
            >
              <Box w="15%">
                <HStack>{isLive ? <LiveButton /> : <Spacer />}</HStack>
              </Box>
              <Box w="70%">
                <Box
                  transition="opacity 0.5s"
                  style={{
                    opacity: Math.max(1 - yPosition / 400, 0),
                  }}
                >
                  <LinkBox>
                    <LinkOverlay href="/">
                      <Text
                        color="#4A6EEB"
                        fontSize="x-small"
                        textAlign="center"
                        justifySelf="center"
                        fontWeight="bold"
                      >
                        Harvest Mission Community Church
                      </Text>
                    </LinkOverlay>
                  </LinkBox>
                </Box>
                <Box
                  transition="opacity 0.5s"
                  style={{ opacity: Math.max((yPosition - 100) / 400, 0) }}
                  position="absolute"
                  top="50%"
                  left="50%"
                  transform="translate(-50%, -50%)"
                >
                  <LinkBox>
                    <LinkOverlay href="/">
                      <Image
                        w="4em"
                        src={
                          process.env.PUBLIC_URL + '/images/ripple-black.png'
                        }
                        alt="Logo of HMCC"
                      />
                    </LinkOverlay>
                  </LinkBox>
                </Box>
              </Box>
              <Spacer w="15%" />
            </Flex>
          </Container>
        </Flex>
      </Flex>
    </>
  );
};

export default NavBar;
