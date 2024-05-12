import { useContext } from "react";
import UserContext from "../contexts/UserContext";

const useUserInfo = () => {
  return useContext(UserContext);
};

export default useUserInfo;
