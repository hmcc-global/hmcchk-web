import { useEffect, useState } from "react";
import { customAxios as axios } from "../helpers/customAxios";
import { Container, Grid, Heading, Text } from "@chakra-ui/react";
import EventCard from "./EventCard";
import { DateTime } from "luxon";
import { getRenderDate } from "../helpers/eventsHelpers";

const EventsPage = (props) => {
  const { user } = props;
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
            // Add one day to offset end date to end of day
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
        setEventsList([...filtered]);
      } else {
        throw Error("Something went wrong with the request");
      }
    } catch (err) {
      console.log(err);
    }
  };
console.log("test")
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
