import { Stack, Box, Text, Image, Center } from "@chakra-ui/react";

const CategoryCard = (props) => {
  const { iconLink, text, desc, givingValue, eventStatus } = props;
  return (
    <Stack
      borderWidth={1}
      borderRadius="2xl"
      borderColor="white"
      background="white"
      shadow="md"
      flex="1"
      pb={1}
      pl={1}
      pr={1}
    >
      <Stack direction={["column"]} p={[7, 10]} pt={[3, 7]} pb={[1, 5]}>
        <Stack>
          <Center mb={1} flex={1}>
            <Image h="2rem" src={iconLink} />
          </Center>
          <Stack
            spacing={0}
            flex={[4, 1]}
            fontWeight="700"
            fontSize={["1.1rem", "1.25rem"]}
            textAlign="center"
            color="#74A0F1"
            verticalAlign="middle"
            justifyContent="center"
          >
            <Center>{text[0]}</Center>
            <Center>{text[1]}</Center>
          </Stack>
        </Stack>
        <Stack
          spacing={0}
          flex={[4, 1]}
          fontSize={["0.5rem", "0.7rem"]}
          textAlign="center"
          color="#000000"
          verticalAlign="middle"
          justifyContent="center"
        >
          <Center>{desc[0]}</Center>
          <Center>{desc[1]}</Center>
        </Stack>
      </Stack>
      {/* {eventStatus === "after" && (
        <Center
          background="#B1A38F"
          borderColor="#B1A38F"
          borderWidth={1}
          borderRadius="xl"
          p={[2, 3]}
        >
          <Text fontWeight="700" fontSize={["1.1rem", "1.25rem"]} color="white">
            HKD {givingValue}
          </Text>
        </Center>
      )} */}
    </Stack>
  );
};

const GivingUpdates = (props) => {
  const { accentColor, eventStatus, givingData } = props;

  const renderSwitch = () => {
    switch (eventStatus) {
      case "after":
        return "GIVING TUESDAY 2022 SUMMARY";
      case "during":
        return "GIVING LIVE UPDATES";
      default:
        return "Giving Categories for Giving Tuesday 2022";
    }
  };

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const cardData = [
    {
      iconLink: process.env.PUBLIC_URL + "/images/givingTuesday/1-global.png",
      text: ["Our Global Church (GC)"],
      desc: ["Missionaries/missions movements,", "churches outside of HK"],
      givingValue: numberWithCommas(givingData[0]),
    },
    {
      iconLink: process.env.PUBLIC_URL + "/images/givingTuesday/2-local.png",
      text: ["Our Local Church (LC)"],
      desc: ["Local church needs & church budget"],
      givingValue: numberWithCommas(givingData[1]),
    },
  ];
  const givingSum = givingData[0] + givingData[1];

  return (
    <Stack direction="column" spacing={5}>
      <Box pt={[3, 3]} pb={[1]} pl={[3, 38]} pr={[3, 38]} textAlign="center">
        <Text
          color={accentColor}
          fontWeight="900"
          fontSize={["1.4rem", "1.875rem"]}
        >
          {renderSwitch()}
        </Text>
        {eventStatus !== "after" && (
          <>
            <Text mt={3} fontSize={["0.7rem", "md"]}>
              Join us as we commit to spending <b>this coming Tuesday</b> to
              cultivate generous hearts and give towards the following causes or
              categories:
            </Text>
            <Text
              textAlign="center"
              color="#bbbbbb"
              fontSize={["0.5rem", "sm"]}
            >
              *Numbers will be updated at 13:00, 18:00, 23:00, 00:00
            </Text>
          </>
        )}
      </Box>
      {eventStatus !== "before" && (
        <Stack
          direction={["column", "row"]}
          borderWidth={1}
          borderRadius="2xl"
          borderColor="#5891FB"
          background="#5891FB"
          color="white"
          shadow="md"
          fontSize={["1rem", "1.75rem"]}
          fontWeight={700}
          px={[5, 30]}
          py={5}
        >
          <Stack direction={["row", "column"]} flex={1}>
            <Text flex={[2, 1]} textAlign={["left", "center"]}>
              Total Amount Raised
            </Text>
            <Text flex={1} textAlign={["right", "center"]}>
              HKD {numberWithCommas(givingSum)}
            </Text>
          </Stack>
          <Stack direction={["row", "column"]} flex={1}>
            <Text flex={[2, 1]} textAlign={["left", "center"]}>
              Number of Givers
            </Text>
            <Text flex={1} textAlign={["right", "center"]}>
              {givingData[3]}
            </Text>
          </Stack>
        </Stack>
      )}

      <Stack direction={["column", "row"]} spacing={[1, 4]}>
        {cardData.map((card, i) => (
          <CategoryCard
            key={"event" + i}
            text={card.text}
            desc={card.desc}
            iconLink={card.iconLink}
            givingValue={card.givingValue}
            eventStatus={eventStatus}
          />
        ))}
      </Stack>
    </Stack>
  );
};

export default GivingUpdates;
