import { useContext, useEffect } from "react";
import {
  FaInfoCircle,
  FaRegCheckCircle,
  FaRegTimesCircle,
} from "react-icons/fa";
import { useState } from "react";
import "../style/Signup.scss";
import toast from "react-hot-toast";
import axios from "axios";
import UserContext from "../contexts/UserContext";
import { useNavigate, useLocation } from "react-router-dom";
import useWindowSize from "../hooks/useWindowSize";

const FULLNAME_REGEX = /^[A-Za-z]+$/;
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Signup = ({ setIsLogin, isMobile = false }) => {
  const [name, setName] = useState("");
  const [validName, setValidName] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);

  const [surname, setSurname] = useState("");
  const [validSurname, setValidSurname] = useState(false);
  const [surnameFocus, setSurnameFocus] = useState(false);

  const [user, setUser] = useState("");
  const [validUser, setValidUser] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const { setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const windowSize = useWindowSize();

  useEffect(() => {
    setValidName(FULLNAME_REGEX.test(name));
  }, [name]);

  useEffect(() => {
    setValidSurname(FULLNAME_REGEX.test(surname));
  }, [surname]);

  useEffect(() => {
    setValidUser(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      firstName: name,
      lastName: surname,
      username: user,
      password: pwd,
    };

    try {
      const response = await axios.post(
        "https://api.mentor-me.xyz/api/v1/register",
        newUser,
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

      setName("");
      setSurname("");
      setUser("");
      setPwd("");
      setMatchPwd("");
      toast.success("Account is created");
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 3000);
    } catch (err) {
      if (err.response.status === 400) setErrMsg(err.response.data.message);
      else {
        toast.error("Server Error. Please, try again later.");
      }
    }
  };

  return (
    <>
      <form
        className={`sign-up-form ${isMobile ? "mobile" : ""}`}
        onSubmit={handleSubmit}
      >
        <header>Sign Up</header>
        <div className="sign-up-credentials-container">
          <div className="sign-up-input-container">
            <input
              type="text"
              autoFocus
              id="name"
              required
              placeholder="First Name"
              autoComplete="off"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={() => setNameFocus(true)}
              onBlur={() => setNameFocus(false)}
            />
            {validName && <FaRegCheckCircle />}
            {!validName && name && <FaRegTimesCircle />}
          </div>
          {nameFocus && name && !validName && (
            <p className="instruction">
              First Name should contain only letters
            </p>
          )}
          <div className="sign-up-input-container">
            <input
              type="text"
              id="surname"
              placeholder="Last Name"
              autoComplete="off"
              required
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              onFocus={() => setSurnameFocus(true)}
              onBlur={() => setSurnameFocus(false)}
            />
            {validSurname && <FaRegCheckCircle />}
            {!validSurname && surname && <FaRegTimesCircle />}
          </div>
          {surnameFocus && surname && !validSurname && (
            <p className="instruction">Last Name should contain only letters</p>
          )}
          <div className="sign-up-input-container">
            <input
              type="text"
              id="username"
              placeholder="Username"
              autoComplete="off"
              required
              value={user}
              onChange={(e) => {
                setUser(e.target.value);
                setErrMsg(false);
              }}
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />
            {validUser && <FaRegCheckCircle />}
            {!validUser && user && <FaRegTimesCircle />}
          </div>
          <div
            className={
              userFocus && user && !validUser ? "instructions" : "offscreen"
            }
          >
            <p>
              <FaInfoCircle /> 4 to 24 characters. Must begin with a
              letter.Letters, numbers, underscores, hyphens allowed.
            </p>
          </div>
          {errMsg && !userFocus ? (
            <div style={{ color: "red" }}>
              <FaInfoCircle /> {errMsg}
            </div>
          ) : (
            ""
          )}
          <div className="sign-up-input-container">
            <input
              type="password"
              id="password"
              placeholder="Enter Password"
              autoComplete="off"
              required
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
            {validPwd && <FaRegCheckCircle />}
            {!validPwd && pwd && <FaRegTimesCircle />}
          </div>
          <div className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
            <p>
              <FaInfoCircle />8 to 24 characters. Must include uppercase and
              lowercase letters, a number and a special character. Allowed
              special characters: <span>!</span> <span>@</span> <span>#</span>{" "}
              <span>$</span> <span>%</span>
            </p>
          </div>
          <div className="sign-up-input-container">
            <input
              type="password"
              id="confirm_password"
              placeholder="Confirm Password"
              autoComplete="off"
              required
              value={matchPwd}
              onChange={(e) => setMatchPwd(e.target.value)}
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />
            {validMatch && matchPwd && <FaRegCheckCircle />}
            {!validMatch && matchPwd && <FaRegTimesCircle />}
          </div>
          <div
            className={matchFocus && !validMatch ? "instructions" : "offscreen"}
          >
            <p>
              <FaInfoCircle /> Must match the first password input field.
            </p>
          </div>
          <button
            type="submit"
            disabled={
              validName && validSurname && validUser && validPwd && validMatch
                ? false
                : true
            }
          >
            Sign Up
          </button>
        </div>
      </form>
      {windowSize < 701 && (
        <div className="sign-in-link">
          Already have an account?
          <br />
          <span onClick={() => setIsLogin(true)}>Sign in</span>
        </div>
      )}
    </>
  );
};

export default Signup;
