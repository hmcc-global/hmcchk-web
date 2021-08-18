import React, { useEffect, useState } from "react";
import axios from "axios";
import GoogleLogin from "react-google-login";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { signin } from "../../reducers/userSlice";
import { ChevronLeftIcon, EmailIcon, LockIcon } from "@chakra-ui/icons";
import {
  Box,
  Card,
  Container,
  Paper,
  Center,
  VStack,
  Flex,
  Image,
  Text,
  Stack,
  HStack,
  Button,
  Link,
} from "@chakra-ui/react";
import { SocialIcon } from "react-social-icons";

const RecoverPassword = (props) => {
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
      <Stack background="#2C5282" color="white" h="100vh">
        <Container maxW="container.lg">
          <Flex w="100vw">
            <Box>
              <Link
                to={{ pathname: "https://hongkong.hmcc.net" }}
                target="_blank"
              >
                <ChevronLeftIcon boxSize={10} />
                Return to hongkong.hmcc.net
              </Link>
            </Box>
          </Flex>
          <Flex justifyContent="center">
            <VStack justify="center" align="center" spacing={["3vh"]} py="5vh">
              <Image
                marginBottom="15px"
                h={{
                  base: "6vh",
                  sm: "8vh",
                  md: "10vh",
                  lg: "12vh",
                  xl: "15vh",
                }}
                src={`${process.env.PUBLIC_URL}/images/ripple.png`}
                alt="Logo of HMCC"
              />
              <Text fontSize={[24, 24, 28, 32]} fontWeight="bold">
                Recover Password
              </Text>
              <Text fontSize={[14, 14, 20, 24]} fontWeight="semibold">
                Please verify your email for us. Once you do, we'll send
                instructions to reset your password
              </Text>
              <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                <VStack spacing={["3vh"]}>
                  <input
                    {...register("email", { required: true })}
                    placeholder="Email"
                    style={inputBoxStyle}
                  />
                  <Text color="#FED7D7" w="50vw" fontSize={[12, 12, 12, 14]}>
                    Please input the email you used to create your HMCC account
                    This will only be applicable if you signed up using your
                    personal email
                  </Text>
                  <input
                    type="submit"
                    name="email link"
                    value="Email me a recovery link"
                    style={submitBoxStyle}
                  />
                </VStack>
              </form>
            </VStack>
          </Flex>
        </Container>
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

export default RecoverPassword;
