import {
  Box,
  Container,
  Heading,
  Text,
  Stack,
  VStack,
  Button,
  Link,
  Image,
  useTheme,
  Fade,
  SimpleGrid,
  GridItem,
  useBreakpointValue,
} from '@chakra-ui/react';
import { InView } from 'react-intersection-observer';
import { useState } from 'react';
import {
  IconStyles,
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
import EInvitePopup from './EInvitePopup';

const easterCalendarUrl =
  'https://calendar.google.com/calendar/u/4?cid=Y19iYmNhYzhiNWVjZDAzYjNlYTk1YjZhMWIzMGNmZmY4NDk5ZGE4YmRhM2UxZTQ2ZmQ2NWVjZjQyMGY4NGUyMWJmQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20';

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
  const [isEInvitePopupOpen, setIsEInvitePopupOpen] = useState(false);

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
          <Box ref={ref} fontFamily={theme.fonts?.body} display="flex">
            <VerticalLine position="left" />
            <Container maxW="container.xl" px={[4, 6, 8]}>
              <Box justify="center" align="center">
                <Image
                  {...IconStyles}
                  src={process.env.PUBLIC_URL + '/images/easter/tomb_icon.png'}
                  alt="Easter tomb icon"
                />
              </Box>
              <VStack spacing={[7, 16]} align="center">
                {/* Header Section */}
                <VStack textAlign="center" maxW="4xl">
                  <Heading {...TitleText}>
                    You are invited to join us at...
                  </Heading>
                </VStack>

                {/* Event Cards Section */}
                <SimpleGrid
                  columns={{ base: 1, md: 3 }}
                  spacing={[6, 12]}
                  alignItems={{ base: 'center', md: 'inherit' }}
                  textAlign={{ base: 'center', md: 'inherit' }}
                  w="full"
                  maxW="1200px"
                >
                  {/* Good Friday Service */}
                  <GridItem>
                    <VStack
                      spacing={[1, 3]}
                      align={{ base: 'center', md: 'start' }}
                    >
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
                  <GridItem
                    colSpan={{ base: 1, md: 2 }}
                    ml={{ base: 0, md: 6 }}
                  >
                    <VStack
                      spacing={[1, 3]}
                      align={{ base: 'center', md: 'start' }}
                    >
                      <Text {...DateTextStylesEaster}>APR 5 SUN</Text>
                      <Box
                        borderTop={{ base: 'none', md: '1px solid #ccc' }}
                        w="full"
                        pt={[1, 3]}
                      >
                        <Stack
                          spacing={[3, 6]}
                          direction={{ base: 'column', md: 'row' }}
                          align={{ base: 'center', md: 'flex-start' }}
                          justify={{ base: 'center', md: 'space-between' }}
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
                              2:30PM, HK MANDARIN BIBLE CHURCH
                            </Text>
                            <Text {...AddressText}>
                              7/F, Elite Center, 22 Hung To Road,
                              <br />
                              Kwun Tong
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
                  direction={{ base: 'column', md: 'row' }}
                  w="full"
                  justify="center"
                  align="center"
                >
                  <Button
                    {...ActionButton}
                    as={Link}
                    href={easterCalendarUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    border="2px solid #533000"
                    bg="transparent"
                    color="#533000"
                    _hover={{
                      opacity: 0.95,
                      transform: 'translateY(-3px)',
                      bg: 'rgba(83, 48, 0, 0.1)',
                      boxShadow: 'lg',
                      textDecoration: 'none',
                    }}
                  >
                    Add Events to Calendar
                  </Button>
                  <Button
                    {...ActionButton}
                    bg="#533000"
                    color="white"
                    _hover={{
                      opacity: 0.95,
                      transform: 'translateY(-3px)',
                      bg: '#6d4000',
                      boxShadow: 'lg',
                      textDecoration: 'none',
                    }}
                    onClick={() => {
                      setIsEInvitePopupOpen(true);
                    }}
                  >
                    Share an E-Invite!
                  </Button>
                </Stack>
              </VStack>
            </Container>
            <VerticalLine position="right" />
          </Box>
          <EInvitePopup
            isOpen={isEInvitePopupOpen}
            onClose={() => setIsEInvitePopupOpen(false)}
          />
        </Fade>
      )}
    </InView>
  );
};

export default EasterInvitationSection;
