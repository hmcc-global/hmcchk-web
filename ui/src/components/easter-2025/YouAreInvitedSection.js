import React from 'react';
import {
  Box,
  Container,
  Text,
  Flex,
  Image,
  Button,
  Link,
} from '@chakra-ui/react';
import { MdOutlineDirections } from 'react-icons/md';
import { generateGoogleCalendarLink } from '../helpers/eventsHelpers';
import { CiCalendar } from 'react-icons/ci';

const eventData = [
  {
    eventStartDate: '2025-04-18',
    eventStartTime: '20:00:00',
    eventEndDate: '2025-04-18',
    title: 'GOOD FRIDAY SERVICE',
    location: `TRANSFORMATION CENTER, UNIT 2202, CROCODILE CENTER, 79 HOI YUEN ROAD, KWUN TONG`,
    eventInterval: 2.5,
    time: '8PM',
    eventDate: 'FRI, APRIL 18, 2025',
    imageSrc: process.env.PUBLIC_URL + '/images/easter-2025/good-friday.png',
  },
  {
    eventStartDate: '2025-04-20',
    eventStartTime: '10:00:00',
    eventEndDate: '2025-04-20',
    title: 'EASTER CELEBRATION',
    location: `TRANSFORMATION CENTER, UNIT 2202, CROCODILE CENTER, 79 HOI YUEN ROAD, KWUN TONG`,
    eventInterval: 2.5,
    time: '10AM',
    eventDate: 'SUN, APRIL 20, 2025',
    imageSrc:
      process.env.PUBLIC_URL + '/images/easter-2025/easter-celebration.png',
  },
  {
    eventStartDate: '2025-04-20',
    eventStartTime: '14:00:00',
    title: 'BAPTISM CELEBRATION',
    location: `HONG KONG MANDARIN BIBLE CHURCH, 7/F ELITE CENTER, 22 HUNG TO ROAD, KWUN TONG`,
    eventInterval: 2.5,
    time: '2PM',
    eventDate: 'SUN, APRIL 20, 2025',
    imageSrc: process.env.PUBLIC_URL + '/images/easter-2025/baptism.png',
  },
];

