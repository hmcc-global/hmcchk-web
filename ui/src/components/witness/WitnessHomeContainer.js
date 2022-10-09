import React, { useState } from 'react';
import { Box, Container, Heading, HStack, Icon,Image, Tabs, Tab, TabPanel, TabPanels, TabList,Text, Button } from '@chakra-ui/react';
import { EditIcon, TriangleDownIcon } from '@chakra-ui/icons';
import { BsDot } from 'react-icons/bs'; 
import '@fontsource/dm-sans';

const WitnessHomeContainer = (props) => {
  return (
    <>
      <Container maxW="100%" m={0} p={0}>
        <Box
          bgImage={`linear-gradient(0deg, rgba(256, 256, 256), rgba(256, 256, 256, 0), rgba(256, 256, 256, 0), rgba(256, 256, 256, 0)), 
          url('${process.env.PUBLIC_URL}/images/witness/banner-desktop.png')`}
          bgPosition="center"
          bgSize="cover"
          textAlign="center"
          justifyContent="center"
          py={[8, 120]}
          m={0}
          width="100%"
          
        >
            <Image marginRight="auto" marginLeft="auto"
                src={process.env.PUBLIC_URL + '/images/witness/title.png'}
            />
          <Text textColor="rgba(255, 255, 255, 1)" fontWeight="bold" fontSize = "24px"  pb={4} paddingTop={4}>
            HMCC 2022 - 2023
          </Text>
          <Text textColor="rgba(255, 255, 255, 1)" fontWeight="300" pb={3} textStyle = {"dm_sans"}>
            The theme for HMCC 2022 - 2023 is Witness. As a church, it is our hope that our daily and personal <br /> witness for Jesus will translate into our passionate witness for Jesus to others around us.
          </Text>
          <Text textColor="rgba(255, 255, 255, 1)" fontWeight="300" color = "white" pb={7} >
            Throughout this year, we want to invite you to share your personal witness of Jesus here and <br  /> witness God's work in our church! Check out the different testimonies below!
          </Text>
          <TriangleDownIcon w="40px" h="40px" pb={4} color="#FFD6DC"/>
          <Text textColor="white" fontWeight="bold" fontSize = "24px"  marginBottom="15px" >
            HOW ARE YOU WITNESSING GOD?
          </Text>
          <Button borderRadius='md' bg='#8D2C72' color='white'h="66px" w={418.1} fontSize="24px">
             <EditIcon h={8} mr={4}/> Share your Testimony
          </Button>
        </Box>
      </Container>
      <Container maxW="100%" m={0} p={0}>
        <Box>
            <HStack marginTop={4} marginBottom={6} marginRight={4} margin spacing="auto">
                <Heading
                    size="md"
                    color="#7C26DB"
                    textStyle="dm_sans"
                    fontWeight={600}
                    fontSize={25}
                    pl={4}
                    display = "flex">
                HIGHLIGHT <BsDot />WATCH TESTIMONIES
          </Heading>
          <Button borderRadius='md'  color="#7C26DB" fontSize={20}  h={57} w={372} marginRight={4} display="md" variant="outline" border="2px" borderColor="#7C26DB" >
                WATCH ALL VIDEO TESTIMONIES
            </Button>
        </HStack>
       </Box>

    </Container>
    </>

  );
};

export default WitnessHomeContainer;