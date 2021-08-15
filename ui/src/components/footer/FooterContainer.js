import { SocialMediaLinks } from "./SocialMediaLinks";
import {
  Link,
  Container,
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
    >
      <Container maxW="container.xl">
        <Flex
          direction={["column", "column", "row"]}
          w={("80%", "80%", "100%")}
          spacing="10"
        >
          <VStack spacing="10">
            <Link href="/">
              <Image
                h="4vh"
                src={process.env.PUBLIC_URL + "/ripple.svg"}
                alt="Logo of HMCC"
              />
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

          <Box minH={["10", "10", "0"]}></Box>
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
      </Container>
      <Center padding="10">
        <Copyright />
      </Center>
    </Box>
  );
}
