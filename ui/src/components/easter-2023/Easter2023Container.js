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
    StackDivider
  } from '@chakra-ui/react';

  import ThePassion from './ThePassion';
  import EasterCalendar from './EasterCalendar';
  import EasterStory from './EasterStory';
  import EasterNavbar from './EasterNavbar';
  import EasterHomeTextSection from './../witness/home-sections/EasterHomeTextSection';
import WitnessHomeContainer from './../witness/WitnessHomeContainer';
  
  const Easter2023Container = (props) => {
    //To do: implement navbar, buttons, testimony section
    return (  
      <Container
        maxW="100%" 
        minHeight = "fill" 
        p={0} m={0}
      >
        
        <VStack
        divider={<StackDivider borderColor='gray.200' />}
        spacing={0}
        align='stretch'
        >
        <Box>   
        <ThePassion/>
        </Box>
        <Box
        minHeight = 'fit-content'
        backgroundColor = '#FFF7F1'
        backgroundPosition = 'top'
        bgSize="100%"
        textAlign="center"
        alignItems='center'
        justifyContent="center"
        pt={[0, 0]}
        pb={[0, 0]}
        bgImage={process.env.PUBLIC_URL + '/images/easter-2023/wigglydesktop.png'}>
        
        <Box 
        sx={{position:'-webkit-sticky',position:"sticky", top:'0', bgColor:'#FFF7F1'}}
        >
          <EasterNavbar/>
        </Box>

        <Box 
        alignContent = 'center'
        backgroundColor = 'none'
        >
        <div id="prayer-wall"><Box height='20'></Box></div>
        <EasterHomeTextSection />
        <div id="easter-story"></div><EasterStory/>
        
          <Center>
          <EasterCalendar/>
          </Center>
      
        <div id="easter-witness">
          {/* <WitnessHomeContainer/> */}
        </div>
        </Box>
        </Box>
        </VStack>
       
      </Container>
    );
  };
  

export default Easter2023Container