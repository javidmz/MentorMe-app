import "../style/Registration.scss";
import Login from "../components/Login";
import Signup from "../components/Signup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useWindowSize from "../hooks/useWindowSize";

const Registration = () => {
  const [isLogin, setIsLogin] = useState(true);
  const windowSize = useWindowSize();
  const navigate = useNavigate();

  return (
    <>
      {windowSize > 700 ? (
        <div className="registration-container">
          <div className={`form-container sign-in ${!isLogin ? "active" : ""}`}>
            <Login />
          </div>
          <div className={`form-container sign-up ${!isLogin ? "active" : ""}`}>
            <Signup />
          </div>
          <div className={`overlay-container ${!isLogin ? "active" : ""}`}>
            <div className="overlay">
              {isLogin ? (
                <div className="overlay-panel overlay-right">
                  <header onClick={() => navigate("/home")}>MentorMe</header>
                  <div>Hello, Friend!</div>
                  <div>Enter your personal data and get started</div>
                  <button onClick={() => setIsLogin(!isLogin)}>Sing up</button>
                </div>
              ) : (
                <div className="overlay-panel overlay-left">
                  <header onClick={() => navigate("/home")}>MentorMe</header>
                  <div>Welcome Back!</div>
                  <div>To keep connected with us please login</div>
                  <button onClick={() => setIsLogin(!isLogin)}>Sing in</button>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="mobile-nav-container">
          <div
            className="mobile-login-header"
            onClick={() => navigate("/home")}
          >
            MentorMe
          </div>
          {isLogin ? (
            <div className="mobile-form-container">
              <Login setIsLogin={setIsLogin} isMobile={true} />
            </div>
          ) : (
            <div className="mobile-form-container">
              <Signup setIsLogin={setIsLogin} isMobile={true} />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Registration;
