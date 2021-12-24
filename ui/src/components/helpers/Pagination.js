import React, { useState, useEffect } from "react";
import { Box, HStack, Text, Button } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

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
          justifyContent={{ base: "center", md: "flex-end" }}
        >
          <Button
            isDisabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            <ChevronLeftIcon />
          </Button>
          <Text>
            {currentPage} / {maxPageNumbers}
          </Text>
          <Button
            isDisabled={currentPage === maxPageNumbers}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            <ChevronRightIcon />
          </Button>
        </HStack>
      </Box>
    </>
  );
};

export default Pagination;
