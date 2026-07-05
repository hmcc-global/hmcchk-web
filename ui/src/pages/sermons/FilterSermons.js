import React from 'react';
import { Select, Container, Grid } from '@chakra-ui/react';
import { FaCaretDown } from 'react-icons/fa';
import { DateTime } from 'luxon';

// Utility function to get unique values
const getUniqueValues = (items, keyExtractor) => {
  return [
    ...new Set(
      items.map((item) => {
        const value = keyExtractor(item);
        return value !== null && value !== undefined ? value : null;
      })
    ),
  ].filter((value) => value !== null);
};

// Reusable FilterOption component
const FilterOption = ({ name, placeholder, options, onChange, value }) => (
  <Select
    style={{
      overflowY: 'scroll',
      textAlign: 'center',
      color: '#4A6EEB',
      fontWeight: '700',
    }}
    fontSize={{ base: '0.875rem', md: '1rem' }}
    icon={<FaCaretDown />}
    iconColor="#4A6EEB"
    iconSize="1rem"
    borderRadius="30px"
    borderColor="#4A6EEB"
    _hover={{ borderColor: '#4A6EEB', bgColor: 'rgba(74, 110, 235, 0.1)' }}
    name={name}
    placeholder={placeholder}
    onChange={onChange}
    value={value}
  >
    {options.map((option, index) => (
      <option key={index} value={option}>
        {option}
      </option>
    ))}
  </Select>
);

const FilterSermon = ({ allSermons, filterSermon, filterData }) => {
  // Extract unique values for each filter category
  const uniqueSpeaker = getUniqueValues(allSermons, (sermon) =>
    sermon.speaker[0] ? sermon.speaker[0].name : null
  );

  const uniqueBook = getUniqueValues(allSermons, (sermon) => {
    if (!isNaN(sermon.passage[0])) {
      return sermon.passage.split(' ').slice(0, 2).join(' ');
    } else if (sermon.passage === '') {
      return null;
    } else {
      return sermon.passage.split(' ').slice(0, 1).join(' ');
    }
  });

  const uniqueServiceType = getUniqueValues(allSermons, (sermon) =>
    sermon.serviceType[0] ? sermon.serviceType[0].name : null
  );

  const uniqueYear = getUniqueValues(allSermons, (sermon) =>
    sermon.datePreached
      ? DateTime.fromISO(sermon.datePreached).toFormat('yyyy')
      : null
  );

  return (
    <Container maxW="container.xl" p="0">
      {/* Filter Options */}
      <Grid templateColumns={['repeat(2, 1fr)', 'repeat(4, 1fr)']} gap={[3, 6]}>
        <FilterOption
          name="speaker"
          placeholder="Speaker"
          options={uniqueSpeaker}
          onChange={filterSermon}
          value={filterData[0]}
        />
        <FilterOption
          name="year"
          placeholder="Year"
          options={uniqueYear}
          onChange={filterSermon}
          value={filterData[1]}
        />
        <FilterOption
          name="book"
          placeholder="Book"
          options={uniqueBook}
          onChange={filterSermon}
          value={filterData[2]}
        />
        <FilterOption
          name="serviceType"
          placeholder="Service Type"
          options={uniqueServiceType}
          onChange={filterSermon}
          value={filterData[3]}
        />
      </Grid>
    </Container>
  );
};

export default FilterSermon;
