import {
  Box,
  Container,
  Image,
  HStack,
  Text,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  Center,
  Link,
  ListItem,
  ListIcon,
  OrderedList,
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
        <TabPanel></TabPanel>
        <TabPanel w="100%">
          {/* Write your code your for resources */}

          <Container minWidth="100%" bg="#FFDBCE" margin="0px">
            <Box
              padding="2"
              color="#00328D"
              w="100%"
              fontFamily="Akshar"
              fontSize={{ base: '20px', md: '28px' }}
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
              fontFamily="Lexend Deca"
              fontSize={{ base: '12px', md: '15px' }}
            >
              <Center fontFamily="Lexend Deca" as="i" textAlign="center">
                Weekly Prayer Guides will be uploaded every Monday in November!
              </Center>
              <Center>...</Center>
              <br />
              <UnorderedList>
                {/* WHEN WEEKLY PRAYER GUIDES BECOME AVAILABLE!! REPLACE LINKS each week!!
                <ListItem><Link color='black' href='www.hmcc.tv' isExternal>
                    Week 1
                </Link></ListItem>
                
                <ListItem> <Link color='black' href='www.hmcc.tv' isExternal>
                    Week 2
                </Link></ListItem>
                <ListItem><Link color='black' href='www.hmcc.tv' isExternal>
                    Week 3
                </Link></ListItem>
                <ListItem><Link color='gray' href='www.hmcc.tv' isExternal>
                    Week 4
                </Link></ListItem>
                */}
              </UnorderedList>
            </Box>
          </Container>

          <Container minWidth="100%" bg="#DDE9FF" margin="0px">
            <Box
              padding="2"
              color="#00328D"
              w="100%"
              fontFamily="Akshar"
              fontSize={{ base: '20px', md: '28px' }}
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
