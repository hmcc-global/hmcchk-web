import React, { useEffect, useState } from "react";
import axios from "axios";
import GoogleLogin from "react-google-login";
import GoogleButton from "react-google-button";
import { useForm } from "react-hook-form";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import Signup from "./Signup";
import {
  Box,
  Card,
  Paper,
  VStack,
  Flex,
  Image,
  Text,
  Stack,
  HStack,
  Button,
  Link,
} from "@chakra-ui/react";
import { Route } from "react-router";

const Login = (props) => {
  const { register, handleSubmit } = useForm();
  const [result, setResult] = useState("");
  const onSubmit = (data) => setResult(JSON.stringify(data));

  const onGoogleSuccess = async ({ tokenId }) => {
    const { data } = await axios.post("/api/auth/signup-google", {
      tokenId: tokenId,
    });
  };

  const onGoogleFailure = ({ error }) => {
    console.log(error);
  };

  const inputBoxStyle = {
    background: "#ffffff",
    border: "1px solid #000000",
    boxSizing: "border-box",
    borderRadius: "6px",
    padding: "3px",
    width: "300px",
    color: "black",
    paddingLeft: "5px",
  };

  const submitBoxStyle = {
    justifyContent: "center",
    alignItems: "center",
    padding: "3px 19px",
    background: "rgba(0, 0, 0, 0.04)",
    border: "1px solid #FFFFFF",
    boxSizing: "border-box",
    backdropFilter: "blur(6px)",
    borderRadius: "10px",
    height: "40px",
    width: "250px",
    fontWeight: "bold",
  };

  const signupBoxStyle = {
    justifyContent: "center",
    alignItems: "center",
    padding: "3px 19px",
    background: "rgba(0, 0, 0, 0.04)",
    border: "1px solid #FFFFFF",
    boxSizing: "border-box",
    backdropFilter: "blur(6px)",
    borderRadius: "10px",
    width: "300px",
    fontWeight: "bold",
  };

  return (
    <>
      <Route exact path="/login/signup" component={Signup} />
      <Stack
        background="#2C5282"
        color="white"
        h="100vh"
        w="100vw"
        padding="20px"
      >
        <Flex>
          <Box>
            <Link href="../sermons">
              <ChevronLeftIcon boxSize={10} />
              Return to hongkong.hmcc.net
            </Link>
          </Box>
        </Flex>
        <Flex justifyContent="center">
          <VStack justify="center" align="center">
            <Image
              marginBottom="15px"
              h={{ base: "6vh", sm: "8vh", md: "10vh", lg: "12vh", xl: "15vh" }}
              src={`${process.env.PUBLIC_URL}/images/ripple.png`}
              alt="Logo of HMCC"
            />
            <Text fontWeight="bold" fontSize="2xl">
              Log In
            </Text>
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
              <VStack align="stretch" marginTop="40px">
                <input
                  type="email"
                  {...register("email", { required: true })}
                  placeholder="Email"
                  style={inputBoxStyle}
                />
                <input
                  type="password"
                  {...register("password", { required: true })}
                  placeholder="Password"
                  style={inputBoxStyle}
                />
                <Link>
                  <Text textAlign="right" fontSize="xs" position="relative">
                    Forgot Password?
                  </Text>
                </Link>
              </VStack>
              <p>{result}</p>
              <VStack spacing={5} marginTop="25px">
                <input
                  type="submit"
                  name="Login"
                  value="Login"
                  style={submitBoxStyle}
                />
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
                      style={submitBoxStyle}
                    >
                      Login with Google
                    </Button>
                  )}
                  buttonText="Login"
                  onSuccess={onGoogleSuccess}
                  onFailure={onGoogleFailure}
                  cookiePolicy={"single_host_origin"}
                />
              </VStack>
            </form>
            <HStack>
              <Flex marginTop="20px" marginBottom="20px">
                <Image
                  w="8vw"
                  src={`${process.env.PUBLIC_URL}/images/VLine.svg`}
                  alt="line"
                />
                <Text marginLeft="15px" marginRight="15px">
                  I don't have account
                </Text>
                <Image
                  w="8vw"
                  src={`${process.env.PUBLIC_URL}/images/VLine.svg`}
                  alt="line"
                />
              </Flex>
            </HStack>
            <HStack display={{ base: "none", md: "flex" }}>
              <Button style={signupBoxStyle} marginRight="20px">
                <Link href="/login/signup">
                  Sign up with your personal email
                </Link>
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
                    style={signupBoxStyle}
                  >
                    Sign up with Google
                  </Button>
                )}
                buttonText="Login"
                onSuccess={onGoogleSuccess}
                onFailure={onGoogleFailure}
                cookiePolicy={"single_host_origin"}
              />
            </HStack>
          </VStack>
        </Flex>
      </Stack>
    </>
  );
};

export default Login;
