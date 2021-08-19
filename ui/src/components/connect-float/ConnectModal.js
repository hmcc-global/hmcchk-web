import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useCallback, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const ConnectModal = ({ isOpen, onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [notes, setNotes] = useState("");
  const [prayer, setPrayer] = useState("");
  const [isBot, setIsBot] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onCloseCustom = (e) => {
    setIsSubmitted(false);
    onClose(e);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isBot) {
      const payload = {
        name,
        email,
        phoneNumber,
        notes,
        prayer,
      };
      await axios.post("/api/forms/connect-with-us", payload);
      setIsSubmitted(true);
    }
  };

  const renderForm = () => (
    <form onSubmit={onSubmit}>
      <VStack align="stretch" spacing={6}>
        <Heading size="lg" textAlign="center">
          We'd love to connect with you!
        </Heading>
        <VStack align="stretch" spacing={3} px={[0, 24]}>
          <FormControl id="name" isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              backgroundColor="#fff"
              color="#000"
              type="text"
              placeholder="e.g. Chan Tai Man"
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
          <FormControl id="email" isRequired>
            <FormLabel>Preferred Email Address</FormLabel>
            <Input
              backgroundColor="#fff"
              color="#000"
              type="email"
              placeholder="e.g. chantaiman@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl id="phoneNumber">
            <FormLabel>Preferred Phone Number</FormLabel>
            <Input
              backgroundColor="#fff"
              color="#000"
              type="text"
              placeholder="e.g. +85255555555"
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </FormControl>
          <FormControl id="notes">
            <FormLabel>Notes/Comments</FormLabel>
            <Textarea
              backgroundColor="#fff"
              color="#000"
              onChange={(e) => setNotes(e.target.value)}
            />
          </FormControl>
          <FormControl id="prayerRequests">
            <FormLabel>Any Prayer Requests?</FormLabel>
            <Input
              backgroundColor="#fff"
              color="#000"
              type="text"
              onChange={(e) => setPrayer(e.target.value)}
            />
          </FormControl>
        </VStack>
        <Box align="center" pt={2} transform="scale(0.9)">
          <ReCAPTCHA
            sitekey={process.env.REACT_APP_CAPTCHA}
            onChange={() => setIsBot(false)}
          />
        </Box>
        <Center>
          <Button w="9em" variant="outline" type="submit">
            Submit
          </Button>
        </Center>
      </VStack>
    </form>
  );

  const renderFormSubmitted = useCallback(
    () => (
      <VStack align="stretch" textAlign="center" px={16} py={8}>
        <Heading size="xl" fontWeight={700} mb={4}>
          THANK YOU!
        </Heading>
        <Text fontSize="xl" fontWeight={700}>
          We're excited to connect with you
        </Text>
        <Text fontSize="md">
          Someone from our Hospitality team should be reaching out to you
          shortly, stay put!
        </Text>
      </VStack>
    ),
    []
  );

  return (
    <Modal isOpen={isOpen} onClose={onCloseCustom} size="xl">
      <ModalOverlay />
      <ModalContent
        background="linear-gradient(90deg, rgba(6, 40, 163, 0.9) 0%, rgba(145, 219, 240, 0.9) 100%)"
        color="#fff"
      >
        <ModalHeader />
        <ModalCloseButton />
        <ModalBody>
          {isSubmitted ? renderFormSubmitted() : renderForm()}
        </ModalBody>
        <ModalFooter my={1} />
      </ModalContent>
    </Modal>
  );
};

export default ConnectModal;
