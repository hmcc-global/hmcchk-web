import React from "react";
import { Link as HashLink } from "react-router-dom";
import {
  Flex,
  Box,
  HStack,
  Spacer,
  Button,
  ButtonGroup,
  VStack,
  Text,
  Divider,
  Center,
  Accordion,
  LinkOverlay,
  StackDivider,
  Link,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Container,
  AccordionIcon,
} from "@chakra-ui/react";
import { SocialIcon } from "react-social-icons";
//import "./removeScrollbar.css"

const MainMenu = ({ login, onClose }) => {
  const onLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const WebView = () => {
    return (
      <Container maxW="container.lg">
        <HStack display={{ base: "none", lg: "flex" }} color="white">
          <Flex marginTop="30px" minW="55%">
            <VStack alignItems="flex-start">
              <Link href="/visit-us" onClick={onClose}>
                <Text fontWeight="bold" fontSize="40px">
                  Visit
                </Text>
              </Link>
              <Link href="https://hongkong.sub.hmcc.net/online/">
                <Text fontSize="18px">Church Online</Text>
              </Link>
              <Link href="https://hongkong.sub.hmcc.net/about/who-we-are/">
                <Text fontWeight="bold" fontSize="40px">
                  About
                </Text>
              </Link>
              <Link href="https://hongkong.sub.hmcc.net/about/who-we-are/">
                <Text fontSize="18px">Who We Are</Text>
              </Link>
              <Link href="https://hongkong.sub.hmcc.net/about/beliefs/">
                <Text fontSize="18px">Beliefs</Text>
              </Link>
              <Link href="https://hongkong.sub.hmcc.net/about/who-we-are/">
                <Text fontSize="18px">Our Values</Text>
              </Link>
              <Link href="https://hongkong.sub.hmcc.net/about/beliefs/">
                <Text fontSize="18px">Statement of Faith</Text>
              </Link>
              <Link href="https://hongkong.sub.hmcc.net/about/bold-vision/">
                <Text fontSize="18px">BOLD Vision</Text>
              </Link>
              <Link href="https://hongkong.sub.hmcc.net/about/hmi/">
                <Text fontSize="18px">Harvest Mission International</Text>
              </Link>
            </VStack>
            <Spacer />
            <VStack alignItems="flex-start" left={{ md: "10%", xl: "20%" }}>
              <Link href="/connect" onClick={onClose}>
                <Text fontWeight="bold" fontSize="40px">
                  Connect
                </Text>
              </Link>
              <HashLink
                to={{ pathname: "/connect", hash: "#ministries" }}
                onClick={onClose}
              >
                <Text fontSize="18px">Ministries</Text>
              </HashLink>
              <HashLink
                to={{ pathname: "/connect", hash: "#lifegroup" }}
                onClick={onClose}
              >
                <Text fontSize="18px">LIFE Groups</Text>
              </HashLink>
              <Link href="/events" onClick={onClose}>
                <Text fontWeight="bold" fontSize="40px">
                  Events
                </Text>
              </Link>
              <HashLink
                to={{ pathname: "/events", hash: "#sundayCelebration" }}
                onClick={onClose}
              >
                <Text fontSize="18px">Upcoming Sunday Celebration</Text>
              </HashLink>
              <HashLink
                to={{ pathname: "/events", hash: "#churchActivities" }}
                onClick={onClose}
              >
                <Text fontSize="18px">Church-wide Activities</Text>
              </HashLink>
              <HashLink
                to={{ pathname: "/events", hash: "#classes" }}
                onClick={onClose}
              >
                <Text fontSize="18px">Upcoming Classes</Text>
              </HashLink>
              <Link href="https://hongkong.sub.hmcc.net/sermons/">
                <Text fontWeight="bold" fontSize="40px">
                  Sermons
                </Text>
              </Link>
              <Link href="https://hongkong.sub.hmcc.net/give/">
                <Text fontWeight="bold" fontSize="40px">
                  Give
                </Text>
              </Link>
            </VStack>
          </Flex>
          <Spacer />

          <VStack className="third-column-mainmenu" h="100%" spacing={4}>
            <Box className="sign-up-button">
              {login ? (
                <ButtonGroup
                  top="20%"
                  right="30%"
                  flexDirection="column"
                  size="md"
                  variant="outline"
                  colorScheme="black"
                  width="200px"
                >
                  <Button marginBottom="5" width="100%">
                    <LinkOverlay href="/profile" onClick={onClose}>
                      My Profile
                    </LinkOverlay>
                  </Button>
                  <Button
                    onClick={onLogout}
                    onClick={onClose}
                    marginBottom="5"
                    width="100%"
                    style={{ WebkitMarginStart: "0", marginInlineStart: "0" }}
                  >
                    <LinkOverlay href="/">Log Out</LinkOverlay>
                  </Button>
                  <Button
                    width="100%"
                    style={{ WebkitMarginStart: "0", marginInlineStart: "0" }}
                  >
                    <LinkOverlay
                      href="https://forms.gle/6jasxuLNZt5MVXAy8"
                      target="_blank"
                    >
                      Prayer Requests
                    </LinkOverlay>
                  </Button>
                </ButtonGroup>
              ) : (
                <ButtonGroup
                  flexDirection="column"
                  right="30%"
                  marginTop="20px"
                  size="md"
                  variant="outline"
                  colorScheme="black"
                  width="200px"
                >
                  <Button marginBottom="5" width="100%">
                    <LinkOverlay href="/login" onClick={onClose}>
                      Login or Sign up
                    </LinkOverlay>
                  </Button>
                  <Button
                    width="100%"
                    style={{ WebkitMarginStart: "0", marginInlineStart: "0" }}
                  >
                    <LinkOverlay
                      href="https://forms.gle/6jasxuLNZt5MVXAy8"
                      target="_blank"
                    >
                      Prayer Requests
                    </LinkOverlay>
                  </Button>
                </ButtonGroup>
              )}
            </Box>
            <Divider w="0" />
            <Box className="other-links">
              <VStack alignItems="center" fontSize="sm">
                <Link href="https://annarbor.hmcc.net/" target="_blank">
                  Ann Arbor
                </Link>
                <Link href="https://austin.hmcc.net/" target="_blank">
                  Austin
                </Link>
                <Link href="https://detroit.hmcc.net/" target="_blank">
                  Detroit
                </Link>
                <Link style={{ fontWeight: "bolder" }}>HONG KONG</Link>
                <Link href="https://jakarta.hmcc.net/" target="_blank">
                  Jakarta
                </Link>
                <Link href="https://tangerang.hmcc.net/" target="_blank">
                  Tangerang
                </Link>
              </VStack>
            </Box>
            <Divider w="0" />
            <Box className="social-media" top="20%" right="10%">
              <Center h="100%" w="100%" color="white">
                <SocialIcon
                  bgColor="transparent"
                  fgColor="#ffffff"
                  size="50%"
                  url="https://www.youtube.com/channel/UC1O1T7RaKWTGHd7R_0KMZ8Q"
                  target="_blank"
                />
                <SocialIcon
                  bgColor="transparent"
                  fgColor="#ffffff"
                  url="https://www.instagram.com/hmcc_hk/?hl=en"
                  target="_blank"
                />
                <SocialIcon
                  bgColor="transparent"
                  fgColor="#ffffff"
                  url="https://open.spotify.com/playlist/51XNCkc3LyRAXCtuI3Wbch"
                  target="_blank"
                />
                <SocialIcon
                  bgColor="transparent"
                  fgColor="#ffffff"
                  url="https://www.facebook.com/hmccofhk/"
                  target="_blank"
                />
                <SocialIcon
                  bgColor="transparent"
                  fgColor="#ffffff"
                  url="https://twitter.com/hmcc_hk?lang=en"
                  target="_blank"
                />
                <SocialIcon
                  bgColor="transparent"
                  fgColor="#ffffff"
                  url="https://vimeo.com/hmcchk"
                  target="_blank"
                />
              </Center>
            </Box>
          </VStack>
        </HStack>
      </Container>
    );
  };

  const MobileView = () => {
    return (
      <Container maxW="container.lg">
        <Flex direction="column" display={{ base: "flex", lg: "none" }}>
          <VStack color="white" alignItems="flex-start">
            <Flex marginTop="30px" direction="column">
              <VStack alignItems="flex-start">
                <Accordion allowMultiple>
                  <AccordionItem borderStyle="none" mb="1vh">
                    <HStack
                      flex="1"
                      textAlign="left"
                      fontWeight="bold"
                      fontSize="2xl"
                      w="50px"
                    >
                      <Link href="/visit-us" onClick={onClose}>
                        Visit
                      </Link>
                      <AccordionButton>
                        <AccordionIcon />
                      </AccordionButton>
                    </HStack>

                    <AccordionPanel pb={1} px="0">
                      <Link href="https://hongkong.sub.hmcc.net/online/">
                        Church Online
                      </Link>
                    </AccordionPanel>
                  </AccordionItem>
                  <AccordionItem borderStyle="none" mb="1vh">
                    <HStack
                      flex="1"
                      textAlign="left"
                      fontWeight="bold"
                      fontSize="2xl"
                    >
                      <Link
                        href="https://hongkong.sub.hmcc.net/about/who-we-are/"
                        onClick={onClose}
                      >
                        About
                      </Link>
                      <AccordionButton>
                        <AccordionIcon />
                      </AccordionButton>
                    </HStack>
                    <AccordionPanel pb={1} px="0">
                      <Link href="https://hongkong.sub.hmcc.net/about/who-we-are/">
                        Who We Are
                      </Link>
                    </AccordionPanel>
                    <AccordionPanel pb={1} px="0">
                      <Link href="https://hongkong.sub.hmcc.net/about/beliefs/">
                        Beliefs
                      </Link>
                    </AccordionPanel>
                    <AccordionPanel pb={1} px="0">
                      <Link href="https://hongkong.sub.hmcc.net/about/who-we-are/">
                        Our Values
                      </Link>
                    </AccordionPanel>
                    <AccordionPanel pb={1} px="0">
                      <Link href="https://hongkong.sub.hmcc.net/about/beliefs/">
                        Statement of Faith
                      </Link>
                    </AccordionPanel>
                    <AccordionPanel pb={1} px="0">
                      <Link href="https://hongkong.sub.hmcc.net/about/bold-vision/">
                        BOLD Vision
                      </Link>
                    </AccordionPanel>
                    <AccordionPanel pb={1} px="0">
                      <Link href="https://hongkong.sub.hmcc.net/about/hmi/">
                        Harvest Mission International
                      </Link>
                    </AccordionPanel>
                  </AccordionItem>
                  <AccordionItem borderStyle="none" mb="1vh">
                    <HStack
                      marginRight="5px"
                      textAlign="left"
                      fontWeight="bold"
                      fontSize="2xl"
                    >
                      <Link href="/connect" onClick={onClose}>
                        Connect
                      </Link>
                      <AccordionButton>
                        <AccordionIcon />
                      </AccordionButton>
                    </HStack>
                    <AccordionPanel pb={1} px="0">
                      <HashLink
                        to={{ pathname: "/connect", hash: "#ministries" }}
                      >
                        Ministries
                      </HashLink>
                    </AccordionPanel>
                    <AccordionPanel pb={1} px="0">
                      <HashLink
                        to={{ pathname: "/connect", hash: "#lifegroup" }}
                        onClick={onClose}
                      >
                        LIFE Groups
                      </HashLink>
                    </AccordionPanel>
                  </AccordionItem>

                  <AccordionItem borderStyle="none">
                    <AccordionButton>
                      <Box
                        flex="1"
                        textAlign="left"
                        fontWeight="bold"
                        fontSize="2xl"
                      >
                        Upcoming Sunday Celebration
                      </HashLink>
                    </AccordionPanel>
                    <AccordionPanel pb={1} px="0">
                      <HashLink
                        to={{ pathname: "/events", hash: "#churchActivities" }}
                      >
                        Church-wide Activities
                      </HashLink>
                    </AccordionPanel>
                    <AccordionPanel pb={1} px="0">
                      <HashLink to={{ pathname: "/events", hash: "#classes" }}>
                        Upcoming Classes
                      </HashLink>
                    </AccordionPanel>
                  </AccordionItem>
                  <Box
                    flex="1"
                    textAlign="left"
                    fontWeight="bold"
                    fontSize="2xl"
                  >
                    <Link href="https://hongkong.sub.hmcc.net/sermons/">
                      Sermons
                    </Link>
                  </Box>
                  <Box
                    flex="1"
                    textAlign="left"
                    fontWeight="bold"
                    fontSize="2xl"
                  >
                    <Link href="https://hongkong.sub.hmcc.net/give/">Give</Link>
                  </Box>
                </Accordion>
              </VStack>
            </Flex>
          </VStack>
          <VStack justifyContent="center" color="white" marginTop="30px">
            <Flex>
              <VStack className="third-column-mainmenu">
                <Box className="sign-up-button">
                  {login ? (
                    <ButtonGroup
                      flexDirection="column"
                      size="md"
                      variant="outline"
                      colorScheme="black"
                      width="200px"
                    >
                      <Button marginBottom="5" width="100%">
                        <Link href="/profile" onClick={onClose}>
                          My Profile
                        </Link>
                      </Button>
                      <Button
                        onClick={onLogout}
                        onClick={onClose}
                        marginBottom="5"
                        width="100%"
                        style={{
                          WebkitMarginStart: "0",
                          marginInlineStart: "0",
                        }}
                      >
                        Log Out
                      </Button>
                      <Button
                        width="100%"
                        style={{
                          WebkitMarginStart: "0",
                          marginInlineStart: "0",
                        }}
                      >
                        <Link
                          href="https://forms.gle/6jasxuLNZt5MVXAy8"
                          target="_blank"
                          onClick={onClose}
                        >
                          Prayer Requests
                        </Link>
                      </Button>
                    </ButtonGroup>
                  ) : (
                    <ButtonGroup
                      flexDirection="column"
                      size="md"
                      variant="outline"
                      colorScheme="black"
                      width="200px"
                    >
                      <Button marginBottom="5" width="100%">
                        <Link href="/login" onClick={onClose}>
                          Login or Sign up
                        </Link>
                      </Button>
                      <Button
                        width="100%"
                        style={{
                          WebkitMarginStart: "0",
                          marginInlineStart: "0",
                        }}
                      >
                        <Link
                          href="https://forms.gle/6jasxuLNZt5MVXAy8"
                          target="_blank"
                          onClick={onClose}
                        >
                          Prayer Requests
                        </Link>
                      </Button>
                    </ButtonGroup>
                  )}
                </Box>

                <Box className="other-links">
                  <Accordion allowMultiple marginTop="20px">
                    <AccordionItem borderStyle="none" mb="1vh">
                      <AccordionButton>
                        <Box
                          textAlign="center"
                          fontWeight="bold"
                          fontSize="xl"
                          marginRight="5px"
                        >
                          HONG KONG
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                      <AccordionPanel pb={4} textAlign="center">
                        <Link href="https://annarbor.hmcc.net/" target="_blank">
                          Ann Arbor
                        </Link>
                      </AccordionPanel>
                      <AccordionPanel pb={4} textAlign="center">
                        <Link href="https://austin.hmcc.net/" target="_blank">
                          Austin
                        </Link>
                      </AccordionPanel>
                      <AccordionPanel pb={4} textAlign="center">
                        <Link href="https://detroit.hmcc.net/" target="_blank">
                          Detroit
                        </Link>
                      </AccordionPanel>
                      <AccordionPanel pb={4} textAlign="center">
                        <Link href="https://jakarta.hmcc.net/" target="_blank">
                          Jakarta
                        </Link>
                      </AccordionPanel>
                      <AccordionPanel pb={4} textAlign="center">
                        Hong Kong
                      </AccordionPanel>
                      <AccordionPanel pb={4} textAlign="center">
                        <Link
                          href="https://tangerang.hmcc.net/"
                          target="_blank"
                        >
                          Tangerang
                        </Link>
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>
                </Box>
                <Box className="social-media">
                  <Center h="100%" w="100%" color="white" marginTop="10px">
                    <SocialIcon
                      bgColor="transparent"
                      fgColor="#ffffff"
                      url="https://www.youtube.com/channel/UC1O1T7RaKWTGHd7R_0KMZ8Q"
                      target="_blank"
                    />
                    <SocialIcon
                      bgColor="transparent"
                      fgColor="#ffffff"
                      url="https://www.instagram.com/hmcc_hk/?hl=en"
                      target="_blank"
                    />
                    <SocialIcon
                      bgColor="transparent"
                      fgColor="#ffffff"
                      url="https://open.spotify.com/playlist/51XNCkc3LyRAXCtuI3Wbch"
                      target="_blank"
                    />
                    <SocialIcon
                      bgColor="transparent"
                      fgColor="#ffffff"
                      url="https://www.facebook.com/hmccofhk/"
                      target="_blank"
                    />
                    <SocialIcon
                      bgColor="transparent"
                      fgColor="#ffffff"
                      url="https://twitter.com/hmcc_hk?lang=en"
                      target="_blank"
                    />
                    <SocialIcon
                      bgColor="transparent"
                      fgColor="#ffffff"
                      url="https://vimeo.com/hmcchk"
                      target="_blank"
                    />
                  </Center>
                </Box>
              </VStack>
            </Flex>
          </VStack>
        </Flex>
      </Container>
    );
  };

  return (
    <>
      <MobileView />
      <WebView />
    </>
  );
};

export default MainMenu;
