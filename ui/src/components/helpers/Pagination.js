import React, {useState, useEffect} from 'react';
import {Box,
        HStack,
        Text,
        Button
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'

const Pagination = ({ itemsPerPage, totalItems, paginate }) => {
  const pageNumbers = [];
  const [currentPage, setCurrentPage] = useState(1);
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    paginate(currentPage);
  }, [currentPage]);

  return (
    <>
      <Box>
        <HStack justifyContent={{base:"center", md:"flex-end"}}>
          <Button isDisabled={currentPage == 1} onClick={() => setCurrentPage(currentPage-1)} path='/sermons'>
            <ChevronLeftIcon />
          </Button>
          <Text>
            {currentPage} / {pageNumbers.length}
          </Text>
          <Button isDisabled={currentPage==pageNumbers.length} onClick={() => setCurrentPage(currentPage+1)} path='/sermons'>
            <ChevronRightIcon />
          </Button>
        </HStack>
      </Box>
    </>
  );
};

export default Pagination;