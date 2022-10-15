import React from 'react';
import { customAxios as axios } from '../../helpers/customAxios';
import { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import {
  Button,
  ButtonGroup,
  Container,
  Tooltip,
  useToast,
} from '@chakra-ui/react';
import { CgUndo, CgRedo } from 'react-icons/cg';
import { MdSave } from 'react-icons/md';

export default function HarvestGamesGrid(props) {
  const toast = useToast();
  const { hgRankings } = props;

  const [api, setApi] = useState();
  const [colApi, setColApi] = useState();
  const [rankings, setRankings] = useState(hgRankings);

  const defaultColDef = {
    editable: true,
    sortable: true,
    resizable: true,
  };

  // Function to save individual ranking info to DB
  const saveRankingInfo = async (data) => {
    const res = await axios.put('/api/hgRankings/update', {
      params: data,
    });

    if (res.status !== 200) {
      return false;
    } else {
      return true;
    }
  };

  // Save ranking info across all rows
  const saveAllToDB = async () => {
    if (api) {
      // To count how many rows were successfully saved
      var successCount = 0;

      // Iterate across each node (row) and call API to save to DB
      api.forEachNode(async (rowNode) => {
        const res = await saveRankingInfo(rowNode.data);

        if (res) successCount++;
      });

      if (successCount === api.paginationGetRowCount()) {
        toast({
          description: 'All rows saved successfully!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          description: 'Error saving some rows, please try again!',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  useEffect(() => {
    if (hgRankings) {
      setRankings(hgRankings);
    }
  }, [hgRankings]);

  useEffect(() => {
    if (api) {
      if (hgRankings && hgRankings.length) {
        api.hideOverlay();
      } else {
        api.showLoadingOverlay();
      }
    }
  }, [hgRankings, api]);

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

  // Setter Functions: to validate user edits
  const rankingSetter = (params) => {
    // Convert to String for handling misleading False condition (i.e. Number 0 == False)
    if (params && params.data && String(params.newValue)) {
      const { colId } = params.colDef;

      // Convert to Number for storing and saving to database
      var newRanking = Number(params.newValue);

      // Ranking validation: Check if input is a positive integer
      if (Number.isInteger(newRanking) && newRanking >= 0) {
        // Check for ranking type: (1) <string> = overall (2) <Number> = individual games
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

  // Ag-Grid Functions
  // Initialize Grid API states
  const onGridReady = (params) => {
    if (params.api) setApi(params.api);
    if (params.columnApi) setColApi(params.columnApi);
  };

  // Function to resize all columns automatically
  const autoSizeAllColumns = () => {
    if (colApi) {
      const allColumnIds = [];
      colApi.getAllColumns().forEach((column) => {
        allColumnIds.push(column.getId());
      });
      colApi.autoSizeColumns(allColumnIds);
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

  // Resize columns and sort rankings on first render of the grid
  const onFirstDataRendered = () => {
    if (api && colApi) {
      autoSizeAllColumns();
      sortByOverall();
    }
  };

  // Function to handle cell edits
  const onCellValueChanged = async (p) => {
    if (api && colApi && p.data) {
      autoSizeAllColumns();
      sortByOverall();
    }
  };

  // Undo and Redo Functions
  const undo = () => {
    if (api) api.undoCellEditing();
  };

  const redo = () => {
    if (api) api.redoCellEditing();
  };

  // Enabling Undo and Redo
  const undoRedoCellEditing = true;
  const undoRedoCellEditingLimit = 20;
  const enableCellChangeFlash = true;

  //  Ag-Grid Column Definitions
  const columnDefs = [
    {
      headerName: 'LIFE Group',
      field: 'lgName',
      editable: false,
    },
    // Set colId of breakdown to game number minus 1, i.e. normalize to zero-based indexing
    // colId will be utilized in getting and setting rankings
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
    <Container w="100%" maxW="100%">
      <>
        <ButtonGroup mb={5} variant="outline" spacing="5">
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
      </>
      <div className="ag-theme-alpine" style={{ height: 700 }}>
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
    </Container>
  );
}
