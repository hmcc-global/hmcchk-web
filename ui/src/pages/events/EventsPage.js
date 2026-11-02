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
import buildEventLists, { emptyEventLists } from './buildEventLists';
import { useEventsInitialData } from './EventsInitialData';

const TAG_CHIPS = ['All', 'This Week', 'Featured'];

const EventsPage = () => {
  const serverData = useEventsInitialData();
  const [initialData] = useState(serverData);
  const [initialLists] = useState(() =>
    initialData
      ? buildEventLists(initialData.events, DateTime.fromISO(initialData.now))
      : emptyEventLists()
  );
  const [eventsList, setEventsList] = useState(initialLists.eventsList);
  const [thisWeekList, setThisWeekList] = useState(initialLists.thisWeekList);
  const [featuredList, setFeaturedList] = useState(initialLists.featuredList);
  const [filteredList, setFilteredList] = useState(initialLists.eventsList);
  const [tagList, setTagList] = useState(initialLists.tagList);
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
    if (!initialData) getEventsListFromDatabase();
  }, [initialData]);

  const getEventsListFromDatabase = async () => {
    try {
      const { data, status } = await axios.get('/api/announcement/get');

      if (status === 200) {
        const lists = buildEventLists(data, DateTime.now());
        setFeaturedList(lists.featuredList);
        setThisWeekList(lists.thisWeekList);
        setTagList(lists.tagList);
        setEventsList(lists.eventsList);
        setFilteredList(lists.eventsList);
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
                bgColor={isActive ? '#4A6EEB' : 'white'}
                color={isActive ? 'white' : '#4A6EEB'}
                _hover={
                  isActive
                    ? {
                        bgColor: '#5C7BF0',
                        color: 'white',
                        borderColor: '#5C7BF0',
                      }
                    : { bgColor: '#DFE7FF' }
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
