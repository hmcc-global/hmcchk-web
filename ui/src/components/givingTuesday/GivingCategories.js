import { Stack, HStack, Box, Text, Image, Center } from "@chakra-ui/react";

const CategoryCard = (props) => {
  const { iconLink, text } = props;
  return (
    <Stack
      borderWidth={1}
      borderRadius="3xl"
      borderColor="ite"
      background="white"
      shadow="md"
      flex="1"
      justifyContent="center"
      p={[7, 10]}
      pt={[3, 7]}
      pb={[3, 5]}
      textAlign="center"
      verticalAlign="middle"
      color="#79A9A6"
      fontWeight="700"
      fontSize={["1.1rem", "1.25rem"]}
      direction={["row", "column"]}
    >
      <Center mb={1} flex={1}>
        <Image h="2rem" src={iconLink} />
      </Center>
      <Stack spacing={0} flex={[4, 1]}>
        <Center>{text[0]}</Center>
        <Center>{text[1]}</Center>
      </Stack>
    </Stack>
  );
};

const GivingCategories = (props) => {
  const { accentColor } = props;

  return (
    <Stack direction="column" spacing={0}>
      <Box pt={[3, 3]} pb={[3, 8]} pl={[3, 38]} pr={[3, 38]} textAlign="center">
        <Text
          color={accentColor}
          fontWeight="900"
          fontSize={["1.4rem", "1.875rem"]}
        >
          Giving Categories for Giving Tuesday 2021
        </Text>
        <Text mt={3} fontSize={["0.7rem", "md"]}>
          Join us as we commit to spending 24 hours <b>this coming Tuesday</b>{" "}
          to cultivate generous hearts and give towards the following causes or
          categories:
        </Text>
      </Box>
      <Stack direction={["column", "row"]} spacing={[1, 4]}>
        <CategoryCard
          text={["Our Church Budget", "(BGT)"]}
          iconLink={
            process.env.PUBLIC_URL + "/images/givingTuesday/1-church.png"
          }
        />
        <CategoryCard
          text={["Partnering NGOs", "(NGO)"]}
          iconLink={process.env.PUBLIC_URL + "/images/givingTuesday/2-ngo.png"}
        />
        <CategoryCard
          text={["Churches affected", "by COVID (CHS)"]}
          iconLink={
            process.env.PUBLIC_URL + "/images/givingTuesday/3-other.png"
          }
        />
      </Stack>
    </Stack>
  );
};

export default GivingCategories;
