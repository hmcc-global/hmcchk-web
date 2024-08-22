import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
  Modal,
  ModalOverlay,
  Text,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Stack,
} from '@chakra-ui/react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useState } from 'react';
import axios from 'axios';

const NewHereForm = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [lifestage, setLifestage] = useState('');
  const [notes, setNotes] = useState('');
  const [isBot, setIsBot] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const onChange = (value) => {
    setIsBot(false);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!isBot) {
      await axios.post('/api/forms/connect-with-us', {
        name: name,
        email: email,
        notes: notes,
        phoneNumber: phoneNumber,
        lifestage: lifestage,
      });
      setSubmitted(true);
      setTimeout(() => {
        resetForm();
      }, 2000);
      return;
    }
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setPhoneNumber('');
    setLifestage('');
    setNotes('');
    setPhoneNumber('');
    setLifestage('');
    setIsBot(true);
    setSubmitted(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text
            color="#3864EB"
            fontSize="42"
            fontFamily="DMSerifDisplay_Italic"
            fontWeight="400"
          >
            Connect with Us
          </Text>
          <Text
            color="#0B0F19"
            fontSize="20"
            fontFamily="Manrope"
            fontWeight="500"
          >
            Fill in the form and we can contact & connect you to our church
            community!
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={onSubmit}>
            <VStack h="100%" justify-content="space-between">
              <FormControl id="name" isRequired w={['100%']}>
                <Input
                  h={'3em'}
                  variant="filled"
                  type="name"
                  placeholder="Name"
                  color="black"
                  onChange={(e) => setName(e.target.value)}
                />
              </FormControl>
              <FormControl id="email" isRequired w={['100%']}>
                <Input
                  h={'3em'}
                  variant="filled"
                  type="email"
                  placeholder="Email"
                  color="black"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl id="phoneNumber" isRequired w={['100%']}>
                <Input
                  h={'3em'}
                  variant="filled"
                  placeholder="Phone Number"
                  color="black"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </FormControl>
              <FormControl id="lifestage" isRequired w={['100%']}>
                <Input
                  h={'3em'}
                  variant="filled"
                  placeholder="Campus/Lifestage"
                  color="black"
                  onChange={(e) => setLifestage(e.target.value)}
                />
              </FormControl>
              <FormControl id="notes" isRequired w={['100%']}>
                <Input
                  h={'6em'}
                  type="notes"
                  placeholder="Notes and remarks"
                  color="black"
                  variant="filled"
                  onChange={(e) => setNotes(e.target.value)}
                  _autofill={{
                    background: 'rgba(0,0,0,0)',
                  }}
                />
              </FormControl>
              <Box pb={[0, 3]} transform={['scale(0.77)', 'scale(1)']}>
                <ReCAPTCHA
                  sitekey={process.env.REACT_APP_CAPTCHA}
                  onChange={onChange}
                />
              </Box>
              <Button
                h={'3em'}
                bg="white"
                type="submit"
                borderColor="#3864EB"
                color="#3864EB"
                borderWidth="1px"
                variant="outline"
                borderRadius="62"
                width="full"
                _hover={{
                  bg: '#3864EB',
                  color: 'white',
                }}
              >
                <Text fontSize="20" fontweight="700" fontFamily="Manrope">
                  Submit
                </Text>
              </Button>
              <FormLabel visibility={submitted ? 'visible' : 'hidden'}>
                Thank you. We will be in touch soon!
              </FormLabel>
            </VStack>
          </form>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NewHereForm;
