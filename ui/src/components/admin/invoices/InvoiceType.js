import { useState, useRef } from "react";
import {
  FormControl,
  FormLabel,
  Button,
  Select,
  AlertDialog,
  AlertDialogBody,
  AlertDialogOverlay,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogContent,
  useDisclosure,
  Text,
} from "@chakra-ui/react";

export default function InvoiceType({ type, setType }) {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef();

  const handleChange = (event) => {
    setType(event.target.value);
  };

  const arrayToOptions = function (x, i) {
    return <option key={i}>{x}</option>;
  };

  const invoiceOptions = [
    "Invoice",
    "Receipt",
    "Estimate",
    "Bill",
    "Quotation",
  ];

  return (
    <>
      <Text>Select Type</Text>
      <Button onClick={handleOpen}>{type ? type : "Invoice"}</Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>Select Invoice Type</AlertDialogHeader>

            <AlertDialogBody>
              <FormControl>
                <FormLabel>
                  <Select
                    id="dialog-select"
                    value={type}
                    onChange={handleChange}
                  >
                    {invoiceOptions.map(arrayToOptions)}
                  </Select>
                </FormLabel>
              </FormControl>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose} colorScheme="red">
                Cancel
              </Button>
              <Button onClick={onClose} ml={3}>
                Save
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
