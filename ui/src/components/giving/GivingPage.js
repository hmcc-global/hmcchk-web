import {
  AspectRatio,
  Box,
  Center,
  Container,
  Flex,
  Stack,
  Heading,
  Icon,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Link,
  LinkBox,
  LinkOverlay,
  Divider,
  Image,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import GivingCard from "./GivingCard.js";
const GivingPage = (props) => {
  return (
    <Container maxW="container.lg">
      <VStack w="100%" spacing="3vw">
        <Box>
          <Heading as="h1" size="4xl" paddingTop="4vw">
            Giving
          </Heading>
        </Box>
        <Flex direction={["column", "column", "row"]}>
          <Image
            minW="50%"
            src={process.env.PUBLIC_URL + "/giving/GivingStock.png"}
          />

          <VStack px="3" py="6">
            <Heading as="h4" size="lg" align="center">
              God invites us to partner with Him in His ministry!
            </Heading>
            <Text align="center">
              Your gift propels us towards our vision and enables our church to
              respond swiftly with obedience to God's calling. We invite you to
              contribute to this vision and play a vital role in what God is
              doing!
            </Text>
          </VStack>
        </Flex>
        <Box py="2vw">
          <Heading as="h2" size="2xl" align="center" paddingBottom="2vw">
            Ways to Give
          </Heading>
          <Center>
            <Text align="center" maxW="80%">
              When giving, please always use your legal name and provide the
              same email address consistently. There are a few different ways
              you can give to our church
            </Text>
          </Center>
        </Box>
      </VStack>
      <Center>
        <Stack
          direction={["column", "column", "row"]}
          maxW="99%"
          minW="80%"
          paddingBottom="2"
        >
          <GivingCard
            text="FPS"
            imageLink={process.env.PUBLIC_URL + "/giving/GivingFPS.png"}
          />

          <GivingCard
            text="Bank Transfer"
            imageLink={process.env.PUBLIC_URL + "/giving/GivingTransfer.png"}
          />

          <GivingCard
            text="Cash"
            imageLink={process.env.PUBLIC_URL + "/giving/GivingCash.png"}
          />
        </Stack>
      </Center>

      <Center>
        <Stack direction={["column", "column", "row"]} maxW="90%" minW="80%">
          <GivingCard
            text="Online Giving"
            imageLink={process.env.PUBLIC_URL + "/giving/GivingOnline.png"}
          />

          <GivingCard
            text="Check"
            imageLink={process.env.PUBLIC_URL + "/giving/GivingCheck.png"}
          />
        </Stack>
      </Center>
      <Box>
        <Center>
          <Heading as="h1" size="3xl" py="4vw">
            Frequently Asked Question
          </Heading>
        </Center>
        <Accordion allowMultiple>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  <Heading as="h4" size="md" py="4">
                    Question1
                  </Heading>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  <Heading as="h4" size="md" py="4">
                    Question2
                  </Heading>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
    </Container>
  );
};
export default GivingPage;
