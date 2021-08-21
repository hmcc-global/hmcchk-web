import React, { useState, useEffect } from "react";
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
  useDisclosure,
  Img,
} from "@chakra-ui/react";
import { HashLink as Link } from 'react-router-hash-link';
import { useSelector } from "react-redux";
import { customAxios as axios } from "../helpers/customAxios";
import MainMenu from "./MainMenu";

const NavBar = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const user = useSelector((state) => state.user);
  const [username, setUsername] = useState("");
  const welcomeMsg = ["Login or Sign up", `Hi, ${username}`];
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const liveScStyle = {
    border: "5px",
    backgroundColor: "#EB4335",
    color: "white",
    fontSize: "xs",
    justify: "center",
    fontWeight: "600",
    align: "center",
  };

  const onLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const getUserObj = async (token) => {
    console.log(token);
    const { data } = await axios.post("/api/auth/verify-token", {
      token: token,
    });
    return data;
  };

  useEffect(async () => {
    const userObj = await getUserObj(user);
    if (userObj) {
      const { fullName } = userObj;
      setUsername(fullName.split(" ")[0]);
      setLoggedIn(true);
      console.log(userObj);
    } else {
      setLoggedIn(false);
    }
  }, []);

  let currDate = new Date().toDateString().substr(0, 3);

  return (
    <>
      <Flex w="100vw" background="rgba(0, 0, 0, 0.4)" justify="center">
        <Flex
          w="100vw"
          justify="space-around"
          background="linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0.5) 100%, rgba(255, 255, 255, 0.9) 100%)"
          backdrop-filter="blur(39px)"
          align="center"
          fontSize={{ md: "xs", lg: "sm", xl: "md" }}
          h="10.5vh"
        >
          <Container maxW="container.lg">
            <Flex
              justify="space-around"
              align="center"
              fontSize={{ md: "xs", lg: "sm", xl: "md" }}
              h="10.5vh"
            >
              <Box position="relative">
                <Link to="/">
                  <Image
                    h={{
                      base: "3.5vh",
                      sm: "4vh",
                      md: "4.5vh",
                      lg: "5vh",
                    }}
                    src={process.env.PUBLIC_URL + "/images/ripple_black.svg"}
                    alt="Logo of HMCC"
                  />
                </Link>
              </Box>

              <Stack
                fontWeight="600"
                spacing={10}
                color="black"
                justify="center"
                align="center"
                display={{ base: "none", md: "flex" }}
                marginLeft="40px"
                isInline
              >
                <Box position="relative">
                  <Link to="/visit-us">VISIT</Link>
                </Box>
                <Box position="relative">
                  <Link
                    to={{
                      pathname: "https://hongkong.hmcc.net/about/who-we-are/",
                    }}
                    target="_blank"
                  >
                    ABOUT
                  </Link>
                </Box>
                <Box position="relative">
                  <Link to="/connect">CONNECT</Link>
                </Box>
                <Box position="relative">
                  <Link to="/events">EVENTS</Link>
                </Box>
                <Box position="relative">
                  <Link
                    to={{ pathname: "https://hongkong.hmcc.net/sermons" }}
                    target="_blank"
                  >
                    SERMONS
                  </Link>
                </Box>
                <Box position="relative">
                  <Link
                    to={{ pathname: "https://hongkong.hmcc.net/give/" }}
                    target="_blank"
                  >
                    GIVE
                  </Link>
                </Box>
              </Stack>
              <Stack
                spacing={8}
                color="black"
                justify="right"
                align="right"
                alignItems="center"
                isInline
              >
                <Box
                  fontWeight="600"
                  color="#1A365D"
                  display={{ base: "none", md: "flex" }}
                >
                  {loggedIn ? (
                    <Menu>
                      <MenuButton>
                        <Text fontWeight="600">{welcomeMsg[1]}</Text>
                      </MenuButton>
                      <MenuList>
                        <MenuItem>
                          <Link to="/profile">View Profile</Link>
                        </MenuItem>
                        <MenuItem onClick={onLogout}>Log Out</MenuItem>
                      </MenuList>
                    </Menu>
                  ) : (
                    <Link to="/login">
                      <Text fontWeight="600">{welcomeMsg[0]}</Text>
                    </Link>
                  )}
                </Box>
                <Box>
                  <Button
                    ref={btnRef}
                    onClick={onOpen}
                    style={{ background: "none" }}
                  >
                    <Image
                      h="3vh"
                      src={process.env.PUBLIC_URL + "/images/menu.svg"}
                      alt="Menu Button"
                    />
                  </Button>
                </Box>
              </Stack>
            </Flex>
          </Container>
        </Flex>
      </Flex>

      {currDate == "Sun" ? (
        <Flex
          w="100vw"
          background="#ffffff"
          border="1px solid #E2E8F0"
          box-shadow="0px 4px 4px rgba(0, 0, 0, 0.25), 0px 1px 3px rgba(0, 0, 0, 0.1)"
          border-radius="4px"
          align="center"
          color="gray.100"
          justify="center"
          align="center"
          h="6vh"
          p={2}
        >
          <Flex w="100vw" justify="space-around">
            <Stack justify="center" align="center" isInline>
              <Center>
                <Link
                  to={{ pathname: "https://hongkong.hmcc.net/online/" }}
                  target="_blank"
                  style={{ lineHeight: "0" }}
                >
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
      <Flex>
        <Drawer
          isOpen={isOpen}
          size="full"
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent
            background="url('/images/ripple_bg.png')"
            backgroundRepeat="no-repeat"
            backgroundColor="#2c5282"
            backgroundSize="70%"
            backgroundPosition="120% 75%"
          >
            <DrawerCloseButton
              position="absolute"
              right="5%"
              top="5%"
              color="white"
            />
            <DrawerHeader />
            <DrawerBody>
              <MainMenu login={loggedIn} />
            </DrawerBody>
            <DrawerFooter fontSize="sm" color="white" justifyContent="center">
              Harvest Mission Community Church 2021
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Flex>
    </>
  );
};

export default NavBar;
