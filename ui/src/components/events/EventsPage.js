import { useEffect, useState } from 'react';
import { customAxios as axios } from '../helpers/customAxios';
import {
  Button,
  Container,
  Divider,
  Grid,
  Heading,
  Select,
  Stack,
  Text,
} from '@chakra-ui/react';
import { MdArrowDropDown } from 'react-icons/md';
import EventCard from './EventCard';
import { DateTime } from 'luxon';
import { getRenderDate } from '../helpers/eventsHelpers';
import isDateInThisWeek from './getWeek';

const EventsPage = (props) => {
  const [eventsList, setEventsList] = useState([]);
  const [thisWeekList, setThisWeekList] = useState([]);
  const [featuredList, setFeaturedList] = useState([]);
  const [moreFilterList, setMoreFilterList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [tagList, setTagList] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedFilterIndex, setSelectedFilterIndex] = useState(0);

  const tagHeader = ['All', 'This Week', 'Featured'];

  const onFilter = (e) => {
    let index = parseInt(e.target.id);
    setSelectedFilterIndex(index);
    if (index === 1) {
      setFilteredList([...thisWeekList]);
    } else if (index === 2) {
      setFilteredList([...featuredList]);
    } else if (index === 0) {
      setFilteredList([...eventsList]);
    }
  };

  const onSelect = (e) => {
    if (e.target.value === '') {
      setFilteredList([...eventsList]);
      setSelectedOption('');
      return;
    }
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue);
    const filtered = [];
    let tag = tagList[selectedValue];
    eventsList.forEach((data) => {
      if (data.eventType) {
        for (let i = 0; i < data.eventType.length; i++) {
          if (data.eventType[i].value === tag) {
            filtered.push(data);
            break;
          }
        }
      }
    });
    setFilteredList([...filtered]);
  };

  useEffect(() => {
    getEventsListFromDatabase();
    const id = props.match.params;
    if (id != null) {
      // call function to open eventcard
    }
  }, [props]);

  const getEventsListFromDatabase = async () => {
    try {
      const { data, status } = await axios.get('/api/announcement/get');

      if (status === 200) {
        const filtered = [];
        const tagsList = new Set([]);
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
        filtered.push(...filteredEndDate);
        filtered.forEach((data) => {
          if (data.eventType === null || data.eventType === undefined) {
            console.log('data.eventType is null or undefined');
          } else if (data.eventType.length > 0) {
            data.eventType.forEach((tag) => {
              if (!tagsList.has(tag.value)) {
                tagsList.add(tag.value);
              }
            });
          }
        });

        const featuredEvents = [];
        const thisWeekEvents = [];
        const moreFilterEvents = [];

        filtered.forEach((data) => {
          if (data.featured) {
            featuredEvents.push(data);
          }
          if (isDateInThisWeek(data.eventStartDate)) {
            thisWeekEvents.push(data);
          } else {
            moreFilterEvents.push(data);
          }
        });

        setFeaturedList([...featuredEvents]);
        setThisWeekList([...thisWeekEvents]);
        setMoreFilterList([...moreFilterEvents]);
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
      <Stack
        border="1px"
        p={3}
        borderRadius={30}
        justifyContent="space-around"
        flexDirection={['column', 'row']}
        spacing={[2, 0]}
        zIndex={999}
        top={2}
        position="sticky"
        alignItems="center"
        bg="#ffffff"
      >
        <Grid templateColumns="repeat(3, 1fr)" gap={[3, 9]}>
          {tagHeader.map((tag, i) => (
            <Button
              width={['23vw', '14vw']}
              borderRadius={[15, 20]}
              key={'button' + i}
              m="0rem"
              _hover={{ opacity: '90%' }}
              bg={selectedFilterIndex === i ? '#3F3F3F' : 'gray.100'}
              color={selectedFilterIndex === i ? '#ffffff' : ''}
              id={i}
              onClick={onFilter}
            >
              <Text id={i} fontSize={{ base: '80%', sm: '100%' }}>
                {tag}
              </Text>
            </Button>
          ))}
        </Grid>
        <Select
          placeholder="More Filters"
          fontWeight="600"
          textAlign="center"
          width={['75vw', '14vw']}
          borderRadius={[15, 20]}
          rightIcon={<MdArrowDropDown />}
          variant="filled"
          bg={selectedOption !== '' ? '#3F3F3F' : 'gray.100'}
          color={selectedOption !== '' ? '#ffffff' : ''}
          _hover={{
            opacity: '90%',
          }}
          _focus={{
            bg: 'gray.100',
            color: '#000000',
          }}
          cursor="pointer"
          onChange={onSelect}
          value={selectedOption}
        >
          {tagList.map((tag, i) => (
            <option value={i}>{tag}</option>
          ))}
        </Select>
      </Stack>
      <Grid
        mt="12"
        mb="12"
        mr={[0, 6]}
        templateColumns={{ sm: 'repeat(1, 1fr)', md: 'repeat(1, 1fr)' }}
        gap={[3, 6]}
      >
        {filteredList.length > 0 &&
          filteredList.map((event, i) => (
            <>
              <EventCard key={'event' + i} eventData={event} />
              {i !== filteredList.length - 1 && <Divider />}
            </>
          ))}
      </Grid>
    </Container>
  );
};

export default EventsPage;
