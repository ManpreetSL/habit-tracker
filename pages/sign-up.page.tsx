import Button from '../components/Button';
import useAuth from '../src/services/auth/useAuth';

const SignUp = () => {
  const { user, signUp } = useAuth();

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
