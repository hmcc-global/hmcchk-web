import { Box, Link, SimpleGrid, Stack } from "@chakra-ui/react";
import * as React from "react";
import { FooterHeading } from "./FooterHeading";

export function LinkGrid() {
  return (
    <SimpleGrid columns={5}>
      <Box minW="130px">
        <FooterHeading mb="4">ABOUT</FooterHeading>
        <Stack>
          <Link>Who we are</Link>
          <Link>Beliefs</Link>
          <Link>Staff</Link>
          <Link>BOLD Vision</Link>
          <Link>Harvest Mission International</Link>
        </Stack>
      </Box>
      <Box minW="130px">
        <FooterHeading mb="4">GET INVOLVED</FooterHeading>
        <Stack>
          <Link>Sunday Celebration</Link>
          <Link>Upcoming Events</Link>
          <Link>LIFE Group</Link>
          <Link>Life Stage Ministries</Link>
        </Stack>
      </Box>
      <Box minW="130px">
        <FooterHeading mb="4">SERMONS</FooterHeading>
        <Stack>
          <Link>Recordings</Link>
        </Stack>
      </Box>
      <Box minW="130px">
        <FooterHeading mb="4">GIVE</FooterHeading>
        <Stack>
          <Link>Ways to give</Link>
        </Stack>
      </Box>
      <Box minW="130px">
        <FooterHeading mb="4">VISIT US</FooterHeading>
        <Stack>
          <Link>Get directions here</Link>
          <Link>hongkong@hmcc.net</Link>
          <Link>Feedbacks/Comments</Link>
        </Stack>
      </Box>
    </SimpleGrid>
  );
}
