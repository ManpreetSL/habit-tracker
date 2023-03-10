import { useContext } from 'react';
import Button from '../components/Button';
import { signUp } from '../src/services/auth/manage-users';
import UserContext from '../src/services/auth/UserContext';

const SignUp = () => {
  const { user, setUser } = useContext(UserContext);

  const handleSignUp = async () => {
    signUp('Natsu@fairytail.guild', 'FairyHeart1313').then(setUser);
  };

  return (
    <div>
      {user ? (
        `${user.email} is already logged in`
      ) : (
        <Button onClick={handleSignUp}>Sign Up</Button>
      )}
    </div>
  );
};

export default SignUp;
