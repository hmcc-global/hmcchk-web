import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { customAxios as axios } from "../../helpers/customAxios";
import {
  Box,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Button,
  chakra,
  useToast,
} from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { useTable, useSortBy } from "react-table";

export default function InvoicesTable(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [invoice, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  const getData = async () => {
    try {
      const { data } = await axios.get("/api/invoices/get");
      setInvoices(data);
      setLoading(false);
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
    getData();
  }, []);

  const data = invoice;

  const columns = React.useMemo(
    () => [
      { Header: "Number", accessor: "invoiceNumber" },
      { Header: "Client", accessor: "userId" },
      { Header: "Amount", accessor: "total" },
      { Header: "Due Date", accessor: "dueDate" },
      { Header: "Status", accessor: "status" },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  return (
    <>
      <Box overflowX="auto">
        <Table variant="striped" colorScheme="blackAlpha" {...getTableProps()}>
          <Thead>
            {headerGroups.map((headerGroup) => (
              <Tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <Th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    isNumeric={column.isNumeric}
                  >
                    {column.render("Header")}
                    <chakra.span pl="4">
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <TriangleDownIcon aria-label="sorted descending" />
                        ) : (
                          <TriangleUpIcon aria-label="sorted ascending" />
                        )
                      ) : null}
                    </chakra.span>
                  </Th>
                ))}
                <Th>Actions</Th>
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {rows.map((row, index) => {
              prepareRow(row);
              return (
                <Tr {...row.getRowProps()} key={index}>
                  {row.cells.map((cell) => (
                    <Td
                      {...cell.getCellProps()}
                      isNumeric={cell.column.isNumeric}
                    >
                      {cell.render("Cell")}
                    </Td>
                  ))}
                  <Td>
                    <Button>Edit</Button>
                    <Button colorScheme="red">Delete</Button>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Box>
    </>
  );
}
