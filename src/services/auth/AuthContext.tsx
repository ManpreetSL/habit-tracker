import { User } from 'firebase/auth';
import { createContext, ReactNode, useState, useEffect, useMemo } from 'react';
import nookies from 'nookies';
import { auth } from './firebase';
import { signUp, signIn, signOut } from './manage-users';

const AuthContext = createContext({
  user: null as User | null,
  loading: false,
  signUp,
  signIn,
  signOut,
});

type AuthProviderProps = { children: ReactNode };

const AuthProvider = ({ children, ...props }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleIdTokenChanged = async (authState: User | null) => {
      if (!authState) {
        setLoading(true);
        setUser(null);
        nookies.set(undefined, 'token', '', { path: '/' });
        setLoading(false);
      } else {
        setLoading(true);
        const token = await authState.getIdToken();
        nookies.set(undefined, 'token', token, { path: '/' });
        setUser(authState);
        setLoading(false);

        // Emulate a delay to show the loading screen whilst we work on customising it
        // setTimeout(() => setLoading(false), 300);
      }
    };

    // onIdTokenChanged is identical to onAuthStateChanged but it also fires when the user's ID token is refreshed.
    const unsubscribe = auth.onIdTokenChanged(handleIdTokenChanged);

    return () => {
      unsubscribe();
    };
  }, []);

  // Refresh the token every 10 minutes
  useEffect(() => {
    const intervalId = setInterval(async () => {
      const { currentUser } = auth;
      if (currentUser) await currentUser.getIdToken(true);
    }, 10 * 60 * 1000);

    return () => clearInterval(intervalId);
  });

  const authContextValue = useMemo(
    () => ({ user, loading, signUp, signIn, signOut }),
    [loading, user]
  );

  return (
    <AuthContext.Provider value={authContextValue} {...props}>
      {loading ? 'Loading...' : children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
