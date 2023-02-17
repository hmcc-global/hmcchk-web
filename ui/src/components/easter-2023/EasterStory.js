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
  
  const EasterStory = () => {
    return (
        <VStack w="100%" spacing="3vw" py="3vw" paddingLeft = '10%' paddingRight = '10%' paddingBottom = '0'>
        <Box
          bgPosition="center"
          bgSize="cover"
        >
          <VStack px="3" py="6">
            <Heading
              as="h4"
              fontSize={{base:18,sm:20,md:25,lg:30}}
              align="center"
              color="#7B0D0D"
              fontWeight="bold"
              py={{base:2,sm:3,md:5,lg:6}}
            >
              Easter is the time where Christians all over the world gather to celebrate the resurrection of Jesus Christ.
            </Heading>

            <Heading
              as="h4"
              fontSize={{base:18,sm:20,md:25,lg:30}}
              align="center"
              color="#7B0D0D"
              fontWeight="bold"
              py={{base:2,sm:3,md:5,lg:6}}
            >
               Because of His passionate love for us, demonstrated through his death and resurrection on the cross, we can have love, joy, and greater freedom in our lives. 
            </Heading>

            <Heading
              as="h4"
              fontSize={{base:18,sm:20,md:25,lg:30}}
              align="center"
              color="#7B0D0D"
              fontWeight="bold"
              py={{base:2,sm:3,md:5,lg:6}}
            >
              We no longer have to be held down by the world, but we can look to Jesus who is our ultimate hope.
            </Heading>
          </VStack>
        </Box>
      </VStack>
    )
  }
  
 
  

export default EasterStory;