import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalContent,
  FormControl,
  FormLabel,
  Input,
  Text,
  Stack,
  Button,
} from "@chakra-ui/react";
import { customAxios as axios } from "../helpers/customAxios";
import { arrayToExcel } from "../helpers/arrayToExcel";
import { DateTime } from "luxon";

const FormDataDownloader = (props) => {
  const { isOpen, setIsOpen, formId } = props;
  const { register, reset, handleSubmit, setValue, formState } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onClose = () => {
    setIsOpen(false);
    reset();
  };

  const onDownload = async (data, e) => {
    setIsLoading(true);
    try {
      let timeRange = null;
      if (data.startDate !== "" && data.endDate !== "") {
        timeRange = {
          start: data.startDate,
          end: data.endDate,
        };
      }
      const res = await axios.get("/api/forms/get-submission", {
        params: { formId: formId, timeRange: timeRange },
      });
      let reconstructedData = res.data.map((formItem) => {
        let rowObj = {
          _submissionTime: DateTime.fromISO(formItem.createdAt).toLocaleString(
            DateTime.DATETIME_MED_WITH_SECONDS
          ),
        };
        for (let key in formItem.submissionData) {
          let fieldData = formItem.submissionData[key];
          if (key === "address") {
            fieldData = [
              fieldData.flat,
              fieldData.floor,
              fieldData.street,
              fieldData.district,
              fieldData.region,
            ].join(" ");
          }
          rowObj[key] = fieldData;
        }
        return rowObj;
      });
      if (reconstructedData.length)
        arrayToExcel.convertArrayToTable(reconstructedData, "output");
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Data Downloader</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onDownload)}>
            <Stack direction="column" spacing="4">
              <Text>
                Date Range (leave blank or fill both start and end date). Leave
                a day space on the end date, e.g. from 15/09/2021 to 16/09/2021
              </Text>
              <FormControl>
                <FormLabel>Start Date</FormLabel>
                <Input type="date" {...register("startDate")} />
              </FormControl>
              <FormControl>
                <FormLabel>End Date</FormLabel>
                <Input type="date" {...register("endDate")} />
              </FormControl>
              <Button colorScheme="teal" type="submit" isLoading={isLoading}>
                Download Data
              </Button>
            </Stack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default FormDataDownloader;
