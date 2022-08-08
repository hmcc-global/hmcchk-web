import React, { useState } from 'react';
import { customAxios as axios } from '../helpers/customAxios';
import GoogleLogin from 'react-google-login';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { signin } from '../../reducers/userSlice';
import { ArrowBackIcon } from '@chakra-ui/icons';

import {
  Box,
  VStack,
  Flex,
  Image,
  Text,
  Input,
  Button,
  Link,
} from '@chakra-ui/react';

const LoginContainer = (props) => {
  const [invalidLogin, setInvalidLogin] = useState('');
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const postLogin = async (email, password) => {
    try {
      const { data } = await axios.post('/api/auth/login', {
        emailAddress: email,
        password: password,
      });
      dispatch(signin(data));
      setInvalidLogin('');
      window.location.reload();
    } catch (err) {
      if (err.response.status === 500) {
        setInvalidLogin('Invalid email or wrong password');
      }
      console.log(err);
    }
  };

  const onGoogleSuccessLogin = async ({ tokenId }) => {
    const { data } = await axios.post('/api/auth/login-google', {
      tokenId: tokenId,
    });
    dispatch(signin(data));
    setInvalidLogin('');
    window.location.reload();
  };

  const onGoogleFailure = ({ error }) => {
    if (error.response.status === 500) {
      setInvalidLogin('Invalid email or wrong password');
    }
    console.log(error);
  };
  const onSubmit = (data) => {
    postLogin(data.email, data.password);
  };

  const inputBoxStyle = {
    color: 'black',
    background: '#EDF2F7',
    border: '1px solid #E2E8F0',
    boxSizing: 'border-box',
    borderRadius: '12px',
    flex: 'none',
    flexGrow: '0',
    margin: '4px 0px',
    padding: '15px',
    fontSize: 'inherit',
    fontWeight: '500',
  };

  const submitBoxStyle = {
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    padding: '18px',
    boxSizing: 'border-box',
    backdropFilter: 'blur(6px)',
    borderRadius: '12px',
    fontWeight: 'bold',
    fontSize: 'inherit',
    width: '100%',
  };

  return (
    <>
      <Box
        minH="100vh"
        w="full"
        bgImage={`linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ),url(${
          process.env.PUBLIC_URL + '/images/home/connect.png'
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
          <Box width="full" alignSelf="flex-start" mb="5" color="#FFF">
            <Link href="../" justify="center" fontSize="inherit">
              <ArrowBackIcon boxSize={7} mr="2" />
              Back
            </Link>
          </Box>

          <Box
            m="auto"
            width="full"
            background="#f7fafc"
            p={['15px', '20px', '25px', '30px', '35px']}
            borderRadius="16px"
            color="#718096"
            fontWeight="500"
          >
            <VStack justify="center" align="center" mb="5">
              <Image
                marginBottom={{ base: '10px', md: '15px' }}
                h={['5vh', '6vh', '7vh', '8vh', '9vh']}
                src={`${process.env.PUBLIC_URL}/images/ripple.png`}
                alt="Logo of HMCC"
                style={{ filter: 'invert(0.6)' }}
              />
              <Text
                fontWeight="700"
                fontSize={['0.65rem', '0.8rem', '0.95rem', '1rem', '1.05rem']}
                display="flex"
                color="#656565"
              >
                Harvest Mission Community Church
              </Text>
              <Text
                fontWeight="800"
                fontSize={['1.25rem', '1.5rem', '1.75rem', '2rem', '2.25rem']}
                display="flex"
                color="#2D3748"
              >
                Login
              </Text>
            </VStack>
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
              <VStack
                align="stretch"
                fontSize={['0.675rem', '0.75rem', '1rem', '1rem']}
                display="flex"
                color="#718096"
              >
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  style={inputBoxStyle}
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
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Password"
                  style={inputBoxStyle}
                  h={['40px', '40px', '60px', '60px']}
                  {...register('password', {
                    required: 'Required',
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
                {invalidLogin ? (
                  <Text
                    color="#ED4337"
                    fontWeight="bold"
                    fontSize={[12, 12, 12, 14]}
                  >
                    {invalidLogin}
                  </Text>
                ) : null}
                <Link href="/password/recover">
                  <Text
                    textAlign="right"
                    fontSize={['0.675rem', '0.75rem', '1rem', '1rem']}
                    position="relative"
                  >
                    Forgot Password?
                  </Text>
                </Link>
              </VStack>
              <VStack
                marginTop={['10px', '10px', '15px', '15px']}
                fontSize={['0.675rem', '0.75rem', '1rem', '1rem']}
              >
                <Button
                  type="submit"
                  style={submitBoxStyle}
                  _hover={{ opacity: '0.75' }}
                  background="#0058D2"
                  h={['40px', '40px', '55px', '55px']}
                >
                  LOGIN
                </Button>
                <GoogleLogin
                  clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                  render={(renderProps) => (
                    <Button
                      leftIcon={
                        <Image
                          src={`${process.env.PUBLIC_URL}/images/google.svg`}
                          alt="Google"
                        />
                      }
                      onClick={renderProps.onClick}
                      style={submitBoxStyle}
                      _hover={{ opacity: '0.75' }}
                      background="#2C5282"
                      h={['40px', '40px', '55px', '55px']}
                    >
                      LOGIN WITH GOOGLE
                    </Button>
                  )}
                  buttonText="Login"
                  onSuccess={onGoogleSuccessLogin}
                  onFailure={onGoogleFailure}
                  cookiePolicy={'single_host_origin'}
                />
              </VStack>
            </form>

            <Flex
              alignItems="center"
              justifyContent="center"
              marginTop={['15px', '15px', '20px', '20px']}
              fontSize={['0.675rem', '0.75rem', '1rem', '1rem']}
            >
              <Text marginRight="5px">Don't have an account?</Text>
              <Link href="/signup">
                <Text
                  textAlign="right"
                  position="relative"
                  textDecoration="underline"
                >
                  Sign up
                </Text>
              </Link>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default LoginContainer;
