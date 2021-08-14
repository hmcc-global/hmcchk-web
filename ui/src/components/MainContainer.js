import React from "react";
import PropTypes from "prop-types";
import { Switch, Redirect, Route } from "react-router-dom";
import { chakra } from "@chakra-ui/react";
import SermonContainer from "./sermons/SermonContainer";
import SermonCard from "./sermons/SermonCard";
import LoginContainer from "./auth/LoginContainer";
<<<<<<< HEAD
=======
import FormManager from "./forms/FormManager";
import EventsPage from "./events/EventsPage";
>>>>>>> 80e2fd6ac471f2dc433aa8bc7b6ef92e321c85b0
import FooterContainer from "./footer/FooterContainer";

const MainContainer = () => {
  return (
    <>
      <chakra.main flexGrow={1} bg="#282c34" overflowY="auto">
        <Switch>
          <Route exact path="/login" component={LoginContainer} />
          <Route exact path="/sermons" component={SermonContainer} />
          <Route exact path="/sermons/:id" component={SermonCard} />
          <Route exact path="/forms/" component={FormManager} />
          <Route exact path="/events/" component={EventsPage} />
          <Redirect to="/sermons" />
        </Switch>
<<<<<<< HEAD
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
=======
        <FooterContainer />
      </chakra.main>
    </>
>>>>>>> 80e2fd6ac471f2dc433aa8bc7b6ef92e321c85b0
  );
};

MainContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default MainContainer;
