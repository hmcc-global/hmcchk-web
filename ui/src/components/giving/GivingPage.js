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
      <VStack w="100%" spacing="3vw" py="3vw">
        <Box
          borderRadius="lg"
          bgImage={`url('${process.env.PUBLIC_URL}/giving/Banner.png')`}
          bgPosition="center"
          bgSize="cover"
        >
          <Heading
            as="h1"
            size="4xl"
            align="center"
            paddingTop="1vw"
            color="#319795"
            fontWeight="bold"
          >
            Giving
          </Heading>
          <VStack px="3" py="6">
            <Heading
              as="h4"
              size="lg"
              align="center"
              color="#319795"
              fontWeight="bold"
            >
              God invites us to partner with Him in His ministry!
            </Heading>
            <Text align="center" w="70%" fontWeight="bold">
              Your gift propels us towards our vision and enables our church to
              respond swiftly with obedience to God's calling. We invite you to
              contribute to this vision and play a vital role in what God is
              doing!
            </Text>
          </VStack>
        </Box>
      </VStack>
      <Center>
        <Flex
          h={["100%", "100%", "13em"]}
          direction={["column", "column", "row"]}
          paddingBottom="2"
          minW="100%"
        >
          <Box w={["100%", "100%", "32%"]} h="20%" borderRadius="lg">
            <Heading as="h3" size="xl" paddingBottom="1vw" color="#319795">
              Ways to Give:
            </Heading>
            <Text fontWeight="bold" paddingBottom="1vw">
              There are a few different ways you can give to our church
            </Text>
            <Text color="#319795">
              *When giving, please always use your legal name and provide the
              same email address consistently.
            </Text>
          </Box>
          <Spacer />
          <GivingCard
            text="FPS"
            imageLink={process.env.PUBLIC_URL + "/giving/FPS.png"}
          />
          <Spacer />
          <GivingCard
            text="Bank Transfer"
            imageLink={process.env.PUBLIC_URL + "/giving/Transfer.png"}
          />
        </Flex>
      </Center>

      <Center paddingTop="1vw">
        <Flex
          direction={["column", "column", "row"]}
          minW="100%"
          h={["100%", "100%", "13em"]}
        >
          <GivingCard
            text="Cash"
            imageLink={process.env.PUBLIC_URL + "/giving/Cash.png"}
          />
          <Spacer />
          <GivingCard
            text="Online Giving"
            imageLink={process.env.PUBLIC_URL + "/giving/Online.png"}
          />
          <Spacer />
          <GivingCard
            text="Cheque"
            imageLink={process.env.PUBLIC_URL + "/giving/Cheque.png"}
          />
        </Flex>
      </Center>
      <Box paddingBottom="10vh">
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
