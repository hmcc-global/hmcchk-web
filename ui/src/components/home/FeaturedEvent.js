import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  Image,
  Text,
  chakra,
  Link,
  Stack,
} from "@chakra-ui/react";

const scEventText = "Sunday Celebration: 10AM HKT in-person & Online";
const allEventsText = "all events >";
const FeaturedEvent = (props) => {
  return (
    <Flex w="full" h="full" justify="center">
      <Box w="full" mt={["-5em", "-8em"]}>
        <Stack
          whiteSpace="nowrap"
          w="full"
          direction={["column", "row"]}
          alignItems="center"
          fontWeight="bold"
        >
          <Text fontSize={["0.7em", "1em"]} color="white">
            {scEventText}
          </Text>
          <chakra.hr display={["none", "block"]} width="full" color="white" />
          <Text display={["none", "block"]} color="white">
            HMCC of Hong Kong
          </Text>
          <Text display={["block", "none"]} fontSize="0.7em" color="white">
            Harvest Mission Community Church of Hong Kong
          </Text>
        </Stack>
        {/* TODO figure out a way to put a placeholder container */}
        <Image
          borderRadius={10}
          borderWidth={1}
          borderColor="white"
          mt={5}
          w={["100vw", "100vw", "100vw", "65vw", "100vw", "100vw"]}
          h="auto"
          src="https://hongkong.sub.hmcc.net/wp-content/uploads/whats-new-sss-final.png"
          alt="Featured Event"
        />
      </Box>
    </Flex>
  );
};

export default FeaturedEvent;
