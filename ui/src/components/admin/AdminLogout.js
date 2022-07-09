import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { signout } from '../../reducers/userSlice';

const AdminLogout = (props) => {
  const dispatch = useDispatch();

  const onLogout = () => {
    localStorage.clear();
    dispatch(signout());
    props.history.push('/admin');
  };

  useEffect(() => {
    onLogout();
  }, []);

  return null;
};

export default AdminLogout;
