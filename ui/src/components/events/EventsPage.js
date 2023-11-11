import { useEffect, useState } from 'react';
import { customAxios as axios } from '../helpers/customAxios';
import { Container, Grid, Heading, Text } from '@chakra-ui/react';
import EventCard from './EventCard';
import { DateTime } from 'luxon';
import { getRenderDate } from '../helpers/eventsHelpers';

const EventsPage = (props) => {
  const [eventsList, setEventsList] = useState([]);

  useEffect(() => {
    getEventsListFromDatabase();
    const id = props.match.params;
    if (id != null) {
      // call function to open eventcard
    }
  }, [props]);

  const getEventsListFromDatabase = async () => {
    try {
      const { data, status } = await axios.get(
        '/api/announcement/get'
        );

      if (status === 200) {
        const filtered = [];
        const filteredEndDate = data.filter((item) => {
          if (item.displayEndDateTime !== '') {
            // Add one day to offset end date to end of day
            let endDate = new DateTime.fromISO(item.displayEndDateTime);
            const renderDate = getRenderDate(
              item.eventStartDate,
              item.eventEndDate,
              item.eventInterval,
              item.eventStartTime
            );
            item.renderDate = renderDate;
            return endDate > DateTime.now();
          }  else return false;
        });
        filteredEndDate.sort((a, b) => (a.renderDate === "" || b.renderDate === "" ? -1 : a.renderDate > b.renderDate ? 1 : -1));
        filtered.push(...filteredEndDate);
        setEventsList([...filtered]);
      } else {
        throw Error('Something went wrong with the request');
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Container maxW="container.lg">
      <Container
        maxW="container.lg"
        bgImage={`url('${process.env.PUBLIC_URL}/images/event_banner.png')`}
        bgPosition="center"
        bgSize="cover"
        marginTop="10"
        paddingBottom="20"
        borderWidth="1px"
        borderRadius="20"
      >
        <Heading
          as="h2"
          mb="2"
          size="2xl"
          pt="20"
          fontWeight="900"
          textAlign="center"
          textColor="rgba(255, 255, 255, 1)"
        >
          Events
        </Heading>
        <Text
          fontSize={{ base: 'sm', md: 'md' }}
          textAlign="center"
          textColor="rgba(255, 255, 255, 1)"
          fontWeight="600"
        >
          Check out what's happening at HMCC of Hong Kong!
        </Text>
      </Container>
      <Grid
        mt="12"
        mb="12"
        templateColumns={{ sm: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
        gap={[3, 6]}
      >
        {eventsList.length > 0 &&
          eventsList.map((event, i) => (
            <EventCard key={'event' + i} eventData={event} />
          ))}
      </Grid>
    </Container>
  );
};

export default EventsPage;
