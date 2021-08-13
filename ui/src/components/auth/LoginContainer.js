import { useEffect, useState } from "react";
import axios from "axios";
import GoogleLogin from "react-google-login";
import { useSelector, useDispatch } from "react-redux";
import { signin } from "../../reducers/userSlice";
import { Box } from "@chakra-ui/react";

const LoginContainer = (props) => {
  const { classes } = props;
  // const [token, setToken] = useState("null token");
  // const dispatch = useDispatch();
  // const user = useSelector((state) => state.user);

  // const postLogin = async () => {
  //   try {
  //     const { data } = await axios.post("/api/auth/login", {
  //       emailAddress: "albert@test.com",
  //       password: "testing",
  //     });
  //     // dispatch(signin(data));
  //     console.log(user);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(async () => {
  //   await postLogin();
  // }, []);

  // const onGoogleSuccess = async ({ tokenId }) => {
  //   const { data } = await axios.post("/api/auth/signup-google", {
  //     tokenId: tokenId,
  //   });
  // };

  // const onGoogleFailure = ({ error }) => {
  //   console.log(error);
  // };

  return (
    <Box>
      <Box color="white"></Box>
    </Box>
    // {/* <Paper className={classes.paper}>
    //   <Card>{user.email}</Card>
    //   <Card>
    //     <GoogleLogin
    //       clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
    //       buttonText="Login"
    //       onSuccess={onGoogleSuccess}
    //       onFailure={onGoogleFailure}
    //       cookiePolicy={"single_host_origin"}
    //     />
    //   </Card>
    // </Paper> */}
  );
};

export default LoginContainer;
