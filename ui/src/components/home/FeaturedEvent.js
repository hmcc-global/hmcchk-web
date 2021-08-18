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
} from "@chakra-ui/react";

const scEventText = "Sunday Celebration: 10AM HKT in-person & Online";
const allEventsText = "all events >";
const FeaturedEvent = (props) => {
  return (
    <Flex w="full" h="100vh" justify="center">
      <Box w="auto" mt="-10vh">
        <HStack whiteSpace="nowrap">
          <Text color="white">{scEventText}</Text>
          <chakra.hr width="full" color="white" />
          <Text color="white">HMCC of Hong Kong</Text>
        </HStack>
        {/* TODO figure out a way to put a placeholder container */}
        <Image
          borderRadius={10}
          borderWidth={1}
          borderColor="white"
          mt={5}
          w="full"
          h="auto"
          src="https://hongkong.hmcc.net/wp-content/uploads/whats-new-sss-final.png"
          alt="Featured Event"
        />
      </Box>
    </Flex>
  );
};

export default FeaturedEvent;
