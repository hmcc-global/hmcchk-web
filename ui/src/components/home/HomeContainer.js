import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
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

  const onClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (Object.keys(user).length !== 0) setIsOpen(false);
  }, []);

  return (
    <Flex direction="column">
      <HeroSection />
      <EventsSection />
      <AboutSection />
      <LifeGroupSection />
      <NewHereSection />
      <Modal isCentered={true} size="3xl" isOpen={isOpen} onClose={onClose}>
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
      </Modal>
    </Flex>
  );
};

export default HomeContainer;
