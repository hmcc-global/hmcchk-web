import { useState } from "react";
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
  Th,
  Tbody,
  Td,
  Tr,
} from "@chakra-ui/react";

import SidebarWithHeader from "./navigation/Sidebar";

const smVariant = { navigation: "drawer", navigationButton: true };
const mdVariant = { navigation: "sidebar", navigationButton: false };

export default function AdminGiving() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const variants = useBreakpointValue({ base: smVariant, md: mdVariant });

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const columns = Array.from({ length: 100 });

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
          <Box p={12} rounded={6} overflowX="auto">
            <Heading mb={6} alignItems="center">
              Giving
            </Heading>
            <Table>
              <Thead>
                {columns.map((col, i) => (
                  <Th>{`Th ${i + 1}`}</Th>
                ))}
              </Thead>
              <Tbody>
                <Tr>
                  {columns.map((col, i) => (
                    <Td>{`Td ${i + 1}`}</Td>
                  ))}
                </Tr>
              </Tbody>
            </Table>
          </Box>
        </Flex>
      </SidebarWithHeader>
    </>
  );
}
