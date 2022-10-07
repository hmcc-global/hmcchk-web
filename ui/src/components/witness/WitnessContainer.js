<<<<<<< HEAD
import React from 'react';
=======
import { useState } from 'react';
>>>>>>> e042517... GH-550: add banner and font
import {
  Box,
  Container,
  Tabs,
  Tab,
  TabPanel,
  TabPanels,
  TabList,
<<<<<<< HEAD
} from '@chakra-ui/react';
=======
  Image,
  Text,
} from '@chakra-ui/react';
import '@fontsource/dm-sans';
<<<<<<< HEAD
>>>>>>> e042517... GH-550: add banner and font
=======
import witnessTheme from './witnessTheme';
>>>>>>> 57fa2bc... GH-550: add tabs panel
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
          py={[8, 120]}
        >
          <Image
            src={process.env.PUBLIC_URL + '/images/witness/title.png'}
            pl={'12'}
          />
          <Box pl={'12'} pt={'5'} w={'55%'}>
            <Text textStyle={'dm_sans'} color="white" fontSize={['md']}>
              The theme for HMCC 2022-2023 is Witness. As a church, it is our
              hope that our daily and personal witness of Jesus will translate
              into our passionate witness for Jesus to others around us.
              <br />
              <br />
              Throughout this year, we want to invite you to share your personal
              witness of Jesus here and witness God’s work in our church!
            </Text>
          </Box>
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
