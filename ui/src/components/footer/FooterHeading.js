import * as React from "react";
import { Heading, useColorModeValue } from "@chakra-ui/react";
export function FooterHeading() {
  return (
    <Heading
      as="h4"
      color={useColorModeValue("gray.600", "gray.400")}
      fontSize="sm"
      fontWeight="semibold"
      textTransform="uppercase"
      letterSpacing="wider"
    />
  );
}
