import {
    Box,
    Container,
    Heading,
    Image,
    VStack,
    useMediaQuery,
    Flex,
    Tabs, 
    TabList, 
    TabPanels, 
    Tab, 
    TabPanel,
    Text,
    Link
  } from '@chakra-ui/react';

  
  const HarvestGames = (props) => {
    
    return (
      <Box background="#FEF5E6"
      bgSize="100%"
      backgroundRepeat="no-repeat"
      bgPosition="top"
      bgImage={{base:`${process.env.PUBLIC_URL}/images/harvest-games/planes_mobile.png`,
                sm:`${process.env.PUBLIC_URL}/images/harvest-games/planes_mobile.png`,
                md:`${process.env.PUBLIC_URL}/images/harvest-games/planes_desktop.png`,
                lg:`${process.env.PUBLIC_URL}/images/harvest-games/planes_desktop.png`}}
      height={{base:'fit-content',sm:'fit-content',md:'fit-content',lg:'fit-content'}}    
      >
      <Box  bgImage={{base:`${process.env.PUBLIC_URL}/images/harvest-games/clouds.png`,
                sm:`${process.env.PUBLIC_URL}/images/harvest-games/clouds.png`,
                md:`${process.env.PUBLIC_URL}/images/harvest-games/clouds_desktop.png`,
                lg:`${process.env.PUBLIC_URL}/images/harvest-games/clouds_desktop.png`}}
        bgPosition = 'bottom'
        bgSize = {{base:'100%',sm:'100%',md:'100%',lg:'100%'}}
        backgroundRepeat={{base:'no-repeat',sm:'no-repeat',md:'no-repeat',lg:'no-repeat'}}
        >
      {/*FLY HMCC Text*/}
      <Box
        objectPosition={'center'}
        height = '10'
        bgColor='none'
        paddingTop = {{base: '2%',sm:'1%', md:'1%', lg:'2%',xl:'4%'}}
        paddingLeft = {{base: '5%',sm:'5%', md:'24%', lg:'30%', xl:'34%'}}
        paddingRight= {{base: '5%', sm:'10%', md:'35%', lg:'35%', xl: '30%'}}>
        <Image
          src= {`${process.env.PUBLIC_URL}/images/harvest-games/FLYHMCC_DESKTOP.png`}
          bgColor = 'none'
          paddingLeft = '20px' 
          objectFit='cover'
          /> 
      </Box>

      <Container maxW="container.xl" 
      paddingTop = {{base: '35%',sm:'35%', md:'20%', lg:'17%', xl: '15%'}}
      paddingBottom = '5%'
      height = {{base: '70%',sm:'90%', md:'90%', lg:'100%', xl: '100%'}}
      bgColor = "none"
      >
      <Box
          background="none"
          paddingTop = {{base: '5%',sm:'1%', md:'1%', lg:'2%'}}
          
          height = '90%'> {/*important so that panels do not overflow*/}
         
        {/* DESKTOP */}

          <Tabs 
          orientation='vertical'
          display={['none','none','flex']}
          borderBottom="CaptionText"
          borderRadius="5px"
          variant="unstyled"
          mb="5%"
          default={1}
          >

          <TabList border="none" width = '250px' paddingRight={"10"}>
            <Tab 
              borderBottom="5px solid #E2E8F0" 
              _selected={{ borderColor: '#0628A3', textColor: "#3A6693", fontWeight: 'bold' }}>
              <Text>
                Leaderboard
              </Text>
              </Tab>
            <Tab 
              borderBottom="5px solid #E2E8F0"
              _selected={{ borderColor: '#0628A3', textColor: "#3A6693", fontWeight: 'bold'}}>Pre-Games</Tab>
          </TabList>     

          <TabPanels bgColor='#FFFFFF' borderRadius={'10'} bottomPadding = "50px" >
            <TabPanel  height = "40em">
            <Text
              fontSize = {{base: '20px',sm:'25px', md:'30px', lg:'40px'}}
              textAlign = 'center'
            >
              Leadership BOARD: 
              </Text>
            </TabPanel>
            
            <TabPanel  height = "80em">
            <Text
              fontSize = {{base: '30px',sm:'30px', md:'35px', lg:'40px'}}
              textAlign = 'center'
            >
               Access Pre-Game Instructions PDF <br></br>by clicking {' '}
               <Link color='teal.500' href='https://www.youtube.com/' isExternal>
                 here
               </Link>
               .
              </Text>
            </TabPanel>
          </TabPanels>
        </Tabs>

        {/* MOBILE */}

        <Tabs 
          isFitted variant = 'enclosed'
          orientation='horizontal'
          display={['block','block','none']}
          default={1}
          >
          <TabList>
            <Tab
              borderBottom="5px solid #E2E8F0" 
              _selected={{ borderColor: '#0628A3', textColor: "#3A6693", fontWeight: 'bold' }}
            >Leaderboard</Tab>
            <Tab
              borderBottom="5px solid #E2E8F0" 
              _selected={{ borderColor: '#0628A3', textColor: "#3A6693", fontWeight: 'bold' }}
            >Pre-Games</Tab>
          </TabList>     

          <TabPanels bgColor='none' borderRadius={'10'}>

            <TabPanel height={{base:'30em', sm: "40em"}}> 
              <Text
                fontSize = {{base: '20px',sm:'25px', md:'30px', lg:'40px'}}
                textAlign = 'center'
              >
                 Leadership Board:
              </Text>
            </TabPanel>
            
            <TabPanel height={{base:'30em', sm: "40em"}} >
            <Text
              fontSize = {{base: '25px',sm:'25px', md:'30px', lg:'40px'}}
              textAlign = 'center'
            >
               Access Pre-Game Instructions <br></br> PDF by clicking {''}
               <Link color='teal.500' href='https://www.youtube.com/' isExternal>
                 here
               </Link>
               .
              </Text>
            </TabPanel>

          </TabPanels>
        </Tabs>
        
        </Box>
        </Container>
        </Box> {/*For clouds box*/}
      </Box>
    );
  };
  
  export default HarvestGames;