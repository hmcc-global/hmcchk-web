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
  import { TriangleDownIcon } from '@chakra-ui/icons';
import { ArrowBackIcon } from '@chakra-ui/icons';
import ShareTestimonyButton from '../witness/text-testimony/ShareTestimonyButton';

  import { Fragment, useState } from 'react';
  import { Select } from '@chakra-ui/select';
  import { Route } from 'react-router-dom';

  import ThePassion from './ThePassion';
  import EasterCalendar from './EasterCalendar';
  import EasterStory from './EasterStory';
  import EasterNavbar from './EasterNavbar';
  

  
  const Easter2023Container = (props) => {
  
    //To do: implement navbar, buttons, testimony section
    const handleClickScroll = () => {
      const element = document.getElementById('section-1');
      if (element) {
        // 👇 Will scroll smoothly to the top of the next section
        element.scrollIntoView({ behavior: 'smooth' });
      }
    };
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
        minHeight = {["100em","150em"]}
        backgroundColor = '#FFF7F1'
        bgPosition="top"
        bgSize="100%"
        textAlign="center"
        alignItems='center'
        justifyContent="center"
        pt={[20, '0']}
        pb={[10, 120]}
        bgImage={process.env.PUBLIC_URL + '/images/easter-2023/wigglydesktop.png'}>
        
        <Box 
        alignContent = 'center'
        backgroundColor = 'none'
        >
          
         
       
        <EasterNavbar/>
        <div id="easter-story"><EasterStory/></div>
        <div id="easter-calendar">
          <Center>
          <EasterCalendar/>
          </Center>
        </div>
      
       
          
        </Box>
        </Box>
        </VStack>
       
      </Container>
    );
  };
  

export default Easter2023Container