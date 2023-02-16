import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { Heading, Container, Switch, HStack } from '@chakra-ui/react';

export default function PrayerGrid(props) {
  const { prayers, setSelected } = props;

  const [showDeleted, setShowDeleted] = useState(false);
  const [filtered, setFiltered] = useState(prayers);
  const [api, setApi] = useState();
  const [colApi, setColApi] = useState();

  useEffect(() => {
    if (prayers) {
      if (!showDeleted) {
        setFiltered(prayers.filter((p) => p.isDeleted === false));
      } else {
        setFiltered(prayers);
      }
    }
  }, [prayers, showDeleted]);

  useEffect(() => {
    if (api) {
      if (prayers && prayers.length) {
        api.hideOverlay();
      } else {
        api.showLoadingOverlay();
      }
    }
  }, [prayers, api]);

  // Ag-Grid Functions
  const onGridReady = (params) => {
    if (params.api) setApi(params.api);
    if (params.columnApi) setColApi(params.columnApi);
  };

  const onRowClicked = ({ data }) => {
    if (data) setSelected(data);
  };

  // Ag-Grid definitions
  const columnDefs = [
    { headerName: 'Published', field: 'isPublished' },
    { headerName: 'Deleted', field: 'isDeleted' },
    { headerName: 'Topic', field: 'topic' },
    { headerName: 'Prayer', field: 'prayer' },
    { headerName: 'Name', field: 'fullName' },
    { headerName: 'Campus/Lifestage', field: 'lifestage' },
  ];

  const defaultColDef = {
    sortable: true,
    resizable: true,
    filter: true,
  };

  return (
    <Container w="100%" maxW="100%">
      <HStack justifyContent="space-between">
        <Heading s="md" size="md">
          Prayers
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
          onRowClicked={onRowClicked}
          rowData={filtered}
          rowSelection="single"
        />
      </div>
    </Container>
  );
}
