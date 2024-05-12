import { createContext, useState } from "react";

const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState();
  const [rememberMe, setRememberMe] = useState(
    JSON.parse(localStorage.getItem("remember-me"))
  );

  return (
    <UserContext.Provider
      value={{ userInfo, setUserInfo, rememberMe, setRememberMe }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
