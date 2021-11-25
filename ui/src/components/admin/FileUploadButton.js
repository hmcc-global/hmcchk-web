import React, { Component, useState } from "react";
import { CSVReader } from "react-papaparse";
import { mapGiving } from "../helpers/mapGiving";
import { arrayToExcel } from "../helpers/arrayToExcel";

const FileUploadButton = () => {
  const [csv, setCsv] = useState({});

  const handleOnDrop = (data) => {
    console.log(data);
    let givingArray = mapGiving(data);
    const customArray = JSON.parse(JSON.stringify(givingArray));
    arrayToExcel.convertArrayToTable(givingArray, "test_giving.xls");
    setCsv(data);
  };

  const handleOnError = (err, file, inputElem, reason) => {
    console.log(err);
  };

  const handleOnRemoveFile = (data) => {
    console.log(data);
  };

  return (
    <CSVReader
      onDrop={handleOnDrop}
      onError={handleOnError}
      addRemoveButton
      removeButtonColor="#659cef"
      onRemoveFile={handleOnRemoveFile}
    >
      <span>Drop CSV file here or click to upload.</span>
    </CSVReader>
  );
};

export default FileUploadButton;
