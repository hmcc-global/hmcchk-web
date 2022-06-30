import { Route } from "react-router-dom";
import NoMatch from "../errors/NoMatch";
import HomeContainer from "../home/HomeContainer";
import { useSelector } from "react-redux";
import { updateAxiosClient } from "./customAxios";
import axios from "axios";
import { useEffect, useState } from "react";
import UserProfileContainer from "../userProfile/UserProfileContainer";
import CompleteUserProfileContainer from "../userProfile/CompleteUserProfile";

const PrivateRoute = ({ component: Component, permissions, ...rest }) => {
  const user = useSelector((state) => state.user);
  const [userObj, setUserObj] = useState(null);

  const checkIfTokenExists = async (toVerify) => {
    try {
      const { data } = await axios.post("/api/auth/verify-token", {
        token: toVerify,
      });
      updateAxiosClient(toVerify);
      return data;
    } catch (err) {
      if (err.response.data.raw === "token-expired") {
        localStorage.clear();
        window.location.reload();
      }
      return {};
    }
  };

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
  const noUser = permissions.includes("noUser");
  const isPublic = permissions.includes("public");
  const access =
    isPublic ||
    permissions.some(
      (p) =>
        userObj != null &&
        Object.keys(userObj).length !== 0 &&
        p === userObj.accessType
    );

  return (
    userObj != null && (
      <Route
        {...rest}
        render={(props) => {
          if (noUser) {
            if (noTokenExists) return <Component {...props} />;
            else {
              switch (props.location.pathname) {
                case "/login":
                  if (user) {
                    props.history.push("/profile");
                    return <UserProfileContainer {...props} user={userObj} />;
                  }
                  break;
              }
              props.history.push("/");
              return <HomeContainer {...props} user={userObj} />;
            }
          } else if (access) {
            switch (props.location.pathname) {
              case "/complete-profile":
                if (userObj.hasFilledProfileForm) {
                  props.history.push("/profile");
                  return <UserProfileContainer {...props} user={userObj} />;
                }
                break;
              case "/profile":
                if (!userObj.hasFilledProfileForm) {
                  props.history.push("/complete-profile");
                  return (
                    <CompleteUserProfileContainer {...props} user={userObj} />
                  );
                }
                break;
            }

            return <Component {...props} {...rest} user={userObj} />;
          } else {
            return <NoMatch user={userObj} />;
          }
        }}
      />
    )
  );
};

export default PrivateRoute;
