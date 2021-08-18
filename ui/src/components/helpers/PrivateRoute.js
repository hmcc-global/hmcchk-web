import { Route } from "react-router-dom";
import NoMatch from "../errors/NoMatch";
import HomeContainer from "../home/HomeContainer";
import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, permissions, ...rest }) => {
  const user = useSelector((state) => state.user);

  const noUser = permissions.includes("noUser");
  const isPublic = permissions.includes("public");
  const access = isPublic || permissions.some((p) => p === user.accessType);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (noUser) {
          if (Object.keys(user).length === 0) return <Component {...props} />;
          else {
            props.history.push("/");
            return <HomeContainer {...props} />;
          }
        } else if (access) {
          return <Component {...props} />;
        } else {
          return <NoMatch />;
        }
      }}
    />
  );
};

export default PrivateRoute;
