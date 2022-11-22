import { Stack, Box, Text } from '@chakra-ui/react';

const LastYearGivingTuesday = (props) => {
  return (
    <Stack
      direction="column"
      spacing={0}
      borderWidth={1}
      borderRadius="3xl"
      borderColor="white"
      background="white"
      shadow="md"
      textAlign="center"
      paddingBottom={[6, 9]}
    >
      <Text
        color="#F9916B"
        fontWeight="900"
        fontSize={['1.1rem', '1.75rem']}
        pt={[3, 7]}
        my="2"
      >
        Last Year's Giving Tuesday
      </Text>
      <Stack fontSize={['0.7rem', 'md']} pl={7} pr={7} spacing={[5, 3]}>
        <Text>
          <b>157 person</b> gave for a <b> total of HK$286,171.58</b>
        </Text>
        <Box>
          <Text>
            <b>Giving towards 3 categories:</b>
          </Text>
          <Text>
            1) Our Church Budget, 2) Partnering NGOs, 3) Churches Affected by
            Covid
          </Text>
        </Box>
      </Stack>
    </Stack>
  );
};

export default LastYearGivingTuesday;
