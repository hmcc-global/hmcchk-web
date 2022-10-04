import { useState } from 'react';
import { Box, Container, Heading, Tabs, Tab, TabPanel, TabPanels, TabList } from '@chakra-ui/react';
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
        {/* <Heading
          size="2xl"
          color="black"
          justifyContent="center"
          fontWeight="900"
          display={{ base: 'flex', md: 'none' }}
        >
          Witness
        </Heading> */}
        <Tabs size="lg" variant="soft-rounded" justifyContent="center" m={1}>
            <TabList justifyContent="center">
                <Tab>Videos</Tab>
                <Tab>Text</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <VideoTestimonyContainer />
                </TabPanel>
                <TabPanel>
                    TODO: Text Testimony Container
                </TabPanel>
            </TabPanels>
        </Tabs>
      </Container>
    </>
  );
};

export default WitnessContainer;
