import * as React from "react";
import {
  Box,
  Button,
  Heading,
  Text,
  Container,
  Spacer,
  LinkOverlay,
  useDisclosure,
  VStack,
  HStack,
  Divider,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Center,
  Image,
} from "@chakra-ui/react";

function RenderSwitch(param) {
  switch (param.param) {
    case "FPS":
      return (
        <Flex>
          <VStack>
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
          </VStack>
          <Spacer />
          <Image
            src={process.env.PUBLIC_URL + "/giving/FPSQR.png"}
            boxSize="30%"
          />
        </Flex>
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
}

export function GivingCard(cardinfo) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box
      w={["100%", "100%", "32%"]}
      borderRadius="lg"
      bgImage={cardinfo.imageLink}
      bgPosition="center"
      bgSize="cover"
      boxShadow="0px 4px 8px rgba(0, 0, 0, 0.15)"
    >
      <Flex
        borderRadius="lg"
        w="full"
        h="100%"
        justify="center"
        style={{
          backdropFilter: "blur(4px)",
          background: "rgba(0, 0, 0, 0.29)",
        }}
      >
        <Box paddingTop="5vh">
          <VStack spacing="2vh">
            <Center>
              <Heading as="h4" size="lg" color="white">
                {cardinfo.text}
              </Heading>
            </Center>
            <Center>
              <Box w="16vh">
                <Button w="100%" variant="outline" onClick={onOpen}>
                  <Text align="center" color="white">
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
                      <RenderSwitch param={cardinfo.text} />
                    </ModalBody>
                  </ModalContent>
                </Modal>
              </Box>
            </Center>
          </VStack>
        </Box>
      </Flex>
    </Box>
  );
}
export default GivingCard;
