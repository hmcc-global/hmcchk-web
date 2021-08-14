import { Box, Link, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import * as React from "react";
import { FooterHeading } from "./FooterHeading";
import { createBreakpoints } from "@chakra-ui/theme-tools";

const breakpoints = createBreakpoints({
  sm: "30em",
  md: "48em",
  lg: "62em",
  xl: "80em",
  "2xl": "96em",
});
export function LinkGrid() {
  return (
    <SimpleGrid columns={[2, 4, 4]} textAlign="left" minW="50%">
      <Box minW="130px">
        <Stack>
          <Text fontWeight="bold">Visit</Text>
          <Link>Church online</Link>
        </Stack>
      </Box>
      <Box minW="130px">
        <Stack>
          <Text fontWeight="bold">Connect</Text>
          <Link>Ministries</Link>
          <Link>LIFE Groups</Link>
        </Stack>
      </Box>
      <Box minW="130px">
        <Stack>
          <Text fontWeight="bold">About</Text>
          <Link>Who we are</Link>
          <Link>Beliefs</Link>
          <Link>Our Values</Link>
          <Link>Statement of Faith</Link>
          <Link>Bold Vision</Link>
          <Link>HMI</Link>
        </Stack>
      </Box>

      <Box minW="130px">
        <Stack>
          <Link fontWeight="bold">Events</Link>
          <Link fontWeight="bold">Sermons</Link>
          <Link fontWeight="bold">Give</Link>
        </Stack>
      </Box>
    </SimpleGrid>
  );
}
