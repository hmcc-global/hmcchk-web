import React, { useEffect, useState } from "react";
import { customAxios as axios } from "../../helpers/customAxios";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import {
  Input,
  Button,
  Select,
  Container,
  Grid,
  GridItem,
  Text,
  Divider,
  useToast,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import moment from "moment";
import InvoiceType from "./InvoiceType";

export default function InvoiceCreator() {
  const initialState = {
    items: [{ itemName: "", quantity: "", unitPrice: "", amount: "" }],
    total: 0,
    notes: "",
    invoiceNumber: Math.floor(Math.random() * 100000),
    status: "",
    type: "Invoice",
    creator: "",
  };

  const [invoiceData, setInvoiceData] = useState(initialState);
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(
    today.getTime() + 7 * 24 * 60 * 60 * 1000
  );
  const [client, setClient] = useState(null);
  const [type, setType] = React.useState("Invoice");
  const [status, setStatus] = useState("");
  const { id } = useParams();
  // const clients = useSelector((state) => state.clients.clients);
  const invoice = useSelector((state) => state.invoices);
  const dispatch = useDispatch();
  const history = useHistory();
  const toast = useToast();
  const user = JSON.parse(localStorage.getItem("profile"));

  const getInvoice = async () => {
    try {
      const { data } = await axios.get("/api/invoices/get");
      setInvoiceData(data);
    } catch (err) {
      console.log(err);
      toast({
        title: "Something went wrong.",
        description: "Try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const getClients = async () => {
    try {
      const { data } = await axios.get("/api/users/get");
      setClient(data);
    } catch (err) {
      console.log(err);
      toast({
        title: "Something went wrong.",
        description: "Try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    getInvoice();
  }, []);

  useEffect(() => {
    getClients();
  }, []);

  useEffect(() => {
    if (invoice) {
      //Automatically set the default invoice values as the ones in the invoice to be updated
      setInvoiceData(invoice);
      setClient(invoice.client);
      setType(invoice.type);
      setStatus(invoice.status);
      setSelectedDate(invoice.dueDate);
    }
  }, [invoice]);

  useEffect(() => {
    if (type === "Receipt") {
      setStatus("Paid");
    } else {
      setStatus("Unpaid");
    }
  }, [type]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleChange = (index, e) => {
    const values = [...invoiceData.items];
    values[index][e.target.name] = e.target.value;
    setInvoiceData({ ...invoiceData, items: values });
  };

  const handleAddField = (e) => {
    e.preventDefault();
    setInvoiceData((prevState) => ({
      ...prevState,
      items: [
        ...prevState.items,
        { itemName: "", quantity: "", unitPrice: "", amount: "" },
      ],
    }));
  };
  const handleRemoveField = (index) => {
    const values = invoiceData.items;
    values.splice(index, 1);
    setInvoiceData((prevState) => ({ ...prevState, values }));
  };

  return (
    <>
      <Container>
        <Grid templateColumns="repeat(5, 1fr)" gap={4}>
          <GridItem colStart={1}>Logo</GridItem>
          <GridItem rowSpan={2} colStart={5}>
            <InvoiceType type={type} setType={setType}></InvoiceType>
            <Text color="gray.500">INVOICE#:</Text>
            <Input defaultValue={invoiceData.invoiceNumber}></Input>
          </GridItem>
        </Grid>
      </Container>
      <Divider mt={3} mb={3} />
      <Container>
        <Grid templateColumns="repeat(5, 1fr)" gap={4}>
          <GridItem colStart={1} colSpan={2}>
            <Container>
              <Text>Bill To</Text>

              {client && (
                <>
                  <Text>{client.fullName}</Text>
                  <Text>{client.email}</Text>
                  <Text>{client.phoneNumber}</Text>
                  <Text>{client.address}</Text>
                  <Button onClick={() => setClient(null)}>Change</Button>
                </>
              )}
              {/* <div style={client ? { display: "none" } : { display: "block" }}>
                <Autocomplete
                  {...clientsProps}
                  value={clients?.name}
                  onChange={(event, value) => setClient(value)}
                />
              </div> */}
              {!client && (
                <>
                  <Button leftIcon={<AddIcon />}>New Customer</Button>
                </>
              )}
            </Container>
          </GridItem>

          <GridItem rowSpan={2} colStart={5}>
            <Text color="gray.500">STATUS</Text>
            <Text>{type === "Receipt" ? "Paid" : "Unpaid"}</Text>
            <Text color="gray.500">DATE</Text>
            <Text>{moment().format("D MMM YYYY")}</Text>
            <Text color="gray.500">DUE DATE</Text>
            <Text>
              {selectedDate
                ? moment(selectedDate).format("D MMM YYYY")
                : "27th Sep 2021"}
            </Text>
          </GridItem>
        </Grid>
      </Container>

      <Container>
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>Item</Th>
              <Th>Qty</Th>
              <Th>Price</Th>
              <Th>Amount</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {invoiceData.items.map((itemField, index) => (
              <Tr key={index}>
                <Td scope="row">
                  <Input
                    onChange={(e) => handleChange(index, e)}
                    value={itemField.itemName}
                    placeholder="Item name or description"
                  />
                </Td>
                <Td>
                  <Input
                    onChange={(e) => handleChange(index, e)}
                    value={itemField.quantity}
                    placeholder="0"
                  />
                </Td>
                <Td>
                  <Input
                    onChange={(e) => handleChange(index, e)}
                    value={itemField.unitPrice}
                    placeholder="0"
                  />
                </Td>
                <Td>
                  <Input
                    onChange={(e) => handleChange(index, e)}
                    value={itemField.amount}
                    placeholder="0"
                  />
                </Td>
                <Td>
                  <Button onClick={() => handleRemoveField(index)}>
                    <DeleteIcon />
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Button mt={2} onClick={handleAddField}>
          <AddIcon />
        </Button>
      </Container>
      <Grid templateColumns="repeat(5, 1fr)" gap={4}>
        <GridItem rowSpan={1} colStart={4}>
          <Table variant="striped">
            <Thead>
              <Tr>
                <Th>Invoice Summary</Th>
              </Tr>
            </Thead>
          </Table>
        </GridItem>
      </Grid>
    </>
  );
}
