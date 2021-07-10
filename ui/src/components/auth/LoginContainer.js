import { useEffect, useState } from "react";
import axios from "axios";
import withStyles from "@material-ui/core/styles/withStyles";
import { Card, Paper } from "@material-ui/core";

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
    postLogin();
  }, []);

  return (
    <div className={classes.app}>
      <Paper className={classes.paper}>
        <Card>hello login</Card>
        <Card>{token}</Card>
      </Paper>
    </div>
  );
};

export default withStyles(styles)(LoginContainer);
