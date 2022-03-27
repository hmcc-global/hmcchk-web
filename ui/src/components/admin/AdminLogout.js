import { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { signout } from "../../reducers/userSlice";

const AdminLogout = (props) => {
  const dispatch = useDispatch();

  const onLogout = useCallback(() => {
    localStorage.clear();
    dispatch(signout());
    props.history.push("/admin/login");
  },[dispatch, props.history]);

  useEffect(() => {
    onLogout();
  }, [onLogout]);

  return null;
};

export default AdminLogout;
