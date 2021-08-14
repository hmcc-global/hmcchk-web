import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { Switch, Redirect, Route } from "react-router-dom";
import LuxonUtils from "@date-io/luxon";
import { MuiPickersUtilsProvider } from "material-ui-pickers";
import SermonContainer from "./sermons/SermonContainer";
import SermonCard from "./sermons/SermonCard";
import LoginContainer from "./auth/LoginContainer";
import FooterContainer from "./footer/FooterContainer";

const styles = (theme) => ({
  content: {
    flexGrow: 1,
    backgroundColor: "#282c34",
    padding: theme.spacing(3),
    minWidth: 0,
    overflowY: "auto",
  },
  toolbar: {
    minHeight: "46px",
  },
});

const MainContainer = (props) => {
  const { classes } = props;

  return (
    <main className={classes.content}>
      <MuiPickersUtilsProvider utils={LuxonUtils}>
        <div className={classes.toolbar} />
        <Switch>
          <Route exact path="/login" component={LoginContainer} />
          <Route exact path="/sermons" component={SermonContainer} />
          <Route exact path="/sermons/:id" component={SermonCard} />
          <Redirect to="/sermons" />
        </Switch>
      </MuiPickersUtilsProvider>
<<<<<<< Updated upstream
      <box w='100%' minHeight='200px'>
              <FooterContainer />
            </box>
=======
<<<<<<< Updated upstream
=======
            <box w='100%' minHeight='200px'>
              <FooterContainer />
            </box>
>>>>>>> Stashed changes
>>>>>>> Stashed changes
    </main>
  );
};

MainContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainContainer);
