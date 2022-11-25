import {
  Box,
  Button,
  Link,
  Modal,
  ModalCloseButton,
  Image,
  ModalContent,
  AspectRatio,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalFooter,
  VStack,
  Text,
  Input,
  ButtonGroup,
  useToast,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { customAxios as axios } from '../helpers/customAxios';
import { DateTime } from 'luxon';

const MailingListForm = ({ props }) => {
  const user = props;
  const [isOpen, setIsOpen] = useState(true);
  const toast = useToast();
  const onClose = () => {
    setIsOpen(false);
  };
  const inputBox = {
    color: 'black',
    background: '#EDF2F7',
    border: '1px solid #E2E8F0',
    boxSizing: 'border-box',
    borderRadius: '12px',
    flex: 'none',
    alignSelf: 'stretch',
    flexGrow: '0',
    margin: '8px 0px',
    padding: '15px',
    fontSize: 'inherit',
    fontWeight: '500',
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState('');

  const handleSignup = async (data) => {
    try {
      const payload = await axios.post('/api/mailingList/create', {
        email: data.email,
        category: 'advent',
        fullName: data.fullName,
      });
      toast({
        description: 'You have been added to the mailing list!',
        status: 'success',
        duration: 5000,
      });
      setIsOpen(false);
    } catch (err) {
      console.log('Submitting to mailing list failed');
      setError('Submitting to mailing list failed');
    }
  };
  return (
    <Modal size="3xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent borderRadius="20">
        <AspectRatio mb="5" width="100%" ratio={16 / 9}>
          <Image
            borderTopLeftRadius="20"
            borderTopRightRadius="20"
            objectFit="cover"
          />
        </AspectRatio>
        <ModalCloseButton />
        <ModalHeader
          ml={[0, 16]}
          mr={[0, 16]}
          fontWeight="900"
          fontSize={['2xl', '3xl']}
        >
          2022 Advent Mailing List
        </ModalHeader>
        <ModalBody ml={[0, 16]} mr={[0, 16]}>
          <Box fontSize="lg" my="3" color="#4C80A5" textAlign="justify">
            This December, we will be sending out daily devotions, challenges
            and other content to help you get in the Christmas spirit. Sign up
            below to receive these content!
          </Box>

          <form onSubmit={handleSubmit(handleSignup)} autoComplete="off">
            <VStack
              width="100%"
              align="flex-start"
              fontSize={['0.675rem', '0.75rem', '1rem', '1rem']}
              display="flex"
              color="#718096"
            >
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                defaultValue={user.email ? user.email : ''}
                style={inputBox}
                h={['40px', '40px', '60px', '60px']}
                {...register('email', {
                  required: 'Required',
                  pattern: {
                    value:
                      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
                    message: 'Invalid email address',
                  },
                })}
              />
              {errors.email && (
                <Text
                  color="#ED4337"
                  fontWeight="bold"
                  fontSize={[12, 12, 12, 14]}
                >
                  {errors.email.message}
                </Text>
              )}
              <Input
                id="fullName"
                name="fullName"
                type="fullName"
                placeholder="Full Name"
                defaultValue={user.fullName ? user.fullName : ''}
                style={inputBox}
                h={['40px', '40px', '60px', '60px']}
                {...register('fullName', {
                  required: 'Required',
                  pattern: {
                    value: /^[A-Za-z]+((\s)?([A-Za-z])+)*$/,
                    message: 'Invalid name address',
                  },
                })}
              />
              {errors.fullName && (
                <Text
                  color="#ED4337"
                  fontWeight="bold"
                  fontSize={[12, 12, 12, 14]}
                >
                  {errors.fullName.message}
                </Text>
              )}
              <ButtonGroup
                size="md"
                flexDirection={['column', 'row']}
                spacing={[0, 0]}
                display={'flex'}
                flexWrap={'wrap'}
                w="100%"
                variant="outline"
                colorScheme="gray"
                alignItems="center"
              >
                <Button
                  my="1"
                  marginRight={['0', '4']}
                  minW={['18em', '10em']}
                  maxW={['30em', '11em']}
                  flex={[false, 1]}
                  type="submit"
                  style={{
                    whiteSpace: 'normal',
                    wordWrap: 'break-word',
                  }}
                  colorScheme="teal"
                >
                  Submit
                </Button>
                {DateTime.now().ts > 1669824001000 &&
                  window.location.pathname != '/advent' && (
                    <Link href="/advent" style={{ lineHeight: '0' }}>
                      <Button
                        my="1"
                        marginRight={['0', '4']}
                        minW={['18em', '10em']}
                        variant="solid"
                        maxW={['30em', '11em']}
                        flex={[false, 1]}
                        style={{
                          whiteSpace: 'normal',
                          wordWrap: 'break-word',
                        }}
                        colorScheme="teal"
                      >
                        {' '}
                        Advent Page
                      </Button>
                    </Link>
                  )}
              </ButtonGroup>
            </VStack>
          </form>
        </ModalBody>
        <ModalFooter ml={[0, 16]} mr={[0, 16]}></ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default MailingListForm;
