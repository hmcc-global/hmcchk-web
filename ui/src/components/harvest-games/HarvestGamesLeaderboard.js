import React from 'react';
import { customAxios as axios } from '../helpers/customAxios';
import { useEffect, useState, useCallback, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
// import { DateTime } from 'luxon';

import './styles.css';

export default function HarvestGamesLeaderboard(props) {
  // const pollFreqInSecs = 10;

  const [api, setApi] = useState();
  const [colApi, setColApi] = useState();
  const [rankings, setRankings] = useState();
  // let lastUpdatedTime = useRef();

  const defaultColDef = {
    editable: false,
    sortable: true,
    resizable: true,
  };

  // To highlight the first place
  const getRowStyle = (params) => {
    if (params.node.rowIndex === 0) {
      return { background: '#CEF6FF' };
    }
  };

  const getData = async () => {
    try {
      const { data } = await axios.get('/api/hgRankings/get');
      setRankings(data);
    } catch (err) {
      console.log(err);
    }
  };

  // TODO-YY (optional): Update every 10 seconds for a "live" scoreboard feel 
  // const checkIfUpdated = useCallback(async (updateData = true) => {
  //   try {
  //     const { data } = await axios.get('/api/last-updated', {
  //       params: { modelName: 'hgrankings' },
  //     });
  //     const dateObj = DateTime.fromISO(data);
  //     if (!lastUpdatedTime.current || dateObj > lastUpdatedTime.current) {
  //       updateData && getData();
  //       lastUpdatedTime.current = dateObj;
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }, []);

  useEffect(() => {
    getData();
    // checkIfUpdated(false);
    // setInterval(() => {
    //   checkIfUpdated();
    // }, pollFreqInSecs * 1000);
  }, []);

  useEffect(() => {
    if (api) {
      if (rankings && rankings.length) {
        api.hideOverlay();
      } else {
        api.showLoadingOverlay();
      }
    }
  }, [rankings, api]);

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
    if (params.columnApi) setColApi(params.columnApi);
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
    {
      headerName: 'LIFE Group',
      field: 'lgName',
      width: 135,
    },
    // Set colId of individual games to ( game number - 1 ), i.e. normalize to zero-based indexing
    // colId will be utilized in getting and setting scores
    {
      headerName: 'Breakdown',
      marryChildren: true,
      children: [
        {
          headerName: 'Overall',
          colId: 'overall',
          valueGetter: overallRankingGetter,
          valueFormatter: rankingFormatter,
          width: 150,
        },
        {
          headerName: 'Game 1',
          colId: 0,
          valueGetter: gameRankingGetter,
          valueFormatter: rankingFormatter,
          columnGroupShow: 'closed',
          width: 125,
        },
        {
          headerName: 'Game 2',
          colId: 1,
          valueGetter: gameRankingGetter,
          valueFormatter: rankingFormatter,
          columnGroupShow: 'closed',
          width: 125,
        },
        {
          headerName: 'Game 3',
          colId: 2,
          valueGetter: gameRankingGetter,
          valueFormatter: rankingFormatter,
          columnGroupShow: 'closed',
          width: 125,
        },
      ],
    },
  ];

  return (
    <>
      <div className="ag-theme-material" style={{ height: 800, width: '100%' }}>
        <AgGridReact
          defaultColDef={defaultColDef}
          columnDefs={columnDefs}
          onGridReady={onGridReady}
          rowData={rankings}
          onFirstDataRendered={onFirstDataRendered}
          tooltipShowDelay={0}
          getRowStyle={getRowStyle}
        />
      </div>
    </>
  );
}
