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

  useEffect(() => {}, []);

  const onGoogleSuccess = async ({ tokenId }) => {
    const { data } = await axios.post("/api/auth/signup-google", {
      tokenId: tokenId,
    });
  };

  const onGoogleFailure = ({ error }) => {
    console.log(error);
  };

  return (
    <div className={classes.app}>
      <Paper className={classes.paper}>
        <Card>hello login</Card>
        <Card>
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            buttonText="Login"
            onSuccess={onGoogleSuccess}
            onFailure={onGoogleFailure}
            cookiePolicy={"single_host_origin"}
          />
        </Card>
      </Paper>
    </div>
  );
};

export default withStyles(styles)(LoginContainer);
