import "../style/UserProfil.scss";
import { CiEdit } from "react-icons/ci";
import { useState, useEffect, useRef } from "react";
import { FaInfoCircle } from "react-icons/fa";
import toast from "react-hot-toast";

const UserProfil = ({ userInfo, axiosPrivate, setUserInfo }) => {
  const [firstName, setFirstName] = useState(userInfo.firstName);
  const [validFirstName, setValidFirstName] = useState(false);
  const [firstnameFocus, setFirstNameFocus] = useState(false);
  const [editFirstName, setEditFirstName] = useState(false);
  const firstNameRef = useRef();
  const [lastName, setLastName] = useState(userInfo.lastName);
  const [validLastName, setValidLastName] = useState(false);
  const [lastnameFocus, setLastNameFocus] = useState(false);
  const [editLastName, setEditLastName] = useState(false);
  const lastNameRef = useRef();
  const [username, setUsername] = useState(userInfo.username);
  const [validUsername, setValidUsername] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false);
  const [editUsername, setEditUsername] = useState(false);
  const usernameRef = useRef();
  const FULLNAME_REGEX = /^[A-Za-z]+$/;
  const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;

  const handleUpdateProfil = async () => {
    if (
      firstName == userInfo.firstName &&
      lastName == userInfo.lastName &&
      username == userInfo.username
    ) {
      toast.error("No Updates");
      return;
    }

    const updateUser = {
      id: userInfo.id,
      firstName,
      lastName,
      username,
    };

    try {
      const response = await axiosPrivate.put(
        `/user/${userInfo.id}`,
        updateUser
      );
      setUserInfo({
        ...userInfo,
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        username: response.data.username,
      });
      toast.success("Updates saved!");
    } catch (err) {
      if (err?.response?.status === 500) {
        toast.error("Server error. Please, try again later");
      } else if (
        err?.response?.status === 400 ||
        err?.response?.status === 401
      ) {
        toast.error(err.response.data.message);
      }
    }
  };

  useEffect(() => {
    setValidFirstName(FULLNAME_REGEX.test(firstName));
  }, [firstName]);

  useEffect(() => {
    setValidLastName(FULLNAME_REGEX.test(lastName));
  }, [lastName]);

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        !firstNameRef.current?.contains(e.target) &&
        !lastNameRef.current?.contains(e.target) &&
        !usernameRef.current?.contains(e.target)
      ) {
        setEditFirstName(false);
        setEditLastName(false);
        setEditUsername(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [firstNameRef, lastNameRef, usernameRef]);

  return (
    <div className="profil-container">
      <div className="user-info-cont">
        <div>First Name:</div>
        <div>
          {editFirstName ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setEditFirstName(false);
              }}
              name="firstNameEdit"
            >
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                onFocus={() => setFirstNameFocus(true)}
                onBlur={() => setFirstNameFocus(false)}
                onSubmit={() => setEditFirstName(false)}
                autoFocus
                ref={firstNameRef}
              />
            </form>
          ) : (
            <div>{firstName}</div>
          )}

          {!editFirstName && <CiEdit onClick={() => setEditFirstName(true)} />}
        </div>
      </div>
      {firstnameFocus && firstName && !validFirstName && (
        <p
          style={{
            color: "red",
            display: "flex",
            alignItems: "center",
            gap: ".5rem",
          }}
        >
          <FaInfoCircle /> First Name should contains only letters
        </p>
      )}
      <div className="user-info-cont">
        <div>Last Name:</div>
        <div>
          {editLastName ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setEditLastName(false);
              }}
              name="lastNameEdit"
            >
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                onFocus={() => setLastNameFocus(true)}
                onBlur={() => setLastNameFocus(false)}
                autoFocus
                ref={lastNameRef}
              />
            </form>
          ) : (
            <div>{lastName}</div>
          )}

          {!editLastName && <CiEdit onClick={() => setEditLastName(true)} />}
        </div>
      </div>
      {lastnameFocus && lastName && !validLastName && (
        <p
          style={{
            color: "red",
            display: "flex",
            alignItems: "center",
            gap: ".5rem",
          }}
        >
          {" "}
          <FaInfoCircle />
          Last Name should contains only letters
        </p>
      )}

      <div className="user-info-cont">
        <div>Username:</div>
        <div>
          {editUsername ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setEditUsername(false);
              }}
              name="usernameEdit"
            >
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onFocus={() => setUsernameFocus(true)}
                onBlur={() => setUsernameFocus(false)}
                autoFocus
                ref={usernameRef}
              />
            </form>
          ) : (
            <div>{username}</div>
          )}
          {!editUsername && <CiEdit onClick={() => setEditUsername(true)} />}
        </div>
      </div>
      {usernameFocus && username && !validUsername && (
        <p
          style={{
            color: "red",
            display: "flex",
            gap: ".5rem",
          }}
        >
          {" "}
          <FaInfoCircle /> 4 to 24 characters.
          <br />
          Must begin with a letter.
          <br />
          Letters, numbers, underscores, hyphens allowed.
        </p>
      )}
      <button onClick={handleUpdateProfil}>Update Changes</button>
    </div>
  );
};

export default UserProfil;
