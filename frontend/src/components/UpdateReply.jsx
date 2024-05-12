import useAxiosPrivate from "../hooks/useAxiosPrivate";
import EditResponse from "./EditResponse";
import toast from "react-hot-toast";
import { useState } from "react";

const UpdateReply = ({ reply, setReply, setEditReplyIsVisible }) => {
  const [characterLeft, setCharacterLeft] = useState(
    250 - reply.replyContent.length
  );
  const [edittedResponse, setEdittedResponse] = useState(reply.replyContent);
  const axiosPrivate = useAxiosPrivate();

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    if (edittedResponse.length == 0) return;

    const newReply = {
      replyContent: edittedResponse,
    };

    try {
      const response = await axiosPrivate.put(`/reply/${reply.id}`, newReply);
      setEditReplyIsVisible(false);
      setReply({ ...reply, replyContent: edittedResponse });
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

export default UpdateReply;
