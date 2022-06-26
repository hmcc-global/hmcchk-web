import React from "react";
import { customAxios as axios } from "../../helpers/customAxios";
import { useEffect, useState } from "react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { Button, Heading } from "@chakra-ui/react";
import { DateTime } from "luxon";

export default function AdminUser(props) {
  const dateFromFormat = 'yyyy-MM-dd';
  const dateToFormat = 'dd MMM yyyy';

  const [api, setApi] = useState();
  const [users, setUsers] = useState([]);

  const defaultColDef = {
    editable: true,
    sortable: true,
    resizable: true
  };

  const exportParams = {
    skipColumnGroupHeaders: true,
    allColumns: true
  };

  const getData = async () => {
    try {
      const { data } = await axios.get("/api/users/get");
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
  }

  // ag-grid helpers

  const birthdayGetter = (params) => {
    if (params && params.data && params.data.birthday) {
      const { birthday: birthdayStr } = params.data;
      const birthday = DateTime.fromFormat(birthdayStr, dateFromFormat);
      return birthday.toFormat(dateToFormat);
    }

    return '';
  }

  const officialNameHeaderGetter = (params, parentName) => {
    const headerName = 'Official Name'
    if (params.location === 'csv') {
      return `${parentName} ${headerName}`;
    }
    return headerName;
  }

  const membershipHeaderGetter = (params, columnName) => params.location === 'csv' ? `Membership ${columnName}` : columnName;

  // membership getters
  const membershipRecommitmentDateGetter = (params) => {
    if (params && params.data && params.data.membershipInfo && params.data.membershipInfo[0]) {
      const { recommitmentDate: recommitmentDateStr } = params.data.membershipInfo[0];
      const recommitmentDate = DateTime.fromFormat(recommitmentDateStr, dateFromFormat);
      return recommitmentDate.toFormat(dateToFormat);
    }
  }

  const membershipRecognitionDateGetter = (params) => {
    if (params && params.data && params.data.membershipInfo && params.data.membershipInfo[0]) {
      const { recognitionDate: recognitionDateStr } = params.data.membershipInfo[0];
      const recognitionDate = DateTime.fromFormat(recognitionDateStr, dateFromFormat);
      return recognitionDate.toFormat(dateToFormat);
    }
  }

  const membershipOfficialNameGetter = (params) => {
    if (params && params.data && params.data.membershipInfo && params.data.membershipInfo[0]) {
      const { officialName } = params.data.membershipInfo[0];
      return officialName;
    }
  }

  // baptism getters
  const baptismDateGetter = (params) => {
    if (params && params.data && params.data.baptismInfo && params.data.baptismInfo[0]) {
      const { baptismDate: baptismDateStr } = params.data.baptismInfo[0];
      const baptismDate = DateTime.fromFormat(baptismDateStr, dateFromFormat);
      return baptismDate.toFormat(dateToFormat);
    }
  }

  const baptismPlaceGetter = (params) => {
    if (params && params.data && params.data.baptismInfo && params.data.baptismInfo[0]) {
      const { baptismPlace } = params.data.baptismInfo[0];
      return baptismPlace;
    }
  }

  const baptismOfficialNameGetter = (params) => {
    if (params && params.data && params.data.baptismInfo && params.data.baptismInfo[0]) {
      const { officialName } = params.data.baptismInfo[0];
      return officialName;
    }
  }

  // ag-grid functions
  const onGridReady = (params) => {
    if (params.api)
      setApi(params.api);
  }

  const columnDefs = [
    { headerName: 'Name', field: 'fullName' },
    { headerName: 'Email', field: 'email' },
    { headerName: 'Lifestage', field: 'lifestage' },
    { headerName: 'Campus', field: 'campus' },
    { headerName: 'LIFE Group', field: 'lifeGroup' },
    { headerName: 'Personal Details', marryChildren: true, children: [
      { headerName: 'Phone', field: 'phoneNumber' },
      { headerName: 'Birth Date', valueGetter: birthdayGetter, columnGroupShow: 'open' },
      { headerName: 'Nationality', field: 'countryOfOrigin', columnGroupShow: 'open' },
    ]},
    { headerName: 'Address', marryChildren: true, children: [
      { headerName: 'Street', field: 'address.street' },
      { headerName: 'Flat', field: 'address.flat', columnGroupShow: 'open' },
      { headerName: 'Floor', field: 'address.floor', columnGroupShow: 'open' },
      { headerName: 'District', field: 'address.district', columnGroupShow: 'open' },
      { headerName: 'Region', field: 'address.region', columnGroupShow: 'open' }
    ]},
    { headerName: 'Church Details', marryChildren: true, children: [
        { headerName: 'Ministry Team', field: 'ministryTeam' },
        { headerName: 'Access Type', field: 'accessType' },
        { headerName: 'Membership Info', marryChildren: true, children: [
          { headerValueGetter: p => membershipHeaderGetter(p, 'Recommitment Date'), valueGetter: membershipRecommitmentDateGetter },
          { headerValueGetter: p => membershipHeaderGetter(p, 'Recognition Date'), valueGetter: membershipRecognitionDateGetter },
          { headerValueGetter: p => officialNameHeaderGetter(p, 'Membership'), colId: 'membershipOfficialName', valueGetter: membershipOfficialNameGetter, columnGroupShow: 'open' }
        ]},
        { headerName: 'Baptism Info', marryChildren: true, children: [
          { headerName: 'Baptism Date', valueGetter: baptismDateGetter },
          { headerName: 'Baptism Place', valueGetter: baptismPlaceGetter, columnGroupShow: 'open' },
          { headerValueGetter: p => officialNameHeaderGetter(p, 'Baptism'), valueGetter: baptismOfficialNameGetter, columnGroupShow: 'open' }
        ]},
    ]}
  ];

  return (
    <>
      <Heading as="h3" mb={10}>Users</Heading>
      <div className="ag-theme-balham" style={{height: 800, width: '100%'}}>
        <AgGridReact
          defaultColDef={defaultColDef}
          columnDefs={columnDefs}
          onGridReady={onGridReady}
          rowData={users}
        />
      </div>
      <Button onClick={exportHandler} mt={5}>
        Export
      </Button>
    </>
  );
}
