import { useEffect, useRef, useState } from "react";
import useUserInfo from "../hooks/useUserInfo";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import UserChats from "../components/UserChats";
import UserComments from "../components/UserComments";
import UserReplies from "../components/UserReplies";
import UserNavbar from "../components/UserNavbar";
import UserProfil from "../components/UserProfil";
import DeleteVerification from "../components/DeleteVerification";
import "../style/UserDetail.scss";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useWindowSize from "../hooks/useWindowSize";

const UserDetail = () => {
  const location = useLocation();
  const pathname = location.pathname.split("/");
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useUserInfo();
  const axiosPrivate = useAxiosPrivate();
  const [chatSearch, setChatSearch] = useState("");
  const [chatFilter, setChatFilter] = useState("Most Recent");
  const [chatPage, setChatPage] = useState(1);
  const [commentSearch, setCommentSearch] = useState("");
  const [commentFilter, setCommentFilter] = useState("Most Recent");
  const [commentPage, setCommentPage] = useState(1);
  const [replySearch, setReplySearch] = useState("");
  const [replyFilter, setReplyFilter] = useState("Most Recent");
  const [replyPage, setReplyPage] = useState(1);
  const [chatByUser, setChatByUser] = useState();
  const [commentByUser, setCommentByUser] = useState();
  const [replyByUser, setReplyByUser] = useState();
  const [mobileMenuNavActive, setMobileMenuNavActive] = useState(false);
  const windowSize = useWindowSize();
  const [isDeleteVerificationVisible, setIsDeleteVerificationVisible] =
    useState(false);
  const [selectedNav, setSelectedNav] = useState(
    pathname.length == 2
      ? "Profil"
      : `${pathname[2].charAt(0).toUpperCase() + pathname[2].slice(1)}`
  );
  const sortTypeArr = [
    {
      id: 1,
      name: "Most Recent",
      sortByParams: "sortBy=creationDate&direction=DESC",
    },
    {
      id: 2,
      name: "Least Recent",
      sortByParams: "sortBy=creationDate&direction=ASC",
    },
    {
      id: 3,
      name: "Higher Rank",
      sortByParams: "sortBy=rank&direction=DESC",
    },
    {
      id: 4,
      name: "Lower Rank",
      sortByParams: "sortBy=rank&direction=ASC",
    },
  ];
  const deleteVerRef = useRef();

  const handleAccountDelete = async () => {
    try {
      const response = await axiosPrivate.delete(`/user/${userInfo.id}`);
      localStorage.clear();
      setIsDeleteVerificationVisible(false);
      toast.success("Account is deleted.");
      setTimeout(() => {
        navigate("/", { replace: true });
        setUserInfo();
      }, 1500);
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
    const getChatsByUser = async () => {
      const sortByParams = sortTypeArr.find(
        (type) => type.name === chatFilter
      ).sortByParams;
      try {
        const response = await axiosPrivate.get(
          `/user/${
            userInfo.id
          }/chats?search=${chatSearch}&${sortByParams}&pageNo=${chatPage - 1}`
        );
        setChatByUser(response.data);
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

    if (userInfo) getChatsByUser();
  }, [chatSearch, chatFilter, chatPage]);

  useEffect(() => {
    const getCommentByUser = async () => {
      const sortByParams = sortTypeArr.find(
        (type) => type.name === chatFilter
      ).sortByParams;
      try {
        const response = await axiosPrivate.get(
          `/user/${
            userInfo.id
          }/comments?search=${commentSearch}&${sortByParams}&pageNo=${
            commentPage - 1
          }`
        );
        setCommentByUser(response.data);
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

    if (userInfo) getCommentByUser();
  }, [commentSearch, commentFilter, commentPage]);

  useEffect(() => {
    const getReplyByUser = async () => {
      const sortByParams = sortTypeArr.find(
        (type) => type.name === chatFilter
      ).sortByParams;
      try {
        const response = await axiosPrivate.get(
          `/user/${
            userInfo.id
          }/replies?search=${replySearch}&${sortByParams}&pageNo=${
            replyPage - 1
          }`
        );
        setReplyByUser(response.data);
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

    if (userInfo) getReplyByUser();
  }, [replySearch, replyFilter, replyPage]);

  return (
    <div className="user-container" ref={deleteVerRef}>
      {windowSize < 650 && (
        <div
          className="hamburger-container"
          onClick={() => setMobileMenuNavActive(!mobileMenuNavActive)}
        >
          <div className="hamburger-line"></div>
          <div className="hamburger-line"></div>
          <div className="hamburger-line"></div>
        </div>
      )}
      <UserNavbar
        selectedNav={selectedNav}
        setSelectedNav={setSelectedNav}
        userInfo={userInfo}
        setUserInfo={setUserInfo}
        mobileMenuNavActive={mobileMenuNavActive}
        setMobileMenuNavActive={setMobileMenuNavActive}
        setIsDeleteVerificationVisible={setIsDeleteVerificationVisible}
      />
      <div className="user-data-container">
        {selectedNav === "Profil" && userInfo && (
          <UserProfil
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            axiosPrivate={axiosPrivate}
          />
        )}
        {selectedNav === "Chats" && chatByUser && (
          <UserChats
            chatByUser={chatByUser}
            setChatSearch={setChatSearch}
            chatFilter={chatFilter}
            setChatFilter={setChatFilter}
            sortTypeArr={sortTypeArr}
            chatPage={chatPage}
            setChatPage={setChatPage}
          />
        )}
        {selectedNav === "Comments" && commentByUser && (
          <UserComments
            commentByUser={commentByUser}
            setCommentSearch={setCommentSearch}
            commentFilter={commentFilter}
            setCommentFilter={setCommentFilter}
            commentPage={commentPage}
            setCommentPage={setCommentPage}
            sortTypeArr={sortTypeArr}
          />
        )}
        {selectedNav === "Replies" && replyByUser && (
          <UserReplies
            replyByUser={replyByUser}
            setReplySearch={setReplySearch}
            replyFilter={replyFilter}
            setReplyFilter={setReplyFilter}
            replyPage={replyPage}
            setReplyPage={setReplyPage}
            sortTypeArr={sortTypeArr}
          />
        )}
      </div>
      {isDeleteVerificationVisible && (
        <DeleteVerification
          id={userInfo.id}
          deleteVerCont={deleteVerRef}
          setIsDelete={setIsDeleteVerificationVisible}
          type="user"
          deleteFunc={handleAccountDelete}
        />
      )}
    </div>
  );
};

export default UserDetail;
