import { Box, Container, Flex, Image, Stack, Text } from '@chakra-ui/react';

const MissionsMonthHero = () => {
  const heroDesc1 = 'MISSIONS MONTH';
  const heroDesc2 = 'NOVEMBER 2022';
  const missionsDesc = `Since 2016, we dedicate the month of November each year to learn about and grow a heart for missions. As a whole church, we come together and serve our communities as we live missionally for Christ through outreaches in campuses and around the city, serving those in need, and reaching out to friends and families. `;
  return (
    <>
      <Flex
        w="full"
        h="auto"
        direction="column"
        alignItems="center"
        paddingTop="4em"
        paddingBottom="4em"
        bgImage={
          process.env.PUBLIC_URL + '/images/missions-month/no_other_name.jpg'
        }
        bgSize="cover"
        bgPosition="center center"
      >
        <Container maxW="container.lg" justifyContent="center" display="flex">
          <Stack direction="column">
            <Box
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
              }}
            >
              <Image
                src={`${process.env.PUBLIC_URL}/images/missions-month/missions_title.png`}
                width="80%"
                display={{ base: 'none', md: 'flex' }}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              />
              <Image
                src={`${process.env.PUBLIC_URL}/images/missions-month/missions_title_mobile.png`}
                width="80%"
                display={{ base: 'flex', md: 'none' }}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              />
            </Box>
            <Box
              style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Text
                style={{
                  color: 'white',
                  letterSpacing: '0.165em',
                  textShadow: '0px 0px 8.46154px rgba(0, 0, 0, 0.6)',
                  fontFamily: 'Akshar',
                  fontSize: '24px',
                  lineHeight:"33px"
                }}
              >
                {heroDesc1}
              </Text>
              <Text
                style={{
                  color: 'white',
                  letterSpacing: '0.165em',
                  textShadow: '0px 0px 8.46154px rgba(0, 0, 0, 0.6)',
                  fontFamily: 'Akshar',
                  fontSize: '24px',
                  lineHeight:"33px"
                }}
              >
                {heroDesc2}
              </Text>
            </Box>
          </Stack>
        </Container>
      </Flex>
      <Flex
        w="full"
        h="auto"
        direction="column"
        alignItems="center"
        paddingTop="2em"
        paddingBottom="2em"
      >
        <Container maxW="container.lg" justifyContent="center" display="flex">
          <Stack
            direction="column"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text
              fontWeight={{ base: 700, md: 600 }}
              color="#00328D"
              fontSize={{ base: '24px', md: '48px' }}
              fontFamily="Akshar"
              letterSpacing="0.1em"
            >
              WHAT IS MISSIONS MONTH?
            </Text>
            <Text
              style={{ textAlign: 'center' }}
              fontSize={{ base: '12px', md: '16px' }}
              fontFamily="Lexend Deca"
            >
              {missionsDesc}
            </Text>
          </Stack>
        </Container>
      </Flex>
    </>
  );
};

export default MissionsMonthHero;
