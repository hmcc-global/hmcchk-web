import React, { useState, useEffect } from 'react';
import { Box, HStack, Text, Button } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

const Pagination = ({ itemsPerPage, totalItems, paginate }) => {
  const maxPageNumbers = Math.ceil(totalItems / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    paginate(currentPage);
  }, [currentPage, paginate]);

  return (
    <>
      <Box>
        <HStack
          marginBottom="15px"
          justifyContent={{ base: 'center', md: 'flex-end' }}
        >
          <Button
            isDisabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            variant="outline"
            borderRadius={'100%'}
            height="3rem"
            width="3rem"
            borderColor={'#4A6EEB'}
            color={'#4A6EEB'}
          >
            <ChevronLeftIcon />
          </Button>
          <Text
            fontSize={{ base: '1rem', md: '1.25rem' }}
            color="#4A6EEB"
            fontFamily="Manrope"
          >
            {currentPage} / {maxPageNumbers}
          </Text>
          <Button
            isDisabled={currentPage === maxPageNumbers}
            onClick={() => setCurrentPage(currentPage + 1)}
            variant="outline"
            borderRadius={'100%'}
            height="3rem"
            width="3rem"
            borderColor={'#4A6EEB'}
            color={'#4A6EEB'}
          >
            <ChevronRightIcon />
          </Button>
        </HStack>
      </Box>
    </>
  );
};

export default Pagination;
