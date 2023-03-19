import {
  Box,
  Link,
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

const TextTestimonyModal = ({ isOpen, onClose }) => {
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
    await axios.post('/api/testimony/create', payload);
    setIsSubmitted(true);
  };

  const onClick = (e) => {
    if (e) {
      navigator.clipboard.writeText(e);
    }
    if (e.clipboardData) {
      e.clipboardData.setData('text/plain', { e });
    }
  };

  const renderForm = () => (
    <VStack textAlign="center" mb={5}>
      <Image src={process.env.PUBLIC_URL + '/images/witness/title-color.png'} />
      <Text color="#C11553" textStyle="dm_sans_bold" justifyContent="center">
        How are you witnessing God? Share your testimony with us!
      </Text>
      <form onSubmit={onSubmit}>
        <VStack spacing={3}>
          <FormControl id="theme" isRequired>
            <FormLabel color="#C11553">
              <b>
                <i>Theme of testimony </i>
              </b>
            </FormLabel>
            <FormHelperText color="#C11553" textAlign="left">
              <i>(e.g. I witnessed Jesus' Passionate________ through .....)</i>
            </FormHelperText>
            <Textarea
              bg="#FFE2DE"
              _placeholder={{ color: '#C11553' }}
              type="text"
              placeholder="Describe your testimony in one sentence..."
              onChange={(e) => setTheme(e.target.value)}
            />
          </FormControl>
          <FormControl id="testimony" isRequired>
            <FormLabel color="#C11553">
              <b>
                <i>Testimony </i>
              </b>
            </FormLabel>
            <Textarea
              bg="#FFE2DE"
              _placeholder={{ color: '#C11553' }}
              type="text"
              placeholder="Write your testimony here..."
              onChange={(e) => setTestimony(e.target.value)}
            />
          </FormControl>
          {/* need to change this, add icon */}
          <FormControl id="photo">
            {/* <Input
                bg="#FFE2DE"
                _placeholder={{ color: '#C11553' }}
                type="text"
                placeholder="Attach relevant images (optional)"
              /> */}
            {/* <FileUpload
              accept={'image/*'}
              multiple
              register={register('file_', { validate: validateFiles })}
            >
              <Button leftIcon={<Icon as={FiFile} />}>
                Upload
              </Button>
            </FileUpload> */}
          </FormControl>

          <FormControl id="fullName">
            <FormLabel color="#C11553">
              <b>
                <i>(Optional) Your profile: </i>
              </b>
            </FormLabel>
            <FormHelperText color="#C11553" textAlign="left">
              <i>*You may choose to remain anonymous.</i>
            </FormHelperText>
            <Input
              bg="#FFE2DE"
              _placeholder={{ color: '#C11553' }}
              type="text"
              placeholder="Name (optional)"
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
          <FormControl id="lifestage">
            <Input
              bg="#FFE2DE"
              _placeholder={{ color: '#C11553' }}
              type="text"
              placeholder="Campus/Lifestage (optional)"
              onChange={(e) => setLifestage(e.target.value)}
            />
          </FormControl>
          <FormControl id="email">
            <FormHelperText color="#C11553" textAlign="left">
              <i>
                If you are open for an invitation to share your testimony with
                the church, please input your email address so we can contact
                you :) <br />
              </i>
            </FormHelperText>
            <Input
              bg="#FFE2DE"
              _placeholder={{ color: '#C11553' }}
              type="email"
              placeholder="Email (optional)"
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormHelperText color="#C11553" alignItems={'center'}>
            <i>Thank you for sharing your testimony!.</i>
          </FormHelperText>
          <Button w="30%" bg="#C11553" color="white" type="submit" id="submit">
            Submit
          </Button>
        </VStack>
      </form>
    </VStack>
  );

  const renderFormSubmitted = useCallback(
    () => (
      <VStack textAlign="center" maxW={['90vw', '42vw']}>
        <Text color="#C11553">
          <i>
            <b>Thank you for sharing your testimony!</b>
            <br /> Once reviewed, your testimony will be uploaded to the Witness
            page! Stay tuned :)
          </i>
        </Text>
        <Text color="#C11553">
          <i>
            Join the{' '}
            <Link
              color="teal.500"
              href="http://instagram.com/hmcc_hk/"
              isExternal
            >
              testimony campaign
            </Link>{' '}
            over on social media, and share your story on how you witnessed
            Jesus!
          </i>
        </Text>
        <Box bg="#FFE2DE" p={4} borderRadius={10} width={['90vw', '45vw']}>
          <Text color="#C11553" textAlign="left">
            <i>
              1. Answer the prompt{' '}
              <b>"I Witnessed Jesus' Passionate _______"</b>
              <br /> 2. Share and elaborate on the prompt as creative as you
              can.
              <br /> 3. Use the hashtag in the caption <b>
                #2023WitnessJesus
              </b>{' '}
              and tag <b>@hmcc_hk.</b>
            </i>
          </Text>
        </Box>
        <Text color="#C11553">
          <i>
            Click/Tap below to copy the testimony you just submitted and feel
            free to post it in Instagram!
          </i>
        </Text>
        <Box
          bg="#EAE9E9;"
          p={4}
          borderRadius={10}
          height={['30vw', '10vw']}
          overflowY="scroll"
          width={['90vw', '45vw']}
          onClick={onClick(testimony)}
        >
          <Text color="#616161" textAlign="left">
            <i>{testimony}</i>
          </Text>
        </Box>
        <Button
          textStyle="arial"
          as={Link}
          href="http://instagram.com/"
          isExternal
          border="2px"
          borderColor="#BE337F"
          borderRadius={10}
          color="#BE337F"
          fontSize={13}
          mr={4}
          size="md"
          variant="outline"
          _hover={{
            background:
              'linear-gradient(109.54deg, #FF4F50 11.11%, #D33E68 57.55%, #BD3381 95.53%);',
            color: '#FFFFFF',
          }}
        >
          Open Instagram
        </Button>
      </VStack>
    ),
    [testimony]
  );

  return (
    <Modal
      blockScrollOnMount={false}
      isOpen={isOpen}
      onClose={onCloseCustom}
      size="lg"
      scrollBehavior="outside"
    >
      <ModalOverlay>
        <ModalContent bg="#FBF7FC" maxW={['100vw', '50vw']} alignItems="center">
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

export default TextTestimonyModal;
