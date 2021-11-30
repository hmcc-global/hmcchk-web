import { Stack, Box, Text, Image, Center } from "@chakra-ui/react";

const CategoryCard = (props) => {
  const { iconLink, text, givingValue, eventStatus } = props;
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
      <Stack direction={["row", "column"]} p={[7, 10]} pt={[3, 7]} pb={[1, 5]}>
        <Center mb={1} flex={1}>
          <Image h="2rem" src={iconLink} />
        </Center>
        <Stack
          spacing={0}
          flex={[4, 1]}
          fontWeight="700"
          fontSize={["1.1rem", "1.25rem"]}
          textAlign="center"
          color="#79A9A6"
          verticalAlign="middle"
          justifyContent="center"
        >
          <Center>{text[0]}</Center>
          <Center>{text[1]}</Center>
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
        return "GIVING TUESDAY 2021 SUMMARY";
      case "during":
        return "GIVING LIVE UPDATES";
      default:
        return "Giving Categories for Giving Tuesday 2021";
    }
  };

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const cardData = [
    {
      iconLink: process.env.PUBLIC_URL + "/images/givingTuesday/1-church.png",
      text: ["Our Church Budget", "(BGT)"],
      givingValue: numberWithCommas(givingData[0]),
    },
    {
      iconLink: process.env.PUBLIC_URL + "/images/givingTuesday/2-ngo.png",
      text: ["Partnering NGOs", "(NGO)"],
      givingValue: numberWithCommas(givingData[1]),
    },
    {
      iconLink: process.env.PUBLIC_URL + "/images/givingTuesday/3-other.png",
      text: ["Churches affected", "by COVID (CHS)"],
      givingValue: numberWithCommas(givingData[2]),
    },
  ];
  const givingSum = givingData[0] + givingData[1] + givingData[2];

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
          borderColor="#0628A3"
          background="#0628A3"
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
