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
// import { TriangleDownIcon } from '@chakra-ui/icons';
// import WitnessHomeVideoSection from './home-sections/WitnessHomeVideoSection';
// import WitnessHomeTextSection from './home-sections/WitnessHomeTextSection';
// import ShareTestimonyButton from './text-testimony/ShareTestimonyButton';

const WitnessHomeContainer = (props) => {
  return (
    <>
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

      <Container maxW="100%" m={0} p={0}>
        {/* <Box
          bgImage={[
            `linear-gradient(0deg, rgba(256, 256, 256), rgba(256, 256, 256, 0), rgba(256, 256, 256, 0), rgba(256, 256, 256, 0)), 
          url('${process.env.PUBLIC_URL}/images/witness/banner-home-mobile.png')`,
            `linear-gradient(0deg, rgba(256, 256, 256), rgba(256, 256, 256, 0), rgba(256, 256, 256, 0), rgba(256, 256, 256, 0)), 
          url('${process.env.PUBLIC_URL}/images/witness/banner-home-desktop.png')`,
          ]}
          bgPosition="center"
          bgSize="cover"
          textAlign="center"
          justifyContent="center"
          pt={[20, 120]}
          pb={[10, 20]}
          m={0}
        >
          <Image
            mr="auto"
            ml="auto"
            src={process.env.PUBLIC_URL + '/images/witness/title.png'}
            w={['80%', '50%']}
          />
          <Box m={[8, 0]} justifyContent="center">
            <Text
              textColor="rgba(255, 255, 255, 1)"
              fontWeight="bold"
              fontSize="24px"
              pb={4}
              pt={4}
            >
              HMCC 2022 - 2023
            </Text>
            <Flex justifyContent="center">
              <VStack w={['100%', '50%']}>
                <Text
                  textColor="rgba(255, 255, 255, 1)"
                  fontWeight="300"
                  pb={3}
                  textStyle={'dm_sans'}
                >
                  The theme for HMCC 2022 - 2023 is Witness. As a church, it is
                  our hope that our daily and personal witness for Jesus will
                  translate into our passionate witness for Jesus to others
                  around us.
                </Text>
                <Text
                  textColor="rgba(255, 255, 255, 1)"
                  fontWeight="300"
                  color="white"
                  pb={7}
                  textStyle={'dm_sans'}
                >
                  Throughout this year, we want to invite you to share your
                  personal witness of Jesus here and witness God's work in our
                  church! Check out the different testimonies below!
                </Text>
              </VStack>
            </Flex>
            <TriangleDownIcon w="40px" h="40px" pb={4} color="#FFD6DC" />
            <Text
              textStyle={'dm_sans'}
              textColor="white"
              fontWeight="bold"
              fontSize="24px"
              marginBottom="15px"
            >
              HOW ARE YOU WITNESSING GOD?
            </Text>
            <Flex justifyContent="center">
              <Box w={['90%', '30%']}>
                <ShareTestimonyButton />
              </Box>
            </Flex>
          </Box>
        </Box> */}
      </Container>
      {/* <Container maxW="100%" overflow="hidden" m={0} p={0}>
        <Box display="flex" z-index="20" position="relative">
          <Box bg="#0053A4">
            <Text>
              Hello Testing nvjajvnajvjadnvajvnjj anfjenfakeknakjafenfeakn naj
            </Text>
          </Box>
        </Box>
        <Box
          width="60em"
          height="60em"
          position="relative"
          borderRadius="50%"
          boxShadow="inset 0 0 0 3em #c3e0fd, inset 0 0 0 5em #fff,
          inset 0 0 0 8em #81b1e1, inset 0 0 0 10em #fff, inset 0 0 0 13em #3b8ad7,
          inset 0 0 0 15em #fff, inset 0 0 0 18em #0a6ebd;"
          display="flex"
          justifyContent="center"
          alignItems="center"
          z-index="-1"
        >
          <Text
            position="relative"
            right="60px"
            fontWeight="900"
            fontSize="3.5em"
            textAlign="right"
            color="#0053A4"
          >
            The
            <br />
            Goals
          </Text>
        </Box>
      </Container> */}

      <Container maxW="100%" p={[0, 10]} centerContent>
        {/* <WitnessHomeVideoSection />
        <Divider
          orientation="horizontal"
          my={10}
          w="25%"
          height="3px"
          backgroundColor="#DAC7BC"
        />
        <WitnessHomeTextSection /> */}
      </Container>
      {/* <Container
        maxW="container.sm"
        my={10}
        centerContent
        alignItems="center"
        justifyContent="center"
      >
        <Text
          textStyle={'dm_sans'}
          textColor="#8D2C72"
          fontWeight="bold"
          fontSize={['20px', '24px']}
          textAlign="center"
        >
          HOW ARE YOU WITNESSING GOD?
        </Text>
        <Flex justifyContent="center" w={['90%', '70%']}>
          <ShareTestimonyButton />
        </Flex>
      </Container> */}
    </>
  );
};

export default WitnessHomeContainer;
