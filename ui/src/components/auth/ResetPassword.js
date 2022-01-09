import React, { useRef } from "react";
import { customAxios as axios } from "../helpers/customAxios";
import { useForm } from "react-hook-form";
import { ChevronLeftIcon } from "@chakra-ui/icons";

import {
  Box,
  UnorderedList,
  ListItem,
  Center,
  VStack,
  Flex,
  Image,
  Text,
  Stack,
  Link,
  useToast,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ResetPassword = (props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();
  const query = useQuery();
  const toast = useToast();

  const onSubmit = async (data) => {
    try {
      const token = query.get("token");
      const params = {
        token,
        password: data.password,
      };
      const isSuccess = await axios.post(
        "/api/auth/change-password-recovery",
        params
      );

      if (isSuccess) {
        toast({
          title: "Password Reset.",
          description: "Password successfully reset! Please login again.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });

        props.history.push("/login");
      } else {
        toast({
          title: "Password Reset.",
          description: "Password could not be reset.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    } catch (err) {
      if (err.response?.status == 498) {
        // invalid token error code
        toast({
          title: "Password Reset.",
          description: "Password reset token invalid or expired.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    }
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

  const password = useRef({});
  password.current = watch("password", "");

  return (
    <>
      <Stack background="#2C5282" color="white" h="100vh">
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
              h={{ base: "6vh", sm: "8vh", md: "10vh", lg: "12vh", xl: "15vh" }}
              src={`${process.env.PUBLIC_URL}/images/ripple.png`}
              alt="Logo of HMCC"
            />

            <Text
              fontSize={[24, 24, 28, 32]}
              fontWeight="bold"
              textAlign="center"
            >
              Hi, you seem to have forgotten your password please enter your new
              password below.
            </Text>
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
              <VStack>
                {errors.password && (
                  <Text color="#F6AD55" fontSize={[12, 12, 12, 14]}>
                    {errors.password.message}
                  </Text>
                )}
                <Text>Enter Your New Password</Text>
                <input
                  id="password"
                  {...register("password", {
                    required: "required",
                    pattern: {
                      value:
                        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                      message: "Your Password isn't quite there yet", // JS only: <p>error message</p> TS only support string
                    },
                  })}
                  type="password"
                  name="password"
                  placeholder="Password"
                  style={inputBoxStyle}
                />

                <Center>
                  <Box maxW="300">
                    <Text color="#FED7D7" w="50vw" fontSize={[12, 12, 12, 14]}>
                      Your new password should consist of:
                    </Text>
                    <UnorderedList
                      color="#FED7D7"
                      w="300"
                      fontSize={[12, 12, 12, 14]}
                    >
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
                <Text>Re-enter Your New Password</Text>
                <input
                  id="password_repeat"
                  name="password_repeat"
                  {...register("password_repeat", {
                    required: "required",
                    validate: (value) =>
                      value === password.current ||
                      "The passwords do not match",
                  })}
                  type="password"
                  placeholder="Password"
                  style={inputBoxStyle}
                />

                {errors.password_repeat && (
                  <Text color="#F6AD55" fontSize={[12, 12, 12, 14]}>
                    {errors.password_repeat.message}
                  </Text>
                )}
                <Box py="3vh">
                  <input
                    type="submit"
                    name="change password"
                    value="Change Password"
                    style={submitBoxStyle}
                  />
                </Box>
              </VStack>
            </form>
          </VStack>
        </Flex>
      </Stack>
    </>
  );
};

export default ResetPassword;
