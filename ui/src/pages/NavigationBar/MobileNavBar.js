import React, { useState, useEffect } from 'react';
import {
  Flex,
  Stack,
  Text,
  Link,
  Icon,
  Grid,
  GridItem,
  Drawer,
  Portal,
  useDisclosure,
  CloseButton,
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
        mb="-1px"
        border="1px solid"
        borderColor="#4A6EEB"
        borderTopLeftRadius="2xl"
        borderTopRightRadius="2xl"
        position="fixed"
        bottom="0"
        zIndex="9"
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
          templateColumns={'repeat(6, 1fr)'}
          alignContent="center"
        >
          <GridItem>
            <Flex justify="center" align="center" height="100%">
              <Link href="/" id="mnb-home">
                <Stack
                  align="center"
                  direction="column"
                  gap="0.27rem"
                  color="#4A6EEB"
                >
                  <Icon
                    opacity={
                      !isOpen && location.pathname === '/' ? '1' : '0.37'
                    }
                    boxSize={5}
                  >
                    <IoMdHome />
                  </Icon>
                  <Text>Home</Text>
                </Stack>
              </Link>
            </Flex>
          </GridItem>

          <GridItem>
            <Flex justify="center" align="center" height="100%">
              <Link href="/events" id="mnb-events">
                <Stack
                  align="center"
                  direction="column"
                  gap="0.27rem"
                  color="#4A6EEB"
                >
                  <Icon
                    opacity={
                      !isOpen && location.pathname === '/events' ? '1' : '0.37'
                    }
                    boxSize={5}
                  >
                    <IoMdCalendar />
                  </Icon>

                  <Text>Events</Text>
                </Stack>
              </Link>
            </Flex>
          </GridItem>
          <GridItem>
            <Flex justify="center" align="center" height="100%">
              <Link href="/discover" id="mnb-connect">
                <Stack
                  align="center"
                  direction="column"
                  gap="0.27rem"
                  pl="2"
                  color="#4A6EEB"
                >
                  <Icon
                    opacity={
                      !isOpen && location.pathname === '/discover'
                        ? '1'
                        : '0.37'
                    }
                    boxSize={5}
                  >
                    <IoMdHeart />
                  </Icon>
                  <Text>Discover</Text>
                </Stack>
              </Link>
            </Flex>
          </GridItem>
          <GridItem>
            <Flex justify="center" align="center" height="100%">
              <Link href="/sermons" id="mnb-sermons">
                <Stack
                  align="center"
                  direction="column"
                  gap="0.27rem"
                  pl="4"
                  color="#4A6EEB"
                >
                  <Icon
                    opacity={
                      !isOpen &&
                      (location.pathname === '/sermons' ||
                        location.pathname === '/online')
                        ? '1'
                        : '0.37'
                    }
                    boxSize={5}
                  >
                    <MdOndemandVideo />
                  </Icon>
                  <Text>Sermons</Text>
                </Stack>
              </Link>
            </Flex>
          </GridItem>

          <GridItem>
            <Flex justify="center" align="center" height="100%">
              <Link href="/give" id="mnb-give">
                <Stack
                  align="center"
                  direction="column"
                  gap="0.27rem"
                  pl="4"
                  color="#4A6EEB"
                >
                  <Icon
                    opacity={
                      !isOpen && location.pathname === '/give' ? '1' : '0.37'
                    }
                    pt="0.25em"
                    boxSize={5}
                  >
                    <ImLeaf />
                  </Icon>

                  <Text>Give</Text>
                </Stack>
              </Link>
            </Flex>
          </GridItem>

          <GridItem>
            <Flex justify="center" align="center" height="100%">
              <Drawer.Root
                open={isOpen}
                onOpenChange={(details) => {
                  details.open ? onOpen() : onClose();
                }}
                finalFocusEl={() => btnRef.current}
                size="full"
                placement="bottom"
              >
                <Drawer.Trigger asChild>
                  <Stack
                    align="center"
                    direction="column"
                    gap="0.27rem"
                    color="#4A6EEB"
                    ref={btnRef}
                  >
                    <Icon opacity={isOpen ? '1' : 0.37} boxSize={5}>
                      <IoMdMore />
                    </Icon>
                    <Text>More</Text>
                  </Stack>
                </Drawer.Trigger>
                <Portal>
                  {/* <Drawer.Backdrop /> */}
                  <Drawer.Positioner>
                    <Drawer.Content
                      backgroundColor="#4A6EEB"
                      width="100%"
                      style={{ position: 'absolute' }}
                    >
                      <Drawer.CloseTrigger
                        position="absolute"
                        right="7%"
                        top="7%"
                        zIndex="10"
                      >
                        <CloseButton size="lg" color="white" />
                      </Drawer.CloseTrigger>
                      <Drawer.Body>
                        <MainMenu login={loggedIn} onClose={onClose} />
                      </Drawer.Body>
                    </Drawer.Content>
                  </Drawer.Positioner>
                </Portal>
              </Drawer.Root>
            </Flex>
          </GridItem>
        </Grid>
      </Flex>
    </>
  );
};

export default MobileNavBar;
