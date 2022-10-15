import React, { useEffect, useState } from 'react';
import {} from '@chakra-ui/react';
import { customAxios as axios } from '../../helpers/customAxios';
import { Heading } from '@chakra-ui/react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { DateTime } from 'luxon';

export default function AdminFormDataViewer(props) {
  const {
    location: { state },
  } = props;
  const formName = state.name;
  const formId = state.id;

  const [formData, setFormData] = useState([]);
  const [api, setApi] = useState();
  const [flatFormData] = useState([]);

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
          var DateTime = new Date(item.updatedAt);
          temp.updatedAt = DateTime.toISOString()
            .replace(/T/, ' ')
            .replace(/\..+/, '');

          if ('address' in temp) {
            let addressString = [];
            for (const property in temp['address']) {
              addressString.push(temp['address'][property]);
            }
            temp['address'] = addressString.join();
          }

          console.log(temp);
          formDataTemp.push(temp);
        });

        setFormData(formDataTemp);
      } catch (err) {
        console.log(err);
      }
    };

    getFormData();
  }, [formId]);

  const parseFormData = (ob) => {
    let result = {};
    for (const key in ob) {
      if (key === 'address') {
        let addressString = [];
        for (const property in ob['address']) {
          addressString.push(ob['address'][property]);
        }
        result['address'] = addressString.join();
      } else {
        result[key] = ob[key];
      }
    }
    console.log(result);
    return result;
  };

  useEffect(() => {
    if (api) {
      if (formData && formData.length > 0) {
        formData.forEach((element) =>
          flatFormData.push(parseFormData(element))
        );
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
        // TODO-Randall: parse this key to a proper headername
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

    const createCategoricalColumn = (key) => {
      return {
        headerName: key,
        field: key,
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {
          values: [true, false],
        },
      };
    };
    const objectClassifier = (key, value) => {
      if (typeof value === 'string' || key === 'address') {
        columnDefs.push(createStringColumn(key));
      } else if (typeof value === 'number') {
        columnDefs.push(createNumberColumn(key));
      } else if (typeof value === 'boolean') {
        columnDefs.push(createCategoricalColumn(key, value));
      } else {
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
