import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Flex,
  Box,
  HStack,
  Button,
  ButtonGroup,
  VStack,
  Text,
  Center,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Container,
  AccordionIcon,
} from "@chakra-ui/react";
import { SocialIcon } from "react-social-icons";

const MainMenu = ({ login, view }, props) => {

  const onLogout = () => {
    const { history } = props;
    localStorage.clear();
    history.push("/");
  };

  const WebView = () => {
    return (
      <Container maxW="container.lg">
        <HStack display={{ base: "none", md: "flex" }} color="white">
          <Flex marginTop="30px">
            <VStack alignItems="flex-start">
              <Text fontWeight="bold" fontSize="40px">
                Visit
              </Text>
              <Link
                to={{ pathname: "https://hongkong.hmcc.net/online/" }}
                target="_blank"
              >
                <Text fontSize="18px">Church online</Text>
              </Link>
              <Text fontWeight="bold" fontSize="40px">
                About
              </Text>
              <Link
                to={{ pathname: "https://hongkong.hmcc.net/about/who-we-are/" }}
                target="_blank"
              >
                <Text fontSize="18px">Who we are</Text>
              </Link>
              <Link
                to={{ pathname: "https://hongkong.hmcc.net/about/beliefs/" }}
                target="_blank"
              >
                <Text fontSize="18px">Beliefs</Text>
              </Link>
              <Link
                to={{ pathname: "https://hongkong.hmcc.net/about/who-we-are/" }}
                target="_blank"
              >
                <Text fontSize="18px">Our values</Text>
              </Link>
              <Link
                to={{ pathname: "https://hongkong.hmcc.net/about/beliefs/" }}
                target="_blank"
              >
                <Text fontSize="18px">Statement of Faith</Text>
              </Link>
              <Link
                to={{
                  pathname: "https://hongkong.hmcc.net/about/bold-vision/",
                }}
                target="_blank"
              >
                <Text fontSize="18px">Bold Vision</Text>
              </Link>
              <Link
                to={{ pathname: "https://hongkong.hmcc.net/about/hmi/" }}
                target="_blank"
              >
                <Text fontSize="18px">Harvest Mission International</Text>
              </Link>
            </VStack>
            <VStack
              alignItems="flex-start"
              position="relative"
              left={{ md: "10%", lg: "30%", xl: "40%" }}
            >
              <Text fontWeight="bold" fontSize="40px">
                Connect
              </Text>
              <Link
                to={{
                  pathname:
                    "https://hongkong.hmcc.net/ministries/campus-ministry/",
                }}
                target="_blank"
              >
                <Text fontSize="18px">Ministries</Text>
              </Link>
              <Link
                to={{
                  pathname:
                    "https://hongkong.hmcc.net/get-involved/life-group/",
                }}
                target="_blank"
              >
                <Text fontSize="18px">LIFE Groups</Text>
              </Link>
              <Link to="/events" target="_blank">
                <Text fontWeight="bold" fontSize="40px">
                  Events
                </Text>
              </Link>
              <Link to="/sermons" target="_blank">
                <Text fontWeight="bold" fontSize="40px">
                  Sermons
                </Text>
              </Link>
              <Link
                to={{ pathname: "https://hongkong.hmcc.net/give/" }}
                target="_blank"
              >
                <Text fontWeight="bold" fontSize="40px">
                  Give
                </Text>
              </Link>
            </VStack>
          </Flex>
          <Flex position="relative" left={{ md: "10%", lg: "30%", xl: "40%" }}>
            <VStack className="third-column-mainmenu" alignItems="flex-end">
              <Box className="sign-up-button" position="relative">
                {login ? (
                  <ButtonGroup
                    position="relative"
                    top="20%"
                    right="30%"
                    flexDirection="column"
                    size="md"
                    variant="outline"
                    colorScheme="black"
                    width="200px"
                  >
                    <Button marginBottom="5" width="100%">
                      My Profile
                    </Button>
                    <Button
                      onClick={onLogout}
                      marginBottom="5"
                      width="100%"
                      style={{ WebkitMarginStart: "0", marginInlineStart: "0" }}
                    >
                      Log Out
                    </Button>
                    <Button
                      width="100%"
                      style={{ WebkitMarginStart: "0", marginInlineStart: "0" }}
                    >
                      Prayer Requests
                    </Button>
                  </ButtonGroup>
                ) : (
                  <ButtonGroup
                    flexDirection="column"
                    position="relative"
                    right="30%"
                    marginTop="20px"
                    size="md"
                    variant="outline"
                    colorScheme="black"
                    width="200px"
                  >
                    <Button marginBottom="5" width="100%">
                      Login or Sign up
                    </Button>
                    <Button width="100%" style={{ WebkitMarginStart: "0", marginInlineStart: "0" }}>Prayer Requests</Button>
                  </ButtonGroup>
                )}
              </Box>

              <Box
                className="other-links"
                position="relative"
                top="15%"
                right="43%"
              >
                <VStack alignItems="center" fontSize="sm">
                  <Link href="https://annarbor.hmcc.net/">Ann Arbor</Link>
                  <Link href="https://austin.hmcc.net/">Austin</Link>
                  <Link href="https://detroit.hmcc.net/">Detroit</Link>
                  <Link style={{ fontWeight: "bolder" }}>HONG KONG</Link>
                  <Link href="https://jakarta.hmcc.net/">Jakrta</Link>
                  <Link href="https://tangerang.hmcc.net/">Tangerang</Link>
                </VStack>
              </Box>
              <Box
                className="social-media"
                position="relative"
                top="20%"
                right="10%"
              >
                <Center h="100%" w="100%" color="white">
                  <SocialIcon
                    bgColor="transparent"
                    fgColor="#ffffff"
                    size="50%"
                    url="https://www.youtube.com/channel/UC1O1T7RaKWTGHd7R_0KMZ8Q"
                  />
                  <SocialIcon
                    bgColor="transparent"
                    fgColor="#ffffff"
                    url="https://www.instagram.com/hmcc_hk/?hl=en"
                  />
                  <SocialIcon
                    bgColor="transparent"
                    fgColor="#ffffff"
                    url="https://open.spotify.com/playlist/51XNCkc3LyRAXCtuI3Wbch"
                  />
                  <SocialIcon
                    bgColor="transparent"
                    fgColor="#ffffff"
                    url="https://www.facebook.com/hmccofhk/"
                  />
                  <SocialIcon
                    bgColor="transparent"
                    fgColor="#ffffff"
                    url="https://twitter.com/hmcc_hk?lang=en"
                  />
                  <SocialIcon
                    bgColor="transparent"
                    fgColor="#ffffff"
                    url="https://vimeo.com/hmcchk"
                  />
                </Center>
              </Box>
            </VStack>
          </Flex>
        </HStack>
      </Container>
    );
  };

  const MobileView = () => {
    return (
      <Container maxW="container.lg">
        <Flex direction="column" display={{ base: "flex", md: "none" }}>
          <VStack color="white" alignItems="flex-start">
            <Flex marginTop="30px" direction="column">
              <VStack alignItems="flex-start">
                <Accordion allowMultiple>
                  <AccordionItem borderStyle="none">
                    <AccordionButton>
                      <Box
                        textAlign="left"
                        marginRight="5px"
                        fontWeight="bold"
                        fontSize="2xl"
                      >
                        Visit
                      </Box>
                      <AccordionIcon alignItems="flex-start" />
                    </AccordionButton>
                    <AccordionPanel pb={4}>Church online</AccordionPanel>
                  </AccordionItem>
                  <AccordionItem borderStyle="none">
                    <AccordionButton>
                      <Box
                        marginRight="5px"
                        textAlign="left"
                        fontWeight="bold"
                        fontSize="2xl"
                      >
                        About
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4}>Who we are</AccordionPanel>
                    <AccordionPanel pb={4}>Beliefs</AccordionPanel>
                    <AccordionPanel pb={4}>Our values</AccordionPanel>
                    <AccordionPanel pb={4}>Statement of Faith</AccordionPanel>
                    <AccordionPanel pb={4}>Bold Vision</AccordionPanel>
                    <AccordionPanel pb={4}>
                      Harvest Mission International
                    </AccordionPanel>
                  </AccordionItem>
                  <AccordionItem borderStyle="none">
                    <AccordionButton>
                      <Box
                        marginRight="5px"
                        textAlign="left"
                        fontWeight="bold"
                        fontSize="2xl"
                      >
                        Connect
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4}>Ministries</AccordionPanel>
                    <AccordionPanel pb={4}>LIFE Groups</AccordionPanel>
                  </AccordionItem>
                  <AccordionItem borderStyle="none">
                    <AccordionButton>
                      <Box
                        flex="1"
                        textAlign="left"
                        fontWeight="bold"
                        fontSize="2xl"
                      >
                        Events
                      </Box>
                    </AccordionButton>
                  </AccordionItem>
                  <AccordionItem borderStyle="none">
                    <AccordionButton>
                      <Box
                        flex="1"
                        textAlign="left"
                        fontWeight="bold"
                        fontSize="2xl"
                      >
                        Sermons
                      </Box>
                    </AccordionButton>
                  </AccordionItem>
                  <AccordionItem borderStyle="none">
                    <AccordionButton>
                      <Box
                        flex="1"
                        textAlign="left"
                        fontWeight="bold"
                        fontSize="2xl"
                      >
                        Give
                      </Box>
                    </AccordionButton>
                  </AccordionItem>
                </Accordion>
              </VStack>
            </Flex>
          </VStack>
          <VStack justifyContent="center" color="white" marginTop="30px">
            <Flex position="relative">
              <VStack className="third-column-mainmenu">
                <Box className="sign-up-button" position="relative">
                  {login ? (
                    <ButtonGroup
                      position="relative"
                      flexDirection="column"
                      size="md"
                      variant="outline"
                      colorScheme="black"
                      width="200px"
                    >
                      <Button marginBottom="5" width="100%">
                        My Profile
                      </Button>
                      <Button onClick={onLogout} marginBottom="5" width="100%" style={{ WebkitMarginStart: "0", marginInlineStart: "0" }}>
                        Log Out
                      </Button>
                      <Button width="100%" style={{ WebkitMarginStart: "0", marginInlineStart: "0" }}>Prayer Requests</Button>
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
                        Login or Sign up
                      </Button>
                      <Button width="100%" style={{ WebkitMarginStart: "0", marginInlineStart: "0" }}>Prayer Requests</Button>
                    </ButtonGroup>
                  )}
                </Box>
                <Box className="other-links" position="relative">
                  <Accordion allowMultiple marginTop="20px">
                    <AccordionItem borderStyle="none">
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
                        Ann Arbor
                      </AccordionPanel>
                      <AccordionPanel pb={4} textAlign="center">
                        Austin
                      </AccordionPanel>
                      <AccordionPanel pb={4} textAlign="center">
                        Detroit
                      </AccordionPanel>
                      <AccordionPanel pb={4} textAlign="center">
                        Jakarta
                      </AccordionPanel>
                      <AccordionPanel pb={4} textAlign="center">
                        Hong Kong
                      </AccordionPanel>
                      <AccordionPanel pb={4} textAlign="center">
                        Tangerang
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>
                </Box>
                <Box className="social-media" position="relative">
                  <Center h="100%" w="100%" color="white" marginTop="10px">
                    <SocialIcon
                      bgColor="transparent"
                      fgColor="#ffffff"
                      url="https://www.youtube.com/channel/UC1O1T7RaKWTGHd7R_0KMZ8Q"
                    />
                    <SocialIcon
                      bgColor="transparent"
                      fgColor="#ffffff"
                      url="https://www.instagram.com/hmcc_hk/?hl=en"
                    />
                    <SocialIcon
                      bgColor="transparent"
                      fgColor="#ffffff"
                      url="https://open.spotify.com/playlist/51XNCkc3LyRAXCtuI3Wbch"
                    />
                    <SocialIcon
                      bgColor="transparent"
                      fgColor="#ffffff"
                      url="https://www.facebook.com/hmccofhk/"
                    />
                    <SocialIcon
                      bgColor="transparent"
                      fgColor="#ffffff"
                      url="https://twitter.com/hmcc_hk?lang=en"
                    />
                    <SocialIcon
                      bgColor="transparent"
                      fgColor="#ffffff"
                      url="https://vimeo.com/hmcchk"
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
