import { Heading, HStack, Container, Switch } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import { lifestageList, campusList } from '../../helpers/lists';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import CustomDateEditor from '../ag-grid-editors/CustomDateEditor.js';

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
      if (teams && teams.length) {
        api.hideOverlay();
      } else {
        api.showLoadingOverlay();
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
    }
  };

  const onRowClicked = ({ data }) => {
    if (data) setSelected(data);
  };

  // Ag-Grid Helpers
  // Getters
  const leadersGetter = (params) => {
    const { leaders } = params.data;
    if (!leaders || leaders === '') return '';

    return leaders.join(',');
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
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: campusList,
      },
    },
    {
      headerName: 'Lifestage',
      field: 'lifestage',
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: lifestageList,
      },
    },
    {
      headerName: 'LIFE Group',
      field: 'lifeGroup',
    },
    {
      headerName: "Leaders' Emails",
      field: 'leaders',
      valueGetter: leadersGetter,
    },
    {
      headerName: 'Last updated by',
      field: 'lastUpdatedBy',
    },
    {
      headerName: 'Last updated at',
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