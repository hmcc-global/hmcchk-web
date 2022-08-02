import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { Heading, Container } from '@chakra-ui/react';

export default function PopUpGrid(props) {
  const { popUps } = props;

  const [api, setApi] = useState();
  const [colApi, setColApi] = useState();

  useEffect(() => {
    if (api) {
      if (popUps && popUps.length) {
        api.hideOverlay();
      } else {
        api.showLoadingOverlay();
      }
    }
  }, [popUps, api]);

  // Ag-grid helpers
  const booleanFormatter = (p) => p.value.toString();

  // Ag-Grid Functions
  const onGridReady = (params) => {
    if (params.api) setApi(params.api);
    if (params.columnApi) setColApi(params.columnApi);
  };

  // Ag-Grid definitions
  const columnDefs = [
    { headerName: 'Name', field: 'name' },
    { headerName: 'Title', field: 'title' },
    { headerName: 'Desc', field: 'description' },
    { headerName: 'Image URL', field: 'imageLink' },
    { headerName: 'ButtonTexts', field: 'buttonTexts' },
    { headerName: 'ButtonLinks', field: 'buttonLinks' },
    { headerName: 'Published', field: 'isPublished', valueFormatter: booleanFormatter },
    { headerName: 'Deleted', field: 'isDeleted', valueFormatter: booleanFormatter }
  ];

  const defaultColDef = {
    sortable: true,
    resizable: true,
    filter: true,
  };

  return (
    <Container w="100%" maxW="100%">
      <Heading as="md" size="md">Pop Ups</Heading>
      <div className="ag-theme-alpine" style={{ height: 800, width: '100%', marginTop: '1em' }}>
        <AgGridReact
          defaultColDef={defaultColDef}
          columnDefs={columnDefs}
          onGridReady={onGridReady}
          rowData={popUps}
        />
      </div>
    </Container>
  );
}


