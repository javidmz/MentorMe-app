import toast from "react-hot-toast";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useUserInfo from "../hooks/useUserInfo";
import "../style/AddReply.scss";
import { useState, useRef } from "react";

const AddReply = ({ comment, replyingTo, setComment, setReplyIsVisible }) => {
  const { userInfo } = useUserInfo();
  const [characterLeft, setCharacterLeft] = useState(250);
  const [reply, setReply] = useState();
  const textareaRef = useRef();
  const axiosPrivate = useAxiosPrivate();

  const handleSubmitReply = async (e) => {
    e.preventDefault();
    if (reply.length == 0) return;

    const userReply = {
      replyContent: reply,
      fromUserId: userInfo.id,
      targetUserId: replyingTo,
      commentId: comment.id,
    };

    try {
      const response = await axiosPrivate.post("/replies", userReply);
      setReplyIsVisible(false);
      setComment({ ...comment, replies: [...comment.replies, response.data] });
      toast.success("Reply is saved!");
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

  return (
    <div className="add-reply-container">
      <textarea
        autoFocus
        cols="30"
        rows="10"
        maxLength={250}
        ref={textareaRef}
        value={reply}
        onChange={(e) => {
          setCharacterLeft(250 - e.target.value.length);
          setReply(e.target.value);
        }}
      />
      <div className="add-reply-footer">
        <div>{characterLeft} character left</div>
        <button onClick={handleSubmitReply}>Post Reply</button>
      </div>
    </div>
  );
};

export default AddReply;
