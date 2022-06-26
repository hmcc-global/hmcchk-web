import React from "react";
import { customAxios as axios } from "../../helpers/customAxios";
import { useEffect, useState } from "react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { Button, Heading } from "@chakra-ui/react";
import { DateTime } from "luxon";

export default function AdminUser(props) {
  const [api, setApi] = useState();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const exportParams = {
    skipColumnGroupHeaders: true,
    allColumns: true
  };

  const getData = async () => {
    try {
      const { data } = await axios.get("/api/users/get");
      setUsers(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    console.log(users)
  })

  const exportHandler = () => {
    if (api) {
      api.exportDataAsCsv(exportParams);
    }
  }

  // ag-grid helpers
  const birthdayGetter = (params) => {
    if (params && params.data && params.data.birthday) {
      const { birthday: birthdayStr } = params.data;
      const birthday = DateTime.fromFormat(birthdayStr, 'yyyy-MM-dd');
      return birthday.toFormat('dd MMM yyyy');
    }

    return '';
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
    { headerName: 'Personal Details', marryChildren: true, children: [
      { headerName: 'Phone', field: 'phoneNumber' },
      { headerName: 'Birth Date', valueGetter: birthdayGetter, columnGroupShow: 'open' },
      { headerName: 'Nationality', field: 'countryOfOrigin', columnGroupShow: 'open' },
    ]},
  ];

  return (
    <>
      <Heading as="h3">Users</Heading>
      <div className="ag-theme-balham" style={{height: 400, width: '100%'}}>
        <AgGridReact
          columnDefs={columnDefs}
          onGridReady={onGridReady}
          rowData={users}
        />
      </div>
      <Button onClick={exportHandler}>
        Export
      </Button>
    </>
  );
}
