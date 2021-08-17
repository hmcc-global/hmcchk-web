import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { signin } from "../../reducers/userSlice";
import Login from "./Login";
import Signup from './Signup';
import { Switch, Route, Redirect } from "react-router-dom";

const LoginContainer = (props) => {
  const { classes } = props;
  const [token, setToken] = useState("null token");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const postLogin = async (email, password) => {
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

  return (
    <>
      <Switch>
        <Route exact path='/login' component={Login} />
        <Route path='/login/:signup' component={Signup} />
      </Switch>
    </>
  );
};

export default LoginContainer;
