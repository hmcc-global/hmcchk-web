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

export default function FaqGrid(props) {
  const { faqs, setSelected, toast, resetHandler, updateHandler } = props;

  const [pageTopicFilter, setPageTopicFilter] = useState('');
  const [pageTopicList, setPageTopicList] = useState([]);
  const [showDeleted, setShowDeleted] = useState(false);
  const [showPublishedOnly, setShowPublishedOnly] = useState(false);
  const [filtered, setFiltered] = useState(faqs);
  const [isReorderingFaqs, setIsReorderingFaqs] = useState(false);
  const [toPublish, setToPublish] = useState(false);
  const [toUnpublish, setToUnpublish] = useState(false);
  const [toPublishList, setToPublishList] = useState([]);
  const [toUnpublishList, setToUnpublishList] = useState([]);

  const [api, setApi] = useState();
  const [colApi, setColApi] = useState();

  // Retrieve all page topics
  useEffect(() => {
    if (faqs) {
      const pageTopics = faqs.map((p) => p.pageTopic);
      const uniquePageTopics = [...new Set(pageTopics.sort())];
      setPageTopicList(uniquePageTopics);
    }
  }, [faqs]);

  // Filter the faqs based on the showDeleted and filter states
  useEffect(() => {
    if (faqs) {
      let filteredFaqs;
      filteredFaqs = showDeleted ? faqs : faqs.filter((p) => !p.isDeleted);
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
  }, [faqs, showDeleted, pageTopicFilter, showPublishedOnly]);

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
  // Handles FAQ publishing
  const publishHandler = async () => {
    if (api) {
      const selectedFaqs = api.getSelectedNodes();

      if (selectedFaqs && selectedFaqs.length) {
        if (toPublish) {
          setToPublishList(selectedFaqs);
          selectedFaqs.forEach((faq) => {
            faq.setDataValue('isPublished', true);
          });
          resetHandler();
          setIsReorderingFaqs(true);
        } else if (toUnpublish) {
          setToUnpublishList(selectedFaqs);
          selectedFaqs.forEach((faq) => {
            faq.setDataValue('isPublished', false);
          });
          resetHandler();
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
    if (toPublish && toPublishList && toPublishList.length) {
      toPublishList.forEach((faq) => {
        faq.setDataValue('isPublished', false);
      });
      setToPublish(false);
    } else if (toUnpublish && toUnpublishList && toUnpublishList.length) {
      toUnpublishList.forEach((faq) => {
        faq.setDataValue('isPublished', true);
      });
      setToUnpublish(false);
    }
    setIsReorderingFaqs(false);
  };
  // Set the order of the FAQs when a row is dragged
  const onRowDragEnd = (params) => {
    if (params.api) {
      params.api.forEachNode((node) => {
        node.setDataValue('order', node.rowIndex + 1);
      });
    }
  };

  const saveFaqInfo = async (data) => {
    return updateHandler(data);
  };

  const saveFaqReordering = async () => {
    if (api) {
      api.forEachNode(async (node) => {
        const toUpdate = {
          id: node.data.id,
          order: node.data.order,
          isPublished: node.data.isPublished,
        };
        const success = await saveFaqInfo(toUpdate);
        if (!success) {
          console.log('Error saving FAQ reordering');
          return;
        }
      });
      toast({
        description: 'Successfully published reordered FAQs',
        status: 'success',
        duration: 5000,
      });
      setToPublish(false);
      setToUnpublish(false);
      setIsReorderingFaqs(false);
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
        <Heading s="md" size="md">
          FAQs
        </Heading>
        <Switch
          value={showDeleted}
          onChange={(e) => setShowDeleted(e.target.checked)}
          isDisabled={isReorderingFaqs}
          isChecked={showDeleted}
        >
          Show deleted
        </Switch>
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
