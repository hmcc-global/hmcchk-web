import React, { useEffect, useState } from 'react';
import { customAxios as axios } from '../../helpers/customAxios';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { Button, ButtonGroup, Heading, Tooltip } from '@chakra-ui/react';
import { CgUndo, CgRedo } from 'react-icons/cg';
import { MdSave } from 'react-icons/md';

import './style.css';

export default function AdminHarvestGames(props) {
  const [api, setApi] = useState();
  const [colApi, setColApi] = useState();
  const [rankings, setRankings] = useState([]);

  const defaultColDef = {
    editable: true,
    sortable: true,
    resizable: true,
  };

  const getData = async () => {
    try {
      const { data } = await axios.get('/api/hgRankings/get', {
        params: { lgRankingId: 'AdminTest' },
      });
      setRankings(data);
    } catch (err) {
      console.log(err);
    }
  };

  // Function to add a new row
  const addNewRow = () => {
    const newRow = {
      lgName: '', // Default value for LIFE Group
      gameRankings: { 0: 0, 1: 0, 2: 0 }, // Default values for games
      overallRanking: 0, // Default overall ranking
    };
    setRankings((prevRankings) => [...prevRankings, newRow]);
  };

  // Function to save individual ranking info to DB
  const saveRankingInfo = async (data) => {
    const res = await axios.put('/api/hgRankings/update', {
      params: data,
    });

    if (res.status !== 200) {
      alert('Something went wrong, please refresh and try again..');
    }
  };

  // Save ranking info across all rows
  const saveAllToDB = async () => {
    if (api) {
      api.forEachNode(async (rowNode) => {
        await saveRankingInfo(rowNode.data);
      });
    }
  };

  useEffect(() => {
    getData();
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

  const rankingSetter = (params) => {
    if (params && params.data && String(params.newValue)) {
      const { colId } = params.colDef;
      var newRanking = Number(params.newValue);
      if (Number.isInteger(newRanking) && newRanking >= 0) {
        if (typeof colId === 'string') {
          params.data.overallRanking = newRanking;
          return true;
        } else {
          params.data.gameRankings[colId] = newRanking;
          return true;
        }
      }
      alert('Invalid Ranking!');
      return false;
    }
    return false;
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

  const onGridReady = (params) => {
    if (params.api) setApi(params.api);
    if (params.columnApi) setColApi(params.columnApi);
  };

  const autoSizeAllColumns = () => {
    if (colApi) {
      const allColumnIds = [];
      colApi.getAllColumns().forEach((column) => {
        allColumnIds.push(column.getId());
      });
      colApi.autoSizeColumns(allColumnIds);
    }
  };

  const sortByOverall = () => {
    if (colApi) {
      colApi.applyColumnState({
        defaultState: { sort: null },
      });
      colApi.applyColumnState({
        state: [{ colId: 'overall', sort: 'asc' }],
        defaultState: { sort: null },
      });
    }
  };

  const onFirstDataRendered = () => {
    if (api && colApi) {
      autoSizeAllColumns();
      sortByOverall();
    }
  };

  const onCellValueChanged = async (p) => {
    if (api && colApi && p.data) {
      autoSizeAllColumns();
      sortByOverall();
    }
  };

  const undo = () => {
    if (api) api.undoCellEditing();
  };

  const redo = () => {
    if (api) api.redoCellEditing();
  };

  const undoRedoCellEditing = true;
  const undoRedoCellEditingLimit = 20;
  const enableCellChangeFlash = true;

  const columnDefs = [
    {
      headerName: 'LIFE Group',
      field: 'lgName',
      editable: true,
    },
    {
      headerName: 'Rankings Breakdown',
      marryChildren: true,
      children: [
        {
          headerName: 'Game 1',
          colId: 0,
          valueGetter: gameRankingGetter,
          valueSetter: rankingSetter,
          valueFormatter: rankingFormatter,
        },
        {
          headerName: 'Game 2',
          colId: 1,
          valueGetter: gameRankingGetter,
          valueSetter: rankingSetter,
          valueFormatter: rankingFormatter,
        },
        {
          headerName: 'Game 3',
          colId: 2,
          valueGetter: gameRankingGetter,
          valueSetter: rankingSetter,
          valueFormatter: rankingFormatter,
        },
      ],
    },
    {
      headerName: 'Overall',
      colId: 'overall',
      valueGetter: overallRankingGetter,
      valueSetter: rankingSetter,
      valueFormatter: rankingFormatter,
    },
  ];

  return (
    <>
      <Heading as="h3" mb={5}>
        Harvest Games Rankings
      </Heading>
      <ButtonGroup mb={5} variant="outline" spacing="5">
        <Tooltip label="Add a new row">
          <Button onClick={addNewRow} variant="solid">
            Add Row
          </Button>
        </Tooltip>
        <Tooltip label="Ctrl/Cmd + Z">
          <Button onClick={undo} leftIcon={<CgUndo />}>
            Undo
          </Button>
        </Tooltip>
        <Tooltip label="Ctrl/Cmd + Y">
          <Button onClick={redo} rightIcon={<CgRedo />}>
            Redo
          </Button>
        </Tooltip>
        <Button onClick={saveAllToDB} rightIcon={<MdSave />} variant="solid">
          Save
        </Button>
      </ButtonGroup>
      <div
        className="ag-theme-alpine"
        style={{ height: 500, backgroundColor: 'black' }}
      >
        <AgGridReact
          defaultColDef={defaultColDef}
          columnDefs={columnDefs}
          onGridReady={onGridReady}
          rowData={rankings}
          enterMovesDownAfterEdit={true}
          stopEditingWhenCellsLoseFocus={true}
          onFirstDataRendered={onFirstDataRendered}
          onCellValueChanged={onCellValueChanged}
          undoRedoCellEditing={undoRedoCellEditing}
          undoRedoCellEditingLimit={undoRedoCellEditingLimit}
          enableCellChangeFlash={enableCellChangeFlash}
          tooltipShowDelay={0}
        />
      </div>
    </>
  );
}
