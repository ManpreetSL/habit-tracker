import { createContext, ReactNode, useEffect, useMemo, useState } from 'react';
import useAuth from './useAuth';

type User = {
  name?: string;
  uid: string;
  email: string | null;
  isAnonymous: boolean;
};

type UserContextParams = {
  user: User | null;
};

const UserContext = createContext<UserContextParams>({
  user: null,
});

type FormatUserParams = {
  uid: string;
  email: string | null;
  isAnonymous: boolean;
} | null;

const formatUser = (params: FormatUserParams) => {
  if (!params) return null;

  const { uid, email, isAnonymous } = params;

  return { uid, email, isAnonymous };
};

type UserProviderProps = {
  children: ReactNode;
};

const UserProvider = ({ children, ...props }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const { user: authUser } = useAuth();

  // Extract what we want from the authUser and return it as a user here
  useEffect(() => {
    setUser(formatUser(authUser));
  }, [authUser]);

  const userContextValue = useMemo(() => ({ user }), [user]);

  return (
    <UserContext.Provider value={userContextValue} {...props}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
