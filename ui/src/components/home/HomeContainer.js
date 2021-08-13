<<<<<<< HEAD
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@chakra-ui/react";

const HomeContainer = (props) => {
  const { classes } = props;

  const onLogout = () => {
    const { history } = props;
    localStorage.clear();
    history.push("/");
  };

  return (
    <div>
      <h1>HOME</h1>
      <Button onClick={onLogout}>LOGOUT</Button>
    </div>
  );
=======
import { Box } from "@chakra-ui/react";

const HomeContainer = (props) => {
  return <Box color="black">TEST</Box>;
>>>>>>> 8084246... GH-54: Add 404 error page
};

export default HomeContainer;
