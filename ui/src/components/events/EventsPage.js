import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Grid, Heading, Text } from "@chakra-ui/react";
import EventCard from "./EventCard";
import { DateTime } from "luxon";
import { getRenderDate } from "../helpers/eventsHelpers";

const EventsPage = (props) => {
  const [eventsList, setEventsList] = useState([]);

  useEffect(() => {
    getEventsListFromDatabase();
    const id = props.match.params;
    if (id != null) {
      // call function to open eventcard
    }
  }, []);

  const getEventsListFromDatabase = async () => {
    try {
      const { data, status } = await axios.get(
        "/api/announcements/get-announcements"
      );
      if (status === 200) {
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
        setEventsList([...filtered]);
      } else {
        throw Error("Something went wrong with the request");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container maxW="container.lg">
      <Heading
        as="h2"
        mb="2"
        size="2xl"
        pt="20"
        fontWeight="900"
        textAlign="center"
      >
        Events
      </Heading>
      <Text fontSize={{ base: "sm", md: "md" }} textAlign="center">
        Check out what's happening at HMCC of Hong Kong!
      </Text>
      <Grid
        mt="12"
        mb="12"
        templateColumns={{ sm: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
        gap={[3, 6]}
      >
        {eventsList.length > 0 &&
          eventsList.map((event, i) => (
            <EventCard key={"event" + i} eventData={event} />
          ))}
      </Grid>
    </Container>
  );
};

export default EventsPage;
