import { Fragment, useEffect, useState } from 'react';
import { customAxios as axios } from 'utils/customAxios';
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Heading,
  HStack,
  Text,
} from 'components';
import EventCard from './EventCard';
import EventTypeFilter from './EventTypeFilter';
import { DateTime } from 'luxon';
import { getRenderDate } from 'utils/eventsHelpers';
import isDateInThisWeek from './getWeek';

const TAG_CHIPS = ['All', 'This Week', 'Featured'];

const EventsPage = () => {
  const [eventsList, setEventsList] = useState([]);
  const [thisWeekList, setThisWeekList] = useState([]);
  const [featuredList, setFeaturedList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [tagList, setTagList] = useState([]);
  const [selectedTag, setSelectedTag] = useState('');
  const [selectedFilterIndex, setSelectedFilterIndex] = useState(0);

  const listsByChip = [eventsList, thisWeekList, featuredList];

  // Quick filters (All / This Week / Featured). Clears any eventType tag selection.
  const onFilter = (index) => {
    setSelectedFilterIndex(index);
    setSelectedTag('');
    setFilteredList([...listsByChip[index]]);
  };

  // Filter by announcement.eventType value (e.g. "Campus Ministry", "Classes").
  const onSelectTag = (tag) => {
    setSelectedTag(tag);
    setSelectedFilterIndex(-1);
    setFilteredList(
      eventsList.filter((data) =>
        data.eventType?.some((type) => type.value === tag)
      )
    );
  };

  useEffect(() => {
    getEventsListFromDatabase();
  }, []);

  const getEventsListFromDatabase = async () => {
    try {
      const { data, status } = await axios.get('/api/announcement/get');

      if (status === 200) {
        const tagsList = new Set();
        const filteredEndDate = data.filter((item) => {
          if (item.displayStartDateTime) {
            let displayStartDate = DateTime.fromISO(item.displayStartDateTime);
            if (displayStartDate > DateTime.now()) return false;
          }

          if (item.displayEndDateTime !== '') {
            // Add one day to offset end date to end of day
            let endDate = DateTime.fromISO(item.displayEndDateTime);
            let startDate = DateTime.fromISO(item.displayStartDateTime);
            const renderDate = getRenderDate(
              item.eventStartDate,
              item.eventEndDate,
              item.eventInterval,
              item.eventStartTime
            );
            item.renderDate = renderDate;

            return endDate > DateTime.now() && DateTime.now() > startDate;
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
        // Resources are last in the list
        filteredEndDate.sort((a, b) => {
          const hasOthersA = a.eventType?.some(
            (type) => type.value === 'Resources'
          );
          const hasOthersB = b.eventType?.some(
            (type) => type.value === 'Resources'
          );

          if (hasOthersA && !hasOthersB) {
            return 1;
          } else if (!hasOthersA && hasOthersB) {
            return -1;
          } else {
            return a.renderDate < b.renderDate ? -1 : 1;
          }
        });
        filteredEndDate.forEach((data) => {
          data.eventType?.forEach((tag) => tagsList.add(tag.value));
        });

        const featuredEvents = [];
        const thisWeekEvents = [];
        const moreFilterEvents = [];

        filteredEndDate.forEach((data) => {
          if (data.featured) {
            featuredEvents.push(data);
          }
          if (
            isDateInThisWeek(data.eventStartDate) ||
            isDateInThisWeek(data.eventEndDate) ||
            isDateInThisWeek(
              data.renderDate.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)
            )
          ) {
            thisWeekEvents.push(data);
          } else {
            moreFilterEvents.push(data);
          }
        });

        setFeaturedList(featuredEvents);
        setThisWeekList(thisWeekEvents);
        setTagList([...tagsList]);

        const sorted = new Set(
          featuredEvents.concat(thisWeekEvents, moreFilterEvents)
        );
        setEventsList([...sorted]);
        setFilteredList([...sorted]);
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
        fontFamily="DMSerifDisplay_Italic"
      >
        Events
      </Heading>
      <Text
        fontSize={{ base: 'md', md: 'xl' }}
        textAlign="center"
        fontWeight="600"
        fontFamily="Manrope"
        mb="10"
      >
        Check out what's happening at HMCC of Hong Kong!
      </Text>
      {/* Sticky must live on a block wrapper — HStack is flex and won't stick. */}
      <Box className="events-filter" position="sticky" top={2} zIndex={1}>
        <HStack w="100%" justify="space-between" spacing={{ base: 2, md: 3 }}>
          {TAG_CHIPS.map((tag, i) => {
            const isActive = selectedFilterIndex === i;
            return (
              <Button
                key={tag}
                flex="1"
                variant="outline"
                borderRadius={30}
                h={{ base: '36px', md: '40px' }}
                px={2}
                borderColor="#4A6EEB"
                bg={isActive ? '#4A6EEB' : 'white'}
                color={isActive ? 'white' : '#4A6EEB'}
                _hover={
                  isActive
                    ? { bg: '#5C7BF0', color: 'white', borderColor: '#5C7BF0' }
                    : { bg: '#DFE7FF' }
                }
                type="button"
                aria-pressed={isActive}
                onClick={() => onFilter(i)}
              >
                <Text fontSize={{ base: 'xs', md: 'md' }}>{tag}</Text>
              </Button>
            );
          })}
          <EventTypeFilter
            tagList={tagList}
            selectedTag={selectedTag}
            isAllActive={selectedFilterIndex === 0}
            onSelect={onSelectTag}
            onClear={() => onFilter(0)}
          />
        </HStack>
      </Box>
      <Grid
        mt="12"
        mb="12"
        mr={[0, 6]}
        templateColumns={{ sm: 'repeat(1, 1fr)', md: 'repeat(1, 1fr)' }}
        gap={[3, 6]}
      >
        {filteredList.length > 0 &&
          filteredList.map((event, i) => (
            <Fragment key={'event' + i}>
              <EventCard eventData={event} />
              {i !== filteredList.length - 1 && <Divider />}
            </Fragment>
          ))}
      </Grid>
    </Container>
  );
};

export default EventsPage;
