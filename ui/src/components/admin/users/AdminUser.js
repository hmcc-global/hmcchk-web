import React from 'react';
import { customAxios as axios } from '../../helpers/customAxios';
import { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { Button, Heading } from '@chakra-ui/react';
import { DateTime } from 'luxon';
import CustomDateEditor from './ag-grid-editors/CustomDateEditor.js';
import {
  accessTypeList,
  lifestageList,
  ministryTeamList,
  lifegroupList,
  districtList,
  regionList,
  campusList,
  countryList,
} from '../../helpers/lists';

export default function AdminUser(props) {
  const dateFromFormat = 'yyyy-MM-dd';
  const dateToFormat = 'dd MMM yyyy';

  const [api, setApi] = useState();
  const [users, setUsers] = useState([]);

  const defaultColDef = {
    editable: true,
    sortable: true,
    resizable: true,
  };

  const exportParams = {
    skipColumnGroupHeaders: true,
    allColumns: true,
  };

  const getData = async () => {
    try {
      const { data } = await axios.get('/api/users/get');
      setUsers(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const exportHandler = () => {
    if (api) {
      api.exportDataAsCsv(exportParams);
    }
  };

  // ag-grid helpers

  const birthdayGetter = (params) => {
    if (params && params.data && params.data.birthday) {
      const { birthday: birthdayStr } = params.data;
      const birthday = DateTime.fromFormat(birthdayStr, dateFromFormat);
      return birthday.toFormat(dateToFormat);
    }

    return '';
  };

  const officialNameHeaderGetter = (params, parentName) => {
    const headerName = 'Official Name';
    if (params.location === 'csv') {
      return `${parentName} ${headerName}`;
    }
    return headerName;
  };

  const membershipHeaderGetter = (params, columnName) =>
    params.location === 'csv' ? `Membership ${columnName}` : columnName;

  // membership getters
  const membershipRecommitmentDateGetter = (params) => {
    if (
      params &&
      params.data &&
      params.data.membershipInfo &&
      params.data.membershipInfo[0]
    ) {
      const { recommitmentDate: recommitmentDateStr } =
        params.data.membershipInfo[0];
      const recommitmentDate = DateTime.fromFormat(
        recommitmentDateStr,
        dateFromFormat
      );
      return recommitmentDate.toFormat(dateToFormat);
    }
  };

  const membershipRecognitionDateGetter = (params) => {
    if (
      params &&
      params.data &&
      params.data.membershipInfo &&
      params.data.membershipInfo[0]
    ) {
      const { recognitionDate: recognitionDateStr } =
        params.data.membershipInfo[0];
      const recognitionDate = DateTime.fromFormat(
        recognitionDateStr,
        dateFromFormat
      );
      return recognitionDate.toFormat(dateToFormat);
    }
  };

  const membershipOfficialNameGetter = (params) => {
    if (
      params &&
      params.data &&
      params.data.membershipInfo &&
      params.data.membershipInfo[0]
    ) {
      const { officialName } = params.data.membershipInfo[0];
      return officialName;
    }
  };

  // baptism getters
  const baptismDateGetter = (params) => {
    if (
      params &&
      params.data &&
      params.data.baptismInfo &&
      params.data.baptismInfo[0]
    ) {
      const { baptismDate: baptismDateStr } = params.data.baptismInfo[0];
      const baptismDate = DateTime.fromFormat(baptismDateStr, dateFromFormat);
      return baptismDate.toFormat(dateToFormat);
    }
  };

  const baptismPlaceGetter = (params) => {
    if (
      params &&
      params.data &&
      params.data.baptismInfo &&
      params.data.baptismInfo[0]
    ) {
      const { baptismPlace } = params.data.baptismInfo[0];
      return baptismPlace;
    }
  };

  const baptismOfficialNameGetter = (params) => {
    if (
      params &&
      params.data &&
      params.data.baptismInfo &&
      params.data.baptismInfo[0]
    ) {
      const { officialName } = params.data.baptismInfo[0];
      return officialName;
    }
  };

  // ag-grid functions
  const onGridReady = (params) => {
    if (params.api) setApi(params.api);
  };

  const onFirstDataRendered = (params) => {
    const allColumnIds = [];
    params.columnApi.getAllColumns().forEach((column) => {
      allColumnIds.push(column.getId());
    });

    params.columnApi.autoSizeColumns(allColumnIds);
  };

  const onCellValueChanged = (params) => {
    // Resize columns automatically after editing a cell
    const allColumnIds = [];
    params.columnApi.getAllColumns().forEach((column) => {
      allColumnIds.push(column.getId());
    });

    params.columnApi.autoSizeColumns(allColumnIds);
  };

  const columnDefs = [
    {
      headerName: 'Name',
      field: 'fullName',
    },
    { headerName: 'Email', field: 'email' },
    {
      headerName: 'Lifestage',
      field: 'lifestage',
      cellEditorPopup: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: lifestageList,
      },
    },
    {
      headerName: 'Campus',
      field: 'campus',
      cellEditorPopup: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: campusList,
      },
    },
    {
      headerName: 'LIFE Group',
      field: 'lifeGroup',
      cellEditorPopup: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: lifegroupList,
      },
    },
    {
      headerName: 'Personal Details',
      marryChildren: true,
      children: [
        { headerName: 'Phone', field: 'phoneNumber' },
        {
          headerName: 'Birth Date',
          field: 'birthday',
          valueGetter: birthdayGetter,
          columnGroupShow: 'open',
          cellEditor: CustomDateEditor,
          cellEditorPopup: true,
        },
        {
          headerName: 'Nationality',
          field: 'countryOfOrigin',
          columnGroupShow: 'open',
          cellEditorPopup: true,
          cellEditor: 'agSelectCellEditor',
          cellEditorParams: {
            values: countryList,
          },
        },
      ],
    },
    {
      headerName: 'Address',
      marryChildren: true,
      children: [
        {
          headerName: 'Street',
          field: 'address.street',
          cellEditorPopup: true,
          cellEditor: 'agLargeTextCellEditor',
          cellEditorParams: {
            maxLength: 100,
            rows: 1,
            cols: 50,
          },
        },
        {
          headerName: 'Flat',
          field: 'address.flat',
          columnGroupShow: 'open',
          cellEditorPopup: true,
          cellEditor: 'agLargeTextCellEditor',
          cellEditorParams: {
            maxLength: 100,
            rows: 1,
            cols: 50,
          },
        },
        {
          headerName: 'Floor',
          field: 'address.floor',
          columnGroupShow: 'open',
          cellEditorPopup: true,
          cellEditor: 'agLargeTextCellEditor',
          cellEditorParams: {
            maxLength: 100,
            rows: 1,
            cols: 10,
          },
        },
        {
          headerName: 'District',
          field: 'address.district',
          columnGroupShow: 'open',
          cellEditorPopup: true,
          cellEditor: 'agSelectCellEditor',
          cellEditorParams: {
            values: districtList,
          },
        },
        {
          headerName: 'Region',
          field: 'address.region',
          columnGroupShow: 'open',
          cellEditorPopup: true,
          cellEditor: 'agSelectCellEditor',
          cellEditorParams: {
            values: regionList,
          },
        },
      ],
    },
    {
      headerName: 'Church Details',
      marryChildren: true,
      children: [
        {
          headerName: 'Ministry Team',
          field: 'ministryTeam',
          cellEditorPopup: true,
          cellEditor: 'agSelectCellEditor',
          cellEditorParams: {
            values: ministryTeamList,
          },
        },
        {
          headerName: 'Access Type',
          field: 'accessType',
          cellEditorPopup: true,
          cellEditor: 'agSelectCellEditor',
          cellEditorParams: {
            values: accessTypeList,
          },
        },
        {
          headerName: 'Membership Info',
          marryChildren: true,
          children: [
            {
              headerValueGetter: (p) =>
                membershipHeaderGetter(p, 'Recommitment Date'),
              field: 'membershipInfo[0].recommitmentDate',
              valueGetter: membershipRecommitmentDateGetter,
              cellEditor: CustomDateEditor,
              cellEditorPopup: true,
            },
            {
              headerValueGetter: (p) =>
                membershipHeaderGetter(p, 'Recognition Date'),
              field: 'membershipInfo[0].recognitionDate',
              valueGetter: membershipRecognitionDateGetter,
              cellEditor: CustomDateEditor,
              cellEditorPopup: true,
            },
            {
              headerValueGetter: (p) =>
                officialNameHeaderGetter(p, 'Membership'),
              colId: 'membershipOfficialName',
              valueGetter: membershipOfficialNameGetter,
              columnGroupShow: 'open',
            },
          ],
        },
        {
          headerName: 'Baptism Info',
          marryChildren: true,
          children: [
            {
              headerName: 'Baptism Date',
              valueGetter: baptismDateGetter,
              field: 'baptismInfo[0].baptismDate',
              cellEditor: CustomDateEditor,
              cellEditorPopup: true,
            },
            {
              headerName: 'Baptism Place',
              valueGetter: baptismPlaceGetter,
              columnGroupShow: 'open',
              cellEditorPopup: true,
              cellEditor: 'agLargeTextCellEditor',
              cellEditorParams: {
                maxLength: 100,
                rows: 1,
                cols: 50,
              },
            },
            {
              headerValueGetter: (p) => officialNameHeaderGetter(p, 'Baptism'),
              valueGetter: baptismOfficialNameGetter,
              columnGroupShow: 'open',
            },
          ],
        },
      ],
    },
  ];

  return (
    <>
      <Heading as="h3" mb={10}>
        Users
      </Heading>
      <div className="ag-theme-balham" style={{ height: 800, width: '100%' }}>
        <AgGridReact
          defaultColDef={defaultColDef}
          columnDefs={columnDefs}
          onGridReady={onGridReady}
          rowData={users}
          enterMovesDownAfterEdit={true}
          stopEditingWhenCellsLoseFocus={true}
          onFirstDataRendered={onFirstDataRendered}
          onCellValueChanged={onCellValueChanged}
        />
      </div>
      <Button onClick={exportHandler} mt={5}>
        Export
      </Button>
    </>
  );
}
