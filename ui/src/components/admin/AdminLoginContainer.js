import {
  Button,
  Flex,
  Heading,
  Input,
  useColorMode,
  useColorModeValue,
  useToast,
  Center,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { customAxios as axios } from "../helpers/customAxios";
import { useDispatch } from "react-redux";
import { signin } from "../../reducers/userSlice";

const AdminLoginContainer = (props) => {
  const { toggleColorMode } = useColorMode();
  const formBackground = useColorModeValue("gray.100", "gray.700");
  const toast = useToast();
  const dispatch = useDispatch();

  const { handleSubmit, register } = useForm();

  const getUser = async (email) => {
    const { data } = await axios.get("/api/users/get");
  };

  const postLogin = async (user) => {
    try {
      const checkAccess = await axios.post("/api/auth/login", {
        emailAddress: user.emailAddress,
        password: user.password,
      });

      const result = await axios.post("/api/auth/login", {
        emailAddress: user.emailAddress,
        password: user.password,
      });

      if (result.status === 200) {
        dispatch(signin(result.data));
        props.history.push("/admin/home");
      } else {
        toast({
          title: "Access denied.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      toast({
        title: "Something went wrong.",
        description: "Try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex height="85vh" alignItems="center" justifyContent="center">
      <Flex direction="column" bg={formBackground} p={12} rounded={6}>
        <Heading mb={6} alignItems="center">
          HMCC-HK Admin
        </Heading>
        <form onSubmit={handleSubmit(postLogin)}>
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
