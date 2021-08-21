import { Box, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import * as React from "react";
import { HashLink as Link } from "react-router-hash-link";

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
            to={{
              pathname: "https://hongkong.sub.hmcc.net/online/",
            }}
            target="_blank"
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
            to={{
              pathname:
                "https://hongkong.sub.hmcc.net/ministries/campus-ministry/",
            }}
            target="_blank"
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
            to={{
              pathname: "https://hongkong.sub.hmcc.net/about/who-we-are/",
            }}
            target="_blank"
          >
            <Text>Who We Are</Text>
          </Link>
          <Link
            to={{
              pathname: "https://hongkong.sub.hmcc.net/about/beliefs/",
            }}
            target="_blank"
          >
            <Text>Beliefs</Text>
          </Link>
          <Link
            to={{
              pathname: "https://hongkong.sub.hmcc.net/about/who-we-are/",
            }}
            target="_blank"
          >
            <Text>Our Values</Text>
          </Link>
          <Link
            to={{
              pathname: "https://hongkong.sub.hmcc.net/about/who-we-are/",
            }}
            target="_blank"
          >
            <Text>Statement of Faith</Text>
          </Link>
          <Link
            to={{
              pathname: "https://hongkong.sub.hmcc.net/about/bold-vision/",
            }}
            target="_blank"
          >
            <Text>Bold Vision</Text>
          </Link>
          <Link
            to={{
              pathname: "https://hongkong.sub.hmcc.net/about/hmi/",
            }}
            target="_blank"
          >
            <Text>HMI</Text>
          </Link>
        </Stack>
      </Box>

      <Box>
        <Stack>
          <Link to="/events" target="_blank">
            <Text fontWeight="bold">Events</Text>
          </Link>
          <Link to="/sermons" target="_blank">
            <Text fontWeight="bold">Sermons</Text>
          </Link>
          <Link
            to={{ pathname: "https://hongkong.sub.hmcc.net/give/" }}
            target="_blank"
          >
            <Text fontWeight="bold">Give</Text>
          </Link>
        </Stack>
      </Box>
    </SimpleGrid>
  );
}
