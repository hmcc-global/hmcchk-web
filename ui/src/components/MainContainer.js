import React from "react";
import PropTypes from "prop-types";
import { Switch } from "react-router-dom";
import { chakra } from "@chakra-ui/react";
import SermonContainer from "./sermons/SermonContainer";
import SermonCard from "./sermons/SermonCard";
import LoginContainer from "./auth/LoginContainer";
import FormManager from "./forms/FormManager";
import EventsPage from "./events/EventsPage";
import VisitUsPage from "./visit-us/VisitUsPage";
import ConnectPage from "./connect/ConnectPage";
import PrivateRoute from "./helpers/PrivateRoute";
import Signup from "./auth/Signup";
import HomeContainer from "./home/HomeContainer";
import FooterContainer from "./footer/FooterContainer";

const MainContainer = () => {
  return (
    <chakra.main flexGrow={1} bg="#ffffff" overflowY="auto">
      <Switch>
        <PrivateRoute
          exact
          path="/"
          permissions={["public"]}
          component={HomeContainer}
        />
        <PrivateRoute
          exact
          path="/login"
          permissions={["noUser"]}
          component={LoginContainer}
        />
        <PrivateRoute
          exact
          path="/signup"
          permissions={["noUser"]}
          component={Signup}
        />
        <PrivateRoute
          exact
          path="/sermons"
          permissions={["public"]}
          component={SermonContainer}
        />
        <PrivateRoute
          exact
          path="/sermons/:id"
          permissions={["public"]}
          component={SermonCard}
        />
        <PrivateRoute
          exact
          path="/forms/"
          permissions={["admin", "stewardship"]}
          component={FormManager}
        />
        {/* <PrivateRoute
          exact
          path="/forms/:id"
          permissions={["unsigned", "signed", "alumni", "admin", "stewardship"]}
          component={FormManager}
        /> */}
        <PrivateRoute
          exact
          path="/events/"
          permissions={["public"]}
          component={EventsPage}
        />
        <PrivateRoute
          exact
          path="/visit-us"
          permissions={["public"]}
          component={VisitUsPage}
        />
        <PrivateRoute
          exact
          path="/connect"
          permissions={["public"]}
          component={ConnectPage}
        />
      </Switch>
      <FooterContainer />
    </chakra.main>
  );
};

export default MainContainer;
