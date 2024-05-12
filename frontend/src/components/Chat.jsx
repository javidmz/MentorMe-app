import "../style/Chat.scss";
import { Link, useLocation } from "react-router-dom";
import ChatInfo from "./ChatInfo";

const Chat = ({ chatInfo, totalComments }) => {
  const pathname = useLocation().pathname.split("/");

  return (
    <>
      {chatInfo &&
        (pathname.length == 2 ||
        (pathname[1] == "user" && pathname[2] == "chats") ? (
          <Link
            to={`/chat/${chatInfo.id}/${chatInfo.title
              .toLowerCase()
              .split(" ")
              .join("-")}`}
            className={`chat`}
          >
            <ChatInfo
              chatInfo={chatInfo}
              totalComments={totalComments}
              pathname={pathname}
            />
          </Link>
        ) : (
          <div className={`chat page`}>
            <ChatInfo
              chatInfo={chatInfo}
              totalComments={totalComments}
              pathname={pathname}
            />
          </div>
        ))}
    </>
  );
};

export default Chat;
