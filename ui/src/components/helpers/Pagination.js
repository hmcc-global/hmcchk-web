import React from 'react';
import {Box,
        
} from "@chakra-ui/react";

const Pagination = ({ itemsPerPage, totalItems, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className='pagination'>
      {pageNumbers.map(number => (
        <div key={number} className='page-item'>
          <a onClick={() => paginate(number)} path='/sermons' className='page-link'>
            {number}
          </a>
        </div>
       ))}
    </div>
  );
};

export default Pagination;