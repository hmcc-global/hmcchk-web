import React, { useEffect, useState } from "react";
import { customAxios as axios } from "../helpers/customAxios";
import GoogleLogin from "react-google-login";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { signin, signup } from "../../reducers/userSlice";
import { useLocation } from "react-router-dom";
import { ChevronLeftIcon } from "@chakra-ui/icons";
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

const LoginContainer = (props) => {
  const [invalidLogin, setInvalidLogin] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { history } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const postLogin = async (email, password) => {
    try {
      const { data } = await axios.post("/api/auth/login", {
        emailAddress: email,
        password: password,
      });
      dispatch(signin(data));
      setInvalidLogin("");
      window.location.reload();
    } catch (err) {
      if (err.response.status === 500) {
        setInvalidLogin("Invalid email or wrong password");
      }
      console.log(err);
    }
  };

  const onGoogleSuccessSignup = async ({ tokenId }) => {
    try {
      const { data } = await axios.post("/api/auth/signup-google", {
        tokenId: tokenId,
      });
      history.push({
        pathname: "/signup",
        state: data,
      });
    } catch (err) {
      setInvalidLogin("Account already exist!");
    }
  };

  const onGoogleSuccessLogin = async ({ tokenId }) => {
    const { data } = await axios.post("/api/auth/login-google", {
      tokenId: tokenId,
    });
    console.log(data);
    dispatch(signin(data));
    setInvalidLogin("");
    window.location.reload();
  };

  const onGoogleFailure = ({ error }) => {
    if (error.response.status === 500) {
      setInvalidLogin("Invalid email or wrong password");
    }
    console.log(error);
  };
  const onSubmit = (data) => {
    postLogin(data.email, data.password);
  };
  // const location = useLocation();

  const inputBoxStyle = {
    background: "#ffffff",
    border: "1px solid #000000",
    boxSizing: "border-box",
    borderRadius: "6px",
    padding: "3px 10px",
    width: "250px",
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
      <Stack background="#2C5282" color="white" padding="20px">
        <Flex>
          <Box>
            <Link href="../">
              <ChevronLeftIcon boxSize={10} />
              Return to hongkong.hmcc.net
            </Link>
          </Box>
        </Flex>
        <Flex justifyContent="center">
          <VStack justify="center" align="center">
            <Image
              marginTop={{ base: "30px", md: "none" }}
              marginBottom="15px"
              h={{ base: "6vh", sm: "8vh", md: "10vh", lg: "12vh", xl: "15vh" }}
              src={`${process.env.PUBLIC_URL}/images/ripple.png`}
              alt="Logo of HMCC"
            />
            <Text fontWeight="bold" fontSize="2xl">
              Log In
            </Text>
            {/* <Box paddingTop="1vh">
              {location.state.detail && (
                <Text fontSize={[16, 16, 16]} fontWeight="semibold">
                  Your account is succesfully registered. Please try logging in!
                </Text>
              )}
            </Box> */}
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
              <VStack align="stretch">
                <Flex alignItems="center" justifyContent="center">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    style={inputBoxStyle}
                    {...register("email", {
                      required: "Required",
                      pattern: {
                        value:
                          /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
                        message: "Invalid email address",
                      },
                    })}
                  />
                </Flex>
                {errors.email && (
                  <Text
                    color="#FED7D7"
                    fontWeight="bold"
                    fontSize={[12, 12, 12, 14]}
                  >
                    {errors.email.message}
                  </Text>
                )}
                <Flex alignItems="center" justifyContent="center">
                  <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Password"
                    style={inputBoxStyle}
                    {...register("password", {
                      required: "Required",
                    })}
                  />
                </Flex>
                {errors.password && (
                  <Text
                    color="#FED7D7"
                    fontWeight="bold"
                    fontSize={[12, 12, 12, 14]}
                  >
                    {errors.password.message}
                  </Text>
                )}
                {invalidLogin ? (
                  <Text
                    color="#FED7D7"
                    fontWeight="bold"
                    fontSize={[12, 12, 12, 14]}
                  >
                    {invalidLogin}
                  </Text>
                ) : null}
                <Link href="/password/recovery">
                  <Text textAlign="right" fontSize="xs" position="relative">
                    Forgot Password?
                  </Text>
                </Link>
              </VStack>
              <VStack spacing={5} marginTop="25px">
                <Button type="submit" style={submitBoxStyle}>
                  Login
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
                    >
                      Login with Google
                    </Button>
                  )}
                  buttonText="Login"
                  onSuccess={onGoogleSuccessLogin}
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
            <Stack direction={{ base: "column", md: "row" }} spacing={5}>
              <Button style={signupBoxStyle}>
                <Link href="/signup">Sign up with your personal email</Link>
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
                    onClick={renderProps.onClick}
                  >
                    Sign up with Google
                  </Button>
                )}
                buttonText="Login"
                onSuccess={onGoogleSuccessSignup}
                onFailure={onGoogleFailure}
                cookiePolicy={"single_host_origin"}
              />
            </Stack>
          </VStack>
        </Flex>
      </Stack>
    </>
  );
};

export default LoginContainer;