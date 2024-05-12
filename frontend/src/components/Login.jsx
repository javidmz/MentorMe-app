import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";
import { useNavigate, useLocation } from "react-router-dom";
import "../style/Login.scss";
import axios from "axios";
import toast from "react-hot-toast";
import useWindowSize from "../hooks/useWindowSize";

const Login = ({ setIsLogin, isMobile = false }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState(false);
  const { setUserInfo, rememberMe, setRememberMe } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const windowSize = useWindowSize();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrMsg(false);
    const user = {
      username,
      password,
    };

    try {
      const response = await axios.post(
        "https://api.mentor-me.xyz/api/v1/login",
        user,
        {
          withCredentials: true,
        }
      );

      setUserInfo({
        id: response.data.id,
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        username: response.data.username,
        role: response.data.role,
        accessToken: response.data.accessToken,
      });

      setUsername("");
      setPassword("");
      if (rememberMe) localStorage.setItem("remember-me", rememberMe);
      toast.success("Logged in!");
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 2000);
    } catch (err) {
      setUsername("");
      setPassword("");
      if (err?.response?.status === 401) {
        setErrMsg(err.response.data.message);
      } else {
        toast.error("Server error. Please, try again later.");
      }
    }
  };

  return (
    <>
      <form
        className={`login-form ${isMobile ? "mobile" : ""}`}
        id="login"
        onSubmit={handleLogin}
      >
        <header>Sign in</header>
        <div className="credentials-container">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={
              errMsg && username.length == 0 ? { border: "2px solid red" } : {}
            }
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={
              errMsg && password.length == 0 ? { border: "2px solid red" } : {}
            }
          />
          <div className="remember-me-container">
            <input
              type="checkbox"
              id="remember-me"
              name="remember-me"
              onChange={() => setRememberMe(!rememberMe)}
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>
        </div>
        {errMsg && <p className="login-error">{errMsg}</p>}
        <button
          type="submit"
          disabled={username.length == 0 && password.length == 0}
        >
          Sign in
        </button>
      </form>
      {windowSize < 701 && (
        <div className="sign-up-link">
          Not an Account? <br />
          <span onClick={() => setIsLogin(false)}>Sign up</span>
        </div>
      )}
    </>
  );
};

export default Login;
