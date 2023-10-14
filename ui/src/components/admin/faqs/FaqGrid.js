import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { Heading, Container, Switch, HStack } from '@chakra-ui/react';

export default function FaqGrid(props) {
  const { faqs, setSelected } = props;

  const [showDeleted, setShowDeleted] = useState(false);
  const [filtered, setFiltered] = useState(faqs);
  const [api, setApi] = useState();
  const [colApi, setColApi] = useState();

  // Filter the faqs based on the showDeleted state
  useEffect(() => {
    if (faqs) {
      if (!showDeleted) {
        setFiltered(faqs.filter((p) => p.isDeleted === false));
      } else {
        setFiltered(faqs);
      }
    }
  }, [faqs, showDeleted]);

  // Show the loading overlay when the faqs are loading
  useEffect(() => {
    if (api) {
      if (faqs && faqs.length) {
        api.hideOverlay();
      } else {
        api.showLoadingOverlay();
      }
    }
  }, [faqs, api]);

  // Ag-Grid Functions
  const onGridReady = (params) => {
    if (params.api) setApi(params.api);
    if (params.columnApi) setColApi(params.columnApi);
  };

  // Set the selected FAQ when a row is clicked
  const onRowClicked = ({ data }) => {
    if (data) setSelected(data);
  };

  // Ag-Grid definitions
  const columnDefs = [
    { headerName: 'Published', field: 'isPublished', maxWidth: 125 },
    { headerName: 'Deleted', field: 'isDeleted', maxWidth: 125 },
    { headerName: 'Page Topic', field: 'pageTopic' },
    { headerName: 'Question', field: 'question' },
    { headerName: 'Answer', field: 'answer' },
    { headerName: 'Created By', field: 'createdBy' },
    { headerName: 'Last Updated By', field: 'lastUpdatedBy' },
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
          FAQs
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
