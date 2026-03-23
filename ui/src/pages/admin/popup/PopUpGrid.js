import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { Heading, Container, Switch, HStack } from '@chakra-ui/react';

export default function PopUpGrid(props) {
  const { popUps, setSelected } = props;

  const [showDeleted, setShowDeleted] = useState(false);
  const [filtered, setFiltered] = useState(popUps);
  const [api, setApi] = useState();
  const [colApi, setColApi] = useState();

  useEffect(() => {
    if (popUps) {
      if (!showDeleted) {
        setFiltered(popUps.filter(p => p.isDeleted === false ));
      }
      else {
        setFiltered(popUps);
      }
    }
  }, [popUps, showDeleted]);

  useEffect(() => {
    if (api) {
      if (popUps && popUps.length) {
        api.hideOverlay();
      } else {
        api.showLoadingOverlay();
      }
    }
  }, [popUps, api]);

  // Ag-Grid Functions
  const onGridReady = (params) => {
    if (params.api) setApi(params.api);
    if (params.columnApi) setColApi(params.columnApi);
  };

  const onRowClicked = ({data}) => {
    if (data)
      setSelected(data);
  }

  // Ag-Grid definitions
  const columnDefs = [
    { headerName: 'Name', field: 'name' },
    { headerName: 'Title', field: 'title' },
    { headerName: 'Desc', field: 'description' },
    { headerName: 'Image URL', field: 'imageLink' },
    { headerName: 'Button Texts', field: 'buttonTexts' },
    { headerName: 'Button Links', field: 'buttonLinks' },
    { headerName: 'Published', field: 'isPublished' },
    { headerName: 'Deleted', field: 'isDeleted' }
  ];

  const defaultColDef = {
    sortable: true,
    resizable: true,
    filter: true,
  };

  return (
    <Container w="100%" maxW="100%">
      <HStack justifyContent="space-between">
        <Heading s="md" size="md">Pop Ups</Heading>
        <Switch value={showDeleted} onChange={e => setShowDeleted(e.target.checked) }>Show deleted</Switch>
      </HStack>
      <div className="ag-theme-alpine" style={{ height: 800, width: '100%', marginTop: '0.7em' }}>
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


