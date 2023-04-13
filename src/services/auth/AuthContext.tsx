import { User } from 'firebase/auth';
import { createContext, ReactNode, useState, useEffect, useMemo } from 'react';
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
    const handleAuthStateChanged = async (authState: User | null) => {
      if (!authState) {
        setUser(null);
        setLoading(false);
      } else {
        setLoading(true);
        setUser(authState);

        // Emulate a delay to show the loading screen whilst we work on customising it
        setTimeout(() => setLoading(false), 300);
      }
    };

    const unsubscribe = auth.onAuthStateChanged(handleAuthStateChanged);

    return () => {
      unsubscribe();
    };
  }, []);

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
