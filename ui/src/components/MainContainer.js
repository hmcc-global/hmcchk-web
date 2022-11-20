import React from 'react';
import { Switch } from 'react-router-dom';
import { chakra } from '@chakra-ui/react';
import SermonContainer from './sermons/SermonContainer';
import SermonDetails from './sermons/SermonDetails';
import LoginContainer from './auth/LoginContainer';
import SignupContainer from './auth/SignupContainer';
import EventsPage from './events/EventsPage';
import VisitUsPage from './visit-us/VisitUsPage';
import ConnectPage from './connect/ConnectPage';
import PrivateRoute from './helpers/PrivateRoute';
import Signup from './auth/Signup';
import HomeContainer from './home/HomeContainer';
import FooterContainer from './footer/FooterContainer';
import ConfirmEmailPage from './email/ConfirmEmailPage';
import UserProfileContainer from './userProfile/UserProfileContainer';
import CompleteUserProfileContainer from './userProfile/CompleteUserProfile';
import GivingPage from './giving/GivingPage';
import ClearCache from './helpers/ClearCache';
import RecoverPassword from './auth/RecoverPassword';
import ResetPassword from './auth/ResetPassword';
import PasswordSubmitted from './auth/PasswordSubmitted';
import ConnectFloatButton from './connect-float/ConnectFloatButton';
import UserFormContainer from './forms/UserFormContainer';
import ErrorPage from './screens/ErrorPage';
import ScrollToTop from './helpers/ScrollToTop';
import AboutUsContainer from './about/AboutUsContainer';
import OnlineSermonContainer from './sermons/OnlineSermonContainer';
import AdminHome from './admin/AdminHome';
import AdminUser from './admin/users/AdminUser';
import FormManager from './forms/FormManager';
import AdminPopUpContainer from './admin/popup/AdminPopUpContainer';
import AdminFormDataViewer from './admin/forms/AdminFormDataViewer';
import AdminLiveSermonContainer from './admin/liveSermon/AdminLiveSermonContainer';
import WitnessContainer from './witness/WitnessContainer';
import VideoDetails from './witness/video-testimony/VideoDetails';
import WitnessHomeContainer from './witness/WitnessHomeContainer';
import AdminTestimonyContainer from './admin/testimony/AdminTestimonyContainer';
import TextDetails from './witness/text-testimony/TextDetails';
import MissionsMonthContainer from './missions-month/MissionsMonthContainer';
import GivingTuesdayPage from './givingTuesday/GivingTuesdayPage';

