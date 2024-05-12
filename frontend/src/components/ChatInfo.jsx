import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import CommentIcon from "../assets/shared/icon-comments.svg";
import { useNavigate, useLocation } from "react-router-dom";
import useUserInfo from "../hooks/useUserInfo";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useEffect, useRef, useState } from "react";
import ShowMoreText from "react-show-more-text";
import useWindowSize from "../hooks/useWindowSize";

const ChatInfo = ({ chatInfo, totalComments, pathname }) => {
  const { userInfo } = useUserInfo();
  const [chatRank, setChatRank] = useState(chatInfo.rank);
  const axiosPrivate = useAxiosPrivate();
  const windowSize = useWindowSize();
  const navigate = useNavigate();
  const location = useLocation();

  const increaseChatRank = async () => {
    if (!userInfo) {
      navigate("/login", { state: { from: location }, replace: true });
      return;
    }
    if (pathname.length == 2) return;

    try {
      const response = await axiosPrivate.put(
        `/chat/${chatInfo.id}/increaseRank`
      );
      setChatRank(chatRank + 1);
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

  const decreaseChatRank = async () => {
    if (!userInfo) {
      navigate("/login", { state: { from: location }, replace: true });
      return;
    }
    if (pathname.length == 2) return;

    try {
      const response = await axiosPrivate.put(
        `/chat/${chatInfo.id}/decreaseRank`
      );
      setChatRank(chatRank - 1);
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
    <>
      <div className="chat-general">
        {windowSize < 482 ? (
          chatInfo.comments ? (
            <div className="mobile-chat-quantity">
              <div className="chat-rank rotated">
                <FaChevronUp onClick={increaseChatRank} />
                <div>{chatRank}</div>
                <FaChevronDown onClick={decreaseChatRank} />
              </div>
              <div className="chat-comment">
                <img src={CommentIcon} alt="comment" />
                <div>{totalComments}</div>
              </div>
            </div>
          ) : (
            ""
          )
        ) : (
          <div className="chat-rank">
            <FaChevronUp onClick={increaseChatRank} />
            <div>{chatRank}</div>
            <FaChevronDown onClick={decreaseChatRank} />
          </div>
        )}
        <div className="chat-info">
          <div className="chat-info-title">{chatInfo.title}</div>
          {location.pathname.split("/").includes("chat") ? (
            <div className="chat-info-desc">{chatInfo.description}</div>
          ) : (
            <ShowMoreText lines={1} more="more" className="chat-info-desc">
              {chatInfo.description}
            </ShowMoreText>
          )}
          <div className="chat-tags-container">
            {chatInfo.tags.map((tag) => {
              return (
                <div key={tag.id} className="chat-tag">
                  {tag.name}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {windowSize > 481 && chatInfo.comments ? (
        <div className="chat-comment">
          <img src={CommentIcon} alt="comment" />
          <div>{totalComments}</div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default ChatInfo;
