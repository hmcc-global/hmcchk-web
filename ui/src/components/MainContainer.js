import React from "react";
import PropTypes from "prop-types";
import { Switch, Redirect, Route } from "react-router-dom";
import { chakra } from "@chakra-ui/react";
import SermonContainer from "./sermons/SermonContainer";
import SermonCard from "./sermons/SermonCard";
import LoginContainer from "./auth/LoginContainer";
import FormManager from "./forms/FormManager";
import EventsPage from "./events/EventsPage";
import VisitUsPage from "./visit-us/VisitUsPage";

const MainContainer = () => {
  return (
    <chakra.main flexGrow={1} bg="#ffffff" overflowY="auto">
      <Switch>
        <Route exact path="/login" component={LoginContainer} />
        <Route exact path="/sermons" component={SermonContainer} />
        <Route exact path="/sermons/:id" component={SermonCard} />
        <Route exact path="/forms/" component={FormManager} />
        <Route exact path="/events/" component={EventsPage} />
        <Route exact path="/visit-us" component={VisitUsPage} />
        <Redirect to="/sermons" />
      </Switch>
    </chakra.main>
  );
};

MainContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default MainContainer;
