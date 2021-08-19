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
import AdminLoginContainer from "./admin/AdminLoginContainer";
import AdminHome from "./admin/AdminHome";
import AdminUser from "./admin/users/AdminUser";
import AdminForm from "./admin/AdminForm";
import AdminGiving from "./admin/AdminGiving";
import FooterContainer from "./footer/FooterContainer";
import NoMatch from "./errors/NoMatch";
import ConnectFloatButton from "./connect-float/ConnectFloatButton";
import UserFormContainer from "./forms/UserFormContainer";
import UserProfileContainer from "./userProfile/UserProfileContainer";
import CompleteUserProfileContainer from "./userProfile/CompleteUserProfile";

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
          path="/form-manager"
          permissions={["admin", "stewardship"]}
          component={FormManager}
        />
        <PrivateRoute
          exact
          path="/forms/:id"
          permissions={["unsigned", "signed", "alumni", "admin", "stewardship"]}
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
          path="/admin"
          permissions={["admin", "stewardship"]}
          component={AdminLoginContainer}
        />
        <PrivateRoute
          exact
          path="/admin/home"
          permissions={["admin", "stewardship"]}
          component={AdminHome}
        />
        <PrivateRoute
          exact
          path="/admin/users"
          permissions={["admin", "stewardship"]}
          component={AdminUser}
        />
        <PrivateRoute
          exact
          path="/admin/forms"
          permissions={["admin", "stewardship"]}
          component={AdminForm}
        />
        <PrivateRoute
          exact
          path="/admin/giving"
          permissions={["stewardship"]}
          component={AdminGiving}
        />
        <PrivateRoute
          exact
          path="/connect"
          permissions={["public"]}
          component={ConnectPage}
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
        <PrivateRoute path="*" permissions={["public"]} component={NoMatch} />
      </Switch>
      <FooterContainer />
      <ConnectFloatButton />
    </chakra.main>
  );
};

export default MainContainer;
