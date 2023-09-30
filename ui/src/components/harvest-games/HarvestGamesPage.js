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
import HarvestGameInstructions from './HarvestGameInstructions';

const HarvestGames = (props) => {
  return (
    <Box
      background="#A7C5F5"
      bgSize="100%"
      backgroundRepeat="no-repeat"
      bgPosition="bottom"
      bgImage={`${process.env.PUBLIC_URL}/images/harvest-games/hg-background.svg`}
      height="fit-content"
    >
      <Box
        bgPosition="bottom,left"
        bgSize={{ base: '100%', sm: '100%', md: '45%', lg: '45%' }}
      >
        {/*FLY HMCC Text*/}
        <Box paddingX="auto">
          <Image
            src={`${process.env.PUBLIC_URL}/images/harvest-games/hg-name.png`}
            objectFit="cover"
            paddingTop="5"
            width={{ base: '70%', sm: '35%', md: '30%', lg: '30%', xl: '25%' }}
            marginX="auto"
          />
        </Box>

        <Container
          maxW="90%"
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
                  marginTop="1em"
                  textColor="#EEF4FF"
                  _selected={{
                    borderBottom: '5px solid #6F75CC',
                    textColor: '#6F75CC',
                    fontWeight: 'bold',
                  }}
                >
                  Challenges Winners
                </Tab>

                <Tab
                  marginTop="1em"
                  textColor="#EEF4FF"
                  _selected={{
                    borderBottom: '5px solid #6F75CC',
                    textColor: '#6F75CC',
                    fontWeight: 'bold',
                  }}
                >
                  Games Instructions
                </Tab>

                <Tab
                  textColor="#EEF4FF"
                  _selected={{
                    borderBottom: '5px solid #6F75CC',
                    textColor: '#6F75CC',
                    fontWeight: 'bold',
                  }}
                >
                  <Text>Leaderboard</Text>
                </Tab>

                {/* <Tab
                  marginTop="1em"
                  borderBottom="5px solid #E2E8F0"
                  _selected={{
                    borderColor: '#0628A3',
                    textColor: '#3A6693',
                    fontWeight: 'bold',
                  }}
                >
                  Live Leaderboard
                </Tab> */}
              </TabList>

              <TabPanels borderRadius={'10'} bottomPadding="50px">
                {/* <TabPanel minHeight="80vh" padding={0}>
                  <Center>
                    <Image
                      src={`${process.env.PUBLIC_URL}/images/harvest-games/week2-web.png`}
                      width={{ md: '100%', lg: '80%' }}
                    />
                  </Center>

                  <Text
                    fontSize={{ md: '26px', lg: '32px' }}
                    fontWeight={'bold'}
                    textAlign="center"
                    paddingTop="0.75em"
                  >
                    Access Week 2 Instructions <br />
                    PDF by clicking{' '}
                    <Link
                      color="#EEF4FF"
                      href="https://hongkong.sub.hmcc.net/wp-content/uploads/Week-2-Pregame-challenges.pdf"
                      isExternal
                    >
                      here
                    </Link>
                    .
                  </Text>
                </TabPanel> */}

                <TabPanel height="80vh" padding={0}>
                  <Text
                    fontSize={{ md: '26px', lg: '32px' }}
                    fontWeight={'bold'}
                    textAlign="center"
                  >
                    Challenge Winners
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
                          <Tr border="1px" borderColor={'#BFBFBF'}>
                            <Td textAlign={'center'} fontSize={'15'}>
                              1
                            </Td>

                            <Td isNumeric textAlign={'center'} fontSize={'15'}>
                              DHL, RIZE
                            </Td>
                          </Tr>
                          <Tr border="1px" borderColor={'#BFBFBF'}>
                            <Td textAlign={'center'} fontSize={'15'}>
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
                <TabPanel>
                  <HarvestGameInstructions />
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
                  textColor="#EEF4FF"
                  _selected={{
                    borderBottom: '5px solid #6F75CC',
                    textColor: '#6F75CC',
                    fontWeight: 'bold',
                  }}
                >
                  Challenges Winners
                </Tab>

                <Tab
                  textColor="#EEF4FF"
                  _selected={{
                    borderBottom: '5px solid #6F75CC',
                    textColor: '#6F75CC',
                    fontWeight: 'bold',
                  }}
                >
                  Leaderboard
                </Tab>
              </TabList>

              <TabPanels paddingTop={'7'}>
                {/* <TabPanel minHeight={{ base: '30em', sm: '40em' }}>
                  <Center>
                    <Image
                      w="100%"
                      src={`${process.env.PUBLIC_URL}/images/harvest-games/week2-mobile.png`}
                      paddingBottom={'7'}
                    />
                  </Center>
                  <Text
                    fontSize={{
                      base: '20px',
                      sm: '20px',
                    }}
                    fontWeight={'bold'}
                    textAlign="center"
                  >
                    Access Week 2 Instructions <br />
                    PDF by clicking{' '}
                    <Link
                      color="#EEF4FF"
                      href="https://hongkong.sub.hmcc.net/wp-content/uploads/Week-2-Pregame-challenges.pdf"
                      isExternal
                    >
                      here
                    </Link>
                    .
                  </Text>
                </TabPanel> */}

                <TabPanel height={{ base: '30em', sm: '40em' }}>
                  <Text
                    fontSize={{
                      base: '20px',
                      sm: '20px',
                    }}
                    fontWeight={'bold'}
                    textAlign="center"
                    paddingTop="0.75em"
                  >
                    Challenge Winners
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
                          <Tr border="1px" borderColor={'#BFBFBF'}>
                            <Td textAlign={'center'} fontSize={'15'}>
                              1
                            </Td>

                            <Td isNumeric textAlign={'center'} fontSize={'15'}>
                              DHL, RIZE
                            </Td>
                          </Tr>
                          <Tr border="1px" borderColor={'#BFBFBF'}>
                            <Td textAlign={'center'} fontSize={'15'}>
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
                  <HarvestGameInstructions />
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
