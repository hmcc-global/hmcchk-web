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
import WitnessHomeVideoSection from './home-sections/WitnessHomeVideoSection';
import WitnessHomeTextSection from './home-sections/WitnessHomeTextSection';
import ShareTestimonyButton from './text-testimony/ShareTestimonyButton';
import EasterHomeTextSection from './home-sections/EasterHomeTextSection';

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
          </Box>
        </Box>
      </Container>
      <Container maxW="100%" p={[0, 10]} centerContent>
        <EasterHomeTextSection />
        <Divider
          orientation="horizontal"
          my={10}
          w="25%"
          height="3px"
          backgroundColor="#DAC7BC"
        />
      </Container>
      <Text
        textStyle={'dm_sans'}
        textColor="#000000"
        fontWeight="bold"
        fontSize={['20px', '24px']}
        marginBottom="15px"
      >
        HOW ARE YOU WITNESSING GOD?
      </Text>
      <Flex justifyContent="center">
        <Box w={['90%', '100%']}>
          <ShareTestimonyButton />
        </Box>
      </Flex>
      <WitnessHomeVideoSection />
      <Divider
        orientation="horizontal"
        my={10}
        w="25%"
        height="3px"
        backgroundColor="#DAC7BC"
      />
      <WitnessHomeTextSection />
    </>
  );
};

export default WitnessHomeContainer;
