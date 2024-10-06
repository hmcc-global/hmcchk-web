import React from 'react';
import { customAxios as axios } from '../helpers/customAxios';
import { useEffect, useState, useCallback, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import './style.css';
import {
  Box,
  Button,
  Container,
  HStack,
  Text,
  Icon,
  VStack,
  Image,
} from '@chakra-ui/react';
import { MdArrowBack, MdEmojiFlags } from 'react-icons/md';

export default function HarvestGamesLeaderboard(props) {
  const [api, setApi] = useState();
  const [colApi, setColApi] = useState();
  const [rankings, setRankings] = useState();
  const [filteredRankings, setFilteredRankings] = useState();

  const defaultColDef = {
    editable: false,
    sortable: true,
    resizable: true,
    autoHeaderHeight: true,
  };

  const getData = async () => {
    try {
      const { data } = await axios.get('/api/hgrankings/get');
      setRankings(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (api) {
      if (rankings && rankings.length) {
        api.hideOverlay();
        const filteredRankings = rankings.filter(
          (row) => row.lgName !== 'password'
        );
        setFilteredRankings(filteredRankings);
      } else {
        api.showLoadingOverlay();
      }
    }
  }, [rankings]);

  // Ag-Grid Helpers
  // Getter Functions: to handle errors in retrieving data
  const gameRankingGetter = (params) => {
    if (params && params.data && params.data.gameRankings) {
      const { colId } = params.colDef;
      return params.data.gameRankings[colId];
    }

    return 0;
  };

  const overallRankingGetter = (params) => {
    if (params && params.data && params.data.overallRanking) {
      return params.data.overallRanking;
    }

    return 0;
  };

  const rankingFormatter = (params) => {
    if (params && params.data) {
      const { colId } = params.colDef;

      if (typeof colId === 'string') {
        return params.data.overallRanking === 0 ||
          params.data.overallRanking === '-'
          ? '-'
          : params.data.overallRanking;
      } else {
        return params.data.gameRankings[colId] === 0 ||
          params.data.gameRankings[colId] === '-'
          ? '-'
          : params.data.gameRankings[colId];
      }
    }

    return '-';
  };

  // Ag-Grid Functions
  // Initialize Grid API states
  const onGridReady = (params) => {
    if (params.api) setApi(params.api);
    if (params.columnApi) {
      setColApi(params.columnApi);
      params.columnApi.sizeColumnsToFit();
    }
  };

  // Sorting Function
  const sortByOverall = () => {
    if (colApi) {
      // To reset sort state before sorting again
      colApi.applyColumnState({
        defaultState: { sort: null },
      });

      // DEFAULT: Sort in ascending order of overall ranking
      colApi.applyColumnState({
        state: [{ colId: 'overall', sort: 'asc' }],
        defaultState: { sort: null },
      });
    }
  };

  // Resize columns and sort scores on first render of the grid
  const onFirstDataRendered = () => {
    if (api && colApi) {
      sortByOverall();
    }
  };

  //  Ag-Grid Column Definitions
  const columnDefs = [
    // Set colId of individual games to ( game number - 1 ), i.e. normalize to zero-based indexing
    // colId will be utilized in getting and setting scores

    {
      headerName: 'Rank #',
      colId: 'overall',
      valueGetter: overallRankingGetter,
      valueFormatter: rankingFormatter,
      flex: 1,
      suppressMenu: true,
      maxWidth: 120,
    },
    {
      headerName: 'LIFE Group Name',
      field: 'lgName',
      flex: 2,
      suppressMenu: true,
      autoHeight: true,
    },
    {
      headerName: 'Game 1',
      colId: 0,
      valueGetter: gameRankingGetter,
      valueFormatter: rankingFormatter,
      columnGroupShow: 'closed',
      flex: 1,
      suppressMenu: true,
      maxWidth: 100,
    },
    {
      headerName: 'Game 2',
      colId: 1,
      valueGetter: gameRankingGetter,
      valueFormatter: rankingFormatter,
      columnGroupShow: 'closed',
      flex: 1,
      suppressMenu: true,
      maxWidth: 100,
    },
    {
      headerName: 'Game 3',
      colId: 2,
      valueGetter: gameRankingGetter,
      valueFormatter: rankingFormatter,
      columnGroupShow: 'closed',
      flex: 1,
      suppressMenu: true,
      maxWidth: 100,
    },
  ];

  return (
    <Container maxW="100%">
      <VStack justifyContent="center" maxW="100%">
        <Container
          backgroundColor="transparent"
          minW={{ base: '100%', sm: '100%', md: '50%' }}
          marginX="auto"
        >
          <Box
            display="flex"
            borderRadius="8px"
            alignContent="center"
            justifyContent="center"
            width={{ base: '60%', md: '80%' }}
            marginX="auto"
            marginBottom={{ base: '3', md: '7' }}
            border="1px solid #474747;"
            marginTop={{ base: '4' }}
          >
            <Icon
              as={MdEmojiFlags}
              boxSize={{ base: 5, md: 10 }}
              color="white"
              marginY="auto"
            />
            <Text
              textColor="white"
              marginY={{ base: '1', md: '4' }}
              paddingLeft={{ base: '2', md: '10' }}
              fontSize={{ base: '4vw', md: '2.5vw' }}
              fontWeight="bold"
              fontFamily="FjallaOne-Regular"
            >
              LEADERBOARD
            </Text>
          </Box>
          <div
            className="ag-theme-material"
            style={{
              height: '75vh',
              minW: '100%',
            }}
          >
            <AgGridReact
              defaultColDef={defaultColDef}
              columnDefs={columnDefs}
              onGridReady={onGridReady}
              rowData={filteredRankings}
              onFirstDataRendered={onFirstDataRendered}
              tooltipShowDelay={0}
            />
          </div>
        </Container>
      </VStack>
    </Container>
  );
}
