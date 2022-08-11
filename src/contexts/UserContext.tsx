import { useEffect } from "react";
import { createContext, useState } from "react";
import IUserData from "../types/IUserData";

interface IUserContext {
  user: IUserData | undefined;
  setUser: (user: IUserData) => void;
}
const DEFAULT_VALUE: IUserContext = {
  user: undefined,
  setUser: (user: IUserData) => {},
};
const UserContext = createContext<IUserContext>(DEFAULT_VALUE);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUserData | undefined>(DEFAULT_VALUE.user);

  const handleChangeUser = (user: IUserData) => {
    console.log(user);
    setUser(user);
  };

  return (
    <UserContext.Provider value={{ user, setUser: handleChangeUser }}>
      {children}
    </UserContext.Provider>
  );
};
export { UserContext, UserProvider };
