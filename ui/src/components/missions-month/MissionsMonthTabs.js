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
          borderBottom="5px solid #E2E8F0"
          _selected={{
            borderBottom: '5px solid #0628A3',
            textColor: '#3A6693',
            fontWeight: 'bold',
          }}
        >
          Details
        </Tab>

        <Tab
          borderBottom="5px solid #E2E8F0"
          _selected={{
            borderBottom: '5px solid #0628A3',
            textColor: '#3A6693',
            fontWeight: 'bold',
          }}
        >
          Resources
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>{/* Write your code your for resources */}</TabPanel>
        <TabPanel></TabPanel>
      </TabPanels>
    </Tabs>
  );
}
