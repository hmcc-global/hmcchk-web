import React from 'react';
import {
  Box,
  Container,
  Image,
  Text,
  VStack,
  Flex,
  useDisclosure,
} from '@chakra-ui/react';
import { TriangleDownIcon } from '@chakra-ui/icons';
import WitnessHomeVideoSection from './home-sections/WitnessHomeVideoSection';
import ShareTestimonyButton from './text-testimony/ShareTestimonyButton';

const WitnessHomeContainer = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
          pt={[20, 120]}
          pb={[10, 20]}
          m={0}
          width="100%"
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
              <Box w={['90%', '60%']}>
                <ShareTestimonyButton
                  onOpen={onOpen}
                  isOpen={isOpen}
                  onClose={onClose}
                />
              </Box>
            </Flex>
          </Box>
        </Box>
      </Container>
      <Container maxW="100%" p={[0, 10]} centerContent>
        <WitnessHomeVideoSection />
      </Container>
    </>
  );
};

export default WitnessHomeContainer;
