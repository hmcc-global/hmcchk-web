import React from 'react';
import { customAxios as axios } from '../../helpers/customAxios';
import { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { Button, ButtonGroup, Heading } from '@chakra-ui/react';
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
import { CgUndo, CgRedo } from 'react-icons/cg';

export default function AdminUser(props) {
  const dateFromFormat = 'yyyy-MM-dd';
  const dateToFormat = 'dd MMM yyyy';

  const [api, setApi] = useState();
  const [colApi, setColApi] = useState();
  const [users, setUsers] = useState([]);

  const defaultColDef = {
    editable: true,
    sortable: true,
    resizable: true,
    filter: true,
    floatingFilter: true,
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

  // Ag-Grid Helpers
  // Getter Functions: to handle errors in retrieving data
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

  // Membership Getters
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

    return '';
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

    return '';
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

    return '';
  };

  // Baptism Getters
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

    return '';
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

    return '';
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

    return '';
  };

  // Setter Functions: to validate user edits
  // Note: for columns with selection edits, there will be NO validation as none is necessary
  const fullNameSetter = (params) => {
    if (params && params.data && params.newValue) {
      var newFullName = params.newValue;
      
      // Valid Full Name: Letters and Whitespaces
      if (
        params.data.fullName !== newFullName &&
        /^[A-Za-z\s]*$/.test(newFullName)
      ) {
        params.data.fullName = newFullName;
        return true;
      }
      alert("Invalid Full Name!");
      return false;
    }
    return false;
  }

  const emailSetter = (params) => {
    if (params && params.data && params.newValue) {
      var newEmail = params.newValue;
      
      // Ref for regex: https://regexlib.com/REDetails.aspx?regexp_id=3029
      if (
        params.data.email !== newEmail &&
        newEmail.match(/^(?:(?:[\w\.\-_]+@[\w\d]+(?:\.[\w]{2,6})+)[,;]?\s?)+$/)
      ) {
        params.data.email = newEmail;
        return true;
      }
      alert('Invalid Email Address!');
      return false;
    }

    return false;
  };

  const phoneNumberSetter = (params) => {
    if (params && params.data && params.newValue) {
      var newPhoneNumber = params.newValue;
      // Handle User EDITs: string type gets passed for edits
      if (typeof newPhoneNumber === 'string') {
        // Get rid of '+', '-', and white spaces
        newPhoneNumber = newPhoneNumber.replace(/\s|\+|-/g, '');
        // Check if input is an integer
        if (
          !isNaN(newPhoneNumber) &&
          Number.isInteger(Number(newPhoneNumber))
        ) {
          params.data.phoneNumber = newPhoneNumber;
          return true;
        }
        alert('Invalid Phone Number!');
        return false;
      }
      // Handle UNDOs: number type get passed for undos
      else if (typeof newPhoneNumber === 'number') {
        params.data.phoneNumber = params.newValue;
        return true;
      }
    }

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

  // Resize columns on cell edits
  const onCellValueChanged = () => {
    if (api && colApi) {
      autoSizeAllColumns();
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

  //  Ag-Grid Column Definitions
  const columnDefs = [
    {
      headerName: 'Name',
      field: 'fullName',
      valueSetter: fullNameSetter,
    },
    {
      headerName: 'Email',
      field: 'email',
      valueSetter: emailSetter,
    },
    {
      headerName: 'Lifestage',
      field: 'lifestage',
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: lifestageList,
      },
    },
    {
      headerName: 'Campus',
      field: 'campus',
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: campusList,
      },
    },
    {
      headerName: 'LIFE Group',
      field: 'lifeGroup',
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: lifegroupList,
      },
    },
    {
      headerName: 'Personal Details',
      marryChildren: true,
      children: [
        {
          headerName: 'Phone',
          field: 'phoneNumber',
          valueSetter: phoneNumberSetter,
          // Didn't enable NUMBER filter because there is no "contains" option for number filters: not as user-friendly as TEXT filter
        },
        {
          headerName: 'Birth Date',
          field: 'birthday',
          valueGetter: birthdayGetter,
          columnGroupShow: 'open',
          cellEditor: CustomDateEditor,
          cellEditorPopup: true,
          filter: 'agDateColumnFilter',
        },
        {
          headerName: 'Nationality',
          field: 'countryOfOrigin',
          columnGroupShow: 'open',
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
          ...MediumTextEditorProps,
        },
        {
          headerName: 'Flat',
          field: 'address.flat',
          columnGroupShow: 'open',
        },
        {
          headerName: 'Floor',
          field: 'address.floor',
          columnGroupShow: 'open',
        },
        {
          headerName: 'District',
          field: 'address.district',
          columnGroupShow: 'open',
          cellEditor: 'agSelectCellEditor',
          cellEditorParams: {
            values: districtList,
          },
        },
        {
          headerName: 'Region',
          field: 'address.region',
          columnGroupShow: 'open',
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
          cellEditor: 'agSelectCellEditor',
          cellEditorParams: {
            values: ministryTeamList,
          },
        },
        {
          headerName: 'Access Type',
          field: 'accessType',
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
              filter: 'agDateColumnFilter',
            },
            {
              headerValueGetter: (p) =>
                membershipHeaderGetter(p, 'Recognition Date'),
              field: 'membershipInfo[0].recognitionDate',
              valueGetter: membershipRecognitionDateGetter,
              cellEditor: CustomDateEditor,
              cellEditorPopup: true,
              filter: 'agDateColumnFilter',
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
              field: 'baptismInfo.baptismDate',
              cellEditor: CustomDateEditor,
              cellEditorPopup: true,
              filter: 'agDateColumnFilter',
            },
            {
              headerName: 'Baptism Place',
              valueGetter: baptismPlaceGetter,
              field: 'baptismInfo.baptismPlace',
              columnGroupShow: 'open',
              ...MediumTextEditorProps,
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
      <Heading as="h3" mb={5}>
        Users
      </Heading>
      <ButtonGroup mb={5} variant="outline" spacing="5">
        <Button onClick={undo} leftIcon={<CgUndo />}>
          Undo
        </Button>
        <Button onClick={redo} rightIcon={<CgRedo />}>
          Redo
        </Button>
      </ButtonGroup>
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
          undoRedoCellEditing={undoRedoCellEditing}
          undoRedoCellEditingLimit={undoRedoCellEditingLimit}
          enableCellChangeFlash={enableCellChangeFlash}
        />
      </div>
      <Button onClick={exportHandler} mt={5} variant="outline">
        Export
      </Button>
    </>
  );
}
