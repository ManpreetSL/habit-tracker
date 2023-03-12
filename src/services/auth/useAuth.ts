import { useContext } from 'react';
import { AuthContext } from './AuthContext';

/** All that this hook should do is:
 * - Make the user accessible to any components that use the hook; and
 * - Expose methods from the context that allow us to update the user (sign in, sign up, etc.)
 * It should get the user info and methods from the context provider - put all logic there
 */
const useAuth = () => {
  const { user, loading, signUp, signIn, signOut } = useContext(AuthContext);

  const isLoading = loading;

  return {
    user,
    isLoading,
    signUp,
    signIn,
    signOut,
  };
};

export default useAuth;
