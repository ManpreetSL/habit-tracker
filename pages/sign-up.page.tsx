import Button from '../components/Button';
import useAuth from '../src/services/auth/useAuth';
import useUser from '../src/services/auth/useUser';

const SignUp = () => {
  const { signUp } = useAuth();
  const { user } = useUser();

  const handleSignUp = () => signUp('Laxus@fairytail.guild', 'FairyHeart1313');

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
