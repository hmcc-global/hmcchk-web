import {
  chakra,
  Box,
  Container,
  Flex,
  HStack,
  Image,
  Text,
  VStack,
  Heading,
  Link,
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
      const { data, status } = await axios.get(
        "/api/announcements/get-announcements"
      );
      const filtered = data.filter((item) => {
        if (item.endDate) {
          const endDate = new DateTime.fromISO(item.endDate);
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
    <Flex w="full" h="100vh" direction="column">
      <Container
        maxW={["container.md", "container.lg"]}
        justifyContent="center"
        display="flex"
        h="50%"
      >
        <VStack>
          <FeaturedEvent />
        </VStack>
      </Container>
      <Container maxW="container.lg" justifyContent="center" display="flex">
        <VStack w="full">
          <HStack w="full" whiteSpace="nowrap" height="10vh">
            <Heading color="black">Upcoming Events</Heading>
            <chakra.hr
              width="full"
              color="black"
              border="none"
              height="2px"
              bgColor="black"
            />
            <Text color="black">
              <Link target="_blank" href="/events">
                {allEventsText}
              </Link>
            </Text>
          </HStack>
        </VStack>
      </Container>
      <Box
        w="full"
        display="flex"
        justifyContent="flex-start"
        overflowX="hidden"
        overflowY="hidden"
        whiteSpace="nowrap"
        _hover={{
          overflowX: "auto",
        }}
      >
        <HStack spacing={4} padding={5} justifyContent="flex-start">
          {events.length > 0 &&
            events.map((event, i) => (
              <EventsSectionCard
                width="500px"
                height="auto"
                event={event}
                key={"event" + i}
              />
            ))}
        </HStack>
      </Box>
    </Flex>
  );
};

export default EventsSection;
