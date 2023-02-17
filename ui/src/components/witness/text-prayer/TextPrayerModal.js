import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Image,
  Text,
  VStack,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Textarea,
  Button,
} from '@chakra-ui/react';
import axios from 'axios';
import { useState, useCallback } from 'react';

const TextPrayerModal = ({ isOpen, onClose }) => {
  const [theme, setTheme] = useState('');
  const [testimony, setTestimony] = useState('');
  const [name, setName] = useState('');
  const [lifestage, setLifestage] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onCloseCustom = (e) => {
    setIsSubmitted(false);
    onClose(e);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      theme,
      testimony,
      name,
      lifestage,
      email,
    };
    await axios.post('/api/easter/create', payload);
    setIsSubmitted(true);
  };

  const renderForm = () => (
    <VStack justifyContent="center" mb={5}>
      <Image src={process.env.PUBLIC_URL + '/images/witness/title-color.png'} />
      <Text color="#A25C8D" textStyle="dm_sans_bold">
        How are you witnessing God? Share your testimony with us!
      </Text>
      <form onSubmit={onSubmit}>
        <VStack spacing={3}>
          <FormControl id="theme" isRequired>
            <FormLabel color="#6A5289">
              <b>
                <i>Theme of testimony </i>
              </b>
            </FormLabel>
            <FormHelperText color="#6A5289">
              <i>(e.g. I witnessed God’s ____ through _____)</i>
            </FormHelperText>
            <Textarea
              bg="#F1EDF7"
              _placeholder={{ color: '#6A5289' }}
              type="text"
              placeholder="Describe your testimony in one sentence..."
              onChange={(e) => setTheme(e.target.value)}
            />
          </FormControl>
          <FormControl id="testimony" isRequired>
            <FormLabel color="#6A5289">
              <b>
                <i>Testimony </i>
              </b>
            </FormLabel>
            <Textarea
              bg="#F1EDF7"
              _placeholder={{ color: '#6A5289' }}
              type="text"
              placeholder="Write your testimony here..."
              onChange={(e) => setTestimony(e.target.value)}
            />
          </FormControl>

          <FormControl id="fullName">
            <FormLabel color="#6A5289">
              <b>
                <i>(Optional) Your profile: </i>
              </b>
            </FormLabel>
            <FormHelperText color="#6A5289">
              <i>*You may choose to remain anonymous.</i>
            </FormHelperText>
            <Input
              bg="#F1EDF7"
              _placeholder={{ color: '#6A5289' }}
              type="text"
              placeholder="Name (optional)"
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
          <FormControl id="lifestage">
            <Input
              bg="#F1EDF7"
              _placeholder={{ color: '#6A5289' }}
              type="text"
              placeholder="Campus/Lifestage (optional)"
              onChange={(e) => setLifestage(e.target.value)}
            />
          </FormControl>

          <FormControl id="email">
            <FormHelperText color="#6A5289">
              <i>
                We may invite some people to share their testimonies publicly to
                our church congregation. <br />
                If you are open to this possible invitation, please leave your
                email below for us to contact you.
              </i>
            </FormHelperText>
            <Input
              bg="#F1EDF7"
              _placeholder={{ color: '#6A5289' }}
              type="email"
              placeholder="Email (optional)"
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <Button w="30%" bg="#73539B" color="white" type="submit">
            Submit
          </Button>
        </VStack>
      </form>
    </VStack>
  );

  const renderFormSubmitted = useCallback(
    () => (
      <VStack textAlign="center">
        <Text color="#6A5289">
          <i>
            <b>Thank you for sharing your testimony!</b>
            <br /> Once reviewed, your testimony will be uploaded to the Witness
            page! Stay tuned :)
          </i>
        </Text>
      </VStack>
    ),
    []
  );

  return (
    <Modal isOpen={isOpen} onClose={onCloseCustom} size="lg">
      <ModalOverlay>
        <ModalContent bg="#FBF7FC" maxW={['100vw', '55vw']}>
          <ModalHeader />
          <ModalCloseButton />
          <ModalBody>
            {isSubmitted ? renderFormSubmitted() : renderForm()}
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
};

export default TextPrayerModal;
