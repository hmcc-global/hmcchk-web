import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { Heading, Container, Switch, HStack } from '@chakra-ui/react';

export default function TestimonyGrid(props) {
  const { testimonies, setSelected } = props;

  const [showDeleted, setShowDeleted] = useState(false);
  const [filtered, setFiltered] = useState(testimonies);
  const [api, setApi] = useState();
  const [colApi, setColApi] = useState();

  useEffect(() => {
    if (testimonies) {
      if (!showDeleted) {
        setFiltered(testimonies.filter((p) => p.isDeleted === false));
      } else {
        setFiltered(testimonies);
      }
    }
  }, [testimonies, showDeleted]);
}
