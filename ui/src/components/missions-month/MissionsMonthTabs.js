import {
  Box,
  Container,
  Image,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  VStack,
  Center,
  Link,
  ListItem,
  UnorderedList,
} from '@chakra-ui/react';

export default function MissionMonthTabs() {
  return (
    <Tabs isFitted="enclosed" orientation="horizontal">
      <TabList justifyContent="center">
        <Tab
          borderBottom="5px solid"
          borderBottomColor="#CAD9F4"
          fontWeight="700"
          textColor="#CAD9F4"
          line-height="108.2%"
          fontFamily="Lexend Deca"
          letterSpacing="0.1em"
          _selected={{
            borderBottom: '5px solid #325EAE',
            textColor: '#325EAE',
            fontWeight: '700',
          }}
        >
          DETAILS
        </Tab>

        <Tab
          borderBottom="5px solid"
          borderBottomColor="#CAD9F4"
          fontWeight="700"
          textColor="#CAD9F4"
          line-height="108.2%"
          fontFamily="Lexend Deca"
          letterSpacing="0.1em"
          _selected={{
            borderBottom: '5px solid #325EAE',
            textColor: '#325EAE',
            fontWeight: '700',
          }}
        >
          RESOURCES
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Container
            marginX="auto"
            marginTop={{ base: '3', md: '10' }}
            textAlign="center"
            maxW="fit-content"
            textColor="#00328D"
            fontFamily="Akshar"
            fontWeight={('black', 'extrabold')}
            fontSize={{ base: '5vw', md: '4vw', lg: '2.5vw' }}
            letterSpacing="0.2em"
          >
            OVERVIEW OF THE MONTH
            <VStack alignItems="start" marginTop="5">
              <Box
                borderColor="#FFDFD3"
                bgColor="#FFDFD3"
                w="100%"
                display="flex"
                borderRadius="16"
              >
                <Box
                  marginY="2"
                  marginLeft="2"
                  marginRight={{ base: '3', md: '9' }}
                  py={{ base: '1', md: '3' }}
                  px={{ base: '6', md: '10' }}
                  borderRadius={{ base: '8.6', md: '16' }}
                  bgColor="#FFFFFF"
                  fontSize={{
                    base: '4vw',
                    md: '2vw',
                    lg: '1.5vw',
                  }}
                  letterSpacing="0.1em"
                  whiteSpace="pre"
                >
                  Friday <br /> Nov 4{'  '}
                </Box>
                <VStack spacing="0" alignItems="start" marginY="auto">
                  <Box
                    fontSize={{
                      base: '4vw',
                      md: '2.4vw',
                      lg: '2vw',
                      xl: '1.8vw',
                    }}
                    letterSpacing="0.1em"
                  >
                    ENCOUNTER
                  </Box>
                  <Box
                    fontSize={{
                      base: '2.5vw',
                      md: '1.5vw',
                      lg: '1.5vw',
                      xl: '1.4vw',
                    }}
                    textColor="#000000"
                    letterSpacing="0.1em"
                    paddingRight="7"
                  >
                    Guest speaker Dr.Andrew Loke
                  </Box>
                </VStack>
              </Box>
              <Box
                borderColor="#FFDFD3"
                bgColor="#FFDFD3"
                w="100%"
                display="flex"
                borderRadius="16"
              >
                <Box
                  marginY="2"
                  marginLeft="2"
                  marginRight={{ base: '3', md: '9' }}
                  py={{ base: '1', md: '3' }}
                  px={{ base: '6', md: '10' }}
                  borderRadius={{ base: '8.6', md: '16' }}
                  bgColor="#FFFFFF"
                  fontSize={{ base: '4vw', md: '2vw', lg: '1.5vw' }}
                  letterSpacing="0.1em"
                >
                  EVERY <br /> SUNDAY
                </Box>
                <Box
                  fontSize={{
                    base: '4vw',
                    md: '2.4vw',
                    lg: '2vw',
                    xl: '1.8vw',
                  }}
                  marginY="auto"
                  textAlign="start"
                  letterSpacing={{ base: '0', md: '0.09em' }}
                  marginRight="10"
                >
                  MISSIONS MONTH <br />
                  SUNDAY CELEBRATION
                </Box>
              </Box>
              <Box
                borderColor="#FFDFD3"
                bgColor="#FFDFD3"
                w="100%"
                display="flex"
                borderRadius="16"
              >
                <Box
                  marginY="2"
                  marginLeft="2"
                  marginRight={{ base: '3', md: '9' }}
                  py={{ base: '1', md: '3' }}
                  px={{ base: '6', md: '10' }}
                  borderRadius={{ base: '8.6', md: '16' }}
                  bgColor="#FFFFFF"
                  fontSize={{ base: '4vw', md: '2vw', lg: '1.5vw' }}
                  letterSpacing="0.1em"
                >
                  Tuesday <br /> Nov 29
                </Box>
                <Box
                  fontSize={{
                    base: '4vw',
                    md: '2.4vw',
                    lg: '2vw',
                    xl: '1.8vw',
                  }}
                  marginY="auto"
                  textAlign="start"
                  letterSpacing="0.09em"
                  marginRight="10"
                >
                  GIVING TUESDAY
                </Box>
              </Box>
            </VStack>
          </Container>
          {/* <Container
            marginTop="10"
            minW={{ md: '80%', xl: '60%' }}
            marginBottom="10rem"
            display={{ base: 'none', md: 'flex' }}
            flexDirection="row"
          >
            <Image
              width={{ md: '35%', xl: '30%' }}
              height={{ md: 'auto', xl: '30%' }}
              src={process.env.PUBLIC_URL + 'images/mission_month.png'}
              marginRight="5"
            />
            <VStack alignItems="start" fontWeight="700" fontFamily="Akshar">
              <Box
                marginTop="3"
                textColor="#434347"
                fontSize={{ md: '2.5vw', xl: '2vw' }}
                letterSpacing="0.1em"
                lineHeight="0.2"
              >
                Guest Speaker
              </Box>
              <Box
                textColor="#434347"
                fontSize={{ md: '3.5vw', xl: '3vw' }}
                letterSpacing="0.1em"
              >
                Dr. Andrew Loke
              </Box>
              <Box
                fontSize={{ md: '1.5vw', xl: '1vw' }}
                letterSpacing="0"
                lineHeight="1.8"
                fontWeight="400"
                fontFamily="Lexend Deca"
                textColor="#000000"
              >
                <UnorderedList>
                  <ListItem>
                    Associate Professor in the Department of Religion and
                    Philosophy at Hong Kong Baptist University
                  </ListItem>
                  <ListItem>
                    Worked as a medical doctor for 7 years before completing a
                    Ph.D. in Theology
                  </ListItem>
                  <ListItem>
                    Published multiple books and articles in the fields of
                    theology, philosophy of religion, and science and religion
                  </ListItem>
                </UnorderedList>
              </Box>
            </VStack>
          </Container> */}
          <Container
            marginTop="10"
            marginBottom="10rem"
            display="flex"
            flexDir="column"
            alignItems="center"
            fontFamily="Akshar"
            letterSpacing="0.2em"
            fontWeight="700"
            minW="40%"
          >
            <Box
              textColor="#434347"
              fontSize={{ base: '5.5vw', sm: '4vw', md: '3vw', xl: '2vw' }}
              letterSpacing="0.1em"
              lineHeight="3"
            >
              Guest Speaker
            </Box>
            <Box
              textColor="#434347"
              fontSize={{ base: '8vw', sm: '5vw', md: '4vw', xl: '3.5vw' }}
            >
              Dr. Andrew Loke
            </Box>
            <Image
              w="50%"
              src={process.env.PUBLIC_URL + 'images/mission_month.png'}
              marginBottom="4"
            />
            <Box
              fontSize={{ base: '3.5vw', md: '1.5vw', xl: '1vw' }}
              letterSpacing="0"
              fontWeight="400"
              fontFamily="Lexend Deca"
              textColor="#000000"
            >
              <UnorderedList>
                <ListItem>
                  Associate Professor in the Department of Religion and
                  Philosophy at Hong Kong Baptist University
                </ListItem>
                <ListItem>
                  Worked as a medical doctor for 7 years before completing a
                  Ph.D. in Theology
                </ListItem>
                <ListItem>
                  Published multiple books and articles in the fields of
                  theology, philosophy of religion, and science and religion
                </ListItem>
              </UnorderedList>
            </Box>
          </Container>
        </TabPanel>
        <TabPanel w="100%">
          <Container
            minWidth="100%"
            bg="#FFDBCE"
            margin="0px"
            marginTop={{ base: '3', md: '10' }}
          >
            <Box
              padding="2"
              color="#00328D"
              w="100%"
              fontFamily="Akshar"
              fontSize={{ base: '5vw', md: '4vw', lg: '2.5vw' }}
              fontWeight="1000"
              textAlign="center"
              letterSpacing="3px"
            >
              WEEKLY PRAYER GUIDES
            </Box>
          </Container>
          <Container>
            <Box
              w="100%"
              padding="10px"
              marginBottom={5}
              fontFamily="Lexend Deca"
              fontSize={{ base: '12px', md: '15px' }}
            >
              <Center fontFamily="Lexend Deca" as="i" textAlign="center">
                Missions is only possible when we depend on the very reason we do missions. We must not go on missions without being prayerful. The weekly prayer guide is aimed to guide your inward and outward prayers as we go through missions month.
                <br/><br />
                Weekly Prayer Guides will be uploaded every Monday in November!
              </Center>
              <br />
              <UnorderedList>
                <ListItem><Link color='black' href='https://hongkong.sub.hmcc.net/wp-content/uploads/Missions-Month-Prayer-Guide-2022-Week-1.pdf' isExternal>
                    Week 1 [NEW]
                </Link></ListItem>
                
                {/* <ListItem> <Link color='black' href='www.hmcc.tv' isExternal>
                    Week 2
                </Link></ListItem>
                <ListItem><Link color='black' href='www.hmcc.tv' isExternal>
                    Week 3
                </Link></ListItem>
                <ListItem><Link color='gray' href='www.hmcc.tv' isExternal>
                    Week 4
                </Link></ListItem> */}
               
              </UnorderedList>
            </Box>
          </Container>

          <Container minWidth="100%" bg="#DDE9FF" margin="0px">
            <Box
              padding="2"
              color="#00328D"
              w="100%"
              fontFamily="Akshar"
              fontSize={{ base: '5vw', md: '4vw', lg: '2.5vw' }}
              fontWeight="1000"
              textAlign="center"
              letterSpacing="3px"
            >
              OTHER LINKS
            </Box>
          </Container>

          <Container>
            <Box
              maxWidth={{ base: '100%', md: '100%' }}
              padding={{ base: '10px', md: '10px' }}
              fontFamily="Lexend Deca"
              fontSize={{ base: '12px', md: '15px' }}
            >
              <UnorderedList>
                <ListItem>
                  <Link
                    color="black"
                    href="https://hongkong.hmcc.net/witness/home"
                    isExternal
                  >
                    Check out and share Witness Testimonies!
                  </Link>
                </ListItem>
                <ListItem>
                  <Link
                    color="black"
                    href="https://open.spotify.com/user/hmccofhk"
                    isExternal
                  >
                    Spotify Playlists
                  </Link>
                </ListItem>
              </UnorderedList>
            </Box>
          </Container>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
