import React from "react";
import { customAxios as axios } from "../helpers/customAxios";
import { useForm } from "react-hook-form";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import {
  Box,
  Container,
  VStack,
  Flex,
  Image,
  Text,
  Stack,
  Link,
  useToast,
  Button,
} from "@chakra-ui/react";

const RecoverPassword = (props) => {
  const { register, handleSubmit } = useForm();
  const toast = useToast();
  const onSubmit = async (data) => {
    const isSuccess = await axios.post("/api/auth/forgot-password", data);

    // Send toast regardless to prevent email sniffing.
    toast({
      title: "Password Recovery.",
      description: "Email Sent!.",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
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
          <Flex w="100%">
            <Box>
              <Link href="/">
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
                  <Button
                    type="submit"
                    name="email link"
                    style={submitBoxStyle}
                  >
                    Send Recovery Link
                  </Button>
                </VStack>
              </form>
            </VStack>
          </Flex>
        </Container>
      </Stack>
    </>
  );
};

export default RecoverPassword;
