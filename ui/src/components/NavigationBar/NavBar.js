import React, { useState } from "react";
import {
  Flex,
  Center,
  Stack,
  Box,
  Image,
  Button,
  Menu,
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
import { Link } from "react-router-dom";
import MainMenu from "./MainMenu";

const Navigationbar = () => {
  const [loggedIn, setLoggedIn] = useState(true);
  const username = "name";
  const welcomeMsg = ["Login or Sign up", `Hi ${username}`];
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

  const handleLogin = () => {
    //waiting for login cookie
  };

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
          <Center>
            <Box position="relative">
              <Link href="/">
                <Image
                  h={{
                    base: "3.5vh",
                    sm: "4vh",
                    md: "4.5vh",
                    lg: "5vh",
                    xl: "6vh",
                  }}
                  src={process.env.PUBLIC_URL + "/ripple_black.svg"}
                  alt="Logo of HMCC"
                />
              </Link>
            </Box>
          </Center>
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
              <Link href="/visit">
                <a>VISIT</a>
              </Link>
            </Box>
            <Box position="relative">
              <Link href="/about">
                <a>ABOUT</a>
              </Link>
            </Box>
            <Box position="relative">
              <Link href="/connect">
                <a>CONNECT</a>
              </Link>
            </Box>
            <Box position="relative">
              <Link href="/event">
                <a>EVENTS</a>
              </Link>
            </Box>
            <Box position="relative">
              <Link href="/sermon">
                <a>SERMONS</a>
              </Link>
            </Box>
            <Box position="relative">
              <Link href="/give">
                <a>GIVE</a>
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
                  <MenuButton>{welcomeMsg[1]}</MenuButton>
                  <MenuList>
                    <MenuItem href="/">View Profile</MenuItem>
                    <MenuItem href="/">Log Out</MenuItem>
                  </MenuList>
                </Menu>
              ) : (
                <Link href="/">{welcomeMsg[0]}</Link>
              )}
            </Box>
            <Box>
              <Button
                ref={btnRef}
                onClick={onOpen}
                style={{ background: "none" }}
              >
                <Image
                  h="5vh"
                  src={process.env.PUBLIC_URL + "/menu.svg"}
                  alt="Menu Button"
                />
              </Button>
            </Box>
          </Stack>
        </Flex>
      </Flex>
      {currDate == "Tue" ? (
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
                <Link href="/live" style={{ lineHeight: "0" }}>
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
      >
        <DrawerOverlay />
        <DrawerContent>
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
    </>
  );
};

export default Navigationbar;
