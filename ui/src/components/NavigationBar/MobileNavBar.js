import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Stack,
  Text,
  Link,
  Icon,
  Grid,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import MainMenu from './MainMenu';
import { IoMdHome, IoMdCalendar, IoMdHeart, IoMdMore } from 'react-icons/io';
import { ImLeaf } from 'react-icons/im';
import { MdOndemandVideo } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { customAxios as axios } from '../helpers/customAxios';
import { useLocation } from 'react-router-dom';

const MobileNavBar = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userObj, setUserObj] = useState();

  const btnRef = React.useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = useSelector((state) => state.user);

  const location = useLocation();

  const getUserObj = async (token) => {
    try {
      const { data } = await axios.post('/api/auth/verify-token', {
        token: token,
      });
      setUserObj(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const fetch = async () => {
      await getUserObj(user);
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

  return (
    <>
      <Flex
        backgroundColor="#F6FAFF"
        width="100%"
        h="8vh"
        border="1px solid"
        borderColor="#4A6EEB"
        borderTopLeftRadius="2xl"
        borderTopRightRadius="2xl"
        position="absolute"
        bottom="0"
        zIndex="9999999"
        overflow="hidden"
        align="center"
        display={{ base: 'flex', md: 'none' }}
      >
        <Grid
          w="full"
          h="5vh"
          position="relative"
          fontFamily="Manrope"
          fontSize="0.65rem"
          fontWeight="700"
          color="#4A6EEB"
          templateColumns={'repeat(6, 1fr)'}
          alignContent="center"
        >
          <Stack dir="column" spacing="0">
            <Link align="center" href="/" id="mnb-home">
              <Icon
                opacity={!isOpen && location.pathname === '/' ? '1' : '0.37'}
                boxSize={5}
                as={IoMdHome}
              />
              <Text>Home</Text>
            </Link>
          </Stack>
          <Stack dir="column" spacing="0">
            <Link align="center" href="/events" id="mnb-events">
              <Icon
                opacity={
                  !isOpen && location.pathname === '/events' ? '1' : '0.37'
                }
                boxSize={5}
                as={IoMdCalendar}
              />
              <Text>Events</Text>
            </Link>
          </Stack>
          <Stack dir="column" spacing="0" pl="2">
            <Link align="center" href="/connect" id="mnb-connect">
              <Icon
                opacity={
                  !isOpen && location.pathname === '/connect' ? '1' : '0.37'
                }
                boxSize={5}
                as={IoMdHeart}
              />
              <Text>Connect</Text>
            </Link>
          </Stack>
          <Stack dir="column" spacing="0" pl="4">
            <Link align="center" href="/sermons" id="mnb-sermons">
              <Icon
                opacity={
                  !isOpen &&
                  (location.pathname === '/sermons' ||
                    location.pathname === '/online')
                    ? '1'
                    : '0.37'
                }
                boxSize={5}
                as={MdOndemandVideo}
              />
              <Text>Sermons</Text>
            </Link>
          </Stack>
          <Stack dir="column" spacing="0" pl="4">
            <Link align="center" href="/give" id="mnb-give">
              <Icon
                opacity={
                  !isOpen && location.pathname === '/give' ? '1' : '0.37'
                }
                pt="0.25em"
                boxSize={5}
                as={ImLeaf}
              />
              <Text>Give</Text>
            </Link>
          </Stack>
          <Stack dir="column" spacing="0">
            <Box align="center" ref={btnRef} onClick={onOpen}>
              <Icon opacity={isOpen ? '1' : 0.37} boxSize={5} as={IoMdMore} />
              <Text>More</Text>
            </Box>
          </Stack>
        </Grid>
      </Flex>
      <Drawer
        isOpen={isOpen}
        size="full"
        onClose={onClose}
        finalFocusRef={btnRef}
        placement="bottom"
      >
        <DrawerOverlay />
        <DrawerContent
          backgroundColor="#4A6EEB"
          width="100%"
          style={{ position: 'absolute' }}
        >
          <DrawerCloseButton
            position="absolute"
            right="8%"
            top="4%"
            color="white"
          />
          <DrawerBody>
            <MainMenu login={loggedIn} onClose={onClose} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MobileNavBar;
