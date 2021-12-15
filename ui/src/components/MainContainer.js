import React from "react";
import { Switch } from "react-router-dom";
import { chakra } from "@chakra-ui/react";
import SermonContainer from "./sermons/SermonContainer";
import SermonCard from "./sermons/SermonCard";
import LoginContainer from "./auth/LoginContainer";
import EventsPage from "./events/EventsPage";
import VisitUsPage from "./visit-us/VisitUsPage";
import ConnectPage from "./connect/ConnectPage";
import PrivateRoute from "./helpers/PrivateRoute";
import HomeContainer from "./home/HomeContainer";
import FooterContainer from "./footer/FooterContainer";
import ConfirmEmailPage from "./email/ConfirmEmailPage";
import UserProfileContainer from "./userProfile/UserProfileContainer";
import CompleteUserProfileContainer from "./userProfile/CompleteUserProfile";
import GivingPage from "./giving/GivingPage";
import ClearCache from "./helpers/ClearCache";
import UserFormContainer from "./forms/UserFormContainer";
import NoMatch from "./errors/NoMatch";
import AdminLoginContainer from "./admin/AdminLoginContainer";
import AdminContainer from "./AdminContainer";
import ScrollToTop from "./helpers/ScrollToTop";
import AboutUsContainer from "./about/AboutUsContainer";

const MainContainer = () => {
  return (
    <chakra.main flexGrow={1} bg="#ffffff" overflowY="auto">
      <ScrollToTop />
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
          path="/forms/:id"
          permissions={["public"]}
          component={UserFormContainer}
        />
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
        <PrivateRoute
          exact
          path="/give"
          permissions={["public"]}
          component={GivingPage}
        />
        <PrivateRoute
          exact
          path="/about-us"
          permissions={["public"]}
          component={AboutUsContainer}
        />
        <PrivateRoute
          exact
          path="/email/confirm/:token"
          permissions={["public"]}
          component={ConfirmEmailPage}
        />
        <PrivateRoute
          exact
          path="/complete-profile"
          permissions={["unsigned", "signed", "alumni", "admin", "stewardship"]}
          component={CompleteUserProfileContainer}
        />
        <PrivateRoute
          exact
          path="/profile"
          permissions={["unsigned", "signed", "alumni", "admin", "stewardship"]}
          component={UserProfileContainer}
        />
        <PrivateRoute
          exact
          path="/clear-cache/"
          permissions={["admin", "stewardship"]}
          component={ClearCache}
        />
        <PrivateRoute
          exact
          path="/admin/login"
          permissions={["noUser"]}
          component={AdminLoginContainer}
        />
        <PrivateRoute
          exact
          path="/admin/:pageName"
          permissions={["admin", "stewardship"]}
          component={AdminContainer}
        />
      </Switch>
      <FooterContainer />
    </chakra.main>
  );
};

export default MainContainer;
