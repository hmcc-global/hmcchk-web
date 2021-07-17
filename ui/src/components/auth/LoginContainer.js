import { useEffect, useState } from "react";
import axios from "axios";
import withStyles from "@material-ui/core/styles/withStyles";
import { Card, Paper } from "@material-ui/core";
import GoogleLogin from "react-google-login";

const styles = (theme) => ({});

const LoginContainer = (props) => {
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

  useEffect(() => {
    //postLogin();
  }, []);

  const responseGoogle = async (response) => {
    // console.log(test);
    const basicProfile = response.getBasicProfile();
    // console.log(basicProfile);
    const email = basicProfile.getEmail();
    // console.log(email);
    //https://developers.google.com/identity/sign-in/web/backend-auth
    //const { id_token } = response.getAuthResponse();

    const { data } = await axios.post("/api/auth/signup-google", {
      idToken: email,
    });
  };

  return (
    <div className={classes.app}>
      <Paper className={classes.paper}>
        <Card>hello login</Card>
        <Card>
          <GoogleLogin
            clientId="99075377276-tklfjgh5rf0fp60bo9olmv78aa0chngu.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
        </Card>
      </Paper>
    </div>
  );
};

export default withStyles(styles)(LoginContainer);
