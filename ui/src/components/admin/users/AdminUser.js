import React from "react";
import { customAxios as axios } from "../../helpers/customAxios";
import { useEffect, useState } from "react";
import {
  Button,
  Flex,
  Box,
  useBreakpointValue,
  useColorModeValue,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  chakra,
  Stack,
  useToast,
} from "@chakra-ui/react";

import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { useTable, useSortBy } from "react-table";
//import Header from "./navigation/Header";
import SidebarWithHeader from "../navigation/Sidebar";
import ViewUser from "./ViewUserComponent";
import EditUser from "./EditUserComponent";
import DeleteUser from "./DeleteUserComponent";
import ArrayToExcelButton from "../ArrayToExcelButton";
import { useDispatch } from "react-redux";

const smVariant = { navigation: "drawer", navigationButton: true };
const mdVariant = { navigation: "sidebar", navigationButton: false };

export default function AdminUser(props) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const variants = useBreakpointValue({ base: smVariant, md: mdVariant });
  const dispatch = useDispatch();
  const toast = useToast();

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const getData = async () => {
    try {
      const { data } = await axios.get("/api/users/get");
      setUsers(data);
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

  const refreshHandler = () => {
    getData();
  };

  const data = user;

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "fullName",
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
        accessor: "phoneNumber",
      },
      {
        Header: "Country of Origin",
        accessor: "countryOfOrigin",
      },
      {
        Header: "LIFE Group",
        accessor: "lifeGroup",
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
        <Stack mb={3} direction="row">
          <Button onClick={() => refreshHandler()}>Refresh</Button>
          {loading ? (
            <Button> Export </Button>
          ) : (
            <ArrayToExcelButton
              apiArray={data}
              fileName={"UserData.xlsx"}
              buttonTitle={"Export"}
            />
          )}
        </Stack>
        <Flex
          bg={useColorModeValue("gray.200")}
          justifyContent="center"
          display={{ md: "flex" }}
          overflowX="auto"
        >
          <Box overflowX="auto">
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
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
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
                      <Td>
                        <Stack spacing={2} direction="row" align="center">
                          <ViewUser props={data} />
                          <EditUser></EditUser>
                          <DeleteUser></DeleteUser>
                        </Stack>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </Box>
        </Flex>
      </SidebarWithHeader>
    </>
  );
}
