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
    Fade,
    useBoolean,
    useDisclosure,
    ScaleFade,
  } from '@chakra-ui/react';

import React,{useRef} from "react";


  import {useInViewport} from 'react-in-viewport';
  import { AnimationOnScroll } from 'react-animation-on-scroll';

  const EasterStory = () => {
    const { isOpen, onToggle } = useDisclosure()
    const ref = useRef(null);
    const ref2 = useRef(null);
    const{enterCount} = useInViewport(
        ref,
        {rootMargin: "-300px"},
        {disconnectOnLeave: false},
        {}
    );
   
    return (
        <VStack w="100%" spacing="3vw" py="3vw" paddingLeft = '10%' paddingRight = '10%' paddingBottom = '0'>
        <Box
          bgPosition="center"
          bgSize="cover"
        >
          <VStack px="3" py="6">
            <Text
                textStyle={'playfair_display'}
                textColor="#FF3E02"
                fontWeight="1000"
                lineHeight="110%"
                fontSize={['30px', '60px']}
                marginBottom="15px"
                textAlign="center"
                paddingTop = {['10','4']}
              >
                EASTER
            </Text>
            <Box>
                <Heading
                as="h4"
                fontSize={{base:18,sm:20,md:25,lg:30}}
                align="center"
                color="#7B0D0D"
                fontWeight="bold"
                py={{base:2,sm:3,md:5,lg:6}}
                >
                <Text >
                Easter is the time where Christians all over the world gather to celebrate the 
                <Text
                paddingLeft = '3'
                paddingBottom = '5'
                display= 'inline-block'
                bgRepeat = 'no-repeat'
                bgSize='100%'
                bgImage={ ` 
                url('${process.env.PUBLIC_URL}/images/easter-2023/jesus-christ.png')`}
                >resurrection of Jesus Christ.</Text>
                </Text>
                
                </Heading>
            </Box>
            <Box >
                <Heading
                as="h4"
                fontSize={{base:18,sm:20,md:25,lg:30}}
                align="center"
                color="#7B0D0D"
                fontWeight="bold"
                py={{base:2,sm:3,md:5,lg:6}}
                >
                 
                <Text >
                Because of His passionate love for us, demonstrated through his death and resurrection on the cross, we can have
                <Text
                paddingLeft = '3'
                paddingBottom = '5'
                display= 'inline-block'
                bgRepeat = 'no-repeat'
                bgSize='100%'
                bgImage={ ` 
                url('${process.env.PUBLIC_URL}/images/easter-2023/greater-freedom.png')`}
                >love, joy, and greater freedom in our lives. </Text>
                </Text>
                </Heading>
            </Box>
      
           
            <Heading
              as="h4"
              fontSize={{base:18,sm:20,md:25,lg:30}}
              align="center"
              color="#7B0D0D"
              fontWeight="bold"
              py={{base:2,sm:3,md:5,lg:6}}
            >
              
              <Text >
              We no longer have to be held down by the world, but we can look to Jesus
                <Text
                paddingLeft = '3'
                paddingBottom = '5'
                display= 'inline-block'
                bgRepeat = 'no-repeat'
                bgSize='100%'
                bgImage={ ` 
                url('${process.env.PUBLIC_URL}/images/easter-2023/our-ultimate-hope.png')`}
                >who is our ultimate hope. </Text>
                </Text>
            </Heading>
          </VStack>
        </Box>
      </VStack>
    )
  }
  
 
  

export default EasterStory;