import React from 'react';
import {
  Box,
  Container,
  Heading,
  Tabs,
  Tab,
  TabPanel,
  TabPanels,
  TabList,
} from '@chakra-ui/react';
import VideoTestimonyContainer from './video-testimony/VideoTestimonyContainer';

const WitnessContainer = (props) => {
  return (
    <>
      <Container maxW="100%" m={0} p={0}>
        <Box
          bgImage={`url('${process.env.PUBLIC_URL}/images/sermons/sermons-banner.png')`}
          bgPosition="center"
          bgSize="cover"
          textAlign="center"
          justifyContent="center"
          py={[8, 150]}
          m={0}
          width="100%"
        >
          <Heading size="2xl" color="white" fontWeight="900">
            Witness
          </Heading>
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
