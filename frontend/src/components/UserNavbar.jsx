import { Link, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { MdLogout } from "react-icons/md";
import { MdOutlineDeleteForever } from "react-icons/md";
import "../style/UserNavbar.scss";
import toast from "react-hot-toast";
import { useEffect, useRef } from "react";
import useWindowSize from "../hooks/useWindowSize";

const UserNavbar = ({
  selectedNav,
  setSelectedNav,
  setUserInfo,
  mobileMenuNavActive,
  setMobileMenuNavActive,
  setIsDeleteVerificationVisible,
}) => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const navRef = useRef();
  const windowSize = useWindowSize();

  const handleLogout = async () => {
    try {
      const response = await axiosPrivate.post("/logout");
      localStorage.clear();
      toast.success("Logged out");
      setTimeout(() => {
        navigate("/home", { replace: true });
        setUserInfo();
      }, 2000);
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
    const handleOutsideClick = (e) => {
      if (!navRef.current?.contains(e.target)) setMobileMenuNavActive(false);
    };

    if (windowSize > 650) return;

    window.addEventListener("mousedown", handleOutsideClick);

    return () => window.removeEventListener("mousedown", handleOutsideClick);
  }, [useRef]);

  return (
    <nav
      className={`navbar ${mobileMenuNavActive ? "active" : ""}`}
      ref={navRef}
    >
      <Link to={"/home"}>
        <header>MentorMe</header>
      </Link>
      <div className="navigation">
        <Link to={""}>
          <div
            className={` ${selectedNav === "Profil" ? "selected" : ""}`}
            onClick={() => {
              setSelectedNav("Profil");
              setMobileMenuNavActive(false);
            }}
          >
            Profil
          </div>
        </Link>
        <Link to={"/user/chats"}>
          <div
            className={` ${selectedNav === "Chats" ? "selected" : ""}`}
            onClick={() => {
              setSelectedNav("Chats");
              setMobileMenuNavActive(false);
            }}
          >
            Chats
          </div>
        </Link>
        <Link to={"/user/comments"}>
          <div
            className={` ${selectedNav === "Comments" ? "selected" : ""}`}
            onClick={() => {
              setSelectedNav("Comments");
              setMobileMenuNavActive(false);
            }}
          >
            Comments
          </div>
        </Link>
        <Link to={"/user/replies"}>
          <div
            className={` ${selectedNav === "Replies" ? "selected" : ""}`}
            onClick={() => {
              setSelectedNav("Replies");
              setMobileMenuNavActive(false);
            }}
          >
            Replies
          </div>
        </Link>
      </div>
      <div className="logout-container">
        <div onClick={handleLogout}>Logout</div>
        <MdLogout />
      </div>
      <div
        className="delete-account"
        onClick={() => setIsDeleteVerificationVisible(true)}
      >
        <div>Delete Account</div>
        <MdOutlineDeleteForever />
      </div>
    </nav>
  );
};

export default UserNavbar;
