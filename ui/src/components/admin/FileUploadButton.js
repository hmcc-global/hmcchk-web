import React, { Component, useState } from "react";
import { CSVReader } from "react-papaparse";
import { mapGiving } from "../helpers/mapGiving";

const FileUploadButton = () => {
  const [csv, setCsv] = useState({});

  const handleOnDrop = (data) => {
    console.log(data);
    mapGiving(data);
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
