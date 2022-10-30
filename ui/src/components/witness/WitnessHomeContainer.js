import React from 'react';
import {
  Box,
  Container,
  Image,
  Text,
  VStack,
  Flex,
  Divider,
} from '@chakra-ui/react';
import { TriangleDownIcon } from '@chakra-ui/icons';
import WitnessHomeVideoSection from './home-sections/WitnessHomeVideoSection';
import WitnessHomeTextSection from './home-sections/WitnessHomeTextSection';
import ShareTestimonyButton from './text-testimony/ShareTestimonyButton';

const WitnessHomeContainer = (props) => {
  return (
    <>
      <Container maxW="100%" m={0} p={0}>
        <Box
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
        </Box>
      </Container>
      <Container maxW="100%" p={[0, 10]} centerContent>
        <WitnessHomeVideoSection />
        <Divider
          orientation="horizontal"
          my={10}
          w="25%"
          height="3px"
          backgroundColor="#DAC7BC"
        />
        <WitnessHomeTextSection />
      </Container>
      <Container
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
      </Container>
    </>
  );
};

export default WitnessHomeContainer;
