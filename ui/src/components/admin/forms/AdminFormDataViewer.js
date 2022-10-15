import React, { useEffect, useState } from 'react';
import {} from '@chakra-ui/react';
import { customAxios as axios } from '../../helpers/customAxios';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { Button, Heading, Text, Input, HStack, Box } from '@chakra-ui/react';
import { DateTime } from 'luxon';

export default function AdminFormDataViewer(props) {
  const {
    location: { state },
  } = props;
  const formName = state.name;
  const formId = state.id;

  const [formData, setFormData] = useState([]);
  const [api, setApi] = useState();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const getFilterType = () => {
    if (startDate !== '' && endDate !== '') return 'inRange';
    else if (startDate !== '') return 'greaterThan';
    else if (endDate !== '') return 'lessThan';
  };

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

  useEffect(() => {
    const getFormData = async () => {
      try {
        const { data } = await axios.get('/api/forms/get-submission', {
          params: {
            formId: formId,
          },
        });
        let formDataTemp = [];
        data.forEach(function (item) {
          let temp = {};
          temp = item.submissionData;

          //format date to: yyy-mm-dd hh:mm:ss
          let dateTimeRaw = DateTime.fromISO(item.updatedAt);
          temp.updatedAt = dateTimeRaw
            .toISO()
            .replace(/T/, ' ')
            .replace(/\..+/, '');

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
  }, [formId]);

  useEffect(() => {
    if (api) {
      if (startDate !== '' && endDate !== '' && startDate > endDate) {
        alert('Start Date should be before End Date');
        setEndDate('');
      } else {
        let dateFilterComponent = api.getFilterInstance('updatedAt');
        dateFilterComponent.setModel({
          type: getFilterType(),
          dateFrom: startDate ? startDate : endDate,
          dateTo: endDate,
        });
        api.onFilterChanged();
      }
    }
  }, [startDate, endDate]);

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
    editable: true,
    sortable: true,
    resizable: true,
    filter: true,
    floatingFilter: true,
  };

  const createColumnDefs = () => {
    let columnDefs = [];

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
        headerName: key,
        field: key,
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {
          values: [true, false],
        },
      };
    };
    const createDateColumn = (key) => {
      return {
        headerName: key,
        field: key,
        filter: 'agDateColumnFilter',
        filterParams: dateFilterParams,
      };
    };
    const objectClassifier = (key, value) => {
      if (key === 'updatedAt') {
        columnDefs.push(createDateColumn(key));
      } else if (typeof value === 'string') {
        columnDefs.push(createStringColumn(key));
      } else if (typeof value === 'number') {
        columnDefs.push(createNumberColumn(key));
      } else if (typeof value === 'boolean') {
        columnDefs.push(createBooleanColumn(key, value));
      } else {
        console.log(
          'ERROR: unexpected object type, it is not displayed: ' + key
        );
      }
    };

    if (formData && formData.length > 0) {
      const first = formData[0];
      for (const [key, value] of Object.entries(first)) {
        objectClassifier(key, value);
      }
    }

    return columnDefs;
  };

  const onGridReady = (event) => {
    if (event.api) {
      setApi(event.api);
    }
  };

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
        <AgGridReact
          defaultColDef={defaultColDef}
          columnDefs={createColumnDefs()}
          enterMovesDownAfterEdit={true}
          onGridReady={onGridReady}
          stopEditingWhenCellsLoseFocus={true}
          tooltipShowDelay={0}
        />
      </div>
    </>
  );
}
