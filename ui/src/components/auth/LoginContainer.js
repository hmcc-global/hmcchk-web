import React, { useEffect, useState } from "react";
import axios from "axios";
import GoogleLogin from "react-google-login";
import {useForm} from 'react-hook-form';
import { useSelector, useDispatch } from "react-redux";
import { signin } from "../../reducers/userSlice";
import { ChevronLeftIcon, EmailIcon, LockIcon } from '@chakra-ui/icons'
import { Box, Card, Paper, VStack, Flex, Image, Text, Stack, HStack, Button, Link } from "@chakra-ui/react";
import {SocialIcon} from 'react-social-icons'

const LoginContainer = (props) => {
  const { classes } = props;
  const [token, setToken] = useState("null token");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { register, handleSubmit } = useForm();
  const [result, setResult] = useState("");
  const onSubmit = (data) => setResult(JSON.stringify(data));

  const postLogin = async () => {
    try {
      const { data } = await axios.post("/api/auth/login", {
        emailAddress: "albert@test.com",
        password: "testing",
      });
       dispatch(signin(data));
      console.log(user);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(async () => {
    await postLogin();
  }, []);

  const onGoogleSuccess = async ({ tokenId }) => {
    const { data } = await axios.post("/api/auth/signup-google", {
      tokenId: tokenId,
    });
  };

  const onGoogleFailure = ({ error }) => {
    console.log(error);
  };

  const inputBoxStyle = {
    background:'#ffffff',
    border: "1px solid #000000",
    boxSizing: "border-box",
    borderRadius: "6px",
    padding:'3px',
    width:{sm:'200px', md:'300px'},
    color:'black'
  };

  const submitBoxStyle = {
    justifyContent: 'center',
    alignItems: 'center',
    padding: '3px 19px',
    background: 'rgba(0, 0, 0, 0.04)',
    border: '1px solid #FFFFFF',
    boxSizing: 'border-box',
    backdropFilter: 'blur(6px)',
    borderRadius: '10px',
    width:'250px',
    fontWeight:'bold'
  };

  const signupBoxStyle = {
    justifyContent: 'center',
    alignItems: 'center',
    padding: '3px 19px',
    background: 'rgba(0, 0, 0, 0.04)',
    border: '1px solid #FFFFFF',
    boxSizing: 'border-box',
    backdropFilter: 'blur(6px)',
    borderRadius: '10px',
    width:'300px',
    fontWeight:'bold'
  };

  return (
    <>
      <Stack background='#2C5282' color='white' h='100vh'>
        <Flex w='100vw' >
          <Box>
            <Link>
              <ChevronLeftIcon boxSize={10} />
              Return to hongkong.hmcc.net
            </Link>
          </Box>
        </Flex>
        <Flex justifyContent='center'>
          <VStack justify='center' align='center'>
            <Image 
              h={{base:'3.5vh', sm:'4vh', md:'4.5vh',lg:'5vh',xl:'6vh'}} 
              src={`${process.env.PUBLIC_URL}/images/ripple.png`}
              alt='Logo of HMCC' />
            <Text>Log In</Text>
            <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
              <VStack>
                <input {...register("email", {required:true})} placeholder="Email" style={inputBoxStyle} />
                <input {...register("password", {required:true})} placeholder="Password" style={inputBoxStyle} />
                <Link>
                  Forgot Password?
                </Link>
              </VStack>
              <p>{result}</p>
              <VStack width='200px'>
                <input type="submit" name="Login" value="Login" style ={submitBoxStyle} />
                <Box>
                  
                  <input type="submit" name="Login" value="Login with Google" style={submitBoxStyle} />
                </Box>
              </VStack>
            </form>
            <HStack>
            <Image 
              w='5vw'
              src={`${process.env.PUBLIC_URL}/images/line.svg`}
              alt='line' />
            <Text>I don't have account</Text>
            <Image 
              w='5vw'
              src={`${process.env.PUBLIC_URL}/images/line.svg`}
              alt='line' />
            </HStack>
            <HStack>
              <Button style={signupBoxStyle}>
                Sign up with your personal email
              </Button>
              <Button style={signupBoxStyle}>
                Sign up with your Google Account
              </Button>
            </HStack>
          </VStack>
        </Flex>
      </Stack>
      {/* { <Paper className={classes.paper}>
        <Card>{user.email}</Card>
        <Card>
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            buttonText="Login"
            onSuccess={onGoogleSuccess}
            onFailure={onGoogleFailure}
            cookiePolicy={"single_host_origin"}
          />
        </Card>
      </Paper> } */}
    </>
  );
};

export default LoginContainer;
