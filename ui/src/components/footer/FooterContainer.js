import { Box, Stack, StackDivider, HStack } from "@chakra-ui/react";
import { SocialMediaLinks } from "./SocialMediaLinks";
import { Link, SimpleGrid } from "@chakra-ui/react";
import { LinkGrid } from "./LinkGrid";
export default function FooterContainer() {
  return (
    <Box
      as="footer"
      role="contentinfo"
      mx="auto"
      w="7xl"
      py="12"
      bg="#222222"
      color="white"
      marginTop="0px !important"
      px={{
        base: "4",
        md: "8",
      }}
    >
      <Stack spacing="5" divider={<StackDivider />}>
        <center>
          <SocialMediaLinks />
        </center>
        <HStack height="120px" w="100%" bg="#222222"></HStack>
        <Stack
          direction={{
            base: "column",
            lg: "row",
          }}
          spacing={{
            base: "5",
            lg: "28",
          }}
        >
          <Stack
            direction={{
              base: "column",
              md: "row",
            }}
            spacing={{
              base: "10",
              md: "20",
            }}
          >
            <LinkGrid
              spacing={{
                base: "10",
                md: "20",
                lg: "28",
              }}
              flex="1"
            />
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}
