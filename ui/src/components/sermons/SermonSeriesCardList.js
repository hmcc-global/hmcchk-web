import { useState, useRef } from 'react';
import {
  Grid,
  Button,
  Box,
  HStack,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Text,
} from '@chakra-ui/react';
import Pagination from '../helpers/Pagination';
import FilterSermon from './FilterSermons';
import SermonSeriesCard from './SermonSeriesCard';
import { useEffect } from 'react';

const SermonSeriesCardList = ({ allSermons }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const sermonSeriesPerPage = 12;

  // Consolidated filter state
  const [filters, setFilters] = useState({
    speaker: '',
    sermonSeries: '',
    book: '',
    serviceType: '',
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  // Update a specific filter
  const updateFilter = (event) => {
    const { name, value } = event.target;
    setCurrentPage(1); // Reset to the first page when filtering
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // Clear all filters
  const clearFilter = () => {
    setFilters({
      speaker: '',
      sermonSeries: '',
      book: '',
      serviceType: '',
    });
  };

  // Filtered sermons
  const filteredSermons = allSermons.filter((sermon) => {
    const { speaker, sermonSeries, book, serviceType } = filters;

    return (
      (!speaker || (sermon.speaker[0]?.name || '').includes(speaker)) &&
      (!sermonSeries ||
        (sermon.sermonSeries[0]?.name || '').includes(sermonSeries)) &&
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
            fontSize={{ base: '2rem', md: '2.625rem' }}
          >
            Past Sermon Series
          </Text>
          <Button
            width="30vw"
            display={{ base: 'flex', md: 'none' }}
            background="#0628A3"
            backdropFilter="blur(6px)"
            borderRadius="10px"
            color="white"
            ref={btnRef}
            onClick={onOpen}
          >
            Filter
          </Button>
        </HStack>

        {/* Desktop Filters */}
        <Box display={{ base: 'none', md: 'flex' }} marginTop="10px">
          <FilterSermon
            allSermons={allSermons}
            filterSermon={updateFilter}
            filterData={filters}
          />
        </Box>

        {/* Clear Filter Button (Desktop) */}
        <Box>
          <Button
            variant="link"
            alignSelf={['center', 'flex-end']}
            onClick={clearFilter}
            float="right"
            display={{ base: 'none', md: 'flex' }}
            marginTop="8px"
          >
            Clear Filter
          </Button>
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

      {/* Mobile Filter Drawer */}
      <Drawer
        isOpen={isOpen}
        size="full"
        onClose={onClose}
        finalFocusRef={btnRef}
        placement="top"
      >
        <DrawerOverlay />
        <DrawerContent paddingTop="10">
          <DrawerCloseButton margin="5" />
          <DrawerHeader />
          <DrawerBody>
            <FilterSermon
              allSermons={allSermons}
              filterSermon={updateFilter}
              filterData={filters}
              clearFilter={clearFilter}
              onClose={onClose}
            />
          </DrawerBody>
          <DrawerFooter fontSize="sm" color="black" justifyContent="center">
            Harvest Mission Community Church {new Date().getFullYear()}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SermonSeriesCardList;
