import { useEffect, useState } from 'react';
import { customAxios as axios } from '../helpers/customAxios';
import {
  Button,
  Container,
  Divider,
  Grid,
  Heading,
  HStack,
  Stack,
  Text,
} from '@chakra-ui/react';
import { MdArrowDropDown } from 'react-icons/md';
import EventCard from './EventCard';
import { DateTime } from 'luxon';
import { getRenderDate } from '../helpers/eventsHelpers';

const EventsPage = (props) => {
  const [eventsList, setEventsList] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [headerState, setHeaderState] = useState(null);

  const tagHeader = ['All', 'This Week', 'Featured', 'More Filters'];
  const tagList = ['All', 'This Week', 'Featured', 'Classes', 'Resources'];

  const onFilter = (e) => {
    setHeaderState(e.target.id);
    console.log(eventsList[0].eventTags);
    console.log(headerState);
    // header state is the filter
  };

  useEffect(() => {
    getEventsListFromDatabase();
    const id = props.match.params;
    if (id != null) {
      // call function to open eventcard
    }
  }, [props]);

  useEffect(() => {
    const handleChange = () => {
      if (window.innerWidth < 750) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    window.addEventListener('resize', handleChange);

    return () => {
      window.removeEventListener('resize', handleChange);
    };
  }, []);

  const getEventsListFromDatabase = async () => {
    try {
      const { data, status } = await axios.get('/api/announcement/get');

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
          } else return false;
        });
        filteredEndDate.sort((a, b) =>
          a.renderDate === ''
            ? 1
            : b.renderDate === ''
            ? -1
            : a.renderDate < b.renderDate
            ? -1
            : 1
        );
        // remove this code later
        filtered.push(...filteredEndDate);

        filtered.forEach((data) => {
          var i = Math.floor(Math.random() * 4);
          var j = Math.floor(Math.random() * 4);
          while (j === i) {
            j = Math.random() * 4;
          }
          data.eventTags = [];
          data.eventTags.push(tagList[i]);
          data.eventTags.push(tagList[j]);
        });
        console.log(eventsList[0]);
        setEventsList([...filtered]);
      } else {
        throw Error('Something went wrong with the request');
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Container maxW="container.xl">
      <Heading
        as="h1"
        mb="6"
        size="3xl"
        pt="16"
        fontWeight="900"
        textAlign="center"
      >
        Events
      </Heading>
      <Text
        fontSize={{ base: 'md', md: 'xl' }}
        textAlign="center"
        fontWeight="600"
        mb="10"
      >
        Check out what's happening at HMCC of Hong Kong!
      </Text>

      {isMobile ? (
        <></>
      ) : (
        <HStack
          border="1px"
          p={3}
          borderRadius={30}
          justifyContent="space-around"
          flexWrap="wrap"
          direction="row"
        >
          {/* TODO: handle the logic of filtering */}
          {tagHeader.map((tag, i) => (
            <Button
              width={['34vw', '14vw']}
              size="lg"
              borderRadius={20}
              key={'button' + i}
              rightIcon={i === 3 ? <MdArrowDropDown /> : null}
            >
              {tag}
            </Button>
          ))}
        </HStack>
      )}
      <Stack
        border="1px"
        mt="5"
        p={4}
        borderRadius={30}
        justifyContent="space-evenly"
        flexWrap="wrap"
        direction="row"
        spacing={2}
      >
        {/* TODO: handle the logic of filtering */}
        {tagList.map((tag, i) => (
          <Button
            width={['24vw', '12vw']}
            size={['xs', 'lg']}
            borderRadius={20}
            p={2}
            key={'button' + i}
            _hover={{ bg: '#3F3F3F', textColor: '#ffffff' }}
            _active={{
              bg: '#3F3F3F',
              textColor: '#ffffff',
            }}
            id={i}
            onClick={onFilter}
          >
            {tag}
          </Button>
        ))}
      </Stack>
      <Grid
        mt="12"
        mb="12"
        templateColumns={{ sm: 'repeat(1, 1fr)', md: 'repeat(1, 1fr)' }}
        gap={[3, 6]}
      >
        {eventsList.length > 0 &&
          eventsList.map((event, i) => (
            <>
              <EventCard key={'event' + i} eventData={event} />
              <Divider />
            </>
          ))}
      </Grid>
    </Container>
  );
};

export default EventsPage;
