import { MdKeyboardArrowLeft } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import Comments from "../components/Comments";
import Chat from "../components/Chat";
import AddComment from "../components/AddComment";
import EditChat from "../components/EditChat";
import "../style/ChatDetailed.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import useUserInfo from "../hooks/useUserInfo";

const ChatDetailed = () => {
  const { userInfo } = useUserInfo();
  const navigate = useNavigate();
  const [editChat, setEditChat] = useState(false);
  const location = useLocation().pathname.split("/")[2];
  const [chatDetails, setChatDetails] = useState();
  const [responseNumber, setResponseNumber] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const calculateTotalResponses = (comments) => {
    let len = 0;

    comments.forEach((comment) => {
      len += 1;
      if (comment.replies) len += comment.replies.length;
    });

    return len;
  };

  useEffect(() => {
    const getChat = async () => {
      try {
        const response = await axios.get(
          `https://api.mentor-me.xyz/api/v1/chat/${location}`
        );
        setChatDetails(response.data);
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

    getChat(location);
  }, []);

  useEffect(() => {
    if (chatDetails) {
      setResponseNumber(calculateTotalResponses(chatDetails.comments));
    }
  }, [chatDetails]);

  useEffect(() => {
    document.body.style.overflowY = editChat ? "hidden" : "scroll";
  }, [editChat]);
  return (
    <div className="chat-detailed-container">
      {chatDetails && (
        <>
          <div className="chat-detailed-header">
            <div onClick={() => navigate(-1)}>
              <MdKeyboardArrowLeft /> Go Back
            </div>
            {userInfo &&
              userInfo.username === chatDetails.chatCreator?.username && (
                <button className="edit-chat" onClick={() => setEditChat(true)}>
                  Edit Chat
                </button>
              )}
          </div>
          <Chat chatInfo={chatDetails} totalComments={responseNumber} />
          <Comments
            chatDetails={chatDetails}
            setChatDetails={setChatDetails}
            totalComments={responseNumber}
          />
          {userInfo && (
            <AddComment
              chatDetails={chatDetails}
              setChatDetails={setChatDetails}
              chatId={chatDetails.id}
              location={location}
            />
          )}
          {editChat && (
            <EditChat
              setEditChat={setEditChat}
              chatDetails={chatDetails}
              setChatDetails={setChatDetails}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ChatDetailed;
