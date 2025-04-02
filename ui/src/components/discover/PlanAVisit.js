import {
  Box,
  Container,
  VStack,
  Text,
  SimpleGrid,
  Image,
  Flex,
  Icon,
  Button,
  Spacer,
  AspectRatio,
  Link,
} from '@chakra-ui/react';
import { MdAccessTime, MdLocationOn } from 'react-icons/md';
import BackButton from './DiscoverBackButton';
import PlanAVisitFaq from './PlanAVisitFaq';

const SUNDAY_CELEBRATION_GOOGLE_MAPS_EMBED =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.1090099217117!2d114.2256487!3d22.311716699999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3404018c12b37b11%3A0x594094421f794e0b!2sHarvest%20Mission%20Community%20Church%20(HMCC)%20of%20Hong%20Kong!5e0!3m2!1sen!2shk!4v1701923920210!5m2!1sen!2shk';

const PlanAVisit = () => {
  return (
    <Box bgColor="#F6FAFF">
      <BackButton />
      <Container maxW="container.xl" py={{ base: '4rem', lg: '5rem' }}>
        <Box
          id="lifegroup"
          display="flex"
          flexDir={'column'}
          alignItems={'center'}
          gap={{ base: '1.75rem', md: '2.5rem', lg: '4rem' }}
        >
          <VStack
            maxWidth={{ base: '95%', lg: '75%' }}
            spacing={{ base: '1rem', lg: '1.5rem' }}
          >
            <Text
              color="#0C0C20"
              fontFamily="DMSerifDisplay_Italic"
              fontSize={['2.25rem', '3rem', '3.75rem']} // Responsive font size
              fontWeight="400"
              textAlign="center"
              letterSpacing={'-0.1rem'}
            >
              Plan A Visit
            </Text>

            <Text
              color="#0C0C20"
              fontFamily="Manrope"
              fontSize={['0.875rem', '0.9rem', '1.25rem']}
              fontStyle="normal"
              fontWeight="400"
              lineHeight="normal"
              mx="auto"
              textAlign="center"
            >
              <b>Sunday Celebration</b> is HMCC's weekend gathering where
              everyone in the church comes together to receive God's message,
              worship in community and enjoy fellowship. Everybody's welcome!
              <br /> <br />
              Come visit us and get a taste of HMCC!
            </Text>
          </VStack>

          <SimpleGrid columns={[2, null, 4]} spacing={2} w={'100%'}>
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
          <Flex direction={'column'} align={'center'} w={'100%'}>
            <Flex direction={['column', 'row']} w={'100%'}>
              <Box
                borderWidth="0.031rem"
                borderColor="#0C0C20"
                borderRadius="0.875rem"
                p={6}
                mr={[0, 6]}
                mb={[6, 0]}
                flex="1.5"
                fontFamily="Manrope"
                fontSize={['1rem', '1rem', '1.25rem']}
              >
                <VStack align={['center', 'flex-start']} spacing={[2, 3]}>
                  <Flex
                    direction={['column', 'row']}
                    align={['center', 'flex-start']}
                  >
                    <Icon
                      as={MdAccessTime}
                      boxSize={6}
                      color="#EDB115"
                      mr={[0, 6]}
                      mt={[0, 0.5]}
                    />
                    <Text
                      fontWeight="700"
                      color="#969696"
                      letterSpacing={['0.063rem', '0.25rem']}
                    >
                      TIME
                    </Text>
                  </Flex>
                  <Spacer />
                  <Text
                    fontWeight="700"
                    color="#272727"
                    letterSpacing={['0.063rem', '0.25rem']}
                  >
                    EVERY SUNDAY 10 AM
                  </Text>
                  <Spacer />
                  <Spacer />
                  <Flex
                    direction={['column', 'row']}
                    align={['center', 'flex-start']}
                  >
                    <Icon
                      as={MdLocationOn}
                      boxSize={6}
                      color="#EDB115"
                      mr={[0, 6]}
                      mt={[0, 0.5]}
                    />
                    <Text
                      fontWeight="700"
                      color="#969696"
                      letterSpacing={['0.063rem', '0.25rem']}
                    >
                      LOCATION
                    </Text>
                  </Flex>
                  <Spacer />
                  <Text
                    align={['center', 'left']}
                    fontWeight="700"
                    color="#272727"
                    letterSpacing={['0.063rem', '0.25rem']}
                  >
                    TRANSFORMATION CENTER <br />
                  </Text>
                  <VStack spacing={0.8} alignItems={['center', 'flex-start']}>
                    <Text
                      align={['center', 'left']}
                      fontWeight="700"
                      color="#272727"
                      letterSpacing={['0.063rem', '0.25rem']}
                      maxW={['13rem', '30rem']}
                    >
                      UNIT 02, 22/F, CROCODILE CENTER
                    </Text>

                    <Text
                      align={['center', 'justify']}
                      fontWeight="700"
                      color="#272727"
                      letterSpacing={['0.063rem', '0.25rem']}
                    >
                      79 HOI YUEN RD, KWUN TONG
                    </Text>
                  </VStack>
                </VStack>
                <Box display="flex" justifyContent={['center', 'flex-start']}>
                  <Button
                    mt={6}
                    mb={[0, 6]}
                    p={6}
                    bgColor="#EBAC09"
                    variant="solid"
                    letterSpacing={['0.063rem', '0.25rem']}
                    fontSize={['0.875rem', '1rem', '1rem']}
                    borderRadius="0.938rem"
                    _hover={{ bgColor: '#BE8E11', textDecoration: 'none' }}
                    href="https://bit.ly/TCenterDirections"
                    target="_blank"
                    as={Link}
                  >
                    DIRECTIONS
                  </Button>
                </Box>
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
            <Flex direction="column" align={['center', 'stretch']} w={'100%'}>
              <Box
                bgColor={['#F5F0E0', 'transparent']}
                borderWidth="0.031rem"
                borderColor={['transparent', '#0C0C20']}
                borderRadius="0.875rem"
                p={6}
                mt={6}
                fontFamily="Manrope"
              >
                <Flex direction={['column', 'row']}>
                  <Box flex={3}>
                    <Text
                      align={['center', 'left']}
                      fontWeight="700"
                      fontSize={['1rem', '1rem', '1.25rem']}
                      color="#272727"
                      letterSpacing={['0.063rem', '0.25rem']}
                      mt={2}
                      mb={[2, 0]}
                      width={['auto', '30rem']}
                    >
                      IF YOU ARE NOT ABLE TO JOIN IN-PERSON YOU COULD ALSO...
                    </Text>
                  </Box>

                  <Box display="flex" justifyContent={['center', 'flex-start']}>
                    <Button
                      mt={2}
                      mb={2}
                      p={6}
                      bgColor="#EBAC09"
                      variant="solid"
                      alignSelf="flex-start"
                      letterSpacing="0.25rem"
                      fontSize={['0.875rem', '1rem', '1rem']}
                      borderRadius="0.938rem"
                      _hover={{ bgColor: '#BE8E11', textDecoration: 'none' }}
                      href="https://hongkong.hmcc.net/online/"
                      target="_blank"
                      as={Link}
                    >
                      JOIN ONLINE
                    </Button>
                  </Box>
                </Flex>
              </Box>
            </Flex>
          </Flex>

          <PlanAVisitFaq />
        </Box>
      </Container>
    </Box>
  );
};

export default PlanAVisit;
