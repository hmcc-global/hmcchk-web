<<<<<<< HEAD
import React from 'react';
=======
import { useState } from 'react';
>>>>>>> e042517... GH-550: add banner and font
import {
  Box,
  Container,
  Heading,
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
import witnessTheme from './witnessTheme';
import '@fontsource/dm-sans';
>>>>>>> e042517... GH-550: add banner and font
import VideoTestimonyContainer from './video-testimony/VideoTestimonyContainer';

const WitnessContainer = (props) => {
  return (
    <>
      <Container maxW="100%" m={0} p={0}>
        <Box
          bgImage={`url('${process.env.PUBLIC_URL}/images/witness/banner-desktop.png')`}
          // bgPosition="center"
          bgSize="cover"
          justifyContent="center"
          py={[8, 155]}
          // w={'100%'}
          // m={0}
        >
          <Image
            src={process.env.PUBLIC_URL + '/images/witness/title.png}'}
            objectFit="cover"
            margin="auto"
          />
          <Box pl={'12'} w={'55%'}>
            <Text textStyle={'dm_sans'} color="white" fontSize={['md', 'lg']}>
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
        <Container maxW="container.xl" padding={[0, 2]}>
          <Tabs size="lg" justifyContent="center" m={1}>
            <TabList justifyContent="center" display="flex">
              <Tab width="100%">WATCH</Tab>
              <Tab width="100%">READ</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <VideoTestimonyContainer />
              </TabPanel>
              <TabPanel>TODO: Text Testimony Container</TabPanel>
            </TabPanels>
          </Tabs>
        </Container>
      </Container>
    </>
  );
};

export default WitnessContainer;
