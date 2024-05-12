import { useState, useEffect, useRef } from "react";
import UserAvatar from "../../public/user-images/user_avatar.png";
import AddReply from "./AddReply";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import "../style/Comment.scss";
import useUserInfo from "../hooks/useUserInfo";
import Reply from "./Reply";
import UpdateComment from "./UpdateComment";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";

const Comment = ({ chatDetails, setChatDetails, commentData }) => {
  const [comment, setComment] = useState(commentData);
  const [commentRank, setCommentRank] = useState(comment.rank);
  const { userInfo } = useUserInfo();
  const [replyIsVisible, setReplyIsVisible] = useState(false);
  const [editIsVisible, setEditIsVisible] = useState(false);
  const [menuIsVisible, setMenuIsVisible] = useState(false);
  const replyRef = useRef();
  const editRef = useRef();
  const menuRef = useRef();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname.split("/");

  const increaseCommentRank = async () => {
    if (!userInfo) {
      navigate("/login", { state: { from: location }, replace: true });
      return;
    }
    if (pathname.length == 2) return;

    try {
      const response = await axiosPrivate.put(
        `/comment/${comment.id}/increaseRank`
      );
      setCommentRank(commentRank + 1);
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

  const decreaseCommentRank = async () => {
    if (!userInfo) {
      navigate("/login", { state: { from: location }, replace: true });
      return;
    }
    if (pathname.length == 2) return;

    try {
      const response = await axiosPrivate.put(
        `/comment/${comment.id}/decreaseRank`
      );
      setCommentRank(commentRank - 1);
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

  const handleDeleteComment = async () => {
    try {
      const response = await axiosPrivate.delete(`/comment/${comment.id}`);
      const comments = chatDetails.comments.filter(
        (com) => com.id !== comment.id
      );
      setChatDetails({ ...chatDetails, comments });
      toast.success("Comment is deleted");
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
    const handleClickOutside = (event) => {
      if (menuIsVisible && !menuRef.current?.contains(event.target)) {
        setMenuIsVisible(false);
      }
      if (editIsVisible && !editRef.current?.contains(event.target)) {
        setEditIsVisible(false);
      }
      if (replyIsVisible && !replyRef.current?.contains(event.target)) {
        setReplyIsVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuIsVisible, editIsVisible, replyIsVisible]);

  return (
    <>
      <div className="comment-border"></div>
      <div
        className={`comment-container ${
          comment.replies.length != 0 ? "replied" : ""
        }`}
      >
        <div className="rank">
          <FaChevronUp onClick={increaseCommentRank} />
          <div>{commentRank}</div>
          <FaChevronDown onClick={decreaseCommentRank} />
        </div>
        <div className="comment">
          <div className="comment-header">
            <div className="commenter-container">
              <img src={UserAvatar} alt="user avatar" />
              <div className="commenter">
                {comment.commenter ? (
                  <>
                    <div>
                      {comment.commenter.firstName +
                        " " +
                        comment.commenter.lastName}
                    </div>
                    <div>@{comment.commenter.username}</div>
                  </>
                ) : (
                  <div>[deleted]</div>
                )}
              </div>
            </div>
            {userInfo &&
              comment.commenter &&
              (userInfo.username === comment.commenter.username ? (
                <div className="comment-menu-container">
                  <div
                    className="comment-menu"
                    onClick={() => setMenuIsVisible(true)}
                  >
                    ...
                  </div>
                  {menuIsVisible && (
                    <div className="comment-menu-content" ref={menuRef}>
                      <div className="up-arrow"></div>
                      <div
                        className="comment-edit"
                        onClick={() => {
                          setEditIsVisible(true);
                          setMenuIsVisible(false);
                        }}
                      >
                        Edit
                      </div>
                      <div
                        className="comment-delete"
                        onClick={() => {
                          setMenuIsVisible(false);
                          handleDeleteComment();
                        }}
                      >
                        Delete
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div
                  className="comment-reply"
                  onClick={() => setReplyIsVisible(true)}
                >
                  Reply
                </div>
              ))}
          </div>
          {!editIsVisible ? (
            <>
              <div className="comment-content">{comment.commentContent}</div>
              {replyIsVisible && (
                <div ref={replyRef}>
                  <AddReply
                    replyingTo={comment.commenter.id}
                    comment={comment}
                    setComment={setComment}
                    setReplyIsVisible={setReplyIsVisible}
                  />
                </div>
              )}
            </>
          ) : (
            <div ref={editRef}>
              <UpdateComment
                comment={comment}
                setComment={setComment}
                setEditIsVisible={setEditIsVisible}
              />
            </div>
          )}
        </div>
      </div>
      {comment.replies && (
        <div className="comment-with-reply">
          {comment.replies
            .sort((reply1, reply2) => reply1.id - reply2.id)
            .map((reply) => (
              <Reply
                key={reply.id}
                comment={comment}
                setComment={setComment}
                chatDetails={chatDetails}
                setChatDetails={setChatDetails}
                replyData={reply}
                userInfo={userInfo}
              />
            ))}
        </div>
      )}
    </>
  );
};

export default Comment;
