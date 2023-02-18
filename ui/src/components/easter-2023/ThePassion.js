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
  } from '@chakra-ui/react';
  import { TriangleDownIcon } from '@chakra-ui/icons';
import { ArrowBackIcon } from '@chakra-ui/icons';
import ShareTestimonyButton from '../witness/text-testimony/ShareTestimonyButton';

  import { Fragment, useState } from 'react';
  import { Select } from '@chakra-ui/select';
  import { Route } from 'react-router-dom';

  
  const ThePassion = (props) => {
  
    //To do: implement navbar, menu and footer links to individual sections("our story", "vision mision" etc)
  
    return (
      <Container maxW="100%" p={0} m={0}>
         <Box
          bgImage={[
            `
          url('${process.env.PUBLIC_URL}/images/easter-2023/passion-squiggle.gif')`,
            ` 
          url('${process.env.PUBLIC_URL}/images/easter-2023/passion-squiggle.gif')`,
          ]}
          bgPosition="center"
          bgSize="cover"
          textAlign="center"
          justifyContent="center"
          pt={[20, 120]}
          pb={[10, 120]}
          m={0}
        >
          <Image
            mr="auto"
            ml="auto"
            src={process.env.PUBLIC_URL + '/images/easter-2023/title.png'}
            w={['40%', '20%']}
          />
          <Box m={[3, 0]} justifyContent="center">
            <Text
              textColor="rgba(255, 255, 255, 1)"
              fontWeight="bold"
              fontSize="24px"
              pb={4}
              pt={4}
            >
               <Image
            mr="auto"
            ml="auto"
            src={process.env.PUBLIC_URL + '/images/easter-2023/the-passion.png'}
            maxWidth={['90%', '80%']}
          />
            </Text>
            <Flex justifyContent="center">
              <VStack w={['80%', '50%']}>
                <Text
                  paddingTop = "5%"
                  textColor="rgba(255, 255, 255, 1)"
                  fontWeight="bold"
                  pb={3}
                  textStyle={'inter'}
                  as='i'
                  fontSize={['16px', '18px']}
                  
                >
                 This Passion week, we want to simply remember and commemorate Jesus’ passion that He 
                 showed through his sacrifice for us by dying on the cross, so that we can passionately live our 
                 lives for Him. It’s easy to be comfortable and complacent as we go day to day, but as Christ followers, as we have personally witnessed His passionate love for us, we want to be 
                 passionate witnesses of His Gospel to others around us. 
                </Text>
              </VStack>
            </Flex>
          </Box>
          <Image
            paddingTop = '5%'
            mr="auto"
            ml="auto"
            src={process.env.PUBLIC_URL + '/images/easter-2023/EASTER_2023.png'}
            w={['40%', '20%']}
          />
        </Box>
      </Container>
    );
  };
  

export default ThePassion;