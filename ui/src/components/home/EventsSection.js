import {
  chakra,
  Box,
  Container,
  Flex,
  HStack,
  Text,
  VStack,
  Heading,
  Link,
  Button,
  LinkOverlay,
} from "@chakra-ui/react";
import axios from "axios";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { getRenderDate } from "../helpers/eventsHelpers";
import EventsSectionCard from "./EventsSectionCards";
import FeaturedEvent from "./FeaturedEvent";

const allEventsText = "all events >";

const EventsSection = () => {
  const [events, setEvents] = useState([]);

  const populateData = async () => {
    try {
      const { data } = await axios.get("/api/announcements/get-announcements");
      const filtered = data.filter((item) => {
        if (item.endDate) {
          let endDate = new DateTime.fromISO(item.endDate).plus({ days: 1 });
          const renderDate = getRenderDate(
            item.startDate,
            item.endDate,
            item.recurrence
          );
          item.renderDate = renderDate;
          return endDate > DateTime.now();
        } else return false;
      });
      filtered.sort((a, b) => (a.renderDate > b.renderDate ? 1 : -1));
      let upcoming = filtered.slice(0, 5);
      setEvents(upcoming);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    populateData();
  }, []);

  return (
    <Flex w="full" h={["95vh", "auto"]} direction="column">
      <Container
        maxW="container.lg"
        justifyContent="center"
        display="flex"
      >
        <VStack>
          <FeaturedEvent />
        </VStack>
      </Container>
      <Container
        maxW="container.lg"
        justifyContent="center"
        display="flex"
        marginTop="2em"
      >
        <VStack w="full" alignItems={["flex-start", null]}>
          <HStack w={[null, "full"]} whiteSpace="nowrap" height="10vh">
            <Heading fontSize={["2em", "5xl"]} color="black">
              Upcoming Events
            </Heading>
            <chakra.hr
              width="full"
              color="black"
              border="none"
              height="2px"
              bgColor="black"
              display={["none", "block"]}
            />
            <Text color="black" display={["none", "block"]} fontWeight="900">
              <Link href="/events">{allEventsText}</Link>
            </Text>
          </HStack>
        </VStack>
      </Container>
      <Box
        w="full"
        display="flex"
        justifyContent="flex-start"
        overflowX={["auto", "auto", "auto", "auto", "hidden"]}
        overflowY="hidden"
        whiteSpace="nowrap"
        marginBottom="1.5em"
        _hover={{
          overflowX: "auto",
        }}
      >
        <HStack spacing={4} padding={5} justifyContent="flex-start">
          {events.length > 0 &&
            events.map((event, i) => (
              <EventsSectionCard
                width={["15em", "35em"]}
                height="auto"
                event={event}
                key={"event" + i}
              />
            ))}
        </HStack>
      </Box>
      <Button
        display={["block", "none"]}
        width="15em"
        color="white"
        bgColor="black"
        alignSelf="center"
        mt="5%"
        mb="5%"
      >
        <LinkOverlay href="/events">All events</LinkOverlay>
      </Button>
    </Flex>
  );
};

export default EventsSection;
