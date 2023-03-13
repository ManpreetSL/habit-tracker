import { createContext, ReactNode, useMemo, useState } from 'react';
import useAuth from './useAuth';

type User = {
  name?: string;
  uid: string;
  email: string | null;
};

type UserContextParams = {
  user: User | null;
} | null;

const UserContext = createContext<UserContextParams>({
  user: null,
});

type FormatUserParams = {
  uid: string;
  email: string | null;
} | null;

const formatUser = (params: FormatUserParams) => {
  if (!params) return null;

  const { uid, email } = params;

  return { uid, email };
};

type UserProviderProps = {
  children: ReactNode;
};

const UserProvider = ({ children, ...props }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const { user: authUser } = useAuth();

  // Extract what we want from the authUser and return it as a user here
  setUser(formatUser(authUser));

  const userContextValue = useMemo(() => ({ user }), []);

  return (
    <UserContext.Provider value={userContextValue} {...props}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
