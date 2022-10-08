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
import { useState } from 'react';

const TextTestimonyModal = ({ isOpen, onClose }) => {
  const [theme, setTheme] = useState('');
  const [testimony, setTestimony] = useState('');
  const [name, setName] = useState('');
  const [lifestage, setLifestage] = useState('');
  const [email, setEmail] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      theme,
      testimony,
      name,
      lifestage,
      email,
    };
    const res = await axios.post('/api/testimony/create', payload);
    console.log(res);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay>
        <ModalContent bg="#FBF7FC" maxW={['100vw', '80vw']}>
          <ModalHeader />
          <ModalCloseButton />
          <ModalBody>
            <VStack justifyContent="center" mb={5}>
              <Image
                src={process.env.PUBLIC_URL + '/images/witness/title-color.png'}
              />
              <Text color="#A25C8D" textStyle="dm_sans_bold">
                How are you witnessing God? Share your testimony with us!
              </Text>
            </VStack>
            <form onSubmit={onSubmit}>
              <VStack spacing={3}>
                <FormControl id="theme" isRequired>
                  <FormLabel color="#6A5289">
                    <b>
                      <i>Theme of testimony </i>
                    </b>
                  </FormLabel>
                  <FormHelperText color="#6A5289">
                    <i>(e.g. I witness God’s ____ through _____)</i>
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
                    <i>*You may choose to remain annonymous.</i>
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
                      We may invite some people to share their testimonies
                      publicly to our church congregation. <br />
                      If you are open to this possible invitation, ple ase leave
                      your email below for us to contact you.
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
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
};

export default TextTestimonyModal;
