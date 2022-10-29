import { Container, Flex, Heading, Image, Stack, Text } from '@chakra-ui/react';

const MissionsMonthVerse = () => {
  const verse = `And there is salvation in no one else, for there is no other name under heaven given among men by which we must be saved.”`;
  return (
    <Flex
      w="full"
      h="auto"
      direction="column"
      alignItems="center"
      paddingTop="2em"
      paddingBottom="2em"
      background="#DDE9FF"
    >
      <Container maxW="container.lg" justifyContent="center" display="flex">
        <Stack direction="row" position="relative">
          <Image
            src={`${process.env.PUBLIC_URL}/images/missions-month/start_quotes.svg`}
            position="relative"
            bottom="70%"
            width={{ base: '15%', md: '10%' }}
          />
          <Stack
            direction="column"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Heading
              letterSpacing="0.05em"
              color="#FE6F3A"
              fontSize={{ base: '24px', md: '48px' }}
              fontWeight={600}
              fontFamily= 'Akshar'
            >
              Acts 4:12
            </Heading>
            <Text
              style={{ textAlign: 'center' }}
              fontSize={{ base: '12px', md: '16px' }}
              fontFamily= 'Lexend Deca'
            >
              {verse}
            </Text>
          </Stack>
          <Image
            src={`${process.env.PUBLIC_URL}/images/missions-month/end_quotes.svg`}
            position="relative"
            top="70%"
            width={{ base: '15%', md: '10%' }}
          />
        </Stack>
      </Container>
    </Flex>
  );
};

export default MissionsMonthVerse;
