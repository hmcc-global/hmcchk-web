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
} from '@chakra-ui/react';

const SaturateGoals = () => {
  return (
    <Container maxW="100%" m={0} p={0}>
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
              <span style={{ color: '#0053A4', fontWeight: 'bold' }}> 75%</span>{' '}
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
              <span style={{ color: '#0053A4', fontWeight: 'bold' }}> 20 </span>{' '}
              Campus Microchurches
            </ListItem>
            <ListItem>
              <span style={{ color: '#0053A4', fontWeight: 'bold' }}> 14 </span>{' '}
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
                  process.env.PUBLIC_URL + '/images/saturate/Saturate_Link.svg'
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
              <span style={{ color: '#0053A4', fontWeight: 'bold' }}> 5 </span>{' '}
              Missional initiatives started by at least 5 different LGs
              collborating together to reach 5 different HK districts
            </ListItem>
            <ListItem>
              <span style={{ color: '#0053A4', fontWeight: 'bold' }}> 1 </span>{' '}
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
            <Text color="#0053A4" fontSize={['1.8em', '3em']} fontWeight="700">
              LAUNCH
            </Text>
          </Flex>
        </Box>
        <Box pl={['2.5em', '5em']}>
          <UnorderedList fontSize={['0.9em', '1.5em']}>
            <ListItem>
              <span style={{ color: '#0053A4', fontWeight: 'bold' }}> 1 </span>{' '}
              Transformational Hub
            </ListItem>
            <ListItem>
              <span style={{ color: '#0053A4', fontWeight: 'bold' }}> 1 </span>{' '}
              international church plant on or near a university campus in an
              Asian international city
            </ListItem>
          </UnorderedList>
        </Box>
      </Box>
    </Container>
  );
};

export default SaturateGoals;
