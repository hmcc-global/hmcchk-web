import { Button } from "@chakra-ui/react";
import { DownloadIcon } from "@chakra-ui/icons";
import { arrayToExcel } from "../helpers/arrayToExcel";

const ArrayToExcelButton = ({ apiArray, fileName, buttonTitle }) => {
  const apiArrayToExcel = () => {
    const customArray = JSON.parse(JSON.stringify(apiArray));
    console.log(customArray);
    customArray.map((obj) => {
      Object.keys(obj);
      delete obj["password"];
      delete obj["address"];
      delete obj["emailProofToken"];
      delete obj["hasFilledProfileForm"];
    });
    arrayToExcel.convertArrayToTable(customArray, fileName);
  };

  return (
    <>
      <Button
        leftIcon={<DownloadIcon />}
        colorScheme="teal"
        onClick={() => apiArrayToExcel()}
      >
        {buttonTitle}
      </Button>
    </>
  );
};

export default ArrayToExcelButton;
