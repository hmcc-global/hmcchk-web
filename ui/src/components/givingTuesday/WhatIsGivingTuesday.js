import { Stack, Box, Text, Link, Image, Center } from "@chakra-ui/react";

const WhatIsGivingTuesday = (props) => {
  const { accentColor } = props;

  return (
    <Box
      borderWidth={1}
      borderRadius="3xl"
      borderColor="white"
      background="white"
      pt={[3, 5]}
      pb={[3, 8]}
      pl={[3, 20]}
      pr={[3, 20]}
      shadow="md"
    >
      <Stack spacing={5} direction="column" textAlign="center">
        <Center>
          <Stack direction={["column", "row"]} spacing={[2, 5]}>
            <Center>
              <Image
                src={
                  process.env.PUBLIC_URL + "/images/givingTuesday/gt-logo.png"
                }
                h="1.875rem"
                w="auto"
                mt="0.4rem"
              />
            </Center>
            <Text
              color={accentColor}
              fontWeight="900"
              fontSize={["1.4rem", "1.875rem"]}
            >
              What is Giving Tuesday?
            </Text>
          </Stack>
        </Center>

        <Text px={[2, 0]} fontSize={["0.7rem", "md"]} mt={5}>
          <b>Giving Tuesday</b>{" "}
          <Link href="https://www.givingtuesday.org">
            (www.givingtuesday.org)
          </Link>{" "}
          is a global generosity movement unleashing the power of people and
          organizations to transform their communities and the world. It started
          as a way to grow a heart for generosity as people are purchasing
          materials during Black Friday and Cyber Monday.
        </Text>
        <Text px={[2, 0]} fontSize={["0.7rem", "md"]} mt={3} fontWeight="700">
          As a church, we want to continue to grow in a heart to give to others.
        </Text>
      </Stack>
    </Box>
  );
};

export default WhatIsGivingTuesday;
