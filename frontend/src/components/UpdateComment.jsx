import toast from "react-hot-toast";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import EditResponse from "./EditResponse";
import { useState } from "react";

const UpdateComment = ({ comment, setComment, setEditIsVisible }) => {
  const [characterLeft, setCharacterLeft] = useState(
    250 - comment.commentContent.length
  );
  const [edittedResponse, setEdittedResponse] = useState(
    comment.commentContent
  );
  const axiosPrivate = useAxiosPrivate();

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    if (edittedResponse.length == 0) return;

    const updateCommentRequest = {
      commentContent: edittedResponse,
    };

    try {
      const response = await axiosPrivate.put(
        `/comment/${comment.id}`,
        updateCommentRequest
      );
      setEditIsVisible(false);
      setComment({ ...comment, commentContent: edittedResponse });
      toast.success("Update is saved");
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
    <EditResponse
      characterLeft={characterLeft}
      setCharacterLeft={setCharacterLeft}
      edittedResponse={edittedResponse}
      setEdittedResponse={setEdittedResponse}
      handleSubmitEdit={handleSubmitEdit}
    />
  );
};

export default UpdateComment;
