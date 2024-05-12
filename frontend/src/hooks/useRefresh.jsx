import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import useUserInfo from "./useUserInfo";

const useRefresh = () => {
  const { setUserInfo } = useUserInfo();
  const navigate = useNavigate();

  const refreshToken = async () => {
    try {
      const response = await axios.post(
        "/refresh-token",
        {},
        {
          withCredentials: true,
        }
      );
      setUserInfo((info) => ({
        ...info,
        accessToken: response.data.accessToken,
      }));
      return response.data.accessToken;
    } catch (err) {
      if (err?.response?.status === 403) {
        setUserInfo();
        localStorage.clear();
        navigate("/login");
      } else {
        toast.error("Server error. Please, try again later.");
      }
    }
  };

  return refreshToken;
};

export default useRefresh;
