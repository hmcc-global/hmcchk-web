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
        <TabPanel>
          <Container
            marginX="auto"
            textAlign="center"
            maxW="fit-content"
            textColor="#00328D"
            fontFamily="Akshar"
            fontWeight={('black', 'extrabold')}
            fontSize={{ base: '5vw', md: '4vw', lg: '3vw' }}
            letterSpacing="0.2em"
          >
            OVERVIEW OF THE MONTH
            <VStack alignItems="start">
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
                  whiteSpace="pre"
                >
                  Friday <br /> Nov 4{'  '}
                </Box>
                <VStack spacing="0" alignItems="start" marginY="auto">
                  <Box
                    fontSize={{ base: '4vw', md: '2.4vw', lg: '2vw' }}
                    letterSpacing="0.1em"
                  >
                    ENCOUNTER
                  </Box>
                  <Box
                    fontSize={{ base: '2.5vw', md: '1.5vw', lg: '1.5vw' }}
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
                  fontSize={{ base: '4vw', md: '2.4vw', lg: '2vw' }}
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
                  EVERY <br /> SUNDAY
                </Box>
                <Box
                  fontSize={{ base: '4vw', md: '2.4vw', lg: '2vw' }}
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
          <Container
            marginTop="10"
            marginBottom="10rem"
            display={{ base: 'none', md: 'flex' }}
            justifyContent="center"
          >
            <Image src={process.env.PUBLIC_URL + 'images/mission-month1.png'} />
          </Container>
          <Container
            marginTop="10"
            marginBottom="10rem"
            display={{ base: 'flex', md: 'none' }}
            justifyContent="center"
          >
            <Image src={process.env.PUBLIC_URL + 'images/mission-month2.png'} />
          </Container>
        </TabPanel>
        <TabPanel>
          <Container>
            <Box></Box>
          </Container>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
