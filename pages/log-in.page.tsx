import Button from '../components/Button';
import useAuth from '../src/services/auth/useAuth';

const LogIn = () => {
  const { user, signIn, signOut } = useAuth();

  const handleLogIn = () => {
    signIn('Natsu@fairytail.guild', 'FairyHeart1313');
  };

  const handleSignOut = () => {
    signOut();
  };

  return (
    <div>
      {user ? (
        <>
          <p>{user.displayName || user.email} is already logged in</p>
          <Button onClick={handleSignOut}>Sign out</Button>
        </>
      ) : (
        <Button onClick={handleLogIn}>Log In</Button>
      )}
    </div>
  );
};

export default LogIn;
