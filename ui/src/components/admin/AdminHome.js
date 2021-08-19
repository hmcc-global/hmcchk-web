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
} from "@chakra-ui/react";

import SidebarWithHeader from "./navigation/Sidebar";

const smVariant = { navigation: "drawer", navigationButton: true };
const mdVariant = { navigation: "sidebar", navigationButton: false };

export default function App(props) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const variants = useBreakpointValue({ base: smVariant, md: mdVariant });

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <>
      <SidebarWithHeader
        {...props}
        variant={variants?.navigation}
        isOpen={isSidebarOpen}
        onClose={toggleSidebar}
      >
        <Flex
          height="85vh"
          bg={useColorModeValue("gray.200")}
          justifyContent="center"
        >
          <Flex direction="column" p={12} rounded={6}>
            <Heading mb={6} alignItems="center">
              HMCC-HK Admin
            </Heading>
          </Flex>
        </Flex>
      </SidebarWithHeader>
    </>
  );
}
