import React from 'react';
import { Flex, VStack, Text, Link, Container, Image, Icon } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { signout } from '../../reducers/userSlice';
import { LuChevronRight } from 'react-icons/lu';

const MainMenu = ({ login, onClose }) => {
  const onLogout = () => {
    onClose();
    dispatch(signout());
    localStorage.clear();
    window.location.reload();
  };

  const dispatch = useDispatch();

  const MobileView = () => {
    return (
      <Container maxW="container.lg" fontFamily="Manrope" pt="8%">
        <VStack
          gap="7"
          color="white"
          alignItems="flex-start"
          pt="10%"
          fontWeight="bold"
          fontSize="xl"
        >
          <Image
            w="3.5em"
            src={process.env.PUBLIC_URL + '/images/ripple.svg'}
            alt="Logo of HMCC"
          />

          <Flex direction="column" w="100%">
            <VStack>
              <Link
                href="/"
                onClick={onClose}
                id="menu-home"
                w="100%"
                bgColor="#4465D6"
                borderRadius="full"
                textDecoration="none !important"
              >
                <Flex
                  dir="row"
                  justifyContent="space-between"
                  align="center"
                  px="0.65em"
                  py="1"
                >
                  <Text>Home</Text>
                  <Icon boxSize={6} asChild><LuChevronRight /></Icon>
                </Flex>
              </Link>

              <Link
                href="/about-us"
                onClick={onClose}
                id="menu-about"
                w="100%"
                bgColor="#4465D6"
                borderRadius="full"
                textDecoration="none !important"
              >
                <Flex
                  dir="row"
                  justifyContent="space-between"
                  align="center"
                  px="0.65em"
                  py="1"
                >
                  <Text>About</Text>
                  <Icon boxSize={6} asChild><LuChevronRight /></Icon>
                </Flex>
              </Link>
              <Link
                href="/discover"
                onClick={onClose}
                id="menu-connect"
                w="100%"
                bgColor="#4465D6"
                borderRadius="full"
                textDecoration="none !important"
              >
                <Flex
                  dir="row"
                  justifyContent="space-between"
                  align="center"
                  px="0.65em"
                  py="1"
                >
                  <Text>Discover</Text>
                  <Icon boxSize={6} asChild><LuChevronRight /></Icon>
                </Flex>
              </Link>
              <Link
                href="/events"
                onClick={onClose}
                id="menu-events"
                w="100%"
                bgColor="#4465D6"
                borderRadius="full"
                textDecoration="none !important"
              >
                <Flex
                  dir="row"
                  justifyContent="space-between"
                  align="center"
                  px="0.65em"
                  py="1"
                >
                  <Text>Events</Text>
                  <Icon boxSize={6} asChild><LuChevronRight /></Icon>
                </Flex>
              </Link>
              <Link
                href="/sermons"
                onClick={onClose}
                id="menu-sermons"
                w="100%"
                bgColor="#4465D6"
                borderRadius="full"
                textDecoration="none !important"
              >
                <Flex
                  dir="row"
                  justifyContent="space-between"
                  align="center"
                  px="0.65em"
                  py="1"
                >
                  <Text>Sermons</Text>
                  <Icon boxSize={6} asChild><LuChevronRight /></Icon>
                </Flex>
              </Link>
              <Link
                href="/give"
                onClick={onClose}
                id="menu-give"
                w="100%"
                bgColor="#4465D6"
                borderRadius="full"
                textDecoration="none !important"
              >
                <Flex
                  dir="row"
                  justifyContent="space-between"
                  align="center"
                  px="0.65em"
                  py="1"
                >
                  <Text>Give</Text>
                  <Icon boxSize={6} asChild><LuChevronRight /></Icon>
                </Flex>
              </Link>
            </VStack>
          </Flex>
          <Flex direction="column" w="100%">
            <VStack>
              {login && (
                <Link
                  href="/profile"
                  onClick={onClose}
                  id="menu-profile"
                  w="100%"
                  bgColor="#4465D6"
                  borderRadius="full"
                  textDecoration="none !important"
                >
                  <Flex
                    dir="row"
                    justifyContent="space-between"
                    align="center"
                    px="0.65em"
                    py="1"
                  >
                    <Text>My Profile</Text>
                    <Icon boxSize={6} asChild><LuChevronRight /></Icon>
                  </Flex>
                </Link>
              )}
              {login && (
                <Link
                  onClick={onLogout}
                  id="menu-logout"
                  w="100%"
                  bgColor="#4465D6"
                  borderRadius="full"
                  textDecoration="none !important"
                >
                  <Flex
                    dir="row"
                    justifyContent="space-between"
                    align="center"
                    px="0.65em"
                    py="1"
                  >
                    <Text>Log Out</Text>
                    <Icon boxSize={6} asChild><LuChevronRight /></Icon>
                  </Flex>
                </Link>
              )}
              {!login && (
                <Link
                  href="/login"
                  onClick={onClose}
                  id="menu-login"
                  w="100%"
                  bgColor="#4465D6"
                  borderRadius="full"
                  textDecoration="none !important"
                >
                  <Flex
                    dir="row"
                    justifyContent="space-between"
                    align="center"
                    px="0.65em"
                    py="1"
                  >
                    <Text>Login</Text>
                    <Icon boxSize={6} asChild><LuChevronRight /></Icon>
                  </Flex>
                </Link>
              )}
              {!login && (
                <Link
                  href="/signup"
                  onClick={onClose}
                  id="menu-signup"
                  w="100%"
                  bgColor="#4465D6"
                  borderRadius="full"
                  textDecoration="none !important"
                >
                  <Flex
                    dir="row"
                    justifyContent="space-between"
                    align="center"
                    px="0.65em"
                    py="1"
                  >
                    <Text>Sign Up</Text>
                    <Icon boxSize={6} asChild><LuChevronRight /></Icon>
                  </Flex>
                </Link>
              )}
            </VStack>
          </Flex>
        </VStack>
      </Container>
    );
  };

  return (
    <>
      <MobileView />
    </>
  );
};

export default MainMenu;
