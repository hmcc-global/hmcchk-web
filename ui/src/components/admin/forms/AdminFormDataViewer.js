import React, { useCallback, useEffect, useState } from 'react';
import {} from '@chakra-ui/react';
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
} from '@chakra-ui/react';
import { DateTime } from 'luxon';
import { paymentMethodList } from '../../helpers/lists';
import CustomDateEditor from '../ag-grid-editors/CustomDateEditor';
import { CgUndo, CgRedo } from 'react-icons/cg';

export default function AdminFormDataViewer(props) {
  const {
    location: { state },
  } = props;
  const formName = state.name;
  const formId = state.id;

  const [isPaidForm, setIsPaidForm] = useState(false);
  const [formData, setFormData] = useState([]);
  const [api, setApi] = useState();
  const [colApi, setColApi] = useState();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

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
      let cellDate = DateTime.fromFormat(dateAsString, 'yyyy-MM-dd HH:mm:ss');
      if (cellDate === dateAtMidnight) {
        return 1;
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
  const dateTimeFormatter = (dateTime) => {
    return DateTime.fromISO(dateTime).toFormat('yyyy-MM-dd HH:mm:ss');
  };

  const dateToFormat = 'dd MMM yyyy';
  const dateFormatter = (dateStr) => {
    if (dateStr) {
      const dateObj = DateTime.fromISO(dateStr);
      return dateObj.toFormat(dateToFormat);
    }

    return '';
  };

  const paymentDateFormatter = (params) => {
    if (
      params &&
      params.data &&
      params.data.paymentData &&
      params.data.paymentData.paymentDateTime
    ) {
      const { paymentDateTime } = params.data.paymentData;
      return dateFormatter(paymentDateTime);
    }

    return '';
  };

  // Ag-Grid Helpers
  // Getters
  const paymentDateGetter = (params) => {
    if (
      params &&
      params.data &&
      params.data.paymentData &&
      params.data.paymentData.paymentDateTime
    ) {
      const { paymentDateTime } = params.data.paymentData;
      return paymentDateTime;
    }

    return '';
  };

  // Setters
  const paymentDateSetter = (params) => {
    if (params && params.data) {
      var newPaymentDateTime = params.newValue;

      params.data.paymentData.paymentDateTime = newPaymentDateTime;
      return true;
    }

    alert('Invalid Payment Date!');
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

  useEffect(() => {
    const getFormData = async () => {
      try {
        const { data } = await axios.get('/api/forms/get-submission', {
          params: {
            formId: formId,
          },
        });

        // Check if form is a paid form by checking for paymentData attribute
        if (data && data.length > 0 && data[data.length - 1].paymentData) {
          setIsPaidForm(true);
        }

        let formDataTemp = [];
        data.forEach((item) => {
          let temp = {};

          temp = item.submissionData;

          let dateTimeRaw = DateTime.fromISO(item.createdAt);
          temp['_submissionTime'] = dateTimeRaw.toFormat('yyyy-MM-dd HH:mm:ss');
          // Populate form data with payment data if form is a paid form
          if (isPaidForm && item.paymentData && item.paymentData.length > 0) {
            temp['paymentData'] = item.paymentData[0];

            // Set NULL values to empty strings: NULL values will cause update paymentData API to throw error
            if (!temp.paymentData.paymentDateTime) {
              temp.paymentData.paymentDateTime = '';
            }
          }

          temp.updatedAt = dateTimeFormatter(item.updatedAt);

          if ('address' in temp) {
            let addressString = [];
            for (const property in temp['address']) {
              addressString.push(temp['address'][property]);
            }
            temp['address'] = addressString.join(', ');
          }

          formDataTemp.push(temp);
        });

        setFormData(formDataTemp);
      } catch (err) {
        console.log(err);
      }
    };
    getFormData();
  }, [formId, isPaidForm]);

  useEffect(() => {
    if (api) {
      if (startDate !== '' && endDate !== '' && startDate > endDate) {
        alert('Start Date should be before End Date');
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
  }, [startDate, endDate, api, getFilterType]);

  useEffect(() => {
    if (api) {
      if (formData && formData.length > 0) {
        api.setRowData(formData);
        return;
      }
      api.setRowData([]);
    }
  }, [formData, api]);

  const defaultColDef = {
    sortable: true,
    resizable: true,
    filter: true,
    floatingFilter: true,
  };

  const createColumnDefs = () => {
    const createStringColumn = (key) => {
      return {
        headerName: key,
        field: key,
      };
    };

    const createNumberColumn = (key) => {
      return {
        headerName: key,
        field: key,
        type: 'numericColumn',
      };
    };

    const createBooleanColumn = (key) => {
      return {
        ...BooleanCellProps,
        headerName: key,
        field: key,
      };
    };

    // const createDateColumn = (key) => {
    //   return {
    //     headerName: key,
    //     field: key,
    //     filter: 'agDateColumnFilter',
    //     filterParams: dateFilterParams,
    //   };
    // };

    let columnDefs = [
      { headerName: '_submissionTime', field: '_submissionTime', filter: 'agDateColumnFilter', filterParams: dateFilterParams, sort: 'asc' }
    ];
    const createPaymentDataColumns = (key) => {
      return {
        headerName: 'Payment Info',
        marryChildren: true,
        children: [
          {
            ...BooleanCellProps,
            headerName: 'Payment Status',
            field: 'paymentData.isPaid',
            valueFormatter: (params) => {
              if (params && params.data && params.data.paymentData) {
                return params.data.paymentData.isPaid ? 'Paid' : 'Not Paid';
              }
            },
          },
          {
            ...DateCellProps,
            headerName: 'Payment Date',
            columnGroupShow: 'open',
            valueGetter: paymentDateGetter,
            valueSetter: paymentDateSetter,
            valueFormatter: paymentDateFormatter,
          },
          {
            headerName: 'Payment Type',
            field: 'paymentData.paymentType',
            columnGroupShow: 'open',
          },
          {
            headerName: 'Payment Method',
            field: 'paymentData.paymentMethod',
            cellEditor: 'agSelectCellEditor',
            cellEditorParams: {
              values: paymentMethodList,
            },
            columnGroupShow: 'open',
          },
          {
            ...MediumTextEditorProps,
            headerName: 'Remarks',
            field: 'paymentData.remarks',
            columnGroupShow: 'open',
          },
          {
            ...BooleanCellProps,
            headerName: 'Confirmation Email',
            field: 'paymentData.isConfirmationEmailSent',
            columnGroupShow: 'open',
            valueFormatter: (params) => {
              if (params && params.data && params.data.paymentData) {
                return params.data.paymentData.isConfirmationEmailSent
                  ? 'Sent'
                  : 'Not Sent';
              }
            },
          },
        ],
      };
    };

    const objectClassifier = (key, value) => {
      if (key === '_submissionTime') {
        return;
      } else if (key === 'paymentData') {
        // Create Payment Info Column Group
        columnDefs.push(createPaymentDataColumns(key, value));
      } else if (typeof value === 'string') {
        columnDefs.push(createStringColumn(key));
      } else if (typeof value === 'number') {
        columnDefs.push(createNumberColumn(key));
      } else if (typeof value === 'boolean') {
        columnDefs.push(createBooleanColumn(key));
      } else {
        console.log(
          'ERROR: unexpected object type, it is not displayed: ' + key
        );
      }
    };

    if (formData && formData.length > 0) {
      const sample = formData[formData.length - 1];
      for (const [key, value] of Object.entries(sample)) {
        objectClassifier(key, value);
      }
    }

    return columnDefs;
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

  // Resize columns on first render of the grid
  const onFirstDataRendered = () => {
    if (api && colApi) {
      autoSizeAllColumns();
    }
  };

  // Call API to update payment data
  const updatePaymentData = async (data) => {
    const res = await axios.put('/api/paymentData/update', {
      ...data,
    });

    if (res.status !== 200) {
      alert('Something went wrong, please refresh and try again..');
    }
  };

  const onCellValueChanged = async (p) => {
    if (api && colApi && p.data) {
      autoSizeAllColumns();

      const groupHeaderName =
        p?.column?.originalParent?.colGroupDef?.headerName;

      if (groupHeaderName && groupHeaderName === 'Payment Info') {
        const { paymentData: newPaymentData } = p.data;
        await updatePaymentData(newPaymentData);
      }
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

  return (
    <>
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
          rowSelection='multiple'
          tooltipShowDelay={0}
          onFirstDataRendered={onFirstDataRendered}
          onCellValueChanged={onCellValueChanged}
          undoRedoCellEditing={undoRedoCellEditing}
          undoRedoCellEditingLimit={undoRedoCellEditingLimit}
          enableCellChangeFlash={enableCellChangeFlash}
        />
      </div>
    </>
  );
}
