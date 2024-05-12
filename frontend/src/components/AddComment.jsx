import { useContext, useRef, useState } from "react";
import UserContext from "../contexts/UserContext";
import "../style/AddComment.scss";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import toast from "react-hot-toast";

const AddComment = ({ chatDetails, setChatDetails }) => {
  const { userInfo } = useContext(UserContext);
  const [characterLeft, setCharacterLeft] = useState(250);
  const [newComment, setNewComment] = useState("");
  const textareaRef = useRef();
  const axiosPrivate = useAxiosPrivate();

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (newComment.length == 0) return;
    const userComment = {
      commentContent: newComment,
      commenterId: userInfo.id,
      chatId: chatDetails.id,
    };

    try {
      const response = await axiosPrivate.post("/comments", userComment);
      setChatDetails({
        ...chatDetails,
        comments: [...chatDetails.comments, response.data],
      });
      toast.success("Comment is saved");
      textareaRef.current.value = "";
      setNewComment("");
      setCharacterLeft(250);
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
    <div className="add-comment">
      <div className="add-comment-header">Add Comment</div>
      <textarea
        className="add-comment-area"
        cols="30"
        rows="10"
        placeholder="Type your comment here"
        maxLength={250}
        ref={textareaRef}
        onChange={(e) => {
          setCharacterLeft(250 - e.target.value.length);
          setNewComment(e.target.value);
        }}
      />
      <div className="add-comment-footer">
        <div>{characterLeft} characters left</div>
        <button onClick={handleSubmitComment}>Post Comment</button>
      </div>
    </div>
  );
};

export default AddComment;
