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
            fontSize={["5xl", "5xl", "6xl"]}
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
              fontSize={["md", "md", "lg"]}
              align="center"
              color="#319795"
              fontWeight="bold"
            >
              At HMCC, we believe that when God gives someone a vision, He will
              always provide for that vision.
            </Heading>

            <Text align="center" fontSize={["sm", "md", "md"]}>
              {" "}
              <Text fontWeight="bold">
                God invites us to partner with Him in His ministry of making
                disciples and transforming the world.
              </Text>
              Our financial giving—whether it is regular tithes or additional
              gifts—is not only an expression of thankfulness and worship unto
              God, but also an act of faith that God will provide and equip His
              church for His mission.
            </Text>

            <Text align="center" fontSize={["sm", "md", "md"]}>
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
            <Text as="i" color="#319795">
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
      <Box paddingTop="2vh">
        <Text as="i">
          Personal information is kept confidential, used only for tax receipt
          purposes, and is only accessible by the Stewardship Team.
        </Text>
      </Box>
      <Box paddingTop="2vh">
        <Text as="i">
          If you have any questions, please do not hesitate to contact us:&nbsp;
        </Text>
        <Text as="i" fontWeight="bold" inline>
          stewardship@hongkong.hmcc.net
        </Text>
      </Box>
      <Box paddingBottom="10vh">
        <Box display={{ base: "none", lg: "block" }}>
          <Heading as="h1" fontSize={["5xl", "5xl", "6xl"]} py="4vw" px="1vh">
            Frequently Asked Question
          </Heading>
        </Box>
        <Box display={{ base: "block", lg: "none" }}>
          <Heading as="h1" fontSize={["5xl", "5xl", "6xl"]} py="4vw" px="1vh">
            FAQs
          </Heading>
        </Box>

        <Accordion allowMultiple>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  <Heading as="h4" size="md" py="4" minw="100%">
                    How does registration work?
                  </Heading>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              Pre-registrations for Sunday Celebration will open Mondays at 8
              PM, and you can register by clicking on the “Sign Up for In-person
              Sunday Celebration” button above and submitting the form. You
              should receive an email confirmation shortly notifying you of a
              successful / wait-listed registration.
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  <Heading as="h4" size="md" py="4">
                    What do I wear to church?
                  </Heading>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              No dress code in particular! However, we would suggest bringing a
              light/thin jacket in case you get cold in our venue.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  <Heading as="h4" size="md" py="4">
                    COVID-19 guidelines
                  </Heading>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              In light of current Covid-related exemption for religious
              gatherings, we would need to facilitate Sunday Celebrations on a
              pre-registration basis to ensure that we are abiding by
              regulations set by the Prevention and Control of Disease
              Ordinance, and ensure that everyone coming in-person will feel
              safe.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  <Heading as="h4" size="md" py="4">
                    Weather Guidelines
                  </Heading>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              T9 or T10 signals hoisted by the Hong Kong Observatory: Our
              in-person gatherings will be postponed or canceled. Note that if
              the signal is lowered to T8 before or at 8:30AM on Sunday morning,
              we still have Sunday Celebration at 10AM as scheduled. Please
              check our website or social media accounts for updates regarding
              the latest information or online sermons. T8 signal hoisted by the
              Hong Kong Observatory: We highly value both personal safety as
              well as meeting together as the body of Christ on a consistent
              basis. Therefore, if you are able to come safely, we will still
              have our gatherings as scheduled.
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
    </Container>
  );
};
export default GivingPage;
