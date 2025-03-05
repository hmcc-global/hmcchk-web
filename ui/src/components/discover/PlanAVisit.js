import {
  Box,
  Container,
  VStack,
  Text,
  SimpleGrid,
  Image,
  HStack,
  Flex,
  Icon,
  Button,
  Spacer,
  AspectRatio,
  Center,
} from '@chakra-ui/react';

import { MdAccessTime, MdLocationOn } from 'react-icons/md';
import CustomAccordion from "./CustomAccordion";

//borrow Kenneth's BackButton component
import BackButton from './BackButton';

const SUNDAY_CELEBRATION_GOOGLE_MAPS_EMBED =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.1090099217117!2d114.2256487!3d22.311716699999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3404018c12b37b11%3A0x594094421f794e0b!2sHarvest%20Mission%20Community%20Church%20(HMCC)%20of%20Hong%20Kong!5e0!3m2!1sen!2shk!4v1701923920210!5m2!1sen!2shk';

const PlanAVisit = (props) => {

  const accordionData = [
    {
      title: "What are your services like?",
      content: "Our services are typically about 2 hours long, and it would normally consist of some worship, message, and closing prayer time."
    },
    {
      title: "What do I wear to church?",
      content: "No dress code in particular! However, we would suggest bringing a light/thin jacket in case you get cold in our venue."
    },
    {
      title: "Is there a service available specifically for my kids?",
      content: "Building Blocks is HMCC’s Children’s Ministry, specifically catered for kids ages 3 to 11 and with all learning needs, will take place alongside of our Sunday Celebrations. The children will be able to interact with one another and the teachers over a time of worship, Bible story and activities. For more information, please visit the Building Block’s page"
    },
    {
      title: "Would in-person service still be available under extreme weather conditions?",
      content: "T9 or T10 signals hoisted by the Hong Kong Observatory: Our in-person gatherings will be postponed or canceled. Note that if the signal is lowered to T8 before or at 8:30AM on Sunday morning, we still have Sunday Celebration at 10AM as scheduled. Please check our website or social media accounts for updates regarding the latest information or online sermons. T8 signal hoisted by the Hong Kong Observatory: We highly value both personal safety as well as meeting together as the body of Christ on a consistent basis. Therefore, if you are able to come safely, we will still have our gatherings as scheduled."
    },
  ];

  return (
    //The Header
    <Box bgColor="#F6FAFF">
      <BackButton />
      <Container maxW="container.lg" py={10} pt="60px">
        <VStack align="center">
          <Text
            color="#0C0C20"
            fontFamily="DMSerifDisplay_Italic"
            fontSize={['2rem', '3rem', '3.75rem']} // Responsive font size
            fontWeight="400"
            textAlign="center"
          >
            Plan A Visit
          </Text>

          <Text
            color="#0C0C20"
            fontFamily="Manrope"
            fontSize={['0.85rem', '0.9rem', '1rem']}
            fontStyle="normal"
            fontWeight="400"
            lineHeight="normal"
            mx="auto"
            textAlign="center"
          >
            <b>Sunday Celebration</b> is HMCC's weekend gathering where everyone
            in the church comes together to receive God's message, worship in
            community and enjoy fellowship. Everybody's welcome!
            <br /> <br />
            Come visit us and get a taste of HMCC!
          </Text>
        </VStack>

        <SimpleGrid columns={[2, null, 4]} spacing={4} mt={8} mb={6}>
          <Image
            src={process.env.PUBLIC_URL + '/images/discover/planavisit1.png'}
            alt="Event 1"
            borderRadius="0.22rem"
          />
          <Image
            src={process.env.PUBLIC_URL + '/images/discover/planavisit2.png'}
            alt="Event 2"
            borderRadius="0.22rem"
          />
          <Image
            src={process.env.PUBLIC_URL + '/images/discover/planavisit3.png'}
            alt="Event 3"
            borderRadius="0.22rem"
          />
          <Image
            src={process.env.PUBLIC_URL + '/images/discover/planavisit4.png'}
            alt="Event 4"
            borderRadius="0.22rem"
          />
        </SimpleGrid>

        <Flex direction={['column', 'row']}>
          <Box
            borderWidth="0.031rem"
            borderColor="#0C0C20"
            borderRadius="0.875rem"
            p={6}
            mr={[0, 6]}
            flex="1.5"
            fontFamily="Manrope"
          >
            <VStack align="flex-start">
              <HStack>
                <Icon as={MdAccessTime} boxSize={6} color="#EDB115" />
                <Text
                  fontWeight="700"
                  fontSize="lg"
                  color="#969696"
                  letterSpacing="0.25rem"
                >
                  TIME
                </Text>
              </HStack>
              <Spacer />
              <Text
                fontWeight="700"
                fontsize="lg"
                color="#272727"
                letterSpacing="0.25rem"
              >
                EVERY SUNDAY 10 AM
              </Text>
              <Spacer />
              <Spacer />
              <Spacer />
              <HStack>
                <Icon as={MdLocationOn} boxSize={6} color="#EDB115" />
                <Text
                  fontWeight="700"
                  fontSize="lg"
                  color="#969696"
                  letterSpacing="0.25rem"
                >
                  LOCATION
                </Text>
              </HStack>
              <Spacer />
              <Text
                fontWeight="700"
                fontsize="lg"
                color="#272727"
                letterSpacing="0.25rem"
              >
                TRANSFORMATION CENTER <br /> <br />
                UNIT 02, 22/F, CROCODILE CENTER <br />
                79 HOI YUEN RD, KWUN TONG <br />
              </Text>
            </VStack>

            <Button
              mt={6}
              mb={6}
              p={6}
              bgColor="#EBAC09"
              variant="solid"
              alignSelf="flex-start"
              letterSpacing="0.25rem"
              fontSize="1rem"
              borderRadius="0.938rem"
            >
              DIRECTIONS
            </Button>
          </Box>

          <AspectRatio
            flex={1}
            borderRadius="1.375rem"
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

        <Flex direction="column" align={['center', 'stretch']}>
          <Box
            borderWidth="0.031rem"
            borderColor="#0C0C20"
            borderRadius="0.875rem"
            p={6}
            mt={6}
            fontFamily="Manrope"
          >
            <Flex direction={['column', 'row']}>
              <Box flex={3}>
                <Text
                  fontWeight="700"
                  fontsize="lg"
                  color="#272727"
                  letterSpacing="0.25rem"
                  mt={2}
                  mb={[2, 0]}
                  width={['auto', '30rem']}
                >
                  IF YOU ARE NOT ABLE TO JOIN IN-PERSON YOU COULD ALSO...
                </Text>
              </Box>

              <Button
                mt={2}
                mb={2}
                p={6}
                bgColor="#EBAC09"
                variant="solid"
                alignSelf="flex-start"
                letterSpacing="0.25rem"
                fontSize="1rem"
                borderRadius="0.938rem"
              >
                JOIN ONLINE
              </Button>
            </Flex>
          </Box>
        </Flex>

        <Text
          color="#0C0C20"
          fontFamily="DMSerifDisplay_Italic"
          fontSize={['2rem', '2rem', '2.625rem']} // Responsive font size
          fontWeight="400"
          textAlign="center"
          mt={6}
        >
          FAQs
        </Text>

        <Flex
        alignItems="center"
        justifyContent="center"
        mb={20}>
          <CustomAccordion data={accordionData} borderColor="#EBAC09" bgColor="#F5F0E0" width="37.75rem"/>
        </Flex>
             
      </Container>
    </Box>
  );
};

export default PlanAVisit;
