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
  Stack,
} from '@chakra-ui/react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useState } from 'react';
import axios from 'axios';
import BackgroundElements from './BackgroundElements';

const NewHereSection = () => {
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
    <>
      <Flex
        w={'full'}
        h={['110vh', '80vh']}
        justify="center"
        background="#F9F9F9"
        style={{ backdropFilter: 'blur(7px)' }}
      >
        <BackgroundElements />
        <Container
          maxW="container.xl"
          justifyContent="center"
          alignItems="center"
          pt={['55']}
        >
          <Stack
            direction={['column', 'row']}
            color="white"
            justify={'center'}
            alignItems={['left', 'center']}
            spacing={['5', '50']}
          >
            <VStack alignItems={'left'} spacing={0}>
              <Heading fontSize={['2em', '3em']} color="#505050">
                New here?
              </Heading>
              <Heading fontSize={['2em', '3em']} color="#0628A3">
                Connect with us!
              </Heading>
            </VStack>
            <Box
              h={['75vh', '65vh']}
              w={['100%', '35%']}
              borderWidth={'1px'}
              px={5}
              py={[10]}
              bgColor="#F7FAFC"
              boxShadow={'xl'}
              borderRadius={[5, 10]}
            >
              <form onSubmit={onSubmit}>
                <VStack spacing={[3]} alignItems="center">
                  <FormControl id="name" isRequired w={['100%']}>
                    <Input
                      h={'3em'}
                      variant="filled"
                      type="name"
                      placeholder="Name"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </FormControl>
                  <FormControl id="email" isRequired w={['100%']}>
                    <Input
                      h={'3em'}
                      variant="filled"
                      type="email"
                      placeholder="Email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormControl>
                  <FormControl id="phoneNumber" isRequired w={['100%']}>
                    <Input
                      h={'3em'}
                      variant="filled"
                      placeholder="Phone Number"
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </FormControl>
                  <FormControl id="lifestage" isRequired w={['100%']}>
                    <Input
                      h={'3em'}
                      variant="filled"
                      placeholder="Campus/Lifestage"
                      onChange={(e) => setLifestage(e.target.value)}
                    />
                  </FormControl>
                  <FormControl id="notes" isRequired w={['100%']}>
                    <Input
                      h={'3em'}
                      type="notes"
                      placeholder="Notes and remarks"
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
                    bg="#0628A3"
                    variant="filled"
                    color="white"
                    type="submit"
                    width="full"
                    _hover={{
                      borderWidth: '3px',
                      borderColor: '#0628A3',
                      bg: 'white',
                      color: '#0628A3',
                    }}
                  >
                    {'Submit'}
                  </Button>
                  <FormLabel visibility={submitted ? 'visible' : 'hidden'}>
                    Thank you. We will be in touch soon!
                  </FormLabel>
                </VStack>
              </form>
            </Box>
          </Stack>
        </Container>
      </Flex>
    </>
  );
};

export default NewHereSection;
