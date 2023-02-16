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
  Radio,
} from '@chakra-ui/react';
import axios from 'axios';
import { useState, useCallback } from 'react';

export const prayerTopics = [
  {
    index: 0,
    text: 'Joy in the journey',
  },
  {
    index: 1,
    text: 'Evangelize the Circle',
  },
  {
    index: 2,
    text: 'Serve our City and Campus',
  },
  {
    index: 3,
    text: 'Understand the Gospel',
  },
  {
    index: 4,
    text: 'Send People Out',
  },
];

export const getPrayerTopic = (idx) => {
  return prayerTopics.find((e) => e.index === idx).text;
};

const EasterPrayerModal = ({ isOpen, onClose }) => {
  const [topic, setTopic] = useState(0);
  const [prayer, setPrayer] = useState('');
  const [fullName, setFullName] = useState('');
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
      topic,
      prayer,
      fullName,
      lifestage,
      email,
    };
    await axios.post('/api/easter/create', payload);
    setIsSubmitted(true);
  };

  const renderForm = () => (
    <VStack justifyContent="center" mb={5}>
      {/* <Image src={process.env.PUBLIC_URL + '/images/witness/title-color.png'} /> */}
      <Text as="b" fontSize="xl" color="#C11553">
        SUBMIT A PRAYER
      </Text>
      <form onSubmit={onSubmit} style={{ width: "95%" }}>
        <VStack spacing={3}>
          <FormControl id="topic" isRequired>
            <FormLabel color="#C11553">
              <b>
                <i>Choose your prayer topic</i>
              </b>
            </FormLabel>
            <VStack alignItems="flex-start">
              {prayerTopics.map((t) => (
                <Radio
                  isChecked={t.index === topic}
                  onChange={(e) => setTopic(t.index)}
                  colorScheme="red"
                >
                  <Text color="#C11553">
                    {t.text}
                  </Text>
                </Radio>
              ))}
            </VStack>
          </FormControl>
          <FormControl id="testimony" isRequired>
            <FormLabel color="#C11553">
              <b>
                <i>Prayer </i>
              </b>
            </FormLabel>
            <Textarea
              bg="#FFEFEF"
              _placeholder={{ color: '#C11553' }}
              type="text"
              placeholder="Write your prayer here..."
              onChange={(e) => setPrayer(e.target.value)}
            />
          </FormControl>

          <FormControl id="fullName">
            <FormLabel color="#C11553">
              <b>
                <i>(Optional) Your profile: </i>
              </b>
            </FormLabel>
            <FormHelperText color="#C11553">
              <i>*You may choose to remain anonymous.</i>
            </FormHelperText>
            <Input
              bg="#FFEFEF"
              _placeholder={{ color: '#C11553' }}
              type="text"
              placeholder="Name (optional)"
              onChange={(e) => setFullName(e.target.value)}
            />
          </FormControl>
          <FormControl id="lifestage">
            <Input
              bg="#FFEFEF"
              _placeholder={{ color: '#C11553' }}
              type="text"
              placeholder="Campus/Lifestage (optional)"
              onChange={(e) => setLifestage(e.target.value)}
            />
          </FormControl>

          <FormControl id="email">
            <Input
              bg="#FFEFEF"
              _placeholder={{ color: '#C11553' }}
              type="email"
              placeholder="Email (optional)"
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
        </VStack>
        <VStack w="100%" mt={10}>
          <Text as="i" fontSize="xs" color="#C11553">Thank you for sharing your prayer!</Text>
          <Button w="50%" bg="#C11553" color="white" type="submit" mt={20}>
            Submit
          </Button>
        </VStack>
      </form>
    </VStack>
  );

  const renderFormSubmitted = useCallback(
    () => (
      <VStack textAlign="center">
        <Text color="#C11553">
          <i>
            <b>Thank you for sharing your prayer!</b>
            <br /> Once reviewed, your prayer will be uploaded to the Prayer Wall!
              Stay tuned :)
          </i>
        </Text>
      </VStack>
    ),
    []
  );

  return (
    <Modal isOpen={isOpen} onClose={onCloseCustom} size="lg">
      <ModalOverlay>
        <ModalContent bg="#FFF7F1" maxW={['100vw', '55vw']}>
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

export default EasterPrayerModal;
