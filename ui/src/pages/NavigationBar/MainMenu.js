import React from 'react';
import { Flex, VStack, Text, Link, Container, Image } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { useDispatch } from 'react-redux';
import { signout } from '../../reducers/userSlice';

const MainMenu = ({ login, onClose }) => {
  const onLogout = () => {
    onClose();
    dispatch(signout());
    localStorage.clear();
    window.location.reload();
  };

  const dispatch = useDispatch();

  const LinkButton = ({ href, id, onClick, label, children, ...rest }) => {
    return (
      <Link
        href={href}
        onClick={onClick}
        id={id}
        display="block"
        w="100%"
        bg="#4465D6"
        borderRadius="full"
        color="white"
        py="0.2rem"
        {...rest}
      >
        <Flex
          direction="row"
          justifyContent="space-between"
          align="center"
          px="0.65em"
          py={1}
        >
          <Text>{label}</Text>
          <ChevronRightIcon
            boxSize="1.5rem"
            fontWeight="bold"
            strokeWidth={2}
          />
        </Flex>
        {children}
      </Link>
    );
  };

  const MobileView = () => {
    return (
      <Container maxW="container.lg" fontFamily="Manrope" pt="8%">
        <VStack
          gap={7}
          color="white"
          alignItems="flex-start"
          pt="10%"
          fontWeight="bold"
          fontSize="xl"
          w="100%"
        >
          <Image
            w="3.5em"
            src={process.env.PUBLIC_URL + '/images/ripple.svg'}
            alt="Logo of HMCC"
          />

          <Flex direction="column" w="100%">
            <VStack w="100%">
              <LinkButton
                href="/"
                id="menu-home"
                onClick={onClose}
                label="Home"
              />

              <LinkButton
                href="/about-us"
                id="menu-about"
                onClick={onClose}
                label="About"
              />
              <LinkButton
                href="/discover"
                id="menu-connect"
                onClick={onClose}
                label="Discover"
              />
              <LinkButton
                href="/events"
                id="menu-events"
                onClick={onClose}
                label="Events"
              />
              <LinkButton
                href="/sermons"
                id="menu-sermons"
                onClick={onClose}
                label="Sermons"
              />
              <LinkButton
                href="/give"
                id="menu-give"
                onClick={onClose}
                label="Give"
              />
            </VStack>
          </Flex>
          <Flex direction="column" w="100%">
            <VStack>
              {login && (
                <LinkButton
                  href="/profile"
                  id="menu-profile"
                  onClick={onClose}
                  label="My Profile"
                />
              )}
              {login && (
                <LinkButton
                  onClick={onLogout}
                  id="menu-logout"
                  label="Log Out"
                />
              )}
              {!login && (
                <LinkButton
                  href="/login"
                  id="menu-login"
                  onClick={onClose}
                  label="Login"
                />
              )}
              {!login && (
                <LinkButton
                  href="/signup"
                  id="menu-signup"
                  onClick={onClose}
                  label="Sign Up"
                />
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
