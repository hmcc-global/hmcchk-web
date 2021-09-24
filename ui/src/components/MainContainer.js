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
import PrivateRoute from "./helpers/PrivateRoute";
import HomeContainer from "./home/HomeContainer";
import ConfirmEmailPage from "./email/ConfirmEmailPage";
import UserProfileContainer from "./userProfile/UserProfileContainer";
import CompleteUserProfileContainer from "./userProfile/CompleteUserProfile";
import ClearCache from "./helpers/ClearCache";
import AdminLoginContainer from "./admin/AdminLoginContainer";
import AdminHome from "./admin/AdminHome";
import AdminUser from "./admin/users/AdminUser";
import AdminForm from "./admin/AdminForm";
import AdminGiving from "./admin/AdminGiving";

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
          path="/admin"
          permissions={["noUser"]}
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
          //permissions={["noUser"]}
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
          path="/clear-cache/"
          permissions={["admin", "stewardship"]}
          component={ClearCache}
        />
        <PrivateRoute path="*" permissions={["public"]} component={NoMatch} />
        <PrivateRoute
          path="/admin/giving"
          permissions={["stewardship"]}
          //permissions={["noUser"]}
          component={AdminGiving}
        />
      </Switch>
    </chakra.main>
  );
};

export default MainContainer;
