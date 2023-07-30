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
        justify="center"
        justifyContent={'space-between'}
        background="#EEF7FF"
        style={{ backdropFilter: 'blur(7px)' }}
      >
        <Container
          maxW="container.xl"
          justifyContent="center"
          alignItems="center"
          py={['55']}
        >
          <Stack
            direction={['column', 'row']}
            color="white"
            justify={'center'}
            alignItems={['left', 'center']}
            spacing={['5', '50']}
            mx={[6, 0]}
          >
            <VStack alignItems={'left'} spacing={0} w={['100%', '30%']}>
              <Heading
                fontSize={['1.875em', '4xl']}
                color="#505050"
                fontWeight="bold"
                fontFamily="Inter"
              >
                New here?
              </Heading>
              <Heading
                fontSize={['1.875em', '4xl']}
                color="#0628A3"
                fontWeight="bold"
                fontFamily="Inter"
              >
                Connect with us!
              </Heading>
            </VStack>
            <Box
              h={['75vh', '65vh']}
              w={['100%', '40%']}
              borderWidth={'1px'}
              px={7}
              pt={7}
              bgColor="#F7FAFC"
              boxShadow={'xl'}
              style={{ height: '100%' }}
              borderRadius={[5, 10]}
            >
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
                      h={'3em'}
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
