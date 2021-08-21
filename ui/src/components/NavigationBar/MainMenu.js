import React, { useState } from "react";
import { HashLink as Link } from 'react-router-hash-link';
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

const MainMenu = ({ login }) => {
  const onLogout = () => {
    const { history } = props;
    localStorage.clear();
    window.location.reload();
  };

  const WebView = () => {
    return (
      <Container maxW="container.lg">
        <HStack display={{ base: "none", md: "flex" }} color="white">
          <Flex marginTop="30px">
            <VStack alignItems="flex-start">
              <Link to="/visit-us">
                <Text fontWeight="bold" fontSize="40px">
                  Visit
                </Text>
              </Link>
              <Link
                to={{ pathname: "https://hongkong.sub.hmcc.net/online/" }}
                target="_blank"
              >
                <Text fontSize="18px">Church Online</Text>
              </Link>
              <Link
                to={{ pathname: "https://hongkong.sub.hmcc.net/about/who-we-are/" }}
                target="_blank"
              >
                <Text fontWeight="bold" fontSize="40px">
                  About
                </Text>
              </Link>
              <Link
                to={{ pathname: "https://hongkong.sub.hmcc.net/about/who-we-are/" }}
                target="_blank"
              >
                <Text fontSize="18px">Who We Are</Text>
              </Link>
              <Link
                to={{ pathname: "https://hongkong.sub.hmcc.net/about/beliefs/" }}
                target="_blank"
              >
                <Text fontSize="18px">Beliefs</Text>
              </Link>
              <Link
                to={{ pathname: "https://hongkong.sub.hmcc.net/about/who-we-are/" }}
                target="_blank"
              >
                <Text fontSize="18px">Our Values</Text>
              </Link>
              <Link
                to={{ pathname: "https://hongkong.sub.hmcc.net/about/beliefs/" }}
                target="_blank"
              >
                <Text fontSize="18px">Statement of Faith</Text>
              </Link>
              <Link
                to={{
                  pathname: "https://hongkong.sub.hmcc.net/about/bold-vision/",
                }}
                target="_blank"
              >
                <Text fontSize="18px">BOLD Vision</Text>
              </Link>
              <Link
                to={{ pathname: "https://hongkong.sub.hmcc.net/about/hmi/" }}
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
              <Link to="/connect">
                <Text fontWeight="bold" fontSize="40px">
                  Connect
                </Text>
              </Link>
              <Link to="/connect#ministries">
                <Text fontSize="18px">Ministries</Text>
              </Link>
              <Link to="/connect#lifegroup">
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
                to={{ pathname: "https://hongkong.sub.hmcc.net/give/" }}
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
                      <Link to="/profile">My Profile</Link>
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
                      <Link to="/">Prayer Requests</Link>
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
                      <Link to="/login" target="_blank">
                        Login or Sign up
                      </Link>
                    </Button>
                    <Button
                      width="100%"
                      style={{ WebkitMarginStart: "0", marginInlineStart: "0" }}
                    >
                      Prayer Requests
                    </Button>
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
                  <Link
                    to={{
                      pathname: "https://annarbor.hmcc.net/",
                    }}
                    target="_blank"
                  >
                    Ann Arbor
                  </Link>
                  <Link
                    to={{
                      pathname: "https://austin.hmcc.net/",
                    }}
                    target="_blank"
                  >
                    Austin
                  </Link>
                  <Link
                    to={{
                      pathname: "https://detroit.hmcc.net/",
                    }}
                    target="_blank"
                  >
                    Detroit
                  </Link>
                  <Link style={{ fontWeight: "bolder" }}>HONG KONG</Link>
                  <Link
                    to={{
                      pathname: "https://jakarta.hmcc.net/",
                    }}
                    target="_blank"
                  >
                    Jakarta
                  </Link>
                  <Link
                    to={{
                      pathname: "https://tangerang.hmcc.net/",
                    }}
                    target="_blank"
                  >
                    Tangerang
                  </Link>
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
                    <AccordionPanel pb={4}>
                      <Link
                        to={{ pathname: "https://hongkong.sub.hmcc.net/online/" }}
                        target="_blank"
                      >
                        Church Online
                      </Link>
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
                        About
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                      <Link
                        to={{
                          pathname:
                            "https://hongkong.sub.hmcc.net/about/who-we-are/",
                        }}
                        target="_blank"
                      >
                        Who We Are
                      </Link>
                    </AccordionPanel>
                    <AccordionPanel pb={4}>
                      <Link
                        to={{
                          pathname: "https://hongkong.sub.hmcc.net/about/beliefs/",
                        }}
                        target="_blank"
                      >
                        Beliefs
                      </Link>
                    </AccordionPanel>
                    <AccordionPanel pb={4}>
                      <Link
                        to={{
                          pathname:
                            "https://hongkong.sub.hmcc.net/about/who-we-are/",
                        }}
                        target="_blank"
                      >
                        Our Values
                      </Link>
                    </AccordionPanel>
                    <AccordionPanel pb={4}>
                      <Link
                        to={{
                          pathname: "https://hongkong.sub.hmcc.net/about/beliefs/",
                        }}
                        target="_blank"
                      >
                        Statement of Faith
                      </Link>
                    </AccordionPanel>
                    <AccordionPanel pb={4}>
                      <Link
                        to={{
                          pathname:
                            "https://hongkong.sub.hmcc.net/about/bold-vision/",
                        }}
                        target="_blank"
                      >
                        BOLD Vision
                      </Link>
                    </AccordionPanel>
                    <AccordionPanel pb={4}>
                      <Link
                        to={{
                          pathname: "https://hongkong.sub.hmcc.net/about/hmi/",
                        }}
                        target="_blank"
                      >
                        Harvest Mission International
                      </Link>
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
                        <Link to="/connect">Connect</Link>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                      <Link
                        to={{
                          pathname:
                            "https://hongkong.sub.hmcc.net/ministries/campus-ministry/",
                        }}
                        target="_blank"
                      >
                        Ministries
                      </Link>
                    </AccordionPanel>
                    <AccordionPanel pb={4}>
                      <Link
                        to={{
                          pathname:
                            "https://hongkong.sub.hmcc.net/get-involved/life-group/",
                        }}
                        target="_blank"
                      >
                        LIFE Groups
                      </Link>
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
                        <Link to="/events" target="_blank">
                          Events
                        </Link>
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
                        <Link to="/sermons" target="_blank">
                          Sermons
                        </Link>
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
                        <Link
                          to={{ pathname: "https://hongkong.sub.hmcc.net/give/" }}
                          target="_blank"
                        >
                          Give
                        </Link>
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
                        <Link to="/profile">My Profile</Link>
                      </Button>
                      <Button
                        onClick={onLogout}
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
                        Prayer Requests
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
                        <Link to="/login">Login or Sign up</Link>
                      </Button>
                      <Button
                        width="100%"
                        style={{
                          WebkitMarginStart: "0",
                          marginInlineStart: "0",
                        }}
                      >
                        Prayer Requests
                      </Button>
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
                        <Link
                          to={{
                            pathname: "https://annarbor.hmcc.net/",
                          }}
                          target="_blank"
                        >
                          Ann Arbor
                        </Link>
                      </AccordionPanel>
                      <AccordionPanel pb={4} textAlign="center">
                        <Link
                          to={{
                            pathname: "https://austin.hmcc.net/",
                          }}
                          target="_blank"
                        >
                          Austin
                        </Link>
                      </AccordionPanel>
                      <AccordionPanel pb={4} textAlign="center">
                        <Link
                          to={{
                            pathname: "https://detroit.hmcc.net/",
                          }}
                          target="_blank"
                        >
                          Detroit
                        </Link>
                      </AccordionPanel>
                      <AccordionPanel pb={4} textAlign="center">
                        <Link
                          to={{
                            pathname: "https://jakarta.hmcc.net/",
                          }}
                          target="_blank"
                        >
                          Jakarta
                        </Link>
                      </AccordionPanel>
                      <AccordionPanel pb={4} textAlign="center">
                        Hong Kong
                      </AccordionPanel>
                      <AccordionPanel pb={4} textAlign="center">
                        <Link
                          to={{
                            pathname: "https://tangerang.hmcc.net/",
                          }}
                          target="_blank"
                        >
                          Tangerang
                        </Link>
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
