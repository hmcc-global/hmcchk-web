import React from 'react';
import { customAxios as axios } from '../../helpers/customAxios';
import { useEffect, useState } from 'react';
import {
  Button,
  Flex,
  Box,
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
  Select,
} from '@chakra-ui/react';

import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { useTable, useSortBy } from 'react-table';
import ViewUser from './ViewUserComponent';
import EditUser from './EditUserComponent';
import DeleteUser from './DeleteUserComponent';
import ArrayToExcelButton from '../ArrayToExcelButton';

export default function AdminUser(props) {
  const [user, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  const getData = async () => {
    try {
      const { data } = await axios.get('/api/users/get');
      setUsers(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast({
        title: 'Something went wrong.',
        description: 'Try again.',
        status: 'error',
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

  const resetUsers = async (value) => {
    console.log('hai freind');
    try {
      const { data } = await axios.post('/api/users/reset', {
        field: value,
      });
      setUsers(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast({
        title: 'Something went wrong.',
        description: 'Try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const data = user;

  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'fullName',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Campus/Life Stage',
        accessor: 'lifestage',
      },
      {
        Header: 'Phone Number',
        accessor: 'phoneNumber',
      },
      {
        Header: 'Country of Origin',
        accessor: 'countryOfOrigin',
      },
      {
        Header: 'LIFE Group',
        accessor: 'lifeGroup',
      },
    ],
    []
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  const getInitialValue = () => {
    const value = null;
    return value;
  };
  const [value, setValue] = useState(getInitialValue);
  const handleChange = (e) => {
    setValue(e.target.value);
    console.log(e.target.value);
    resetUsers(e.target.value);
  };

  return (
    <>
      <Stack mb={3} direction="row">
        <Button onClick={() => refreshHandler()}>Refresh</Button>
        {loading ? (
          <Button> Export </Button>
        ) : (
          <ArrayToExcelButton
            apiArray={data}
            fileName={'UserData.xls'}
            buttonTitle={'Export'}
          />
        )}
        {/* reset users */}
        <Select
          placeholder="Reset"
          width="18%"
          icon={<TriangleDownIcon />}
          variant="filled"
          value={value}
          onChange={handleChange}
        >
          <option value="address">Address</option>
          <option value="countryOfOrigin">Country of Origin</option>
          <option value="birthday">Birthday</option>
          <option value="campus">Campus</option>
          <option value="ministryTeam">Ministry Team</option>
          <option value="lifestage">Lifestage</option>
          <option value="phoneNumber">Phone Number</option>
          <option value="lifeGroup">LIFE Group</option>
        </Select>
      </Stack>
      <Flex
        bg={useColorModeValue('gray.200')}
        justifyContent="center"
        display={{ md: 'flex' }}
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
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      isNumeric={column.isNumeric}
                    >
                      {column.render('Header')}
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
                        {cell.render('Cell')}
                      </Td>
                    ))}
                    <Td>
                      <Stack spacing={2} direction="row" align="center">
                        <ViewUser data={data} row={row.id} />
                        <EditUser
                          data={data}
                          row={row.id}
                          refreshCallback={refreshHandler}
                        />
                        <DeleteUser
                          data={data}
                          row={row.id}
                          refreshCallback={refreshHandler}
                        />
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
