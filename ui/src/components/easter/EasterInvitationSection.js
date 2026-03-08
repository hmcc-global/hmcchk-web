import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  // Image,
  useTheme,
  Fade,
  SimpleGrid,
  GridItem,
} from '@chakra-ui/react';
import { InView } from 'react-intersection-observer';
import {
  TitleText,
  DateText,
  SubtitleTextGoodFriday,
  SubtitleTextEaster,
  LocationText,
  AddressText,
} from './styles';
import { ArrowForwardIcon } from '@chakra-ui/icons';

/* Decorative vertical lines */
const VerticalLine = ({ position }) => {
  return position === 'right' ? (
    <Box
      h="auto"
      w="3em"
      borderColor="#B8B09B"
      borderRight="1px solid"
      borderRadius="24px"
    />
  ) : (
    <Box
      h="auto"
      w="3em"
      borderColor="#B8B09B"
      borderLeft="1px solid"
      borderRadius="24px"
    />
  );
};

const EasterInvitationSection = () => {
  const theme = useTheme();

  return (
    <InView rootMargin="-50px" triggerOnce={true}>
      {({ inView, ref }) => (
        <Fade transition={{ enter: { duration: 1 } }} in={inView}>
          {/* <Image
            src={process.env.PUBLIC_URL + '/images/easter/e_invite_logo.png'}
            opacity={0.15}
          /> */}
          <Box
            ref={ref}
            fontFamily={theme.fonts?.body}
            display="flex"
            overflow="hidden"
          >
            <VerticalLine position="left" />
            <Container maxW="container.xl" px={[4, 6, 8]}>
              <VStack spacing={[10, 12, 16]} align="center">
                {/* Header Section */}
                <VStack spacing={6} textAlign="center" maxW="4xl">
                  <Heading {...TitleText}>
                    You are invited to join us at...
                  </Heading>
                </VStack>

                {/* Event Cards Section */}
                <SimpleGrid
                  columns={{ base: 1, md: 3 }}
                  spacing={[6, 8, 12]}
                  w="full"
                  maxW="1200px"
                >
                  {/* Good Friday Service */}
                  <GridItem>
                    <VStack spacing={3} align="start">
                      <Text {...DateText}>APR 3 FRI</Text>
                      <Box borderTop="1px solid #ccc" w="full" pt={3}>
                        <Heading {...SubtitleTextGoodFriday}>
                          Good Friday Service
                        </Heading>
                        <Text {...LocationText}>
                          8PM, TRANSFORMATION CENTER
                        </Text>
                        <Text {...AddressText}>
                          Unit 2202, Crocodile Center
                          <br />
                          79 Hoi Yuen Road, Kwun Tong
                        </Text>
                      </Box>
                    </VStack>
                  </GridItem>

                  {/* Easter Celebration & Baptism Celebration */}
                  <GridItem colSpan={{ base: 1, md: 2 }}>
                    <VStack spacing={3} align="start">
                      <Text {...DateText}>APR 5 SUN</Text>
                      <Box borderTop="1px solid #ccc" w="full" pt={3}>
                        <HStack spacing={6} align="start" w="full">
                          {/* Easter Celebration */}
                          <Box>
                            <Heading {...SubtitleTextEaster}>
                              Easter Celebration
                            </Heading>
                            <Text {...LocationText}>
                              10AM, TRANSFORMATION CENTER
                            </Text>
                            <Text {...AddressText}>
                              Unit 2202, Crocodile Center
                              <br />
                              79 Hoi Yuen Road, Kwun Tong
                            </Text>
                          </Box>

                          {/* Baptism Celebration */}
                          <Box>
                            <Heading {...SubtitleTextEaster}>
                              Baptism Celebration
                            </Heading>
                            <Text {...LocationText}>
                              2PM, TRANSFORMATION CENTER
                            </Text>
                            <Text {...AddressText}>
                              Unit 2202, Crocodile Center
                              <br />
                              79 Hoi Yuen Road, Kwun Tong
                            </Text>
                          </Box>
                        </HStack>
                      </Box>
                    </VStack>
                  </GridItem>
                </SimpleGrid>

                {/* Action Buttons */}
                <HStack
                  spacing={[4, 6, 8]}
                  flexDirection={['column', 'column', 'row']}
                  w="full"
                  justify="center"
                >
                  <Button
                    border="2px solid #533000"
                    bg="transparent"
                    color="#533000"
                    fontFamily="'Manrope', sans-serif"
                    fontWeight="700"
                    fontSize="18px"
                    px={10}
                    py={6}
                    borderRadius="80px"
                    h="55px"
                    _hover={{
                      bg: 'rgba(83, 48, 0, 0.1)',
                    }}
                    onClick={() => {
                      // Placeholder link - to be updated
                      console.log('Add Events to Calendar clicked');
                    }}
                  >
                    Add Events to Calendar
                  </Button>

                  <Button
                    bg="#533000"
                    color="white"
                    fontFamily="'Manrope', sans-serif"
                    fontWeight="700"
                    fontSize="18px"
                    px={10}
                    py={6}
                    borderRadius="80px"
                    h="55px"
                    rightIcon={<ArrowForwardIcon />}
                    _hover={{
                      bg: '#6d4000',
                    }}
                    onClick={() => {
                      console.log('Share an E-Invite clicked');
                    }}
                  >
                    Share an E-Invite!
                  </Button>
                </HStack>
              </VStack>
            </Container>
            <VerticalLine position="right" />
          </Box>
        </Fade>
      )}
    </InView>
  );
};

export default EasterInvitationSection;
