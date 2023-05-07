import React from 'react';
import {
  Box,
  Button,
  Container,
  Image,
  Text,
  VStack,
  Flex,
  Divider,
  Link,
} from '@chakra-ui/react';
import { TriangleDownIcon } from '@chakra-ui/icons';
import WitnessHomeVideoSection from './home-sections/WitnessHomeVideoSection';
import WitnessHomeTextSection from './home-sections/WitnessHomeTextSection';
import ShareTestimonyButton from './text-testimony/ShareTestimonyButton';
import CuratorWidget from './CuratorWidget';

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
        <Divider
            orientation="horizontal"
            my={7}
            w="25%"
            height="3px"
            backgroundColor="#DAC7BC"
            mx="auto"
          />
        <Box
          textAlign="center"
          textStyle="dm_sans_bold"
          fontSize={{ sm: '20px', md: '30px', lg: '40px' }}
          my={5}
        >
          <Text textColor="#E60053" fontSize={[25, 40]}>
            #2023WitnessJesus Testimony Campaign
          </Text>
          <Button
            borderRadius={[5, 10]}
            background="linear-gradient(109.54deg, #FF4F50 11.11%, #D33E68 57.55%, #BD3381 95.53%)"
            textColor="#FFFFFF"
            fontWeight="700"
            fontFamily="Inter"
            height={['45px', '40px']}
            fontSize={['xs', 'sm', 'lg']}
            as={Link}
            href="https://www.instagram.com/hmcc_hk/"
            _hover="none"
            target="_blank"
            mt={5}
            mr={5}
          >
            Follow @hmcc_hk
          </Button>
          <Button
            borderRadius={[5, 10]}
            background="linear-gradient(109.54deg, #AB3D8C 11.11%, #BD3381 57.55%, #D33E68 95.53%)"
            textColor="#FFFFFF"
            fontWeight="700"
            fontFamily="Inter"
            height={['45px', '40px']}
            fontSize={['xs', 'sm', 'lg']}
            as={Link}
            href="https://www.instagram.com/explore/tags/2023witnessjesus/"
            _hover="none"
            target="_blank"
            mt={5}
          >
            View the Campaign
          </Button>
          <Box
            paddingTop={['8%', '5%', '5%']}
            // paddingLeft={['0%', '10%', '20%', '30%']}
            // paddingRight={['0%', '10%', '20%', '30%']}
          >
            <CuratorWidget feedId="4762b1d6-6652-492d-a870-fc4dd2ae395c"></CuratorWidget>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default WitnessHomeContainer;
