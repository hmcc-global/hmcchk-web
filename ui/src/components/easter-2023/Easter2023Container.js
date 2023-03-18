import {
  Container,
  Text,
  VStack,
  Box,
  Stack,
  Flex,
  Center,
  Divider,
  Button,
  Link,
} from '@chakra-ui/react';

import ThePassion from './ThePassion';
import EasterCalendar from './EasterCalendar';
import EasterStory from './EasterStory';
import EasterNavbar from './EasterNavbar';
import EasterHomeTextSection from './../witness/home-sections/EasterHomeTextSection';
import ShareTestimonyButton from '../witness/text-testimony/ShareTestimonyButton';
import WitnessHomeVideoSection from '../witness/home-sections/WitnessHomeVideoSection';
import WitnessHomeTextSection from '../witness/home-sections/WitnessHomeTextSection';
import CuratorWidget from './CuratorWidget';
import EasterHomeInvitationSection from '../witness/home-sections/EasterHomeInvitationSection';

const Easter2023Container = (props) => {
  //To do: implement navbar, buttons, testimony section
  return (
    <Container
      maxW="100%"
      minHeight="fill"
      p={0}
      m={0}
      bgImage={process.env.PUBLIC_URL + '/images/easter-2023/wigglydesktop.png'}
    >
      <VStack spacing={0} align="stretch">
        <Box>
          <ThePassion />
        </Box>
        <Box
          sx={{
            position: '-webkit-sticky',
            position: 'sticky',
            top: '0',
            bgColor: '#FFF7F1',
            zIndex: '1',
            textAlign: 'center',
          }}
        >
          <EasterNavbar />
        </Box>
        <Box
          minHeight="fit-content"
          backgroundColor="#FFF7F1"
          backgroundPosition="top"
          bgSize="100%"
          textAlign="center"
          alignItems="center"
          justifyContent="center"
          pt={[0, 0]}
          pb={[0, 0]}
          bgImage={
            process.env.PUBLIC_URL + '/images/easter-2023/wigglydesktop.png'
          }
        >
          <Box alignContent="center" backgroundColor="none">
            <div id="easter-story"></div>
            <EasterStory />

            <Center>
              <EasterCalendar />
            </Center>

            <EasterHomeInvitationSection />

            <div id="easter-witness">
              <Box height="10"></Box>
              <Stack
                direction={['column', 'row']}
                justifyContent={['center', 'space-evenly']}
                spacing={7}
                mb={[5, 20]}
                mt={[5, 10]}
              >
                <Flex w="100%" justifyContent="center" direction="column">
                  <Box w={['85%', '90%']} mx="auto" mt={[5, 7]}>
                    <Text
                      textColor="#8D2C72"
                      fontWeight="1000"
                      fontFamily="concrete_demo"
                      fontSize={['2.1em', '3em']}
                    >
                      WITNESS
                    </Text>
                    <Box pt={'5'} w={['85%', '70%']} mx="auto">
                      <Text
                        textStyle={'dm_sans_bold'}
                        color="black"
                        fontSize={['14px', '18px']}
                        textAlign="center"
                      >
                        The theme for HMCC 2022-2023 is Witness. As a church, it
                        is our hope that our daily and personal witness of Jesus
                        will translate into our passionate witness for Jesus to
                        others around us.
                        <br />
                        <br />
                        Throughout this year, we want to invite you to share
                        your personal witness of Jesus here and witness God’s
                        work in our church!
                      </Text>
                    </Box>
                    <Box
                      mx="auto"
                      pt={['5', '12']}
                      justifyContent="center"
                      w={['85%', '60%']}
                    >
                      <Text
                        textStyle={'dm_sans_bold'}
                        color="black"
                        fontSize={['md', '2xl']}
                        textAlign="center"
                      >
                        HOW ARE YOU WITNESSING GOD?
                      </Text>
                    </Box>
                    <Box mx="auto" justifyContent="center" w={['85%', '30%']}>
                      <ShareTestimonyButton />
                    </Box>
                  </Box>
                </Flex>
              </Stack>
            </div>
          </Box>
        </Box>
        <Box maxW="100%" bgColor="#FFF7F1">
          <WitnessHomeVideoSection />
          <Divider
            orientation="horizontal"
            my={10}
            w="25%"
            height="3px"
            backgroundColor="#DAC7BC"
            mx="auto"
          />
          <WitnessHomeTextSection />
          <Divider
            orientation="horizontal"
            my={10}
            w="25%"
            height="3px"
            backgroundColor="#DAC7BC"
            mx="auto"
          />
          <Box
            textAlign="center"
            textStyle="dm_sans_bold"
            fontSize={{ sm: '20px', md: '30px', lg: '40px' }}
          >
            <Text textColor="#E60053"  fontSize={[25, 40]}>#2023WitnessJesus Testimony Campaign</Text>
            <Button
              borderRadius={[5, 10]}
              background="linear-gradient(109.54deg, #FF4F50 11.11%, #D33E68 57.55%, #BD3381 95.53%)"
              textColor="#FFFFFF"
              fontWeight="700"
              fontFamily="Inter"
              height={['25px', '40px']}
              fontSize={['xs', 'sm', 'lg']}
              as={Link}
              href="https://www.instagram.com/hmcc_hk/"
              _hover="none"
              target="_blank"
              mt={5}
            >
              Follow @hmcc_hk
            </Button>
          </Box>
          <Box paddingTop = {['8%', '2%', '2%']} paddingLeft = {['0%', '10%', '20%','30%']} paddingRight = {['0%', '10%', '20%','30%']}>
          <CuratorWidget feedId="4762b1d6-6652-492d-a870-fc4dd2ae395c"></CuratorWidget> 
          </Box>
        
         {/* <Box height="10"></Box> */}
          <div id="prayer-wall">
            <Box height="70"></Box>
          </div>
          <EasterHomeTextSection />
        </Box>
      </VStack>
    </Container>
  );
};

export default Easter2023Container;
