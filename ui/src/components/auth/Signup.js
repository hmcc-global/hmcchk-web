import React, { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { customAxios as axios } from '../helpers/customAxios';
import { ArrowBackIcon } from '@chakra-ui/icons';
import ReCAPTCHA from 'react-google-recaptcha';
import {
  Box,
  Select,
  Center,
  UnorderedList,
  ListItem,
  VStack,
  Flex,
  Image,
  Text,
  Link,
  Button,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  useMediaQuery,
} from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { lifestageList, countryList } from '../helpers/lists';

const Signup = (props) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const googleEmail = props.history.location.state?.email;
  const googleFullName = props.history.location.state?.fullName;
  const [isLargerThan480] = useMediaQuery('(min-width: 480px)');

  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (googleEmail) {
      let firstname = googleFullName.split(' ').slice(0, -1).join(' ');
      let lastname = googleFullName.split(' ').slice(-1).join(' ');
      setValue('email', googleEmail);
      setValue('firstName', firstname);
      setValue('lastName', lastname);
    }
  }, [googleEmail, googleFullName, setValue]);

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

  const selectBox = {
    color: 'black',
    background: '#EDF2F7',
    border: '1px solid #E2E8F0',
    boxSizing: 'border-box',
    borderRadius: '12px',
    flex: 'none',
    alignSelf: 'stretch',
    flexGrow: '0',
    margin: '8px 0px',
    fontSize: 'inherit',
    fontWeight: '500',
  };

  const submitBoxStyle = {
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    flexGrow: '0',
    padding: '18px',
    background: '#164B95',
    boxSizing: 'border-box',
    backdropFilter: 'blur(6px)',
    borderRadius: '12px',
    fontWeight: 'bold',
    marginBottom: '20px'
  };

  const recaptcha480 = {
    margin: '20px 0px 0px',
    transform: 'scale(0.77)',
    webkitTransform: 'scale(0.77)',
    transformOrigin: '151px 0px',
    webkitTransformOrigin: '151px 0px',
  };

  const recaptcha1080 = {
    margin: '20px 0px',
  };

  const recaptchaStyle = () => {
    if (isLargerThan480) {
      return recaptcha1080;
    }
    return recaptcha480;
  };

  const password = useRef({});
  password.current = watch('password', '');

  const { history } = props;

  const handleSignup = async (data) => {
    try {
      const payload = await axios.post('/api/auth/signup', {
        password: data.password ? data.password : '',
        emailAddress: data.email,
        fullName: data.firstName + ' ' + data.lastName,
        countryOfOrigin: data.countryOfOrigin,
        lifestage: data.lifestage,
        phoneNumber: data.phoneNumber,
      });
      if (payload.status === 200) {
        setModalOpen(true);
        setTimeout(() => {
          history.push('/login');
        }, 3000);
      }
    } catch (err) {
      if (err.response && err.response.status === 409) {
        console.log('EMAIL already exists');
        setError('Email already exists, please try with another email');
      } else if (err.response && err.response.status === 422) {
        console.log('Required fields not filled');
        setError('Required fields not filled');
      }
    }
  };

  return (
    <>
      <Modal isOpen={modalOpen}>
        <ModalOverlay />
        <ModalContent borderRadius="20">
          <VStack>
            <Text
              color="#79B71A"
              fontSize="2xl"
              fontWeight="700"
              mt={6}
              flex={1}
              p={5}
              textAlign="center"
            >
              Account created successfully, redirecting you to the login page.
              You can now try to login!
            </Text>
            <Box flex={4}>
              <Center w="100%" h="100%">
                <CheckCircleIcon mt={5} w="70%" h="70%" color="#79B71A" />
              </Center>
            </Box>
          </VStack>
          <ModalFooter />
        </ModalContent>
      </Modal>

      <Box
        minH="100vh"
        w="full"
        bgImage={`url(${
          process.env.PUBLIC_URL + '/images/default-hk-background.jpg'
        })`}
        bgRepeat="no-repeat"
        bgAttachment="fixed"
        bgSize="cover"
      >
        <Flex
          flexDirection="column"
          align="center"
          w={['100vw', '85vw', '70vw', '60vw', '40vw']}
          m="auto"
          p="10"
        >
          <Box width="100%" alignSelf="flex-start" mb="5" color="#FFF">
            <Link href="/signup" justify="center" fontSize="inherit">
              <ArrowBackIcon boxSize={7} mr="2" />
              Back
            </Link>
          </Box>

          <Box
            m="auto"
            width="100%"
            background="#f7fafc"
            p={['15px', '20px', '25px', '30px', '35px']}
            borderRadius="16px"
            color="#718096"
            fontWeight="500"
          >
            <VStack justify="center" align="center" mb="2.5">
              <Image
                // marginTop={{ base: '30px', md: 'none' }}
                marginBottom={{ base: '15px', md: '20px' }}
                h={['4.5vh', '5.5vh', '6.5vh', '7.5vh', '8.5vh']}
                src={`${process.env.PUBLIC_URL}/images/ripple.png`}
                alt="Logo of HMCC"
                style={{ filter: 'invert(0.6)' }}
              />
              <Text
                fontWeight="700"
                fontSize={['0.7rem', '0.8rem', '0.95rem', '1rem', '1.05rem']}
                display="flex"
                color="#656565"
              >
                Harvest Mission Community Church
              </Text>
              <Text
                fontWeight="800"
                fontSize={['1.75rem', '2rem', '2.25rem', '2.5rem', '2.75rem']}
                display="flex"
                color="#2D3748"
              >
                Sign Up
              </Text>
            </VStack>
            <form onSubmit={handleSubmit(handleSignup)} autoComplete="off">
              <VStack
                width="100%"
                align="flex-start"
                fontSize={['0.675rem', '0.75rem', '1rem', '1rem']}
                display="flex"
                color="#718096"
              >
                <Text>Enter your email address</Text>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  isReadOnly={googleEmail ? true : false}
                  placeholder="e.g. chantaiman@gmail.com"
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
                {errors.email && !googleEmail && (
                  <Text
                    color="#ED4337"
                    fontWeight="bold"
                    fontSize={[12, 12, 12, 14]}
                  >
                    {errors.email.message}
                  </Text>
                )}
                {googleEmail ? null : (
                  <>
                    <Text>Enter Your Account Password</Text>
                    <Input
                      id="password"
                      type="password"
                      name="password"
                      disabled={googleEmail ? true : false}
                      placeholder="Password"
                      style={inputBox}
                      h={['40px', '40px', '60px', '60px']}
                      {...register('password', {
                        required: 'Required',
                        pattern: {
                          value:
                            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                          message:
                            'Your Password does not fulfill the criteria', // JS only: <p>error message</p> TS only support string
                        },
                      })}
                    />
                    {errors.password && (
                      <Text
                        color="#ED4337"
                        fontWeight="bold"
                        fontSize={[12, 12, 12, 14]}
                      >
                        {errors.password.message}
                      </Text>
                    )}
                    <Center>
                      <Box maxW="300" color="#787878">
                        <Text w="50vw" fontSize={[10, 10, 14, 14]}>
                          Your new password should consist of:
                        </Text>
                        <UnorderedList w="300" fontSize={[10, 10, 14, 14]}>
                          <ListItem>At least 8 characters in length</ListItem>
                          <ListItem>
                            Mixture of both uppercase and lowercase characters
                          </ListItem>
                          <ListItem>Contains at least one number</ListItem>
                          <ListItem>
                            Contains at least one special character
                          </ListItem>
                        </UnorderedList>
                      </Box>
                    </Center>
                    <Input
                      id="rePassword"
                      type="password"
                      name="rePassword"
                      disabled={googleEmail ? true : false}
                      placeholder="Re-enter Password"
                      style={inputBox}
                      h={['40px', '40px', '60px', '60px']}
                      {...register('rePassword', {
                        required: 'Required',
                        validate: (value) =>
                          value === password.current ||
                          'The passwords do not match',
                      })}
                    />
                    {errors.rePassword && (
                      <Text
                        color="#ED4337"
                        fontWeight="bold"
                        fontSize={[12, 12, 12, 14]}
                      >
                        {errors.rePassword.message}
                      </Text>
                    )}
                  </>
                )}
                <Text>First Name (and Middle Name)</Text>
                <Input
                  id="firstName"
                  type="text"
                  name="firstName"
                  isReadOnly={googleEmail ? true : false}
                  placeholder="First name"
                  style={inputBox}
                  h={['40px', '40px', '60px', '60px']}
                  {...register('firstName', { required: 'Required' })}
                />
                {errors.firstName && (
                  <Text
                    color="#ED4337"
                    fontWeight="bold"
                    fontSize={[12, 12, 12, 14]}
                  >
                    {errors.firstName.message}
                  </Text>
                )}
                <Text>Last Name</Text>
                <Input
                  id="lastName"
                  type="text"
                  name="lastName"
                  isReadOnly={googleEmail ? true : false}
                  placeholder="Last Name"
                  style={inputBox}
                  h={['40px', '40px', '60px', '60px']}
                  {...register('lastName', { required: 'Required' })}
                />
                {errors.lastName && (
                  <Text
                    color="#ED4337"
                    fontWeight="bold"
                    fontSize={[12, 12, 12, 14]}
                  >
                    {errors.lastName.message}
                  </Text>
                )}
                <Text>Phone Number</Text>
                <Input
                  id="phoneNumber"
                  type="number"
                  name="password"
                  placeholder="Phone Number"
                  style={inputBox}
                  h={['40px', '40px', '60px', '60px']}
                  {...register('phoneNumber', {
                    required: 'Required',
                    maxLength: {
                      value: 16,
                      message: 'Phone number too long',
                    },
                  })}
                />
                {errors.phoneNumber && (
                  <Text
                    color="#ED4337"
                    fontWeight="bold"
                    fontSize={[12, 12, 12, 14]}
                  >
                    {errors.phoneNumber.message}
                  </Text>
                )}
                <Text>Country of Origin</Text>
                <Select
                  boxSizing="border-box"
                  style={selectBox}
                  h={['40px', '40px', '60px', '60px']}
                  {...register('countryOfOrigin')}
                  isInvalid={errors['countryOfOrigin']}
                  placeholder="Please fill in this field"
                  _placeholder={{ color: '#718096' }}
                >
                  {countryList.map((result) => (
                    <option value={result}>{result}</option>
                  ))}
                </Select>

                {errors.country && (
                  <Text
                    color="#ED4337"
                    fontWeight="bold"
                    fontSize={[12, 12, 12, 14]}
                  >
                    {errors.country.message}
                  </Text>
                )}
                <Text>Life Stage</Text>
                <Select
                  style={selectBox}
                  h={['40px', '40px', '60px', '60px']}
                  {...register('lifestage')}
                  isInvalid={errors['lifestage']}
                  placeholder="Please fill in this field"
                  _placeholder={{ color: '#718096' }}
                >
                  {lifestageList.map((lifestage) => (
                    <option value={lifestage}>{lifestage}</option>
                  ))}
                </Select>
                {errors.lifestage && (
                  <Text
                    color="#ED4337"
                    fontWeight="bold"
                    fontSize={[12, 12, 12, 14]}
                  >
                    {errors.lifestage.message}
                  </Text>
                )}
              </VStack>
              <VStack align="center">
                <ReCAPTCHA
                  sitekey={process.env.REACT_APP_CAPTCHA}
                  style={recaptchaStyle()}
                />
                {error && (
                  <Text color="#F6AD55" fontSize={[14, 14, 14, 16]}>
                    {error}
                  </Text>
                )}
                <Button
                  type="submit"
                  name="Login"
                  value="Sign Up"
                  style={submitBoxStyle}
                  _hover={{ opacity: '0.75' }}
                  h={['40px', '40px', '60px', '60px']}
                  fontSize={['0.675rem', '0.75rem', '1rem', '1rem']}
                >
                  Sign Up
                </Button>
              </VStack>
            </form>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default Signup;
