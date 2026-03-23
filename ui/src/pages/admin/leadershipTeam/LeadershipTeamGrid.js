import { Heading, HStack, Container, Switch } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import CustomDateEditor from '../ag-grid-editors/CustomDateEditor.js';

const tMinusOneDay = DateTime.now().plus({ days: -1 }).startOf('day');
const tPlusOneDay = DateTime.now().plus({ days: 1 }).startOf('day');
const filterDateFormat = 'yyyy-MM-dd HH:mm:ss';

const defaultDateFilter = {
  seasonFrom: {
    dateFrom: tMinusOneDay.toFormat(filterDateFormat),
    dateTo: null,
    filterType: 'date',
    type: 'lessThan'
  },
  seasonTo: {
    dateFrom: tPlusOneDay.toFormat(filterDateFormat),
    dateTo: null,
    filterType: 'date',
    type: 'greaterThan'
  }
};

export default function LeadershipTeamGrid(props) {
  // constants
  const dateFromFormat = 'yyyy-MM-dd'; // Ag-grid converter helper
  const dateToFormat = 'dd MMM yyyy';

  const { teams, setSelected } = props;

  // states
  const [api, setApi] = useState();
  const [colApi, setColApi] = useState();
  const [showDeleted, setShowDeleted] = useState(false);
  const [filtered, setFiltered] = useState(teams);

  useEffect(() => {
    if (teams) {
      if (!showDeleted) {
        setFiltered(teams.filter((p) => p.isDeleted === false));
      } else {
        setFiltered(teams);
      }
    }
  }, [teams, showDeleted]);

  useEffect(() => {
    if (api) {
      api.showLoadingOverlay();
      if (teams && teams.length) {
        api.hideOverlay();
      } else {
        api.showNoRowsOverlay();
      }
    }
  }, [teams, api]);

  // Ag-Grid Functions
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

  // Resize columns on first render of the grid
  const onFirstDataRendered = () => {
    if (api && colApi) {
      autoSizeAllColumns();
      api.setFilterModel(defaultDateFilter);
    }
  };

  const onRowClicked = (params) => {
    const { data, api } = params;
    if (data) setSelected(data);
  };

  // Ag-Grid Helpers
  // Getters
  const leaderEmailsGetter = (params) => {
    const { leaderEmails } = params.data;
    if (!leaderEmails || leaderEmails === '') return '';

    return leaderEmails.join(',');
  };

  // Formatters
  const dateFormatter = (dateStr) => {
    if (dateStr) {
      const dateObj = DateTime.fromFormat(dateStr, dateFromFormat);
      return dateObj.toFormat(dateToFormat);
    }

    return '';
  };

  const seasonToDateFormatter = (params) => {
    if (params && params.data && params.data.seasonTo) {
      const { seasonTo: seasonToStr } = params.data;
      return dateFormatter(seasonToStr);
    }

    return '';
  };

  const seasonFromDateFormatter = (params) => {
    if (params && params.data && params.data.seasonFrom) {
      const { seasonFrom: seasonFromStr } = params.data;
      return dateFormatter(seasonFromStr);
    }

    return '';
  };

  // Columns
  const DateCellProps = {
    cellEditor: CustomDateEditor,
    cellEditorPopup: true,
    filter: 'agDateColumnFilter',
    filterParams: {
      comparator: (filterLocalDateAtMidnight, cellValueAsString) => {
        const cellValueAsDate = DateTime.fromISO(cellValueAsString).toJSDate();
        if (cellValueAsDate < filterLocalDateAtMidnight) {
          return -1;
        } else if (cellValueAsDate  > filterLocalDateAtMidnight) {
          return 1;
        }
        return 0;
      }
    }
  };

  const defaultColDef = {
    editable: false,
    sortable: true,
    resizable: true,
    filter: true,
    floatingFilter: true,
  };

  const columnDefs = [
    {
      ...DateCellProps,
      headerName: 'Season From',
      field: 'seasonFrom',
      valueFormatter: seasonFromDateFormatter,
    },
    {
      ...DateCellProps,
      headerName: 'Season To',
      field: 'seasonTo',
      valueFormatter: seasonToDateFormatter,
    },
    {
      headerName: 'Campus',
      field: 'campus',
    },
    {
      headerName: 'Lifestage',
      field: 'lifestage',
    },
    {
      headerName: 'LIFE Group',
      field: 'lifeGroup',
    },
    {
      headerName: "Leaders' Emails",
      field: 'leaderEmails',
      valueGetter: leaderEmailsGetter,
    },
    {
      headerName: 'Last Updated By',
      field: 'lastUpdatedBy',
    },
    {
      headerName: 'Last Updated At',
      field: 'updatedAt',
    },
  ];

  return (
    <Container w="100%" maxW="100%">
      <HStack justifyContent="space-between">
        <Heading s="md" size="md">
          Leadership Teams
        </Heading>
        <Switch
          value={showDeleted}
          onChange={(e) => setShowDeleted(e.target.checked)}
        >
          Show deleted
        </Switch>
      </HStack>
      <div
        className="ag-theme-alpine"
        style={{ height: 800, width: '100%', marginTop: '0.7em' }}
      >
        <AgGridReact
          defaultColDef={defaultColDef}
          columnDefs={columnDefs}
          onGridReady={onGridReady}
          onFirstDataRendered={onFirstDataRendered}
          onRowClicked={onRowClicked}
          rowData={filtered}
          rowSelection="single"
        />
      </div>
    </Container>
  );
}
