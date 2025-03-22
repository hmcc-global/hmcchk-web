import { useEffect, useState } from 'react';
import { customAxios as axios } from '../helpers/customAxios';
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Heading,
  Select,
  Stack,
  Text,
  Wrap,
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
          if (item.displayStartDateTime) {
            let displayStartDate = new DateTime.fromISO(
              item.displayStartDateTime
            );
            if (displayStartDate > DateTime.now()) return false;
          }

          if (item.displayEndDateTime !== '') {
            // Add one day to offset end date to end of day
            let endDate = new DateTime.fromISO(item.displayEndDateTime);
            let startDate = new DateTime.fromISO(item.displayStartDateTime);
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
    <Box bg="#F7F9FF">
      <Container maxW="container.xl">
        <Heading
          as="h1"
          mb="6"
          size="3xl"
          pt="16"
          fontWeight="400"
          textAlign="left"
          fontFamily="DMSerifDisplay_Italic"
        >
          Events
        </Heading>
        <Text
          fontSize={{ base: 'md', md: 'xl' }}
          textAlign="left"
          fontWeight="600"
          fontFamily="Manrope"
          mb="10"
        >
          Check out what's happening at HMCC of Hong Kong!
        </Text>
        <Stack
          border="1px"
          borderColor="#DFE7FF"
          p={3}
          borderRadius={['0.938rem', '3.188rem']}
          justifyContent="space-around"
          flexDirection={['column', 'row']}
          spacing={[2, 0]}
          zIndex={999}
          top={2}
          position="sticky"
          alignItems="center"
          bg="#F6FAFF"
        >
          <Wrap spacing={['0.5rem', '1rem']} align="center" justify="center">
            {tagHeader.map((tag, i) => (
              <Button
                width={['26vw','15vw']}
                height={['2rem', '2.625rem']}
                borderRadius="1.875rem"
                key={'button' + i}
                m="0rem"
                _hover={{ opacity: '90%' }}
                bg={selectedFilterIndex === i ? '#4A6EEB' : '#DFE7FF'}
                color={selectedFilterIndex === i ? '#ffffff' : ''}
                id={i}
                onClick={onFilter}
              >
                <Text id={i} fontSize={{ base: '80%', sm: '100%' }}>
                  {tag}
                </Text>
              </Button>
            ))}
            <Select
              placeholder="More Filters"
              fontSize={{ base: '80%', sm: '100%' }}
              fontWeight="600"
              textAlign="center"
              width={['83vw', '15vw']}
              height={['2rem', '2.625rem']}
              borderRadius="1.875rem"
              rightIcon={<MdArrowDropDown />}
              variant="filled"
              bg={selectedOption !== '' ? '#DFE7FF' : '#DFE7FF'}
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
          </Wrap>
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
                {i !== filteredList.length - 1 && <Divider borderColor="#A8A8A8"/>}
              </>
            ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default EventsPage;
