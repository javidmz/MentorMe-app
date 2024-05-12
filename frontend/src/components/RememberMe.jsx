import { useEffect } from "react";
import axios from "../api/axios";
import useUserInfo from "../hooks/useUserInfo";
import { Outlet, useNavigate } from "react-router-dom";

const RememberMe = () => {
  const { rememberMe, userInfo, setUserInfo } = useUserInfo();
  const navigate = useNavigate();

  const rememberMeReq = async () => {
    try {
      const response = await axios.post(
        "/remember-me",
        {},
        { withCredentials: true }
      );
      setUserInfo({ ...response.data });
    } catch (err) {
      if (err?.response?.status === 403) {
        localStorage.clear();
        navigate("/login");
      } else {
        toast.error("Server error. Please, try again later.");
      }
    }
  };

  useEffect(() => {
    const verifyRememberMe = async () => {
      await rememberMeReq();
    };

    !userInfo && rememberMe ? verifyRememberMe() : "";
  }, []);

  return <Outlet />;
};

export default RememberMe;
