import React, { useState } from 'react';
import { customAxios as axios } from '../helpers/customAxios';
import { GoogleLogin } from '@react-oauth/google';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { Box, VStack, Flex, Image, Text, Button, Link } from '@chakra-ui/react';

const SignupContainer = (props) => {
  const [invalidLogin, setInvalidLogin] = useState('');
  const { history } = props;

  const onGoogleSuccessSignup = async ({ credential }) => {
    try {
      const { data } = await axios.post('/api/auth/signup-google', {
        tokenId: credential,
      });
      history.push({
        pathname: '/signup/form',
        state: data,
      });
    } catch (err) {
      setInvalidLogin('Account already exist!');
    }
  };

  const onGoogleFailure = (message) => {
    // TODO
    // if (error.response.status === 500) {
    //   setInvalidLogin('Invalid email or wrong password');
    // }
    // console.log(error);
  };

  const signupBoxStyle = {
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
        bgImage={`url(${
          process.env.PUBLIC_URL + '/images/default-hk-background.jpeg'
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
            <Link href="../" justify="center" fontSize="inherit">
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
            <VStack justify="center" align="center" mb="5">
              <Image
                marginBottom={{ base: '10px', md: '15px' }}
                h={['5vh', '6vh', '7vh', '8vh', '10vh']}
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
            <VStack
              width="full"
              fontSize={['0.675rem', '0.75rem', '1rem', '1rem']}
            >
              <Link href="/signup/form" width="full" id="signup_container-signup">
                <Button
                  style={signupBoxStyle}
                  _hover={{ opacity: '0.75' }}
                  background="#0058D2"
                  h={['40px', '40px', '55px', '55px']}
                  marginTop="0"
                  id="signup_container-signup"
                >
                  SIGN UP WITH PERSONAL EMAIL
                </Button>
              </Link>
              <Text>OR</Text>
              <GoogleLogin
                locale="en"
                size="large"
                shape="pill"
                text="signup_with"
                use_fedcm_for_prompt={true}
                onSuccess={onGoogleSuccessSignup}
                onFailure={onGoogleFailure}
              />
            </VStack>
            <Flex
              alignItems="center"
              justifyContent="center"
              marginTop="20px"
              fontSize={['0.675rem', '0.75rem', '1rem', '1rem']}
            >
              <Text marginRight="5px">Already have an account?</Text>
              <Link href="/login" id="signup_container-login">
                <Text
                  textAlign="right"
                  position="relative"
                  textDecoration="underline"
                >
                  Login
                </Text>
              </Link>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default SignupContainer;
