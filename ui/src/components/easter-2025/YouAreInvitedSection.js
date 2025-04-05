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
        left={['-15px', '-2.5%']}
        paddingLeft={['6px', '0']} // Adjust padding for left on mobile
      >
        <Container maxW={['100%', '90%']} marginTop={12} mb={12}>
          <Box width={['100%', '50%', '50%']} mb={[6, 4, 8]}>
            <Text
              fontFamily="'Lexend Peta', sans-serif"
              fontWeight={900}
              bgGradient="linear(87deg, #45173C 0%, #732527 35%, #20444A 75%, #0FACD0 100%)"
              backgroundClip="text"
              fontSize={{ base: '1.6rem', md: '2.5rem', lg: '3.5rem' }}
              letterSpacing={['-4px', '-9px']}
            >
              YOU ARE INVITED
            </Text>
            <Text
              fontFamily="'Lexend Peta', sans-serif"
              fontWeight={900}
              background="linear-gradient(87deg, #45173C 0%, #732527 35%, #20444A 75%, #0FACD0 100%)"
              backgroundClip="text"
              fontSize={{ base: '1.6rem', md: '2.5rem', lg: '3.5rem' }}
              letterSpacing={['-4px', '-9px']}
            >
              TO JOIN US AT ...
            </Text>
          </Box>
          <Box>
            <Flex direction={{ base: 'column', md: 'row' }}>
              {eventData.map((event, index) => (
                <Box
                  key={index}
                  borderRadius={20}
                  padding={[0, 6]}
                  width={{ base: '100%', md: '33%' }}
                  mb={[6, 0]}
                >
                  <Box mb={4}>
                    <Image
                      src={event.imageSrc}
                      alt={event.title}
                      objectFit="cover"
                      maxHeight={50}
                    />
                  </Box>
                  <Text
                    fontWeight={700}
                    fontSize={['md', 'xl']}
                    mb={2}
                    fontFamily="'Lexend Peta', sans-serif"
                    letterSpacing="-2px"
                  >
                    {event.title}
                  </Text>
                  <Text
                    fontSize={['sm', 'md']}
                    mb={1}
                    fontFamily="'Lexend Peta', sans-serif"
                    fontWeight={400}
                    letterSpacing="-2px"
                  >
                    {event.eventDate}
                  </Text>
                  <Text
                    fontSize={['sm', 'md']}
                    fontWeight={400}
                    mb={[1, 6]}
                    fontFamily="'Lexend Peta', sans-serif"
                    letterSpacing="-2px"
                  >
                    {event.time}
                  </Text>
                  {(() => {
                    const [firstPart, ...restParts] = event.location.split(',');
                    return (
                      <>
                        <Text
                          fontSize={['sm', 'md']}
                          mb={1}
                          fontFamily="'Lexend', sans-serif"
                        >
                          {firstPart.trim()}
                        </Text>
                        <Text
                          fontSize={['xs', 'sm']}
                          mb={[1, 3]}
                          fontFamily="'Lexend', sans-serif"
                          color="#006E87"
                        >
                          {restParts.join(',').trim()}
                        </Text>
                      </>
                    );
                  })()}
                  <Box>
                    <Flex
                      direction={['row', 'column']}
                      gap={[1, 2]}
                      alignItems="left"
                    >
                      <Box width={['50%', 'auto']}>
                        {generateGoogleCalendarLink(event) && (
                          <Button
                            fontFamily="'Lexend Peta', sans-serif"
                            as={Link}
                            size={['60%', 'sm']}
                            fontSize={['60%', 'sm']}
                            variant="outline"
                            target="_blank"
                            px={[2, 4]}
                            py={[1, 2]}
                            _hover={{ opacity: '90%', textDecoration: 'none' }}
                            href={generateGoogleCalendarLink(event)}
                            rightIcon={<CiCalendar />}
                            borderRadius="full"
                            width="auto"
                          >
                            ADD TO CALENDAR
                          </Button>
                        )}
                      </Box>
                      <Box width={['50%', 'auto']}>
                        <Button
                          px={[2, 4]}
                          py={[1, 2]}
                          fontFamily="'Lexend Peta', sans-serif"
                          size={['60%', 'sm']}
                          fontSize={['60%', 'sm']}
                          variant="outline"
                          borderRadius="full"
                          width="auto"
                          rightIcon={<MdOutlineDirections />}
                          as={Link}
                          href={generateGoogleMapsLink(event.location)}
                          target="_blank"
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
