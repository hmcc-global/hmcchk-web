import { SocialMediaLinks } from "./SocialMediaLinks";
import {
  Link,
  SimpleGrid,
  Image,
  Text,
  VStack,
  Center,
  Button,
  Flex,
  Spacer,
  Divider,
  Box,
} from "@chakra-ui/react";
import { Copyright } from "./Copyright";
import { LinkGrid } from "./LinkGrid";
import { SoapAppDownloadButton } from "./SoapDownloadButton";
import { ChurchAppDownloadButton } from "./ChurchAppDownloadButton";
import { createBreakpoints } from "@chakra-ui/theme-tools";

const breakpoints = createBreakpoints({
  sm: "30em",
  md: "48em",
  lg: "62em",
  xl: "80em",
  "2xl": "96em",
});
export default function FooterContainer() {
  return (
    <Box
      as="footer"
      role="contentinfo"
      mx="auto"
      w="100%"
      py="12"
      bg="#222222"
      color="white"
      px={{
        base: "4",
        md: "8",
      }}
    >
      <Flex
        direction={["column", "column", "row"]}
        w={("80%", "80%", "100%")}
        spacing="10"
      >
        <VStack spacing="10">
          <Link href="/">
            <Image h="4vh" src=".\hmcc-logo.svg" alt="Logo of HMCC" />
          </Link>
          <Button
            colorScheme="teal"
            variant="outline"
            _hover={{ bg: "teal.600" }}
          >
            <Text color="white">Today's BRP: Isaiah 56-61</Text>
          </Button>
          <Text fontWeight="bold">
            Harvest Mission Community Church(Hong Kong)
          </Text>
          <ChurchAppDownloadButton />
          <SoapAppDownloadButton />
        </VStack>
        <Spacer />
        <Box minH="10"></Box>
        <Spacer />
        <VStack spacing="10">
          <LinkGrid />
          <Divider w={["100%", "100%", "0%"]} />
          <Box minW="100%">
            <Text>Contact Us</Text>
            <Text fontWeight="bold">hongkong@hmcc.net</Text>
          </Box>
          <Box minW="100%">
            <SocialMediaLinks />
          </Box>
        </VStack>
      </Flex>
      <Center padding="10">
        <Copyright />
      </Center>
    </Box>
  );
}
