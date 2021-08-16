import {
  Button,
  Flex,
  Heading,
  Input,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import axios from "axios";
import GoogleLogin from "react-google-login";

const AdminLoginContainer = (props) => {
  const { toggleColorMode } = useColorMode();
  const formBackground = useColorModeValue("gray.100", "gray.700");

  const { classes } = props;
  const [token, setToken] = useState("null token");

  const postLogin = async () => {
    try {
      const { data } = await axios.post("/api/auth/login", {
        emailAddress: "elon@example.com",
        password: "123456",
        fullName: "Elon Musk",
      });
      setToken(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {}, []);

  return (
    <Flex alignItems="center" justifyContent="center">
      <Flex direction="column" bg={formBackground} p={12} rounded={6}>
        <Heading mb={6} alignItems="center">
          HMCC-HK Admin
        </Heading>
        <Input placeholder="Email" variant="filled" mb={3} type="email"></Input>
        <Input
          placeholder="Password"
          variant="filled"
          mb={6}
          type="password"
        ></Input>
        <Button mb={6} colorScheme="teal">
          Log in
        </Button>
        <Button onClick={toggleColorMode}>Toggle Color Mode</Button>
      </Flex>
    </Flex>
  );
};

export default AdminLoginContainer;
