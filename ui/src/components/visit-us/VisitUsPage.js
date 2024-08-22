import {
  AspectRatio,
  Box,
  Container,
  Flex,
  Heading,
  Icon,
  Link,
  Spacer,
  Text,
  VStack,
} from '@chakra-ui/react';
import { RiChat1Line } from 'react-icons/ri';
import Faq from './Faq';

// Imports for link box that we disabled
// Center,
// LinkBox,
// LinkOverlay,

const SUNDAY_CELEBRATION_LOCATION =
  'Transformation Center\n Unit 02, 22/F, Crocodile Center\n 79 Hoi Yuen Rd,\n Kwun Tong';
const SUNDAY_CELEBRATION_GOOGLE_MAPS_EMBED =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.1090099217117!2d114.2256487!3d22.311716699999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3404018c12b37b11%3A0x594094421f794e0b!2sHarvest%20Mission%20Community%20Church%20(HMCC)%20of%20Hong%20Kong!5e0!3m2!1sen!2shk!4v1701923920210!5m2!1sen!2shk';

const VisitUsPage = (props) => {
  return (
    <Container maxW="container.lg" py={10}>
      <VStack spacing={[4, 10]} align="stretch">
        <Box
          borderWidth="1px"
          borderRadius="20"
          bgImage={`url('${process.env.PUBLIC_URL}/images/visitus/header-banner.jpeg')`}
          bgPosition="center"
          bgSize="cover"
          px={[6, 12, 28]}
          py={[8, 16, 20]}
          mb={[4, 0]}
        >
          <Heading
            as="h2"
            fontSize={['4xl', '6xl']}
            fontWeight={800}
            lineHeight={1}
            color="white"
            textAlign="center"
            mb={5}
            fontFamily="DMSerifDisplay_Italic"
          >
            Sunday Celebration
          </Heading>
          <Text
            color="white"
            fontSize={['md', 'xl']}
            fontWeight={700}
            textAlign="center"
            fontFamily="DMSerifDisplay_Regular"
            mb={[0, 5]}
          >
            is HMCC's weekend gathering where everyone in the church comes
            together to{' '}
            <span style={{ color: '#F6E05E' }}>
              receive God's message, worship in community and enjoy fellowship.
            </span>
            <br />
            Everybody's welcome!
          </Text>
        </Box>
        <Box pb={[4, 0]}>
          <Heading
            as="h3"
            fontSize={['2em', '5xl']}
            fontWeight={800}
            textAlign="center"
            mb={[2, 10]}
            fontFamily="Manrope"
          >
            Ways to enjoy Sunday Celebration
          </Heading>
          <Flex flexDir={['column', 'row']} fontFamily="Manrope">
            <VStack
              flex={4.25}
              align="stretch"
              textAlign={['center', 'left']}
              mr={[0, 6]}
              mb={[6, 0]}
            >
              <Heading
                as="h3"
                fontSize={['2xl', '4xl']}
                fontWeight={800}
                mt={4}
                fontFamily="Manrope"
              >
                IN-PERSON
              </Heading>
              <Text fontSize={['2xl', '2em']} fontWeight={700}>
                Sundays @ 10 AM
              </Text>
              <Text
                fontSize={['1.125em', '2xl']}
                fontWeight={700}
                px={[6, 0]}
                pb={4}
                whiteSpace="pre-line"
              >
                {SUNDAY_CELEBRATION_LOCATION}
                <br />
                <Link
                  href="https://bit.ly/TCenterDirections"
                  color="#0E66CC"
                  isExternal
                  fontWeight={700}
                >
                  <Text as="u">bit.ly/TCenterDirections</Text>
                </Link>
              </Text>
              <Spacer />
              {/* <Center w="100%" px={1}>
                <LinkBox
                  style={{ backgroundOrigin: "border-box" }}
                  as="button"
                  transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
                  boxShadow="2px 1000px 1px #fff inset"
                  boxSizing="border-box"
                  border="solid 3px transparent"
                  borderRadius={10}
                  backgroundImage="linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0)), linear-gradient(to right, #00B5D8, #F6AD55)"
                  backgroundClip="content-box, border-box"
                  py={3}
                  w="100%"
                  fontSize={["md", "lg"]}
                  _hover={{ boxShadow: "none", color: "#fff" }}
                >
                  <LinkOverlay
                    href="https://hongkong.hmcc.net/login"
                    isExternal
                  >
                    Sign Up for In-person Sunday Celebration
                  </LinkOverlay>
                </LinkBox>
              </Center> */}
              {/* <Text textAlign="center" fontSize="sm">
                *Pre-registration opens every Monday at 8PM
              </Text> */}
            </VStack>
            <AspectRatio
              flex={5.75}
              ratio={16 / 9}
              borderRadius="20"
              borderWidth="1px"
              overflow="hidden"
            >
              <iframe
                title="Sunday Celebration location - Google Maps"
                src={SUNDAY_CELEBRATION_GOOGLE_MAPS_EMBED}
                loading="lazy"
              ></iframe>
            </AspectRatio>
          </Flex>
        </Box>
        <Box
          borderWidth="1px"
          borderRadius="20"
          bgImage={`url('${process.env.PUBLIC_URL}/images/visitus/join-us-online.png')`}
          bgPosition="center"
          bgSize="cover"
          px={6}
          pt={[4, 6]}
          pb={4}
        >
          <VStack align="stretch" spacing={12}>
            <Heading
              as="h3"
              fontSize={['2xl', '4xl']}
              fontWeight={[400, 700]}
              color="white"
              maxW={650}
              textAlign={['center', 'initial']}
              fontFamily="Manrope"
            >
              If you are not able to join in-person, you could also...
              {/* We are currently not meeting in-person due to COVID-19, so
              please... */}
            </Heading>
            <Heading
              as="h3"
              fontSize={['2xl', '4xl']}
              color="white"
              textAlign={['center', 'right']}
            >
              <Link
                href="https://hongkong.hmcc.net/online/"
                isExternal
                fontFamily="Manrope"
              >
                Join us ONLINE
              </Link>
            </Heading>
          </VStack>
        </Box>
        <Box>
          <Heading
            as="h3"
            fontSize={['2xl', '4xl']}
            fontWeight={800}
            textAlign="center"
            fontFamily="Manrope"
          >
            Got Queries?{' '}
            <Link href="mailto:hongkong@hmcc.net">
              hongkong@hmcc.net <Icon as={RiChat1Line} ml={1} />
            </Link>
          </Heading>
        </Box>
        <Box pt={4}>
          <Faq />
        </Box>
      </VStack>
    </Container>
  );
};

export default VisitUsPage;
