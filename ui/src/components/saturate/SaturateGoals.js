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
  Center,
} from '@chakra-ui/react';
import { useState } from 'react';

const SaturateGoals = () => {
  const [outerRing1Hover, setouterRing1Hover] = useState(false);
  const [outerRing2Hover, setouterRing2Hover] = useState(false);
  const [outerRing3Hover, setouterRing3Hover] = useState(false);
  const [outerRing4Hover, setouterRing4Hover] = useState(false);

  const onOuterRing1 = (e) => {
    onDropHover();
    setouterRing1Hover(true);
  };

  const onOuterRing2 = (e) => {
    onDropHover();
    setouterRing2Hover(true);
  };

  const onOuterRing3 = (e) => {
    onDropHover();
    setouterRing3Hover(true);
  };

  const onOuterRing4 = (e) => {
    onDropHover();
    setouterRing4Hover(true);
  };

  const onDropHover = (e) => {
    setouterRing1Hover(false);
    setouterRing2Hover(false);
    setouterRing3Hover(false);
    setouterRing4Hover(false);
  };

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
      ></Container>
      <Container
        maxWidth="100%"
        my={5}
        p={0}
        overflow="clip"
        display={['none', 'block']}
      >
        <HStack>
          <VStack
            alignItems="center"
            justifyContent="space-evenly"
            width="35%"
            mt="10"
          >
            <Box>
              <Flex
                bgColor={outerRing4Hover ? '#0053A4' : '#D9D9D9'}
                onMouseOver={onOuterRing4}
                onMouseLeave={onDropHover}
                height={{ sm: '1.5em', md: '2.4em', lg: '2.8em' }}
                width={{ sm: '150%', lg: '130%' }}
                alignItems="center"
              >
                <Flex
                  bg="white"
                  borderColor={outerRing4Hover ? '#0053A4' : '#D9D9D9'}
                  borderWidth="5px"
                  borderRadius="50%"
                  justifyContent="center"
                  alignItems="center"
                  mr="0.4em"
                >
                  <Image
                    src={
                      process.env.PUBLIC_URL +
                      '/images/saturate/Saturate_Foundation.svg'
                    }
                    borderRadius="full"
                    m="2"
                    boxSize="3.5vw"
                  ></Image>
                </Flex>
                <Text
                  color="white"
                  fontSize={{ sm: '2.5vw', md: '3vw', lg: '3.4vw' }}
                  fontWeight="700"
                  fontFamily="DarkerGrotesque"
                >
                  FOUNDATIONS
                </Text>
              </Flex>
              <Box pl={{ sm: '3em', md: '4em', lg: '5em' }}>
                <UnorderedList
                  fontSize={{ sm: '1.2vw', md: '1.3vw', lg: '1.5vw' }}
                  fontFamily="Be-Vietnam"
                >
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
            <Box mt="4">
              <Flex
                bg={outerRing2Hover ? '#81B1E1' : '#D9D9D9'}
                onMouseOver={onOuterRing2}
                onMouseLeave={onDropHover}
                height={{ sm: '1.5em', md: '2.4em', lg: '2.8em' }}
                width={{ sm: '150%', lg: '130%' }}
                alignItems="center"
              >
                <Flex
                  bg="white"
                  borderColor={outerRing2Hover ? '#81B1E1' : '#D9D9D9'}
                  borderWidth="5px"
                  borderRadius="50%"
                  justifyContent="center"
                  alignItems="center"
                  mr="0.4em"
                >
                  <Image
                    src={
                      process.env.PUBLIC_URL +
                      '/images/saturate/Saturate_Link.svg'
                    }
                    borderRadius="full"
                    m="2"
                    boxSize="3.5vw"
                  ></Image>
                </Flex>
                <Text
                  color="white"
                  fontSize={{ sm: '2.5vw', md: '3vw', lg: '3.4vw' }}
                  fontWeight="700"
                  fontFamily="DarkerGrotesque"
                >
                  LINK UP
                </Text>
              </Flex>
              <Box pl={{ sm: '3em', md: '4em', lg: '5em' }}>
                <UnorderedList
                  fontSize={{ sm: '1.2vw', md: '1.3vw', lg: '1.5vw' }}
                  fontFamily="Be-Vietnam"
                >
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
          </VStack>
          <Box
            m="0"
            p="0"
            borderRadius="full"
            border="1.8vw solid white"
            onMouseEnter={onDropHover}
            onMouseLeave={onDropHover}
            style={{ shapeOutside: 'circle(50%)' }}
            float="left"
            bgColor="white"
            position="relative"
            zIndex="1"
          >
            <Box
              borderRadius="full"
              width="40vw"
              height="40vw"
              display="flex"
              onMouseEnter={onOuterRing1}
              onMouseLeave={onOuterRing1}
              justifyContent="center"
              alignItems="center"
              style={{
                shapeOutside: 'circle()',
                border: outerRing1Hover
                  ? '1.8vw solid #c3e0fd'
                  : '1.8vw solid #D9D9D9',
              }}
            >
              <Box
                borderRadius="full"
                width="34vw"
                height="34vw"
                display="flex"
                onMouseEnter={onOuterRing2}
                onMouseLeave={onOuterRing2}
                justifyContent="center"
                alignItems="center"
                style={{
                  shapeOutside: 'circle()',
                  border: outerRing2Hover
                    ? '1.8vw solid #81b1e1'
                    : '1.8vw solid #D9D9D9',
                }}
              >
                <Box
                  borderRadius="full"
                  width="28vw"
                  height="28vw"
                  display="flex"
                  onMouseEnter={onOuterRing3}
                  onMouseLeave={onOuterRing3}
                  justifyContent="center"
                  alignItems="center"
                  style={{
                    shapeOutside: 'circle()',
                    border: outerRing3Hover
                      ? '1.8vw solid #3b8ad7'
                      : '1.8vw solid #D9D9D9',
                  }}
                >
                  <Box
                    borderRadius="full"
                    width="22vw"
                    height="22vw"
                    display="flex"
                    onMouseEnter={onOuterRing4}
                    onMouseLeave={onOuterRing4}
                    alignItems="center"
                    justifyContent="center"
                    textAlign="center"
                    style={{
                      shapeOutside: 'circle()',
                      border: outerRing4Hover
                        ? '1.8vw solid #0053A4'
                        : '1.8vw solid #D9D9D9',
                    }}
                  >
                    <Text
                      fontSize="4.5vw"
                      color="#0053A4"
                      lineHeight="1em"
                      fontFamily="DarkerGrotesque"
                    >
                      THE
                      <br />
                      GOALS
                    </Text>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <VStack
            justifyContent="space-evenly"
            width="35%"
            pt={{ sm: '13vw', md: '12vw' }}
          >
            <Box mb={{ sm: '4', md: '9' }}>
              <Flex
                bg={outerRing3Hover ? '#3B8AD7' : '#D9D9D9'}
                onMouseOver={onOuterRing3}
                onMouseLeave={onDropHover}
                height={{ sm: '1.5em', md: '2.4em', lg: '2.8em' }}
                width={{ sm: '150%', md: '120%', lg: '140%', xl: '145%' }}
                ml={{ sm: '-50%', md: '-20%', lg: '-30%' }}
                alignItems="center"
                justifyContent="space-between"
              >
                <Text
                  color="white"
                  fontSize={{ sm: '2.5vw', md: '3vw', lg: '3.4vw' }}
                  fontWeight="700"
                  fontFamily="DarkerGrotesque"
                  pl={{ sm: '35%', md: '16%', lg: '18.7%' }}
                >
                  IMPACT
                </Text>
                <Flex
                  bg="white"
                  borderColor={outerRing3Hover ? '#3B8AD7' : '#D9D9D9'}
                  borderWidth="5px"
                  borderRadius="50%"
                  justifyContent="center"
                  alignItems="center"
                  pos="sticky"
                  right="0.4em"
                >
                  <Image
                    src={
                      process.env.PUBLIC_URL +
                      '/images/saturate/Saturate_Impact.svg'
                    }
                    orderRadius="full"
                    m="2"
                    boxSize="3.5vw"
                  ></Image>
                </Flex>
              </Flex>
              <Box pr="3.5em">
                <UnorderedList
                  fontSize={{ sm: '1.2vw', md: '1.3vw', lg: '1.5vw' }}
                  fontFamily="Be-Vietnam"
                >
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
            <Box pt="5">
              <Flex
                bg={outerRing1Hover ? '#C3E0FD' : '#D9D9D9'}
                onMouseOver={onOuterRing1}
                onMouseLeave={onDropHover}
                height={{ sm: '1.5em', md: '2.4em', lg: '2.8em' }}
                alignItems="center"
                justifyContent="space-between"
                width={{ sm: '150%', md: '120%', lg: '120%' }}
                ml={{ sm: '-50%', md: '-20%', lg: '-20%' }}
              >
                <Text
                  color={outerRing1Hover ? '#0053A4' : 'white'}
                  fontSize={{ sm: '2.5vw', md: '3vw', lg: '3.4vw' }}
                  fontWeight="700"
                  fontFamily="DarkerGrotesque"
                  pl={{ sm: '35%', md: '17%', lg: '17%' }}
                >
                  LAUNCH
                </Text>
                <Box
                  bg="white"
                  borderColor={outerRing1Hover ? '#C3E0FD' : '#D9D9D9'}
                  borderWidth="5px"
                  borderRadius="50%"
                  justifyContent="center"
                  alignItems="center"
                  pos="sticky"
                  right="0.4em"
                >
                  <Image
                    src={
                      process.env.PUBLIC_URL +
                      '/images/saturate/Saturate_Launch.svg'
                    }
                    borderRadius="full"
                    m="2"
                    boxSize="3.5vw"
                  ></Image>
                </Box>
              </Flex>
              <Box pr="3.5em">
                <UnorderedList
                  fontSize={{ sm: '1.2vw', md: '1.3vw', lg: '1.5vw' }}
                  fontFamily="Be-Vietnam"
                >
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
          </VStack>
        </HStack>
      </Container>
    </>
  );
};

export default SaturateGoals;
