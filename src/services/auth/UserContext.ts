import { createContext } from 'react';

type UserContextParams = {
  user: User | null;
  setUser: any;
};

type User = {
  name: string;
  email: string;
  password: string;
};

const UserContext = createContext<UserContextParams>({
  user: null,
  setUser: () => {},
});

export default UserContext;
