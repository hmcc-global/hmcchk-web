import { Route } from "react-router-dom";
import NoMatch from "../errors/NoMatch";
import HomeContainer from "../home/HomeContainer";
import { useSelector } from "react-redux";
import { updateAxiosClient } from "./customAxios";
import axios from "axios";
import { useEffect, useState } from "react";

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
      return {};
    }
  };

  useEffect(async () => {
    let obj = await checkIfTokenExists(user);
    setUserObj(obj);
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
        p === user.accessType
    );

  return (
    userObj != null && (
      <Route
        {...rest}
        render={(props) => {
          if (noUser) {
            if (noTokenExists) return <Component {...props} />;
            else {
              props.history.push("/");
              return <HomeContainer {...props} user={userObj} />;
            }
          } else if (access) {
            return <Component {...props} user={userObj} />;
          } else {
            return <NoMatch user={userObj} />;
          }
        }}
      />
    )
  );
};

export default PrivateRoute;
