import { Flex, Heading } from "@chakra-ui/react";

import { useColorModeValue } from "../../components/ui/color-mode";

export default function App(props) {
  return (
    <>
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
    </>
  );
}
