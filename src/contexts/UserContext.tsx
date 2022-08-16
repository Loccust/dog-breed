import { createContext, useState } from "react";
import {IUser} from "../types/IUserData";

type UserDataContext = Omit<IUser, "token"> | undefined; 
interface IUserContext {
  user: UserDataContext;
  setUser: (user: UserDataContext) => void;
}
const DEFAULT_VALUE: IUserContext = {
  user: undefined,
  setUser: () => {},
};
const UserContext = createContext<IUserContext>(DEFAULT_VALUE);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserDataContext>(DEFAULT_VALUE.user);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
export { UserContext, UserProvider };