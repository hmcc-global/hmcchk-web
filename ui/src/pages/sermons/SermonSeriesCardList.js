import { useState } from 'react';
import { Grid, Box, HStack, Text } from '@chakra-ui/react';
import Pagination from '../helpers/Pagination';
import FilterSermon from './FilterSermons';
import SermonSeriesCard from './SermonSeriesCard';
import { useEffect } from 'react';
import { DateTime } from 'luxon';

const SermonSeriesCardList = ({ allSermons }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const sermonSeriesPerPage = 12;

  // Consolidated filter state
  const [filters, setFilters] = useState({
    speaker: '',
    year: '',
    book: '',
    serviceType: '',
  });

  // Update a specific filter
  const updateFilter = (event) => {
    const { name, value } = event.target;
    setCurrentPage(1); // Reset to the first page when filtering
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // Filtered sermons
  const filteredSermons = allSermons.filter((sermon) => {
    const { speaker, year, book, serviceType } = filters;

    return (
      (!speaker || (sermon.speaker[0]?.name || '').includes(speaker)) &&
      (!year ||
        (DateTime.fromISO(sermon.datePreached).toFormat('yyyy') || '').includes(
          year
        )) &&
      (!book || (sermon.passage || '').includes(book)) &&
      (!serviceType ||
        (sermon.serviceType[0]?.name || '').includes(serviceType))
    );
  });

  const [filteredSermonSeriesList, setFilteredSermonSeriesList] = useState([]);

  useEffect(() => {
    if (filteredSermons && filteredSermons.length > 0) {
      const sermonSeries = filteredSermons.map((sermon) => {
        return sermon.sermonSeries[0].name;
      });
      const uniqueSermonSeries = [...new Set(sermonSeries)];
      setFilteredSermonSeriesList(uniqueSermonSeries);
    }
  }, [filteredSermons]);

  // Pagination logic
  const indexOfLastSermonSeries = currentPage * sermonSeriesPerPage;
  const indexOfFirstSermonSeries =
    indexOfLastSermonSeries - sermonSeriesPerPage;
  const currentSermonSeries = filteredSermonSeriesList.slice(
    indexOfFirstSermonSeries,
    indexOfLastSermonSeries
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Box>
        {/* Header with Filter Button */}
        <HStack marginTop={[4, 8]} spacing="auto">
          <Text
            fontFamily="DMSerifDisplay_Italic"
            fontWeight="400"
            fontSize={'2.625rem'}
            display={{ base: 'none', md: 'block' }}
          >
            Past Sermon Series
          </Text>
        </HStack>

        {/* Desktop Filters */}
        <Box display={'flex'} marginTop="10px">
          <FilterSermon
            allSermons={allSermons}
            filterSermon={updateFilter}
            filterData={filters}
          />
        </Box>

        {/* Sermon Cards */}
        <Grid
          mt={['6', '12']}
          mb={['6', '12']}
          templateColumns={['repeat(1, 1fr)', 'repeat(3, 1fr)']}
          gap={[3, 6]}
        >
          {currentSermonSeries.map((sermonSeries) => (
            <SermonSeriesCard
              key={sermonSeries}
              isSermonsPage={true}
              sermonSeries={sermonSeries}
              allSermons={filteredSermons}
            />
          ))}
        </Grid>

        {/* Pagination */}
        <Pagination
          itemsPerPage={sermonSeriesPerPage}
          totalItems={filteredSermonSeriesList.length}
          paginate={paginate}
        />
      </Box>
    </>
  );
};

export default SermonSeriesCardList;
