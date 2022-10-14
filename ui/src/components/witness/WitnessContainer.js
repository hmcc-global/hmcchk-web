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
  Button,
  Flex,
  Link,
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import VideoTestimonyContainer from './video-testimony/VideoTestimonyContainer';
import ShareTestimonyButton from './text-testimony/ShareTestimonyButton';
import TextTestimonyContainer from './text-testimony/TextTestimonyContainer';

const WitnessContainer = (props) => {
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
          bgImage={`linear-gradient(0deg, rgba(256, 256, 256), rgba(256, 256, 256, 0), rgba(256, 256, 256, 0), rgba(256, 256, 256, 0), rgba(256, 256, 256, 0), rgba(256, 256, 256, 0)), 
          url('${process.env.PUBLIC_URL}/images/witness/banner-desktop.png')`}
          bgSize="cover"
          justifyContent="center"
          py={[7, 10]}
        >
          <Link href="/witness/home">
            <Button
              variant="link"
              fontSize={32}
              color="#7C2D6B"
              justifyContent="left"
              leftIcon={<ArrowBackIcon />}
              display="flex"
              mb={5}
              ml={[5, 10]}
            />
          </Link>
          <Stack
            direction={['column', 'row']}
            justifyContent={['center', 'space-evenly']}
            spacing={7}
            mb={[5, 20]}
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
                <ShareTestimonyButton />
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
            <TabPanel>
              <TextTestimonyContainer />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </>
  );
};

export default WitnessContainer;
