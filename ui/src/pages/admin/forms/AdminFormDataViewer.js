import React, { useCallback, useEffect, useState, useRef } from 'react';
import { customAxios as axios } from '../../helpers/customAxios';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import {
  Button,
  Heading,
  Text,
  Input,
  HStack,
  Box,
  Tooltip,
  useToast,
} from '@chakra-ui/react';
import { DateTime } from 'luxon';
import { paymentMethodList } from '../../helpers/lists';
import CustomDateEditor from '../ag-grid-editors/CustomDateEditor';
import { CgUndo, CgRedo } from 'react-icons/cg';
import AdminPaymentDataModal from './AdminPaymentDataModal';

const pollFreqInSecs = 5 * 60;

export default function AdminFormDataViewer(props) {
  const toast = useToast();
  const {
    location: { state },
  } = props;
  const formName = state.name;
  const formId = state.id;
  const formFields = state.formFields;
  const isPaymentRequired = state.isPaymentRequired;

  let lastUpdatedTime = useRef();

  const [isLoading, setIsLoading] = useState(true);
  const [isPaidForm, setIsPaidForm] = useState(false);
  const [formData, setFormData] = useState([]);
  const [api, setApi] = useState();
  const [colApi, setColApi] = useState();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [modalColId, setModalColId] = useState('');

  const getFilterType = useCallback(() => {
    if (startDate !== '' && endDate !== '') return 'inRange';
    else if (startDate !== '') return 'greaterThan';
    else if (endDate !== '') return 'lessThan';
  }, [endDate, startDate]);

  const exportHandler = () => {
    if (api) {
      api.exportDataAsCsv(exportParams());
    }
  };

  const exportParams = () => {
    let now = DateTime.now();
    let fileName = `${now.toFormat('yyyyMMdd_HHmmss')}_${formName}.csv`;

    return {
      skipColumnGroupHeaders: true,
      allColumns: true,
      fileName: fileName,
    };
  };

  const dateFilterParams = {
    comparator: function (filterLocalDateAtMidnight, cellValue) {
      let dateAsString = cellValue;
      if (dateAsString == null) return -1;

      let dateAtMidnight = DateTime.fromJSDate(filterLocalDateAtMidnight);
      let cellDate = DateTime.fromISO(dateAsString);
      if (!cellDate.isValid) return 1;

      if (dateAtMidnight.equals(cellDate)) {
        return 0;
      }
      if (cellDate < dateAtMidnight) {
        return -1;
      }
      if (cellDate >= dateAtMidnight) {
        return 1;
      }
    },
    browserDatePicker: true,
  };

  // Formatters
  // For formatting datetime columns
  const dateTimeFormatter = (p) => {
    if (p.value) {
      const dateTimeFormat = 'dd MMM yyyy, HH:mm:ss';
      const dateTimeObj = DateTime.fromISO(p.value);
      if (dateTimeObj.isValid) return dateTimeObj.toFormat(dateTimeFormat);
    }

    return '';
  };

  const dateFormatter = (p) => {
    const dateToFormat = 'dd MMM yyyy';
    if (p.value) {
      const dateObj = DateTime.fromISO(p.value);
      if (dateObj.isValid) return dateObj.toFormat(dateToFormat);
    }

    return '';
  };

  // Ag-Grid Helpers
  // Setters
  const paymentDateSetter = (params) => {
    if (params && params.data) {
      params.data.paymentData.paymentDateTime = params.newValue;
      return true;
    }

    toast({
      description: 'Invalid payment date',
      status: 'error',
      duration: 5000,
    });
    return false;
  };

  // Custom Editors
  const MediumTextEditorProps = {
    cellEditorPopup: true,
    cellEditor: 'agLargeTextCellEditor',
    cellEditorParams: {
      maxLength: 100,
      rows: 1,
      cols: 50,
    },
  };

  const DateCellProps = {
    cellEditor: CustomDateEditor,
    cellEditorPopup: true,
    filter: 'agDateColumnFilter',
  };

  const BooleanCellProps = {
    cellEditor: 'agSelectCellEditor',
    cellEditorParams: {
      values: [true, false],
    },
  };

  const getUserData = async () => {
    try {
      const { data } = await axios.get('/api/users/get'); // destruct assignment
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const getData = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get('/api/forms/get-submission', {
        params: {
          formId: formId,
        },
      });

      const usersData = await getUserData();
      if (
        data &&
        data.length > 0 &&
        data[0].paymentData &&
        data[0].paymentData.length > 0
      ) {
        setIsPaidForm(true);
      }

      let formDataTemp = [];
      data.forEach((item) => {
        let temp = {};

        temp = item.submissionData;
        temp['submissionId'] = item.id;
        temp['_submissionTime'] = item.createdAt;
        // Populate form data with payment data if form is a paid form
        if (item.paymentData && item.paymentData.length > 0) {
          temp['paymentData'] = item.paymentData[0];
        }

        if ('address' in temp) {
          let addressString = [];
          for (const property in temp['address']) {
            addressString.push(temp['address'][property]);
          }
          temp['address'] = addressString.join(', ');
        }

        const found = usersData.find((user) => user.id === item.userId);
        if (found) {
          temp['baptismInfo'] = found.baptismInfo;
          temp['membershipInfo'] = found.membershipInfo;
        }
        formDataTemp.push(temp);
      });
      setFormData(formDataTemp);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, [formId]);

  const checkIfUpdated = useCallback(
    async (updateData = true) => {
      try {
        const modelName = `paymentData-${formId}`;
        const { data } = await axios.get('/api/last-updated', {
          params: { modelName },
        });
        const dateObj = DateTime.fromISO(data);
        if (!lastUpdatedTime.current || dateObj > lastUpdatedTime.current) {
          updateData && getData();
          lastUpdatedTime.current = dateObj;
        }
      } catch (err) {
        console.log(err);
      }
    },
    [formId, getData]
  );

  useEffect(() => {
    getData();
    checkIfUpdated(false);
    setInterval(() => {
      checkIfUpdated();
    }, pollFreqInSecs * 1000);
  }, [checkIfUpdated, getData]);

  useEffect(() => {
    if (api) {
      if (startDate !== '' && endDate !== '' && startDate > endDate) {
        toast({
          description: 'Start Date should be before End Date',
          status: 'error',
          duration: 5000,
        });
        setEndDate('');
      } else {
        let dateFilterComponent = api.getFilterInstance('_submissionTime');
        dateFilterComponent.setModel({
          type: getFilterType(),
          dateFrom: startDate ? startDate : endDate,
          dateTo: endDate,
        });
        api.onFilterChanged();
      }
    }
  }, [startDate, endDate, api, getFilterType, toast]);

  useEffect(() => {
    if (api && colApi) {
      if (isLoading) {
        api.showLoadingOverlay();
        return;
      }

      if (formData && formData.length > 0) {
        api.setRowData(formData);
        return;
      }
      api.setRowData([]);
    }
  }, [formData, api, colApi, isLoading]);

  const defaultColDef = {
    sortable: true,
    resizable: true,
    filter: true,
    floatingFilter: true,
  };

  const baptismInfoGetter = (params) => {
    if (params) {
      const { colId } = params.colDef;
      return params.data.baptismInfo?.[0]?.[colId];
    }
  };

  const membershipHeaderGetter = (params, columnName) =>
    params.location === 'csv' ? `Membership ${columnName}` : columnName;

  const membershipInfoGetter = (params) => {
    if (params) {
      const { colId } = params.colDef;
      const data = params.data.membershipInfo?.[0]?.[colId];
      if (Array.isArray(data)) return data[0];

      return data;
    }
  };

  const membershipAndBaptismDateTimeFormatter = (p) => {
    if (p.value) {
      const dateTimeFormat = 'dd MMM yyyy';
      const dateTimeObj = DateTime.fromISO(p.value);
      if (dateTimeObj.isValid) return dateTimeObj.toFormat(dateTimeFormat);
    }

    return '';
  };

  const createColumnDefs = () => {
    const createFormFieldColumn = (key) => {
      return {
        headerName: key,
        field: key,
      };
    };

    let columnDefs = [
      {
        headerName: '_submissionTime',
        field: '_submissionTime',
        valueFormatter: dateTimeFormatter,
        filter: 'agDateColumnFilter',
        checkboxSelection: isPaidForm,
        headerCheckboxSelection: isPaidForm,
        headerCheckboxSelectionFilteredOnly: isPaidForm,
        filterParams: dateFilterParams,
        sort: 'asc',
        lockPosition: true,
      },
    ];

    const createPaymentDataColumns = () => {
      return {
        headerName: 'Payment Info',
        marryChildren: true,
        children: [
          {
            ...BooleanCellProps,
            headerName: 'Payment Status',
            field: 'paymentData.isPaid',
            colId: 'isPaid',
            valueFormatter: (params) => {
              if (params && params.data && params.data.paymentData) {
                return params.data.paymentData.isPaid ? 'Paid' : 'Not Paid';
              }
            },
            editable: true,
          },
          {
            ...DateCellProps,
            headerName: 'Payment Date',
            field: 'paymentData.paymentDateTime',
            colId: 'paymentDateTime',
            columnGroupShow: 'closed',
            valueSetter: paymentDateSetter,
            valueFormatter: dateFormatter,
            filter: 'agDateColumnFilter',
            filterParams: dateFilterParams,
            editable: true,
          },
          {
            headerName: 'Payment Type',
            field: 'paymentData.paymentType',
            colId: 'paymentType',
            columnGroupShow: 'closed',
            editable: true,
          },
          {
            headerName: 'Payment Method',
            field: 'paymentData.paymentMethod',
            colId: 'paymentMethod',
            cellEditor: 'agSelectCellEditor',
            cellEditorParams: {
              values: paymentMethodList,
            },
            columnGroupShow: 'closed',
            editable: true,
          },
          {
            ...MediumTextEditorProps,
            headerName: 'Remarks',
            field: 'paymentData.remarks',
            colId: 'remarks',
            columnGroupShow: 'closed',
            editable: true,
          },
          {
            ...BooleanCellProps,
            headerName: 'Confirmation Email',
            field: 'paymentData.isConfirmationEmailSent',
            columnGroupShow: 'closed',
            valueFormatter: (params) => {
              if (params && params.data && params.data.paymentData) {
                return params.data.paymentData.isConfirmationEmailSent
                  ? 'Sent'
                  : 'Not Sent';
              }
            },
          },
          {
            headerName: 'Updated At',
            field: 'paymentData.updatedAt',
            valueFormatter: dateTimeFormatter,
            filter: 'agDateColumnFilter',
            filterParams: dateFilterParams,
            columnGroupShow: 'closed',
          },
          {
            headerName: 'Updated By',
            field: 'paymentData.lastUpdatedBy',
            columnGroupShow: 'closed',
          },
        ],
      };
    };

    const objectClassifier = (key) => {
      if (key === '_submissionTime') {
        return;
      } else {
        columnDefs.push(createFormFieldColumn(key));
      }
    };

    if (formFields && formFields.length > 0) {
      formFields.forEach((formField) => objectClassifier(formField.fieldName));
    }

    columnDefs = columnDefs.concat([
      {
        headerName: 'Baptism Info',
        marryChildren: true,
        children: [
          {
            ...DateCellProps,
            headerName: 'Baptism Date',
            valueGetter: baptismInfoGetter,
            valueFormatter: membershipAndBaptismDateTimeFormatter,
            colId: 'baptismDate',
          },
        ],
      },
      {
        headerName: 'Membership Info',
        marryChildren: true,
        children: [
          {
            ...DateCellProps,
            headerValueGetter: (p) =>
              membershipHeaderGetter(p, 'Recommitment Date'),
            colId: 'recommitmentDate',
            valueGetter: membershipInfoGetter,
            valueFormatter: membershipAndBaptismDateTimeFormatter,
          },
          {
            ...DateCellProps,
            headerValueGetter: (p) =>
              membershipHeaderGetter(p, 'Recognition Date'),
            colId: 'recognitionDate',
            valueGetter: membershipInfoGetter,
            valueFormatter: membershipAndBaptismDateTimeFormatter,
          },
        ],
      },
    ]);

    if (isPaymentRequired) {
      columnDefs.push(createPaymentDataColumns());
    }

    return columnDefs;
  };

  // Ag-Grid Functions
  // Initialize Grid API states
  const onGridReady = (params) => {
    if (params.api) setApi(params.api);
    if (params.columnApi) setColApi(params.columnApi);
  };

  // Resize columns on first render of the grid
  const onFirstDataRendered = () => {
    if (colApi) {
      colApi.autoSizeAllColumns();
    }
  };

  // Call API to update payment data
  const updatePaymentData = async (data) => {
    const res = await axios.put('/api/paymentData/update', {
      ...data,
    });

    if (res.status !== 200) {
      toast({
        description: 'Something went wrong, please refresh and try again..',
        status: 'error',
        duration: 5000,
      });
    }
  };

  const onCellValueChanged = async (p) => {
    if (p && p.colDef) {
      const payload = {
        id: p.data.paymentData.id,
        [p.colDef.colId]: p.newValue,
      };
      await updatePaymentData(payload);
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

  // TODO-Samyak: Replace with actual send confirmation email function
  const sendConfirmationEmail = async (selectedNodes) => {
    if (selectedNodes.length === 0) return;

    const submissionIds = selectedNodes.map((i) => i.data.submissionId);
    if (submissionIds == null || submissionIds.length === 0) return;

    try {
      const res = await axios.put('/api/paymentData/send-email', {
        submissionIds: submissionIds,
      });
      if (res.status === 200) {
        toast({
          description: 'Emails sent',
          status: 'success',
          duration: 5000,
        });
        await getData();
      }
    } catch (err) {
      toast({
        description: 'Something went wrong sending the emails',
        status: 'error',
        duration: 5000,
      });
    }
  };

  const contextMenuSetter = (selectedNodes, value, colId) => {
    if (selectedNodes.length === 0) return;

    for (const node of selectedNodes) {
      node.setDataValue(colId, value);
    }
  };

  const modalCallbackHandler = (value) => {
    if (api && value) {
      const selectedNodes = api.getSelectedNodes();
      contextMenuSetter(selectedNodes, value, modalColId);
    }
  };

  const getContextMenuItems = (params) => {
    const selectedNodes = params.api.getSelectedNodes();
    let result = [
      // Default functions
      'copy',
      'separator',
      // Custom functions
      {
        name: 'Set Payment Status As',
        disabled: selectedNodes.length === 0,
        subMenu: [
          {
            name: 'Paid',
            action: () => contextMenuSetter(selectedNodes, true, 'isPaid'),
          },
          {
            name: 'Not Paid',
            action: () => contextMenuSetter(selectedNodes, false, 'isPaid'),
          },
        ],
      },
      {
        name: 'Set Payment Date',
        disabled: selectedNodes.length === 0,
        action: () => {
          setIsModalOpen(true);
          setModalTitle('Set Payment Date');
          setModalColId('paymentDateTime');
          setModalType('date');
        },
      },
      {
        name: 'Set Payment Type',
        disabled: selectedNodes.length === 0,
        action: () => {
          setIsModalOpen(true);
          setModalTitle('Set Payment Type');
          setModalColId('paymentType');
          setModalType('text');
        },
      },
      {
        name: 'Set Payment Method As',
        disabled: selectedNodes.length === 0,
        subMenu: paymentMethodList.map((i) => ({
          name: i,
          action: () => contextMenuSetter(selectedNodes, i, 'paymentMethod'),
        })),
      },
      'separator',
      {
        name: 'Send Confirmation Email',
        disabled: selectedNodes.length === 0,
        action: () => sendConfirmationEmail(selectedNodes),
      },
    ];

    return result;
  };

  return (
    <>
      <AdminPaymentDataModal
        modalOpen={isModalOpen}
        setModalOpen={setIsModalOpen}
        modalType={modalType}
        modalTitle={modalTitle}
        handler={modalCallbackHandler}
      />
      <Heading as="h5" mb={5}>
        {formName}
      </Heading>
      <div className="ag-theme-alpine" style={{ height: 800, width: '100%' }}>
        <HStack m="2" w="100%">
          <Text>From:</Text>
          <Input
            w="12em"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <Text>To:</Text>
          <Input
            w="12em"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <Button
            onClick={exportHandler}
            variant="outline"
            mx="2"
            colorScheme="teal"
          >
            Export
          </Button>
        </HStack>
        <Box my="4">
          <Text color="Teal">
            *date filter indicates midnight of (eg. from 20/01 00:00 to 21/01
            00:00)
          </Text>
        </Box>
        {/* Enable Undo / Redo if is a Paid Form */}
        <div>
          {isPaidForm ? (
            <HStack m="2" w="100%">
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
            </HStack>
          ) : null}
        </div>

        <AgGridReact
          defaultColDef={defaultColDef}
          columnDefs={createColumnDefs()}
          enterMovesDownAfterEdit={true}
          onGridReady={onGridReady}
          stopEditingWhenCellsLoseFocus={true}
          rowSelection="multiple"
          tooltipShowDelay={0}
          onFirstDataRendered={onFirstDataRendered}
          onCellValueChanged={onCellValueChanged}
          undoRedoCellEditing={undoRedoCellEditing}
          undoRedoCellEditingLimit={undoRedoCellEditingLimit}
          enableCellChangeFlash={enableCellChangeFlash}
          getContextMenuItems={getContextMenuItems}
          suppressRowClickSelection={true}
          sideBar={{ toolPanels: ['columns', 'filters'] }}
        />
        <Text>
          Last updated:{' '}
          {DateTime.fromISO(lastUpdatedTime.current).toFormat(
            'dd MMM yyyy, HH:mm:ss'
          )}
        </Text>
      </div>
    </>
  );
}
