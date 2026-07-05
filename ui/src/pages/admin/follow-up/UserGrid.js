import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { DateTime } from 'luxon';

const defaultColDef = {
  editable: true,
  sortable: true,
  resizable: true,
  filter: true,
  floatingFilter: true,
};

const DateCellProps = {
  cellEditorPopup: true,
  filter: 'agDateColumnFilter',
};

const tithelyTooltip =
  'Tithely IDs are integers separated using commas. Any whitespaces will be removed.';

// Getters
const classAttendanceHeaderGetter = (params, parentName) => {
  const headerName = 'Class Attendance';
  return params.location === 'csv'
    ? `${parentName} ${headerName}`
    : headerName;
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

const membershipInfoGetter = (params) => {
  if (params) {
    const { colId } = params.colDef;
    const data = params.data.membershipInfo[0]?.[colId];

    if (Array.isArray(data)) return data[0] ?? '';

    return data;
  }
};

const membershipClassAttendanceValueGetter = (params) => {
  if (
    params?.data?.membershipInfo == null ||
    !Array.isArray(params.data.membershipInfo) ||
    params.data.membershipInfo[0] == null ||
    !Array.isArray(params.data.membershipInfo[0]?.classAttendance)
  )
    return '';

  return params.data.membershipInfo[0].classAttendance.join();
};

const membershipFilterGetter = (params) => {
  if (params) {
    const { colId } = params.colDef;
    const dateStr = params.data.membershipInfo[0]?.[colId];
    if (dateStr) {
      return DateTime.fromFormat(dateStr, dateFromFormat).toJSDate();
    }
  }
};

// Baptism Getters
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

const baptismInfoGetter = (params) => {
  if (params) {
    const { colId } = params.colDef;
    return params.data.baptismInfo[0]?.[colId];
  }
};

const baptismClassAttendanceValueGetter = (params) => {
  if (
    params?.data?.baptismInfo == null ||
    !Array.isArray(params.data.baptismInfo) ||
    params.data.baptismInfo[0] == null ||
    !Array.isArray(params.data.baptismInfo[0]?.classAttendance)
  )
    return '';

  return params.data.baptismInfo[0].classAttendance.join();
};

const baptismFilterGetter = (params) => {
  if (params) {
    const dateStr = params.data.baptismInfo[0]?.baptismDate;
    if (dateStr) {
      return DateTime.fromFormat(dateStr, dateFromFormat).toJSDate();
    }
  }
};

const tithelyIdGetter = (params) => {
  const { tithelyId } = params.data;
  if (!tithelyId || tithelyId === '') return '';

  return tithelyId.join(',');
};

// Formatters
const dateFromFormat = 'yyyy-MM-dd';
const dateToFormat = 'dd MMM yyyy';

const dateFormatter = (dateStr) => {
  if (dateStr) {
    const dateObj = DateTime.fromFormat(dateStr, dateFromFormat);
    return dateObj.toFormat(dateToFormat);
  }

  return '';
};

const birthdayFormatter = (params) => {
  if (params && params.data && params.data.birthday) {
    const { birthday: birthdayStr } = params.data;
    return dateFormatter(birthdayStr);
  }

  return '';
};

const membershipBaptismDateFormatter = (params) => {
  if (params.value) {
    const dateTimeFormat = 'dd MMM yyyy';
    const dateTimeObj = DateTime.fromISO(params.value);
    if (dateTimeObj.isValid) return dateTimeObj.toFormat(dateTimeFormat);
  }

  return '';
};

const classAttendanceFormatter = (params) => {
  if (params.value !== '') {
    const dateArr = params.value
      .trim()
      .split(/\s*,\s*/)
      .filter(Boolean);
    const formattedDateArr = dateArr.map((e) => {
      const dateObj = DateTime.fromFormat(e, dateFromFormat);
      if (dateObj.isValid) return dateObj.toFormat(dateToFormat);

      return null;
    });

    return formattedDateArr.filter(Boolean).join(', ');
  }

  return params.value;
};

const columnDefs = [
  {
    headerName: 'User ID',
    field: 'id',
    editable: false,
  },
  {
    headerName: 'Name',
    field: 'fullName',
  },
  {
    headerName: 'Email',
    field: 'email',
  },
  {
    headerName: 'Lifestage',
    field: 'lifestage',
  },
  {
    headerName: 'Campus',
    field: 'campus',
  },
  {
    headerName: 'LIFE Group',
    field: 'lifeGroup',
  },
  {
    headerName: 'Personal Details',
    marryChildren: true,
    children: [
      {
        headerName: 'Phone',
        field: 'phoneNumber',
      },
      {
        ...DateCellProps,
        headerName: 'Birth Date',
        field: 'birthday',
        valueFormatter: birthdayFormatter,
        columnGroupShow: 'open',
      },
      {
        headerName: 'Nationality',
        field: 'countryOfOrigin',
        columnGroupShow: 'open',
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
        colId: 'street',
      },
      {
        headerName: 'Flat',
        field: 'address.flat',
        colId: 'flat',
        columnGroupShow: 'open',
      },
      {
        headerName: 'Floor',
        field: 'address.floor',
        colId: 'floor',
        columnGroupShow: 'open',
      },
      {
        headerName: 'District',
        field: 'address.district',
        colId: 'district',
        columnGroupShow: 'open',
      },
      {
        headerName: 'Region',
        field: 'address.region',
        colId: 'region',
        columnGroupShow: 'open',
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
      },
      {
        headerName: 'Access Type',
        field: 'accessType',
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
            filterValueGetter: membershipFilterGetter,
            valueGetter: membershipInfoGetter,
            valueFormatter: membershipBaptismDateFormatter,
          },
          {
            ...DateCellProps,
            headerValueGetter: (p) =>
              membershipHeaderGetter(p, 'Recognition Date'),
            colId: 'recognitionDate',
            filterValueGetter: membershipFilterGetter,
            valueGetter: membershipInfoGetter,
            valueFormatter: membershipBaptismDateFormatter,
          },
          {
            headerValueGetter: (p) =>
              officialNameHeaderGetter(p, 'Membership'),
            colId: 'officialName',
            valueGetter: membershipOfficialNameGetter,
            columnGroupShow: 'open',
          },
          {
            headerValueGetter: (p) =>
              classAttendanceHeaderGetter(p, 'Membership'),
            colId: 'classAttendance',
            valueGetter: membershipClassAttendanceValueGetter,
            valueFormatter: classAttendanceFormatter,
            columnGroupShow: 'open',
          },
        ],
      },
      {
        headerName: 'Baptism Info',
        marryChildren: true,
        children: [
          {
            ...DateCellProps,
            headerName: 'Baptism Date',
            valueGetter: baptismInfoGetter,
            filterValueGetter: baptismFilterGetter,
            valueFormatter: membershipBaptismDateFormatter,
            colId: 'baptismDate',
          },
          {
            headerName: 'Baptism Place',
            field: 'baptismInfo.baptismPlace',
            colId: 'baptismPlace',
            valueGetter: baptismPlaceGetter,
            columnGroupShow: 'open',
          },
          {
            headerValueGetter: (p) => officialNameHeaderGetter(p, 'Baptism'),
            colId: 'officialName',
            valueGetter: baptismOfficialNameGetter,
            columnGroupShow: 'open',
          },
          {
            headerValueGetter: (p) =>
              classAttendanceHeaderGetter(p, 'Baptism'),
            colId: 'classAttendance',
            valueGetter: baptismClassAttendanceValueGetter,
            valueFormatter: classAttendanceFormatter,
            columnGroupShow: 'open',
          },
        ],
      },
    ],
  },
  {
    headerName: 'Tithely ID',
    field: 'tithelyId',
    valueGetter: tithelyIdGetter,
    headerTooltip: tithelyTooltip,
  },
];


export default function UserGrid ({ users, defaultFilter }) {
  const [api, setApi] = useState();

  useEffect(() => {
    if (users == null || api == null) return;
    if (users.length > 0) {
      api.setRowData(users);
      api.setFilterModel(defaultFilter);
      api.hideOverlay();
    } else {
      api.showNoRowsOverlay();
    }
  }, [api, defaultFilter, users]);

  const onGridReady = (params) => {
    if (params.api) setApi(params.api);
  };

  return (
    <div className="ag-theme-alpine" style={{ height: 800, width: '100%' }}>
      <AgGridReact
        defaultColDef={defaultColDef}
        columnDefs={columnDefs}
        onGridReady={onGridReady}
        rowData={[]}
        tooltipShowDelay={0}
      />
    </div>
  );
}