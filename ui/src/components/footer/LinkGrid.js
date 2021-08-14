import { Box, Link, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import * as React from "react";
<<<<<<< HEAD

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
          <Link href="https://hongkong.hmcc.net/online/">Church online</Link>
        </Stack>
      </Box>
      <Box>
        <Stack>
          <Text fontWeight="bold">Connect</Text>
          <Link href="https://hongkong.hmcc.net/ministries/campus-ministry/">
            Ministries
          </Link>
          <Link href="https://hongkong.hmcc.net/get-involved/life-group/">
            LIFE Groups
          </Link>
        </Stack>
      </Box>
      <Box>
        <Stack>
          <Text fontWeight="bold">About</Text>
          <Link href="https://hongkong.hmcc.net/about/who-we-are/">
            Who we are
          </Link>
          <Link href="https://hongkong.hmcc.net/about/beliefs/">Beliefs</Link>
          <Link href="https://hongkong.hmcc.net/about/who-we-are/">
            Our Values
          </Link>
          <Link href="https://hongkong.hmcc.net/about/beliefs/">
            Statement of Faith
          </Link>
          <Link href="https://hongkong.hmcc.net/about/bold-vision/">
            Bold Vision
          </Link>
          <Link href="https://hongkong.hmcc.net/about/hmi/">HMI</Link>
        </Stack>
      </Box>

      <Box>
        <Stack>
          <Link href="/events" fontWeight="bold">
            Events
          </Link>
          <Link href="/sermons" fontWeight="bold">
            Sermons
          </Link>
          <Link href="https://hongkong.hmcc.net/give/" fontWeight="bold">
            Give
          </Link>
=======
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
>>>>>>> 0d99933 (recreate from old branch)
        </Stack>
      </Box>
    </SimpleGrid>
  );
}
