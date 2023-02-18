import {
  Container,
  Text,
  VStack,
  Box,
  Stack,
  Flex,
  Center,
  StackDivider,
  Tabs,
  Tab,
  TabPanel,
  TabPanels,
  TabList,
  Divider,
} from '@chakra-ui/react';

import ThePassion from './ThePassion';
import EasterCalendar from './EasterCalendar';
import EasterStory from './EasterStory';
import EasterNavbar from './EasterNavbar';
import EasterHomeTextSection from './../witness/home-sections/EasterHomeTextSection';
import ShareTestimonyButton from '../witness/text-testimony/ShareTestimonyButton';
import WitnessHomeVideoSection from '../witness/home-sections/WitnessHomeVideoSection';
import WitnessHomeTextSection from '../witness/home-sections/WitnessHomeTextSection';

const Easter2023Container = (props) => {
  //To do: implement navbar, buttons, testimony section
  const getOpenTab = () => {
    const resource = props.match.params.resource;
    if (resource === 'videos') {
      return 0;
    } else {
      return 1;
    }
  };

  return (
    <Container maxW="100%" minHeight="fill" p={0} m={0}>
      <VStack
        divider={<StackDivider borderColor="gray.200" />}
        spacing={0}
        align="stretch"
      >
        <Box>
          <ThePassion />
        </Box>
        <Box
          minHeight="fit-content"
          backgroundColor="#FFF7F1"
          backgroundPosition="top"
          bgSize="100%"
          textAlign="center"
          alignItems="center"
          justifyContent="center"
          pt={[0, 0]}
          pb={[0, 0]}
          bgImage={
            process.env.PUBLIC_URL + '/images/easter-2023/wigglydesktop.png'
          }
        >
          <Box
            sx={{
              position: '-webkit-sticky',
              position: 'sticky',
              top: '0',
              bgColor: '#FFF7F1',
            }}
          >
            <EasterNavbar />
          </Box>

          <Box alignContent="center" backgroundColor="none">
            <div id="prayer-wall">
              <Box height="20"></Box>
            </div>
            <EasterHomeTextSection />
            <div id="easter-story"></div>
            <EasterStory />

            <Center>
              <EasterCalendar />
            </Center>

            <div id="easter-witness">
              <Stack
                direction={['column', 'row']}
                justifyContent={['center', 'space-evenly']}
                spacing={7}
                mb={[5, 20]}
              >
                <Flex w="100%" justifyContent="center" direction="column">
                  <Box w={['85%', '90%']} ml={[0, 20]} mx="auto">
                    <Text
                      textColor="#8D2C72"
                      fontWeight="400"
                      fontFamily="concrete_demo"
                      fontSize={['10vw', '5vw']}
                    >
                      WITNESS
                    </Text>
                    <Box pt={'5'} w={['85%', '70%']} mx="auto">
                      <Text
                        textStyle={'dm_sans_bold'}
                        color="black"
                        fontSize={['md']}
                        textAlign="center"
                      >
                        The theme for HMCC 2022-2023 is Witness. As a church, it
                        is our hope that our daily and personal witness of Jesus
                        will translate into our passionate witness for Jesus to
                        others around us.
                        <br />
                        <br />
                        Throughout this year, we want to invite you to share
                        your personal witness of Jesus here and witness God’s
                        work in our church!
                      </Text>
                    </Box>
                    <Box
                      mx="auto"
                      pt={['5', '12']}
                      justifyContent="center"
                      w={['85%', '60%']}
                    >
                      <Text
                        textStyle={'dm_sans_bold'}
                        color="black"
                        fontSize={['md', '2xl']}
                        textAlign="center"
                      >
                        HOW ARE YOU WITNESSING GOD?
                      </Text>
                    </Box>
                    <Box
                      mx="auto"
                      justifyContent="center"
                      w={['85%', '30%']}
                      pb="6vw"
                    >
                      <ShareTestimonyButton />
                    </Box>
                  </Box>
                  <Container maxW="100%" p={[0, 10]} centerContent>
                    <WitnessHomeVideoSection />
                    <Divider
                      orientation="horizontal"
                      my={10}
                      w="25%"
                      height="3px"
                      backgroundColor="#DAC7BC"
                    />
                    <WitnessHomeTextSection />
                  </Container>
                </Flex>
              </Stack>
            </div>
          </Box>
        </Box>
      </VStack>
    </Container>
  );
};

export default Easter2023Container;
