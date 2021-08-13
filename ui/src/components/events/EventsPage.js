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
      const filtered = data.filter((item) => {
        if (item.endDate) {
          const endDate = new DateTime.fromISO(item.endDate);
          const renderDate = getRenderDate(item.startDate,
            item.endDate,
            item.recurrence)
          item.renderDate = renderDate;
          return endDate > DateTime.now();
        } else return false;
      });
      filtered.sort((a, b) => (a.renderDate > b.renderDate ? 1 : -1))
      // console.log(filtered)
      setEventsList([...filtered]);
      // console.log(eventsList);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container maxW="container.lg" bg="white">
      <Heading as="h2" size="3xl" pt="20" textAlign="center">
        Events
      </Heading>
      <Text textAlign="center">
        Check out what's happening at HMCC of Hong Kong!
      </Text>
      <Grid mt="12" templateColumns={{sm: "repeat(1, 1fr)", md: "repeat(2, 1fr)"}} gap={6}>
        {eventsList.length > 0 &&
          eventsList.map((event, i) => (
            <EventCard key={"event" + i} eventData={event} />
          ))}
      </Grid>
    </Container>
  );
};

export default EventsPage;
