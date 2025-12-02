import { Stack, Box, Text } from '@chakra-ui/react';

const LastYearGivingTuesday = (props) => {
  return (
    <Stack direction="column" spacing={0} paddingBottom={[6, 9]}>
      <Text
        color="#00328D"
        fontWeight="900"
        fontSize={['26', '40']}
        pt={7}
        fontFamily="DMserifText"
      >
        Summary of Giving Tuesday last Year
      </Text>

      <Stack
        direction={['column', 'row']}
        borderWidth={1}
        borderRadius="2xl"
        borderColor="#DFE7FF"
        background="#DFE7FF"
        color="white"
        shadow="md"
        fontSize={['1rem', '1.75rem']}
        fontWeight={700}
        display="flex"
        justifyContent="space-evenly"
        px={[5, 30]}
        py={5}
      >
        <Stack direction={['column', 'column']} flex={1}>
          <Text
            flex={1}
            textAlign={['center', 'center']}
            fontSize={['14', '30']}
            fontFamily="DMSerifText"
            color="#183B5D"
          >
            Total Amount Raised:
          </Text>
          <Text
            flex={1}
            textAlign={['center', 'center']}
            fontFamily="DMserifText"
            fontSize={['30', '45']}
            color="#183B5D"
          >
            103,375
          </Text>
        </Stack>
        <Box
          display={{ base: 'none', md: 'flex' }}
          width="1px"
          background="#183B5D"
        ></Box>
        <Box
          display={{ base: 'flex', md: 'none' }}
          height="1px"
          background="#183B5D"
        ></Box>
        <Stack direction={['column', 'column']} flex={1}>
          <Text
            flex={1}
            textAlign={['center', 'center']}
            fontSize={['14', '30']}
            fontFamily="DMSerifText"
            color="#183B5D"
          >
            Number of Givers:
          </Text>
          <Text
            flex={1}
            textAlign={['center', 'center']}
            fontFamily="DMserifText"
            fontSize={['30', '45']}
            color="#183B5D"
          >
            103
          </Text>
        </Stack>
      </Stack>
      <Box
        w="100%"
        textAlign="center"
        py={[2, 4]}
        fontSize={['14', '20']}
        fontFamily="Manrope"
      >
        <Text>
          <b>Giving towards 3 categories:</b>
        </Text>
        <Text>1) Cityserve 2) Missions, 3) Saturate Vision</Text>
      </Box>
    </Stack>
  );
};

export default LastYearGivingTuesday;
