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
import "@fontsource/playfair-display"; // Defaults to weight 400.
  const EasterCalendar = () => {
    return (
      
      <Flex flexWrap="wrap" gap='0'>
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
        <Heading as="h2" fontSize={["2em", "3.5em"]}  color="#67298E" fontWeight={700} fontFamily = 'PlayfairDisplay'>
          GOOD FRIDAY
        </Heading>
        <Heading as="h2" fontSize={["2em", "3.5em"]}  color="#67298E" fontWeight={700}>
          <Text textStyle={'playfair_display'} fontWeight='black'>
          SERVICE
          </Text>
          
        </Heading>
        <Text fontSize={["1.2em", "1.8em"]} color ="#7B0D0D" fontWeight={800} paddingTop = {{ base: 3, sm: 4, md: 5, lg: 6 }}>
          Friday, 7 Apr 2023
        </Text>
        <Text fontSize={["1.2em", "1.8em"]} color ="#7B0D0D" fontWeight={800} >
          8:00 PM
        </Text>
        <Text fontSize={["1.2em", "1.8em"]} color ="#7B0D0D" fontWeight={800}  paddingBottom = {{ base: 3, sm: 4, md: 5, lg: 6 }}>
          TBA
        </Text >
        <Button
          bgColor = "#67298E"
          color = '#FFFFFF'
          paddingTop ={{ base: 23, sm: 23, md: 25, lg: 29 }}
          paddingBottom ={{ base: 23, sm: 23, md: 25, lg: 29 }}
          as={Link}
          size="sm"
          href="/visit-us"
          variant="outline"
          w={[200, 400]}
          borderRadius={10}
          fontSize={["1.2em", "1.8em"]}
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
        <Heading as="h2" fontSize={["2em", "3.5em"]} color = "#FF619F" fontWeight={700} fontFamily = 'Playfair'>
          EASTER 
        </Heading>
        <Heading as="h2" fontSize={["2em", "3.5em"]} color = "#FF619F" fontWeight={700} fontFamily = 'Playfair'>
          CELEBRATION
        </Heading>
        <Text fontSize={["1.2em", "1.8em"]} color ="#7B0D0D" fontWeight={800}  paddingTop = {{ base: 3, sm: 4, md: 5, lg: 6 }} >
          Sunday, 9 Apr 2023
        </Text>
        <Text fontSize={["1.2em", "1.8em"]} color ="#7B0D0D" fontWeight={800} >
          10:00 AM
        </Text>
        <Text fontSize={["1.2em", "1.8em"]} color ="#7B0D0D" fontWeight={800}  paddingBottom = {{ base: 3, sm: 4, md: 5, lg: 6 }}>
          TBA
        </Text>
        <Button
          bgColor = "#FF619F"
          color = '#FFFFFF'
          paddingTop ={{ base: 23, sm: 23, md: 25, lg: 29 }}
          paddingBottom ={{ base: 23, sm: 23, md: 25, lg: 29 }}
          as={Link}
          size="sm"
          href="/events"
          variant="outline"
          w={[200, 400]}
          borderRadius={10}
          fontSize={["1.2em", "1.8em"]}
        >
          Add to Calendar
        </Button>
      </Box>
    </Flex>
    )
  }
  
 
  

export default EasterCalendar;