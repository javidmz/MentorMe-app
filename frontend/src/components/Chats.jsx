import Chat from "./Chat";
import "../style/Chats.scss";

const Chats = ({ chatData }) => {
  const calculateTotalComments = (comments) => {
    let len = 0;

    comments.forEach((comment) => {
      len += 1;
      if (comment.replies) len += comment.replies.length;
    });

    return len;
  };

  return (
    <div className="chats-container">
      {chatData &&
        chatData.map((chat) => (
          <Chat
            key={chat.id}
            chatInfo={chat}
            totalComments={calculateTotalComments(chat.comments)}
          />
        ))}
    </div>
  );
};

export default Chats;
