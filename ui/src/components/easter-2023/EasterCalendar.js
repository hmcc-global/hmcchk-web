import {
  Container,
  Text,
  VStack,
  Box,
  Tabs,
  Tab,
  TabPanel,
  TabPanels,
  TabList,
  Image,
  Stack,
  Button,
  Flex,
  Link,
  Center,
  Spacer,
  Heading,
} from '@chakra-ui/react';

import { generateGoogleCalendarLink } from '../helpers/eventsHelpers';

const goodFriday = {
  time: '8:00 PM',
  title: 'Good Friday Service',
  startDate: '2023-04-07T00:00:00.000+08:00',
  endDate: '2023-04-07T00:00:00.000+08:00',
  recurrence: '7',
  location: 'TBA',
};
const easter = {
  time: '10:00 AM',
  title: 'Easter Celebration',
  startDate: '2023-04-09T00:00:00.000+08:00',
  endDate: '2023-04-09T00:00:00.000+08:00',
  recurrence: '7',
  location: 'TBA',
};

const EasterCalendar = () => {
  return (
    <Flex flexWrap="wrap" gap="0" bgColor="none">
      <Box
        flex={1}
        //borderWidth="1px"
        //borderRadius="20"
        //bgImage={`linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('${process.env.PUBLIC_URL}/images/connect/2021_07_11_Membership_Recognition_Prayer_2.jpg')`}
        bgPosition="center"
        bgSize="cover"
        //shadow="lg"

        textAlign="center"
        px={[8, 10]}
        py={[8, 16]}
        m={2}
      >
        <Heading
          as="h2"
          fontSize={['2em', '2.8em']}
          color="#67298E"
          fontWeight={700}
          fontFamily="concrete_demo"
        >
          GOOD FRIDAY
        </Heading>
        <Heading
          as="h2"
          fontSize={['2em', '2.8em']}
          color="#67298E"
          fontWeight={700}
        >
          <Text fontFamily={'concrete_demo'} fontWeight="black">
            SERVICE
          </Text>
        </Heading>
        <Text
          textStyle={'dm_sans'}
          fontSize={['14px', '18px']}
          color="#7B0D0D"
          fontWeight={800}
          paddingTop={{ base: 3, sm: 4, md: 5, lg: 6 }}
        >
          Friday, 7 Apr 2023
        </Text>
        <Text
          textStyle={'dm_sans'}
          fontSize={['14px', '18px']}
          color="#7B0D0D"
          fontWeight={800}
        >
          8:00 PM
        </Text>
        <Text
          textStyle={'dm_sans'}
          fontSize={['14px', '18px']}
          color="#7B0D0D"
          fontWeight={800}
          paddingBottom={{ base: 3, sm: 4, md: 5, lg: 6 }}
        >
          11/F, KOHO, Kwun Tong/Online
        </Text>
        <Button
          textStyle={'dm_sans'}
          bgColor="#FCF6FF"
          color="#67298E"
          paddingTop={{ base: 23, sm: 23, md: 25, lg: 29 }}
          paddingBottom={{ base: 23, sm: 23, md: 25, lg: 29 }}
          as={Link}
          size="sm"
          href={generateGoogleCalendarLink(goodFriday)}
          target="_blank"
          variant="outline"
          w={[200, 400]}
          borderRadius={10}
          fontSize={['14px', '18px']}
          position="inherit"
          borderWidth={4}
          borderColor="#67298E"
          _hover={{
            bgColor: "#67298E",
            color: "#FCF6FF",
          }}
        >
          Add to Calendar
        </Button>
      </Box>
      <Box
        flex={1}
        // borderWidth="1px"
        // borderRadius="20"
        //bgImage={`linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('${process.env.PUBLIC_URL}/images/connect/2016_Apr_EOY_Celebration_Group_Cheering_higher.jpg')`}
        bgPosition="center"
        bgSize="cover"
        //shadow="lg"
        textAlign="center"
        px={[8, 10]}
        py={[8, 16]}
        m={2}
      >
        <Heading
          as="h2"
          fontSize={['2em', '2.8em']}
          color="#FF619F"
          fontWeight={700}
          fontFamily="concrete_demo"
        >
          EASTER
        </Heading>
        <Heading
          as="h2"
          fontSize={['2em', '2.8em']}
          color="#FF619F"
          fontWeight={700}
          fontFamily="concrete_demo"
        >
          CELEBRATION
        </Heading>
        <Text
          textStyle={'dm_sans'}
          fontSize={['16px', '20px']}
          color="#7B0D0D"
          fontWeight={800}
          paddingTop={{ base: 3, sm: 4, md: 5, lg: 6 }}
        >
          Sunday, 9 Apr 2023
        </Text>
        <Text
          textStyle={'dm_sans'}
          fontSize={['14px', '18px']}
          color="#7B0D0D"
          fontWeight={800}
        >
          10:00 AM
        </Text>
        <Text
          textStyle={'dm_sans'}
          fontSize={['14px', '18px']}
          color="#7B0D0D"
          fontWeight={800}
          paddingBottom={{ base: 3, sm: 4, md: 5, lg: 6 }}
        >
          N101, HKCEC, Wan Chai
        </Text>
        <Button
          textStyle={'dm_sans'}
          bgColor="#FCF6FF"
          color="#FF619F"
          paddingTop={{ base: 23, sm: 23, md: 25, lg: 29 }}
          paddingBottom={{ base: 23, sm: 23, md: 25, lg: 29 }}
          as={Link}
          size="sm"
          href={generateGoogleCalendarLink(easter)}
          target="_blank"
          variant="outline"
          w={[200, 400]}
          borderRadius={10}
          fontSize={['14px', '18px']}
          position="inherit"
          borderWidth={4}
          borderColor="#FF619F"
          _hover={{
            bgColor: "#FF619F",
            color: "#FCF6FF",
          }}
        >
          Add to Calendar
        </Button>
      </Box>
    </Flex>
  );
};

export default EasterCalendar;
