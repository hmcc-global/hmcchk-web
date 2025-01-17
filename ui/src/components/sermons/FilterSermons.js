import React from 'react';
import { Stack, Button, Select, Container, Box } from '@chakra-ui/react';
import { FaCaretDown } from 'react-icons/fa';

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
  <Box alignItems="left" spacing={3} w="25%">
    <Select
      style={{
        overflowY: 'scroll',
        textAlign: 'center',
        color: '#4A6EEB',
        fontWeight: '700',
      }}
      icon={<FaCaretDown />}
      iconColor="transparent"
      iconSize="0px"
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
  </Box>
);

const FilterSermon = ({
  allSermons,
  filterSermon,
  clearFilter,
  filterData,
  onClose,
}) => {
  // Extract unique values for each filter category
  const uniqueSpeaker = getUniqueValues(allSermons, (sermon) =>
    sermon.speaker[0] ? sermon.speaker[0].name : null
  );

  const uniqueSermonSeries = getUniqueValues(allSermons, (sermon) =>
    sermon.sermonSeries[0] ? sermon.sermonSeries[0].name : null
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

  return (
    <Container maxW="container.xl" p="0">
      {/* Filter Options */}
      <Stack
        spacing={{ base: '6', md: '1.5rem' }}
        alignItems="center"
        justifyContent="flex-start"
        direction={{ base: 'column', md: 'row' }}
      >
        <FilterOption
          name="speaker"
          placeholder="Speaker"
          options={uniqueSpeaker}
          onChange={filterSermon}
          value={filterData[0]}
        />
        {/* <FilterOption
          name="sermon"
          placeholder="Sermon Series"
          options={uniqueSermonSeries}
          onChange={filterSermon}
          value={filterData[1]}
        /> */}
        <FilterOption
          name="book"
          placeholder="Book"
          options={uniqueBook}
          onChange={filterSermon}
          value={filterData[2]}
        />
        <FilterOption
          name="service"
          placeholder="Service Type"
          options={uniqueServiceType}
          onChange={filterSermon}
          value={filterData[3]}
        />
      </Stack>

      {/* Action Buttons */}
      <Stack
        direction="row"
        spacing="auto"
        marginTop="75px"
        display={{ base: 'flex', md: 'none' }}
      >
        <Button
          onClick={clearFilter}
          width="35vw"
          background="transparent"
          border="1px solid #000000"
          boxSizing="border-box"
          backdropFilter="blur(6px)"
          borderRadius="10px"
        >
          Clear Filter
        </Button>
        <Button
          onClick={onClose}
          width="35vw"
          backgroundColor="#0628A3"
          color="white"
          borderRadius="10px"
        >
          Done
        </Button>
      </Stack>
    </Container>
  );
};

export default FilterSermon;
