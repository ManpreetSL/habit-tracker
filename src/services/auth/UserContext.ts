import { createContext } from 'react';

type User = {
  name: string;
  email: string;
  password: string;
};

const UserContext = createContext<User | null>(null);

export default UserContext;
