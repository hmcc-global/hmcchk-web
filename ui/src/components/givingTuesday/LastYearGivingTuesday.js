import { Stack, Link, Box, Text, Center, Image } from "@chakra-ui/react";

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
    >
      <Text
        color="#B1A38F"
        fontWeight="900"
        fontSize={["1.1rem", "1.75rem"]}
        pt={[3, 7]}
      >
        Last Year's Giving Tuesday
      </Text>
      <Stack fontSize={["0.7rem", "md"]} pl={7} pr={7} spacing={[5, 3]}>
        <Text>
          <b>111 people gave for a total of HK$192,331.09</b>
        </Text>
        <Box>
          <Text>
            <b>HK$60k</b> total given to{" "}
            <b>missionaries / missions organizations</b>:
          </Text>
          <Text>
            HK$20k each to 1) HKCNP, 2) Christian Action, and 3) Missionary
            David Ro
          </Text>
        </Box>
      </Stack>

      <Center margin="auto" pt={5} pb={7}>
        <Stack direction="row" w="fit-content">
          <Image
            h={["6vh", "10vh"]}
            borderRadius={["xl", "3xl"]}
            src={process.env.PUBLIC_URL + "/images/givingTuesday/last-1.png"}
          />
          <Image
            h={["6vh", "10vh"]}
            borderRadius={["xl", "3xl"]}
            src={process.env.PUBLIC_URL + "/images/givingTuesday/last-2.png"}
          />
          <Image
            h={["6vh", "10vh"]}
            borderRadius={["xl", "3xl"]}
            src={process.env.PUBLIC_URL + "/images/givingTuesday/last-3.png"}
          />
        </Stack>
      </Center>
    </Stack>
  );
};

export default LastYearGivingTuesday;
