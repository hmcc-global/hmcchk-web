import { useEffect, useState } from "react";
import axios from "axios";

const HomeContainer = (props) => {
  const { classes } = props;
  return (
    <div className={classes.app}>
      <h1>HOME</h1>
    </div>
  );
};

export default HomeContainer;
