import {
  Box,
  Container,
  Heading,
  Text,
  Stack,
  VStack,
  Button,
  // Image,
  useTheme,
  Fade,
  SimpleGrid,
  GridItem,
  useBreakpointValue,
} from '@chakra-ui/react';
import { InView } from 'react-intersection-observer';
import {
  TitleText,
  DateText,
  MobileDateTextGoodFriday,
  MobileDateTextEaster,
  SubtitleTextGoodFriday,
  SubtitleTextEaster,
  LocationText,
  AddressText,
  ActionButton,
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
  const DateTextStylesGoodFriday = useBreakpointValue({
    base: MobileDateTextGoodFriday,
    md: DateText,
  });

  const DateTextStylesEaster = useBreakpointValue({
    base: MobileDateTextEaster,
    md: DateText,
  });

  return (
    <InView rootMargin="-50px" triggerOnce={true}>
      {({ inView, ref }) => (
        <Fade transition={{ enter: { duration: 1 } }} in={inView}>
          {/* <Image
            src={process.env.PUBLIC_URL + '/images/easter/tomb_icon.png'}
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
                  alignItems={{ base: 'center', md: 'inherit' }}
                  textAlign={{ base: 'center', md: 'inherit' }}
                  w="full"
                  maxW="1200px"
                >
                  {/* Good Friday Service */}
                  <GridItem>
                    <VStack spacing={[1, 3]} align={['center', 'start']}>
                      <Text {...DateTextStylesGoodFriday}>APR 3 FRI</Text>
                      <Box
                        borderTop={{ base: 'none', md: '1px solid #ccc' }}
                        w="full"
                        pt={[1, 3]}
                      >
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
                    <VStack spacing={[1, 3]} align={['center', 'start']}>
                      <Text {...DateTextStylesEaster}>APR 5 SUN</Text>
                      <Box
                        borderTop={{ base: 'none', md: '1px solid #ccc' }}
                        w="full"
                        pt={[1, 3]}
                      >
                        <Stack
                          spacing={[3, 6]}
                          direction={{ base: 'column', md: 'row' }}
                          alignItems={{ base: 'center', md: 'inherit' }}
                          align="start"
                          w="full"
                        >
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
                        </Stack>
                      </Box>
                    </VStack>
                  </GridItem>
                </SimpleGrid>

                {/* Action Buttons */}
                <Stack
                  spacing={[4, 8]}
                  direction={['column', 'row']}
                  w="full"
                  justify="center"
                  align="center"
                >
                  <Button
                    {...ActionButton}
                    border="2px solid #533000"
                    bg="transparent"
                    color="#533000"
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
                    {...ActionButton}
                    bg="#533000"
                    color="white"
                    rightIcon={<ArrowForwardIcon display={['none', 'block']} />}
                    _hover={{
                      bg: '#6d4000',
                    }}
                    onClick={() => {
                      console.log('Share an E-Invite clicked');
                    }}
                  >
                    Share an E-Invite!
                  </Button>
                </Stack>
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
