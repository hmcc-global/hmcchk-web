import { Flex, Heading, useColorModeValue } from "@chakra-ui/react";
import InvoicesTable from "./InvoicesTable";
import InvoiceCreator from "./InvoiceCreator";
import { Button } from "@chakra-ui/button";

export default function App(props) {
  return (
    <>
      <Flex justifyContent="center">
        <Flex direction="column" p={12} rounded={6}>
          <Heading mb={6} alignItems="center">
            Invoice
          </Heading>
          <InvoiceCreator />
          <Button colorScheme="teal" mb={3}>
            Create
          </Button>
          <InvoicesTable />
        </Flex>
      </Flex>
    </>
  );
}
