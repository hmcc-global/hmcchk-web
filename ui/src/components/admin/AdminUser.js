import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Input,
  Button,
  toggleColorMode,
  Flex,
  Box,
  Heading,
  useBreakpointValue,
  useColorModeValue,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  chakra,
} from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { useTable, useSortBy } from "react-table";
//import Header from "./navigation/Header";
import SidebarWithHeader from "./navigation/Sidebar";

const smVariant = { navigation: "drawer", navigationButton: true };
const mdVariant = { navigation: "sidebar", navigationButton: false };

export default function App(props) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const variants = useBreakpointValue({ base: smVariant, md: mdVariant });

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const { classes } = props;
  const [users, setUsers] = useState([]);

  const getData = async () => {
    try {
      const { data } = await axios.get("/api/users/get");
      console.log(data);
      // setUsers(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const data = React.useMemo(
    () => [
      {
        name: "a full name",
        email: "email@email.com",
        lifestage: "Single Adult",
        phone: "12345678",
        birthday: "21 January 1999",
      },
      {
        name: "full name",
        email: "email1@email.com",
        lifestage: "CUHK",
        phone: "87654321",
        birthday: "5 December 2000",
      },
    ],
    []
  );

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Campus/Life Stage",
        accessor: "lifestage",
      },
      {
        Header: "Phone Number",
        accessor: "phone",
      },
      {
        Header: "Birthday",
        accessor: "birthday",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  return (
    <>
      <SidebarWithHeader
        variant={variants?.navigation}
        isOpen={isSidebarOpen}
        onClose={toggleSidebar}
      >
        <Flex
          height="85vh"
          bg={useColorModeValue("gray.200")}
          justifyContent="center"
        >
          <Table
            variant="striped"
            colorScheme="blackAlpha"
            {...getTableProps()}
          >
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
                </Tr>
              ))}
            </Thead>
            <Tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <Tr {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <Td
                        {...cell.getCellProps()}
                        isNumeric={cell.column.isNumeric}
                      >
                        {cell.render("Cell")}
                      </Td>
                    ))}
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </Flex>
      </SidebarWithHeader>
    </>
  );
}
