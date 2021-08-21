import { Box, SimpleGrid, Stack, Link, Text } from "@chakra-ui/react";
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
          <Link to="/visit-us">
            <Text fontWeight="bold">Visit</Text>
          </Link>

          <Link
            href=
               "https://hongkong.sub.hmcc.net/online/"
            
          >
            Church online
          </Link>
        </Stack>
      </Box>
      <Box>
        <Stack>
          <Link to="/connect">
            <Text fontWeight="bold">Connect</Text>
          </Link>
          <Link
            href=
                "https://hongkong.sub.hmcc.net/ministries/campus-ministry/"
            
          >
            Ministries
          </Link>
          <Link to="/connect#lifegroup">
            <Text>LIFE Groups</Text>
          </Link>
        </Stack>
      </Box>
      <Box>
        <Stack>
          <Text fontWeight="bold">About</Text>
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
               "https://hongkong.sub.hmcc.net/about/who-we-are/"
            
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
          <Link to="/events" >
            <Text fontWeight="bold">Events</Text>
          </Link>
          <Link to="/sermons" >
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
