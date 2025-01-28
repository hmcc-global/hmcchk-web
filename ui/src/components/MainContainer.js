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
import Footer from './footer/Footer';
import ConfirmEmailPage from './email/ConfirmEmailPage';
import UserProfileContainer from './userProfile/UserProfileContainer';
import CompleteUserProfileContainer from './userProfile/CompleteUserProfile';
import GivingPage from './giving/GivingPage';
import ClearCache from './helpers/ClearCache';
import RecoverPassword from './auth/RecoverPassword';
import ResetPassword from './auth/ResetPassword';
import PasswordSubmitted from './auth/PasswordSubmitted';
import UserFormContainer from './forms/UserFormContainer';
import ErrorPage from './screens/ErrorPage';
import ScrollToTop from './helpers/ScrollToTop';
import AboutUsContainer from './about/AboutUsContainer';
import OnlineSermonContainer from './sermons/OnlineSermonContainer';
import AdminHome from './admin/AdminHome';
import AdminUser from './admin/users/AdminUser';
import FormManager from './forms/FormManager';
import BaptismFollowUpContainer from './admin/follow-up/BaptismFollowUpContainer';
import AdminPopUpContainer from './admin/popup/AdminPopUpContainer';
import AdminFormDataViewer from './admin/forms/AdminFormDataViewer';
import AdminLiveSermonContainer from './admin/liveSermon/AdminLiveSermonContainer';
import SaturateContainer from './saturate/SaturateContainer';
import AdminTestimonyContainer from './admin/testimony/AdminTestimonyContainer';
import AdminAnnouncementContainer from './admin/announcements/AdminAnnouncementContainer';
import AdminLeadershipTeamContainer from './admin/leadershipTeam/AdminLeadershipTeamContainer';
import AdminSermonNotesContainer from './admin/sermonNotes/AdminSermonNotesContainer';
import SermonNotesContainer from './sermon-notes/SermonNotesContainer';
import PrivacyPolicy from './screens/PrivacyPolicy';
import AdminFundraiseContainer from './admin/fundraise/AdminFundraiseContainer';

const MainContainer = () => {
  return (
    <chakra.main
      maxH="100%"
      flexGrow={1}
      bg="#F6FAFF"
      overflowY="auto"
      id="main-container"
      overflowX="hidden"
      // Added to allow the navbar to overlay the container with minimal offset
      mt="7vh"
      mb={['6vh', '6vh', 0, 0]}
    >
      <ScrollToTop />
      <Switch>
        <PrivateRoute
          exact
          path="/privacy-policy"
          permissions={['public']}
          component={PrivacyPolicy}
        />
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
          path="/sermons/notes/:id"
          permissions={['public']}
          component={SermonNotesContainer}
        />
        <PrivateRoute
          exact
          path="/forms/:id"
          permissions={['public']}
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
            'tc',
            'ministry',
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
            'tc',
            'ministry',
          ]}
          component={UserProfileContainer}
        />
        <PrivateRoute
          exact
          path="/saturate"
          permissions={['public']}
          component={SaturateContainer}
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
          permissions={['ministry', 'tc', 't3ch', 'admin', 'stewardship']}
          component={AdminHome}
        />
        <PrivateRoute
          exact
          path="/admin/home"
          permissions={['ministry', 'tc', 't3ch', 'admin', 'stewardship']}
          component={AdminHome}
        />
        <PrivateRoute
          exact
          path="/admin/forms"
          permissions={['tc', 't3ch', 'admin', 'stewardship']}
          component={FormManager}
        />
        <PrivateRoute
          exact
          path="/admin/announcements"
          permissions={['ministry', 'tc', 't3ch', 'admin', 'stewardship']}
          component={AdminAnnouncementContainer}
        />
        <PrivateRoute
          exact
          path="/admin/formViewer"
          permissions={['tc', 'admin', 'stewardship']}
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
          path="/admin/leadership-team"
          permissions={['admin', 'stewardship']}
          component={AdminLeadershipTeamContainer}
        />
        <PrivateRoute
          exact
          path="/admin/users"
          permissions={['admin', 'stewardship']}
          component={AdminUser}
        />
        <PrivateRoute
          exact
          path="/admin/followUp"
          permissions={['admin', 'stewardship']}
          component={BaptismFollowUpContainer}
        />
        <PrivateRoute
          exact
          path="/admin/sermonNotes"
          permissions={['ministry', 'tc', 't3ch', 'admin', 'stewardship']}
          component={AdminSermonNotesContainer}
        />
        <PrivateRoute
          exact
          path="/admin/sermonNotes/edit"
          permissions={['ministry', 'tc', 't3ch', 'admin', 'stewardship']}
          component={AdminSermonNotesContainer}
        />
        <PrivateRoute
          exact
          path="/admin/sermonNotes/edit/:id"
          permissions={['ministry', 'tc', 't3ch', 'admin', 'stewardship']}
          component={AdminSermonNotesContainer}
        />
        <PrivateRoute
          exact
          path="/admin/fundraise"
          permissions={['admin', 'stewardship']}
          component={AdminFundraiseContainer}
        />
        <PrivateRoute path="*" permissions={['public']} component={ErrorPage} />
      </Switch>
      <Footer />
    </chakra.main>
  );
};

export default MainContainer;
