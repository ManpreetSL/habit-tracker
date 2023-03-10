import { useContext } from 'react';
import UserContext from '../src/services/auth/UserContext';

const LogIn = () => {
  const user = useContext(UserContext);
  return <div>{user ? `${user.name} is already logged in` : 'Log In'}</div>;
};

export default LogIn;
