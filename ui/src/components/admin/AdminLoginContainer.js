import {
  Button,
  Flex,
  Heading,
  Input,
  useColorMode,
  useColorModeValue,
  useToast,
  Center,
  Stack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Redirect } from "react-router";
import GoogleLogin from "react-google-login";

const AdminLoginContainer = (props) => {
  const { toggleColorMode } = useColorMode();
  const formBackground = useColorModeValue("gray.100", "gray.700");
  const toast = useToast();

  const { classes } = props;
  const [token, setToken] = useState(null);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const postLogin = async (user) => {
    console.log(user);

    try {
      const result = await axios.post("/api/auth/login", {
        emailAddress: user.emailAddress,
        password: user.password,
      });
      console.log(result);

      if (result.status === 200) {
        if (
          result.data.accessType == "admin" ||
          result.data.accessType == "stewardship"
        ) {
          props.history.push("/admin/home");
        } else {
          toast({
            title: "Access denied.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      }
    } catch (err) {
      toast({
        title: "Something went wrong.",
        description: "Try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.log(err);
    }
  };

  useEffect(() => {}, []);

  return (
    <Flex height="85vh" alignItems="center" justifyContent="center">
      <Flex direction="column" bg={formBackground} p={12} rounded={6}>
        <form onSubmit={handleSubmit(postLogin)}>
          <Heading mb={6} alignItems="center">
            HMCC-HK Admin
          </Heading>
          <Input
            placeholder="Email"
            variant="filled"
            mb={3}
            type="email"
            {...register("emailAddress")}
          ></Input>
          <Input
            placeholder="Password"
            variant="filled"
            mb={6}
            type="password"
            {...register("password")}
          ></Input>
          <Center>
            <Button mb={6} colorScheme="teal" type="submit">
              Log in
            </Button>
          </Center>
        </form>
        <Button onClick={toggleColorMode}>Toggle Color Mode</Button>
      </Flex>
    </Flex>
  );
};

export default AdminLoginContainer;
