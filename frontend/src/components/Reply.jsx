import { useState, useEffect, useRef } from "react";
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import UserAvatar from "../../public/user-images/user_avatar.png";
import "../style/Reply.scss";
import UpdateReply from "./UpdateReply";
import AddReply from "./AddReply";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import useWindowSize from "../hooks/useWindowSize";

const Reply = ({ replyData, comment, setComment, userInfo }) => {
  const [reply, setReply] = useState(replyData);
  const [replyToReplyIsVisible, setReplyToReplyIsVisible] = useState(false);
  const [editReplyIsVisible, setEditReplyIsVisible] = useState(false);
  const [replyMenuIsVisible, setReplyMenuIsVisible] = useState(false);
  const replyMenuRef = useRef();
  const replyEditRef = useRef();
  const replyToReplyRef = useRef();
  const axiosPrivate = useAxiosPrivate();
  const [replyRank, setReplyRank] = useState(reply.rank);
  const navigate = useNavigate();
  const location = useLocation();
  const windowSize = useWindowSize();

  const pathname = location.pathname.split("/");

  const increaseReplyRank = async () => {
    if (!userInfo) {
      navigate("/login", { state: { from: location }, replace: true });
      return;
    }
    if (pathname.length == 2) return;

    try {
      const response = await axiosPrivate.put(
        `/reply/${reply.id}/increaseRank`
      );
      setReplyRank(replyRank + 1);
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

  const decreaseReplyRank = async () => {
    if (!userInfo) {
      navigate("/login", { state: { from: location }, replace: true });
      return;
    }
    if (pathname.length == 2) return;

    try {
      const response = await axiosPrivate.put(
        `/reply/${reply.id}/decreaseRank`
      );
      setReplyRank(replyRank - 1);
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

  const handleDeleteReply = async () => {
    try {
      const response = await axiosPrivate.delete(`/reply/${replyData.id}`);
      const replies = comment.replies.filter(
        (reply) => reply.id != replyData.id
      );
      setComment({ ...comment, replies });
      toast.success("Reply is deleted");
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
    const clickOutside = (e) => {
      if (editReplyIsVisible && !replyEditRef.current?.contains(e.target)) {
        setEditReplyIsVisible(false);
      }
      if (replyMenuIsVisible && !replyMenuRef.current?.contains(e.target)) {
        setReplyMenuIsVisible(false);
      }
      if (
        replyToReplyIsVisible &&
        !replyToReplyRef.current?.contains(e.target)
      ) {
        setReplyToReplyIsVisible(false);
      }
    };

    document.addEventListener("mousedown", clickOutside);

    return () => document.removeEventListener("mousedown", clickOutside);
  }, [editReplyIsVisible, replyMenuIsVisible, replyToReplyIsVisible]);

  return (
    <div className="reply">
      {windowSize < 481 ? (
        <div className="mobile-general-container">
          <div className="rank">
            <FaChevronUp onClick={increaseReplyRank} />
            <div>{replyRank}</div>
            <FaChevronDown onClick={decreaseReplyRank} />
          </div>
          <img src={UserAvatar} alt="user_avatar" />
        </div>
      ) : (
        <div className="rank">
          <FaChevronUp onClick={increaseReplyRank} />
          <div>{replyRank}</div>
          <FaChevronDown onClick={decreaseReplyRank} />
        </div>
      )}
      <div className="reply-content-container">
        <div className="reply-header">
          <div className="replier-container">
            {windowSize > 480 && <img src={UserAvatar} alt="user_avatar" />}
            <div className="replier">
              {reply.fromUser ? (
                <>
                  <div>
                    {reply.fromUser.firstName + " " + reply.fromUser.lastName}
                  </div>
                  <div>@{reply.fromUser.username}</div>
                </>
              ) : (
                <div>[deleted]</div>
              )}
            </div>
          </div>
          {userInfo &&
            reply.fromUser &&
            (userInfo?.username === reply.fromUser.username ? (
              <div className="reply-menu-container">
                <div
                  className="reply-menu"
                  onClick={() => setReplyMenuIsVisible(true)}
                >
                  ...
                </div>
                {replyMenuIsVisible && (
                  <div className="reply-menu-content" ref={replyMenuRef}>
                    <div className="up-arrow"></div>
                    <div
                      className="reply-edit"
                      onClick={() => {
                        setEditReplyIsVisible(true);
                        setReplyMenuIsVisible(false);
                      }}
                    >
                      Edit
                    </div>
                    <div
                      className="reply-delete"
                      onClick={() => {
                        setReplyMenuIsVisible(false);
                        handleDeleteReply();
                      }}
                    >
                      Delete
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div
                className="reply-reply"
                onClick={() => setReplyToReplyIsVisible(true)}
              >
                Reply
              </div>
            ))}
        </div>
        {!editReplyIsVisible ? (
          <>
            <div className="reply-content">
              <span className="reply-replying-to">
                {"@" +
                  (reply.targetUser ? reply.targetUser.username : "[deleted]")}
              </span>{" "}
              <div>{reply.replyContent}</div>
            </div>
            {replyToReplyIsVisible && (
              <div ref={replyToReplyRef}>
                <AddReply
                  setReplyIsVisible={setReplyToReplyIsVisible}
                  replyingTo={reply.fromUser.id}
                  comment={comment}
                  setComment={setComment}
                />
              </div>
            )}
          </>
        ) : (
          <div ref={replyEditRef}>
            <UpdateReply
              reply={reply}
              setReply={setReply}
              setEditReplyIsVisible={setEditReplyIsVisible}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Reply;
