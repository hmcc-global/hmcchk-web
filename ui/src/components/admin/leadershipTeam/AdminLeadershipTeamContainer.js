import { customAxios as axios } from '../../helpers/customAxios';
import { Heading, Button } from '@chakra-ui/react';
import { useState, useRef, useCallback, useEffect } from 'react';
import { DateTime } from 'luxon';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

export default function AdminLeadershipTeamContainer(props) {
  // constants
  const dateFromFormat = 'yyyy-MM-dd'; // Ag-grid converter helper
  const dateToFormat = 'dd MMM yyyy';
  const pollFreqInSecs = 30;
  const undoRedoCellEditing = true; // Enabling Undo and Redo
  const undoRedoCellEditingLimit = 20;
  const enableCellChangeFlash = true;

  // states
  const [api, setApi] = useState();
  const [colApi, setColApi] = useState();
  const [teams, setTeams] = useState([]);
  let lastUpdatedTime = useRef();

  // get data for ag grid table and check when is it last up
  const getData = async () => {
    try {
      const { data } = await axios.get('/api/leadership-team/get');
      setTeams(data);
    } catch (err) {
      console.log(err);
    }
  };

  const checkIfUpdated = useCallback(async (updateData = true) => {
    try {
      const { data } = await axios.get('/api/last-updated', {
        params: { modelName: 'leadershipTeam' },
      });
      const dateObj = DateTime.fromISO(data);
      if (!lastUpdatedTime.current || dateObj > lastUpdatedTime.current) {
        updateData && getData();
        lastUpdatedTime.current = dateObj;
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    getData();
    checkIfUpdated(false);
    setInterval(() => {
      checkIfUpdated();
    }, pollFreqInSecs * 1000);
  }, [checkIfUpdated]);

  const defaultColDef = {
    editable: true,
    sortable: true,
    resizable: true,
    filter: true,
    floatingFilter: true,
  };

  // handle export of csv
  const exportParams = () => {
    let fileName = 'leadership_team.csv';
    if (lastUpdatedTime.current) {
      const asOfDate = lastUpdatedTime.current.toFormat('yyyyMMdd_HHmmss');
      fileName = `${asOfDate}_leadership_team.csv`;
    }

    return {
      skipColumnGroupHeaders: true,
      allColumns: true,
      fileName: fileName,
    };
  };

  const exportHandler = () => {
    if (api) {
      api.exportDataAsCsv(exportParams());
    }
  };

  useEffect(() => {
    if (api) {
      if (teams && teams.length) {
        api.hideOverlay();
      } else {
        api.showLoadingOverlay();
      }
    }
  }, [teams, api]);

  // Ag-Grid Helpers
  // Formatters
  const dateFormatter = (dateStr) => {
    if (dateStr) {
      const dateObj = DateTime.fromFormat(dateStr, dateFromFormat);
      return dateObj.toFormat(dateToFormat);
    }

    return '';
  };

  // Undo and Redo Functions
  const undo = () => {
    if (api) api.undoCellEditing();
  };

  const redo = () => {
    if (api) api.redoCellEditing();
  };

  // Ag-Grid Column Definitions
  const columnDefs = [];

  return (
    <>
      <Heading></Heading>
    </>
  );
}
