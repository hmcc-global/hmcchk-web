import React, { useEffect, useState } from "react";
import { customAxios as axios } from "../helpers/customAxios";
import {
  useDisclosure,
  Button,
  Flex,
  Box,
  useColorModeValue,
  Table,
  Thead,
  Th,
  Tbody,
  Td,
  Tr,
  Stack,
  chakra,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
} from "@chakra-ui/react";
import ArrayToExcelButton from "./ArrayToExcelButton";
import { useTable, useSortBy } from "react-table";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import FileUploadButton from "./FileUploadButton";

export default function AdminGiving(props) {
  const [user, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const getData = async () => {
    try {
      const { data } = await axios.get("/api/users/get");
      setUsers(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const refreshHandler = () => {
    getData();
  };

  const data = user;

  //const columns = Array.from({ length: 100 });
  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "fullName",
      },
      // {
      //   Header: "Email",
      //   accessor: "email",
      // },
      {
        Header: "Tithely IDs",
        accessor: "givingInfo.tithely",
      },
      {
        Header: "Known Aliases",
        accessor: "givingInfo.aliases",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  return (
    <>
      <Stack mb={3} direction="row">
        <Button onClick={() => refreshHandler()}>Refresh</Button>
        <ArrayToExcelButton
          apiArray={data}
          fileName={"UserData.xls"}
          buttonTitle={"Export"}
        />
        {loading ? (
          <FileUploadButton />
        ) : (
          <Modal onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalBody> Test </ModalBody>
            </ModalContent>
          </Modal>
        )}
        {/* <FileUploadButton /> */}
      </Stack>
      <Flex
        bg={useColorModeValue("gray.200")}
        justifyContent="center"
        display={{ md: "flex" }}
        overflowX="auto"
      >
        <Box p={12} rounded={6} overflowX="auto">
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
                        <Button colorScheme="teal">Add</Button>
                        <Button>View</Button>
                      </Stack>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </Box>
      </Flex>
    </>
  );
}
