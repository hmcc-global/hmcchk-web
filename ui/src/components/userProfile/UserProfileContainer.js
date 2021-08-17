import { Container, Image, Button } from "@chakra-ui/react";
import UserProfileDesktop from "./UserProfileDesktop";
import UserProfileMobile from "./UserProfileMobile";
import axios from "axios";
import { useDispatch } from "react-redux";
import { signin } from "../../reducers/userSlice";

const UserProfileContainer = (props) => {
  const dispatch = useDispatch();
  return (
    <>
      <Image
        position="absolute"
        top="35%"
        left="0"
        w="75%"
        zIndex="0"
        src={process.env.PUBLIC_URL + "/userProfile/hmcc-ripple-white.png"}
        display={["none", "block"]}
      />
      <Button
        onClick={async () => {
          const { data } = await axios.post("/api/auth/login", {
            emailAddress: "ghost@test.com",
            password: "passwordlol",
          });
          dispatch(signin(data));
        }}
      >
        HELP
      </Button>
      <Container
        maxW="container.lg"
        zIndex="2"
        position="relative"
        display={{ base: "none", md: "block" }}
      >
        <UserProfileDesktop />
      </Container>

      <Container
        maxW="container.lg"
        zIndex="2"
        position="relative"
        display={{ base: "block", md: "none" }}
      >
        <UserProfileMobile />
      </Container>
    </>
  );
};

export default UserProfileContainer;
