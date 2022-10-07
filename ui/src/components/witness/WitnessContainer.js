import React from 'react';
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
} from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import '@fontsource/dm-sans';
import witnessTheme from './witnessTheme';
import VideoTestimonyContainer from './video-testimony/VideoTestimonyContainer';

const WitnessContainer = (props) => {
  return (
    <>
      <Container maxW="100%" m={0} p={0} theme={witnessTheme}>
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
          >
            <Box w={['85%', '45%']}>
              <Image
                src={process.env.PUBLIC_URL + '/images/witness/title.png'}
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
            <Box pt={['3', '12']} justifyContent="center" w={['85%', '40%']}>
              <Text
                textStyle={'dm_sans_bold'}
                color="white"
                fontSize={['2xl']}
                textAlign="center"
              >
                HOW ARE YOU WITNESSING GOD?
              </Text>
              {/* TODO: Testimony Form Modal for this Button*/}
              <Button
                my={3}
                size="lg"
                w="100%"
                leftIcon={<EditIcon />}
                bg="#8D2C72"
                color="white"
                _hover={{ bg: 'white', color: '#8D2C72' }}
              >
                SHARE YOUR TESTIMONY
              </Button>
            </Box>
          </Stack>
        </Box>
        <Tabs
          size="lg"
          justifyContent="center"
          color={'#BB8CA3'}
          borderColor={'#BB8CA3'}
          mx={12}
          isFitted
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
