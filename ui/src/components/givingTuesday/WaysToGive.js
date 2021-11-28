import * as React from "react";
import {
  Box,
  Button,
  Heading,
  Text,
  Link,
  Spacer,
  useDisclosure,
  VStack,
  Flex,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Center,
  Image,
  ModalFooter,
} from "@chakra-ui/react";

const RenderSwitch = (param) => {
  switch (param.ModalSelection) {
    case "FPS":
      return (
        <Flex direction={["column", "column", "row"]}>
          <Stack>
            <Text fontWeight="bold">
              Open your mobile banking FPS interface and scan the QR code OR
              input the FPS identifier.
            </Text>
            <Box>
              <Text fontWeight="bold">
                Name: HARVEST MISSION COMMUNITY CHURCH
              </Text>
              <Text fontWeight="bold">FPS ID: 167534304</Text>
            </Box>
          </Stack>
          <Spacer />

          <Image
            margin="auto"
            src={process.env.PUBLIC_URL + "/images/givingTuesday/FPSQR.png"}
            boxSize={["70%", "70%", "30%"]}
          />
        </Flex>
      );
    case "Online Giving":
      return (
        <Box>
          <Text fontWeight="bold">
            Kindly note that a portion of your giving will be deducted for
            online credit card transactions (3.5% + HKD $2.35 processing fee).
            If you wish for 100% of your contribution to go towards our church’s
            ministry work, please consider selecting “cover fees” on the giving
            site or give via cash or check.
          </Text>
          <Text fontWeight="bold">
            Click{" "}
            <Link
              style={{
                textDecoration: "underline",
              }}
              href="https://tithe.ly/give_new/www/#/tithely/give-one-time/645349"
              color="#319795"
            >
              here
            </Link>{" "}
            to proceed with online credit card giving
          </Text>
        </Box>
      );
    case "Bank Transfer":
      return (
        <VStack spacing="3vh">
          <Box>
            <Text fontWeight="bold">
              You may use the following information:
            </Text>
            <Text fontWeight="bold">
              Bank Name: China Construction Bank (Asia) Corporation Limited
            </Text>
            <Text fontWeight="bold">Bank Code: 009</Text>
            <Text fontWeight="bold">Branch Code: 845</Text>
            <Text fontWeight="bold">
              Account Name: Harvest Mission Community Church (Hong Kong)
            </Text>
            <Text fontWeight="bold">Limited Account Number: 13012090</Text>
            <Text fontWeight="bold">
              Transfer Remarks: Please indicate the giving type (Weekly
              Offering, Tithe, HMI, or Other) and write down the giving date
              (e.g. Weekly Offering 2019-11-03)
            </Text>
          </Box>

          <Text fontWeight="bold">
            If our account name is too long and exceeds the number of permitted
            characters, you may shorten it as “Harvest Mission Community Church
            HK”.
          </Text>
          <Text fontWeight="bold">
            Please email a copy of your transfer receipt along with your Full
            Name within 2 weeks to stewardship@hongkong.hmcc.net.
          </Text>
        </VStack>
      );
    default:
      return "not detected";
  }
};

const GivingCard = (cardinfo) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box
      w={["100%", "100%", "32%"]}
      borderRadius="3xl"
      my={["0", "0", "0"]}
      bgImage={cardinfo.imageLink}
      bgPosition="center"
      bgSize="cover"
      boxShadow="0px 4px 8px rgba(0, 0, 0, 0.15)"
    >
      <Flex
        borderRadius="3xl"
        w="full"
        h="100%"
        justify="center"
        style={{
          backdropFilter: "blur(4px)",
          background: "rgba(0, 0, 0, 0.29)",
        }}
      >
        <Box
          py={["3vh", "3vh", "10vh"]}
          px={[1, 0]}
          minH={["10vh", "20vh"]}
          minW="90%"
          justifyContent="center"
          textAlign="center"
          verticalAlign="middle"
        >
          <Flex direction={["row", "row", "column"]}>
            <Center>
              <Heading
                as="h2"
                fontSize={["lg", "xl", "3xl"]}
                color="white"
                fontWeight="900"
              >
                {cardinfo.text}
              </Heading>
            </Center>
            <Spacer />
            <Center>
              <Box w="80%" float={["right", "center"]}>
                <Button
                  w="100%"
                  size="sm"
                  variant="outline"
                  onClick={onOpen}
                  borderRadius="xl"
                >
                  <Text
                    align="center"
                    fontSize={["xs", "sm", "sm"]}
                    fontWeight="700"
                    color="white"
                    pl={5}
                    pr={5}
                  >
                    Learn More
                  </Text>
                </Button>
                <Modal isOpen={isOpen} size={"xl"} onClose={onClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>
                      <Heading as="h2" size="xl" fontWeight="bold">
                        {cardinfo.text}
                      </Heading>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <RenderSwitch ModalSelection={cardinfo.text} />
                    </ModalBody>
                    <ModalFooter></ModalFooter>
                  </ModalContent>
                </Modal>
              </Box>
            </Center>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

const WaysToGive = (props) => {
  const { accentColor } = props;
  return (
    <Stack spacing={5} direction="column">
      <Box pt={[2, 2]} textAlign="center">
        <Text
          color={accentColor}
          fontWeight="800"
          fontSize={["1.4rem", "1.875rem"]}
        >
          Ways To Give
        </Text>
        <Text
          color={accentColor}
          fontWeight="700"
          fontSize={["0.8rem", "1.25rem"]}
        >
          There are a few different ways you can give to our church.
        </Text>
        <Text fontSize={["0.7rem", "md"]}>
          <i>
            *When giving, please always use your legal name and provide the same
            email address consistently.
          </i>
        </Text>
      </Box>
      <Stack direction={["column", "row"]} spacing={[1, 4]}>
        <GivingCard
          text="FPS"
          imageLink={process.env.PUBLIC_URL + "/images/givingTuesday/FPS.png"}
        />
        <GivingCard
          text="Online Giving"
          imageLink={
            process.env.PUBLIC_URL + "/images/givingTuesday/Online.png"
          }
        />
        <GivingCard
          text="Bank Transfer"
          imageLink={
            process.env.PUBLIC_URL + "/images/givingTuesday/Transfer.png"
          }
        />
      </Stack>
      <Box fontSize={["0.7rem", "md"]}>
        Personal information is kept confidential, used only for tax receipt
        purposes, and is only accessible by the Stewardship Team. If you have
        any questions, please do not hesitate to contact us:{" "}
        <b>
          <a href="mailto:stewardship@hongkong.hmcc.net">
            stewardship@hongkong.hmcc.net
          </a>
        </b>
      </Box>
    </Stack>
  );
};

export default WaysToGive;
