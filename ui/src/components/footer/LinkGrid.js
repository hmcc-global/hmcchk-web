import { Box, Link, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import * as React from "react";

export function LinkGrid() {
  return (
    <SimpleGrid
      columns={[2, 2, 4]}
      textAlign="left"
      minW="50%"
      spacing={["2vh", "2vh", "2vw"]}
    >
      <Box>
        <Stack>
          <Text fontWeight="bold">Visit</Text>
          <Link>Church online</Link>
        </Stack>
      </Box>
      <Box>
        <Stack>
          <Text fontWeight="bold">Connect</Text>
          <Link>Ministries</Link>
          <Link>LIFE Groups</Link>
        </Stack>
      </Box>
      <Box>
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

      <Box>
        <Stack>
          <Link fontWeight="bold">Events</Link>
          <Link fontWeight="bold">Sermons</Link>
          <Link fontWeight="bold">Give</Link>
        </Stack>
      </Box>
    </SimpleGrid>
  );
}
