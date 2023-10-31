import React from 'react';
import {
  Box,
  Container,
  Image,
  Text,
  VStack,
  Flex,
  Divider,
  UnorderedList,
  ListItem,
  GridItem,
  HStack,
  Grid,
  Stack,
} from '@chakra-ui/react';

const SaturateGoals = () => {
  return (
    <>
      <Container maxW="100%" m={0} p={0} display={['block', 'none']}>
        <Flex justifyContent="flex-end" alignItems="center" mb="0.8em">
          <Box>
            <Text
              color="#0053A4"
              fontSize={['1.5em', '3em']}
              fontWeight="bold"
              lineHeight="1em"
            >
              THE <br /> GOALS
            </Text>
          </Box>
          <Image
            src={process.env.PUBLIC_URL + '/images/saturate/Saturate_Ring.svg'}
            ml="0.5em"
            boxSize={['3em', '10em']}
          ></Image>
        </Flex>
        <Box mb="2em">
          <Box bg="#0053A4" height={['2.5em', '4em']} mb="1em" pl="0.5em">
            <Flex>
              <Box
                bg="white"
                borderColor="#0053A4"
                borderWidth="5px"
                borderRadius="50%"
                width={['50px', '100px']}
                height={['50px', '100px']}
                position="relative"
                transform="translateY(-10%)"
                display="flex"
                justifyContent="center"
                alignItems="center"
                mr="0.4em"
              >
                <Image
                  src={
                    process.env.PUBLIC_URL +
                    '/images/saturate/Saturate_Foundation.svg'
                  }
                  boxSize={['2em', '4em']}
                ></Image>
              </Box>
              <Text color="white" fontSize={['1.8em', '3em']} fontWeight="700">
                FOUNDATIONS
              </Text>
            </Flex>
          </Box>
          <Box pl={['2.5em', '5em']}>
            <UnorderedList fontSize={['0.9em', '1.5em']}>
              <ListItem>
                <span style={{ color: '#0053A4', fontWeight: 'bold' }}>
                  {' '}
                  80%{' '}
                </span>{' '}
                of our members going through the DMF Curriculum.
              </ListItem>
              <ListItem>
                <span style={{ color: '#0053A4', fontWeight: 'bold' }}>
                  {' '}
                  75%
                </span>{' '}
                of our members discipling 1 other person
              </ListItem>
            </UnorderedList>
          </Box>
        </Box>
        <Box mb="2em">
          <Box bg="#3B8AD7" height={['2.5em', '4em']} mb="1em" pl="0.5em">
            <Flex>
              <Box
                bg="white"
                borderColor="#3B8AD7"
                borderWidth="5px"
                borderRadius="50%"
                width={['50px', '100px']}
                height={['50px', '100px']}
                position="relative"
                transform="translateY(-10%)"
                display="flex"
                justifyContent="center"
                alignItems="center"
                mr="0.4em"
              >
                <Image
                  src={
                    process.env.PUBLIC_URL +
                    '/images/saturate/Saturate_Impact.svg'
                  }
                  boxSize={['2em', '4em']}
                ></Image>
              </Box>
              <Text color="white" fontSize={['1.8em', '3em']} fontWeight="700">
                IMPACT
              </Text>
            </Flex>
          </Box>
          <Box pl={['2.5em', '5em']}>
            <UnorderedList fontSize={['0.9em', '1.5em']}>
              <ListItem>
                <span style={{ color: '#0053A4', fontWeight: 'bold' }}>
                  {' '}
                  20{' '}
                </span>{' '}
                Campus Microchurches
              </ListItem>
              <ListItem>
                <span style={{ color: '#0053A4', fontWeight: 'bold' }}>
                  {' '}
                  14{' '}
                </span>{' '}
                City Microchurches
              </ListItem>
            </UnorderedList>
          </Box>
        </Box>
        <Box mb="2em">
          <Box bg="#81B1E1" height={['2.5em', '4em']} mb="1em" pl="0.5em">
            <Flex>
              <Box
                bg="white"
                borderColor="#81B1E1"
                borderWidth="5px"
                borderRadius="50%"
                width={['50px', '100px']}
                height={['50px', '100px']}
                position="relative"
                transform="translateY(-10%)"
                display="flex"
                justifyContent="center"
                alignItems="center"
                mr="0.4em"
              >
                <Image
                  src={
                    process.env.PUBLIC_URL +
                    '/images/saturate/Saturate_Link.svg'
                  }
                  boxSize={['2em', '4em']}
                ></Image>
              </Box>
              <Text color="white" fontSize={['1.8em', '3em']} fontWeight="700">
                LINK UP
              </Text>
            </Flex>
          </Box>
          <Box pl={['2.5em', '5em']}>
            <UnorderedList fontSize={['0.9em', '1.5em']}>
              <ListItem>
                <span style={{ color: '#0053A4', fontWeight: 'bold' }}>
                  {' '}
                  5{' '}
                </span>{' '}
                Missional initiatives started by at least 5 different LGs
                collborating together to reach 5 different HK districts
              </ListItem>
              <ListItem>
                <span style={{ color: '#0053A4', fontWeight: 'bold' }}>
                  {' '}
                  1{' '}
                </span>{' '}
                church site in another district
              </ListItem>
            </UnorderedList>
          </Box>
        </Box>
        <Box mb="2em">
          <Box bg="#C3E0FD" height={['2.5em', '4em']} mb="1em" pl="0.5em">
            <Flex>
              <Box
                bg="white"
                borderColor="#C3E0FD"
                borderWidth="5px"
                borderRadius="50%"
                width={['50px', '100px']}
                height={['50px', '100px']}
                position="relative"
                transform="translateY(-10%)"
                display="flex"
                justifyContent="center"
                alignItems="center"
                mr="0.4em"
              >
                <Image
                  src={
                    process.env.PUBLIC_URL +
                    '/images/saturate/Saturate_Launch.svg'
                  }
                  boxSize={['2em', '4em']}
                ></Image>
              </Box>
              <Text
                color="#0053A4"
                fontSize={['1.8em', '3em']}
                fontWeight="700"
              >
                LAUNCH
              </Text>
            </Flex>
          </Box>
          <Box pl={['2.5em', '5em']}>
            <UnorderedList fontSize={['0.9em', '1.5em']}>
              <ListItem>
                <span style={{ color: '#0053A4', fontWeight: 'bold' }}>
                  {' '}
                  1{' '}
                </span>{' '}
                Transformational Hub
              </ListItem>
              <ListItem>
                <span style={{ color: '#0053A4', fontWeight: 'bold' }}>
                  {' '}
                  1{' '}
                </span>{' '}
                international church plant on or near a university campus in an
                Asian international city
              </ListItem>
            </UnorderedList>
          </Box>
        </Box>
      </Container>
      <Container
        maxW="100%"
        overflow="hidden"
        m={0}
        p={0}
        position="relative"
        display={['none', 'none', 'block', 'block', 'block']}
      >
        {/* <Box
          position="absolute"
          zIndex={20}
          top={['100px', '100px', '320px', '320px']}
          width="90%"
        >
          <Box mb="1em">
            <Box
              bg="#0053A4"
              height={['2.5em', '2.8em']}
              mb="1em"
              pl="0.5em"
              width="97%"
            >
              <Flex>
                <Box
                  bg="white"
                  borderColor="#0053A4"
                  borderWidth="5px"
                  borderRadius="50%"
                  width={['50px', '80px']}
                  height={['50px', '80px']}
                  position="relative"
                  transform="translateY(-10%)"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  mr="0.4em"
                >
                  <Image
                    src={
                      process.env.PUBLIC_URL +
                      '/images/saturate/Saturate_Foundation.svg'
                    }
                    boxSize={['2em', '3.0em']}
                  ></Image>
                </Box>
                <Text
                  color="white"
                  fontSize={['1.8em', '2em']}
                  fontWeight="700"
                >
                  FOUNDATIONS
                </Text>
              </Flex>
            </Box>
            <Box pl={['2.5em', '5em']}>
              <UnorderedList fontSize={['0.9em', '1.3em']}>
                <ListItem>
                  <span style={{ color: '#0053A4', fontWeight: 'bold' }}>
                    {' '}
                    80%{' '}
                  </span>{' '}
                  of our members going through the DMF Curriculum.
                </ListItem>
                <ListItem>
                  <span style={{ color: '#0053A4', fontWeight: 'bold' }}>
                    {' '}
                    75%
                  </span>{' '}
                  of our members discipling 1 other person
                </ListItem>
              </UnorderedList>
            </Box>
          </Box>
          <Box mb="1em">
            <Box
              bg="#3B8AD7"
              height={['2.5em', '2.8em']}
              mb="1em"
              pl="0.5em"
              width="77%"
            >
              <Flex>
                <Box
                  bg="white"
                  borderColor="#3B8AD7"
                  borderWidth="5px"
                  borderRadius="50%"
                  width={['50px', '80px']}
                  height={['50px', '80px']}
                  position="relative"
                  transform="translateY(-10%)"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  mr="0.4em"
                >
                  <Image
                    src={
                      process.env.PUBLIC_URL +
                      '/images/saturate/Saturate_Impact.svg'
                    }
                    boxSize={['2em', '3em']}
                  ></Image>
                </Box>
                <Text
                  color="white"
                  fontSize={['1.8em', '2em']}
                  fontWeight="700"
                >
                  IMPACT
                </Text>
              </Flex>
            </Box>
            <Box pl={['2.5em', '5em']}>
              <UnorderedList fontSize={['0.9em', '1.3em']}>
                <ListItem>
                  <span style={{ color: '#0053A4', fontWeight: 'bold' }}>
                    {' '}
                    20{' '}
                  </span>{' '}
                  Campus Microchurches
                </ListItem>
                <ListItem>
                  <span style={{ color: '#0053A4', fontWeight: 'bold' }}>
                    {' '}
                    14{' '}
                  </span>{' '}
                  City Microchurches
                </ListItem>
              </UnorderedList>
            </Box>
          </Box>
          <Box mb="1em">
            <Box
              bg="#81B1E1"
              height={['2.5em', '2.8em']}
              mb="1em"
              pl="0.5em"
              width="70%"
            >
              <Flex>
                <Box
                  bg="white"
                  borderColor="#81B1E1"
                  borderWidth="5px"
                  borderRadius="50%"
                  width={['50px', '80px']}
                  height={['50px', '80px']}
                  position="relative"
                  transform="translateY(-10%)"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  mr="0.4em"
                >
                  <Image
                    src={
                      process.env.PUBLIC_URL +
                      '/images/saturate/Saturate_Link.svg'
                    }
                    boxSize={['2em', '3em']}
                  ></Image>
                </Box>
                <Text
                  color="white"
                  fontSize={['1.8em', '2em']}
                  fontWeight="700"
                >
                  LINK UP
                </Text>
              </Flex>
            </Box>
            <Box pl={['2.5em', '5em']} width="75%">
              <UnorderedList fontSize={['0.9em', '1.3em']}>
                <ListItem>
                  <span style={{ color: '#0053A4', fontWeight: 'bold' }}>
                    {' '}
                    5{' '}
                  </span>{' '}
                  Missional initiatives started by at least 5 different LGs
                  collborating together to reach 5 different HK districts
                </ListItem>
                <ListItem>
                  <span style={{ color: '#0053A4', fontWeight: 'bold' }}>
                    {' '}
                    1{' '}
                  </span>{' '}
                  church site in another district
                </ListItem>
              </UnorderedList>
            </Box>
          </Box>
          <Box mb="1em">
            <Box
              bg="#C3E0FD"
              height={['2.5em', '2.8em']}
              mb="1em"
              pl="0.5em"
              width="65%"
            >
              <Flex>
                <Box
                  bg="white"
                  borderColor="#C3E0FD"
                  borderWidth="5px"
                  borderRadius="50%"
                  width={['50px', '80px']}
                  height={['50px', '80px']}
                  position="relative"
                  transform="translateY(-10%)"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  mr="0.4em"
                >
                  <Image
                    src={
                      process.env.PUBLIC_URL +
                      '/images/saturate/Saturate_Launch.svg'
                    }
                    boxSize={['2em', '3em']}
                  ></Image>
                </Box>
                <Text
                  color="#0053A4"
                  fontSize={['1.8em', '2em']}
                  fontWeight="700"
                >
                  LAUNCH
                </Text>
              </Flex>
            </Box>
            <Box pl={['2.5em', '5em']}>
              <UnorderedList fontSize={['0.9em', '1.3em']}>
                <ListItem>
                  <span style={{ color: '#0053A4', fontWeight: 'bold' }}>
                    {' '}
                    1{' '}
                  </span>{' '}
                  Transformational Hub
                </ListItem>
                <ListItem>
                  <span style={{ color: '#0053A4', fontWeight: 'bold' }}>
                    {' '}
                    1{' '}
                  </span>{' '}
                  international church plant on or near a university campus in
                  an Asian international city
                </ListItem>
              </UnorderedList>
            </Box>
          </Box>
        </Box> */}
        {/* <Box overflow="hidden">
          <Box
            borderRadius="50%"
            width={['600px', '800px', '1000px', '1200px']}
            height={['600px', '800px', '1000px', '1200px']}
            display="flex"
            justifyContent="center"
            alignItems="center"
            border="55px solid #c3e0fd"
            position="relative"
            float="right"
            left="500px"
          >
            <Box
              borderRadius="50%"
              width={['400px', '600px', '800px', '1000px']}
              height={['400px', '600px', '800px', '1000px']}
              display="flex"
              justifyContent="center"
              alignItems="center"
              border="55px solid #81b1e1"
            >
              <Box
                borderRadius="50%"
                border="55px solid #3b8ad7"
                width={['200px', '400px', '600px', '800px']}
                height={['200px', '400px', '600px', '800px']}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Box
                  borderRadius="50%"
                  border="55px solid #0053A4"
                  width={['100px', '200px', '400px', '600px']}
                  height={['100px', '200px', '400px', '600px']}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text
                    fontWeight="800"
                    fontSize={['0.8em', '1.5em', '2.5em', '3.5em']}
                    textAlign="right"
                    color="#0053A4"
                    position="relative"
                    right={['100px', '60px', '80px', '100px']}
                    lineHeight="1em"
                  >
                    The
                    <br />
                    Goals
                  </Text>
                </Box>
              </Box>
            </Box>
          </Box> */}
        {/* </Box> */}
      </Container>
      <Container maxWidth="100%" m={0} p={0}>
        <Flex>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="space-evenly"
          >
            <Box>
              <Box bg="#0053A4" height={['2.5em', '2.8em']} mb="1em" pl="0.5em">
                <Flex>
                  <Box
                    bg="white"
                    borderColor="#0053A4"
                    borderWidth="5px"
                    borderRadius="50%"
                    width={['50px', '80px']}
                    height={['50px', '80px']}
                    position="relative"
                    transform="translateY(-10%)"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    mr="0.4em"
                  >
                    <Image
                      src={
                        process.env.PUBLIC_URL +
                        '/images/saturate/Saturate_Foundation.svg'
                      }
                      boxSize={['2em', '3em']}
                    ></Image>
                  </Box>
                  <Text
                    color="white"
                    fontSize={['1.8em', '2em']}
                    fontWeight="700"
                  >
                    FOUNDATIONS
                  </Text>
                </Flex>
              </Box>
              <Box pl={['2.5em', '5em']}>
                <UnorderedList fontSize={['0.9em', '1.3em']}>
                  <ListItem>
                    <span style={{ color: '#0053A4', fontWeight: 'bold' }}>
                      {' '}
                      80%{' '}
                    </span>{' '}
                    of our members going through the DMF Curriculum.
                  </ListItem>
                  <ListItem>
                    <span style={{ color: '#0053A4', fontWeight: 'bold' }}>
                      {' '}
                      75%
                    </span>{' '}
                    of our members discipling 1 other person
                  </ListItem>
                </UnorderedList>
              </Box>
            </Box>
            <Box>
              <Box bg="#81B1E1" height={['2.5em', '2.8em']} mb="1em" pl="0.5em">
                <Flex>
                  <Box
                    bg="white"
                    borderColor="#81B1E1"
                    borderWidth="5px"
                    borderRadius="50%"
                    width={['50px', '80px']}
                    height={['50px', '80px']}
                    position="relative"
                    transform="translateY(-10%)"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    mr="0.4em"
                  >
                    <Image
                      src={
                        process.env.PUBLIC_URL +
                        '/images/saturate/Saturate_Link.svg'
                      }
                      boxSize={['2em', '3em']}
                    ></Image>
                  </Box>
                  <Text
                    color="white"
                    fontSize={['1.8em', '2em']}
                    fontWeight="700"
                  >
                    LINK UP
                  </Text>
                </Flex>
              </Box>
              <Box pl={['2.5em', '5em']}>
                <UnorderedList fontSize={['0.9em', '1.3em']}>
                  <ListItem>
                    <span style={{ color: '#0053A4', fontWeight: 'bold' }}>
                      {' '}
                      5{' '}
                    </span>{' '}
                    Missional initiatives started by at least 5 different LGs
                    collborating together to reach 5 different HK districts
                  </ListItem>
                  <ListItem>
                    <span style={{ color: '#0053A4', fontWeight: 'bold' }}>
                      {' '}
                      1{' '}
                    </span>{' '}
                    church site in another district
                  </ListItem>
                </UnorderedList>
              </Box>
            </Box>
          </Box>
          <Box
            m="0"
            p="0"
            style={{ shapeOutside: 'circle(50%)' }}
            float="left"
            position="relative"
          >
            <Box
              borderRadius="50%"
              width="600px"
              height="600px"
              display="flex"
              justifyContent="center"
              alignItems="center"
              border="30px solid #c3e0fd"
              style={{ shapeOutside: 'circle()' }}
            >
              <Box
                borderRadius="50%"
                width="500px"
                height="500px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                border="30px solid #81b1e1"
                style={{ shapeOutside: 'circle()' }}
              >
                <Box
                  borderRadius="50%"
                  border="30px solid #3b8ad7"
                  width="400px"
                  height="400px"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  style={{ shapeOutside: 'circle()' }}
                >
                  <Box
                    borderRadius="50%"
                    border="30px solid #0053A4"
                    width="300px"
                    height="300px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    style={{ shapeOutside: 'circle()' }}
                  >
                    <Text
                      fontWeight="800"
                      fontSize={['0.8em', '1.5em', '2.5em', '3.5em']}
                      color="#0053A4"
                      lineHeight="1em"
                    >
                      The
                      <br />
                      Goals
                    </Text>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <Flex>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="space-evenly"
            >
              <Box>
                <Box
                  bg="#3B8AD7"
                  height={['2.5em', '2.8em']}
                  mb="1em"
                  pl="0.5em"
                >
                  <Flex justifyContent="space-between">
                    <Text
                      color="white"
                      fontSize={['1.8em', '2em']}
                      fontWeight="700"
                    >
                      IMPACT
                    </Text>
                    <Box
                      bg="white"
                      borderColor="#3B8AD7"
                      borderWidth="5px"
                      borderRadius="50%"
                      width={['50px', '80px']}
                      height={['50px', '80px']}
                      position="relative"
                      transform="translateY(-10%)"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      mr="0.4em"
                    >
                      <Image
                        src={
                          process.env.PUBLIC_URL +
                          '/images/saturate/Saturate_Impact.svg'
                        }
                        boxSize={['2em', '3em']}
                      ></Image>
                    </Box>
                  </Flex>
                </Box>
                <Box pr="3.5em">
                  <UnorderedList fontSize={['0.9em', '1.3em']}>
                    <ListItem>
                      <span style={{ color: '#0053A4', fontWeight: 'bold' }}>
                        {' '}
                        20{' '}
                      </span>{' '}
                      Campus Microchurches
                    </ListItem>
                    <ListItem>
                      <span style={{ color: '#0053A4', fontWeight: 'bold' }}>
                        {' '}
                        14{' '}
                      </span>{' '}
                      City Microchurches
                    </ListItem>
                  </UnorderedList>
                </Box>
              </Box>
              <Box>
                <Box
                  bg="#C3E0FD"
                  height={['2.5em', '2.8em']}
                  mb="1em"
                  pl="0.5em"
                >
                  <Flex justifyContent="space-between">
                    <Text
                      color="#0053A4"
                      fontSize={['1.8em', '2em']}
                      fontWeight="700"
                    >
                      LAUNCH
                    </Text>
                    <Box
                      bg="white"
                      borderColor="#C3E0FD"
                      borderWidth="5px"
                      borderRadius="50%"
                      width={['50px', '80px']}
                      height={['50px', '80px']}
                      position="relative"
                      transform="translateY(-10%)"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      mr="0.4em"
                    >
                      <Image
                        src={
                          process.env.PUBLIC_URL +
                          '/images/saturate/Saturate_Launch.svg'
                        }
                        boxSize={['2em', '3em']}
                      ></Image>
                    </Box>
                  </Flex>
                </Box>
                <Box pr="3.5em">
                  <UnorderedList fontSize={['0.9em', '1.3em']}>
                    <ListItem>
                      <span style={{ color: '#0053A4', fontWeight: 'bold' }}>
                        {' '}
                        1{' '}
                      </span>{' '}
                      Transformational Hub
                    </ListItem>
                    <ListItem>
                      <span style={{ color: '#0053A4', fontWeight: 'bold' }}>
                        {' '}
                        1{' '}
                      </span>{' '}
                      international church plant on or near a university campus
                      in an Asian international city
                    </ListItem>
                  </UnorderedList>
                </Box>
              </Box>
            </Box>
          </Flex>
        </Flex>
      </Container>
    </>
  );
};

export default SaturateGoals;
