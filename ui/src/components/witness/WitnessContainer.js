import {
  Box,
  Container,
  Tabs,
  Tab,
  TabPanel,
  TabPanels,
  TabList,
  Image,
  Text,
  Stack,
  useDisclosure,
  VStack,
  Flex,
} from '@chakra-ui/react';
import VideoTestimonyContainer from './video-testimony/VideoTestimonyContainer';
import ShareTestimonyButton from './text-testimony/ShareTestimonyButton';

const WitnessContainer = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const getOpenTab = () => {
    const resource = props.match.params.resource;
    if (resource === 'videos') {
      return 0;
    } else {
      return 1;
    }
  };

  return (
    <>
      <Container maxW="100vw" m={0} p={0}>
        <Box
          bgImage={`linear-gradient(0deg, rgba(256, 256, 256), rgba(256, 256, 256, 0), rgba(256, 256, 256, 0), rgba(256, 256, 256, 0)), 
          url('${process.env.PUBLIC_URL}/images/witness/banner-desktop.png')`}
          bgSize="cover"
          justifyContent="center"
          py={[20, 120]}
        >
          <Stack
            direction={['column', 'row']}
            justifyContent={['center', 'space-evenly']}
            spacing={7}
          >
            <Flex w="100%" justifyContent="center">
              <Box w={['85%', '100%']} ml={[0, 20]}>
                <Image
                  src={process.env.PUBLIC_URL + '/images/witness/title.png'}
                  margin
                />
                <Box pt={'5'}>
                  <Text
                    textStyle={'dm_sans'}
                    color="white"
                    fontSize={['md']}
                    textAlign={['center', 'left']}
                  >
                    The theme for HMCC 2022-2023 is Witness. As a church, it is
                    our hope that our daily and personal witness of Jesus will
                    translate into our passionate witness for Jesus to others
                    around us.
                    <br />
                    <br />
                    Throughout this year, we want to invite you to share your
                    personal witness of Jesus here and witness God’s work in our
                    church!
                  </Text>
                </Box>
              </Box>
            </Flex>
            <Flex w="100%" justifyContent="center">
              <Box pt={['3', '12']} justifyContent="center" w={['85%', '90%']}>
                <Text
                  textStyle={'dm_sans_bold'}
                  color="white"
                  fontSize={['2xl']}
                  textAlign="center"
                >
                  HOW ARE YOU WITNESSING GOD?
                </Text>
                <ShareTestimonyButton
                  onOpen={onOpen}
                  isOpen={isOpen}
                  onClose={onClose}
                />
                {/* TODO: Testimony Form Modal for this Button*/}
              </Box>
            </Flex>
          </Stack>
        </Box>
        <Tabs
          size="lg"
          justifyContent="center"
          color={'#BB8CA3'}
          borderColor={'#BB8CA3'}
          mx={[1, 12]}
          isFitted
          defaultIndex={getOpenTab()}
        >
          <TabList justifyContent="center">
            <Tab _selected={{ color: '#84005F', borderColor: '#84005F' }}>
              <b>WATCH</b>
            </Tab>
            <Tab _selected={{ color: '#84005F', borderColor: '#84005F' }}>
              <b>READ</b>
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <VideoTestimonyContainer />
            </TabPanel>
            <TabPanel>TODO: Text Testimony Container</TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </>
  );
};

export default WitnessContainer;
