import { Box, Container, Flex, Heading, Stack, Text } from '@chakra-ui/react';

const MissionsMonthHero = () => {
  const heroText = 'NO OTHER NAME';
  const heroDesc1 = 'MISSIONS MONTH';
  const heroDesc2 = 'NOVEMBER 2022';
  return (
    <Flex
      w="full"
      h="50vh"
      direction="column"
      alignItems="center"
      paddingTop="2em"
      paddingBottom="2em"
      bgImage={
        process.env.PUBLIC_URL + '/images/missions-month/no_other_name.jpg'
      }
      bgSize="cover"
      bgPosition="center center"
    >
      <Container maxW="container.lg" justifyContent="center" display="flex">
        <Stack direction="column">
          <Heading>{heroText}</Heading>
          <Box
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Text>{heroDesc1}</Text>
            <Text>{heroDesc2}</Text>
          </Box>
        </Stack>
      </Container>
    </Flex>
  );
};

export default MissionsMonthHero;
