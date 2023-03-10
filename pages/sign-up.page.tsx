import { useContext } from 'react';
import UserContext from '../src/services/auth/UserContext';

const SignUp = () => {
  const user = useContext(UserContext);
  return <div>{user ? `${user.name} is already logged in` : 'Sign Up'}</div>;
};

export default SignUp;
