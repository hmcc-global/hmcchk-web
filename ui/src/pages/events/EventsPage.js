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
  Stack,
  Text,
} from 'components';
import { FaCheck } from 'react-icons/fa';
import EventCard from './EventCard';
import MinistryFilter from './MinistryFilter';
import { DateTime } from 'luxon';
import { getRenderDate } from 'utils/eventsHelpers';
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
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const tagHeader = ['All', 'This Week', 'Featured'];

  const onFilter = (e) => {
    let index = parseInt(e.target.id);
    setSelectedFilterIndex(index);
    setSelectedOption('');
    setIsMoreOpen(false);
    if (index === 1) {
      setFilteredList([...thisWeekList]);
    } else if (index === 2) {
      setFilteredList([...featuredList]);
    } else if (index === 0) {
      setFilteredList([...eventsList]);
    }
  };

  const filterByMinistry = (indexStr) => {
    let tag = tagList[Number(indexStr)];
    const filtered = [];
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
    return filtered;
  };

  const handlePickMinistry = (indexStr) => {
    setSelectedOption(indexStr);
    setSelectedFilterIndex(-1);
    setIsMoreOpen(false);
    setFilteredList(filterByMinistry(indexStr));
  };

  const isAllFilter = selectedOption === '' && selectedFilterIndex === 0;

  const clearMinistry = () => {
    setSelectedOption('');
    setSelectedFilterIndex(0);
    setIsMoreOpen(false);
    setFilteredList([...eventsList]);
  };

  const toggleMore = () => setIsMoreOpen((open) => !open);

  const renderMinistryPanel = (id, w = '100%') => (
    <Box
      id={id}
      w={w}
      position="absolute"
      top="calc(100% + 12px)"
      right={0}
      zIndex={2}
      border="1px solid"
      borderColor="#E2E8F0"
      borderRadius={20}
      bg="white"
      boxShadow="0 12px 32px rgba(26, 32, 44, 0.14)"
      p={{ base: 2, md: 2 }}
    >
      <Stack direction="column" spacing={{ base: 1, md: 1.5 }}>
        <Button
          key="ministry-all"
          w="100%"
          h="40px"
          borderRadius={14}
          px={{ base: 2, md: 3 }}
          justifyContent="space-between"
          bg={isAllFilter ? '#4A6EEB' : 'transparent'}
          color={isAllFilter ? 'white' : '#1A202C'}
          fontWeight={isAllFilter ? 700 : 600}
          _hover={
            isAllFilter
              ? { bg: '#5C7BF0' }
              : { bgColor: 'rgba(74, 110, 235, 0.1)' }
          }
          type="button"
          aria-pressed={isAllFilter}
          onClick={clearMinistry}
        >
          <Text fontSize={{ base: 'xs', md: 'md' }}>All events</Text>
          {isAllFilter && <FaCheck />}
        </Button>
        {tagList.length === 0 ? (
          <Button
            w="100%"
            h="40px"
            borderRadius={14}
            px={{ base: 2, md: 3 }}
            justifyContent="flex-start"
            isDisabled
          >
            <Text fontSize={{ base: 'xs', md: 'sm' }}>No ministries yet</Text>
          </Button>
        ) : (
          tagList.map((tag, i) => {
            const isActive = selectedOption === String(i);
            return (
              <Button
                key={'ministry-' + i}
                w="100%"
                h="40px"
                borderRadius={14}
                px={{ base: 2, md: 3 }}
                justifyContent="space-between"
                bg={isActive ? '#4A6EEB' : 'transparent'}
                color={isActive ? 'white' : '#1A202C'}
                fontWeight={isActive ? 700 : 600}
                _hover={
                  isActive
                    ? { bg: '#5C7BF0' }
                    : { bgColor: 'rgba(74, 110, 235, 0.1)' }
                }
                type="button"
                aria-pressed={isActive}
                onClick={() =>
                  isActive ? clearMinistry() : handlePickMinistry(String(i))
                }
              >
                <Text fontSize={{ base: 'xs', md: 'md' }}>{tag}</Text>
                {isActive && <FaCheck />}
              </Button>
            );
          })
        )}
      </Stack>
    </Box>
  );

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

  const chipProps = (i) => ({
    variant: 'outline',
    borderRadius: 30,
    h: { base: '36px', md: '40px' },
    px: 2,
    transition: 'all 0.18s',
    borderColor: '#4A6EEB',
    bg: selectedFilterIndex === i ? '#4A6EEB' : 'transparent',
    color: selectedFilterIndex === i ? 'white' : '#4A6EEB',
    _hover:
      selectedFilterIndex === i
        ? { bg: '#5C7BF0', color: 'white', borderColor: '#5C7BF0' }
        : {
            borderColor: '#4A6EEB',
            bgColor: 'rgba(74, 110, 235, 0.1)',
            color: '#4A6EEB',
          },
    type: 'button',
    'aria-pressed': selectedFilterIndex === i,
    id: i,
    onClick: onFilter,
  });

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
      <Stack
        className="events-filter"
        borderRadius={30}
        flexDirection={['column', 'row']}
        spacing={[2, 0]}
        top={2}
        zIndex={1}
        position="sticky"
        alignItems="center"
      >
        <HStack
          w="100%"
          justify="space-between"
          spacing={2}
          display={{ base: 'flex', md: 'none' }}
        >
          {tagHeader.map((tag, i) => (
            <Button key={'button-mobile-' + i} flex="1" {...chipProps(i)}>
              <Text id={i} fontSize={{ base: 'xs', md: 'md' }}>
                {tag}
              </Text>
            </Button>
          ))}
          <MinistryFilter
            compact
            flex="1"
            panelId="ministry-panel-mobile"
            open={isMoreOpen}
            selected={selectedOption}
            tagList={tagList}
            onToggle={toggleMore}
            onClear={clearMinistry}
          />
          {isMoreOpen && renderMinistryPanel('ministry-panel-mobile', '240px')}
        </HStack>
        <HStack
          w="100%"
          justify="space-between"
          spacing={3}
          display={{ base: 'none', md: 'flex' }}
        >
          {tagHeader.map((tag, i) => (
            <Button
              key={'button-desktop-' + i}
              width="calc((100% - 36px) / 4)"
              {...chipProps(i)}
            >
              <Text id={i} fontSize={{ base: 'sm', md: 'md' }}>
                {tag}
              </Text>
            </Button>
          ))}
          <Box width="calc((100% - 36px) / 4)" position="relative">
            <MinistryFilter
              w="100%"
              panelId="ministry-panel-desktop"
              open={isMoreOpen}
              selected={selectedOption}
              tagList={tagList}
              onToggle={toggleMore}
              onClear={clearMinistry}
            />
            {isMoreOpen && renderMinistryPanel('ministry-panel-desktop')}
          </Box>
        </HStack>
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
