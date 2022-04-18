import {
  AspectRatio,
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  Icon,
  Image,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import AboutSection from "./AboutSection";
import EventsSection from "./EventsSection";
import HeroSection from "./HeroSection";
import LifeGroupSection from "./LifeGroupSection";
import NewHereSection from "./NewHereSection";
const HomeContainer = (props) => {
  const { user } = props;
  const [isOpen, setIsOpen] = useState(true);

  const isMobile = useBreakpointValue({ base: true, lg: false});

  const onClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (Object.keys(user).length !== 0) setIsOpen(false);
  }, []);

  const modalText =
    "With the recent updates regarding Covid-19 restrictions in Hong Kong, we have an update as a church. Click button below to find out more!"

  const covidButtonText = "OUR LATEST COVID-19 POLICY"

  return (
    <Flex direction="column">
      <HeroSection />
      <EventsSection />
      <AboutSection />
      <LifeGroupSection />
      <NewHereSection />
      {/* <Modal isCentered={true} size="3xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent borderRadius="20" bgColor="#FFF7E2">
          <ModalCloseButton />
          <ModalHeader>{"Welcome! Are you new?"}</ModalHeader>
          <ModalBody ml={[0, 16]} mr={[0, 16]}>
            <Box>
              <Text>
                {
                  "We would love to welcome you into our Church family, click here to find out more!"
                }
              </Text>
            </Box>
          </ModalBody>
          <ModalFooter ml={[0, 16]} mr={[0, 16]}>
            <ButtonGroup
              size="md"
              flexDirection={["column", "row"]}
              spacing={[0, 2]}
              w="100%"
              variant="outline"
              colorScheme="gray"
            >
              <Button
                flex={[false, 1]}
                as={Link}
                // target="_blank"
                href="/connect"
                size="sm"
                color="#00000"
                bgColor="#FFD600"
                _hover={{
                  bgColor: "#CFAE00",
                }}
              >
                Yes, I'm new!
              </Button>
              <Button
                flex={[false, 1]}
                mt={[2, 0]}
                onClick={onClose}
                size="sm"
                bgColor="#E5E5E5"
              >
                No, I'm not new
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal> */}
      <Modal isCentered={true} size="6xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent borderRadius="20" bgColor="#FFF7E2">
          <ModalCloseButton size="lg" />
          <Flex
            w="full"
            h={isMobile ? "50vh" : "80vh"}
            bgImage={`url(${
              process.env.PUBLIC_URL + '/images/modal/welcome-back-modal.png'
            })`}
            bgSize="cover"
            bgPosition="center center"
            justify="center"
            borderRadius="20"
          >
            <Container display="flex" justifyContent="center" position="relative">
              <Box
                backgroundColor="white"
                textAlign="center"
                borderRadius="16"
                padding={isMobile ? "3" : "5"}
                position="absolute"
                bottom={isMobile ? "0" : "20"}
                margin="2"
              >
                <Text
                  color="#4C80A5"
                  fontSize={isMobile ? "12" : "16"}
                >
                    {modalText}
                </Text>
                <Button
                  flex={[false, 1]}
                  as={Link}
                  target="_blank"
                  href="https://hongkong.sub.hmcc.net/urgent-announcements/hmcc-covid-19-safety-precautions/"
                  size="sm"
                  color="#FFFFFF"
                  bgColor="#0628A3"
                  _hover={{
                    bgColor: "#0628A3",
                  }}
                  marginTop={isMobile ? "2" : "3"}
                  fontSize={isMobile ? "10" : "12"}
                >
                  {covidButtonText}
                </Button>
              </Box>
            </Container>
          </Flex>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default HomeContainer;
