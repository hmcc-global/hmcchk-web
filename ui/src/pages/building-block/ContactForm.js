import { Box, Button, Input, VStack, Text, Field, Dialog, Portal } from '@chakra-ui/react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useState } from 'react';
import axios from 'axios';

const ContactForm = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [notes, setNotes] = useState('');
  const [isBot, setIsBot] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const lifestage = 'Building Block';

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
    setNotes('');
    setPhoneNumber('');
    setIsBot(true);
    setSubmitted(false);
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={e => {
      if (!e.open) {
        onClose();
      }
    }}>
      <Portal>

        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content pt={10}>
            <Dialog.CloseTrigger />
            <Dialog.Body>
              <form onSubmit={onSubmit}>
                <VStack h="100%" justify-content="space-between">
                  <Field.Root id="name" required w={['100%']}>
                    <Input
                      h={'3em'}
                      variant="filled"
                      type="name"
                      placeholder="Name"
                      color="black"
                      onValueChange={(e) => setName(e.target.value)}
                    />
                  </Field.Root>
                  <Field.Root id="email" required w={['100%']}>
                    <Input
                      h={'3em'}
                      variant="filled"
                      type="email"
                      placeholder="Email"
                      color="black"
                      onValueChange={(e) => setEmail(e.target.value)}
                    />
                  </Field.Root>
                  <Field.Root id="phoneNumber" required w={['100%']}>
                    <Input
                      h={'3em'}
                      variant="filled"
                      placeholder="Phone Number"
                      color="black"
                      onValueChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </Field.Root>
                  <Field.Root id="notes" required w={['100%']}>
                    <Input
                      h={'6em'}
                      type="notes"
                      placeholder="Notes and remarks"
                      color="black"
                      variant="filled"
                      onValueChange={(e) => setNotes(e.target.value)}
                      _autofill={{
                        background: 'rgba(0,0,0,0)',
                      }}
                    />
                  </Field.Root>
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
                  <Field.Label visibility={submitted ? 'visible' : 'hidden'}>
                    Thank you. We will be in touch soon!
                  </Field.Label>
                </VStack>
              </form>
            </Dialog.Body>
            <Dialog.Footer></Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>

      </Portal>
    </Dialog.Root>
  );
};

export default ContactForm;
