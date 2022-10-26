import {
  Box,
  Container,
  Image,
  HStack,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
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
        <TabPanel>{/* Write your code your for resources */}</TabPanel>
        <TabPanel></TabPanel>
      </TabPanels>
    </Tabs>
  );
}
