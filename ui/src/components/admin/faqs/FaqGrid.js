import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import {
  Heading,
  Container,
  Switch,
  HStack,
  Select,
  Text,
  Button,
} from '@chakra-ui/react';
import { FaCaretDown } from 'react-icons/fa';
import { faqPageTopicList as pageTopicList } from '../../helpers/lists';

export default function FaqGrid(props) {
  const {
    faqs,
    setSelected,
    toast,
    resetHandler,
    updateHandler,
    isLoading,
    getData,
  } = props;

  const [showDeleted, setShowDeleted] = useState(false);
  const [showPublishedOnly, setShowPublishedOnly] = useState(false);
  const [pageTopicFilter, setPageTopicFilter] = useState('');
  const [localFaqs, setLocalFaqs] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [isReorderingFaqs, setIsReorderingFaqs] = useState(false);
  const [toPublish, setToPublish] = useState(false);
  const [toUnpublish, setToUnpublish] = useState(false);

  const [api, setApi] = useState();
  const [colApi, setColApi] = useState();

  // Utility function for deep copying arrays
  const deepCopyArray = (arrayToCopy) => {
    return JSON.parse(JSON.stringify(arrayToCopy));
  }

  // Update local faqs when FAQs are updated in the database
  useEffect(() => {
    if (faqs) {
      // Perform deep copy to prevent modifying the original FAQs array
      setLocalFaqs(deepCopyArray(faqs));
    }
  }, [faqs]);

  // Filter the faqs based on the showDeleted and filter states
  useEffect(() => {
    if (localFaqs) {
      let filteredFaqs;
      filteredFaqs = showDeleted ? localFaqs : localFaqs.filter((p) => !p.isDeleted);
      filteredFaqs =
        pageTopicFilter !== ''
          ? filteredFaqs.filter((p) => p.pageTopic === pageTopicFilter)
          : filteredFaqs;
      filteredFaqs = showPublishedOnly
        ? filteredFaqs.filter((p) => p.isPublished)
        : filteredFaqs;

      // Sort FAQs by page topic first, then order
      filteredFaqs.sort((a, b) => {
        if (a.pageTopic === b.pageTopic) {
          return a.order - b.order;
        }
        return a.pageTopic > b.pageTopic ? 1 : -1;
      });

      setFiltered(filteredFaqs);
    }
  }, [localFaqs, showDeleted, pageTopicFilter, showPublishedOnly]);

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

  // Reset the faq grid after the faqs are updated
  useEffect(() => {
    if (!isLoading) {
      setToPublish(false);
      setToUnpublish(false);
    }
  }, [isLoading]);

  // Ag-Grid Functions
  const onGridReady = (params) => {
    if (params.api) setApi(params.api);
    if (params.columnApi) setColApi(params.columnApi);
  };

  // Handle FAQ selections
  const onSelectionChanged = () => {
    if (api) {
      const selectedNodes = api.getSelectedNodes();

      if (selectedNodes && selectedNodes.length) {
        // Reset FAQ editing panel when multiple FAQs are selected, else show top FAQ
        selectedNodes.length === 1
          ? setSelected(selectedNodes[0].data)
          : resetHandler();

        // Handle publish/unpublish buttons
        const selectedFaqsIsPublished = selectedNodes.map(
          (faq) => faq.data.isPublished
        );
        setToPublish(
          selectedFaqsIsPublished.every((isPublished) => isPublished === false)
        );
        setToUnpublish(
          selectedFaqsIsPublished.every((isPublished) => isPublished === true)
        );
      } else {
        // Reset FAQ editing panel when no FAQs are selected
        resetHandler();
        // Hide publish/unpublish buttons when no FAQs are selected
        setToPublish(false);
        setToUnpublish(false);
      }
    }
  };

  // Functions to handle FAQ reordering
  useEffect(() => {
    if (api) {
      api.setSuppressRowDrag(!isReorderingFaqs);
      if (isReorderingFaqs) {
        setReorderFaqColumns();
        setReorderFaqFilters();
      } else {
        setReorderFaqColumns();
        setReorderFaqFilters();
      }
    }
  }, [isReorderingFaqs, api]);

  // Set the column visibility when reordering FAQs
  const setReorderFaqColumns = () => {
    if (colApi) {
      colApi.setColumnVisible('pageTopic', !isReorderingFaqs);
      colApi.setColumnVisible('createdBy', !isReorderingFaqs);
      colApi.setColumnVisible('lastUpdatedBy', !isReorderingFaqs);
      colApi.setColumnVisible('isPublished', !isReorderingFaqs);
      colApi.setColumnVisible('isDeleted', !isReorderingFaqs);
    }
  };

  // Set the filters when reordering FAQs
  const setReorderFaqFilters = () => {
    setShowPublishedOnly(isReorderingFaqs);
    setPageTopicFilter(isReorderingFaqs ? pageTopicList[0] : '');
  };

  // FAQ Publishing & Reordering Functions
  // Handles FAQ publishing/unpublishing
  const publishHandler = async () => {
    if (api) {
      const selectedFaqs = api.getSelectedNodes();

      if (selectedFaqs && selectedFaqs.length) {
        let tempFaqs = deepCopyArray(localFaqs);

        if (toPublish) {
          selectedFaqs.forEach((faq) => {
            const idx = tempFaqs.findIndex((f) => f.id === faq.data.id);
            if (idx !== -1) tempFaqs[idx].isPublished = true;
          });
        }

        if (toUnpublish) {
          selectedFaqs.forEach((faq) => {
            const idx = tempFaqs.findIndex((f) => f.id === faq.data.id);
            if (idx !== -1) tempFaqs[idx].isPublished = false;
          });
        }

        if (toPublish || toUnpublish) {
          resetHandler();
          setLocalFaqs(tempFaqs);
          setIsReorderingFaqs(true);
        }
      } else {
        toast({
          description: 'No FAQs selected',
          status: 'error',
          duration: 3000,
        });
      }
    }
  };
  // Enables FAQ reordering
  const enableFaqReordering = () => {
    setShowDeleted(false);
    setIsReorderingFaqs(true);
  };
  // Cancels FAQ publishing/reordering
  const cancelHandler = () => {
    setIsReorderingFaqs(false);
    // Revert local FAQs to database FAQs
    setLocalFaqs(deepCopyArray(faqs));
  };
  // Set the order of the FAQs when a row is dragged
  const onRowDragEnd = (params) => {
    if (params.api) {
      let tempFaqs = deepCopyArray(localFaqs);
      params.api.forEachNode((node) => {
        const idx = tempFaqs.findIndex((f) => f.id === node.data.id);
        if (idx !== -1) tempFaqs[idx].order = node.rowIndex + 1;
        
      });
      setLocalFaqs(tempFaqs);
    }
  };

  // FAQ Update Functions
  const saveFaqInfo = async (data) => {
    return updateHandler(data);
  };

  const saveFaqReordering = async () => {
    try {
      const updatePromises = localFaqs.map(async (faq) => {
        const toUpdate = {
          id: faq.id,
          order: faq.order,
          isPublished: faq.isPublished,
        };

        const success = await saveFaqInfo(toUpdate);
        if (!success) {
          console.log('Error saving FAQ');
        }
      });
      
      // Wait for all FAQs to be updated
      await Promise.all(updatePromises);

      toast({
        description: 'Successfully reordered FAQs',
        status: 'success',
        duration: 5000,
      });

      // Refresh FAQs with updated data
      await getData();

      setIsReorderingFaqs(false);
      setToPublish(false);
      setToUnpublish(false);
    } catch (err) {
      console.log(err);
      toast({
        description: 'Error publishing reordered FAQs',
        status: 'error',
        duration: 5000,
      });
    }
  };

  // Ag-grid Helper Functions
  const booleanFormatter = (params) => (params.value ? 'true' : 'false');
  const orderFormatter = (params) => (params.value === -1 ? '' : params.value);

  // Ag-Grid definitions
  const columnDefs = [
    {
      headerName: 'Published',
      field: 'isPublished',
      maxWidth: 150,
      valueFormatter: booleanFormatter,
      checkboxSelection: true,
      headerCheckboxSelection: true,
    },
    { headerName: 'Page Topic', field: 'pageTopic' },
    { headerName: 'Question', field: 'question', rowDrag: true },
    { headerName: 'Answer', field: 'answer' },
    {
      headerName: 'Order',
      field: 'order',
      maxWidth: 100,
      valueFormatter: orderFormatter,
    },
    {
      headerName: 'Deleted',
      field: 'isDeleted',
      maxWidth: 125,
      valueFormatter: booleanFormatter,
    },
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
        <Heading size="md">FAQs</Heading>
        <HStack>
          <Switch
            value={showDeleted}
            onChange={(e) => setShowDeleted(e.target.checked)}
            isDisabled={isReorderingFaqs}
            isChecked={showDeleted}
          >
            Show deleted
          </Switch>
          <Switch
            value={showPublishedOnly}
            onChange={(e) => setShowPublishedOnly(e.target.checked)}
            isDisabled={isReorderingFaqs}
            isChecked={showPublishedOnly}
          >
            Show published only
          </Switch>
        </HStack>
      </HStack>
      <HStack>
        {toPublish || toUnpublish ? (
          <Button
            colorScheme="green"
            onClick={publishHandler}
            variant={isReorderingFaqs ? 'outline' : 'solid'}
            isLoading={isReorderingFaqs}
            loadingText={toPublish ? 'Publishing' : 'Unpublishing'}
            my={2.5}
          >
            {toPublish ? 'Publish' : 'Unpublish'}
          </Button>
        ) : null}
        <Button
          colorScheme="blue"
          onClick={enableFaqReordering}
          variant={isReorderingFaqs ? 'outline' : 'solid'}
          isLoading={isReorderingFaqs}
          loadingText="Reordering Published FAQs"
          my={2.5}
        >
          Reorder Published FAQs
        </Button>
      </HStack>

      {isReorderingFaqs ? (
        <>
          <HStack justifyContent="space-between">
            <HStack>
              <Text>Page Topic: </Text>
              <Select
                width="auto"
                size="md"
                borderRadius={5}
                icon={<FaCaretDown />}
                variant="filled"
                value={pageTopicFilter}
                onChange={(e) => setPageTopicFilter(e.target.value)}
              >
                {pageTopicList &&
                  pageTopicList
                    .slice(0, pageTopicList.length)
                    .map((p) => <option value={p}>{p}</option>)}
              </Select>
            </HStack>
            <HStack>
              <Button colorScheme="red" onClick={cancelHandler}>
                Cancel
              </Button>
              <Button colorScheme="blue" onClick={saveFaqReordering}>
                Save
              </Button>
            </HStack>
          </HStack>
        </>
      ) : null}
      <div
        className="ag-theme-alpine"
        style={{ height: 800, width: '100%', marginTop: '0.7em' }}
      >
        <AgGridReact
          defaultColDef={defaultColDef}
          columnDefs={columnDefs}
          onGridReady={onGridReady}
          onSelectionChanged={onSelectionChanged}
          rowData={filtered}
          rowSelection="multiple"
          rowDragManaged={true}
          onRowDragEnd={onRowDragEnd}
        />
      </div>
    </Container>
  );
}