const YouAreInvitedSection = () => {
  const generateGoogleMapsLink = (location) => {
    const baseUrl = 'https://www.google.com/maps/dir/?api=1&destination=';
    if (location.includes('HONG KONG MANDARIN')) {
      location = location.replace('BIBLE CHURCH', 'BAPTISM BIBLE CHURCH'); // Modify the string for the link
    }
    return `${baseUrl}${encodeURIComponent(location)}`;
  };

  return (
    <>
      <Container
        maxW="100%"
        border="1px solid black"
        borderRadius={{
          base: '0 30px 30px 0',
          md: '30px',
        }}
        marginBottom={12}
        padding={0}
        position="relative"
        left={['-15px', '-6%']}
        overflow="hidden"
      >
        <Container
          maxW={['90%', '85%']}
          marginTop={24}
          mb={12}
          marginRight="3%"
        >
          <Box width={['100%', '95%', '60%']} mb={[6, 4, 10]}>
            <Text
              fontFamily="'LexendPeta', sans-serif"
              fontWeight={900}
              bgGradient="linear(87deg, #45173C 0%, #732527 35%, #20444A 75%, #0FACD0 100%)"
              backgroundClip="text"
              fontSize={['1.6rem', '2.5rem', '3.75rem']}
              letterSpacing={['-3.42px', '-7.8px', '-11.4px']}
              lineHeight={[1, 1]}
            >
              YOU ARE INVITED
            </Text>
            <Text
              fontFamily="'LexendPeta', sans-serif"
              fontWeight={900}
              background="linear-gradient(87deg, #45173C 0%, #732527 35%, #20444A 75%, #0FACD0 100%)"
              backgroundClip="text"
              fontSize={['1.6rem', '2.5rem', '3.75rem']}
              letterSpacing={['-3.42px', '-7.8px', '-11.4px']}
              lineHeight={[1, 1]}
            >
              TO JOIN US AT ...
            </Text>
          </Box>
          <Box>
            <Flex
              direction={{ base: 'column', md: 'row' }}
              justifyContent="space-between"
            >
              {eventData.map((event, index) => (
                <Box
                  key={index}
                  borderRadius={20}
                  padding={[0, 6]}
                  width={{ base: '100%', md: '33%', lg: '33%' }}
                  mb={[6, 0]}
                >
                  <Box mb={4}>
                    <Image
                      src={event.imageSrc}
                      alt={event.title}
                      objectFit="cover"
                      maxHeight={55}
                    />
                  </Box>
                  <Text
                    fontWeight={700}
                    fontSize={['0.875rem', '1.5rem']}
                    mb={2}
                    fontFamily="'LexendPeta', sans-serif"
                    letterSpacing={['-3.42px', '-4.56px']}
                  >
                    {event.title}
                  </Text>
                  <Text
                    fontSize={['0.875rem', '1.25rem']}
                    mb={[1, 0]}
                    fontFamily="'LexendPeta', sans-serif"
                    fontWeight={400}
                    letterSpacing={['-2.66px', '-3.8px']}
                    lineHeight="100%"
                  >
                    {event.eventDate}
                  </Text>
                  <Text
                    fontSize={['0.875rem', '1.25rem']}
                    fontWeight={400}
                    mb={[1, 0]}
                    fontFamily="'LexendPeta', sans-serif"
                    letterSpacing={['-2.66px', '-3.8px']}
                    lineHeight={{ base: 1 }}
                  >
                    {event.time}
                  </Text>
                  {(() => {
                    const [firstPart, ...restParts] = event.location.split(',');
                    return (
                      <>
                        <Box
                          height={{ sm: 'auto', xl: 12, '2xl': 12 }}
                          mb={3}
                          display="flex"
                          flexDirection="column"
                          justifyContent="flex-end"
                        >
                          <Text
                            fontSize={['0.875rem', '1.25rem']}
                            fontFamily="'LexendPeta', sans-serif"
                            letterSpacing={['-2.66px', '-3.8px']}
                            lineHeight="110%"
                          >
                            {firstPart.trim()}
                          </Text>
                        </Box>
                        <Box width={['60%', '90%']}>
                          <Text
                            fontSize={['0.75rem', '1.125rem']}
                            mb={[3, 5]}
                            fontFamily="'Lexend', sans-serif"
                            color="#006E87"
                            letterSpacing={['-0.72px', '-1.08px']}
                            lineHeight="110%"
                          >
                            {restParts.join(',').trim()}
                          </Text>
                        </Box>
                      </>
                    );
                  })()}
                  <Box>
                    <Flex
                      direction={['row', 'column']}
                      gap={[1, 2]}
                      alignItems={['none', 'left']}
                    >
                      <Box>
                        {generateGoogleCalendarLink(event) && (
                          <Button
                            fontFamily="'LexendPeta', sans-serif"
                            as={Link}
                            size={{
                              base: '55%',
                              sm: '55%',
                              xl: '100%',
                            }}
                            fontSize={{
                              base: '0.5625rem',
                              sm: '0.65rem',
                              xl: '0.75rem',
                            }}
                            variant="outline"
                            target="_blank"
                            px={(2, 4)}
                            py={(1, 2)}
                            _hover={{
                              backgroundColor: 'white',
                              textDecoration: 'none',
                            }}
                            href={generateGoogleCalendarLink(event)}
                            rightIcon={<CiCalendar />}
                            borderRadius="full"
                            width="auto"
                            borderColor="black"
                            letterSpacing="-0.7px"
                            fontWeight="semibold"
                          >
                            ADD TO CALENDAR
                          </Button>
                        )}
                      </Box>
                      <Box width={['50%', 'auto']}>
                        <Button
                          px={(2, 4)}
                          py={(1, 2)}
                          fontFamily="'LexendPeta', sans-serif"
                          size={{
                            base: '55%',
                            sm: '55%',
                            xl: '100%',
                          }}
                          fontSize={{
                            base: '0.5625rem',
                            sm: '0.65rem',
                            xl: '0.75rem',
                          }}
                          variant="outline"
                          borderRadius="full"
                          width="auto"
                          rightIcon={<MdOutlineDirections />}
                          as={Link}
                          href={generateGoogleMapsLink(event.location)}
                          target="_blank"
                          borderColor="black"
                          _hover={{
                            backgroundColor: 'white',
                            textDecoration: 'none',
                          }}
                          letterSpacing="-0.7px"
                          fontWeight="semibold"
                        >
                          DIRECTIONS
                        </Button>
                      </Box>
                    </Flex>
                  </Box>
                </Box>
              ))}
            </Flex>
          </Box>
        </Container>
      </Container>
    </>
  );
};

export default YouAreInvitedSection;
