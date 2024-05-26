import { Route } from 'react-router-dom';
import ErrorPage from '../screens/ErrorPage';
import HomeContainer from '../home/HomeContainer';
import { useSelector } from 'react-redux';
import { updateAxiosClient } from './customAxios';
import axios from 'axios';
import { useEffect, useState } from 'react';
import UserProfileContainer from '../userProfile/UserProfileContainer';
import CompleteUserProfileContainer from '../userProfile/CompleteUserProfile';
import SidebarWithHeader from '../admin/navigation/Sidebar';

const PrivateRoute = ({ component: Component, permissions, ...rest }) => {
  const user = useSelector((state) => state.user);
  const [userObj, setUserObj] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [staticData, setStaticData] = useState();

  const checkIfTokenExists = async (toVerify) => {
    try {
      setIsLoading(true);
      const { data } = await axios.post('/api/auth/verify-token', {
        token: toVerify,
      });
      setIsLoading(false);
      updateAxiosClient(toVerify);
      return data;
    } catch (err) {
      if (err.response.data.raw === 'token-expired') {
        localStorage.clear();
        window.location.reload();
      }
      setIsLoading(false);
      return {};
    }
  };

  useEffect(() => {
    async function getStatic() {
      const { data: lifegroupList } = await axios.get('/api/misc/get-latest-lifegroup-list');
      const { data: campusList } = await axios.get('/api/misc/get-latest-campus-list');
      const { data: lifestageList } = await axios.get('/api/misc/get-latest-lifestage-list');
      const { data: formAlertTypeList } = await axios.get('/api/forms/all-form-alert-types');
      const data = {
        lifegroupList,
        campusList,
        lifestageList,
        formAlertTypeList,
      };
      setStaticData(data);
    }

    getStatic();
  }, [])

  useEffect(() => {
    // useEffects are meant to be synchronous, this helps to remove the warning
    async function fetch() {
      let obj = await checkIfTokenExists(user);
      setUserObj(obj);
    }

    fetch();
  }, [user]);

  // check if Token exists in redux store
  const noTokenExists = Object.keys(user).length === 0;
  const noUser = permissions.includes('noUser');
  const isPublic = permissions.includes('public');
  const access =
    isPublic ||
    permissions.some(
      (p) =>
        userObj != null &&
        Object.keys(userObj).length !== 0 &&
        p === userObj.accessType
    );

  return (
    !isLoading &&
    userObj != null && 
    staticData != null &&
    (
      <Route
        {...rest}
        render={(props) => {
          props.staticData = staticData;

          if (noUser) {
            if (noTokenExists) return <Component {...props} />;
            else {
              switch (props.location.pathname) {
                case '/login':
                  if (user) {
                    props.history.push('/profile');
                    return <UserProfileContainer {...props} user={userObj} />;
                  }
                  break;
              }
              props.history.push('/');
              return <HomeContainer {...props} user={userObj} />;
            }
          } else if (access) {
            switch (props.location.pathname) {
              case '/complete-profile':
                if (userObj.hasFilledProfileForm) {
                  props.history.push('/profile');
                  return <UserProfileContainer {...props} user={userObj} />;
                }
                break;
              case '/profile':
                if (!userObj.hasFilledProfileForm) {
                  props.history.push('/complete-profile');
                  return (
                    <CompleteUserProfileContainer {...props} user={userObj} />
                  );
                }
                break;
            }

            if (props.location.pathname.includes('admin'))
              return (
                <SidebarWithHeader>
                  <Component {...props} user={userObj} />
                </SidebarWithHeader>
              );

            return <Component {...props} user={userObj} />;
          } else {
            return <ErrorPage {...props} user={userObj} />;
          }
        }}
      />
    )
  );
};

export default PrivateRoute;