const MainContainer = () => {
  return (
    <chakra.main
      maxH="100vh"
      flexGrow={1}
      bg="#ffffff"
      overflowY="auto"
      id="main-container"
    >
      <ScrollToTop />
      <Switch>
        <PrivateRoute
          exact
          path="/"
          permissions={['public']}
          component={HomeContainer}
        />
        <PrivateRoute
          exact
          path="/login"
          permissions={['noUser']}
          component={LoginContainer}
        />
        <PrivateRoute
          exact
          path="/signup"
          permissions={['noUser']}
          component={SignupContainer}
        />
        <PrivateRoute
          exact
          path="/password/recover"
          permissions={['public']}
          component={RecoverPassword}
        />
        <PrivateRoute
          exact
          path="/password/new"
          permissions={['public']}
          component={ResetPassword}
        />
        <PrivateRoute
          exact
          path="/password/submitted"
          permissions={['public']}
          component={PasswordSubmitted}
        />
        <PrivateRoute
          exact
          path="/signup/form"
          permissions={['noUser']}
          component={Signup}
        />
        <PrivateRoute
          exact
          path={['/online']}
          permissions={['public']}
          component={OnlineSermonContainer}
        />
        <PrivateRoute
          exact
          path={['/sermons']}
          permissions={['public']}
          component={SermonContainer}
        />
        <PrivateRoute
          exact
          path="/sermons/:id"
          permissions={['public']}
          component={SermonDetails}
        />
        <PrivateRoute
          exact
          path="/forms/:id"
          permissions={['public']}
          component={UserFormContainer}
        />
        <PrivateRoute
          exact
          path="/forms/:id"
          permissions={[
            'unsigned',
            'signed',
            'alumni',
            't3ch',
            'admin',
            'stewardship',
          ]}
          component={UserFormContainer}
        />
        <PrivateRoute
          exact
          path="/events/"
          permissions={['public']}
          component={EventsPage}
        />
        <PrivateRoute
          exact
          path="/visit-us"
          permissions={['public']}
          component={VisitUsPage}
        />
        <PrivateRoute
          exact
          path="/connect"
          permissions={['public']}
          component={ConnectPage}
        />
        <PrivateRoute
          exact
          path="/give"
          permissions={['public']}
          component={GivingPage}
        />
        <PrivateRoute
          exact
          path="/about-us"
          permissions={['public']}
          component={AboutUsContainer}
        />
        <PrivateRoute
          exact
          path="/missions-month"
          permissions={['public']}
          component={MissionsMonthContainer}
        />
        <PrivateRoute
          exact
          path="/email/confirm/:token"
          permissions={['public']}
          component={ConfirmEmailPage}
        />
        <PrivateRoute
          exact
          path="/complete-profile"
          permissions={[
            'unsigned',
            'signed',
            'alumni',
            't3ch',
            'admin',
            'stewardship',
          ]}
          component={CompleteUserProfileContainer}
        />
        <PrivateRoute
          exact
          path="/profile"
          permissions={[
            'unsigned',
            'signed',
            'alumni',
            't3ch',
            'admin',
            'stewardship',
          ]}
          component={UserProfileContainer}
        />
        <PrivateRoute
          exact
          path="/complete-profile"
          permissions={[
            'unsigned',
            'signed',
            'alumni',
            't3ch',
            'admin',
            'stewardship',
          ]}
          component={CompleteUserProfileContainer}
        />
        <PrivateRoute
          exact
          path="/profile"
          permissions={[
            'unsigned',
            'signed',
            'alumni',
            't3ch',
            'admin',
            'stewardship',
          ]}
          component={UserProfileContainer}
        />
        <PrivateRoute
          exact
          path="/witness/testimonies/videos/:id"
          permissions={['public']}
          component={VideoDetails}
        />
        <PrivateRoute
          exact
          path="/witness/testimonies/:resource?"
          permissions={['public']}
          component={WitnessContainer}
        />
        <PrivateRoute
          exact
          path="/witness/home"
          permissions={['public']}
          component={WitnessHomeContainer}
        />
        <PrivateRoute
          path="/witness/testimonies/text/:id"
          permissions={['public']}
          component={TextDetails}
        />

        {/* Admin items */}
        <PrivateRoute
          exact
          path="/clear-cache/"
          permissions={['t3ch', 'admin', 'stewardship']}
          component={ClearCache}
        />
        <PrivateRoute
          exact
          path="/admin"
          permissions={['t3ch', 'admin', 'stewardship']}
          component={AdminHome}
        />
        <PrivateRoute
          exact
          path="/admin/home"
          permissions={['t3ch', 'admin', 'stewardship']}
          component={AdminHome}
        />
        <PrivateRoute
          exact
          path="/admin/forms"
          permissions={['t3ch', 'admin', 'stewardship']}
          component={FormManager}
        />
        <PrivateRoute 
          exact
          path="/admin/formViewer"
          permissions={['t3ch', 'admin', 'stewardship']}
          component={AdminFormDataViewer}
        />
        <PrivateRoute 
          exact
          path="/admin/liveSermon"
          permissions={['t3ch', 'admin', 'stewardship']}
          component={AdminLiveSermonContainer}
        />
        <PrivateRoute
          exact
          path="/admin/testimony"
          permissions={['t3ch', 'admin', 'stewardship']}
          component={AdminTestimonyContainer}
        />
        <PrivateRoute
          exact
          path="/admin/popup"
          permissions={['t3ch', 'admin', 'stewardship']}
          component={AdminPopUpContainer}
        />
        <PrivateRoute
          exact
          path="/admin/users"
          permissions={['admin', 'stewardship']}
          component={AdminUser}
        />
        <PrivateRoute
          path="/giving-tuesday"
          permissions={['public']}
          component={GivingTuesdayPage}
        />
        <PrivateRoute path="*" permissions={['public']} component={ErrorPage} />
      </Switch>
      <FooterContainer />
      <ConnectFloatButton />
    </chakra.main>
  );
};

export default MainContainer;
