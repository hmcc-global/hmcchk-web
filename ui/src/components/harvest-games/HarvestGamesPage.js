import {
  Box,
  Container,
  Image,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
  Link,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  TableContainer,
  Center,
} from '@chakra-ui/react';

import HarvestGamesLeaderboard from './HarvestGamesLeaderboard';

const HarvestGames = (props) => {
  return (
    <Box
      background="#FEF5E6"
      bgSize="100%"
      backgroundRepeat="no-repeat"
      bgPosition="top"
      bgImage={{
        base: `${process.env.PUBLIC_URL}/images/harvest-games/planes_mobile.png`,
        sm: `${process.env.PUBLIC_URL}/images/harvest-games/planes_mobile.png`,
        md: `${process.env.PUBLIC_URL}/images/harvest-games/planes_desktop.png`,
        lg: `${process.env.PUBLIC_URL}/images/harvest-games/planes_desktop.png`,
      }}
      height={{
        base: 'fit-content',
        sm: 'fit-content',
        md: 'fit-content',
        lg: 'fit-content',
      }}
    >
      <Box
        bgImage={`${process.env.PUBLIC_URL}/images/harvest-games/cloud.gif`}
        bgPosition="bottom,left"
        bgSize={{ base: '100%', sm: '100%', md: '45%', lg: '45%' }}
        backgroundRepeat={{
          base: 'no-repeat',
          sm: 'no-repeat',
          md: 'repeat-x',
          lg: 'repeat-x',
        }}
      >
        {/*FLY HMCC Text*/}
        <Box
          objectPosition={'center'}
          height="10"
          bgColor="none"
          paddingTop={{ base: '2%', sm: '1%', md: '1%', lg: '2%', xl: '4%' }}
          paddingLeft={{
            base: '5%',
            sm: '5%',
            md: '24%',
            lg: '30%',
            xl: '34%',
          }}
          paddingRight={{
            base: '5%',
            sm: '10%',
            md: '35%',
            lg: '35%',
            xl: '30%',
          }}
        >
          <Image
            src={`${process.env.PUBLIC_URL}/images/harvest-games/FLYHMCC_DESKTOP.png`}
            bgColor="none"
            paddingLeft="20px"
            objectFit="cover"
          />
        </Box>

        <Container
          maxW="90%"
          paddingTop={{
            base: '35%',
            sm: '35%',
            md: '20%',
            lg: '17%',
            xl: '15%',
          }}
          paddingBottom="5%"
          height={{ base: '70%', sm: '90%', md: '90%', lg: '100%', xl: '100%' }}
          bgColor="none"
        >
          <Box
            background="none"
            paddingTop={{ base: '5%', sm: '1%', md: '1%', lg: '2%' }}
            width="100%"
            height="90%"
          >
            {' '}
            {/*important so that panels do not overflow*/}
            {/* DESKTOP */}
            <Tabs
              orientation="vertical"
              display={['none', 'none', 'flex']}
              borderBottom="CaptionText"
              borderRadius="5px"
              variant="unstyled"
              mb="5%"
              defaultIndex={0}
            >
              <TabList border="none" width="250px" paddingRight={'10'}>
                <Tab
                  borderBottom="5px solid #E2E8F0"
                  _selected={{
                    borderColor: '#0628A3',
                    textColor: '#3A6693',
                    fontWeight: 'bold',
                  }}
                >
                  <Text>Leaderboard</Text>
                </Tab>

                <Tab
                  marginTop="1em"
                  borderBottom="5px solid #E2E8F0"
                  _selected={{
                    borderColor: '#0628A3',
                    textColor: '#3A6693',
                    fontWeight: 'bold',
                  }}
                >
                  Pre-Games
                </Tab>

                <Tab
                  marginTop="1em"
                  borderBottom="5px solid #E2E8F0"
                  _selected={{
                    borderColor: '#0628A3',
                    textColor: '#3A6693',
                    fontWeight: 'bold',
                  }}
                >
                  Live Leaderboard
                </Tab>
              </TabList>

              <TabPanels
                bgColor="#FFFFFF"
                borderRadius={'10'}
                bottomPadding="50px"
              >
                <TabPanel height="80vh">
                  <Text
                    fontSize={{ md: '26px', lg: '32px' }}
                    textAlign="center"
                    paddingTop="0.75em"
                  >
                    Giveaway Winners
                  </Text>
                  <Center>
                    <TableContainer width="60%" paddingTop="3%">
                      <Table variant="unstyled">
                        <Thead bgColor="#EDFBFF">
                          <Tr border="1px" borderColor={'#BFBFBF'}>
                            <Td textAlign={'center'} fontWeight="bold">
                              Week
                            </Td>
                            <Td textAlign={'center'} fontWeight="bold">
                              LIFE Group
                            </Td>
                          </Tr>
                        </Thead>
                        <Tbody bgColor="#CEF6FF">
                          <Tr
                            borderLeft="1px solid #BFBFBF"
                            borderRight="1px solid #BFBFBF"
                          >
                            <Td textAlign={'center'} fontSize={'15'}></Td>
                            <Td isNumeric textAlign={'center'} fontSize={'15'}>
                              Fuego
                            </Td>
                          </Tr>
                          <Tr
                            borderLeft="1px solid #BFBFBF"
                            borderRight="1px solid #BFBFBF"
                          >
                            <Td
                              textAlign={'center'}
                              fontSize={'15'}
                              fontWeight="700"
                            >
                              1
                            </Td>
                            <Td isNumeric textAlign={'center'} fontSize={'15'}>
                              CHRISTiFY
                            </Td>
                          </Tr>
                          <Tr
                            borderLeft="1px solid #BFBFBF"
                            borderRight="1px solid #BFBFBF"
                          >
                            <Td textAlign={'center'} fontSize={'15'}></Td>
                            <Td isNumeric textAlign={'center'} fontSize={'15'}>
                              crocs
                            </Td>
                          </Tr>
                          <Tr border="1px" borderColor={'#BFBFBF'}>
                            <Td
                              textAlign={'center'}
                              fontSize={'15'}
                              fontWeight="700"
                            >
                              2
                            </Td>
                            <Td isNumeric textAlign={'center'} fontSize={'15'}>
                              TBA
                            </Td>
                          </Tr>
                        </Tbody>
                      </Table>
                    </TableContainer>
                  </Center>
                </TabPanel>

                <TabPanel minHeight="60vh">
                  <Center>
                    <Image
                      src={`${process.env.PUBLIC_URL}/images/harvest-games/week2-pc.png`}
                    />
                  </Center>

                  <Text
                    fontSize={{ md: '26px', lg: '32px' }}
                    textAlign="center"
                    paddingTop="0.75em"
                  >
                    Access Week 2 Instructions <br />
                    PDF by clicking{' '}
                    <Link
                      color="teal.500"
                      href="https://hongkong.sub.hmcc.net/wp-content/uploads/Week-2.pdf"
                      isExternal
                    >
                      here
                    </Link>
                    .
                  </Text>
                </TabPanel>

                <TabPanel>
                  <HarvestGamesLeaderboard />
                </TabPanel>
              </TabPanels>
            </Tabs>
            {/* MOBILE */}
            <Tabs
              isFitted
              variant="enclosed"
              orientation="horizontal"
              width="100%"
              display={['block', 'block', 'none']}
              default={1}
            >
              <TabList>
                <Tab
                  borderBottom="5px solid #E2E8F0"
                  _selected={{
                    borderBottom: '5px solid #0628A3',
                    textColor: '#3A6693',
                    fontWeight: 'bold',
                  }}
                >
                  Leaderboard
                </Tab>
                <Tab
                  borderBottom="5px solid #E2E8F0"
                  _selected={{
                    borderBottom: '5px solid #0628A3',
                    textColor: '#3A6693',
                    fontWeight: 'bold',
                  }}
                >
                  Pre-Games
                </Tab>
                <Tab
                  borderBottom="5px solid #E2E8F0"
                  _selected={{
                    borderBottom: '5px solid #0628A3',
                    textColor: '#3A6693',
                    fontWeight: 'bold',
                  }}
                >
                  Live Leaderboard
                </Tab>
              </TabList>

              <TabPanels bgColor="none" borderRadius={'0'}>
                <TabPanel height={{ base: '30em', sm: '40em' }}>
                  <Text
                    fontSize={{
                      base: '20px',
                      sm: '20px',
                    }}
                    textAlign="center"
                    paddingTop="0.75em"
                  >
                    Giveaway Winners
                  </Text>
                  <Center>
                    <TableContainer width="100%">
                      <Table variant="unstyled">
                        <Thead bgColor="#EDFBFF">
                          <Tr border="1px" borderColor={'#BFBFBF'}>
                            <Td textAlign={'center'} fontWeight="bold">
                              Week
                            </Td>
                            <Td textAlign={'center'} fontWeight="bold">
                              LIFE Group
                            </Td>
                          </Tr>
                        </Thead>
                        <Tbody bgColor="#CEF6FF">
                          <Tr
                            borderLeft="1px solid #BFBFBF"
                            borderRight="1px solid #BFBFBF"
                          >
                            <Td textAlign={'center'} fontSize={'15'}></Td>
                            <Td isNumeric textAlign={'center'} fontSize={'15'}>
                              Fuego
                            </Td>
                          </Tr>
                          <Tr
                            borderLeft="1px solid #BFBFBF"
                            borderRight="1px solid #BFBFBF"
                          >
                            <Td
                              textAlign={'center'}
                              fontSize={'15'}
                              fontWeight="700"
                            >
                              1
                            </Td>
                            <Td isNumeric textAlign={'center'} fontSize={'15'}>
                              CHRISTiFY
                            </Td>
                          </Tr>
                          <Tr
                            borderLeft="1px solid #BFBFBF"
                            borderRight="1px solid #BFBFBF"
                          >
                            <Td textAlign={'center'} fontSize={'15'}></Td>
                            <Td isNumeric textAlign={'center'} fontSize={'15'}>
                              crocs
                            </Td>
                          </Tr>
                          <Tr border="1px" borderColor={'#BFBFBF'}>
                            <Td
                              textAlign={'center'}
                              fontSize={'15'}
                              fontWeight="700"
                            >
                              2
                            </Td>
                            <Td isNumeric textAlign={'center'} fontSize={'15'}>
                              TBA
                            </Td>
                          </Tr>
                        </Tbody>
                      </Table>
                    </TableContainer>
                  </Center>
                </TabPanel>

                <TabPanel minHeight={{ base: '30em', sm: '40em' }}>
                  <Center>
                    <Image
                      w="100%"
                      src={`${process.env.PUBLIC_URL}/images/harvest-games/week2-mobile.png`}
                    />
                  </Center>
                  <Text
                    fontSize={{
                      base: '20px',
                      sm: '20px',
                    }}
                    textAlign="center"
                  >
                    Access Week 2 Instructions <br />
                    PDF by clicking{' '}
                    <Link
                      color="teal.500"
                      href="https://hongkong.sub.hmcc.net/wp-content/uploads/Week-2.pdf"
                      isExternal
                    >
                      here
                    </Link>
                    .
                  </Text>
                </TabPanel>
                <TabPanel minHeight={{ base: '30em', sm: '40em' }}>
                  <HarvestGamesLeaderboard />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Container>
      </Box>{' '}
      {/*For clouds box*/}
    </Box>
  );
};

export default HarvestGames;
