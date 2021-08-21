import { Box, SimpleGrid, Stack, Link, Text } from "@chakra-ui/react";
import {Link as HashLink} from "react-router-dom";
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
          <Link href="/visit-us">
            <Text fontWeight="bold">Visit</Text>
          </Link>

          <Link
            href="https://hongkong.sub.hmcc.net/online/"
            
          >
            Church online
          </Link>
        </Stack>
      </Box>
      <Box>
        <Stack>
          <Link href="/connect">
            <Text fontWeight="bold">Connect</Text>
          </Link>
          <HashLink to={{pathname:"/connect", hash:"#ministries" }}
          >
            Ministries
          </HashLink>
          <HashLink to={{pathname:"/connect", hash:"#lifegroup" }}>
            <Text>LIFE Groups</Text>
          </HashLink>
        </Stack>
      </Box>
      <Box>
        <Stack>
          <Link href="https://hongkong.sub.hmcc.net/about/who-we-are/">
          <Text fontWeight="bold">About</Text>
          </Link>
          <Link
            href=
               "https://hongkong.sub.hmcc.net/about/who-we-are/"
          
          >
            <Text>Who We Are</Text>
          </Link>
          <Link
            href=
               "https://hongkong.sub.hmcc.net/about/beliefs/"
            
          >
            <Text>Beliefs</Text>
          </Link>
          <Link
            href=
               "https://hongkong.sub.hmcc.net/about/who-we-are/"
            
          >
            <Text>Our Values</Text>
          </Link>
          <Link
            href=
              "https://hongkong.sub.hmcc.net/about/beliefs/"
            
          >
            <Text>Statement of Faith</Text>
          </Link>
          <Link
            href=
              "https://hongkong.sub.hmcc.net/about/bold-vision/"
            
          >
            <Text>Bold Vision</Text>
          </Link>
          <Link
            href=
               "https://hongkong.sub.hmcc.net/about/hmi/"
          >
            <Text>HMI</Text>
          </Link>
        </Stack>
      </Box>

      <Box>
        <Stack>
          <Link href="/events" >
            <Text fontWeight="bold">Events</Text>
          </Link>
          <Link href="https://hongkong.sub.hmcc.net/sermons/" >
            <Text fontWeight="bold">Sermons</Text>
          </Link>
          <Link
            href=  "https://hongkong.sub.hmcc.net/give/" 
            
          >
            <Text fontWeight="bold">Give</Text>
          </Link>
          <Link
            href=  "https://hongkong.sub.hmcc.net/privacy-policy-2/" 
            
          >
            <Text fontWeight="bold">Privacy Policy</Text>
          </Link>
        </Stack>
      </Box>
    </SimpleGrid>
  );
}
